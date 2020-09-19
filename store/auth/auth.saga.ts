import { put, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { FirebaseUserData } from '../../models/firebase';
import { Nullable } from '../../models/nullable';
import { User } from '../../models/user';
import { AuthActionType, LoginAction, SignUpAction } from './auth.actions';
import * as AuthActions from './auth.actions';
import * as AuthService from '../../services/auth/auth.service';

export function* watchAuthSaga() {
    yield takeEvery(AuthActionType.LOGIN, loginSaga);
    yield takeEvery(AuthActionType.SIGN_UP, signUpSaga);
    yield takeEvery(AuthActionType.CHECK_AUTH, checkAuthSaga);
    yield takeEvery(AuthActionType.LOGOUT, logoutSaga);
}

function* loginSaga(action: LoginAction) {
    yield put(AuthActions.loginStart());
    try {
        const userData: FirebaseUserData = yield AuthService.login(action.email, action.password);
        const user: User = User.fromFirebaseUserData(userData);
        yield AsyncStorage.setItem('userData', JSON.stringify(user));
        yield put(AuthActions.loginSuccess(user));
    } catch (error) {
        yield put(AuthActions.loginFail(error.message));
    }
}

function* signUpSaga(action: SignUpAction) {
    yield put(AuthActions.signUpStart());
    try {
        const userData: FirebaseUserData = yield AuthService.signUp(action.email, action.password);
        const user: User = User.fromFirebaseUserData(userData);
        yield AsyncStorage.setItem('userData', JSON.stringify(user));
        yield put(AuthActions.signUpSuccess(user));
    } catch (error) {
        yield put(AuthActions.signUpFail(error.message));
    }
}

function* checkAuthSaga() {
    const userJson: Nullable<string> = yield AsyncStorage.getItem('userData');
    if (userJson) {
        const user: User = JSON.parse(userJson);
        const expirationDate: Date = new Date(user.expirationDateString);
        if (expirationDate <= new Date() || !user.id || !user.token) {
            yield AsyncStorage.removeItem('userData');
            yield put(AuthActions.clearAuth());
        } else {
            yield put(AuthActions.loginSuccess(user));
        }
    }
    yield put(AuthActions.authChecked());
}

function* logoutSaga() {
    yield AsyncStorage.removeItem('userData');
    yield put(AuthActions.clearAuth());
}
