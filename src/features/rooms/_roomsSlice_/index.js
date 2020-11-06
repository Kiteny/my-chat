import { reducer, actions, selectors } from './roomsSlice';
import rootRoomsSaga from './sagas';

export {
  actions as roomsActions,
  reducer as roomsReducer,
  selectors as roomsSelectors,
  rootRoomsSaga,
};
