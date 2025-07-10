import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AppConfigService } from 'src/config/config.service';

@Injectable()
export class BcryptService {
    constructor(
    ) { }

    /**
     * Hash password
    */
    async hashPassword(password: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const salt = await bcrypt.genSalt(10);
            bcrypt.hash(password, salt, function (err: any, hash: string) {
                if (err) reject(err);
                resolve(hash);
            });
        });
    }

    /**
     * compare/check password
    */
    async comparePassword(
        password: string,
        hash: string
    ): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            bcrypt.compare(password, hash, function (err: any, result: boolean) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}
