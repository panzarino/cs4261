import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonToolbar,
} from '@ionic/react'

import firebase from '../lib/firebase'

import VerifyNotLoggedIn from '../components/VerifyNotLoggedIn'

const Register: React.FC = () => {
  const history = useHistory()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !password) {
      return
    }

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        // TODO
      } else if (e.code === 'auth/invalid-email') {
        // TODO
      } else if (e.code === 'auth/weak-password') {
        // TODO
      }
    }

    history.push('/home')
  }

  return (
    <IonPage>
      <VerifyNotLoggedIn />
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Smart Scheduler" defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1>Register</h1>
        <form onSubmit={register}>
          <IonItem>
            <IonInput value={email} placeholder="Username" onIonChange={(e) => setEmail(e.detail.value!)} required />
          </IonItem>
          <IonItem>
            <IonInput
              type="password"
              value={password}
              placeholder="Password"
              onIonChange={(e) => setPassword(e.detail.value!)}
              required
            />
          </IonItem>
          <IonButton color="primary" expand="block" type="submit">
            Register
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
}

export default Register
