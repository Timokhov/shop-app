import { HttpState } from '../../models/http-state';
import { Nullable } from '../../models/nullable';
import { User } from '../../models/user';
import {
    AuthAction,
    AuthActionType,
    LoginFailAction,
    LoginSuccessAction,
    SignUpFailAction,
    SignUpSuccessAction
} from './auth.actions';

export interface AuthState {
    user: Nullable<User>,
    authHttpState: HttpState
}

const initialState:AuthState = {
    user: null,
    authHttpState: {
        requestInProgress: false,
        error: ''
    }
};

const onLoginStart = (state: AuthState, action: AuthAction): AuthState => {
    return {
        ...state,
        authHttpState: {
            requestInProgress: true,
            error: ''
        }
    };
};

const onLoginSuccess = (state: AuthState, action: LoginSuccessAction): AuthState => {
    return {
        ...state,
        user: action.user,
        authHttpState: {
            requestInProgress: false,
            error: ''
        }
    };
};

const onLoginFail = (state: AuthState, action: LoginFailAction): AuthState => {
    return {
        ...state,
        authHttpState: {
            requestInProgress: false,
            error: action.error
        }
    };
};

const onSignUpStart = (state: AuthState, action: AuthAction): AuthState => {
    return {
        ...state,
        authHttpState: {
            requestInProgress: true,
            error: ''
        }
    };
};

const onSignUpSuccess = (state: AuthState, action: SignUpSuccessAction): AuthState => {
    return {
        ...state,
        user: action.user,
        authHttpState: {
            requestInProgress: false,
            error: ''
        }
    };
};

const onSignUpFail = (state: AuthState, action: SignUpFailAction): AuthState => {
    return {
        ...state,
        authHttpState: {
            requestInProgress: false,
            error: action.error
        }
    };
};

export const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionType.LOGIN_START:
            return onLoginStart(state, action);
        case AuthActionType.LOGIN_SUCCESS:
            return onLoginSuccess(state, action as LoginSuccessAction);
        case AuthActionType.LOGIN_FAIL:
            return onLoginFail(state, action as LoginFailAction);
        case AuthActionType.SIGN_UP_START:
            return onSignUpStart(state, action);
        case AuthActionType.SIGN_UP_SUCCESS:
            return onSignUpSuccess(state, action as SignUpSuccessAction);
        case AuthActionType.SIGN_UP_FAIL:
            return onSignUpFail(state, action as SignUpFailAction);
        default:
            return state;
    }
};
