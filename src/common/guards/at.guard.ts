import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class AtGuard extends AuthGuard('jwt'){
    constructor(private reflector : Reflector){
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const is_Public = this.reflector.getAllAndOverride('is_Public', [
            context.getHandler(),
            context.getClass(),
        ]);
        if(is_Public) return true;
        return super.canActivate(context)
    }
}