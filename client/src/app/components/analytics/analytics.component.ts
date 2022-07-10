import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Analytics } from '../../interfaces/User';
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements OnInit {
  analytics: Analytics = {
    MostLiked: 'NA',
    MostTrending: 'NA',
    MostTweetsBy: 'NA',
    TotalTweetsToday: 'NA',
  };
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchAnalytics().subscribe(
      (response) => {
        this.analytics = response.Analytics;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
