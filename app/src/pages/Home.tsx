import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { arrowBack, arrowForward, close } from 'ionicons/icons'

import api from '../lib/api'

import { ScheduleSection } from '../lib/types'
import VerifyLoggedIn from '../components/VerifyLoggedIn'
import Calendar from '../components/Calendar'

const Home: React.FC = () => {
  const history = useHistory()
  const [selections, setSelections] = useState<string[]>([])
  const [schedules, setSchedules] = useState<ScheduleSection[][]>([])
  const [index, setIndex] = useState<number>(0)
  const [favorite, setFavorite] = useState<number>()

  const load = () => {
    api.get('/courses/selections').then((response) => {
      setSelections(response.data.selections)
      setFavorite(response.data.favorite)
    })

    api.get('/schedules/all').then((response) => {
      setSchedules(response.data)
    })

    setIndex(0)
  }

  const updateFavorite = (index: number) => {
    api.post('/courses/selections/favorite/set', { favorite: index }).then((response) => {
      setFavorite(response.data.favorite)
    })
  }

  const remove = (index: number) => {
    api.delete(`/courses/selections/delete/${index}`).then(load)
  }

  useEffect(load, [history.length])

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

            <IonButton
              color={favorite === index ? 'success' : 'light'}
              expand="block"
              onClick={() => updateFavorite(index)}
            >
              {favorite === index ? 'Favorite' : 'Set Favorite'}
            </IonButton>

            <IonList>
              {schedules[index].map((item, i) => (
                <IonItem key={item._id + index} style={{ paddingTop: 20 }}>
                  <IonLabel>
                    {item.name} - {item.sectionName}
                    <br />
                    {item.days} - {item.period}
                    <br />
                    {item.instructors.join(', ')}
                  </IonLabel>
                  <IonNote slot="end">
                    <IonButton color="danger" fill="outline" onClick={() => remove(i)}>
                      <IonIcon icon={close} />
                    </IonButton>
                  </IonNote>
                </IonItem>
              ))}
            </IonList>

            <Calendar schedule={schedules[index]} />
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
