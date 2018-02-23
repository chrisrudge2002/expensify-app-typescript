import { firebase, googleAuthProivder } from "./firebase";

export const login = async () => {
    const ret = await firebase.auth().signInWithPopup(googleAuthProivder);
    return ret.user.uid;
};

export const logout = async () => {
    await firebase.auth().signOut();
};
