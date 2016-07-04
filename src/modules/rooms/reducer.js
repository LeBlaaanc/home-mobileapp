import { Map, List } from 'immutable';

import actionTypes from './actionTypes';
import { State } from './model';

const initialState: State = Map({
  isRefreshing: false,
  isLoading: false,
  items: List(),
});

export (state = initialState, action: any): State => {
  switch (action.type) {
    case actionTypes.REFRESH:
       state.update('items', payload);
    default:
      return state;
  } 
};