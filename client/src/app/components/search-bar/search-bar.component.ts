import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  CheckboxRequiredValidator,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Search, SearchResult, Follow } from '../../interfaces/User';
import * as alertyfy from 'alertifyjs';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  SearchForm: FormGroup;
  search: Search = {
    UserId: '',
    SearchString: '',
  };
  result: SearchResult[];
  noResult: boolean = false;
  showUsers: boolean = false;
  showTags: boolean = false;
  searchData;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createSearchForm();
    this.noResult = false;
    this.showTags = false;
    this.showUsers = false;
  }
  createSearchForm() {
    this.SearchForm = this.formBuilder.group({
      query: [null, [Validators.required]],
      queryType: [true],
    });
  }
  onSearch() {
    console.log(this.SearchForm.value);
    const searchData = this.SearchForm.value;
    if (searchData.queryType && searchData.query !== '') {
      this.userFetch(searchData.query);
    }

    if (!searchData.queryType && searchData.query !== '') {
      this.tagFetch(searchData.query);
    }
  }
  userFetch(query: string) {
    this.search.UserId = this.userService.loggedInUserId();
    this.search.SearchString = query;
    this.userService.searchUser(this.search).subscribe(
      (response) => {
        console.log(response);

        if (response.StatusCode == 'EX103') {
          this.noResult = true;
          this.showUsers = false;
          this.showTags = false;
        } else {
          this.result = response.Result;
          this.noResult = false;
          this.showTags = false;
          this.showUsers = true;
          console.log(this.result);
        }
      },
      (errorResponse) => {
        alertyfy.error(errorResponse.error);
      }
    );
  }

  tagFetch(query: string) {
    this.search.UserId = this.userService.loggedInUserId();
    this.search.SearchString = query;
    this.userService.searchHashTag(this.search).subscribe(
      (response) => {
        if (response.StatusCode == 'EX103') {
          this.noResult = true;
          this.showUsers = false;
          this.showTags = false;
        } else {
          this.result = response.Result;
          this.noResult = false;
          this.showTags = true;
          this.showUsers = false;
          console.log(this.result);
        }
      },
      (errorResponse) => {
        alertyfy.error(errorResponse.error);
      }
    );
  }

  onFollow(toFollow) {
    const follow: Follow = {
      UserId: this.userService.loggedInUserId(),
      UserToFollowId: toFollow,
    };
    this.userService.follow(follow).subscribe((response) => {
      if (response.Action) {
        this.userFetch(this.SearchForm.value.query);
      }
    });
  }

  onUnfollow(toUnfollow) {
    const unfollow: Follow = {
      UserId: this.userService.loggedInUserId(),
      UserToFollowId: toUnfollow,
    };
    this.userService.unfollow(unfollow).subscribe((response) => {
      if (response.Action) {
        this.userFetch(this.SearchForm.value.query);
      }
    });
  }
  get query() {
    return this.SearchForm.get('query') as FormControl;
  }
}
