import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterResponseDTO {

    @Expose({ name: 'id' })
    @IsNotEmpty()
    @IsString()
    id: number;

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

    @Expose({ name: 'created_at' })
    createdAt: Date;

    @Expose({ name: 'updated_at' })
    updatedAt: Date;

}