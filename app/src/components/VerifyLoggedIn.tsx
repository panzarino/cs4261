import React from 'react'
import { Redirect } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

import firebase from '../lib/firebase'

const VerifyLoggedIn: React.FC = () => {
  const [user, loading] = useAuthState(firebase.auth())

  if (!loading && !user) {
    return <Redirect to="/" />
  }

  return null
}

export default VerifyLoggedIn
