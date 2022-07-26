import * as types from '../ActionType';

export const GetWidgetCount = () => {
    return {
        type: types.FETCH_INSTRUCTOR_DASH_WIDGET_START,
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
 * Edit class
 */
export const EditClass = (classId, requestPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_EDIT_CLASS_DATA_START, classId: classId, requestPayload: requestPayload,
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
        type: types.FETCH_INSTRUCTOR_DELETE_STUDENT_START, classId: classId, userId: userId
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
 * Get all folders
 */
export const GetAllFolders = (paginationPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_MY_FOLDERS_START, paginationPayload: paginationPayload
    };
};

/**
 * Create Folder
 */
export const CreateFolder = (clasId, data) => {
    return {
        type: types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_START, clasId: clasId, query: data
    };
};

/**
 * Edit folder
 */
export const EditFolder = (classId, folderId, requestPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_EDIT_MY_FOLDERS_START, classId: classId, folderId: folderId, requestPayload: requestPayload,
    };
};

/**
 * Delete folder
 */
export const DeleteFolder = (classId, folderId) => {
    return {
        type: types.FETCH_INSTRUCTOR_DELETE_FOLDER_START, classId: classId, folderId: folderId,
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
export const SubmissionListUpload = (clasId, folder_id, data) => {
    return {
        type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_UPLOAD_START, clasId: clasId, folder_id: folder_id, query: data
    };
};

/**
 * Get myfolder > submissionList > delete
 * My classes > Assignments > delete submission
 */
export const DeleteSubmission = (clasId, folder_id, paper_id) => {
    return {
        type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_DELETE_START, clasId: clasId, folder_id: folder_id, paper_id: paper_id
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
export const InstructorFeedback = (clasId, folder_id, paper_id) => {
    return {
        type: types.FETCH_INSTRUCTOR_FEEDBACK_DETAILS_START, clasId: clasId, folder_id: folder_id, paper_id: paper_id
    };
};