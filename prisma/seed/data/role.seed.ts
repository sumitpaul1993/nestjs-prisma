import { RoleConstants } from "../../../src/role/constants/role.constants";

export const RoleSeed = [
    {
        name: RoleConstants.admin.name,
        slug: RoleConstants.admin.slug
    },
    {
        name: RoleConstants.editor.name,
        slug: RoleConstants.editor.slug
    },
    {
        name: RoleConstants.viewer.name,
        slug: RoleConstants.viewer.slug
    },
];
