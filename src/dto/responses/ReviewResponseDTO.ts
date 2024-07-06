import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { ReviewDTO } from "../requests/ReviewDTO";


export class ReviewResponseDTO extends ReviewDTO {
    @Expose({ name: 'id' })
    @IsNotEmpty()
    @IsString()
    id: number;

    @Expose({ name: 'created_at' })
    createdAt: Date;

    @Expose({ name: 'updated_at' })
    updatedAt: Date;
}