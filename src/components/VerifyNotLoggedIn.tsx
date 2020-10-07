import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from '../lib/firebase';

const VerifyNotLoggedIn: React.FC = () => {
    const [user] = useAuthState(firebase.auth());

    if (user) {
        return (<Redirect to="/home" />);
    }

    return null;
};

export default VerifyNotLoggedIn;
