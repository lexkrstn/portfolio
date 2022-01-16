export interface WorkLink {
  label: string;
  url: string;
  description: string;
}

export interface Work {
  _id: string;
  name: string;
  tags: string[];
  thumbnail: string;
  screenshots: string[];
  description: string;
  about: string;
  techniques: string[];
  links: WorkLink[];
}
