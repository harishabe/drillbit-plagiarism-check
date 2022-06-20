import * as types from '../ActionType';

/**
 * Get all classes data
 */
export const GetClassesData = (paginationPayload) => {
    return {
        type: types.FETCH_STUDENTS_CLASSES_DATA_START, paginationPayload: paginationPayload
    };
};

/**
 * Get all assignments data
 */
export const GetAssignmentData = (paginationPayload) => {
    return {
        type: types.FETCH_STUDENTS_ASSIGNMENT_DATA_START, paginationPayload: paginationPayload
    };
};

/**
 * Get all submission data
 */
export const GetSubmissionData = () => {
    return {
        type: types.FETCH_STUDENTS_SUBMISSION_DATA_START
    };
};