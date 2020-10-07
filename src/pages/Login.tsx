import React, { useState } from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonPage,
    IonToolbar
} from '@ionic/react';

import VerifyNotLoggedIn from '../components/VerifyNotLoggedIn';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    return (
        <IonPage>
            <VerifyNotLoggedIn />
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonBackButton text="Smart Scheduler" defaultHref="/" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <h1>Login</h1>
                <IonItem>
                    <IonInput value={email} placeholder="Username" onIonChange={e => setEmail(e.detail.value!)} required />
                </IonItem>
                <IonItem>
                    <IonInput type="password" value={password} placeholder="Password" onIonChange={e => setPassword(e.detail.value!)} required />
                </IonItem>
                <IonButton color="primary" expand="block">Login</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Login;
