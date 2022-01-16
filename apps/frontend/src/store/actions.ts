// ACTION TYPES
export enum PROGRESS {
  START = '_START',
  SUCCESS = '_SUCCESS',
  FAILED = '_FAILED',
}

export const types = {
  GET_ALL_ORDERS: 'GET_ALL_ORDERS',
  CREATE_ORDER: 'CREATE_ORDER',
};

// ACTION CREATORS
export const actions = {
  // Get all orders
  getAllOrderStart: (payload?: any) => ({
    payload,
    type: types.GET_ALL_ORDERS + PROGRESS.START,
  }),
  getAllOrderSuccess: (payload?: any) => ({
    payload,
    type: types.GET_ALL_ORDERS + PROGRESS.SUCCESS,
  }),
  getAllOrderFailed: (payload?: any) => ({
    payload,
    type: types.GET_ALL_ORDERS + PROGRESS.FAILED,
  }),

  // ? Create Order
  createOrderStart: (payload?: any) => ({
    payload,
    type: types.CREATE_ORDER + PROGRESS.START,
  }),
  createOrderSuccess: (payload?: any) => ({
    payload,
    type: types.CREATE_ORDER + PROGRESS.SUCCESS,
  }),
  createOrderFailed: (payload?: any) => ({
    payload,
    type: types.CREATE_ORDER + PROGRESS.FAILED,
  }),
};
