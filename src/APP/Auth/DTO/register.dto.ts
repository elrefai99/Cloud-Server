import { IsString } from 'class-validator'

export class RegisterDTO {
  @IsString()
  public fullname: string

  @IsString()
  public username: string

  @IsString()
  public email: string

  @IsString()
  public avatar: string

  @IsString()
  public password: string

  @IsString()
  public phoneNumber: string

  @IsString()
  public codeCountry: string

  @IsString()
  public user_ID: string

  @IsString()
  public user_api_Key: number

  @IsString()
  public user_Secret_Key: string
}

