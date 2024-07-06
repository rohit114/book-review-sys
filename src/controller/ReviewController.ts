import { Controller, Post, Req, Body, Res, HttpStatus, UseGuards, Delete, Param } from "@nestjs/common";
import { BaseController } from "./BaseController";
import { Request, Response } from 'express';
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { AuthGuard } from "src/service/AuthGuard";
import { ReviewDTO, UpdateReviewDTO } from "src/dto/requests/ReviewDTO";
import { ReviewService } from "src/service/review.service";


@Controller('/v1/review')
export class ReviewController extends BaseController {

    constructor(
        private reviewService: ReviewService
    ) {
        super();
    }


    @Post('add')
    @UseGuards(AuthGuard)
    async addReview(
        @Req() req: Request,
        @Body() payload: Object,
        @Res() res: Response,
    ) {
        const dto = plainToInstance(ReviewDTO, payload, {
            enableImplicitConversion: true,
        });
        await validateOrReject(dto);
        const userId = req['user'].userId;
        let response = await this.reviewService.addReview(userId, dto);

        return res
            .status(HttpStatus.OK)
            .json(
                this.buildSuccessResponse(response),
            );

    }

    @Post('update')
    @UseGuards(AuthGuard)
    async updateReview(
        @Req() req: Request,
        @Body() payload: Object,
        @Res() res: Response,
    ) {
        const dto = plainToInstance(UpdateReviewDTO, payload, {
            enableImplicitConversion: true,
        });
        await validateOrReject(dto);
        const userId = req['user'].userId;
        let response = await this.reviewService.updateReview(userId, dto);

        return res
            .status(HttpStatus.OK)
            .json(
                this.buildSuccessResponse(response),
            );

    }

    @Delete('delete/:reviewId')
    @UseGuards(AuthGuard)
    async deleteReview(
        @Param('reviewId') reviewId: number,
        @Req() req: Request,
        @Res() res: Response,
    ) {

        const userId = req['user'].userId;
        let response = await this.reviewService.deleteReview(userId, reviewId);

        return res
            .status(HttpStatus.OK)
            .json(
                this.buildSuccessResponse(response),
            );

    }

}
