import * as types from '../../action/ActionType';

const MyFoldersInstructorReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_INSTRUCTOR_MY_FOLDERS_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_MY_FOLDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                myFolders: action.payload,
            };
        case types.FETCH_INSTRUCTOR_MY_FOLDERS_FAIL:
            return {
                ...state,
                isLoading: false,
                myFoldersError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                createFolder: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_FAIL:
            return {
                ...state,
                isLoading: false,
                createFolderError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_START:
            return {
                ...state,
                isLoadingSubmission: true,
            };
        case types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_SUCCESS:
            return {
                ...state,
                isLoadingSubmission: false,
                submissionData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_FAIL:
            return {
                ...state,
                isLoadingSubmission: false,
                submissionDataError: action.payload,
            };

        default:
            return state;
    }
};

export default MyFoldersInstructorReducer;
