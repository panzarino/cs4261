import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

const VerifyNotLoggedIn: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'))
  }, [])

  if (loggedIn) {
    return <Redirect to="/home" />
  }

  return null
}

export default VerifyNotLoggedIn
