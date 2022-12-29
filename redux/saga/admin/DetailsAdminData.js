import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    GetInstructorDetail,
    CreateInstructorData,
    DownloadInstructorTemplate,
    MultipleInstructorUpload,
    GetStudentDetail,
    GetReports,
    GetRepoDetail,
    RepoUploadDetail,
    RemoveRepositaryData,
    DownloadReports,
    EditRow,
    DeleteRow,
    DeleteStudent,
    DeactivateRow,
    GetStats,
    GetExportCsvFile,
} from '../../api/admin/DetailsAdminAPI';
import toastrValidation from '../../../utils/ToastrValidation';
import { PaginationValue, StudentSubmissionsPaginationValue } from '../../../utils/PaginationUrl';
import { BASE_URL_EXTREM, BASE_URL_PRO, BASE_URL_SUPER } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import END_POINTS_PRO from '../../../utils/EndPointPro';
import { EXTREME, PRO } from '../../../constant/data/Constant'

/**
 * Get instructor details
 * @param {*} action
 */

export function* onLoadInstructor(action) {
    const { response, error } = yield call(GetInstructorDetail, action.url, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_INSTRUCTOR_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_INSTRUCTOR_DATA_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* GetInstructorData() {
    yield takeLatest(types.FETCH_ADMIN_INSTRUCTOR_DATA_START, onLoadInstructor);
}

/**
 * Get instructor and student stats
 * @param {*} action
 */

export function* onLoadStats(action) {
    const { response, error } = yield call(GetStats, action.url);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_STATS_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_STATS_DATA_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* GetInstructorStudentStats() {
    yield takeLatest(types.FETCH_ADMIN_STATS_DATA_START, onLoadStats);
}

/**
 * Export csv file from stats
 * @param {*} action
 */

export function* onLoadCsvReportStats(action) {
    const { response, error } = yield call(GetExportCsvFile, action.url);
    if (response || response === undefined) {
        yield put({
            type: types.FETCH_ADMIN_EXPORT_CSV_STATS_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_EXPORT_CSV_STATS_DATA_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* GetCsvReportStats() {
    yield takeLatest(types.FETCH_ADMIN_EXPORT_CSV_STATS_DATA_START, onLoadCsvReportStats);
}

/**
 * create instructor
 * @param {*} action
 */

export function* onLoadCreateInstructor(action) {
    const { response, error } = yield call(CreateInstructorData, action.url, action.query);
    if (response) {
        yield put({ type: types.FETCH_ADMIN_INSTRUCTOR_CREATE_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_ADMIN_INSTRUCTOR_DATA_START,
            url: action.url.split('/')[3] === EXTREME ?
                BASE_URL_EXTREM + END_POINTS.ADMIN_INSTRUCTOR :
                BASE_URL_PRO + END_POINTS_PRO.ADMIN_USER,
            paginationPayload: PaginationValue
        });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_ADMIN_INSTRUCTOR_CREATE_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* CreateInstructor() {
    yield takeLatest(types.FETCH_ADMIN_INSTRUCTOR_CREATE_START, onLoadCreateInstructor);
}

/**
 * Download csv file format data for instructor
 * @param {*} action
 */

export function* onLoadInstructorTemplate(action) {
    const { response, error } = yield call(DownloadInstructorTemplate, action.url, action.title);
    if (response || response === undefined) {
        yield put({
            type: types.FETCH_ADMIN_INSTRUCTOR_TEMPLATE_DOWNLOAD_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_INSTRUCTOR_TEMPLATE_DOWNLOAD_FAIL,
            payload: error,
        });
    }
}

export function* GetDownloadTemplate() {
    yield takeLatest(types.FETCH_ADMIN_INSTRUCTOR_TEMPLATE_DOWNLOAD_START, onLoadInstructorTemplate);
}

/**
 * Multiple instructor upload
 * @param {*} action
 */

export function* onLoadInstructorUpload(action) {
    const { response, error } = yield call(MultipleInstructorUpload, action.url, action.query);
    if (response) {
        yield put({ type: types.FETCH_ADMIN_MULTIPLE_INSTRUCTOR_UPLOAD_SUCCESS, payload: response?.data });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_ADMIN_MULTIPLE_INSTRUCTOR_UPLOAD_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* UploadMultipleInstructor() {
    yield takeLatest(types.FETCH_ADMIN_MULTIPLE_INSTRUCTOR_UPLOAD_START, onLoadInstructorUpload);
}

/**
 * Get student details
 * @param {*} action
 */

export function* onLoadStudent(action) {
    const { response, error } = yield call(GetStudentDetail, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_STUDENT_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_STUDENT_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetStudentData() {
    yield takeLatest(types.FETCH_ADMIN_STUDENT_DATA_START, onLoadStudent);
}

/**
 * Get report details
 * @param {*} action
 */

export function* onLoadReport() {
    const { response, error } = yield call(GetReports);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_REPORTS_DATA_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_REPORTS_DATA_FAIL,
            payload: error,
        });
    }
}

export function* GetReportData() {
    yield takeLatest(types.FETCH_ADMIN_REPORTS_DATA_START, onLoadReport);
}

/**
 * unused code below
 * Get report download
 * @param {*} action
 */

// export function* onLoadReportDownload() {
//     const { response, error } = yield call(DownloadReports);
//     if (response) {
//         yield put({
//             type: types.FETCH_ADMIN_REPORTS_DATA_DOWNLOAD_SUCCESS,
//             payload: response?.data,
//         });
//     } else {
//         yield put({
//             type: types.FETCH_ADMIN_REPORTS_DATA_DOWNLOAD_FAIL,
//             payload: error,
//         });
//     }
// }

// export function* GetReportDataDownload() {
//     yield takeLatest(types.FETCH_ADMIN_REPORTS_DATA_DOWNLOAD_START, onLoadReportDownload);
// }

/**
 * Edit
 * @param {*} action
 */

export function* onLoadEdit(action) {
    const { response, error } = yield call(EditRow, action.url, action.data, action.API_END_POINT);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_EDIT_ROW_SUCCESS,
            payload: response?.data,
        });
        if (action.API_END_POINT === 'instructor') {
            yield put({
                type: types.FETCH_ADMIN_INSTRUCTOR_DATA_START,
                url: BASE_URL_EXTREM + END_POINTS.ADMIN_INSTRUCTOR,
                paginationPayload: PaginationValue
            });
        } else if (action.API_END_POINT === 'students') {
            yield put({
                type: types.FETCH_ADMIN_STUDENT_DATA_START,
                url: BASE_URL_EXTREM + END_POINTS.ADMIN_STUDENT,
                paginationPayload: PaginationValue
            });
        } else if (action.API_END_POINT === 'user') {
            yield put({
                type: types.FETCH_ADMIN_INSTRUCTOR_DATA_START,
                url: BASE_URL_PRO + END_POINTS_PRO.ADMIN_USER,
                paginationPayload: PaginationValue
            });
        } else if (action.API_END_POINT === 'superInstructor') {
            yield put({
                type: types.FETCH_SUPER_ADMIN_EXT_INSTRUCTOR_LIST_START,
                url: END_POINTS.SUPER_ADMIN_INSTRUCTOR + `${action.url.split('/')[6]}/instructors`,
                paginationPayload: PaginationValue
            });
        } else if (action.API_END_POINT === 'superUser') {
            yield put({
                type: types.FETCH_ADMIN_INSTRUCTOR_DATA_START,
                url: BASE_URL_SUPER + END_POINTS_PRO.SUPER_ADMIN_USER + `${action.url.split('/')[6]}/users`,
                paginationPayload: PaginationValue
            });
        }
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_ADMIN_EDIT_ROW_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* EditData() {
    yield takeLatest(types.FETCH_ADMIN_EDIT_ROW_START, onLoadEdit);
}

/**
 * Delete
 * @param {*} action
 */

export function* onLoadDelete(action) {
    const { response, error } = yield call(DeleteRow, action.url, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_DELETE_ROW_SUCCESS,
            payload: response?.data,
        });
        if (action.url.split('/')[3] === EXTREME) {
            yield put({
                type: types.FETCH_ADMIN_INSTRUCTOR_DATA_START,
                url: BASE_URL_EXTREM + END_POINTS.ADMIN_INSTRUCTOR,
                paginationPayload: action.paginationPayload
            });
        } else if (action.url.split('/')[3] === PRO) {
            yield put({
                type: types.FETCH_ADMIN_INSTRUCTOR_DATA_START,
                url: BASE_URL_PRO + END_POINTS_PRO.ADMIN_USER,
                paginationPayload: action.paginationPayload
            });
        } else if (action.url.split('/')[4] === EXTREME) {
            yield put({
                type: types.FETCH_SUPER_ADMIN_EXT_INSTRUCTOR_LIST_START,
                url: END_POINTS.SUPER_ADMIN_INSTRUCTOR + `${action.url.split('/')[6]}/instructors`,
                paginationPayload: action.paginationPayload
            });
        } else if (action.url.split('/')[4] === PRO) {
            yield put({
                type: types.FETCH_ADMIN_INSTRUCTOR_DATA_START,
                url: BASE_URL_SUPER + END_POINTS_PRO.SUPER_ADMIN_USER + `${action.url.split('/')[6]}/users`,
                paginationPayload: action.paginationPayload
            });
        }
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_ADMIN_DELETE_ROW_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* DeleteData() {
    yield takeLatest(types.FETCH_ADMIN_DELETE_ROW_START, onLoadDelete);
}

/**
 * Delete Student
 * @param {*} action
 */

export function* onLoadDeleteStudent(action) {
    const { response, error } = yield call(DeleteStudent, action.url);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_DELETE_STUDENT_ROW_SUCCESS,
            payload: response?.data,
        });
        if (action.url.split('/')[3] === EXTREME) {
            yield put({ type: types.FETCH_ADMIN_STUDENT_DATA_START, paginationPayload: PaginationValue });
        } else {
            yield put({
                type: types.FETCH_SUPER_ADMIN_EXT_STUDENT_LIST_START,
                url: END_POINTS.SUPER_ADMIN_INSTRUCTOR + `${action.url.split('/')[6]}/students`, paginationPayload: PaginationValue
            });
        }
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_ADMIN_DELETE_STUDENT_ROW_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* DeleteStudentData() {
    yield takeLatest(types.FETCH_ADMIN_DELETE_STUDENT_ROW_START, onLoadDeleteStudent);
}

/**
 * Deactivate
 * @param {*} action
 */

export function* onLoadDeactivate(action) {
    const { response, error } = yield call(DeactivateRow, action.url, action.paginationPayload);
    if (response) {
        yield put({ type: types.FETCH_ADMIN_DEACTIVATE_ROW_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_ADMIN_INSTRUCTOR_DATA_START,
            url: action.url.split('/')[3] === EXTREME ?
                BASE_URL_EXTREM + END_POINTS.ADMIN_INSTRUCTOR :
                BASE_URL_PRO + END_POINTS_PRO.ADMIN_USER,
            paginationPayload: action.paginationPayload
        });
    } else {
        yield put({ type: types.FETCH_ADMIN_DEACTIVATE_ROW_FAIL, payload: error });
    }
}

export function* DeactivateData() {
    yield takeLatest(types.FETCH_ADMIN_DEACTIVATE_ROW_START, onLoadDeactivate);
}

/**
 * Get repositary data
 * @param {*} action
 */

export function* onLoadRepo(action) {
    const { response, error } = yield call(GetRepoDetail, action.url, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_ADMIN_REPOSITARY_DETAILS_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_ADMIN_REPOSITARY_DETAILS_FAIL,
            payload: error,
        });
    }
}

export function* GetAdminRepoData() {
    yield takeLatest(types.FETCH_ADMIN_REPOSITARY_DETAILS_START, onLoadRepo);
}

/**
 * Repositary > uploadfile
 * @param {*} action
 */

export function* onLoadUploadFile(action) {
    const { response, error } = yield call(RepoUploadDetail, action.url, action.query);
    if (response) {
        yield put({ type: types.FETCH_ADMIN_REPOSITARY_UPLOAD_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_ADMIN_REPOSITARY_DETAILS_START,
            url: action.url.split('/')[3] === EXTREME ?
                BASE_URL_EXTREM + END_POINTS.ADMIN_REPOSITARY_DATA :
                BASE_URL_PRO + END_POINTS_PRO.ADMIN_REPOSITARY_DATA,
            paginationPayload: StudentSubmissionsPaginationValue
        });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_ADMIN_REPOSITARY_UPLOAD_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* RepoAdminUploadData() {
    yield takeLatest(types.FETCH_ADMIN_REPOSITARY_UPLOAD_START, onLoadUploadFile);
}

/**
 * Remove repositary
 * @param {*} action
 */

export function* onLoadRemoveRepositary(action) {
    const { response, error } = yield call(RemoveRepositaryData, action.url);
    if (response) {
        yield put({ type: types.FETCH_ADMIN_REPOSITARY_DELETE_SUCCESS, payload: response?.data });
        yield put({
            type: types.FETCH_ADMIN_REPOSITARY_DETAILS_START,
            url: action.url.split('/')[3] === EXTREME ?
                BASE_URL_EXTREM + END_POINTS.ADMIN_REPOSITARY_DATA :
                BASE_URL_PRO + END_POINTS_PRO.ADMIN_REPOSITARY_DATA,
            paginationPayload: StudentSubmissionsPaginationValue
        });
        toastrValidation(response);
    } else {
        yield put({
            type: types.FETCH_ADMIN_REPOSITARY_DELETE_FAIL,
            payload: error,
        });
        toastrValidation(error);
    }
}

export function* RemoveRepositaryDetails() {
    yield takeLatest(types.FETCH_ADMIN_REPOSITARY_DELETE_START, onLoadRemoveRepositary);
}