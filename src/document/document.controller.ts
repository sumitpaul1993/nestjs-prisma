import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CustomMetaValue } from 'src/common/decorator/customMeta.decorator';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { PermissionGuard } from 'src/common/guard/permission.guard';
import { FileSizeValidationPipe } from 'src/common/pipe/fileSizeValidation.pipe';
import { MenuPermissionConstants } from 'src/menu/constants/menuPermission.constants';
import { DocumentService } from './document.service';
import { diskStorage } from 'multer';

@Controller('document')
export class DocumentController {
    constructor(
        private readonly documentService: DocumentService
    ) { }

    @CustomMetaValue({
        menu: MenuPermissionConstants.document.menuSlug,
        permission: MenuPermissionConstants.document.permissions.create.slug
    })
    @UseGuards(AuthGuard, PermissionGuard)
    @ApiBearerAuth()
    @Post('/')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'public/upload',
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}.pdf`);
            },
        }),
    }))
    addDocument(
        @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
    ) {
        return this.documentService.addDocument(file)
    }

}
