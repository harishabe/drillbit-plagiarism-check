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
                isLoadingFolder: true,
            };
        case types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_SUCCESS:
            return {
                ...state,
                isLoadingFolder: false,
                createFolder: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_FAIL:
            return {
                ...state,
                isLoadingFolder: false,
                createFolderError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_EDIT_MY_FOLDERS_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_EDIT_MY_FOLDERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                editFolder: action.payload,
            };
        case types.FETCH_INSTRUCTOR_EDIT_MY_FOLDERS_FAIL:
            return {
                ...state,
                isLoading: false,
                editFolder: action.payload,
            };
        case types.FETCH_INSTRUCTOR_DELETE_FOLDER_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_DELETE_FOLDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deleteFolder: action.payload,
            };
        case types.FETCH_INSTRUCTOR_DELETE_FOLDER_FAIL:
            return {
                ...state,
                isLoading: false,
                deleteFolderError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSION_LIST_START:
            return {
                ...state,
                isLoadingSubmission: true,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSION_LIST_SUCCESS:
            return {
                ...state,
                isLoadingSubmission: false,
                submissionData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSION_LIST_FAIL:
            return {
                ...state,
                isLoadingSubmission: false,
                submissionDataError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSION_LIST_UPLOAD_START:
            return {
                ...state,
                isLoadingUpload: true,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSION_LIST_UPLOAD_SUCCESS:
            return {
                ...state,
                isLoadingUpload: false,
                uploadData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSION_LIST_UPLOAD_FAIL:
            return {
                ...state,
                isLoadingUpload: false,
                uploadData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_ZIP_EXTRACTED_UPLOAD_DATA_CLEAR:
            return {
                ...state,
                uploadData: '',
            };
        case types.FETCH_UPLOAD_EXTRACTED_ZIP_FILE_START:
            return {
                ...state,
                isLoadingExtractedFile: true,
            };
        case types.FETCH_UPLOAD_EXTRACTED_ZIP_FILE_SUCCESS:
            return {
                ...state,
                isLoadingExtractedFile: false,
                extractedFileData: action.payload,
            };
        case types.FETCH_UPLOAD_EXTRACTED_ZIP_FILE_FAIL:
            return {
                ...state,
                isLoadingExtractedFile: false,
                extractedFileData: action.payload,
            };
        case types.FETCH_ADMIN_MULTIPLE_STUDENT_UPLOAD_DATA_CLEAR:
            return {
                ...state,
                extractedFileData: '',
            };
        case types.FETCH_INSTRUCTOR_SUBMISSION_LIST_DELETE_START:
            return {
                ...state,
                isLoadingDelete: true,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSION_LIST_DELETE_SUCCESS:
            return {
                ...state,
                isLoadingDelete: false,
                deleteData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_SUBMISSION_LIST_DELETE_FAIL:
            return {
                ...state,
                isLoadingDelete: false,
                deleteDataError: action.payload,
            };
        default:
            return state;
    }
};

export default MyFoldersInstructorReducer;
