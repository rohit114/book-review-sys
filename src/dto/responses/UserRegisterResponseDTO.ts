import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRegisterDTO } from '../requests/UserRegisterDTO';

export class UserRegisterResponseDTO  extends UserRegisterDTO{
    @Expose({ name: 'id' })
    @IsNotEmpty()
    @IsString()
    id: number;

    @Expose({ name: 'created_at' })
    createdAt: Date;

    @Expose({ name: 'updated_at' })
    updatedAt: Date;

}

