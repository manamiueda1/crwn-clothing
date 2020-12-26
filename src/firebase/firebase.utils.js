import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAXUx6DwZh3bRh9yfrZiYYoIf7kgs1K-Q0",
    authDomain: "crwn-db-3721b.firebaseapp.com",
    projectId: "crwn-db-3721b",
    storageBucket: "crwn-db-3721b.appspot.com",
    messagingSenderId: "326556628847",
    appId: "1:326556628847:web:72aa3705ba930cf3121a9a",
    measurementId: "G-61BTKTE9BT"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()
    
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef;
}



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;






