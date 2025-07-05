export type Movie = {
  docId: string;
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  provider: string;
  type: 'movie';
  category:
    | 'action'
    | 'drama'
    | 'comedy'
    | 'sci-fi'
    | 'romance'
    | 'thriller'
    | 'fantasy'
    | 'animation';
  isNew: boolean;
  progress?: number;
  match?: number;
};
