// import { Injectable, ExecutionContext } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class GpqlAuthGuard {
//   constructor(private jwtService: JwtService) {}

//   getContext(context: ExecutionContext) {
//     const ctx = GqlExecutionContext.create(context);
//     const { req } = ctx.getContext();

//     if (req.headers.authorization) {
//       const user = this.validateToken(req.headers.authorization);
//       return { user }; // Return authenticated user to context
//     }

//     return {}; // Return empty context if no authentication is needed
//   }

//   private validateToken(auth: string) {
//     const token = auth.split(' ')[1];
//     try {
//       return this.jwtService.verify(token);
//     } catch (e) {
//       throw new Error("Err graphQL validateToken");
//     }
//   }
// }
