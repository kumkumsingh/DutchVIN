import { takeEvery, put, call } from "redux-saga/effects";
import request from 'superagent';
import { access_key } from '../../config';
// const axios = require('axios');


//Action types
const types = {
    GET_IMAGES_REQUESTED: 'GET_IMAGES_REQUESTED',
    GET_IMAGES_SUCCEEDED: 'GET_IMAGES_SUCCEEDED',
    GET_IMAGES_FAILED: 'GET_IMAGES_FAILED',
    CLEAR_ERROR: 'CLEAR_ERROR'
};

// Actions for images
export const actions = {
    getImages : (data, callback) => ({
        type: types.GET_IMAGES_REQUESTED,
        data,
        callback
    }),
    clearError: () => ({
        type: types.CLEAR_ERROR
    })
};
// Define your state here
const initialState = {
    images: {},
    loading: false,
    error: ""
};
// This export default reducer will control your state for your application
export default function reducer(state=initialState, action){
    switch(action.type){
            // Set loading
        case types.GET_IMAGES_REQUESTED:
            return {
                ...state,
                loading: true
            };
            // Get car images
        case types.GET_IMAGES_SUCCEEDED:
            return{
                ...state,
                images: action.data,
                loading: false
            }
              // Get errors in case of api call failure
        case types.GET_IMAGES_FAILED:
            return{
                ...state,
                error: action.error,
                loading: false
            }
             // Clear error
        case types.CLEAR_ERROR:
            return{
                ...state,
                error: "",
                loading: false
            }
            // Return default state if you didn't match any case
        default:
            return state;
    }
};


export function* saga(){
    yield takeEvery(types.GET_IMAGES_REQUESTED, getCarImages);
};
 
function* getCarImages({ data, callback }){
    try{
        const response = yield call(callCarImages, { data });
        yield put({
            type: types.GET_IMAGES_SUCCEEDED,
            data: response.body
        });

        typeof callback === 'function' && callback(response.body)
    }
    catch(error){
        yield put({
            type: types.GET_IMAGES_FAILED,
            error: error.response.body.error 
        });
    } 
};

function callCarImages({ data }) {
    if(!data){
        // return  axios.get(`https://api.unsplash.com/search/photos?query=cars`, {
        //     headers:{
        //       'Accept-Version': 'v1',
        //       'Authorization':`${access_key}`
        //     }
        //   })
    return request
            .get(`https://api.unsplash.com/search/photos?query=cars`)
            .set('Accept-Version', 'v1')
            .set('Authorization', access_key);
    }
    else{
    //    return axios.get(`https://api.unsplash.com/search/photos?query=${data}`, {
    //         headers:{
    //           'Accept-Version': 'v1',
    //           'Authorization':`${access_key}`
    //         }
    //       })
        return request
            .get(`https://api.unsplash.com/search/photos?query=${data}`)
            .set('Accept-Version', 'v1')
            .set('Authorization', access_key);
    }
    
}