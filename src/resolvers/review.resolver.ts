import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Review } from '@prisma/client';
import { ReviewService } from 'src/service/review.service';

@Resolver('Review')
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) { }

  @Query('getReviews')
  async getReviews( @Args('offset', { type: () => Int, nullable: true }) offset?: number,
  @Args('limit', { type: () => Int, nullable: true }) limit?: number,): Promise<Review[]> {
    offset = (offset)?offset:0
    limit = (offset)?limit:10
    return this.reviewService.getReviews(offset, limit);
  }

  @Query('getMyReviews')
  async getMyReviews(@Args('userId') userId: number,
  @Args('offset', { type: () => Int, nullable: true }) offset?: number,
  @Args('limit', { type: () => Int, nullable: true }) limit?: number,): Promise<Review[]> {

    //todo: fix
    offset = (offset)?offset:0
    limit = (offset)?limit:10
    const myReviews = await this.reviewService.getMyReviews(userId, offset, limit);
    console.log("=====> myReviews", myReviews)
    return myReviews
  }
}