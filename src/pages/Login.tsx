import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar} from '@ionic/react';

import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons>
                        <IonBackButton text="Smart Scheduler" defaultHref="/home" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <LoginForm />
            </IonContent>
        </IonPage>
    );
};

export default Login;
