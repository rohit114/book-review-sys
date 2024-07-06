import { Injectable } from '@nestjs/common';
import { getLoggingUtil } from 'src/utils/logging.util';
import { PrismaService } from './prisma.service';
import { BookDTO } from 'src/dto/requests/BookDTO';
import { BookResponseDTO } from 'src/dto/responses/BookResponseDTO';
const logger = getLoggingUtil('BookService');


@Injectable()
export class BookService {

    constructor(
        private prisma: PrismaService
    ) { }

    async addBook(payload: BookDTO):Promise<BookResponseDTO>{

        try {
            const book = await this.prisma.book.create({
                data: {
                    title: payload.title,
                    authorId: payload.authorId,
                    publishedYear: payload.publishedYear,
                },
            })
    
            return book;

        } catch (error){
            console.error("Err add book", error.message)
            throw error
        }
        

    }


}