import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteFilterService } from 'src/common/module/deleteFilter.service';
import { AppConfigService } from 'src/config/config.service';
import { DatabaseService } from 'src/database/database.service';
import { DocumentIdDto } from './dto/documentId.dto';
import { IGetDocumentLinkDataRo, IGetDocumentsDataRo } from './interface/document.interface';

@Injectable()
export class DocumentService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly deleteFilterService: DeleteFilterService,
        private readonly appConfigService: AppConfigService
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

    async documentList(): Promise<IGetDocumentsDataRo[] | []> {
        let list;
        try {
            list = await this.prisma.document.findMany({
                where: this.deleteFilterService.filterDeleted(),
                select: {
                    id: true,
                    original_name: true
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

        return list;
    }

    async documentLink(documentIdDto: DocumentIdDto): Promise<IGetDocumentLinkDataRo | null> {
        const { id } = documentIdDto

        let link;
        try {
            link = await this.prisma.document.findFirst({
                where: this.deleteFilterService.filterDeleted({
                    id: id
                }),
                select: {
                    name: true
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

        let resData: IGetDocumentLinkDataRo | null = null
        if (link) {
            resData = {
                file_name: link.name,
                base_url: this.appConfigService.documentBaseLink,
                full_link: this.appConfigService.documentBaseLink + link.name
            }
        }

        return resData
    }

    async deleteDocument(documentIdDto: DocumentIdDto) {
        const { id } = documentIdDto

        let link;
        try {
            link = await this.prisma.document.update({
                data: {
                    deleted_at: new Date()
                },
                where: this.deleteFilterService.filterDeleted({
                    id: id
                })
            })
        } catch (e) {
            console.log(e)
            throw new HttpException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'internal_error',
                error: e,
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return true
    }
}
