import React, { useState, useEffect } from 'react'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useList } from 'react-firebase-hooks/database'

import firebase from '../lib/firebase'

import VerifyLoggedIn from '../components/VerifyLoggedIn'

const db = firebase.database()

const Home: React.FC = () => {
  const [user] = useAuthState(firebase.auth())
  const [courses, setCourses] = useState<any[]>([])

  const [selections] = useList(
    db
      .ref('selections')
      .orderByChild('uid')
      .equalTo(user ? user.uid : '')
  )

  useEffect(() => {
    if (!selections || selections.length === 0) {
      return
    }

    setCourses([])
    const selection = selections[0]
    selection.val().courses.forEach((key: string) => {
      db.ref(`courses/${key}`).once('value', (course) => {
        if (!courses.find((c) => c.key === course.key)) {
          setCourses([...courses, course])
        }
      })
    })
  }, [selections])

  const remove = (courseKey: string) => {
    setCourses(courses.filter((c) => c.key !== courseKey))
  }

  return (
    <IonPage>
      <VerifyLoggedIn />
      <IonHeader>
        <IonToolbar />
      </IonHeader>
      <IonContent fullscreen>
        <IonToolbar>
          <IonTitle size="large">Smart Scheduler</IonTitle>
        </IonToolbar>
        <IonButton
          color="primary"
          expand="block"
          routerLink="/add"
          routerDirection="forward"
          style={{ marginBottom: 30 }}
        >
          Add Course
        </IonButton>
        <IonList>
          {courses.length > 0 ? (
            courses.map((course) => (
              <IonItem key={course.key}>
                {course.val().name}{' '}
                <IonNote slot="end" color="danger" onClick={() => remove(course.key)}>
                  X
                </IonNote>
              </IonItem>
            ))
          ) : (
            <IonItem>No courses yet! Add some above to get started.</IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Home