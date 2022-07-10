import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css'],
})
export class FollowersComponent implements OnInit {
  followers: any[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getFollowers();
  }

  getFollowers() {
    this.userService.getAllFollowers().subscribe((response) => {
      this.followers = response.Followers;
    });
  }
}
