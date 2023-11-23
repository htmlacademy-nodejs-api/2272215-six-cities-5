import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public email: string ;

  @Expose()
  public avatarPath: string;

  @Expose()
  public firstName: string;

  @Expose()
  public lastName: string;
}
