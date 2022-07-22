import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetClassesDetail,
    GetStudentDetail,
    GetMyFoldersDetail,
    GetSubmissionDetail,
    CreateClassData,
    CreateFolderData,
    CreateStudentData,
    CreateAssignmentData,
    EditClassData,
    EditFolderData,
    DeleteClass,
    DeleteFolders,
    UploadSubmission,
    DeleteSubmission
} from '../../api/instructor/DetailsInstructorAPI';
import toastrValidation from '../../../utils/ToastrValidation';
import { PaginationValue, InstructorPaginationValue, InstructorFolderPaginationValue, InstructorFolderSubmissionPaginationValue } from '../../../utils/PaginationUrl';

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
            type: types.FETCH_INSTRUCTOR_STUDENTS_ASSIGNMENTS_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_STUDENTS_ASSIGNMENTS_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetClassesStudentData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_STUDENTS_ASSIGNMENTS_DATA_START, onLoadClassesStudent);
}


/**
 * create student
 * @param {*} action
 */

export function* onLoadCreateStudent(action) {
    const { response, error } = yield call(CreateStudentData, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_STUDENT_DATA_START, paginationPayload: PaginationValue });
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
 * create assignment
 * @param {*} action
 */

export function* onLoadCreateAssignment(action) {
    const { response, error } = yield call(CreateAssignmentData, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_START, paginationPayload: PaginationValue });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* CreateAssignment() {
    yield takeLatest(types.FETCH_INSTRUCTOR_CREATE_ASSIGNMENT_DATA_START, onLoadCreateAssignment);
}

/**
 * Get folder data analysis
 * @param {*} action
 */

export function* GetAllFolders(action) {
    const { response, error } = yield call(GetMyFoldersDetail, action.paginationPayload);
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
    const { response, error } = yield call(CreateFolderData, action.clasId, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_MY_FOLDERS_START, paginationPayload: InstructorFolderPaginationValue });
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
    const { response, error } = yield call(EditFolderData, action);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_EDIT_MY_FOLDERS_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_MY_FOLDERS_START, paginationPayload: InstructorFolderPaginationValue });
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
 * Delete folders
 * My Folders 
 * @param {*} action
 */

export function* onLoadDeleteFolder(action) {
    const { response, error } = yield call(DeleteFolders, action);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_DELETE_FOLDER_SUCCESS,
            payload: response?.data,
        });
        yield put({ type: types.FETCH_INSTRUCTOR_MY_FOLDERS_START, paginationPayload: InstructorFolderPaginationValue });
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
 * Get student data
 * My Folder > Submission List
 * @param {*} action
 */

export function* onLoadFolderSubmission(action) {
    const { response, error } = yield call(GetSubmissionDetail, action.clasId, action.folder_id, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_FAIL,
            payload: error,
        });
    }
}

export function* GetFolderSubmissionData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_START, onLoadFolderSubmission);
}

/**
 * my folder > submission list > upload file
 * @param {*} action
 */

export function* onLoadUploadFile(action) {
    const { response, error } = yield call(UploadSubmission, action.clasId, action.folder_id, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_UPLOAD_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_START, clasId: action.clasId,
            folder_id: action.folder_id, paginationPayload: InstructorFolderSubmissionPaginationValue
        });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_UPLOAD_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* UploadSubmissionFile() {
    yield takeLatest(types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_UPLOAD_START, onLoadUploadFile);
}

/**
 * my folder > submission list > delete file
 * @param {*} action
 */

export function* onLoadDeleteFile(action) {
    console.log("actionactionaction", action)
    const { response, error } = yield call(DeleteSubmission, action.clasId, action.folder_id, action.paper_id);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_DELETE_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_START, clasId: action.clasId,
            folder_id: action.folder_id, paginationPayload: InstructorFolderSubmissionPaginationValue
        });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_DELETE_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* DeleteSubmissionFile() {
    yield takeLatest(types.FETCH_INSTRUCTOR_MY_FOLDERS_SUBMISSION_LIST_DELETE_START, onLoadDeleteFile);
}