import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max } from "class-validator";

export class ReviewDTO {

    @Expose({ name: 'book_id' })
    @IsNotEmpty()
    @IsNumber()
    bookId: number;

    @Expose({ name: 'rating' })
    @IsNotEmpty()
    @IsNumber()
    @Max(10, { message: 'Rating must be between 0-10' })
    rating: number;

    @Expose({ name: 'comment' })
    @IsNotEmpty()
    @IsString()
    comment: string

}

export class UpdateReviewDTO {

    @Expose({ name: 'review_id' })
    @IsNotEmpty()
    @IsNumber()
    reviewId: number;

    @Expose({ name: 'rating' })
    @IsNotEmpty()
    @IsNumber()
    @Max(10, { message: 'Rating must be between 0-10' })
    rating: number;

    @Expose({ name: 'comment' })
    @IsNotEmpty()
    @IsString()
    comment: string

}

