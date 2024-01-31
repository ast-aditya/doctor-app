import { Body, Controller, Get, HttpException, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
    
    @Post('login')
    @UseGuards(LocalGuard)
    @ApiOperation({ summary: 'Log in a user' })
    @ApiBody({
        schema : {
            type: 'object',
            properties: {
                username : {
                    type : 'string',
                    example : 'testuser',
                    description : 'this is a unique username'
                },
                password : {
                    type: 'string',
                    example: 'testuserpass',
                    description: 'This contains password for the username'
                }
            }
        }
    })
    @ApiResponse({ status: 201, description: 'The patient has been successfully created.'})
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid Password or username'})
    
    login(@Body() authPayload : AuthPayloadDto)
    {
        const user = this.authService.validateUser(authPayload);
        if(!user) throw new HttpException('Invalid credentials' , 401);
        return user;
    }
}
