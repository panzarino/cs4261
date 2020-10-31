import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

const VerifyLoggedIn: React.FC = () => {
  const [notLoggedIn, setNotLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    setNotLoggedIn(!localStorage.getItem('token'))
  }, [])

  if (notLoggedIn) {
    return <Redirect to="/" />
  }

  return null
}

export default VerifyLoggedIn
