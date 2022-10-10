import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';

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
}

export { createNewUser, updateUserProfile };
