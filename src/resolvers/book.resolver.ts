import { Resolver, Query, Args, Context, Int } from '@nestjs/graphql';
import { Book } from '@prisma/client';
import { BookService } from 'src/service/book.service';

@Resolver('Book')
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query('getBooks')
  async getBooks(
  @Args('offset', { type: () => Int, nullable: true }) offset?: number,
  @Args('limit', { type: () => Int, nullable: true }) limit?: number,): Promise<Book[]> {
    offset = (offset)?offset:0
    limit = (offset)?limit:10
    return this.bookService.getBooks(offset, limit);
  }

  @Query('searchBooks')
  async searchBooks(
    @Args('searchTerm') searchTerm: string
  ): Promise<Book[]> {
    //todo: fix
    return this.bookService.searchBooks(searchTerm);
  }
  

  @Query('getBookById')
  async getBookById(@Args('id') id: number): Promise<Book> {
    return this.bookService.getBookById(id);
  }
}
