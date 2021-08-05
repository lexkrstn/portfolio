export interface WorkImage {
  full: string;
  thumbnail: string;
}

export default interface Work {
  id: number;
  name: string;
  tagIds: number[];
  images: WorkImage[];
}
