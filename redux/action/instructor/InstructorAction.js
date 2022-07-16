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
export const CreateStudent = (data) => {
    return {
        type: types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_START, query: data
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
 * Get Student
 */
export const GetStudent = (class_id, paginationPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_STUDENTS_ASSIGNMENTS_DATA_START, class_id: class_id, paginationPayload: paginationPayload
    };
};


/**
 * Create Assignment
 */
export const CreateAssignment = (data) => {
    return {
        type: types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_START, query: data
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
 */
export const GetSubmissionList = (clasId, folder_id, paginationPayload) => {
    return {
        type: types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_START, clasId: clasId, folder_id: folder_id, paginationPayload: paginationPayload
    };
};