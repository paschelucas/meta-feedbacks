const token = localStorage.getItem('token');

export const header = {
    headers: {
        Authorization: token
    }
};