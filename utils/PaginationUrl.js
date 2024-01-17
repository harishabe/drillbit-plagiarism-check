export const PaginationUrl = (paginationPayload) => {
    if (paginationPayload.hasOwnProperty('search')) {
        return '?page=' + paginationPayload.page + '&size=' + paginationPayload.size + '&field=' + paginationPayload.field + '&orderBy=' + paginationPayload.orderBy + '&search=' + paginationPayload.search;
    } else {
        return '?page=' + paginationPayload.page + '&size=' + paginationPayload.size + '&field=' + paginationPayload.field + '&orderBy=' + paginationPayload.orderBy;
    }
};

export const PaginationValue = {
    'page': 0,
    'size': 24,
    'field': 'user_id',
    'orderBy': 'desc'
};

export const InstructorPaginationValue = {
    'page': 0,
    'size': 24,
    'field': 'class_id',
    'orderBy': 'desc'
}

export const InstructorFolderPaginationValue = {
    'page': 0,
    'size': 24,
    'field': 'ass_id',
    'orderBy': 'desc'
}
export const StudentSubmissionsPaginationValue = {
    'page': 0,
    'size': 24,
    'field': 'paper_id',
    'orderBy': 'desc'
}
export const FolderSubmissionsPaginationValue = {
    'page': 0,
    'size': 25,
    'field': 'paper_id',
    'orderBy': 'desc'
}
export const SuperAdminPaginationValue = {
    'page': 0,
    'size': 25,
    'field': 'name',
    'orderBy': 'desc'
}
export const ConsortiumPaginationValue = {
    'page': 0,
    'size': 25,
    'field': 'lid',
    'orderBy': 'desc'
}
