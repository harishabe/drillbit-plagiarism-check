const END_POINTS = {
    LOGIN: '/authentication/authenticate',
    FORGET_PASSWORD: '/authentication/forgotPassword',
    RESET_PASSWORD: '/authentication/saveNewPassword',
    SUBMISSION_REPROCESS: '/authentication/rp/',
    ADMIN_DASHBOARD_WIDGET: '/extreme/admin/dashboard',
    ADMIN_DASHBOARD_DOCUMENT_CHART: '/extreme/admin/documentTypeChart',
    ADMIN_DASHBOARD_DEPARTMENT_CHART: '/extreme/admin/departmentWiseSubmissions',
    ADMIN_TOP_STUDENT: '/extreme/admin/topStudents',
    ADMIN_TREND_ANALYSIS: '/extreme/admin/trendAnalysis',
    ADMIN_RENEW_ACCOUNT: '/extreme/admin/reviveValidity',
    ADMIN_INSTRUCTOR: '/extreme/admin/instructors',
    ADMIN_INSTRUCTOR_STUDENT_STATS: `/extreme/admin/instructor`,
    ADMIN_EXPORT_CSV_STATS: `/extreme/admin/exportToCSV`,
    ADMIN_STUDENT: '/extreme/admin/students',
    ADMIN_REPORTS: '/extreme/admin/reports',
    ADMIN_REPORTS_DOWNLOAD_INSTRUCTOR_LIST: '/extreme/admin/',
    ADMIN_REPORTS_DOWNLOAD_STUDENTS_LIST: '/extreme/admin/students/download',
    ADMIN_INSTRUCTOR_DELETE: '/extreme/admin/instructor?id=',
    ADMIN_STUDENT_DELETE: '/extreme/admin/student',
    ADMIN_REPOSITARY_DATA: '/extreme/admin/directRepositoryInbox',
    ADMIN_REPOSITARY_UPLOAD_SINGLE_FILE: '/extreme/admin/directRepository/single',
    ADMIN_REPOSITARY_UPLOAD_ZIP: '/extreme/admin/directRepository/zip',
    ADMIN_REPOSITARY_UPLOAD_DRIVE: '/extreme/admin/directRepository/drive',
    ADMIN_REPOSITARY_UPLOAD_MULTIPLE_FILE: '/extreme/admin/directRepository/multiple',
    ADMIN_REPOSITARY_REMOVE: '/extreme/admin/removeRepository/',
    ADMIN_INTEGRATION_DATA: '/extreme/integrations/home',
    ADMIN_INTEGRATION_GOOGLE_CLASSROOM: '/extreme/google/auth/oauth',
    ADMIN_INTEGRATION_GOOGLE_LIVECOURSE: '/extreme/google/courses/liveCourses',
    ADMIN_INTEGRATION_GOOGLE_IMPORTCOURSES: '/extreme/google/courses/import',
    ADMIN_INTEGRATION_GOOGLE_COURSEHOME: '/extreme/google/courses/home',
    INSTRUCTOR_DASHBOARD_WIDGET: '/extreme/instructor/dashboard',
    INSTRUCTOR_DASHBOARD_DOCUMENT_CHART: '/extreme/instructor/documentTypeChart',
    INSTRUCTOR_TOP_STUDENT: '/extreme/instructor/topStudents',
    INSTRUCTOR_MY_CLASSES: '/extreme/classes',
    INSTRUCTOR_MY_CLASSES_STUDENTS: '/extreme/classes/',
    INSTRUCTOR_MY_CLASSES_ASSIGNMENT: '/extreme/classes/assignment',
    INSTRUCTOR_MY_FOLDERS: '/extreme/myFolders',
    INSTRUCTOR_SUBMISSION_GRADING_QNA: '/extreme/',
    INSTRUCTOR_SUBMISSION_LIST_ORIGINAL_LIST_DOWNLOAD: '/extreme/',
    INSTRUCTOR_DOWNLOAD_CSV_FILES: '/extreme/classes/download',
    INSTRUCTOR_CLASS_EDIT_DATA: '/extreme/classes/',
    INSTRUCTOR_CLASS_DELETE_DATA: '/extreme/classes?id=',
    INSTRUCTOR_STUDENT_LIST_DATA: '/extreme/classes/allStudents',
    INSTRUCTOR_STUDENT_ENROLL_DATA: '/extreme/classes/',
    INSTRUCTOR_STUDENT_EDIT_DATA: '/extreme/classes/',
    INSTRUCTOR_STUDENT_DELETE_DATA: '/extreme/classes/',
    INSTRUCTOR_ASSIGNMENT_EDIT_DATA: '/extreme/classes/',
    INSTRUCTOR_ASSIGNMENT_DELETE_DATA: '/extreme/classes/',
    INSTRUCTOR_FOLDER_EDIT_AND_DELETE_DATA: '/extreme/folder',
    INSTRUCTOR_SUBMISSION_UPLOAD: '/files/',
    INSTRUCTOR_REPOSITARY_DATA: '/extreme/privateRepositoryInbox',
    INSTRUCTOR_REPOSITARY_UPLOAD_SINGLE_FILE: '/extreme/privateRepository/single',
    INSTRUCTOR_REPOSITARY_UPLOAD_ZIP: '/extreme/privateRepository/zip',
    INSTRUCTOR_REPOSITARY_UPLOAD_MULTIPLE_FILE: '/extreme/privateRepository/multiple',
    INSTRUCTOR_REPOSITARY_UPLOAD_DRIVE: '/extreme/privateRepository/drive',
    INSTRUCTOR_REPOSITARY_REMOVE: '/extreme/removePrivateRepository/',
    STUDENT_DASHBOARD_WIDGET: '/extreme/student/dashboard',
    STUDENT_MY_CLASSES: '/extreme/student/classes',
    STUDENT_MY_ASSIGNMENTS_SUBMISSION: '/extreme/student/myassignments-details',
    STUDENT_NEW_SUBMISSION: '/files/classes/',
    PROFILE_DATA: '/extreme/',
    ADMIN_PROFILE_UPLOAD_LOGO:'/extreme/admin/uploadLogo',
    PROFILE_CHANGE_PASSWORD: '/extreme/account/password',
    ADMIN_INSTRUCTOR_EDIT_DATA: '/extreme/admin/',
    ACTIVATE_DEACTIVATE_INSTRUCTOR: '/extreme/admin/instructor',
    CREATE_INSTRUCTOR: '/extreme/admin/instructor',
    CREATE_CLASS: '/extreme/classes',
    CREATE_FOLDER: '/extreme/folder',
    CREATE_STUDENT: '/extreme/classes/',
    CREATE_ASSIGNMENT: '/extreme/classes/',
    INSTRUCTOR_DOWNLOAD_TEMPLATE: '/extreme/admin/instructorTemplate',
    CREATE_MULTIPLE_INSTRUCTOR:'/extreme/admin/addMultipleInstructors',
    STUDENT_DOWNLOAD_TEMPLATE: '/extreme/classes/',
    CREATE_MULTIPLE_STUDENT: '/extreme/classes/',
    ADMIN_MOODLE_INTEGRATION: '/extreme/integrations/moodle',
    ADMIN_CANVAS_INTEGRATION: '/extreme/integrations/canvas',
    ADMIN_BLACKBOARD_INTEGRATION: '/extreme/integrations/blackboard',
    ADMIN_BRIGHTSPACE_INTEGRATION: '/extreme/integrations/brightspace',
    ADMIN_MOODLE_LTI_INTEGRATION: '/extreme/integrations/moodleLti',
    SUPER_ADMIN_DASHBOARD_WIDGET: '/drillbit/dashboard',
    SUPER_ADMIN_EXTREME: '/extreme/license',
    SUPER_ADMIN_REF: '/pro/license',
    SUPER_ADMIN_EXTREME_LICENSE: '/extreme/licenses',
    SUPER_ADMIN_REF_LICENSE: '/pro/licenses',
    SUPER_ADMIN_RESELLER: '/drillbit/resellers',
    SUPER_ADMIN_RESELLER_LIST: '/drillbit/',
    SUPER_ADMIN_CREATE_EDIT_RESELLER: '/drillbit/reseller',
    SUPER_ADMIN_DROPDOWN_LIST: '/drillbit/dplist',
    SUPER_ADMIN_FOLDER_PATH_LIST: '/drillbit/folders',
    SUPER_ADMIN_INSTRUCTOR: '/extreme/license/',
    SUPER_ADMIN_REPOSITORY_INSTITUTE: '/drillbit/institutes',
    SUPER_ADMIN_REPOSITORY: '/drillbit/license/',
    SUPER_ADMIN_REPOSITORY_SEARCH: '/drillbit/repository?id=',
    SUPER_ADMIN_REPORT_SEARCH: '/drillbit/userInfo?email=',
    SUPER_ADMIN_REMOVE_REPOSITORY: '/pro/license/',
    SUPER_ADMIN_GLOBAL_SEARCH_REMOVE_REPOSITORY: '/drillbit/removeRepository/',
    SUPER_ADMIN_DELETE_ACCOUNT: '/drillbit/license/',
    GRAMMAR_REPORT:'/files/grammar/download/',
    SUBMISSION_INPUTS: '/files/submissionInputs',
    SIMILARITY_REPORT_SINGLE_DOWNLOAD: '/analysis-gateway/api/download2/',
    INTEGRATION_DELETE_CANVAS: '/extreme/integrations/canvas',
    INTEGRATION_DELETE_BLACKBOARD: '/extreme/integrations/blackboard',
    RESELLER_EXTREME_LICENSES: '/reseller/extreme/license',
    RESELLER_PRO_LICENSES: '/reseller/pro/license',
    RESELLER_DASHBOARD: '/reseller/dashboard',
    RESELLER_EXTREME: '/reseller/extreme/licenses',
    RESELLER_CUSTOMERS: '/reseller/licenseList',
    RESELLER_PRO: '/reseller/pro/licenses',
    RESELLER_ACCOUNT_INFORMATION: '/reseller/accountInformation',
    RESELLER_CHANGE_PASSWORD: '/reseller/password',
    RESELLER_CSV_DOWNLOAD: '/reseller/',
    INTEGRATION_DELETE_BRIGHTSPACE: '/extreme/integrations/brightspace',
    INTEGRATION_DELETE_MOODLE_LTI: '/extreme/integrations/moodleLti',
    SSO_LOGIN: '/saml',
    SSO_LOGOUT: '/saml/saml/logout',
};

export default END_POINTS;
