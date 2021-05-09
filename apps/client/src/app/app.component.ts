import {Component, OnInit} from '@angular/core';
import {IPost} from '@hn-feed/api-interfaces';
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
    this.getAllPost();
  }

  private getAllPost() {
    const compareDate = (a: IPost, b: IPost) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    this.postsService.getAllPost().subscribe((result) => {
      this.posts = result.sort(compareDate);
    });
  }

  deletePost() {
    this.getAllPost();
  }
}
