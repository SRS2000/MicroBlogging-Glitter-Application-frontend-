import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Follow } from '../../interfaces/User';
@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
})
export class FollowingComponent implements OnInit {
  followings: any[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getFollowing();
  }
  getFollowing() {
    this.userService.getAllFollowing().subscribe((response) => {
      this.followings = response.Following;
      console.log(this.followings);
    });
  }

  onUnfollow(toUnfollow) {
    const unfollow: Follow = {
      UserId: this.userService.loggedInUserId(),
      UserToFollowId: toUnfollow,
    };
    this.userService.unfollow(unfollow).subscribe((response) => {
      if (response.Action) {
        this.getFollowing();
      }
    });
  }
}
