import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { userRegistrationDto } from "src/auth/dto/register.dto";
import { GetCurrentUser, GetCurrentUserId, Public } from "src/common/decorators";
import { NauthService } from "./nauth.service";
import { AuthRegisterDto } from "./dto/auth.dto";
import { Response } from "express";
import { RtGuard } from "src/common/guards";

@Controller('users')
export class UserController {
    constructor(private UserService: UserService,
        private nauthService : NauthService) { }
        
    @Public()
    @Get()
    getUsers(@Query() query: any) {
        return this.UserService.getUsers(query);
    }

    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(
        @Body() UserDto: AuthRegisterDto,
        @Res() res: Response,
    ) {
        const tokens = await this.nauthService.signupLocal(UserDto);
        return res.status(201).json({ tokens });
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDTO: AuthRegisterDto, @Res() res: Response) {
        const data = await this.nauthService.siginLocal(loginDTO);
        return res.status(200).json(data);
    }

    @Public()
    @UseGuards(RtGuard)
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    refreshToken(@GetCurrentUser() user: any, @Req() req: any) {
        return this.nauthService.refreshTokens(user.sub, user.refreshToken);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(
      @GetCurrentUserId() user_Id: any,
      @Res() res: Response,
    ) {
      await this.nauthService.logout(user_Id);
      return res.status(200).json({ msg: 'logged out' });
    }
}