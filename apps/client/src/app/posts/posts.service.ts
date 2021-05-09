import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPost, PaginationQuery } from '@hn-feed/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  public getAllPost(paginationQuery?: PaginationQuery) {
    const params: HttpParams = new HttpParams();
    const options = paginationQuery
      ? {
          params: new HttpParams({
            fromString: `offset=${paginationQuery?.offset}&limit=${paginationQuery?.limit}`,
          }),
        }
      : {};
    return this.http.get<IPost[]>('/api/posts', options);
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

  startCollectData() {
    return this.http.get('/api/posts/collect/data')
  }
}
