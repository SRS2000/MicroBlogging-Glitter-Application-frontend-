import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewTweet, UpdateTweet } from '../interfaces/Tweet';
import { UserService } from './user.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  constructor(private http: HttpClient, private userService: UserService) {}

  createTweet(tweet: NewTweet): Observable<any> {
    const url = 'https://localhost:44351/api/user/new-tweet';
    return this.http.post(url, tweet, httpOptions);
  }

  getAllTweets(): Observable<any> {
    const userId = this.userService.loggedInUserId();
    const url = `https://localhost:44351/api/user/tweets/${userId}`;
    return this.http.get<any>(url);
  }

  deleteTweet(tweetId: string): Observable<any> {
    const userId = this.userService.loggedInUserId();
    const url = `https://localhost:44351/api/user/delete-tweet/${userId}/${tweetId}`;
    return this.http.delete(url, httpOptions);
  }

  editTweet(tweet: UpdateTweet): Observable<any> {
    const url = 'https://localhost:44351/api/user/update-tweet';
    return this.http.put(url, tweet, httpOptions);
  }

  likeTweet(tweetId: string): Observable<any> {
    const userId = this.userService.loggedInUserId();
    const url = `https://localhost:44351/api/user/like/${userId}/${tweetId}`;
    return this.http.post(url, httpOptions);
  }
  disLikeTweet(tweetId: string): Observable<any> {
    const userId = this.userService.loggedInUserId();
    const url = `https://localhost:44351/api/user/dislike/${userId}/${tweetId}`;
    return this.http.post(url, httpOptions);
  }
}
