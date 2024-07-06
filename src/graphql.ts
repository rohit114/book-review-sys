
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    abstract getBooks(offset: number, limit: number): Book[] | Promise<Book[]>;

    abstract searchBooks(searchTerm: string): Book[] | Promise<Book[]>;

    abstract getBookById(id: number): Nullable<Book> | Promise<Nullable<Book>>;

    abstract getReviews(offset: number, limit: number): Review[] | Promise<Review[]>;

    abstract getMyReviews(userId: number, offset: number, limit: number): Nullable<Review> | Promise<Nullable<Review>>;
}

export class Book {
    id: number;
    title: string;
    author: User;
    authorId: number;
    publishedYear: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
    reviews: Review[];
}

export class Review {
    id: number;
    user: User;
    userId: number;
    book: Book;
    bookId: number;
    rating: number;
    comment: string;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class User {
    id: number;
    username: string;
    email: string;
}

type Nullable<T> = T | null;
