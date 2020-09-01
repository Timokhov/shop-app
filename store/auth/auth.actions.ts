import { Action } from 'redux';
import { User } from '../../models/user';

export enum AuthActionType {
    LOGIN = 'LOGIN',
    LOGIN_START = 'LOGIN_START',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAIL = 'LOGIN_FAIL',

    SIGN_UP = 'SIGN_UP',
    SIGN_UP_START = 'SIGN_UP_START',
    SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
    SIGN_UP_FAIL = 'SIGN_UP_FAIL'
}

export interface AuthAction extends Action<AuthActionType> {}

export interface LoginAction extends AuthAction {
    email: string,
    password: string
}

export interface LoginSuccessAction extends AuthAction {
    user: User
}

export interface LoginFailAction extends AuthAction {
    error: string
}

export interface SignUpAction extends AuthAction {
    email: string,
    password: string
}

export interface SignUpSuccessAction extends AuthAction {
    user: User
}

export interface SignUpFailAction extends AuthAction {
    error: string
}

export const login = (email: string, password: string): LoginAction => {
    return {
        type: AuthActionType.LOGIN,
        email: email,
        password: password
    };
};

export const loginStart = (): AuthAction => {
    return {
        type: AuthActionType.LOGIN_START
    };
};

export const loginSuccess = (user: User): LoginSuccessAction => {
    return {
        type: AuthActionType.LOGIN_SUCCESS,
        user: user
    };
};

export const loginFail = (error: string): LoginFailAction => {
    return {
        type: AuthActionType.LOGIN_FAIL,
        error: error
    };
};

export const signUp = (email: string, password: string): SignUpAction => {
    return {
        type: AuthActionType.SIGN_UP,
        email: email,
        password: password
    };
};

export const signUpStart = (): AuthAction => {
    return {
        type: AuthActionType.SIGN_UP_START
    };
};

export const signUpSuccess = (user: User): SignUpSuccessAction => {
    return {
        type: AuthActionType.SIGN_UP_SUCCESS,
        user: user
    };
};

export const signUpFail = (error: string): SignUpFailAction => {
    return {
        type: AuthActionType.SIGN_UP_FAIL,
        error: error
    };
};
