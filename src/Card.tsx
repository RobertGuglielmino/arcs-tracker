
export interface Card {
  id: string;
  imageSrc: string;
  suit: 'administration' | 'aggression' | 'construction' | 'mobilization';
  value: number;
}