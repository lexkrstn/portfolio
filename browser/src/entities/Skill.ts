export interface Skill {
  _id: string;
  name: string;
  icon: string;
  masteryYear: number;
  note: string;
  group: 'basic' | 'misc' | 'lang';
  level: number;
  weight: number;
}
