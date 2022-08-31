import * as types from '../../action/ActionType';

const DetailsStudentReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_STUDENT_DASHBOARD_WIDGET_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_STUDENT_DASHBOARD_WIDGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                dashboardData: action.payload,
            };
        case types.FETCH_STUDENT_DASHBOARD_WIDGET_FAIL:
            return {
                ...state,
                isLoading: false,
                dashboardError: action.payload,
            };
        case types.FETCH_STUDENTS_CLASSES_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_STUDENTS_CLASSES_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                classesData: action.payload,
            };
        case types.FETCH_STUDENTS_CLASSES_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                classesError: action.payload,
            };
        case types.FETCH_STUDENTS_ASSIGNMENT_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_STUDENTS_ASSIGNMENT_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                assignmentData: action.payload,
            };
        case types.FETCH_STUDENTS_ASSIGNMENT_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                assignmentError: action.payload,
            };
        case types.FETCH_STUDENTS_SUBMISSION_DETAILS_START:
            return {
                ...state,
                isLoadingSubmission: true,
            };
        case types.FETCH_STUDENTS_SUBMISSION_DETAILS_SUCCESS:
            return {
                ...state,
                isLoadingSubmission: false,
                submissionData: action.payload,
            };
        case types.FETCH_STUDENTS_SUBMISSION_DETAILS_FAIL:
            return {
                ...state,
                isLoadingSubmission: false,
                submissionError: action.payload,
            };
        case types.FETCH_STUDENTS_SUBMISSION_DETAILS_HEADER_START:
            return {
                ...state,
                isLoadingHeader: true,
            };
        case types.FETCH_STUDENTS_SUBMISSION_DETAILS_HEADER_SUCCESS:
            return {
                ...state,
                isLoadingHeader: false,
                headerData: action.payload,
            };
        case types.FETCH_STUDENTS_SUBMISSION_DETAILS_HEADER_FAIL:
            return {
                ...state,
                isLoadingHeader: false,
                headerError: action.payload,
            };
        case types.FETCH_STUDENTS_NEW_SUBMISSION_START:
            return {
                ...state,
                isLoadingNewSubmission: true,
            };
        case types.FETCH_STUDENTS_NEW_SUBMISSION_SUCCESS:
            return {
                ...state,
                isLoadingNewSubmission: false,
                newData: action.payload,
            };
        case types.FETCH_STUDENTS_NEW_SUBMISSION_FAIL:
            return {
                ...state,
                isLoadingNewSubmission: false,
                newDataError: action.payload,
            };
        case types.FETCH_STUDENTS_SUBMISSION_HISTORY_DOWNLOAD_START:
            return {
                ...state,
                isLoadingDownload: true,
            };
        case types.FETCH_STUDENTS_SUBMISSION_HISTORY_DOWNLOAD_SUCCESS:
            return {
                ...state,
                isLoadingDownload: false,
                downloadData: action.payload,
            };
        case types.FETCH_STUDENTS_SUBMISSION_HISTORY_DOWNLOAD_FAIL:
            return {
                ...state,
                isLoadingDownload: false,
                downloadError: action.payload,
            };
        case types.FETCH_STUDENTS_QA_DETAILS_START:
            return {
                ...state,
                isLoadingQa: true,
            };
        case types.FETCH_STUDENTS_QA_DETAILS_SUCCESS:
            return {
                ...state,
                isLoadingQa: false,
                qnaData: action.payload,
            };
        case types.FETCH_STUDENTS_QA_DETAILS_FAIL:
            return {
                ...state,
                isLoadingQa: false,
                qnaError: action.payload,
            };
        case types.FETCH_STUDENTS_QA_ANSWER_DETAILS_START:
            return {
                ...state,
                isLoadingAns: true,
            };
        case types.FETCH_STUDENTS_QA_ANSWER_DETAILS_SUCCESS:
            return {
                ...state,
                isLoadingAns: false,
                qnaAnsData: action.payload,
            };
        case types.FETCH_STUDENTS_QA_ANSWER_DETAILS_FAIL:
            return {
                ...state,
                isLoadingAns: false,
                qnaAnsError: action.payload,
            };
        case types.FETCH_STUDENTS_FEEDBACK_DETAILS_START:
            return {
                ...state,
                isLoadingFeedback: true,
            };
        case types.FETCH_STUDENTS_FEEDBACK_DETAILS_SUCCESS:
            return {
                ...state,
                isLoadingFeedback: false,
                feedbackData: action.payload,
            };
        case types.FETCH_STUDENTS_FEEDBACK_DETAILS_FAIL:
            return {
                ...state,
                isLoadingFeedback: false,
                feedbackError: action.payload,
            };
        default:
            return state;
    }
};

export default DetailsStudentReducer;
