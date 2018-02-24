import { firebase, githubAuthProvider, googleAuthProivder } from "./firebase";

export const loginWithGitHub = async () => {
    const ret = await firebase.auth().signInWithPopup(githubAuthProvider);
    return ret.user.uid;
};

export const loginWithGoogle = async () => {
    const ret = await firebase.auth().signInWithPopup(googleAuthProivder);
    return ret.user.uid;
};

export const logout = async () => {
    await firebase.auth().signOut();
};
