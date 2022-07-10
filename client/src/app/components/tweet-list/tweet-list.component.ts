import { Component, OnInit } from '@angular/core';
import { TweetService } from '../../services/tweet.service';
import { Tweet } from '../../interfaces/Tweet';
@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css'],
})
export class TweetListComponent implements OnInit {
  tweets: Tweet[] = [];
  result: boolean = false;
  constructor(private tweetService: TweetService) {}

  ngOnInit(): void {
    this.getAllTweets();
  }

  getAllTweets() {
    this.tweetService.getAllTweets().subscribe(
      (response) => {
        this.tweets = response.Tweets;
        if (this.tweets.length <= 0) {
          this.result = true;
        }
        console.log(this.tweets);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteTweet(tweet: Tweet) {
    //console.log(tweet?.TweetID);
    this.tweetService.deleteTweet(tweet.TweetID).subscribe((response) => {
      console.log(response);
      if (response.action) {
        this.getAllTweets();
      }
    });
    console.log('delete tweet');
  }
  likeTweet(tweet: Tweet) {
    this.tweetService.likeTweet(tweet.TweetID).subscribe((response) => {
      console.log(response);
      if (response.Action) {
        this.getAllTweets();
      }
    });
    console.log('like tweet');
  }
  disLikeTweet(tweet: Tweet) {
    this.tweetService.disLikeTweet(tweet.TweetID).subscribe((response) => {
      console.log(response);
      if (response.Action) {
        this.getAllTweets();
      }
    });
    console.log('dislike tweet');
  }
  editTweet(tweet: Tweet) {
    console.log('edit tweet');
  }
}
