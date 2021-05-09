import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPost } from '@hn-feed/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  public getAllPost() {
    return this.http.get<IPost[]>('/api/posts');
  }
  public getPost(postId: string) {
    return this.http.get<IPost[]>(`/api/posts/${postId}`);
  }
  public addPost(post: IPost) {
    return this.http.post('/api/posts', post);
  }
  public updatePost(postId: string, post: IPost) {
    return this.http.put(`/api/posts/${postId}`, post);
  }
  public deletePost(postId: string) {
    return this.http.delete(`/api/posts/${postId}`);
  }
}
