import { Document } from 'mongoose';

export interface IPost extends Document {
  objectID: string;
  title: string; // If 'story_title' is null, then use 'title'. If both are null, discard
  url: string; // story_url or url
  author: string;
  deleted: boolean;
  createdAt: Date;
}
