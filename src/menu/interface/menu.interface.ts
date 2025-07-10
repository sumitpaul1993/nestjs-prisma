export interface IGetAllPermissionDataRo {
    id: string;
    name: string;
    slug: string;
}

export interface IGetAllMenuDataRo {
    id: string;
    name: string;
    slug: string;
    permission: IGetAllPermissionDataRo[]
}