import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    HttpException,
    HttpStatus,
    CallHandler,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import * as jwt from 'jsonwebtoken';
  
  @Injectable()
  export class AccessTokenInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const authorizationHeader = request.headers.authorization;
      console.log('Access Token Intercepted...checking....');
      if (!authorizationHeader) {
        console.log('No auth header');
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
  
      const [bearer, token] = authorizationHeader.split(' ');
  
      if (!token) {
        console.log('No token');
        throw new HttpException(
          'Unauthorized, Access token not Provided',
          HttpStatus.UNAUTHORIZED,
        );
      }
  
      try {
        //   console.log('trying');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded token', decodedToken);
        return next.handle();
      } catch (error) {
        console.error(error);
        throw new HttpException('Access Token Expired', HttpStatus.UNAUTHORIZED);
      }
    }
  }
  
  export class RefreshTokenInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const token = request.body.refreshToken;
      console.log('Refresh Token Intercepted...checking....');
      if (!token) {
        console.log('No auth header');
        throw new HttpException(
          'Unauthorized, Refresh Token Not Provided',
          HttpStatus.UNAUTHORIZED,
        );
      }
      try {
        //   console.log('trying');
        const decodedToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        console.log('decoded token', decodedToken);
        return next.handle();
      } catch (error) {
        console.error(error);
        throw new HttpException(
          'Unauthorized, Refresh Token Expired',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }