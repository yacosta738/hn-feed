import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IPost, Message} from '@hn-feed/api-interfaces';

@Component({
  selector: 'hn-feed-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
  posts: IPost[] = [];

  ngOnInit() {
    this.http.get<IPost[]>('/api/api/posts').subscribe((result)=>{
      console.log(result);
      this.posts  =  result;
    })
  }
}
