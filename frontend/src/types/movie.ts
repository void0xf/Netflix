export type Movie = {
  id: number;
  title: string;
  videoUrl: string;
  thumbnail: string;
  provider: string;
  type: "movie";
  category:
    | "action"
    | "drama"
    | "comedy"
    | "sci-fi"
    | "romance"
    | "thriller"
    | "fantasy"
    | "animation";
  isNew: boolean;
};
