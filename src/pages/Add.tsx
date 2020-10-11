import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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

const db = firebase.database()

const Add: React.FC = () => {
  const history = useHistory()
  const [user] = useAuthState(firebase.auth())
  const [search, setSearch] = useState<string>('')
  const [courses, loading] = useList(
    db
      .ref('courses')
      .orderByChild('name')
      .startAt(search.toUpperCase())
      .endAt(search.toUpperCase() + '\uf8ff')
      .limitToFirst(10)
  )
  const [selections] = useList(
    db
      .ref('selections')
      .orderByChild('uid')
      .equalTo(user ? user.uid + '' : '')
  )

  const addCourse = async (courseKey: string) => {
    if (!user) {
      return
    }

    if (selections && selections.length > 0) {
      const selection = selections[0]

      if (selection.val().courses.includes(courseKey)) {
        return
      }

      await db.ref(`selections/${selection.key}`).update({
        uid: selection.val().uid,
        courses: [...selection.val().courses, courseKey],
      })
    } else {
      await db.ref('selections').push({
        uid: user.uid,
        courses: [courseKey],
      })
    }

    setSearch('')

    history.goBack()
  }

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
              courses
                .filter(
                  (course) =>
                    !selections || selections.length === 0 || !selections[0].val().courses.includes(course.key)
                )
                .map((course) => (
                  <IonItem key={course.key} button={true} onClick={() => addCourse(course.key!)}>
                    {course.val().name}
                  </IonItem>
                ))
            ) : (
              <IonItem key="none">No courses found!</IonItem>
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Add
