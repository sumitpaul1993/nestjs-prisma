import {
    IsEmail,
    IsNotEmpty
} from 'class-validator';

/**
 * Loin data transfer object
 */
export class LoginDto {
    @IsNotEmpty({
        message: "Email required."
    })
    @IsEmail({}, {
        message: "Wrong email format."
    })
    readonly email: string;

    @IsNotEmpty({
        message: "Password required."
    })
    readonly password: string;
}
