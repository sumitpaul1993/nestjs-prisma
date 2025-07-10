import { SetMetadata } from '@nestjs/common';

export const CustomMetaValue = (value: {
    menu: string,
    permission: string
}) => SetMetadata('permissionObject', value);