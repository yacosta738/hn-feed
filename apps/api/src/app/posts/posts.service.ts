import {
  HttpService,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IPost } from './interfaces/post.interface';
import { CreatePostDto, UpdatePostDto } from './dto';
import { Post } from './schemas/post.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { map } from 'rxjs/operators';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  private readonly url = 'http://hn.algolia.com/api/v1/search_by_date?query=';

  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private httpService: HttpService
  ) {}

  public async findAll(paginationQuery: PaginationQueryDto): Promise<Post[]> {
    const { limit, offset } = paginationQuery;

    return await this.postModel
      .find({ deleted: false })
      .skip(offset)
      .limit(limit)
      .exec();
  }

  public async findOne(postId: string): Promise<Post> {
    const post = await this.postModel.findById({ _id: postId }).exec();

    if (!post) {
      throw new NotFoundException(`Post #${postId} not found`);
    }

    return post;
  }

  public async create(createPostDto: CreatePostDto): Promise<IPost> {
    const newPost = await new this.postModel(createPostDto);
    return newPost.save();
  }

  public async update(
    postId: string,
    updatePostDto: UpdatePostDto
  ): Promise<IPost> {
    const existingPost = await this.postModel.findByIdAndUpdate(
      { _id: postId },
      updatePostDto
    );

    if (!existingPost) {
      throw new NotFoundException(`Post #${postId} not found`);
    }

    return existingPost;
  }

  public async softDelete(postId: string): Promise<IPost> {
    const post = await this.postModel.findById({ _id: postId }).exec();
    return this.update(postId, {
      objectID: post.objectID,
      title: post.title,
      url: post.url,
      author: post.author,
      deleted: true,
    });
  }
  public async remove(postId: string): Promise<any> {
    return this.postModel.findByIdAndRemove(postId);
  }

  private fetchDataFromAPI(query = 'nodejs') {
    this.logger.debug('Start collect new data');
    return this.httpService.get(`${this.url}${query}`).pipe(
      map(
        (response) =>
          response.data.hits.filter((hit) => hit.story_title || hit.title) // discard post without title or story_title
      )
    );
  }

  @Cron(CronExpression.EVERY_HOUR)
  handleCron() {
    this.logger.debug('Collect data from service api algolia ');
    const fromAPI = this.fetchDataFromAPI();
    fromAPI.subscribe(
      (hits) => this.populateDataBase(hits),
      (error) => this.logger.error(error)
    );
  }

  private populateDataBase(hits: []) {
    console.log(hits.length);
    hits.forEach(async (hit: any) => {
      // verify if the post is in database.
      const posts = await this.postModel
        .find({ objectID: hit.objectID })
        .exec();
      if (posts && posts.length === 0) {
        // insert new posts in database
        const post = await this.create({
          objectID: hit.objectID,
          title: hit.story_title ? hit.story_title : hit.title,
          url: hit.story_url ? hit.story_url : hit.url,
          author: hit.author,
          deleted: false,
          createdAt: hit.created_at,
        });
        this.logger.debug(`Inserted post ${post}`);
      }
    });
    this.logger.debug('End store post in database');
  }
}
