export const ASSIGNMENT_SETTING_VALUE_YES = "YES";
export const ASSIGNMENT_SETTING_VALUE_NO = "NO";
export const FOLDER_VIEW = "FOLDER_VIEW";
export const TABLE_VIEW = "TABLE_VIEW";
export const CLASS_VIEW = "CLASS_VIEW";
export const FILE_TYPE = {
    key: 'assignment_instructor',
    value: 'Assignment Instructor.pdf'
};
export const SUBMISSION_DELAY = 30000;
export const WINDOW_PLATFORM = "MacIntel";

export const FILE_LANGUAGE = {
    'REGIONAL':'Regional'
};
export const NOT_APPLICABLE = 'NA';
/**
 * common table constants
 */
export const TABLE_HEADER_SORT_DISABLE = [
    'action',
    'stats',
    'feedback',
    'grammar_url',
    'score',
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
    'superadminplagairism',
    'superadmingrammar',
    'used_documents',
    'folder_no_of_submissions'
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
export const BACKEND_NO_DATA_PLACEHOLDER = '--';
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
    'SIMILARITY_SATISFACTORY': '#e5ffe5',
    'SIMILARITY_UPGRADE': '#ffffe5',
    'SIMILARITY_POOR': '#e5e5ff',
    'SIMILARITY_UNACCEPTABLE': '#ffe5e5'
}

/**
 * Submissions similarity percentage standard color
 */
export const PROFILE_ROLE = {
    'ADMIN': 'Admin',
    'INSTRUCTOR': 'Instructor',
    'STUDENT': 'Student',
    'USER': 'User',
    'SUPER': 'DrillBit',
    'RESELLER': 'Reseller',
    'CONSORTIUM': 'Consortium',
}

/**
 * Color
 */
 export const COLORS = {
    'white': '#fff',
    'black': '#000'
}

/**
 * Pro roles & constant data
 */
export const PRO_ADMIN = 'admin';
export const PRO_USER = 'user';
export const EXTREME = 'extreme';
export const PRO = 'pro';
export const SUPER = 'super';
export const AUTHENTICATION = 'authentication';

export const INSTRUCTOR = 'instructor';
export const USER = 'user';


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
    'QNA_LISTS': 'Q&A Lists',
    'GRADING_LISTS': 'Grading Lists',
    'RESELLER_LISTS': 'Reseller Lists',
    'EXTREME_LISTS': 'Reseller extreme list',
    'PRO_LISTS': 'Reseller pro list',
    'RESELLER_EXTREME': 'Extreme demo accounts list',
    'RESELLER_PRO': 'Pro demo accounts list',
    'CONSORTIUM_EXTREME': 'Extreme accounts list',
    'CONSORTIUM_PRO': 'Pro accounts list',
}

export const INSTRUCTOR_TEMPLATE_TITLE = 'Multiple_Instructor_Upload_Template';
export const USER_TEMPLATE_TITLE = 'Multiple_User_Upload_Template';

export const UPLOAD_TITLE_CONSTANT = {
    'REPOSITORY': 'Upload files to the repository',
    'SUBMISSION': 'Upload files for plagiarism check',
    'REGIONAL': 'Upload regional file for plagiarism check',
    'GDRIVE': 'Continue with Google Drive',
}

export const UPLOAD_SUPPORTED_FILES = {
    'SINGLE': {
        'FILE_FORMATS': 'File formats:.pdf,.doc,.docx,.txt,.dotx,.dot,.pptx,.xlsx,.wpd,.rtf,.html,.odt,.ppt,.xls,.ps,.tex,.xml,.tiff',
        'LENGTH': 'Document length - upto 800 pages',
        'SIZE': 'Document size - upto 100 MB',
        'MAX_FILES': ' Multiple files - upto 15 files at a time'
    },
    'SCANNED_PDF': {
        'FILE_FORMATS': 'File formats: .pdf',
        'LENGTH': 'Document length - upto 800 pages',
        'SIZE': 'Document size - upto 100 MB',
    },
    'REGIONAL_FORMAT': {
        'FILE_FORMATS': 'File formats:.pdf,.doc,.docx,.txt,.dotx,.dot,.pptx,.xlsx,.wpd,.html,.odt,.ppt,.xls,.ps,.tex,.xml,.tiff',
        'LENGTH': 'Document length - upto 800 pages',
        'SIZE': 'Document size - upto 100 MB',
    },
    'CROSS_LANGUAGE_FORMAT': {
        'FILE_FORMATS': 'File formats:.pdf,.doc,.docx,.txt,.dotx,.dot,.pptx,.xlsx,.wpd,.html,.odt,.ppt,.xls,.ps,.tex,.xml,.tiff',
        'LENGTH': 'Document length - upto 20 pages',
        'SIZE': 'Document size - upto 100 MB',
    },
    'ZIP': {
        'FILE_FORMATS': 'Supported Compressed file format: .zip',
        'LENGTH': 'Document length - upto 800 pages',
        'SIZE': 'Document size - upto 100 MB',
        'MAX_FILES': 'Documents - upto 100 files in a single zip'
    },
    'ZIP_REPO': {
        'FILE_FORMATS': 'Supported Compressed file format: .zip  (limited to .doc, .docx, .pdf files)',
        'LENGTH': 'Document length - upto 800 pages',
        'SIZE': 'Document size - upto 100 MB',
        'MAX_FILES': 'Documents - upto 100 files in a single zip'
    },
    'NON_ZIP': 'Non-Supported Compressed file format :  .rar, .tar, .7z',
    'GDRIVE': {
        'FILE_FORMATS': 'File formats:.pdf,.doc,.docx,.txt,.dotx,.dot,.pptx,.xlsx,.wpd,.rtf,.html,.odt,.ppt,.xls,.ps,.tex,.xml,.tiff',
        'LENGTH': 'Document length - upto 800 pages',
        'SIZE': 'Document size - upto 100 MB',
    },
    'GDRIVEREPOSITORY': {
        'FILE_FORMATS': 'File formats: .pdf, .doc, .docx',
        'LENGTH': 'Document length - upto 800 pages',
        'SIZE': 'Document size - upto 100 MB',
    },
    'NON_ENGLISH': 'Supported file format:.pdf,.doc,.docx,.txt,.dotx,.dot,.pptx,.xlsx, .wpd,.rtf,.html,.odt,.ppt,.xls,.ps,.tex,.xml,.tiff',
    'REGIONAL': 'Supported file format: .docx',
    'REPO_ALLOWED_FILE': {
        'FILE_FORMATS': 'File formats: .pdf, .doc, .docx',
        'LENGTH': 'Document length - upto 800 pages',
        'SIZE': 'Document size - upto 100 MB',
        'MAX_FILES': ' Multiple files - upto 15 files at a time'
    },
    'INVALID_FILE_FORMAT_ERROR':'Invalid file format. Please check above file formats'
}

export const FORM_VALIDATION = {
    'GRADES': 'The entered marks should not be more than maximum marks',
    'REMAINING_DOCUMENTS': 'The entered documents should not be more than available documents',
    'REMAINING_GRAMMAR': 'The entered documents should not be more than available documents',
    'EXPIRY_DATE_GREATER': 'The entered date should not be greater than the expiry date.',
    'EXPIRY_DATE_LESSER': 'The entered date should not less than the current date.',
    'PHONE_NUMBER': 'Size must be between 10 and 15',
}

export const WARNING_MESSAGES = {
    'REPOSITORY': 'Are you sure you want to save this to repository ?',
    'DOWNLOAD': 'Are you sure you want to download ?',
    'DELETE': 'Are you sure you want to delete ?',
    'RESEND_CREDENTIALS': 'Are you sure, you want resend credentials to this account?',
    'MAKE_ADMIN': 'Are you sure, you want to make him admin?',
}

export const SIMILARITY_BULK_REPORT_TITLE = 'SimilarityBulkReport.zip';

export const INTEGRATION_TYPES = {
    MOODLE : 'Moodle',
    CANVAS : 'Canvas',
    BLACKBOARD : 'Blackboard',
    BRIGHTSPACE: 'Brightspace',
    MOODLE_LTI: 'Moodle LTI',
}

export const ERROR_MESSAGE_RESPONSE = {
    'ERROR_MSG_410':'File no longer available',
    'ERR_NETWORK':'No response from server. Check if you are still connected to internet.'
}

export const DOCUMENT_TYPE_LANG = {
    "document_type": [
      "Thesis",
      "Dissertation",
      "Article",
      "e-Book",
      "Synopsis",
      "Assignment",
      "Project Work",
      "Research Paper",
      "Chapter In Books",
      "Analytical/Business Report",
      "Blogs",
      "Web Page",
      "Others"
    ],
    "non_english_languages": [
      "Abkhazian/Abkhaz",
      "Adyghe",
      "Afrikaans",
      "Albanian",
      "Alemannisch",
      "Amharic",
      "Arabic",
      "Aragonese",
      "Aramaic",
      "Armenian",
      "Aromanian",
      "Asturianu",
      "Azerbaijani",
      "Basa Banjar",
      "BasaAceh/Achinese",
      "BasaBali/Balinese",
      "Bashkir",
      "Basque",
      "Bavarian",
      "Belarusian",
      "Bishnupriya",
      "Bosnian",
      "Bulgarian",
      "Cantonese",
      "Catalan",
      "Cebuano",
      "Central Kurdish",
      "Chechen",
      "Chichewa",
      "Chinese (Simplified)",
      "Chinese (Traditional)",
      "Chuvash",
      "Colognian/Kolsch",
      "Cornish",
      "Corsican",
      "Croatian",
      "Czech",
      "Danish",
      "Divehi",
      "Doteli",
      "Dutch",
      "Dzongkha",
      "Egyptian Arabic",
      "Erzya",
      "Esperanto",
      "Estonian",
      "Ewe",
      "Extremaduran",
      "Faroese",
      "Filipino",
      "Finnish",
      "French",
      "Galician",
      "Gaurani",
      "Georgian",
      "German",
      "Gilaki",
      "Greek",
      "Haitian Creole",
      "Hausa",
      "Hawaiian",
      "Hebrew",
      "Hmong",
      "Hungarian",
      "Icelandic",
      "Igbo",
      "Indonesian",
      "Irish",
      "Italian",
      "Japanese",
      "Javanese",
      "Kabardian",
      "Kabiye",
      "Karachay-Balkar",
      "Karakalpak",
      "Kashubian",
      "Kazakh",
      "Khmer",
      "Kinyarwanda",
      "Komi-Permyak",
      "Korean",
      "Kurdish/Kurmanji",
      "Kyrgyz",
      "Ladino",
      "Lao",
      "Latin",
      "Latvian",
      "Lingala",
      "Lithuanian",
      "Lower Sorbian",
      "luxembourgish",
      "Macedonian",
      "Malagasy",
      "Malay",
      "Maltese",
      "Mandarin",
      "Manx",
      "Maori",
      "Minang",
      "Mirandese",
      "Moksha",
      "Mon",
      "Mongolian",
      "Myanmar/Burmese",
      "Nauruan",
      "Nepali",
      "Northern Luri",
      "Northern Sami",
      "Northern Sotho",
      "Norwegian",
      "Novial",
      "Nynorsk",
      "Occitan",
      "Oromo",
      "Ossetian",
      "Pali",
      "Pangasinan",
      "Papiamento",
      "Pashto",
      "Pennsylvania German",
      "Persian",
      "Polish",
      "Portuguese",
      "Quechua",
      "Romanian",
      "Romansh",
      "Russia Buriat",
      "Russian",
      "Sakha",
      "Samoan",
      "Sango",
      "Scots Gaelic",
      "Serbian",
      "Sesotho",
      "Shan",
      "Shona",
      "Silesian",
      "Sinhala",
      "Slovak",
      "slovenian",
      "Somali",
      "South Azerbaijani",
      "Spanish",
      "Sundanese",
      "Swahili",
      "Swedish",
      "Tagalog",
      "Tajik",
      "Talian",
      "Tatar",
      "Thai",
      "Tigrinya",
      "Tok Pisin",
      "Tonga",
      "Tsonga",
      "Tswana",
      "Tulu",
      "Turkish",
      "Turkmen",
      "Tuvan/Tuvanian",
      "Twi",
      "Twi-Akan",
      "Udmurt",
      "Ukrainian",
      "Upper Sorbian",
      "Uyghur",
      "Uzbek",
      "Venda",
      "Venetian",
      "Vietnamese",
      "Walloon/walon",
      "Waray",
      "Welsh",
      "West Frisian",
      "Wolof",
      "Xhosa",
      "Yiddish",
      "Yoruba",
      "Zeelandic",
      "Zulu",
      "others"
    ],
    "regional_languages": [
      "Assamese",
      "Bangla",
      "Bengali",
      "Gujarati",
      "Hindi",
      "Kannada",
      "Malayalam",
      "Marathi",
      "Nepali",
      "Oriya",
      "Punjabi",
      "Sanskrit",
      "Santhali",
      "Sindhi",
      "Tamil",
      "Telugu",
      "Urdu"
    ],
    "cross_language": [
        "English"
    ]
  }