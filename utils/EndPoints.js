const END_POINTS = {
    LOGIN: '/authentication/authenticate',
    FORGET_PASSWORD: '/authentication/forgotPassword',
    ADMIN_DASHBOARD_WIDGET: '/extreme/admin/dashboard',
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
    ADMIN_REPOSITARY_UPLOAD: '/extreme/admin/directRepository',
    ADMIN_REPOSITARY_REMOVE: '/extreme/admin/removeRepository/',
    ADMIN_INTEGRATION_DATA: '/extreme/integrations/home',
    INSTRUCTOR_DASHBOARD_WIDGET: '/extreme/instructor/dashboard',
    INSTRUCTOR_MY_CLASSES: '/extreme/classes',
    INSTRUCTOR_MY_CLASSES_STUDENTS: '/extreme/classes/',
    INSTRUCTOR_MY_CLASSES_ASSIGNMENT: '/extreme/classes/assignment',
    INSTRUCTOR_MY_FOLDERS: '/extreme/myFolders',
    INSTRUCTOR_SUBMISSION_GRADING_QNA: '/extreme/',
    INSTRUCTOR_SUBMISSION_LIST_ORIGINAL_LIST_DOWNLOAD: '/extreme/',
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
    INSTRUCTOR_REPOSITARY_UPLOAD: '/extreme/privateRepository',
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
    SUPER_ADMIN_DASHBOARD_WIDGET: '/drillbit/dashboard',
    SUPER_ADMIN_EXTREME: '/extreme',
    SUPER_ADMIN_REF: '/pro',
};

export default END_POINTS;
