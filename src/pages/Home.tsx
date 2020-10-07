import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'

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
        <h1>Logged In</h1>
      </IonContent>
    </IonPage>
  )
}

export default Home
