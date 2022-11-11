export const BASE_URL = `${process.env.NEXT_PUBLIC_SECRET.includes('uat') ? process.env.NEXT_PUBLIC_SECRET + ':8081' : process.env.NEXT_PUBLIC_SECRET}`;
export const BASE_URL_EXTREM = `${process.env.NEXT_PUBLIC_SECRET.includes('uat') ? process.env.NEXT_PUBLIC_SECRET + ':8082' : process.env.NEXT_PUBLIC_SECRET}`;
export const BASE_URL_UPLOAD = `${process.env.NEXT_PUBLIC_SECRET.includes('uat') ? process.env.NEXT_PUBLIC_SECRET + ':8083' : process.env.NEXT_PUBLIC_SECRET}`;
export const BASE_URL_SUPER = `${process.env.NEXT_PUBLIC_SECRET.includes('uat') ? process.env.NEXT_PUBLIC_SECRET + ':8086/superadmin' : process.env.NEXT_PUBLIC_SECRET}/superadmin`;
//export const BASE_URL_INTEGRATION = `${process.env.NEXT_PUBLIC_SECRET.includes('uat') ? process.env.NEXT_PUBLIC_SECRET + ':8080' : process.env.NEXT_PUBLIC_SECRET}`;
export const BASE_URL_PRO = `${process.env.NEXT_PUBLIC_SECRET.includes('uat') ? process.env.NEXT_PUBLIC_SECRET + ':8087/pro' : process.env.NEXT_PUBLIC_SECRET}/pro`;
export const BASE_URL_ANALYSIS = `${process.env.NEXT_PUBLIC_SECRET.includes('uat') ? process.env.NEXT_PUBLIC_SECRET + ':8084/drillbit-analysis/analysis/' : process.env.NEXT_PUBLIC_SECRET}/drillbit-analysis/analysis/`;
export const BASE_URL_REGIONAL_ANALYSIS = 'https://www.drillbitplagiarismcheck.com:8081/drillbit_regional/viewRegionalResult/';
