import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from 'src/dto/requests/UserLoginDTO';
import { PrismaService } from './prisma.service';
import { UserRegisterDTO } from "src/dto/requests/UserRegisterDTO";
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UserRegisterResponseDTO } from "src/dto/responses/UserRegisterResponseDTO";
import { getLoggingUtil } from 'src/utils/logging.util';
const logger = getLoggingUtil('AuthService');

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    async registerUser(payload: UserRegisterDTO): Promise<any | null> {
        try {
            logger.info('REGISTER::USER::INIT', {});

            const hashedPassword = await this.hashPassword(payload.password)

            const user = await this.prisma.user.create({
                data: {
                    name: payload.name,
                    username: payload.username,
                    email: payload.email,
                    password: hashedPassword
                },
            })
            const response = await this.buildUserRegisterResponse(user);
            logger.info('REGISTER::USER::SUCCESS', {});
            return response;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    // Unique constraint violation
                    throw new BadRequestException('Either email or username alreday exists');
                }
            }
            throw error;
        }
    }

    private async hashPassword(password: String) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    }

    private async buildUserRegisterResponse(data: any): Promise<UserRegisterResponseDTO> {
        let user = new UserRegisterResponseDTO()
        user.id = data.id;
        user.name = data.name;
        user.username = data.username;
        user.email = data.email;
        user.createdAt = data.createdAt;
        user.updatedAt = data.updatedAt;
        return user;
    }

    public async login(payload: UserLoginDTO) {
        try {

            let user = await this.prisma.user.findUnique({
                where: {
                    email: payload.email,
                },
            })
            if (!user) {
                throw new NotFoundException(`User with email: ${payload.email} not found`);
            }
            await this.validateUser(payload, user);

            const userData = { userId: user.id, email: user.email };
            const accessToken = this.jwtService.sign(userData, { expiresIn: '24h' });
            console.log("--------> accessToken", accessToken)

            const updateUser = await this.prisma.user.update({
                where: {
                    email: payload.email,
                },
                data: {
                    accessToken: accessToken,
                },
            }) // Saving the access token to the user table

            return {
                access_token: accessToken,
            };
        } catch (error) {
            console.error("user login Err", error)
            if (error instanceof UnauthorizedException) {
                throw new UnauthorizedException('Invalid credentials');
            }
            throw new BadRequestException('User login failed')
        }

    }

    private async validateUser(payload: UserLoginDTO, user: any): Promise<any> {
        console.log("------> hello 1")
        if (await bcrypt.compare(payload.password, user.password)) {
            console.log("------> hello 2")
            return true;
        }
        throw new UnauthorizedException('Invalid credentials');
    }
}
