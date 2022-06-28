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
export const GetAssignmentData = (class_id, paginationPayload) => {
    return {
        type: types.FETCH_STUDENTS_ASSIGNMENT_DATA_START, class_id: class_id, paginationPayload: paginationPayload
    };
};

/**
 * Get all submission data
 */
export const GetSubmissionData = (class_id, folder_id) => {
    return {
        type: types.FETCH_STUDENTS_SUBMISSION_DETAILS_START, class_id: class_id, folder_id: folder_id
    };
};

/**
 * Get all Q&A data
 */
export const GetQna = (class_id, folder_id) => {
    return {
        type: types.FETCH_STUDENTS_QA_DETAILS_START, class_id: class_id, folder_id: folder_id
    };
};

/**
 * Get all Feedback data
 */
export const GetFeedback = (class_id, folder_id, paper_id) => {
    return {
        type: types.FETCH_STUDENTS_FEEDBACK_DETAILS_START, class_id: class_id, folder_id: folder_id, paper_id: paper_id
    };
};