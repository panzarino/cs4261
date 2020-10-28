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

const Login: React.FC = () => {
  const history = useHistory()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !password) {
      setError(true)
      return
    }

    setLoading(true)

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      history.push('/home')
    } catch (e) {
      setError(true)
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
        <h1>Login</h1>
        <form onSubmit={login}>
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
            Login
          </IonButton>
          {error && <IonItem color="danger">Error: username or password is incorrect.</IonItem>}
        </form>
      </IonContent>
    </IonPage>
  )
}

export default Login
