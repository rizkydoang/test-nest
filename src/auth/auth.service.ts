import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    signin() {
        return { msg: 'Sign In Service' }
    }

    signup() {
        return { msg: 'Sign Up Services' }
    }
}