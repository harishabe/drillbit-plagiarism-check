export const COLUMN_CHART_TYPE = "bar";
export const COLUMN_CHART_COLOR = ['#2B4CB0', '#4795EE'];
export const COLUMN_XAXIS_DATA = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
export const COLUMN_WIDTH = "25%";
export const COLUMN_CHART_HEIGHT = 350;
export const COLUMN_CHART_BORDER_RADIUS = 5;
export const COLUMN_CHART_SERIES_DATA = [
    {
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    },
    {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }
];

// column graph for admin dashboard
export const COLUMN_ADMIN_CHART_TYPE = "bar";
export const COLUMN_ADMIN_CHART_COLOR = ['#2B4CB0'];
export const COLUMN_ADMIN_XAXIS_DATA = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
export const COLUMN_ADMIN_WIDTH = "35%";
export const COLUMN_ADMIN_CHART_HEIGHT = 350;
export const COLUMN_ADMIN_CHART_BORDER_RADIUS = 16;
export const COLUMN_ADMIN_CHART_SERIES_DATA = [
    {
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }
];
export const COLUMN_ADMIN_CHART_GRADIENT = {
    shade: 'dark',
    gradientToColors: ['#FDD835', '#2ef'],
    shadeIntensity: 1,
    type: 'horizontal',
    opacityFrom: 1,
    opacityTo: 1
    ,
    stops: [0, 25, 50, 100]
};


// column graph for admin dashboard
export const COLUMN_ADMIN_ACC_USG_CHART_TYPE = "bar";
export const COLUMN_ADMIN_ACC_USG_CHART_COLOR = ['#2B4CB0'];
export const COLUMN_ADMIN_ACC_USG_XAXIS_DATA = ['Instructors', 'Student', 'Admin'];
export const COLUMN_ADMIN_ACC_USG_WIDTH = "35%";
export const COLUMN_ADMIN_ACC_USG_CHART_HEIGHT = 350;
export const COLUMN_ADMIN_ACC_USG_CHART_BORDER_RADIUS = 5;
export const COLUMN_ADMIN_ACC_USG_CHART_SERIES_DATA = [
    {
        name: 'Net Profit',
        data: [10, 50, 100]
    }
];

// pie chart graph for admin dashboard
export const PIE_CHART_TYPE = "donut";
export const PIE_CHART_COLOR = ['#2B4CB0', '#4795EE'];
export const PIE_CHART_WIDTH = 386
export const PIE_CHART_LABEL = ['Similar work', 'Own work'];
export const PIE_CHART_SERIES = [44, 55];

// radial chart graph for admin dashboard
export const RADIAL_CHART_TYPE = "radialBar";
export const RADIAL_CHART_COLOR = ['#4795EE'];
export const RADIAL_CHART_HEIGHT = 360
export const RADIAL_CHART_LABEL = ['days remaining'];
export const RADIAL_CHART_SERIES = [90];

// Usage chart for admin dashbaord
export const USAGE_CHART_DATA = [ 
    {
        x: 'Instructors',
        y: 2,
        goals: [
            {
                name: 'No. Account',
                value: '',
                strokeHeight: 5,
                strokeColor: '#2B4CB0'
            }
        ]
    },
    {
        x: 'Student',
        y: 3,
        goals: [
            {
                name: 'No. Account',
                value: '',
                strokeHeight: 5,
                strokeColor: '#2B4CB0'
            }
        ]
    },
    {
        x: 'Admin',
        y: 9,
        goals: [
            {
                name: 'No. Account',
                value: '',
                strokeHeight: 5,
                strokeColor: '#2B4CB0'
            }
        ]
    }
];