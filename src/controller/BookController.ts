import { Controller, Post, Req, Body, Res, HttpStatus, UseGuards } from "@nestjs/common";
import { BaseController } from "./BaseController";
import { Request, Response } from 'express';
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { BookDTO } from "src/dto/requests/BookDTO";
import { BookService } from "src/service/book.service";
import { AuthGuard } from "src/service/AuthGuard";


@Controller('/v1/book')
export class BookController extends BaseController {

    constructor(
        private bookService: BookService
    ) {
        super();
    }


    @Post('add')
    @UseGuards(AuthGuard)
    async addBook(
        @Req() req: Request,
        @Body() payload: Object,
        @Res() res: Response,
    ) {
        const dto = plainToInstance(BookDTO, payload, {
            enableImplicitConversion: true,
        });
        await validateOrReject(dto);
        let response = await this.bookService.addBook(dto);

        return res
            .status(HttpStatus.OK)
            .json(
                this.buildSuccessResponse(response),
            );

    }

}
