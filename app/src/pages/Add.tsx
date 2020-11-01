import React, { useEffect, useState } from 'react'
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

import api from '../lib/api'
import { Course } from '../lib/types'

import VerifyLoggedIn from '../components/VerifyLoggedIn'

const Add: React.FC = () => {
  const history = useHistory()
  const [search, setSearch] = useState<string>('')
  const [courses, setCourses] = useState<Course[]>([])
  const [selections, setSelections] = useState<string[]>([])

  useEffect(() => {
    api.get('/courses/all').then((response) => {
      setCourses(response.data)
    })
  }, [])

  useEffect(() => {
    api.get('/courses/selections').then((response) => {
      setSelections(response.data)
    })
  }, [])

  const addCourse = async (id: string) => {
    await api.post('/courses/selections/add', {
      course: id,
    })

    history.push('/home')
  }

  const filteredCourses = courses.filter(
    (c) => c.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 && !selections.includes(c._id)
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
            (filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <IonItem key={course._id} button={true} onClick={() => addCourse(course._id)}>
                  {course.name}
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
