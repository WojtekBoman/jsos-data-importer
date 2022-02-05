export const handleError = (error: any) => {
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
    } else {
        return error.message;
    }
};
