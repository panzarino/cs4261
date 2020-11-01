import React, { useState, useEffect } from 'react'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { arrowBack, arrowForward } from 'ionicons/icons'

import api from '../lib/api'
import { ScheduleSection } from '../lib/types'

import VerifyLoggedIn from '../components/VerifyLoggedIn'
import { useHistory } from 'react-router-dom'

const Home: React.FC = () => {
  const history = useHistory()
  const [selections, setSelections] = useState<string[]>([])
  const [schedules, setSchedules] = useState<ScheduleSection[][]>([])
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    api.get('/courses/selections').then((response) => {
      setSelections(response.data)
    })
  }, [])

  useEffect(() => {
    api.get('/schedules/all').then((response) => {
      setSchedules(response.data)
    })
  }, [history.length])

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

        {!!schedules.length && (
          <>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton disabled={index <= 0} onClick={() => setIndex(index - 1)}>
                  <IonIcon icon={arrowBack} />
                </IonButton>
              </IonButtons>
              <IonButtons slot="end">
                <IonButton disabled={index >= schedules.length - 1} onClick={() => setIndex(index + 1)}>
                  <IonIcon icon={arrowForward} />
                </IonButton>
              </IonButtons>
              <IonTitle>
                {index + 1}/{schedules.length}
              </IonTitle>
            </IonToolbar>
            <IonList>
              {schedules[index].map((item) => (
                <IonItem key={item._id + index} style={{ paddingTop: 20 }}>
                  {item.name} - {item.sectionName}
                  <br />
                  {item.days} - {item.period}
                  <br />
                  {item.instructors.join(', ')}
                </IonItem>
              ))}
            </IonList>
          </>
        )}

        {!selections.length && (
          <IonList>
            <IonItem>No courses yet! Add some above to get started.</IonItem>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  )
}

export default Home
