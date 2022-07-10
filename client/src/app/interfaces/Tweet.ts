export interface NewTweet {
  UserId: string;
  Message: string;
}
export interface Tweet {
  TweetID: string;
  UserName: string;
  Message: string;
  CreatedAt: Date;
  IsAuthor: boolean;
  IsLiked: boolean;
}

export interface UpdateTweet {
  UserId: string;
  TweetId: string;
  Message: string;
}
