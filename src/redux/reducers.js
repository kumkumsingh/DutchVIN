import { combineReducers } from "redux";
import details from './CarDetails';
import images from './CarImages';

export default combineReducers({
    details: details.reducer,
    images: images.reducer
});