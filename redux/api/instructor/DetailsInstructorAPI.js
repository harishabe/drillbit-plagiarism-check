import END_POINTS from '../../../utils/EndPoints';
import { DeleteMethod, GetMethod, PostMethod, PutMethod, PostFormData } from '../ApiMethod';
import { PaginationUrl } from '../../../utils/PaginationUrl';

/**
 * API CALL FOR CLASSES DATA
 */

export const GetClassesDetail = async (paginationPayload) => {
    const url = END_POINTS.INSTRUCTOR_MY_CLASSES + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR CREATE CLASS
 */

export const CreateClassData = async (data) => {
    const url = END_POINTS.CREATE_CLASS;
    return PostMethod(url, data);
};

/**
 * API CALL FOR EDIT CLASS IN INSTRUCTOR
 */

export const EditClassData = async (action) => {
    const url = END_POINTS.INSTRUCTOR_CLASS_EDIT_DATA + action.classId;
    return PutMethod(url, action.requestPayload);
};

/**
 * API CALL FOR DELETE STUDENT IN INSTRUCTOR
 */

export const DeleteStudentData = async (action) => {
    const url = END_POINTS.INSTRUCTOR_STUDENT_DELETE_DATA + action.classId + 'students?id=' + action.userId;
    return DeleteMethod(url);
}

/**
 * API CALL FOR STUDENT DATA
 */

export const GetStudentDetail = async (class_id, paginationPayload) => {
    const url = END_POINTS.INSTRUCTOR_MY_CLASSES_STUDENTS + class_id + '/students' + PaginationUrl(paginationPayload);
    return GetMethod(url);
};


/**
 * API CALL FOR CREATE STUDENT
 */

export const CreateStudentData = async (class_id, data) => {
    const url = END_POINTS.CREATE_STUDENT + class_id + '/students';
    return PostMethod(url, data);
};

/**
 * API CALL FOR DELETE STUDENT IN INSTRUCTOR
 */

export const DeleteClass = async (action) => {
    const url = END_POINTS.INSTRUCTOR_CLASS_DELETE_DATA + action.classId;
    return DeleteMethod(url);
}

/**
 * API CALL FOR CREATE ASSIGNMENT
 */

export const CreateAssignmentData = async (data) => {
    const url = END_POINTS.CREATE_ASSIGNMENT;
    return PostMethod(url, data);
};

/**
 * API CALL FOR GET FOLDER DATA
 */

 export const GetMyFoldersDetail = async (paginationPayload) => {
    const url = END_POINTS.INSTRUCTOR_MY_FOLDERS + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR CREATE CLASS
 */

export const CreateFolderData = async (clasId, data) => {
    const url = END_POINTS.CREATE_FOLDER + clasId + '/folder';
    return PostMethod(url, data);
};

/**
 * API CALL FOR EDIT FOLDER IN INSTRUCTOR
 */

export const EditFolderData = async (action) => {
    const url = END_POINTS.INSTRUCTOR_FOLDER_EDIT_AND_DELETE_DATA + action.classId + '/folder/' + action.folderId;
    return PutMethod(url, action.requestPayload);
};

/**
 * API CALL FOR DELETE FOLDERS IN INSTRUCTOR
 */

export const DeleteFolders = async (action) => {
    const url = END_POINTS.INSTRUCTOR_FOLDER_EDIT_AND_DELETE_DATA + action.classId + '/assignments?id=' + action.folderId;
    return DeleteMethod(url);
}

/**
 * API CALL FOR MY FOLDER > SUBMISSION DATA
 */

export const GetSubmissionDetail = async (clasId, folder_id, paginationPayload) => {
    const url = END_POINTS.INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST + clasId + '/assignments/' + folder_id + '/submissions' + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR MY FOLDER > SUBMISSION DATA > DELETE
 */

export const DeleteSubmission = async (clasId, folder_id, paper_id) => {
    const url = END_POINTS.INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST + clasId + '/assignments/' + folder_id + '/submissions?paperId=' + paper_id;
    return GetMethod(url);
};

/**
 * API CALL FOR MY FOLDER > SUBMISSION DATA > UPLOAD FILE
 */

export const UploadSubmission = async (clasId, folder_id, data) => {
    const url = END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + clasId + '/assignments/' + folder_id + '/file';
    return PostFormData(url, data);
};