export class BlogDto {
  Active: number;
  BlogID: number;
  BlogLongDescription: string;
  BlogShortDescription: string;
  BlogTitle: string;
  COMMENTS: Array<BlogCommentDto>;
  Date: string;
  Hint: number;
  MetaKeys: string;
}

export class BlogCommentDto {

}
