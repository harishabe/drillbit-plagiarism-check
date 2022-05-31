import * as types from '../ActionType';

export const GetWidgetCount = () => {
    return {
        type: types.FETCH_INSTRUCTOR_DASH_WIDGET_START,
    };
};

/**
 * Get all classes data
 */
export const GetClassesData = () => {
    return {
        type: types.FETCH_INSTRUCTOR_CLASSES_DATA_START,
    };
};

/**
 * Get all folders
 */
export const GetAllFolders = () => {
    return {
        type: types.FETCH_INSTRUCTOR_MY_FOLDERS_START,
    };
};
