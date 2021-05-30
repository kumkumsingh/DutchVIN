import { takeEvery, put, call } from "redux-saga/effects";
// import axios from 'axios'
import request from 'superagent';
import { api_key } from '../..//config';

//action types
const types = {
    GET_DETAILS_REQUESTED: 'GET_DETAILS_REQUESTED',
    GET_DETAILS_SUCCEEDED: 'GET_DETAILS_SUCCEEDED',
    GET_DETAILS_FAILED: 'GET_DETAILS_FAILED',
    CLEAR_ERROR: 'CLEAR_ERROR'
};

// Actions for getting details 
export const actions = {
    getDetails : (data) => ({
        type: types.GET_DETAILS_REQUESTED,
        data
    }),
    clearError: () => ({
        type: types.CLEAR_ERROR
    })
};
// Define your state here
const initialState = {
    details: {},
    loading: false,
    error: ""
};

// This export default reducer will control your state for your application
export default function reducer(state=initialState, action){
    switch(action.type){
            // Set loading
        case types.GET_DETAILS_REQUESTED:
            return {
                ...state,
                loading: true
            };
              // Get details
        case types.GET_DETAILS_SUCCEEDED:
            return{
                ...state,
                details: action.data,
                loading: false
            }
            // Get errors in case of api call failure
        case types.GET_DETAILS_FAILED:
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
                details: {},
                loading: false
            }
        // Return default state if you didn't match any case
        default:
            return state;
    }
};

export function* saga(){
    yield takeEvery(types.GET_DETAILS_REQUESTED, getVehicleDetails);
};
 
// Get details for car based on VIN number
function* getVehicleDetails({ data }){
    try{
        const response = yield call(callVehicleDetails, { data });
        yield put({
            type: types.GET_DETAILS_SUCCEEDED,
            data: response.body
        });
    }
    catch(error){
        yield put({
            type: types.GET_DETAILS_FAILED,
            error: error.response.body.error 
        });
    } 
};

// setting headers for api call
function callVehicleDetails({ data }) {
    return request
    .get(`https://api.overheid.io/voertuiggegevens/${data}`)
    .set('ovio-api-key', api_key);
}
