import React from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Smart Scheduler</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Smart Scheduler</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton color="primary" expand="block" routerLink="/register" routerDirection="forward">Register</IonButton>
        <IonButton color="medium" expand="block" routerLink="/login" routerDirection="forward">Log In</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
