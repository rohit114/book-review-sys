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
        private readonly prisma: PrismaService
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
            console.error("Err user register ", error.message)
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
        logger.info('REGISTER::USER::BUILD::RESPONSE::START', {});
        let user = new UserRegisterResponseDTO()
        user.id = data.id;
        user.name = data.name;
        user.username = data.username;
        user.email = data.email;
        user.createdAt = data.createdAt;
        user.updatedAt = data.updatedAt;
        logger.info('REGISTER::USER::BUILD::RESPONSE::SUCCESS', {});
        return user;
    }

    public async login(payload: UserLoginDTO) {
        try {
            logger.info('LOGIN::USER::START', {});
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
            await this.prisma.user.update({
                where: {
                    email: payload.email,
                },
                data: {
                    accessToken: accessToken,
                },
            }) // Saving the access token to the user table
            logger.info('LOGIN::USER::SUCCESS', {});
            return {
                access_token: accessToken,
            };
        } catch (error) {
            console.error("Err user login ", error.message)
            throw error
        }

    }

    private async validateUser(payload: UserLoginDTO, user: any): Promise<any> {
        logger.info('LOGIN::USER::VALIDATE::START', {});
        if (await bcrypt.compare(payload.password, user.password)) {
            logger.info('LOGIN::USER::VALIDATE::SUCCESS', {});
            return true;
        }
        throw new UnauthorizedException('Invalid credentials');
    }
}
