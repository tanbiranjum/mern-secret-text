import React, { useState, useContext, useEffect } from 'react'
import styles from './Home.module.css'
import { Button } from '@mui/material'
import { buttonStyle } from './Home.styles'
import { Login } from '../ModalUI/Login'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const { isAuthenticated, user } = useContext(AuthContext)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/inbox`)
    }
  })
  return (
    <div className={styles.container}>
      <h1>Send your friend secret text!</h1>
      <div>
        <img src="/assets/images/feedback.webp" alt="feedback" />
      </div>
      <Button
        variant="contained"
        size="large"
        color="primary"
        sx={buttonStyle}
        onClick={() => setModalOpen(true)}
      >
        Let's go!
      </Button>
      <Login modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  )
}
