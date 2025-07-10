import {
    IsEmail,
    IsNotEmpty,
    IsString
} from 'class-validator';

/**
 * Register data transfer object
 */
export class RegisterDto {
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

    @IsNotEmpty({
        message: "Name required."
    })
    @IsString({
        message: "Name should not containt numbers or special character"
    })
    readonly name: string;

    @IsNotEmpty({
        message: "Role required."
    })
    readonly roleId: string;
}
