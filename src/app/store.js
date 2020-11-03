import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { userReducer, rootUserSaga } from '../features/user';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootUserSaga);
