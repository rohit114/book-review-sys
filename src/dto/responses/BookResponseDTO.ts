import { Expose } from "class-transformer";
import { BookDTO } from "../requests/BookDTO";

export class BookResponseDTO extends BookDTO {
    @Expose({ name: 'created_at' })
    createdAt?: Date;

    @Expose({ name: 'updated_at' })
    updatedAt?: Date;
}