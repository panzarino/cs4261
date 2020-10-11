import React from 'react'
import { IonButton, IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useList } from 'react-firebase-hooks/database'
import VerifyLoggedIn from '../components/VerifyLoggedIn'

import firebase from '../lib/firebase'

const db = firebase.database()

const Home: React.FC = () => {
  const [user] = useAuthState(firebase.auth())

  const getCourse = async (courseId: string) => {
    db.ref('courses').equalTo(courseId)
  }

  const [selections] = useList(
    db
      .ref('selections')
      .orderByChild('uid')
      .equalTo(user ? user.uid : '')
  )

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
        <IonList>
          {user && selections && selections.length > 0
            ? selections
                .filter((selection) => selection.val().userId.equalTo(user.uid))
                .map((selection) => <IonItem>{getCourse(selection.val().course)}</IonItem>)
            : 'None Found'}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Home
