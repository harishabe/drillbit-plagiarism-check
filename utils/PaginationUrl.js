export const PaginationUrl = (paginationPayload) => {
    if (paginationPayload.hasOwnProperty('search')) {
        return '?page=' + paginationPayload.page + '&size=' + paginationPayload.size + '&field=' + paginationPayload.field + '&orderBy=' + paginationPayload.orderBy + '&search=' + paginationPayload.search;
    } else {
        return '?page=' + paginationPayload.page + '&size=' + paginationPayload.size + '&field=' + paginationPayload.field + '&orderBy=' + paginationPayload.orderBy;
    }
};

export const PaginationValue = {
    'page': 0,
    'size': 1,
    'field': 'user_id',
    'orderBy': 'asc'
};
