import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    UnprocessableEntityException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
    async transform(
        _value: any, //value: any
        { metatype }: ArgumentMetadata,
    ) {
        if (!metatype || !this.toValidate(metatype)) {
            return _value; //value;
        }
        let value = _value ?? {} // this line added by sumit
        const object = plainToClass(metatype, value, {
            enableCircularCheck: true,
        });
        const errors = await validate(object);
        if (errors && errors.length > 0) {
            const translatedError = await this.transformError(
                errors,
            );
            throw new UnprocessableEntityException(
                translatedError,
            );
        }
        return value;
    }

    async transformError(errors: ValidationError[]) {
        const data: {
            property: string
            constraints: any
        }[] = [];
        for (const error of errors) {
            data.push({
                property: error.property,
                constraints: error.constraints,
            });
        }
        return data;
    }

    private toValidate(metatype: unknown): boolean {
        const types: unknown[] = [
            String,
            Boolean,
            Number,
            Array,
            Object,
        ];
        return !types.includes(metatype);
    }
}
