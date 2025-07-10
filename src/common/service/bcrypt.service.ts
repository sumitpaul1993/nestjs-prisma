import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AppConfigService } from 'src/config/config.service';

@Injectable()
export class BcryptService {
    constructor(
        @Inject()
        private readonly appConfigService: AppConfigService,
    ) { }

    /**
     * Hash password
    */
    async hashPassword(password: string, saltNumber: number): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const salt = await bcrypt.genSalt(saltNumber);
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
