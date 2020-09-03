import { FirebaseUserData } from './firebase';

export class User {
    constructor(
        public id: string,
        public token: string,
        public expirationDateString: string
    ) {}

    public static fromFirebaseUserData(userData: FirebaseUserData): User {
        const expirationDateString = new Date(new Date().getTime() + parseInt(userData.expiresIn) * 1000).toISOString();
        return new User(
            userData.localId,
            userData.idToken,
            expirationDateString
        );
    }
}
