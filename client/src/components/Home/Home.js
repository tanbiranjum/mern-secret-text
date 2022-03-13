import React from 'react'
import { GoogleLogin } from 'react-google-login'
import styles from './Home.module.css'
import { Button } from '@mui/material'
import { buttonStyle } from './Home.styles'
// import { Link } from 'react-router-dom'

export const Home = () => {
  const responseGoogle = (res) => {
    const profile = res?.profileObj
    const token = res?.tokenId

    console.log(profile, token)
  }
  return (
    <div className={styles.container}>
      <h1>Send your friend secret text!</h1>
      <div>
        <img src="/assets/images/feedback.webp" alt="feedback" />
      </div>
      {console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID)}
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <Button
            loading
            variant="contained"
            size="large"
            color="primary"
            sx={buttonStyle}
            onClick={renderProps.onClick}
          >
            Let's go!
          </Button>
        )}
      />
    </div>
  )
}
