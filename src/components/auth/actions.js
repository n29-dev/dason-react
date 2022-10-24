import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { setCookie } from '../../lib/cookie';

// create new user
async function createNewUser(email, password, onSuccess = () => {}, onError = () => {}) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        // if user is successfully created onSuccess is invoced
        onSuccess(auth.currentUser);
    } catch (error) {
        // if any error occurs the onError function is invocked
        onError(error);
    }

    return auth.currentUser;
}

// update user profile
async function updateUserProfile(updateProps, onSuccess = () => {}, onError = () => {}) {
    try {
        await updateProfile(auth.currentUser, updateProps);
        // if profile is successfully updated onSuccess is invoced
        onSuccess(auth.currentUser);
    } catch (error) {
        // if any error occurs the onError function is invocked
        onError(error);
    }

    return auth.currentUser;
}

// login existing user
async function logInUser(email, password, onSuccess = () => {}, onError = () => {}) {
    try {
        // if user is successfully signedIn onSuccess is invoced
        await signInWithEmailAndPassword(auth, email, password);
        onSuccess(auth.currentUser);
    } catch (error) {
        // if any error occurs the onError function is invocked
        onError(error);
    }

    return auth.currentUser;
}

// logout user
async function logOutUser(onSucces = () => {}, onError = () => {}) {
    try {
        await signOut(auth);
        setCookie({ name: 'activeChatUser', value: '', expires: -2 });
        // if user is successfully signedIn onSuccess is invoced
        onSucces(auth.currentUser);
    } catch (error) {
        // if any error occurs the onError function is invocked
        onError(error);
    }
}

// add user to db
async function addUserToDb(uid, username) {
    const usersCollectionRef = collection(db, 'users');

    try {
        await setDoc(doc(usersCollectionRef, uid), {
            uid,
            displayName: username,
            peers: [],
        });
    } catch (error) {
        console.log(error);
    }
}

export { createNewUser, updateUserProfile, logInUser, logOutUser, addUserToDb };
