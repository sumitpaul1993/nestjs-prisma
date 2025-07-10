import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MenuService {
    constructor(private readonly prisma: DatabaseService) { }

}
