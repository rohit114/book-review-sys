import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql';
import { Review } from '@prisma/client';
import { ReviewService } from 'src/service/review.service';
import { JwtUtil} from 'src/utils/token-verify';

@Resolver('Review')
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService,
    private readonly jwtUtil: JwtUtil,
  ) { }

  @Query('getReviews')
  async getReviews(@Args('offset', { type: () => Int, nullable: true }) offset?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,): Promise<Review[]> {
    offset = (offset) ? offset : 0
    limit = (limit) ? limit : 10
    return this.reviewService.getReviews(offset, limit);
  }

  @Query('getMyReviews')
  async getMyReviews(@Context() context: any,
    @Args('userId') userId: number,
    @Args('offset', { type: () => Int, nullable: true }) offset?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,): Promise<Review[]> {
    offset = (offset) ? offset : 0
    let data = this.jwtUtil.validateToken(context.req.headers.authorization)
    limit = (offset) ? limit : 10
    const myReviews = await this.reviewService.getMyReviews(data['userId'], offset, limit);
    console.log("=====> myReviews", myReviews) //todo: fix , myReviews has data but graphql returning error
    return myReviews
  }
}