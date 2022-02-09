/**
 * @author Rohan Gajjar
 */
////////////////    start load Modules //////////////////////////////////////
import { DELETE_SELECT_EMPLOYEE, FILE_UPLOAD, GET_ALL_COUNTRY, GET_CITIES, GET_DATA, GET_STATE, LOGIN_USER, LOGOUT_USER, SELECT_EDIT_LIST, SERCH_USER_DATA, SUBMIT_DATA, UPDATE_USER, VALID_REGISTER_CHECK } from "../actions/Type"
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
///////////////////// load modules end ///////////////////////////////////////




//******************************* */ Actions start *******************************************//
export const fetchData = (pageNumber, selectOption, searchUser) => {

    return (
        (dispatch) => {
            Axios.get(`/getUser/?Page=${pageNumber}&Sort=${selectOption}&Request=${searchUser}`)
                .then((res) => {
                    const data = res.data
                    dispatch({ type: GET_DATA, payload: data })
                })
        }
    )
}


export const getAllCountries = () => {

    return (
        (dispatch) => {
            Axios.get("/getAllCountries")
                .then((res) => {
                    const result = res.data
                    dispatch({ type: GET_ALL_COUNTRY, payload: result })
                })
        }
    )
}
export const getState = (selectedCountryId) => {

    return (
        (dispatch) => {
            Axios.get(`/getState/${selectedCountryId}`)
                .then((res) => {
                    const result = res.data
                    dispatch({ type: GET_STATE, payload: result })
                })
        }
    )
}
export const getCities = (stateId) => {

    return (
        (dispatch) => {
            Axios.get(`/getcities/${stateId}`)
                .then((res) => {
                    const result = res.data
                    dispatch({ type: GET_CITIES, payload: result })
                })
        }
    )
}

export const submitData = (userData) => {
    return (dispatch) => {
        Axios.post('/signUp', userData)
            .then((res) => {
                const result = res.data
                toast.success(result, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                dispatch({ type: SUBMIT_DATA })
            })
            .catch(err => {
                toast.error("Invalid Registration", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })

            })
    }
}
export const validRegisterCheck = () => {
    return (dispatch) => {
        dispatch({ type: VALID_REGISTER_CHECK })
    }
}
export const deleteSelectEmployee = (id) => {
    return (dispatch) => {
        Axios.delete(`/deleteUser/${id}`)
            .then((res) => {
                toast.warning("Record deleted", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                dispatch({ type: DELETE_SELECT_EMPLOYEE, payload: res.data })
            })
            .catch(err => {
                console.log("error" + err);
            })
    }
}

export const selectEditList = (id) => {
    return {
        type: SELECT_EDIT_LIST,
        id
    }
}
export const updateSelectedUserdata = (id, data, email) => {
    return (
        (dispatch) => {
            Axios.put(`/updateUser/${id}/${email}`, data)
                .then((res) => {
                    toast.success("Data Update Successfully", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })

                    dispatch({ type: UPDATE_USER })
                })
                .catch(err => {
                    toast.error("Email already exist", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })

                })
        }
    )
}

export const loginUserData = (data) => {
    return (dispatch) => {
        Axios.post(`/signIn`, data)
            .then((res) => {
                toast.success('Login successfully', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                dispatch({ type: LOGIN_USER })
            })
            .catch(err => {
                toast.error('Invalid Password or Email', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
            })
    }


}

export const logoutUser = () => {
    Axios.get(`/logout`)
        .then(() => {
            toast.info('Logout', { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        })
    return {
        type: LOGOUT_USER
    }
}


export const searchUser = (searchData) => {
    return (
        (dispatch) => {
            Axios.get(`/dashboard/getData/search=${searchData}`)
                .then((res) => {
                    const data = res.data
                    dispatch({ type: SERCH_USER_DATA, payload: data })
                })
        }
    )
}
export const fileUpload = (files) => {
    console.log("files", files);
    return (
        (dispatch) => {
            Axios.post('/upload-files', files)
                .then(res => {
                    toast.success("File Upload Successfully!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
                    dispatch({ type: FILE_UPLOAD })
                })
                .catch(err => {
                    toast.error("File Not Uploaded!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
                });
        }
    )
}