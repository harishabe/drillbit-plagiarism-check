const PaginationUrl = (paginationPayload) => {
    return '?page=' + paginationPayload.page + '&size=' + paginationPayload.size + '&field=' + paginationPayload.field + '&orderBy=' + paginationPayload.orderBy;
};

export default PaginationUrl;
