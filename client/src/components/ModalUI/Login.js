import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Typography, Box, TextField, Button } from '@mui/material'
import AuthService from '../../service/AuthService'
import { AuthContext } from '../../contexts/AuthContext'
import styles from './modal.module.css'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const Login = ({ modalOpen, setModalOpen }) => {
  const { setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const email = e.target.elements.email.value
      const password = e.target.elements.password.value
      const res = await AuthService.login({ email, password })
      setIsAuthenticated(res.isAuthenticated)
      setUser(res.data.data.user)
      navigate('/inbox')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        setModalOpen(false)
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" sx={{ textAlign: 'center' }}>
          Login
        </Typography>
        <form className={styles.form} onSubmit={handleLogin}>
          <TextField
            id="outlined-name"
            label="email"
            name="email"
            sx={{ margin: '20px 0' }}
            type="email"
          />
          <TextField
            type="password"
            name="password"
            id="outlined-name"
            label="password"
          />
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ margin: '20px 0' }}
            type="submit"
          >
            Log in
          </Button>
        </form>
      </Box>
    </Modal>
  )
}
