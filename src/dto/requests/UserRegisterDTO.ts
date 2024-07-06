import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterDTO {

    @Expose({ name: 'name' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @Expose({ name: 'username' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @Expose({ name: 'email' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @Expose({ name: 'password' })
    @IsNotEmpty()
    @IsString()
    password: string;
}
