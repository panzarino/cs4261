import React, { useState } from 'react'
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useList } from 'react-firebase-hooks/database'

import firebase from '../lib/firebase'

import VerifyLoggedIn from '../components/VerifyLoggedIn'

const Add: React.FC = () => {
  const [user] = useAuthState(firebase.auth())
  const [search, setSearch] = useState<string>('')
  const [courses, loading] = useList(
    firebase
      .database()
      .ref('courses')
      .orderByChild('name')
      .startAt(search.toUpperCase())
      .endAt(search.toUpperCase() + '\uf8ff')
      .limitToFirst(10)
  )

  return (
    <IonPage>
      <VerifyLoggedIn />
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="My Schedule" defaultHref="/home" />
          </IonButtons>
          <IonTitle>Add Course</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar value={search} onIonChange={(e) => setSearch(e.detail.value!)} />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {search &&
            !loading &&
            courses &&
            (courses.length > 0 ? (
              courses.map((course) => <IonItem key={course.key}>{course.val().name}</IonItem>)
            ) : (
              <IonItem key="none">No courses found!</IonItem>
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Add
