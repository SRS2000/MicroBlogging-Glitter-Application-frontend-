import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TweetService } from '../../services/tweet.service';
import { UserService } from '../../services/user.service';
import * as alertyfy from 'alertifyjs';
import { NewTweet } from '../../interfaces/Tweet';
@Component({
  selector: 'app-tweet-form',
  templateUrl: './tweet-form.component.html',
  styleUrls: ['./tweet-form.component.css'],
})
export class TweetFormComponent implements OnInit {
  tweetForm!: FormGroup;
  onTweet: boolean = false;
  tweetData: NewTweet = {
    UserId: '',
    Message: '',
  };
  constructor(
    private formBuilder: FormBuilder,
    private tweetService: TweetService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createTweetForm();
    console.log('loaded');
  }
  createTweetForm() {
    this.tweetForm = this.formBuilder.group({
      tweet: [null, [Validators.required, Validators.maxLength(240)]],
    });
  }

  onTweetSubmit() {
    const tweetFormData = this.tweetForm.value;
    this.onTweet = true;
    if (this.tweetForm.valid) {
      this.tweetData.UserId = this.userService.loggedInUserId();
      this.tweetData.Message = tweetFormData.tweet;
      //console.log(this.tweetData);
      this.tweetService.createTweet(this.tweetData).subscribe(
        (response) => {
          //console.log(response);
          alertyfy.success('Tweet Submitted');
          document.getElementById('close').click();
          this.router.navigate(['/playground']);
        },
        (error) => {
          //console.log(error);
          alertyfy.error('Something went wrong!');
        }
      );
      this.tweetForm.reset();
      this.onTweet = false;
    } else {
      alertyfy.error('Tweet Invalid');
    }
  }

  get tweet() {
    return this.tweetForm.get('tweet') as FormControl;
  }
}
