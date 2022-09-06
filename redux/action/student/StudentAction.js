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
 * Get all submission header data
 */
export const GetSubmissionHeaderData = (class_id, folder_id) => {
    return {
        type: types.FETCH_STUDENTS_SUBMISSION_DETAILS_HEADER_START, class_id: class_id, folder_id: folder_id
    };
};

/**
 * Get all submission data
 */
export const GetSubmissionData = (class_id, folder_id, paginationPayload) => {
    return {
        type: types.FETCH_STUDENTS_SUBMISSION_DETAILS_START, class_id: class_id, folder_id: folder_id, paginationPayload: paginationPayload
    };
};

/**
 * Students submission header data download
 */
export const DownloadStudentCsv = (url) => {
    return {
        type: types.FETCH_STUDENTS_SUBMISSION_HISTORY_DOWNLOAD_START, url: url
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
export const GetFeedback = (class_id, folder_id) => {
    return {
        type: types.FETCH_STUDENTS_FEEDBACK_DETAILS_START, class_id: class_id, folder_id: folder_id, 
    };
};

/**
 * Send answer from Qna
 */
export const SendData = (data, class_id, folder_id) => {
    return {
        type: types.FETCH_STUDENTS_QA_ANSWER_DETAILS_START, query: data, class_id: class_id, folder_id: folder_id
    };
};

/**
 * Send new submission
 */
export const NewSubmission = (data, class_id, folder_id) => {
    return {
        type: types.FETCH_STUDENTS_NEW_SUBMISSION_START, query: data, class_id: class_id, folder_id: folder_id
    };
};

/**
 * Students assignment instruction data download
 */
export const DownloadAssignmentInstruction = (class_id, folder_id) => {
    return {
        type: types.FETCH_STUDENTS_ASSIGNMENT_INSTRUCTIONS_DOWNLOAD_START, class_id: class_id, folder_id: folder_id
    };
};