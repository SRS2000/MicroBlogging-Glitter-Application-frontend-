import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { FollowersComponent } from './components/followers/followers.component';
import { FollowingComponent } from './components/following/following.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';

const routes: Routes = [
  {
    path: '',
    component: UserLoginComponent,
  },
  {
    path: 'playground',
    component: TweetListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'followers',
    component: FollowersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'following',
    component: FollowingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'search',
    component: SearchBarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/register',
    component: UserSignupComponent,
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
