import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  HttpException,
  HttpStatus,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
      console.log('No auth header');
      throw new HttpException(
        'Unauthorized, Refresh Token Not Provided',
        HttpStatus.UNAUTHORIZED,
      );
    }

    try {
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
