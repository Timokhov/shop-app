import { FirebaseAuthError, FirebaseUserData } from '../../models/firebase';

export const login = (email: string, password: string): Promise<FirebaseUserData> => {
    return fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAC3YxmVU6-fGc4fETEbDpX-ig_M3jrhTo',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        }
    ).then((response: Response) => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then((error: FirebaseAuthError) => {
                throw new Error(error.error.message);
            });
        }
    });
};

export const signUp = (email: string, password: string): Promise<FirebaseUserData> => {
    return fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAC3YxmVU6-fGc4fETEbDpX-ig_M3jrhTo',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        }
    ).then((response: Response) => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then((error: FirebaseAuthError) => {
                throw new Error(error.error.message);
            });
        }
    });
};
