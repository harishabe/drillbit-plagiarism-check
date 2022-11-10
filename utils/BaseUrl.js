// export const BASE_URL = 'https://s1.drillbitplagiarismcheck.com:8081';
// export const BASE_URL_EXTREM = 'https://s1.drillbitplagiarismcheck.com:8082';
// export const BASE_URL_UPLOAD = 'https://s1.drillbitplagiarismcheck.com:8083';
// export const BASE_URL_SUPER = 'https://s1.drillbitplagiarismcheck.com:8086/superadmin';
// export const BASE_URL_INTEGRATION = 'https://s1.drillbitplagiarismcheck.com:8080';
// export const BASE_URL_PRO = 'https://s1.drillbitplagiarismcheck.com:8087/pro';
// export const BASE_URL_ANALYSIS = 'https://s1.drillbitplagiarismcheck.com:8084/drillbit-analysis/analysis/';
// export const BASE_URL_REGIONAL_ANALYSIS = 'https://www.drillbitplagiarismcheck.com:8081/drillbit_regional/viewRegionalResult/';


export const BASE_URL = `${process.env.NEXT_PUBLIC_SECRET}`;
export const BASE_URL_EXTREM = `${process.env.NEXT_PUBLIC_SECRET}`;
export const BASE_URL_UPLOAD = `${process.env.NEXT_PUBLIC_SECRET}`;
export const BASE_URL_SUPER = `${process.env.NEXT_PUBLIC_SECRET}/superadmin`;
export const BASE_URL_INTEGRATION = `${process.env.NEXT_PUBLIC_SECRET}`;
export const BASE_URL_PRO = `${process.env.NEXT_PUBLIC_SECRET}/pro`;
export const BASE_URL_ANALYSIS = `https://uat.drillbitplagiarismcheck.com/drillbit-analysis/analysis/`;
//export const BASE_URL_ANALYSIS = `${process.env.NEXT_PUBLIC_SECRET}/drillbit-analysis/analysis/`;
export const BASE_URL_REGIONAL_ANALYSIS = 'https://www.drillbitplagiarismcheck.com:8081/drillbit_regional/viewRegionalResult/';
