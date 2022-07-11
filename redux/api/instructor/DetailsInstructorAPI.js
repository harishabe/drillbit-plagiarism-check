import END_POINTS from '../../../utils/EndPoints';
import { GetMethod, PostMethod, PutMethod } from '../ApiMethod';
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
 * API CALL FOR EDIT CLASS
 */

export const EditClassData = async (action) => {
    const url = END_POINTS.INSTRUCTOR_CLASS_EDIT_DATA + action.classId;
    return PutMethod(url, action.requestPayload);
};

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

export const CreateStudentData = async (data) => {
    const url = END_POINTS.CREATE_STUDENT;
    return PostMethod(url, data);
};

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

export const CreateFolderData = async (data) => {
    const url = END_POINTS.CREATE_FOLDER;
    return PostMethod(url, data);
};