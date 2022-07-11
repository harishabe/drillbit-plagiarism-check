import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetClassesDetail,
    GetMyFoldersDetail,
    CreateClassData,
    CreateFolderData,
    CreateStudentData,
    CreateAssignmentData,
    EditClassData,
    DeleteClass
} from '../../api/instructor/DetailsInstructorAPI';
import toastrValidation from '../../../utils/ToastrValidation';
import { PaginationValue, InstructorPaginationValue } from '../../../utils/PaginationUrl';

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
 * Edit
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
 * Delete class
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

export function* DeleteClassesData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_DELETE_CLASS_START, onLoadDeleteClass);
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
    const { response, error } = yield call(CreateFolderData, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_START, paginationPayload: PaginationValue });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* CreateFolder() {
    yield takeLatest(types.FETCH_INSTRUCTOR_CREATE_MY_FOLDERS_START, onLoadCreateFolder);
}


