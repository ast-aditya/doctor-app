import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    HttpException,
    HttpStatus,
    CallHandler,
    
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import * as jwt from 'jsonwebtoken';
  @Injectable()
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