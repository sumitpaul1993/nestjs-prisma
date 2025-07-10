import { Inject, Injectable } from '@nestjs/common';
import * as JWT from 'jsonwebtoken';
import { AppConfigService } from 'src/config/config.service';

@Injectable()
export class JWTService {
    constructor(
    ) { }

    /**
     * create JWT token
    */
    async createToken(
        data: Object,
        secretKey: string,
        expiresIn: string = "1h"
    ): Promise<string> {
        return new Promise(async (resolve, reject) => {
            JWT.sign(data, secretKey, {
                expiresIn: expiresIn
            }, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    /**
     * create JWT token
    */
    async verifyToken(
        token: string,
        secretKey: string,
    ): Promise<{id:string}> {
        return new Promise(async (resolve, reject) => {
            JWT.verify(token, secretKey, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }
}
