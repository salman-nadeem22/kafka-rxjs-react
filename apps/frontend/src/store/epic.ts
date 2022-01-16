import axios, { AxiosError, AxiosResponse } from 'axios';
import { ofType } from 'redux-observable';
import { mergeMap, from, of, tap, map, catchError, startWith } from 'rxjs';
const { CREATE_ORDER, GET_ALL_ORDERS } = types;
import { actions, PROGRESS, types } from './actions';
import { Action } from './interfaces';
const {
  createOrderFailed,
  createOrderSuccess,
  getAllOrderFailed,
  getAllOrderSuccess,
} = actions;

export const createOrderEpic = (action$: any) =>
  action$.pipe(
    ofType(CREATE_ORDER + PROGRESS.START),
    mergeMap((action: Action) =>
      from(axios.post('http://localhost:3333/api', action.payload)).pipe(
        map((response: AxiosResponse) => createOrderSuccess(response.data)),
        catchError((err: AxiosError) =>
          of(createOrderFailed({ error: err.response, code: err.code }))
        )
      )
    )
  );

export const getAllOrderEpic = (action$: any) =>
  action$.pipe(
    ofType(GET_ALL_ORDERS + PROGRESS.START),
    mergeMap((action: Action) =>
      from(axios.get('http://localhost:3333/api', action.payload)).pipe(
        map((response: AxiosResponse) => getAllOrderSuccess(response.data)),
        catchError((err: AxiosError) =>
          of(getAllOrderFailed({ error: err.response, code: err.code }))
        )
      )
    )
  );
export default [createOrderEpic, getAllOrderEpic];
