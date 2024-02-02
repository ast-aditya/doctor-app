import { Body, Controller, Get, HttpException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthPayloadDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { userRegistrationDto } from './dto/register.dto';

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

    @ApiOperation({ summary: 'Register user with role' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    example: 'tester1@gmail.com',
                    description: 'The username of the user'
                },
                password: {
                    type: 'string',
                    example: 'tester1',
                    description: 'The password of the user'
                },
                role: {
                    type: 'string',
                    example: 'patient',
                    description: 'The role of the user'
                },
            },
        },
    })
    
    @Post('register')
    registerUser(@Body() UserRegistrationDto: userRegistrationDto) {
      return this.authService.registerUser(UserRegistrationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('verify-otp')
    async verifyOtp(@Body('otp') otp: string, @Req() req: Request) {
        const username = req.user;
        return this.authService.verifyOtp(username, otp);
    }

    @ApiOperation({ summary: 'get all doctors' })
    @Get('doctors')
    async getAllDoctors() {
        return this.authService.getAllDoctors();
    }

    @ApiOperation({ summary: 'get all patients' })
    @Get('patients')
    async getAllPatients() {
        return this.authService.getAllPatients();
    }

    @ApiOperation({ summary: 'Delete user by ID' })
    @Get(':id/deleteUser')
    async deleteUser(@Param('id') id: string) {
        return this.authService.deleteUser(id);
    }
}
