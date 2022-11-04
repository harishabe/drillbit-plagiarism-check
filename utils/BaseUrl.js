// export const BASE_URL = `${process.env.NEXT_PUBLIC_API}:8081`;
// export const BASE_URL_EXTREM = `${process.env.NEXT_PUBLIC_API}:8082`;
// export const BASE_URL_UPLOAD = `${process.env.NEXT_PUBLIC_API}:8083`;
// export const BASE_URL_SUPER = `${process.env.NEXT_PUBLIC_API}:8086/superadmin`;
// export const BASE_URL_INTEGRATION = `${process.env.NEXT_PUBLIC_API}:8080`;
// export const BASE_URL_PRO = `${process.env.NEXT_PUBLIC_API}:8087/pro`;
// export const BASE_URL_ANALYSIS = `${process.env.NEXT_PUBLIC_API}:8084/drillbit-analysis/analysis/`;
// export const BASE_URL_REGIONAL_ANALYSIS = 'https://www.drillbitplagiarismcheck.com:8081/drillbit_regional/viewRegionalResult/';


// export const BASE_URL = 'https://s1.drillbitplagiarismcheck.com:8081';
// export const BASE_URL_EXTREM = 'https://s1.drillbitplagiarismcheck.com:8082';
// export const BASE_URL_UPLOAD = 'https://s1.drillbitplagiarismcheck.com:8083';
// export const BASE_URL_SUPER = 'https://s1.drillbitplagiarismcheck.com:8086/superadmin';
// export const BASE_URL_INTEGRATION = 'https://s1.drillbitplagiarismcheck.com:8080';
// export const BASE_URL_PRO = 'https://s1.drillbitplagiarismcheck.com:8087/pro';
// export const BASE_URL_ANALYSIS = 'https://s1.drillbitplagiarismcheck.com:8084/drillbit-analysis/analysis/';
// export const BASE_URL_REGIONAL_ANALYSIS = 'https://www.drillbitplagiarismcheck.com:8081/drillbit_regional/viewRegionalResult/';

console.log('environment', process.env.NEXT_PUBLIC_API);

export const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://s1.drillbitplagiarismcheck.com:8081' : 'https://uat.drillbitplagiarismcheck.com:8081';
export const BASE_URL_EXTREM = process.env.NODE_ENV === 'production' ? 'https://s1.drillbitplagiarismcheck.com:8082' : 'https://uat.drillbitplagiarismcheck.com:8082';
export const BASE_URL_UPLOAD = process.env.NODE_ENV === 'production' ? 'https://s1.drillbitplagiarismcheck.com:8083' : 'https://uat.drillbitplagiarismcheck.com:8083';
export const BASE_URL_SUPER = process.env.NODE_ENV === 'production' ? 'https://s1.drillbitplagiarismcheck.com:8086/superadmin' : 'https://uat.drillbitplagiarismcheck.com:8086/superadmin';
export const BASE_URL_INTEGRATION = process.env.NODE_ENV === 'production' ? 'https://s1.drillbitplagiarismcheck.com:8080' : 'https://uat.drillbitplagiarismcheck.com:8080';
export const BASE_URL_PRO = process.env.NODE_ENV === 'production' ? 'https://s1.drillbitplagiarismcheck.com:8087/pro' : 'https://uat.drillbitplagiarismcheck.com:8087/pro';
export const BASE_URL_ANALYSIS = process.env.NODE_ENV === 'production' ? 'https://s1.drillbitplagiarismcheck.com:8084/drillbit-analysis/analysis/' : 'https://uat.drillbitplagiarismcheck.com:8084/drillbit-analysis/analysis/';
export const BASE_URL_REGIONAL_ANALYSIS = 'https://www.drillbitplagiarismcheck.com:8081/drillbit_regional/viewRegionalResult/';
