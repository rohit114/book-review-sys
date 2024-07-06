import { Test, TestingModule } from '@nestjs/testing';
import { BookDTO } from 'src/dto/requests/BookDTO';
import { BookResponseDTO } from 'src/dto/responses/BookResponseDTO';
import { Book } from '@prisma/client';
import { getLoggingUtil } from 'src/utils/logging.util';
import { BookService } from './book.service';
import { PrismaService } from './prisma.service';
const logger = getLoggingUtil('BookService');

describe('BookService', () => {
  let service: BookService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: PrismaService,
          useValue: {
            book: {
              create: jest.fn((data: any) => Promise.resolve({ ...data })),
              findMany: jest.fn(() => []),
              findUnique: jest.fn((id: number) => Promise.resolve({ id, title: 'Mock Book', authorId: 1 })),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addBook', () => {
    it('should add a book', async () => {
      const payload: BookDTO = { title: 'Test Book', authorId: 1, publishedYear: new Date() };
      const result: BookResponseDTO = await service.addBook(payload);
      expect(result.title).toEqual(payload.title);
      expect(result.authorId).toEqual(payload.authorId);
      expect(result.publishedYear).toEqual(payload.publishedYear);
    });
  });

  describe('getBooks', () => {
    it('should get books with pagination', async () => {
      const offset = 0;
      const limit = 10;
      const result: Book[] = await service.getBooks(offset, limit);
      expect(result).toEqual([]);
    });
  });

  describe('searchBooks', () => {
    it('should search books by searchTerm', async () => {
      const searchTerm = 'Java';
      const result: Book[] | null = await service.searchBooks(searchTerm);
      expect(prismaService.book.findMany).toHaveBeenCalledWith({
        where: {
          OR: expect.arrayContaining([
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { author: { username: { contains: searchTerm, mode: 'insensitive' } } },
          ]),
        },
      });
    });
  });

  describe('getBookById', () => {
    it('should get book by ID', async () => {
      const id = 1;
      const result: Book = await service.getBookById(id);
      expect(result.id).toEqual(id);
      expect(prismaService.book.findUnique).toHaveBeenCalledWith({ where: { id }, include: { author: true, reviews: true } });
    });
  });
});
