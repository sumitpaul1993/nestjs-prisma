import { MenuPermissionConstants } from "../../../src/menu/constants/menuPermission.constants";

export const MenuPermissionSeed = [
    {
        name: MenuPermissionConstants.document.menuName,
        slug: MenuPermissionConstants.document.menuSlug,
        permission: [
            {
                name: MenuPermissionConstants.document.permissions.create.name,
                slug: MenuPermissionConstants.document.permissions.create.slug
            },
            {
                name: MenuPermissionConstants.document.permissions.retrive.name,
                slug: MenuPermissionConstants.document.permissions.retrive.slug
            },
            {
                name: MenuPermissionConstants.document.permissions.update.name,
                slug: MenuPermissionConstants.document.permissions.update.slug
            },
            {
                name: MenuPermissionConstants.document.permissions.destroy.name,
                slug: MenuPermissionConstants.document.permissions.destroy.slug
            }
        ]
    },
    {
        name: MenuPermissionConstants.role.menuName,
        slug: MenuPermissionConstants.role.menuSlug,
        permission: [
            {
                name: MenuPermissionConstants.role.permissions.updatePermission.name,
                slug: MenuPermissionConstants.role.permissions.updatePermission.slug
            },
        ]
    }
]