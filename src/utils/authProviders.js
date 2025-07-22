import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../firebase";
import { syncFirebaseUser } from "../api/firebaseUserApi";

export const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const idToken = await user.getIdToken(true);

    await syncFirebaseUser(user, idToken);

    return user;
};

export const signInWithFacebook = async () => {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    const idToken = await user.getIdToken(true);

    await syncFirebaseUser(user, idToken);

    return user;
};
