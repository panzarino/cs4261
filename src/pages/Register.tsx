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
  IonLoading,
  IonPage,
  IonToolbar,
} from '@ionic/react'

import firebase from '../lib/firebase'

import VerifyNotLoggedIn from '../components/VerifyNotLoggedIn'

const Register: React.FC = () => {
  const history = useHistory()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !password) {
      return
    }

    setLoading(true)

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      history.push('/home')
    } catch (e) {
      setError(e.code)
      setLoading(false)
    }
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
        <IonLoading isOpen={loading} />
        <h1>Register</h1>
        <form onSubmit={register}>
          <IonItem>
            <IonInput
              type="email"
              value={email}
              placeholder="Email"
              onIonChange={(e) => setEmail(e.detail.value!)}
              required
            />
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
          {error && (
            <IonItem color="danger">
              {error === 'auth/email-already-in-use'
                ? 'Error: that email is already in use'
                : error === 'auth/invalid-email'
                ? 'Please use a valid email'
                : error === 'auth/weak-password'
                ? 'Error: please use a stronger password'
                : 'Something went wrong, please try again'}
            </IonItem>
          )}
        </form>
      </IonContent>
    </IonPage>
  )
}

export default Register
