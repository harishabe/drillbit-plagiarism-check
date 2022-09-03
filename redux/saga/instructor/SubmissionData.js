import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../../action/ActionType';
import {
    // GetSubmissionGradingQna,
    GetSubmissionMyClasses,
    GetSubmissionMyFolder,
    EditSubmissionData,
    DeleteSubmission,
    SaveToRepoSubmission,
    InstructorFeedbackData,
    UploadSubmission,
    DownloadSubmissionData
} from '../../api//instructor/DetailsSubmissionAPI';
import toastrValidation from '../../../utils/ToastrValidation';
import { InstructorSubmissionPaginationValue } from '../../../utils/PaginationUrl'

/**
 * Submission-Grading-Qna
 * My classes > assignments > submissions
 * @param {*} action
 */

export function* onLoadSubmissionMyClasses(action) {
    const { response, error } = yield call(GetSubmissionMyClasses, action.clasId, action.assId, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_CLASSES_SUBMISSION_LIST_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_CLASSES_SUBMISSION_LIST_FAIL,
            payload: error,
        });
    }
}

export function* GetSubmissionMyClassesData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_MY_CLASSES_SUBMISSION_LIST_START, onLoadSubmissionMyClasses);
}

/**
 * Get Folder submission data
 * My Folder > Submission List
 * @param {*} action
 */

export function* onLoadSubmissionMyFolder(action) {
    const { response, error } = yield call(GetSubmissionMyFolder, action.folderId, action.paginationPayload);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_FOLDER_SUBMISSION_LIST_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_MY_FOLDER_SUBMISSION_LIST_FAIL,
            payload: error,
        });
    }
}

export function* GetSubmissionMyFolderData() {
    yield takeLatest(types.FETCH_INSTRUCTOR_MY_FOLDER_SUBMISSION_LIST_START, onLoadSubmissionMyFolder);
}

/**
 * Myfolder > submissionList > uploadfile
 * myclasses > assignments > submission-upload
 * @param {*} action
 */

export function* onLoadUploadFile(action) {
    const { response, error } = yield call(UploadSubmission, action.url, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_UPLOAD_SUCCESS, payload: response?.data });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_UPLOAD_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* UploadSubmissionFile() {
    yield takeLatest(types.FETCH_INSTRUCTOR_SUBMISSION_LIST_UPLOAD_START, onLoadUploadFile);
}

/**
 * myclasses > assignments > submission-upload > extracted zip files
 * @param {*} action
 */

export function* onLoadExtractedZipFileUpload(action) {
    const { response, error } = yield call(UploadSubmission, action.url, action.query);
    if (response) {
        yield put({ type: types.FETCH_UPLOAD_EXTRACTED_ZIP_FILE_SUCCESS, payload: response?.data });
        // yield put({
        //     type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_START,
        //     url: action.url.split('/')[0] === 'classes' ? `classes/${action.url.split('/')[1]}/assignments/${action.url.split('/')[3]}/submissions?page=0&size=25&field=name&orderBy=desc` : `myFolder/${action.url.split('/')[1]}/submissions?page=0&size=6&field=name&orderBy=asc`
        // });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_UPLOAD_EXTRACTED_ZIP_FILE_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* UploadExtractedFile() {
    yield takeLatest(types.FETCH_UPLOAD_EXTRACTED_ZIP_FILE_START, onLoadExtractedZipFileUpload);
}

/**
 * Get myfolder > submissionList > delete
 * My classes > Assignments > delete submission
 * @param {*} action
 */

export function* onLoadDeleteFile(action) {
    const { response, error } = yield call(DeleteSubmission, action.url);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_DELETE_SUCCESS, payload: response?.data });
        // yield put({
        //     type: action.url.split('/')[0] === 'classes' ?
        //         (types.FETCH_INSTRUCTOR_MY_CLASSES_SUBMISSION_LIST_START, action.url.split('/')[1], action.url.split('/')[3], InstructorSubmissionPaginationValue) :
        //         (types.FETCH_INSTRUCTOR_MY_FOLDER_SUBMISSION_LIST_START, action.url.split('/')[1], InstructorSubmissionPaginationValue)
        // });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_DELETE_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* DeleteSubmissionFile() {
    yield takeLatest(types.FETCH_INSTRUCTOR_SUBMISSION_LIST_DELETE_START, onLoadDeleteFile);
}

/**
 * Edit Submission
 * @param {*} action
 */
export function* onLoadEditSubmission(action) {
    const { response, error } = yield call(EditSubmissionData, action);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_EDIT_SUCCESS, payload: response?.data });
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_START, url: `classes/${action.clasId}/assignments/${action.folder_id}/submissions?page=0&size=25&field=name&orderBy=desc` });
        toastrValidation(response)
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_EDIT_FAIL,
            payload: error,
        });
        toastrValidation(error)
    }
}

export function* EditSubmissionDetail() {
    yield takeLatest(types.FETCH_INSTRUCTOR_SUBMISSIONS_GRADING_QNA_EDIT_START, onLoadEditSubmission);
}

/**
 * save to repositary 
 * @param {*} action
 */

export function* onLoadSaveToRepo(action) {
    const { response, error } = yield call(SaveToRepoSubmission, action.clasId, action.folder_id, action.paper_id, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSIONS_SAVE_TO_REPOSITARY_SUCCESS, payload: response?.data });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_SUBMISSIONS_SAVE_TO_REPOSITARY_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* SaveToRepo() {
    yield takeLatest(types.FETCH_INSTRUCTOR_SUBMISSIONS_SAVE_TO_REPOSITARY_START, onLoadSaveToRepo);
}

/**
 * instructor feedback 
 * @param {*} action
 */

export function* onLoadInstructorFeedback(action) {
    const { response, error } = yield call(InstructorFeedbackData, action.clasId, action.folder_id, action.paper_id, action.query);
    if (response) {
        yield put({ type: types.FETCH_INSTRUCTOR_FEEDBACK_DETAILS_SUCCESS, payload: response?.data });
        toastrValidation(response);
    } else {
        yield put({ type: types.FETCH_INSTRUCTOR_FEEDBACK_DETAILS_FAIL, payload: error });
        toastrValidation(error);
    }
}

export function* InstructorFeedbackDetail() {
    yield takeLatest(types.FETCH_INSTRUCTOR_FEEDBACK_DETAILS_START, onLoadInstructorFeedback);
}

/**
 * Submission list data download
 * @param {*} action
 */


export function* onLoadDownload(action) {
    const { response, error } = yield call(DownloadSubmissionData, action.url);
    if (response) {
        yield put({
            type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_DOWNLOAD_SUCCESS,
            payload: response?.data,
        });
    } else {
        yield put({
            type: types.FETCH_INSTRUCTOR_SUBMISSION_LIST_DOWNLOAD_FAIL,
            payload: error,
        });
    }
}

export function* DownloadSubmissionDetail() {
    yield takeLatest(types.FETCH_INSTRUCTOR_SUBMISSION_LIST_DOWNLOAD_START, onLoadDownload);
}