import {Component, OnInit} from '@angular/core';
import {IPost, PaginationQuery} from '@hn-feed/api-interfaces';
import {PostsService} from './posts/posts.service';

@Component({
  selector: 'hn-feed-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private postsService: PostsService) {
  }

  posts: IPost[] = [];

  ngOnInit() {
    this.getAllPost({offset: 10, limit: 10});
  }

  private getAllPost(paginationQuery?: PaginationQuery) {
    const compareDate = (a: IPost, b: IPost) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    this.postsService.getAllPost(paginationQuery).subscribe((result) => {
      this.posts = result.sort(compareDate);
    });
  }

  deletePost() {
    this.getAllPost({offset: 10, limit: 10});
  }

  showMore() {
    this.getAllPost();
  }

  collectData() {
    this.postsService.startCollectData().subscribe(() => {
      this.updateView();
    });
  }

  private updateView() {
    setTimeout(() => {
      this.getAllPost({offset: 10, limit: 10})
    }, 3000)
  }
}
