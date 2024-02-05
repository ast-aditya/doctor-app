import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common';
import { NauthService } from './nauth.service';
import { AuthRegisterDto } from './dto/auth.dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';

@Controller('nauth')
export class NauthController {
    constructor(private nauthService : NauthService){}

    @Public()
    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() dto : AuthRegisterDto) : Promise<Tokens>{
        return this.nauthService.signupLocal(dto); 
    }
    
    @Public()
    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto : AuthRegisterDto){
        return this.nauthService.siginLocal(dto);
    }
    @UseGuards(AtGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() user_Id : string){
        return this.nauthService.logout(user_Id);
    }
    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUserId() user_Id : string,
        @GetCurrentUser('refreshToken') refreshToken : string
        ){
        return this.nauthService.refreshTokens(user_Id, refreshToken);
    }

    // routes for users
    @Public()
    @Get()
    getUsers(@Query() query: any) {
        return this.nauthService.getUsers(query);
    }
}
