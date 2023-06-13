'use client';

import { initFirebase } from '../../firebase-config/firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import styles from '../page.module.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/navigation';


export default function Login() {
    initFirebase();

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    


    if (loading) {
        return <div className={styles.fourth}>Loading...</div>;
    }

    if (user) {
        
        router.push('/todoPage');
        return <div className={styles.fourth}>Welcome {user.displayName}</div>
    }

    // redirect the user to a signin popup site
    const signIn = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);
    }
    return (
        
        <>
            <button onClick={signIn}>
                Login
            </button>
        </>
    )
}
