import {
  MaxLength,
  IsNotEmpty,
  IsUrl,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  readonly objectID: string;

  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  readonly title: string; // If 'story_title' is null, then use 'title'. If both are null, discard

  @IsString()
  @IsUrl()
  readonly url: string; // story_url or url

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly author: string;

  @IsBoolean()
  readonly deleted: boolean;


  @IsNotEmpty()
  readonly createdAt: Date;
}
