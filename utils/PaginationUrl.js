export const PaginationUrl = (paginationPayload) => {
    if (paginationPayload.hasOwnProperty('search')) {
        return '?page=' + paginationPayload.page + '&size=' + paginationPayload.size + '&field=' + paginationPayload.field + '&orderBy=' + paginationPayload.orderBy + '&search=' + paginationPayload.search;
    } else {
        return '?page=' + paginationPayload.page + '&size=' + paginationPayload.size + '&field=' + paginationPayload.field + '&orderBy=' + paginationPayload.orderBy;
    }
};

export const PaginationValue = {
    'page': 0,
    'size': 6,
    'field': 'user_id',
    'orderBy': 'asc'
};

export const InstructorPaginationValue = {
    'page': 0,
    'size': 6,
    'field': 'class_id',
    'orderBy': 'asc'
}

export const InstructorFolderPaginationValue = {
    'page': 0,
    'size': 6,
    'field': 'ass_id',
    'orderBy': 'asc'
}
export const StudentSubmissionsPaginationValue = {
    'page': 0,
    'size': 6,
    'field': 'paper_id',
    'orderBy': 'asc'
}
export const FolderSubmissionsPaginationValue = {
    'page': 0,
    'size': 6,
    'field': 'name',
    'orderBy': 'asc'
}