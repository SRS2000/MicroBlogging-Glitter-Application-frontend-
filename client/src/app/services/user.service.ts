import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSignup } from '../interfaces/User';
import { UserLogin, Search, Follow } from '../interfaces/User';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiurl = 'http://localhost:44351/api/user';
  constructor(private http: HttpClient) {}

  signUpUser(user: UserSignup): Observable<any> {
    const url = 'https://localhost:44351/api/user/register';
    return this.http.post(url, user, httpOptions);
  }

  loginUser(user: UserLogin) {
    const url = 'https://localhost:44351/api/user/login';
    return this.http.post(url, user, httpOptions);
  }

  loggedIn() {
    if (localStorage.getItem('Id')) return true;
    else return false;
  }

  loggedInUserId(): string {
    return localStorage.getItem('Id');
  }

  searchUser(searchUser: Search): Observable<any> {
    const url = `https://localhost:44351/api/user/searchUser/${searchUser.UserId}/${searchUser.SearchString}`;
    return this.http.get<any>(url);
  }

  searchHashTag(search: Search): Observable<any> {
    const url = 'https://localhost:44351/api/user/search-hashtag';
    return this.http.post(url, search);
  }
  getAllFollowers(): Observable<any> {
    const userId = this.loggedInUserId();
    const url = `https://localhost:44351/api/user/followers/${userId}`;
    return this.http.get(url);
  }

  getAllFollowing(): Observable<any> {
    const userId = this.loggedInUserId();
    const url = `https://localhost:44351/api/user/following/${userId}`;
    return this.http.get(url);
  }

  follow(follow: Follow): Observable<any> {
    const url = 'https://localhost:44351/api/user/follow';
    return this.http.post(url, follow, httpOptions);
  }
  unfollow(unFollow: Follow): Observable<any> {
    const url = 'https://localhost:44351/api/user/unfollow';
    return this.http.post(url, unFollow, httpOptions);
  }

  fetchAnalytics(): Observable<any> {
    const url = 'https://localhost:44351/api/analytics';
    return this.http.get(url);
  }
}
