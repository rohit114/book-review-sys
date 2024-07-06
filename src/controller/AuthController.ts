import { Controller, Post, Req, Body, Res, HttpStatus } from "@nestjs/common";
import { BaseController } from "./BaseController";
import { Request, Response } from 'express';
import { plainToInstance } from "class-transformer";
import { UserRegisterDTO } from "src/dto/requests/UserRegisterDTO";
import { UserLoginDTO } from "src/dto/requests/UserLoginDTO";
import { AuthService } from "src/service/auth.service";
import { validateOrReject } from "class-validator";


@Controller('/v1/user')
export class AuthController extends BaseController {

    constructor(
        private authService: AuthService,
    ) {
        super();
    }

    @Post('register')
    async create(
        @Req() req: Request,
        @Body() payload: Object,
        @Res() res: Response,
    ) {

        const dto = plainToInstance(UserRegisterDTO, payload, {
            enableImplicitConversion: true,
        });
        await validateOrReject(dto);
        const user = await this.authService.registerUser(dto);
        return res
            .status(HttpStatus.CREATED)
            .json(
                this.buildSuccessResponse(user),
            );
    }

    @Post('login')
    async login(
        @Req() req: Request,
        @Body() payload: Object,
        @Res() res: Response,
    ) {
        const dto = plainToInstance(UserLoginDTO, payload, {
            enableImplicitConversion: true,
        });
        await validateOrReject(dto);
        let response = await this.authService.login(dto);

        return res
            .status(HttpStatus.OK)
            .json(
                this.buildSuccessResponse(response),
            );

    }

}
