import { Expose } from "class-transformer";
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class BookDTO {

    @Expose({ name: 'title' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @Expose({ name: 'author_id' })
    @IsNotEmpty()
    @IsNumber()
    authorId: number;

    @Expose({ name: 'published_year' })
    @IsNotEmpty()
    @IsDate()
    publishedYear: Date

}