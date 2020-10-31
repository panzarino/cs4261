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

import api, { setAuth } from '../lib/api'

import VerifyNotLoggedIn from '../components/VerifyNotLoggedIn'

const Register: React.FC = () => {
  const history = useHistory()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !password) {
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/users/register', {
        email,
        password,
      })

      localStorage.setItem('token', response.data.token)
      setAuth(response.data.token)

      setLoading(false)

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
          {error && <IonItem color="danger">Email is already in use!</IonItem>}
        </form>
      </IonContent>
    </IonPage>
  )
}

export default Register
