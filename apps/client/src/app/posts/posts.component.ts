import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IPost } from '@hn-feed/api-interfaces';
import { PostsService } from './posts.service';

@Component({
  selector: 'hn-feed-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input() post: IPost;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  constructor(private postService: PostsService) {}

  ngOnInit(): void {}

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe((response: any) => {
      alert(`${response.message}`);
      this.delete.emit(response);
    });
  }
}
