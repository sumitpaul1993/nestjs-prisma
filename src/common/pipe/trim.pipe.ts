import {
    Injectable, PipeTransform,
    ArgumentMetadata, BadRequestException
} from '@nestjs/common'

@Injectable()
export class TrimPipe implements PipeTransform {
    private isObj(obj: any): boolean {
        return typeof obj === 'object' && obj !== null
    }

    private trim(values:any) {
        Object.keys(values).forEach(key => {
            if (key !== 'password') {
                if (this.isObj(values[key])) {
                    values[key] = this.trim(values[key])
                } else {
                    if (typeof values[key] === 'string') {
                        values[key] = values[key].trim()
                    }
                }
            }
        })
        return values
    }

    transform(values: any, metadata: ArgumentMetadata) {
        const { type } = metadata
        // if (this.isObj(values) && type === 'body') {
        if (this.isObj(values)) {
            return this.trim(values)
        }else {
            return values
        }
        console.log('file: common/pipes/trim.pipe.ts')
        throw new BadRequestException('Validation failed')
    }
}