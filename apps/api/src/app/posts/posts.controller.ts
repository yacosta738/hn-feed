import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  public async getAllPost(
    @Res() res,
    @Query() paginationQuery: PaginationQueryDto
  ) {
    const posts = await this.postsService.findAll(paginationQuery);
    return res.status(HttpStatus.OK).json(posts);
  }

  @Get('/:id')
  public async getPost(@Res() res, @Param('id') postId: string) {
    const post = await this.postsService.findOne(postId);
    if (!post) {
      throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json(post);
  }

  @Post()
  public async addPost(@Res() res, @Body() createPostDto: CreatePostDto) {
    try {
      const post = await this.postsService.create(createPostDto);
      return res.status(HttpStatus.OK).json({
        message: 'Post has been created successfully',
        post: post,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Post not created!',
        status: 400,
      });
    }
  }

  @Put('/:id')
  public async updatePost(
    @Res() res,
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto
  ) {
    try {
      const post = await this.postsService.update(postId, updatePostDto);
      if (!post) {
        throw new NotFoundException('Post does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Post has been successfully updated',
        post: post,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Post not updated!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deletePost(@Res() res, @Param('id') postId: string) {
    if (!postId) {
      throw new NotFoundException('Post ID does not exist');
    }

    const post = await this.postsService.softDelete(postId);

    if (!post) {
      throw new NotFoundException('Post does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted',
      post: post,
    });
  }

  @Delete('/remove/:id')
  public async removePost(@Res() res, @Param('id') postId: string) {
    if (!postId) {
      throw new NotFoundException('Post ID does not exist');
    }

    const post = await this.postsService.remove(postId);

    if (!post) {
      throw new NotFoundException('Post does not exist');
    }

    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted',
      post: post,
    });
  }
}
