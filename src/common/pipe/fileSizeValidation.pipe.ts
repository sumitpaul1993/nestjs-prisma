
import { PipeTransform, Injectable, ArgumentMetadata, UnprocessableEntityException, HttpStatus } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    const twoMB = 2000000;
    // console.log("value", value)

    if (value.size > twoMB) {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.PAYLOAD_TOO_LARGE,
        error: 'Payload too larger, allowed only 2 MB!',
        message: [
          {
            value: '',
            msg: 'Payload too larger, allowed only 2 MB.',
            param: 'global',
            location: 'file',
          },
        ],
      });
    }

    if (value.mimetype != 'application/pdf') {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.NOT_ACCEPTABLE,
        error: 'Only pdf allowed!',
        message: [
          {
            value: '',
            msg: 'Only pdf allowed.',
            param: 'global',
            location: 'file',
          },
        ],
      });
    }

    return value;

  }
}
