import { Injectable } from '@nestjs/common';
import { getLoggingUtil } from 'src/utils/logging.util';
import { PrismaService } from './prisma.service';
import { BookDTO } from 'src/dto/requests/BookDTO';
import { BookResponseDTO } from 'src/dto/responses/BookResponseDTO';
import { Book } from '@prisma/client';
const logger = getLoggingUtil('BookService');


@Injectable()
export class BookService {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async addBook(payload: BookDTO): Promise<BookResponseDTO> {

        try {
            logger.info("ADD::BOOK::STARTS", {})
            const book = await this.prisma.book.create({
                data: {
                    title: payload.title,
                    authorId: payload.authorId,
                    publishedYear: payload.publishedYear,
                },
            })
            logger.info("ADD::BOOK::SUCCESS", {})

            return book;

        } catch (error) {
            logger.error("ERROR:ADD::BOOK::FAILD", {message: error.message})
            throw error
        }


    }

    async getBooks(offset: number, limit: number): Promise<Book[]> {
        try {
            logger.info("GET::BOOKS", {offset: offset, limit:limit})
            return this.prisma.book.findMany({
                include: {
                    author: true,
                    reviews: true,
                },
                take: limit,
                skip: offset,
            });

        } catch (error) {
            logger.error("GET::BOOKS::FAIL", {message: error.message})
            throw error
        }


    }

    async searchBooks(searchTerm: string): Promise<Book[] | null> {
        try {
            logger.info("SEARCH::BOOKS", {searchTerm: searchTerm})
            const books = await this.prisma.book.findMany({
                where: {
                    OR: [
                        { title: { contains: searchTerm, mode: 'insensitive' } },
                        { author: { username: { contains: searchTerm, mode: 'insensitive' } } },
                    ],
                },
            });
            return  (books.length>0)?books:[];
        } catch (error) {
            logger.error("SEARCH::BOOKS::FAIL", {message: error.message})
            throw error
        }

    }

    async getBookById(id: number): Promise<Book> {
        try {
            logger.info("GET::BOOKS::BY_ID", {id: id})
            return this.prisma.book.findUnique({
                where: { id },
                include: {
                    author: true,
                    reviews: true,
                },
            });

        } catch (error) {
            logger.error("GET::BOOKS::BY_ID", {message: error.message})
            throw error
        }

    }

}