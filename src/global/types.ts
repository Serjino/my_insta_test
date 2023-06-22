export interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface IComment {
  postId: number | string;
  id: number | string;
  name: string;
  email: string;
  body: string;
  dateTime?: string;
}
