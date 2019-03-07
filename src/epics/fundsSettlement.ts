import { ofType } from 'redux-observable';
import { fundsSettlement as types } from '../constants/ActionTypes';
import { switchMap, tap } from 'rxjs/operators';
import { execute } from '../core/Request';
import URL from '../constants/URL';
import RequestToast from '../core/RequestToast';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2019-03-05
 */

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
      url: URL.settles,
      params: payload,
      type: types.queryComplete
    })),
    tap(RequestToast({prefix: 'fundsSettlement', errorTip: true, successTip: false}))
  )
}
