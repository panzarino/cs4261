import React from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';

import RegisterForm from '../components/RegisterForm';

const Register: React.FC = () => {
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
                <RegisterForm />
            </IonContent>
        </IonPage>
    );
};

export default Register;
