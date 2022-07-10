import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Tweet } from '../../interfaces/Tweet';
import { UserService } from '../../services/user.service';
import { TweetService } from '../../services/tweet.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as alertyfy from 'alertifyjs';
import { UpdateTweet } from '../../interfaces/Tweet';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.css'],
})
export class TweetCardComponent implements OnInit {
  @Input() tweet?: Tweet;
  @Output() onDeleteTweet: EventEmitter<Tweet> = new EventEmitter();
  @Output() onEditTweet: EventEmitter<Tweet> = new EventEmitter();
  @Output() onLikeTweet: EventEmitter<Tweet> = new EventEmitter();
  @Output() onDisLikeTweet: EventEmitter<Tweet> = new EventEmitter();
  @ViewChild('closebutton') closebutton;
  tweetForm!: FormGroup;
  onTweet: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private tweetService: TweetService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createTweetForm();
  }

  createTweetForm() {
    this.tweetForm = this.formBuilder.group({
      tweet: [
        this.tweet.Message,
        [Validators.required, Validators.maxLength(240)],
      ],
    });
  }

  onTweetSubmit() {
    const tweetFormData = this.tweetForm.value;
    console.log();

    this.onTweet = true;
    if (this.tweetForm.valid) {
      const updateTweet: UpdateTweet = {
        UserId: this.userService.loggedInUserId(),
        TweetId: this.tweet?.TweetID,
        Message: tweetFormData.tweet,
      };
      console.log(updateTweet);
      this.tweetService.editTweet(updateTweet).subscribe(
        (response) => {
          if (response.Action) {
            alertyfy.success('Tweet Updated');
            this.tweetForm.reset();
            document.getElementById('closeModal').click();
            this.router.navigate(['/playground']);
          } else {
            alertyfy.error('Something went wrong');
          }
        },
        (error) => {
          //console.log(error);
          alertyfy.error('Something went wrong!');
        }
      );
    } else {
      alertyfy.error('Tweet Invalid');
    }
  }

  get Tweet() {
    return this.tweetForm.get('tweet') as FormControl;
  }
  onDelete(tweet: any) {
    this.onDeleteTweet.emit(tweet);
  }
  onEdit(tweet: any) {
    this.onEditTweet.emit(tweet);
  }
  onLike(tweet: any) {
    this.onLikeTweet.emit(tweet);
  }

  onDisLike(tweet: any) {
    console.log('clicked');
    this.onDisLikeTweet.emit(tweet);
  }
}
