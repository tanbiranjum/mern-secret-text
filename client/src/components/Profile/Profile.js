import React from 'react'
import { TextField, Button, Typography } from '@mui/material'
import Avatar from 'avataaars'
import styles from './Profile.module.css'

export const Profile = () => {
  return (
    <div className={styles.container}>
      <Typography sx={{ textAlign: 'center', margin: '20px auto' }}>
        Let's choose a unique nick name!
      </Typography>
      <div className={styles.avatarContainer}>
        <Avatar
          avatarStyle="Circle"
          topType="LongHairCurvy"
          accessoriesType="Blank"
          hairColor="Black"
          facialHairType="Blank"
          clotheType="Hoodie"
          clotheColor="Gray01"
          eyeType="Default"
          eyebrowType="Default"
          mouthType="Default"
          skinColor="Light"
          className={styles.avatar}
        />
      </div>
      <form className={styles.form}>
        <TextField
          id="outlined-name"
          label="Nick name"
          sx={{ margin: '20px 0' }}
        />
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ margin: '20px 0' }}
        >
          Save & Go! 🚀
        </Button>
      </form>
    </div>
  )
}
