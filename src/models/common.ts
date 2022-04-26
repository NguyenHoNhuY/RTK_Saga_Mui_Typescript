export interface PaginationParams {
    _page: number;
    _limit: number;
    _totalRows: number;
}
export interface ListResponse<T> {
    data: T[];
    pagination: PaginationParams;
}

export interface ListParams {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'asc' | 'desc';

    //*key bat ky va kieu du lieu bat ky
    [key: string]: any;
}
