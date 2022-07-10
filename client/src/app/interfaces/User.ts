export interface UserSignup {
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
  Image: string;
  Country: string;
}

export interface UserLogin {
  Email: string;
  Password: string;
  Id: string;
}

export interface Search {
  UserId: string;
  SearchString: string;
}

export interface SearchResult {
  UserId: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Image: string;
  isFollowed: boolean;
  isAuthor: boolean;
  TweetId: string;
  Message: string;
  isLiked: boolean;
  UserName: string;
  CreatedAt: Date;
}

export interface Follow {
  UserId: string;
  UserToFollowId: string;
}

export interface Analytics {
  MostTrending: string;
  TotalTweetsToday: string;
  MostTweetsBy: string;
  MostLiked: string;
}
