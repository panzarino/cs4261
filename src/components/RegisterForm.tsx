import React, { useState } from 'react';
import { IonButton, IonItem, IonInput } from '@ionic/react';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()

    return (
        <div className="container">
            <h1>Register</h1>
            <IonItem>
                <IonInput value={username} placeholder="Username" onIonChange={e => setUsername(e.detail.value!)} />
            </IonItem>
            <IonItem>
                <IonInput type="password" value={password} placeholder="Password" onIonChange={e => setPassword(e.detail.value!)} />
            </IonItem>
            <IonButton color="primary" expand="block">Register</IonButton>
        </div>
    );
};

export default RegisterForm;
