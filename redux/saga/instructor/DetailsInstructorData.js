import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetClassesDetail,
    GetStudentDetail,
    GetStudentListDetail,
    EnrollStudentDetail,
    GetAssignmentDetail,
    GetMyFoldersDetail,
    GetRepoDetail,
    RepoUploadDetail,
    RemoveRepositaryData,
    CreateClassData,
    CreateFolderData,
    CreateStudentData,
    DownloadStudentTemplate,
    MultipleStudentUpload,
    CreateAssignmentData,
    EditAssignmentData,
    EditClassData,
    EditStudentData,
    EditFolderData,
    DeleteClass,
    DeleteStudentData,
    DeleteAssignmentData,
    DeleteFolders,
} from '../../api/instructor/DetailsInstructorAPI';
import toastrValidation from '../../../utils/ToastrValidation';
import { PaginationValue, InstructorPaginationValue, InstructorFolderPaginationValue, StudentSubmissionsPaginationValue } from '../../../utils/PaginationUrl';
import { BASE_URL_EXTREM, BASE_URL_PRO } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import END_POINTS_PRO from '../../../utils/EndPointPro'

/**
 * Get classes data
 * @param {*} action
 */

export function* onLoadClasses(action) {
    const { response, error } = yield call(GetClassesDetail, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_CLASSES_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_CLASSES_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetClassesData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_CLASSES_DATA_START, onLoadClasses);
}

/**
 * create classes
 * @param {*} action
 */

export function* onLoadCreateClass(action) {
    const { response, error } = yield call(CreateClassData, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_CLASSES_DATA_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_CLASSES_DATA_START, paginationPayload: InstructorPaginationValue });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_CLASSES_DATA_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* CreateClass() {
    yield takeLatest(types.FETCH_INSTRUCTOR_CREATE_CLASSES_DATA_START, onLoadCreateClass);
}

/**
 * Edit classes
 * @param {*} action
 */

export function* onLoadEditClass(action) {
    const { response, error } = yield call(EditClassData, action);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_EDIT_CLASS_DATA_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_CLASSES_DATA_START, paginationPayload: InstructorPaginationValue });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_EDIT_CLASS_DATA_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* EditClassesData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_EDIT_CLASS_DATA_START, onLoadEditClass);
}

/**
 * Delete classes
 * My Classes 
 * @param {*} action
 */

export function* onLoadDeleteClass(action) {
    const { response, error } = yield call(DeleteClass, action);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_DELETE_CLASS_SUCCESS,
            payload: response?.data,
        });
        yield put({ type: types.FETCH_INSTRUCTOR_CLASSES_DATA_START, paginationPayload: InstructorPaginationValue });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_DELETE_CLASS_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* DeleteClasses() {
    yield takeLatest(types.FETCH_INSTRUCTOR_DELETE_CLASS_START, onLoadDeleteClass);
}

/**
 * Get student data
 * My Classes > Student
 * @param {*} action
 */

export function* onLoadClassesStudent(action) {
    const { response, error } = yield call(GetStudentDetail, action.class_id, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_STUDENTS_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_STUDENTS_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetClassesStudentData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_STUDENTS_DATA_START, onLoadClassesStudent);
}

/**
 * Get students in institute
 * My Classes > Student
 * @param {*} action
 */

export function* onLoadClassesStudentList(action) {
    const { response, error } = yield call(GetStudentListDetail, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_STUDENTS_INSTITUTE_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_STUDENTS_INSTITUTE_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetStudentListData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_STUDENTS_INSTITUTE_DATA_START, onLoadClassesStudentList);
}

/**
 * Enroll Students to class
 * My Classes > Student
 * @param {*} action
 */

export function* onLoadEnrollStudentList(action) {
    const { response, error } = yield call(EnrollStudentDetail, action.class_id, action.data);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_ENROLL_STUDENT_DATA_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_STUDENTS_DATA_START, class_id: action.class_id, paginationPayload: PaginationValue });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_ENROLL_STUDENT_DATA_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* EnrollStudentListData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_ENROLL_STUDENT_DATA_START, onLoadEnrollStudentList);
}

/**
 * Download csv file format data for student
 * @param {*} action
 */

export function* onLoadStudentTemplate(action) {
    const { response, error } = yield call(DownloadStudentTemplate, action.classId);
    if (response || response === undefined) {
        yield put({
            type: types.FETCH_ADMIN_STUDENT_TEMPLATE_DOWNLOAD_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_STUDENT_TEMPLATE_DOWNLOAD_FAIL,
            payload: error,
        });
    }
}

export function* GetDownloadStudentTemplate() {
    yield takeLatest(types.FETCH_ADMIN_STUDENT_TEMPLATE_DOWNLOAD_START, onLoadStudentTemplate);
}

/**
 * Multiple student upload
 * @param {*} action
 */

export function* onLoadStudentUpload(action) {
    const { response, error } = yield call(MultipleStudentUpload, action.classId, action.query);
    if (response) {
        yield put({ type: types.FETCH_ADMIN_MULTIPLE_STUDENT_UPLOAD_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_STUDENTS_DATA_START, class_id: action.classId, paginationPayload: PaginationValue });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_ADMIN_MULTIPLE_STUDENT_UPLOAD_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* UploadMultipleStudent() {
    yield takeLatest(types.FETCH_ADMIN_MULTIPLE_STUDENT_UPLOAD_START, onLoadStudentUpload);
}

/**
 * Get assignment data
 * My Classes > Assignment
 * @param {*} action
 */

export function* onLoadClassesAssignment(action) {
    const { response, error } = yield call(GetAssignmentDetail, action.class_id, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_ASSIGNMENTS_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_ASSIGNMENTS_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetClassesAssignmentData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_ASSIGNMENTS_DATA_START, onLoadClassesAssignment);
}


/**
 * create student
 * @param {*} action
 */

export function* onLoadCreateStudent(action) {
    const { response, error } = yield call(CreateStudentData, action.classId, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_STUDENTS_DATA_START, class_id: action.classId, paginationPayload: PaginationValue });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* CreateStudent() {
    yield takeLatest(types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_START, onLoadCreateStudent);
}

/**
 * Edit student
 * @param {*} action
 */

export function* onLoadEditStudent(action) {
    const { response, error } = yield call(EditStudentData, action);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_EDIT_STUDENT_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_STUDENTS_DATA_START, class_id: action.classId, paginationPayload: PaginationValue });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_EDIT_STUDENT_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* EditStudentsData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_EDIT_STUDENT_START, onLoadEditStudent);
}

/**
 * Delete student
 * Student 
 * @param {*} action
 */

export function* onLoadDeleteStudent(action) {
    const { response, error } = yield call(DeleteStudentData, action);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_DELETE_STUDENT_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_STUDENTS_DATA_START, class_id: action.class_id, paginationPayload: PaginationValue });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_DELETE_STUDENT_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* DeleteStudents() {
    yield takeLatest(types.FETCH_INSTRUCTOR_DELETE_STUDENT_START, onLoadDeleteStudent);
}

/**
 * create assignment
 * @param {*} action
 */

export function* onLoadCreateAssignment(action) {
    const { response, error } = yield call(CreateAssignmentData, action.classId, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_ASSIGNMENTS_DATA_START, class_id: action.classId, paginationPayload: InstructorFolderPaginationValue });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* CreateAssignmentDetail() {
    yield takeLatest(types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_START, onLoadCreateAssignment);
}

/**
 * Edit assignment
 * @param {*} action
 */

export function* onLoadEditAssignment(action) {
    const { response, error } = yield call(EditAssignmentData, action);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_EDIT_ASSIGNMENT_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_ASSIGNMENTS_DATA_START, class_id: action.classId, paginationPayload: InstructorFolderPaginationValue });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_EDIT_ASSIGNMENT_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* EditAssignmentsData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_EDIT_ASSIGNMENT_START, onLoadEditAssignment);
}

/**
 * Delete assignment
 * Assignment 
 * @param {*} action
 */

export function* onLoadDeleteAssignment(action) {
    const { response, error } = yield call(DeleteAssignmentData, action);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_DELETE_ASSIGNMENT_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_ASSIGNMENTS_DATA_START, class_id: action.class_id, paginationPayload: InstructorFolderPaginationValue });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_DELETE_ASSIGNMENT_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* DeleteAssignments() {
    yield takeLatest(types.FETCH_INSTRUCTOR_DELETE_ASSIGNMENT_START, onLoadDeleteAssignment);
}

/**
 * Get folder data analysis
 * @param {*} action
 */

export function* GetAllFolders(action) {
    const { response, error } = yield call(GetMyFoldersDetail, action.url, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_FOLDERS_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_FOLDERS_FAIL,
            payload: error,
        });
    }
}

export function* GetMyFolders() {
    yield takeLatest(types.FETCH_INSTRUCTOR_MY_FOLDERS_START, GetAllFolders);
}

/**
 * create folders 
 * @param {*} action
 */

export function* onLoadCreateFolder(action) {
    const { response, error } = yield call(CreateFolderData, action.url, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_FOLDERS_START,
            url: action.url.split('/')[3] === 'extreme' ?
                BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_MY_FOLDERS :
                BASE_URL_PRO + END_POINTS_PRO.USER_MY_FOLDERS,
            paginationPayload: InstructorFolderPaginationValue
        });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* CreateFolder() {
    yield takeLatest(types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_START, onLoadCreateFolder);
}

/**
 * Edit folder
 * Instructor > Myfolders
 * @param {*} action
 */

export function* onLoadEditFolder(action) {
    const { response, error } = yield call(EditFolderData, action.url, action.requestPayload);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_EDIT_MY_FOLDERS_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_FOLDERS_START,
            url: action.url.split('/')[3] === 'extreme' ?
                BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_MY_FOLDERS :
                BASE_URL_PRO + END_POINTS_PRO.USER_MY_FOLDERS,
            paginationPayload: InstructorFolderPaginationValue
        });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_EDIT_MY_FOLDERS_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* EditMyFolderData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_EDIT_MY_FOLDERS_START, onLoadEditFolder);
}

/**
 * * My Folders 
 * Delete folders
 * @param {*} action
 */

export function* onLoadDeleteFolder(action) {
    const { response, error } = yield call(DeleteFolders, action.url);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_DELETE_FOLDER_SUCCESS,
            payload: response?.data,
        });
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_FOLDERS_START,
            url: action.url.split('/')[3] === 'extreme' ?
                BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_MY_FOLDERS :
                BASE_URL_PRO + END_POINTS_PRO.USER_MY_FOLDERS,
            paginationPayload: InstructorFolderPaginationValue
        });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_DELETE_FOLDER_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* DeleteMyFolders() {
    yield takeLatest(types.FETCH_INSTRUCTOR_DELETE_FOLDER_START, onLoadDeleteFolder);
}

/**
 * Get repositary data
 * @param {*} action
 */

export function* onLoadRepo(action) {
    const { response, error } = yield call(GetRepoDetail, action.url, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_REPOSITARY_DETAILS_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_REPOSITARY_DETAILS_FAIL,
            payload: error,
        });
    }
}

export function* GetRepoData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_REPOSITARY_DETAILS_START, onLoadRepo);
}

/**
 * Repositary > uploadfile
 * @param {*} action
 */

export function* onLoadUploadFile(action) {
    const { response, error } = yield call(RepoUploadDetail, action.url, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_REPOSITARY_UPLOAD_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_INSTRUCTOR_REPOSITARY_DETAILS_START,
            url: action.url.split('/')[3] === 'extreme' ?
                BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_REPOSITARY_DATA :
                BASE_URL_PRO + END_POINTS_PRO.USER_REPOSITARY_DATA,
            paginationPayload: StudentSubmissionsPaginationValue
        });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_REPOSITARY_UPLOAD_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* RepoUploadData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_REPOSITARY_UPLOAD_START, onLoadUploadFile);
}

/**
 * Remove repositary
 * @param {*} action
 */

export function* onLoadRemoveRepositary(action) {
    const { response, error } = yield call(RemoveRepositaryData, action.url);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_REPOSITARY_DELETE_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_INSTRUCTOR_REPOSITARY_DETAILS_START,
            url: action.url.split('/')[3] === 'extreme' ?
                BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_REPOSITARY_DATA :
                BASE_URL_PRO + END_POINTS_PRO.USER_REPOSITARY_DATA,
            paginationPayload: StudentSubmissionsPaginationValue
        });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_REPOSITARY_DELETE_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* RemoveRepositaryInstructorDetails() {
    yield takeLatest(types.FETCH_INSTRUCTOR_REPOSITARY_DELETE_START, onLoadRemoveRepositary);
}