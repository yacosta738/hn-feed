import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ unique: true })
  objectID: string;

  @Prop()
  title: string; // If 'story_title' is null, then use 'title'. If both are null, discard

  @Prop()
  url: string; // story_url or url

  @Prop()
  author: string;

  @Prop({ default: false })
  deleted: boolean;

  @Prop()
  createdAt: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
