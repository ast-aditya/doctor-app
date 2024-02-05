import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            try {
                console.log("running from middleware")
                const decoded = this.jwtService.verify(token);
                console.log(decoded._doc._id)
                // req.user = decoded._doc.username;
                req.user = {
                    id: decoded._doc._id,
                    username: decoded._doc.username
                };
                if(!req.user){
                    throw new ForbiddenException("Not authorized");
                } 
            } catch (err) {
                console.log('Invalid token');
            }
        }
        next();
    }
}
