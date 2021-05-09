import { HttpModule, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, Post } from './schemas/post.schema';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    ScheduleModule.forRoot(),
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
