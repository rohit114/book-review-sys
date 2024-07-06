import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { getLoggingUtil } from 'src/utils/logging.util';
import { PrismaService } from './prisma.service';
import { ReviewDTO, UpdateReviewDTO } from 'src/dto/requests/ReviewDTO';
import { ReviewResponseDTO } from 'src/dto/responses/ReviewResponseDTO';
const logger = getLoggingUtil('ReviewService');


@Injectable()
export class ReviewService {

    constructor(
        private prisma: PrismaService
    ) { }

    async addReview(userId: number, payload: ReviewDTO): Promise<ReviewResponseDTO> {

        try {
            logger.info("ADD::REVIEW::START", payload)
            const review = await this.prisma.review.create({
                data: {
                    userId: userId,
                    bookId: payload.bookId,
                    rating: payload.rating,
                    comment: payload.comment,
                },
            })
            logger.info("ADD::REVIEW::SUCCESS", review.id)
            return review;

        } catch (error) {
            console.error("Err add review", error.message)
            throw error
        }


    }

    async updateReview(userId: number, payload: UpdateReviewDTO): Promise<ReviewResponseDTO> {

        try {
            logger.info("UPDATE::REVIEW::START", payload)
            const review = await this.prisma.review.findUnique({
                where: {
                    id: payload.reviewId
                },
            })
            console.log("userId", userId)
            console.log(review)
            if (!review) {
                throw new NotFoundException(`Review with id: ${payload.reviewId} not found`)
            }
            if (review.userId != userId) {
                throw new ForbiddenException(`Not allowed to edit this review id: ${review.id}`);
            }
            const updatedReview = await this.prisma.review.update({
                where: {
                    id: payload.reviewId,
                },
                data: {
                    rating: payload.rating,
                    comment: payload.comment
                },
            })
            logger.info("UPDATE::REVIEW::SUCCESS", updatedReview.id)
            return updatedReview;

        } catch (error) {
            console.error("Err update review", error.message)
            throw error
        }


    }

    async deleteReview(userId: number, reviewId: number): Promise<Object> {

        try {
            logger.info("DELETE::REVIEW::START", reviewId)
            const review = await this.prisma.review.findUnique({
                where: {
                    id: reviewId
                },
            })

            if (!review) {
                throw new NotFoundException(`Review with id: ${reviewId} not found`)
            }
            if (review.userId != userId) {
                throw new ForbiddenException(`Not allowed to delete this review id: ${review.id}`);
            }
            let ack = await this.prisma.review.delete({
                where: {
                    id: reviewId,
                },
            })
            logger.info("DELETE::REVIEW::SUCCESS", ack)
            return true;

        } catch (error) {
            console.error("Err delete review", error.message)
            throw error
        }


    }


}