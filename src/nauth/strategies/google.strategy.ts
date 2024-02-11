import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Profile, Strategy, VerifyCallback} from 'passport-google-oauth20'
import { NauthService } from "../nauth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(private authService : NauthService){
        super({
            clientID: '569852703196-99ene8o0pca7migjcbi4s6mb1gbo0jg8.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/users/google/callback',
            scope: ['profile' , 'email'] 
        });
    }

    async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const user = {
          email: emails[0].value,
          firstName: name.givenName,
          lastName: name.familyName,
          picture: photos[0].value,
          accessToken,
          refreshToken
        }
        done(null, user);
      }
}