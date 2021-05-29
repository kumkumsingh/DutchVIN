import { fork, all } from "redux-saga/effects";
import map from "lodash/map";
import details from './CarDetails';
import images from './CarImages';

const combinedSagas = [
  details.saga,
  images.saga
];

export default function* root() {
    yield all(map(combinedSagas, fork));
}