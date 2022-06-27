import * as types from '../ActionType';

/**
 * Get all Widgets data
 */
export const GetDashboardData = () => {
    return {
        type: types.FETCH_STUDENT_DASHBOARD_WIDGET_START
    };
};

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
export const GetAssignmentData = (id, paginationPayload) => {
    return {
        type: types.FETCH_STUDENTS_ASSIGNMENT_DATA_START, id: id, paginationPayload: paginationPayload
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