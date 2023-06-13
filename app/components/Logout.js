'use client';

import { app } from '../../firebase-config/firebase'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../globals.css'




export default function Logout() {
    const auth = getAuth(app);
    const [user, loading] = useAuthState(auth);

    // show Loading.. when checking for the authenticated users
    const router = useRouter();
    if (loading) {
        return <div>Loading...</div>
    }
    
    // is the user doesnt exist send user back to login page
    if (!user) {
        router.push('/');
        return <div>Please sign in to continue</div>
    }
  return (
    <div>
  
      <button onClick={() => auth.signOut()}>
        Log out
      </button>
    </div>
  )
 
}