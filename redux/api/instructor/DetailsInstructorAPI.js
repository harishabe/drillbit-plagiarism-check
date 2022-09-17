import END_POINTS from '../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
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
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_STUDENT_ENROLL_DATA + class_id + '/enrollStudents?id=' + data;
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

export const GetMyFoldersDetail = async (apiUrl, paginationPayload) => {
    const url = apiUrl + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * API CALL FOR CREATE CLASS
 */

export const CreateFolderData = async (url, data) => {
    return PostMethod(url, data);
};

/**
 * API CALL FOR EDIT FOLDER IN INSTRUCTOR
 */

export const EditFolderData = async (url, requestPayload) => {
    return PutMethod(url, requestPayload);
};

/**
 * API CALL FOR DELETE FOLDERS IN INSTRUCTOR
 */

export const DeleteFolders = async (url) => {
    return DeleteMethod(url);
}

/**
 * API CALL FOR REPOSITARY DATA
 */

export const GetRepoDetail = async (paginationPayload) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_REPOSITARY_DATA + PaginationUrl(paginationPayload);
    return GetMethod(url);
};

/**
 * REPOSITARY > UPLOADFILE
 */

export const RepoUploadDetail = async (data) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_REPOSITARY_UPLOAD;
    return PostFormData(url, data);
};

/**
 * API CALL FOR REMOVE REPOSITARY
 */

export const RemoveRepositaryData = async (id) => {
    const url = BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_REPOSITARY_REMOVE + id;
    return GetMethod(url);
};