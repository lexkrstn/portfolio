import throttle from 'lodash/throttle';

export function loadImage(url: string, onProgress: (percents: number) => void): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url , true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      const headers = request.getAllResponseHeaders();
      const contentTypeMatch = headers.match(/^Content-Type\:\s*(.*?)$/mi);
      const type = contentTypeMatch[1] || 'image/png';
      const blob = new Blob([request.response], { type });
      const objectUrl = URL.createObjectURL(blob);
      resolve(objectUrl);
    };

    request.onerror = () => {
      reject(new Error(`Failed to load ${url}: ${request.status}`));
    };

    request.onprogress = throttle((event: ProgressEvent) => {
      if (event.lengthComputable) {
        onProgress(Math.floor(100 * event.loaded / event.total));
      }
    }, 100);

    request.onloadstart = () => onProgress(0);

    request.onloadend = () => onProgress(100);

    request.send();
  });
}
