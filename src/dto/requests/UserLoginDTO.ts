import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserLoginDTO {

    @Expose({ name: 'password' })
    password?: string;

    @Expose({ name: 'email' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

}