export const loadForm = (object) => {
    let formData = new FormData();
    for (const att in object) {
        if (!object.hasOwnProperty(att)) continue;

        if (object[att] instanceof File) {
            formData.append(att, object[att]);
        } else {
            formData.set(att, JSON.stringify(object[att]));
        }
    }

    return formData
}

export const createHeaders = (headers, data) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const REACT_APP_AUTH = user ? { Authorization: `Bearer ${user.token}` } : "";

    return data ?
        {

            headers: {
                ...REACT_APP_AUTH,
                ...headers
            },
            data: {
                ...data,
            }
        }
        :
        {
            headers: {
                ...REACT_APP_AUTH,
                ...headers
            },
        }

}