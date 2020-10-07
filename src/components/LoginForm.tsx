import React, { useState } from 'react';
import { IonButton, IonItem, IonInput } from '@ionic/react';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()

    return (
        <div className="container">
            <h1>Login</h1>
            <IonItem>
                <IonInput value={username} placeholder="Username" onIonChange={e => setUsername(e.detail.value!)} />
            </IonItem>
            <IonItem>
                <IonInput type="password" value={password} placeholder="Password" onIonChange={e => setPassword(e.detail.value!)} />
            </IonItem>
            <IonButton color="primary" expand="block">Login</IonButton>
        </div>
    );
};

export default LoginForm;
