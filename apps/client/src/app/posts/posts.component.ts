import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IPost } from '@hn-feed/api-interfaces';
import { PostsService } from './posts.service';

@Component({
  selector: 'hn-feed-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  @Input() post: IPost;
  @Output() delete: EventEmitter<string> = new EventEmitter();
  constructor(private postService: PostsService) {}

  deletePost(postId: string) {
    this.postService
      .deletePost(postId)
      .subscribe((response: { message: string; post: IPost }) => {
        alert(`${response.message}`);
        this.delete.emit(response.message);
      });
  }
}
