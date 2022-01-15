export interface WorkLink {
  label: string;
  url: string;
  description: string;
}

export interface Work {
  id: number;
  name: string;
  tagIds: number[];
  thumbnail: string;
  screenshots: string[];
  description: string;
  about: string;
  techniques: string[];
  links: WorkLink[];
}
