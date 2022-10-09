export const ASSIGNMENT_SETTING_VALUE_YES = "YES";
export const ASSIGNMENT_SETTING_VALUE_NO = "NO";
export const FILE_TYPE = {
    key: 'assignment_instructor',
    value: 'Assignment Instructor.pdf'
};

/**
 * common table constants
 */
export const TABLE_HEADER_SORT_DISABLE = [
    'action',
    'stats',
    'feedback',
    'status',
    'STname',
    'similarity',
    'marks',
    'q1',
    'q2',
    'q3',
    'q4',
    'q5',
    'repository_type',
    'reportass_id',
    'reportass_name',
    'reportendDate',
    'reportclass_id',
    'reportclass_name',
    'reportcount',
    'reportcls_id',
    'reportcls_name',
    'reportcreated',
    'reportstudents_count',
    'reportsubmissions_count',
    'reportvalidity',
    'reportassignment_name',
    'reportassignmet_id',
    'reportauthor',
    'reportclas_id',
    'reportclas_name',
    'reportemail',
    'reportno_of_page',
    'reportpaper_id',
    'reportsimilarity',
    'reportsubmission_date',
    'reporttitle',
    'reportid',
    'reportname',
    'reportdate_up',
    'reportusername',
    'reportpercent',
];
export const TABLE_BODY_ALLOW_ICON = [
    'action',
    'stats'
];
export const TABLE_SORTING_ARROW_HANDLE = [
    'paper_id',
    'date_up'
];

export const TABLE_NEXT_PAGE = "Next";
/**
 * displaying -- as a placeholder if no data found.
 */
export const NO_DATA_PLACEHOLDER = '--';
export const NA_DATA_PLACEHOLDER = 'NA';

/**
 * Doc error
 */
export const DOC_ERROR_PLACEHOLDER_1 = 'doc:error';
export const DOC_ERROR_PLACEHOLDER_2 = 'doc_error';

/**
 * Submissions similarity percentage standard color
 */
export const SIMILARITY_COLOR_STANDARD = {
    'SIMILARITY_SATISFACTORY': '#68C886',
    'SIMILARITY_UPGRADE': '#6648eb',
    'SIMILARITY_POOR': '#ddcd3b',
    'SIMILARITY_UNACCEPTABLE': '#efb9b9'
}

/**
 * Color
 */
 export const COLORS = {
    'white': '#fff',
    'black': '#000'
}

/**
 * Pro roles
 */
export const PRO_ADMIN = 'admin';
export const PRO_USER = 'user';

/**
 * Cards & Folders
 */
export const CARD_NEXT_PAGE = 'Next';
export const CARD_FOLDER_ACTIONS = 'Actions';

/**
 * Instructor Role > Download CSV 
 */
export const DOWNLOAD_CSV = {
    'SUBMISSION_REPORT': 'Submission Reports',
    'CLASSROOM_REPORTS': 'Classroom Reports',
    'ASSIGNMENTS_LISTS': 'Assignments Lists',
    'STUDENTS_LISTS': 'Students Lists',
}

export const INSTRUCTOR_TEMPLATE_TITLE = 'Multiple_Instructor_Upload_Template';
export const USER_TEMPLATE_TITLE = 'Multiple_User_Upload_Template';

export const UPLOAD_TITLE_CONSTANT = {
    'REPOSITORY': 'Upload files to the repository',
    'SUBMISSION': 'Upload files for plagiarism check',
    'REGIONAL': 'Upload regional file for plagiarism check',
}

export const UPLOAD_SUPPORTED_FILES = {
    'SINGLE': 'Multiple file formats support: pdf, doc, docx, txt, rtf, dot, dotx, html, odt, pptx',
    'MULTIPLE': 'Supported file formats: pdf, doc, docx',
    'ZIP': 'Supported Compressed file format: zip',
    'NON_ZIP': 'Non-Supported Compressed file format : rar,tar,7z',
    'GDRIVE': 'Supported file formats: pdf, doc, docx, txt, rtf, dot, dotx, html, odt',
    'NON_ENGLISH': 'Supported file format: docx, doc, pdf, txt',
    'REGIONAL': 'Supported file format: docx',
}