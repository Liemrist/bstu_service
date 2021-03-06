// @flow
import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { NavigatorActions, Toast } from '@my/framework';
import { getUserData, signIn } from '../api';

import { changeUserInfo } from '../../Student';
import { changeUid, loadingEnd, loadingStart } from '../Authentication.actions';

import { selectEmail, selectIsRemember, selectPassword } from '../Authentication.selectors';
import { adminUid, lecturerUid } from '../Authentication.constants';
import saveCredentialsSaga from './saveCredentials.saga';

import { DEAN_ROUTE, LECTURER_ROUTE, STUDENT_ROUTE } from '../../Product.constants';


export default function* loginSaga(): Saga<void> {
  const email = yield select(selectEmail);
  const password = yield select(selectPassword);
  const isRemember = yield select(selectIsRemember);

  const requestParams = [email, password];

  if (!email || !password) {
    yield call(Toast.show, 'Введите данные');
    return;
  }

  try {
    yield put(loadingStart());
    const { user } = yield call(signIn, ...requestParams);
    yield put(changeUid(user.uid));

    if (isRemember) yield call(saveCredentialsSaga);

    if (user.uid === adminUid) {
      yield put(loadingEnd());
      yield call(NavigatorActions.navigate, DEAN_ROUTE);
      return;
    } else if (user.uid === lecturerUid) {
      yield put(loadingEnd());
      yield call(NavigatorActions.navigate, LECTURER_ROUTE);
      return;
    }

    // FIXME: move api call and result handling to the StudentInfo component.
    const userInfo = yield call(getUserData, user.uid);
    yield put(changeUserInfo(userInfo));
    yield put(loadingEnd());

    yield call(NavigatorActions.navigate, STUDENT_ROUTE);
  } catch (error) {
    yield put(loadingEnd());
    yield call(Toast.show, 'Ошибка');
  }
}
