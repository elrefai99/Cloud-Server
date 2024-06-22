import { IsString } from 'class-validator'

export class LoginDTO {

  @IsString()
  public email: string

  @IsString()
  public password: string

}

