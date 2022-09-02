import { toast } from 'react-toastify';

const error = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const success = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const toastrValidation = (response) => {
    if (response?.status === 201) {
        success(response?.data?.message);
    } else if (response?.status === 200) {
        success(response?.data?.message);
    } else if (response?.status === 202) {
        success(response?.data?.message);
    } else if (response?.response?.status === 401) {        
        error(response?.response?.data?.error);
    } else if (response?.response?.status === 400) {
        error(response?.response?.data?.message);
    } else if (response?.response?.data?.status === 409) {
        error(response?.response?.data?.message);
    } else if (response?.response?.data?.status === 500) {
        error(response?.response?.data?.error);
    } else if (response?.code === "ECONNABORTED") {
        error('ERR_TIMED_OUT');
    } else if (response?.code === "ERR_NETWORK") {
        error('No response from server. Check if you are still connected to internet.');
    }
};

export default toastrValidation;

