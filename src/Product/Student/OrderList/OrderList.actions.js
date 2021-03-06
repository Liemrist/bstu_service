// @flow
import type { OrderData } from '../../types';

export const LOAD_ORDER_LIST_FAILURE = 'LOAD_ORDER_LIST_FAILURE@Student';
export const LOAD_ORDER_LIST_REQUEST = 'LOAD_ORDER_LIST_REQUEST@Student';
export const LOAD_ORDER_LIST_SUCCESS = 'LOAD_ORDER_LIST_SUCCESS@Student';
export const OPEN_ORDER_INFO = 'OPEN_ORDER_INFO@Student';

export type LoadOrderListFailureAction = { type: typeof LOAD_ORDER_LIST_FAILURE };

export type LoadOrderListRequestAction = { type: typeof LOAD_ORDER_LIST_REQUEST };

export type LoadOrderListSuccessAction = {
  type: typeof LOAD_ORDER_LIST_SUCCESS,
  payload: OrderData[]
};

export type OpenOrderInfoAction = {
   type: typeof OPEN_ORDER_INFO,
   payload: OrderData
};

export const loadOrderListFailure = (): LoadOrderListFailureAction => ({
  type: LOAD_ORDER_LIST_FAILURE
});

export const loadOrderListRequest = (): LoadOrderListRequestAction => ({
  type: LOAD_ORDER_LIST_REQUEST
});

export const loadOrderListSuccess = (orderList: OrderData[]): LoadOrderListSuccessAction =>
  ({
    type: LOAD_ORDER_LIST_SUCCESS,
    payload: orderList
  });

export const openOrderInfo = (orderData: OrderData): OpenOrderInfoAction => ({
  type: OPEN_ORDER_INFO,
  payload: orderData
});

export type OrderListActions =
  | LoadOrderListFailureAction
  | LoadOrderListRequestAction
  | LoadOrderListSuccessAction
  | OpenOrderInfoAction
