import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req, Res, UseGuards,Headers, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { GetCurrentUser, GetCurrentUserId, Public } from "src/common/decorators";
import { NauthService } from "./nauth.service";
import { login_Dto, register_Dto, update_Dto } from "./dto/auth.dto";
import { Response } from "express";
import { RtGuard } from "src/common/guards";
import { RefreshTokenInterceptor } from "./nauth.interceptor";
import { ApiOperation, ApiBearerAuth, ApiResponse } from "@nestjs/swagger";

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
    @Post(':id/updateuser')
    async updateUser(@Body() user: update_Dto, @Param('id') userId: string) {
        return this.UserService.updateUser(user, userId);
    }
    @Public()
    @Post(':id/deleteuser')
    async deleteUser(@Param('id') userId: string) {
        return this.UserService.deleteUser(userId);
    }

    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(
        @Body() UserDto: register_Dto,
        @Res() res: Response,
    ) {
        const tokens = await this.nauthService.signupLocal(UserDto);
        return res.status(201).json({ tokens });
    }

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDTO: login_Dto, @Res() res: Response) {
        const data = await this.nauthService.siginLocal(loginDTO);
        return res.status(200).json(data);
    }
    
    @UseInterceptors(RefreshTokenInterceptor)
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