import { put, takeEvery } from 'redux-saga/effects';
import { FirebaseUserData } from '../../models/firebase';
import { AuthActionType, LoginAction, SignUpAction } from './auth.actions';
import * as AuthActions from './auth.actions';
import * as AuthService from '../../services/auth/auth.service';

export function* wathAuthSaga() {
    yield takeEvery(AuthActionType.LOGIN, loginSaga);
    yield takeEvery(AuthActionType.SIGN_UP, signUpSaga);
}

function* loginSaga(action: LoginAction) {
    yield put(AuthActions.loginStart());
    try {
        const userData: FirebaseUserData = yield AuthService.login(action.email, action.password);
        yield put(AuthActions.loginSuccess({ id: userData.localId, token: userData.idToken }));
    } catch (error) {
        yield put(AuthActions.loginFail(error.message));
    }
}

function* signUpSaga(action: SignUpAction) {
    yield put(AuthActions.signUpStart());
    try {
        const userData: FirebaseUserData = yield AuthService.signUp(action.email, action.password);
        yield put(AuthActions.signUpSuccess({ id: userData.localId, token: userData.idToken }));
    } catch (error) {
        yield put(AuthActions.signUpFail(error.message));
    }
}
