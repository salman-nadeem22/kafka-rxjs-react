import { PROGRESS, types } from './actions';
import { Action } from './interfaces';
const { CREATE_ORDER, GET_ALL_ORDERS } = types;

interface InitialState {
  orderList: any[];
  loading: boolean;
  error: any;
}
const initialState: InitialState = {
  orderList: [],
  loading: false,
  error: null,
};

const reducers = (state: InitialState = initialState, action: Action) => {
  const { payload, type } = action;

  switch (type) {
    //   ? Get orders
    case GET_ALL_ORDERS + PROGRESS.START:
      return { ...state, loading: true };
    case GET_ALL_ORDERS + PROGRESS.SUCCESS:
      return { ...state, loading: false, orderList: payload };
    case GET_ALL_ORDERS + PROGRESS.FAILED:
      return { ...state, loading: false, error: payload };

    //   Create Order
    case CREATE_ORDER + PROGRESS.START:
      return { ...state, loading: true };
    case CREATE_ORDER + PROGRESS.SUCCESS:
      return {
        ...state,
        loading: false,
        orderList: [...state.orderList, payload],
      };
    case CREATE_ORDER + PROGRESS.FAILED:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default reducers;
