import * as types from '../../action/ActionType';

const DetailsInstructorReducer = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_INSTRUCTOR_CLASSES_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_CLASSES_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                classesData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CLASSES_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                classesError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_STUDENTS_DATA_START:
            return {
                ...state,
                isLoadingStudent: true,
            };
        case types.FETCH_INSTRUCTOR_STUDENTS_DATA_SUCCESS:
            return {
                ...state,
                isLoadingStudent: false,
                studentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_STUDENTS_DATA_FAIL:
            return {
                ...state,
                isLoadingStudent: false,
                studentError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_STUDENTS_INSTITUTE_DATA_START:
            return {
                ...state,
                isLoadingInstitute: true,
            };
        case types.FETCH_INSTRUCTOR_STUDENTS_INSTITUTE_DATA_SUCCESS:
            return {
                ...state,
                isLoadingInstitute: false,
                instituteData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_STUDENTS_INSTITUTE_DATA_FAIL:
            return {
                ...state,
                isLoadingInstitute: false,
                instituteError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_ENROLL_STUDENT_DATA_START:
            return {
                ...state,
                isLoadingEnroll: true,
            };
        case types.FETCH_INSTRUCTOR_ENROLL_STUDENT_DATA_SUCCESS:
            return {
                ...state,
                isLoadingEnroll: false,
                enrollStudentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_ENROLL_STUDENT_DATA_FAIL:
            return {
                ...state,
                isLoadingEnroll: false,
                enrollStudentError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_ASSIGNMENTS_DATA_START:
            return {
                ...state,
                isLoadingAssignment: true,
            };
        case types.FETCH_INSTRUCTOR_ASSIGNMENTS_DATA_SUCCESS:
            return {
                ...state,
                isLoadingAssignment: false,
                assignmentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_ASSIGNMENTS_DATA_FAIL:
            return {
                ...state,
                isLoadingAssignment: false,
                assignmentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_CLASSES_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_CREATE_CLASSES_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                createClassesData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_CLASSES_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                createClassesError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_START:
            return {
                ...state,
                isLoadingCreate: true,
            };
        case types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_SUCCESS:
            return {
                ...state,
                isLoadingCreate: false,
                createStudentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_FAIL:
            return {
                ...state,
                isLoadingCreate: false,
                createStudentError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_EDIT_STUDENT_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_EDIT_STUDENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                editStudentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_EDIT_STUDENT_FAIL:
            return {
                ...state,
                isLoading: false,
                editStudentError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_DELETE_STUDENT_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_DELETE_STUDENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deleteStudentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_DELETE_STUDENT_FAIL:
            return {
                ...state,
                isLoading: false,
                deleteStudentError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                createAssignmentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_FAIL:
            return {
                ...state,
                isLoading: false,
                createAssignmentError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_EDIT_ASSIGNMENT_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_EDIT_ASSIGNMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                editAssignmentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_EDIT_ASSIGNMENT_FAIL:
            return {
                ...state,
                isLoading: false,
                editAssignmentError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_DELETE_ASSIGNMENT_START:
            return {
                ...state,
                isLoading: true,
            };
        case types.FETCH_INSTRUCTOR_DELETE_ASSIGNMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deleteAssignmentData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_DELETE_ASSIGNMENT_FAIL:
            return {
                ...state,
                isLoading: false,
                deleteAssignmentError: action.payload,
            };
        case types.FETCH_ADMIN_STUDENT_TEMPLATE_DOWNLOAD_START:
            return {
                ...state,
                isLoadingTemplate: true,
            };
        case types.FETCH_ADMIN_STUDENT_TEMPLATE_DOWNLOAD_SUCCESS:
            return {
                ...state,
                isLoadingTemplate: false,
                templateDownload: action.payload,
            };
        case types.FETCH_ADMIN_STUDENT_TEMPLATE_DOWNLOAD_FAIL:
            return {
                ...state,
                isLoadingTemplate: false,
                templateDownloadError: action.payload,
            };
        case types.FETCH_ADMIN_MULTIPLE_STUDENT_UPLOAD_START:
            return {
                ...state,
                isLoadingStudentFileUpload: true,
            };
        case types.FETCH_ADMIN_MULTIPLE_STUDENT_UPLOAD_SUCCESS:
            return {
                ...state,
                isLoadingStudentFileUpload: false,
                fileUploadData: action.payload,
            };
        case types.FETCH_ADMIN_MULTIPLE_STUDENT_UPLOAD_DATA_CLEAR:
            return {
                ...state,
                fileUploadData: '',
            };
        case types.FETCH_ADMIN_MULTIPLE_STUDENT_UPLOAD_FAIL:
            return {
                ...state,
                isLoadingStudentFileUpload: false,
                fileUploadDataError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_REPOSITARY_DETAILS_START:
            return {
                ...state,
                isLoadingRepo: true,
            };
        case types.FETCH_INSTRUCTOR_REPOSITARY_DETAILS_SUCCESS:
            return {
                ...state,
                isLoadingRepo: false,
                repoData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_REPOSITARY_DETAILS_FAIL:
            return {
                ...state,
                isLoadingRepo: false,
                repoError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_REPOSITARY_UPLOAD_START:
            return {
                ...state,
                isLoadingUpload: true,
            };
        case types.FETCH_INSTRUCTOR_REPOSITARY_UPLOAD_SUCCESS:
            return {
                ...state,
                isLoadingUpload: false,
                uploadData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_REPOSITARY_UPLOAD_FAIL:
            return {
                ...state,
                isLoadingUpload: false,
                uploadError: action.payload,
            };
        case types.FETCH_INSTRUCTOR_REPOSITARY_DELETE_START:
            return {
                ...state,
                isLoadingRemove: true,
            };
        case types.FETCH_INSTRUCTOR_REPOSITARY_DELETE_SUCCESS:
            return {
                ...state,
                isLoadingRemove: false,
                removeData: action.payload,
            };
        case types.FETCH_INSTRUCTOR_REPOSITARY_DELETE_FAIL:
            return {
                ...state,
                isLoadingRemove: false,
                removeError: action.payload,
            };
        default:
            return state;
    }
};

export default DetailsInstructorReducer;
