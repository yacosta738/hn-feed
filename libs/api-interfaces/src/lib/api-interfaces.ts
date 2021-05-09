export interface Message {
  message: string;
}
export interface IPost {
  _id: string;
  objectID: string;
  title: string;
  url: string;
  author: string;
  deleted: boolean;
  createdAt: Date;
}
export interface PaginationQuery {
  limit: number;
  offset: number;
}
