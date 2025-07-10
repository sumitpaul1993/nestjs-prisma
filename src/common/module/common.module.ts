import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeleteFilterService } from 'src/common/module/deleteFilter.service';
import { DatabaseModule } from 'src/database/database.module';
import { BcryptService } from './bcrypt.service';
import { JWTService } from './jwt.service';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [],
    providers: [
        BcryptService,
        DeleteFilterService,
        JWTService
    ],
    exports: [
        BcryptService,
        DeleteFilterService,
        JWTService
    ]
})
export class CommonModule { }
