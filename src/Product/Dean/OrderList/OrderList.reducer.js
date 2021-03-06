// @flow
import {
  LOAD_ORDER_LIST_FAILURE,
  LOAD_ORDER_LIST_REQUEST,
  LOAD_ORDER_LIST_SUCCESS,
  type OrderListActions
} from './OrderList.actions';

export type OrderListState = {
  isLoading: boolean,
  orderList: any
}

const initialState = {
  isLoading: false,
  orderList: []
};

export default (state: OrderListState = initialState,
  action: OrderListActions): OrderListState => {
  switch (action.type) {
  case LOAD_ORDER_LIST_FAILURE:
    return {
      ...state,
      isLoading: false
    };
  case LOAD_ORDER_LIST_REQUEST:
    return {
      ...state,
      isLoading: true
    };
  case LOAD_ORDER_LIST_SUCCESS:
    return {
      ...state,
      isLoading: false,
      orderList: action.payload
    };
  default:
    return state;
  }
};
