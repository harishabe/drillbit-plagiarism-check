import * as types from '../ActionType';

export const GetWidgetCount = (url) => {
    return {
        type: types.FETCH_INSTRUCTOR_DASH_WIDGET_START, url: url
    };
};

/**
 * Get all classes data
 */
export const GetClassesData = (paginationPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_CLASSES_DATA_START, paginationPayload: paginationPayload
    };
};

/**
 * Create Class
 */
export const CreateClass = (data) => {
    return {
        type: types.FETCH_INSTRUCTOR_CREATE_CLASSES_DATA_START, query: data
    };
};

/**
 * Create Student
 */
export const CreateStudent = (classId, data) => {
    return {
        type: types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_START, classId: classId, query: data
    };
};

/**
 * Create multiple student template
 */
export const DownloadTemplate = (classId) => {
    return {
        type: types.FETCH_ADMIN_STUDENT_TEMPLATE_DOWNLOAD_START, classId: classId
    };
};

/**
 * Upload multiple student 
 */
export const UploadFile = (classId, data) => {
    return {
        type: types.FETCH_ADMIN_MULTIPLE_STUDENT_UPLOAD_START, classId: classId, query: data
    };
};

/**
 * Clear upload data
 */
export const UploadFileDataClear = () => {
    return {
        type: types.FETCH_ADMIN_MULTIPLE_STUDENT_UPLOAD_DATA_CLEAR
    };
};

/**
 * Zip file clear uploaded data
 */
 export const UploadZipFileDataClear = () => {
    return {
        type: types.FETCH_INSTRUCTOR_ZIP_EXTRACTED_UPLOAD_DATA_CLEAR
    };
};

/**
 * Edit class
 */
export const EditClass = (classId, requestPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_EDIT_CLASS_DATA_START, classId: classId, requestPayload: requestPayload,
    };
};

/**
 * Edit student
 */
export const EditStudent = (classId, userId, requestPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_EDIT_STUDENT_START, classId: classId, userId: userId, requestPayload: requestPayload,
    };
};

/**
 * Delete class
 */
export const DeleteClass = (classId) => {
    return {
        type: types.FETCH_INSTRUCTOR_DELETE_CLASS_START, classId: classId,
    };
};

/**
 * Delete student
 */
export const DeleteStudent = (classId, userId) => {
    return {
        type: types.FETCH_INSTRUCTOR_DELETE_STUDENT_START, class_id: classId, user_id: userId
    };
};

/**
 * Get Student
 */
export const GetStudent = (class_id, paginationPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_STUDENTS_DATA_START, class_id: class_id, paginationPayload: paginationPayload
    };
};

/**
 * Get students in institute
 */
export const GetStudentList = (paginationPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_STUDENTS_INSTITUTE_DATA_START, paginationPayload: paginationPayload
    };
};

/**
 * Enroll Students to class
 */
export const EnrollStudent = (class_id, data) => {
    return {
        type: types.FETCH_INSTRUCTOR_ENROLL_STUDENT_DATA_START, class_id: class_id, data: data
    };
};

/**
 * Get Assignment
 */
export const GetAssignment = (class_id, paginationPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_ASSIGNMENTS_DATA_START, class_id: class_id, paginationPayload: paginationPayload
    };
};


/**
 * Create Assignment
 */
export const CreateAssignment = (classId, data) => {
    return {
        type: types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_START, classId: classId, query: data
    };
};

/**
 * Edit assignment
 */
export const EditAssignment = (classId, assId, requestPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_EDIT_ASSIGNMENT_START, classId: classId, assId: assId, requestPayload: requestPayload,
    };
};

/**
 * Delete assignment
 */
export const DeleteAssignment = (classId, assId) => {
    return {
        type: types.FETCH_INSTRUCTOR_DELETE_ASSIGNMENT_START, class_id: classId, assId: assId
    };
};

/**
 * Get all folders
 */
export const GetAllFolders = (url, paginationPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_MY_FOLDERS_START, url: url, paginationPayload: paginationPayload
    };
};

/**
 * Create Folder
 */
export const CreateFolder = (url, data) => {
    return {
        type: types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_START, url: url, query: data
    };
};

/**
 * Edit folder
 */
export const EditFolder = (url, requestPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_EDIT_MY_FOLDERS_START, url: url, requestPayload: requestPayload,
    };
};

/**
 * Delete folder
 */
export const DeleteFolder = (url) => {
    return {
        type: types.FETCH_INSTRUCTOR_DELETE_FOLDER_START, url: url,
    };
};

/**
 * Get myfolder > submissionList
 * Get myclasses > assignments > submission
 */
export const GetSubmissionList = (url) => {
    return {
        type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_START, url: url
    };
};

/**
 * Myfolder > submissionList > uploadfile
 * myclasses > assignments > submission-upload
 */
export const SubmissionListUpload = (url, data) => {
    return {
        type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_UPLOAD_START, url: url, query: data
    };
};

/**
 * myclasses > assignments > submission-upload > ZIP file
 */
 export const SubmissionListExtractedFileUpload = (url, data) => {
    return {
        type: types.FETCH_UPLOAD_EXTRACTED_ZIP_FILE_START, url: url, query: data
    };
};


/**
 * Get myfolder > submissionList > delete
 * My classes > Assignments > delete submission
 */
export const DeleteSubmission = (url) => {
    return {
        type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_DELETE_START, url: url
    };
};

/**
 * My classes > Assignments > edit assignments setting
 */
export const EditSubmission = (clasId, folder_id, requestPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_EDIT_START, clasId: clasId, folder_id: folder_id, requestPayload: requestPayload
    };
};

/**
 * My classes > Assignments > save to repositary
 */
export const SaveToRepositary = (clasId, folder_id, paper_id) => {
    return {
        type: types.FETCH_INSTRUCTOR_SUBMISSIONS_SAVE_TO_REPOSITARY_START, clasId: clasId, folder_id: folder_id, paper_id: paper_id
    };
};

/**
 * My classes > Assignments > grading > feedback
 */
export const InstructorFeedback = (clasId, folder_id, paper_id, data) => {
    return {
        type: types.FETCH_INSTRUCTOR_FEEDBACK_DETAILS_START, clasId: clasId, folder_id: folder_id, paper_id: paper_id, query: data
    };
};

/**
 * My classes > Assignments > grading > Edit feedback
 */
export const EditFeedback = (clasId, folder_id, paper_id, data) => {
    return {
        type: types.FETCH_INSTRUCTOR_EDIT_FEEDBACK_DETAILS_START, clasId: clasId, folder_id: folder_id, paper_id: paper_id, query: data
    };
};

/**
 * Get repositary data
 */
export const GetRepoList = (url, paginationPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_REPOSITARY_DETAILS_START, url: url, paginationPayload: paginationPayload
    };
};

/**
 * Repositary > uploadfile
 */
export const RepoUpload = (url, data) => {
    return {
        type: types.FETCH_INSTRUCTOR_REPOSITARY_UPLOAD_START, url: url, query: data
    };
};

/**
 * Remove repositary
 */
export const RemoveRepositary = (url) => {
    return {
        type: types.FETCH_INSTRUCTOR_REPOSITARY_DELETE_START, url: url
    };
};
