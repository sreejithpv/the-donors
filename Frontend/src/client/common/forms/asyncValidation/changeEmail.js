import axios from 'axios';
import { CHANGE_EMAIL_ERROR } from './../../../actions/types';
import webConfig from './../../../../../webConfig';

const asyncValidate = (values, dispatch, props, field) => {

    const error = {};

    const email = new Promise(resolve => {
        if (values.email) {
            axios.post(`${webConfig.axiosInstance_baseURL}/users/email/unique`, values)
            .then(({data}) => {

                if (data.unique != true) {
                    error.email = 'Email has been used...';
                }

                resolve()

            }).catch(() => {
                dispatch({
                    type: CHANGE_EMAIL_ERROR,
                    payload: true
                });
            });

        }else{
            resolve()
        }
    });

    return Promise.all([email]).then(() => {
        if(error.email){
            throw error;
        }
    });

};

export default asyncValidate
