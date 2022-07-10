import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TweetCardComponent } from './components/tweet-card/tweet-card.component';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FollowersComponent } from './components/followers/followers.component';
import { FollowingComponent } from './components/following/following.component';
import { UserAvtarCardComponent } from './components/user-avtar-card/user-avtar-card.component';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { AuthGuard } from './auth.guard';
import { TweetFormComponent } from './components/tweet-form/tweet-form.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';

@NgModule({
  declarations: [
    AppComponent,
    TweetCardComponent,
    TweetListComponent,
    NavbarComponent,
    FooterComponent,
    FollowersComponent,
    FollowingComponent,
    UserAvtarCardComponent,
    UserSignupComponent,
    UserLoginComponent,
    TweetFormComponent,
    SearchBarComponent,
    AnalyticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
