import React from 'react'
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'

import VerifyLoggedIn from '../components/VerifyLoggedIn'

const Home: React.FC = () => {
  return (
    <IonPage>
      <VerifyLoggedIn />
      <IonHeader>
        <IonToolbar>
          <IonTitle>Smart Scheduler</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonToolbar>
          <IonTitle size="large">Smart Scheduler</IonTitle>
        </IonToolbar>
        <IonButton color="primary" expand="block" routerLink="/add" routerDirection="forward">
          Add Course
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Home
