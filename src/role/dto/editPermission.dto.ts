import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

/**
 * Edit Permission data transfer object
 */

class PermisionDtoParam {
    @IsNotEmpty({
        message: "Permission ID required."
    })
    readonly permissionId: string;
}

class MenuPermissionDtoParam {
    @IsNotEmpty({
        message: "Menu ID required."
    })
    readonly menuId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PermisionDtoParam)
    readonly permission: PermisionDtoParam[]
}

export class EditPermissionDto {
    @IsNotEmpty({
        message: "Role ID required."
    })
    readonly roleId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MenuPermissionDtoParam)
    readonly menuPermission: MenuPermissionDtoParam[];
}
