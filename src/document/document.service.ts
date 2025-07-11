import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteFilterService } from 'src/common/module/deleteFilter.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DocumentService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly deleteFilterService: DeleteFilterService,
    ) { }

    async addDocument(file: Express.Multer.File) {
        const { originalname, filename } = file;

        try {
            await this.prisma.document.create({
                data: {
                    name: filename,
                    original_name: originalname
                }
            })
        } catch (e) {
            console.log(e)
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'internal_error',
                error: e,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return true;
    }
}
