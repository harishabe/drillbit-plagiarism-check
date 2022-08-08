import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM, BASE_URL_UPLOAD } from '../../../utils/BaseUrl';
import { DeleteMethod, GetMethod, PostMethod, PutMethod, PostFormData, GetMethodDownload } from '../ApiMethod';
import { PaginationUrl } from '../../../utils/PaginationUrl';

/**
 * API CALL FOR CLASSES DATA
 */

export const GetClassesDetail = async (paginationPayload) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_MY_CLASSES + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR CREATE CLASS
 */

export const CreateClassData = async (data) => {
    const url = BASE_URL_EXTREM + END_POINTS.CREATE_CLASS;
    return PostMethod(url, data);
};

/**
 * API CALL FOR EDIT CLASS IN INSTRUCTOR
 */

export const EditClassData = async (action) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_CLASS_EDIT_DATA + action.classId;
    return PutMethod(url, action.requestPayload);
};

/**
 * API CALL FOR EDIT STUDENT IN INSTRUCTOR
 */

export const EditStudentData = async (action) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_STUDENT_EDIT_DATA + action.classId + '/students/' + action.userId;
    return PutMethod(url, action.requestPayload);
};


/**
 * API CALL FOR DELETE STUDENT IN INSTRUCTOR
 */

export const DeleteStudentData = async (action) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_STUDENT_DELETE_DATA + action?.class_id + '/students?id=' + action?.user_id;
    return DeleteMethod(url);
}

/**
 * API CALL FOR STUDENT DATA
 */

export const GetStudentDetail = async (class_id, paginationPayload) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_MY_CLASSES_STUDENTS + class_id + '/students' + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR STUDENTS IN INSTITUTE DATA
 */

export const GetStudentListDetail = async (paginationPayload) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_STUDENT_LIST_DATA + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR ENROLL STUDENTS FROM INSTITUTE DATA
 */

export const EnrollStudentDetail = async (class_id, data) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_STUDENT_ENROLL_DATA + class_id + '/enrollStudents?email=' + data;
    return PostMethod(url, data);
};

/**
 * API CALL FOR STUDENT DATA
 */

export const GetAssignmentDetail = async (class_id, paginationPayload) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_MY_CLASSES_STUDENTS + class_id + '/assignments' + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR EDIT ASSIGNMENT IN INSTRUCTOR
 */

export const EditAssignmentData = async (action) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_ASSIGNMENT_EDIT_DATA + action?.classId + '/assignments/' + action?.assId;
    return PutMethod(url, action.requestPayload);
};

/**
 * API CALL FOR DELETE ASSIGNMENT IN INSTRUCTOR
 */

export const DeleteAssignmentData = async (action) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_ASSIGNMENT_DELETE_DATA + action?.class_id + '/assignments?id=' + action?.assId;
    return DeleteMethod(url);
}

/**
 * API CALL FOR CREATE STUDENT
 */

export const CreateStudentData = async (class_id, data) => {
    const url = BASE_URL_EXTREM + END_POINTS.CREATE_STUDENT + class_id + '/students';
    return PostMethod(url, data);
};

/**
 * API CALL DOWNLOAD TEMPLATE
 */

export const DownloadStudentTemplate = async (classId) => {
    const url = BASE_URL_EXTREM + END_POINTS.STUDENT_DOWNLOAD_TEMPLATE + classId + '/studentTemplate';
    return GetMethodDownload(url, 'Multiple_Student_Upload_Template.csv');
};

/**
 * API CALL UPLOAD MULTIPLE STUDENT
 */

export const MultipleStudentUpload = async (classId, query) => {
    const url = BASE_URL_EXTREM + END_POINTS.CREATE_MULTIPLE_STUDENT + classId + '/bulkStudents';
    return PostFormData(url, query);
};

/**
 * API CALL FOR DELETE STUDENT IN INSTRUCTOR
 */

export const DeleteClass = async (action) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_CLASS_DELETE_DATA + action.classId;
    return DeleteMethod(url);
}

/**
 * API CALL FOR CREATE ASSIGNMENT
 */

export const CreateAssignmentData = async (class_id, data) => {
    const url = BASE_URL_EXTREM + END_POINTS.CREATE_ASSIGNMENT + class_id + '/assignments';
    return PostFormData(url, data);
};

/**
 * API CALL FOR GET FOLDER DATA
 */

export const GetMyFoldersDetail = async (paginationPayload) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_MY_FOLDERS + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR CREATE CLASS
 */

export const CreateFolderData = async (data) => {
    const url = BASE_URL_EXTREM + END_POINTS.CREATE_FOLDER;
    return PostMethod(url, data);
};

/**
 * API CALL FOR EDIT FOLDER IN INSTRUCTOR
 */

export const EditFolderData = async (action) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_FOLDER_EDIT_AND_DELETE_DATA + '/' + action.folderId;
    return PutMethod(url, action.requestPayload);
};

/**
 * API CALL FOR DELETE FOLDERS IN INSTRUCTOR
 */

export const DeleteFolders = async (action) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_FOLDER_EDIT_AND_DELETE_DATA + '?id=' + action.folderId;
    return DeleteMethod(url);
}

/**
 * API CALL FOR MY FOLDER > SUBMISSION DATA
 * API CALL FOR MY CLASSES > ASSIGNMENTS > SUBMISSION
 */

export const GetSubmissionDetail = async (clasId, folder_id, paginationPayload) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST + clasId + '/assignments/' + folder_id + '/submissions' + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR MY FOLDER > SUBMISSION DATA > DELETE
 * API CALL FOR MY CLASSES > ASSIGNMENTS > DELETE
 */

export const DeleteSubmission = async (clasId, folder_id, paper_id) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST + clasId + '/assignments/' + folder_id + '/submissions?paperId=' + paper_id;
    return DeleteMethod(url);
};

/**
 * API CALL FOR MY FOLDER > SUBMISSION DATA > UPLOAD FILE
 * API CALL FOR MY CLASSES > ASSIGNMENTS > SUBMISSION > UPLOAD FILE
 */

export const UploadSubmission = async (clasId, folder_id, data) => {
    const url = BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + clasId + '/assignments/' + folder_id + '/singleFile';
    return PostFormData(url, data);
};