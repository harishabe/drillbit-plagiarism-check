import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducer/index';
import rootSaga from '../saga';
const sagaMiddleware = createSagaMiddleware();

const middleWare = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middleWare.push(logger);
}

const store = createStore(
    rootReducer,
    applyMiddleware(...middleWare)
);
sagaMiddleware.run(rootSaga);

export default store;