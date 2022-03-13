import React, { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Divider,
  Typography,
  Modal,
  Box,
} from '@mui/material'
import { BsCheck2Circle } from 'react-icons/bs'
import styles from './Send.module.css'
import Avatar from 'avataaars'

import { ModalUI } from '../ModalUI/ModalUI'

export const Send = () => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className={styles.container}>
      <Container sx={{ width: '100%' }}>
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
          <TextField id="outlined-name" label="Message" multiline rows="3" />
        </form>
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{ margin: '20px 0' }}
        >
          Send
        </Button>

        {/* <Grid container justifyContent="space-between" spacing={3}>
          <Grid item></Grid>
          <Grid item>
          </Grid>
        </Grid> */}
      </Container>
      <Container>
        <List>
          <ListItem disableGutters>
            <ListItemButton
              size="full"
              sx={{ padding: '10px 0' }}
              onClick={() => {
                setModalOpen(!modalOpen)
              }}
            >
              <ListItemIcon>
                <BsCheck2Circle className={styles.icon} />
              </ListItemIcon>
              <Typography>Mr. Tanbir</Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disableGutters>
            <ListItemButton
              size="full"
              sx={{ padding: '10px 0' }}
              onClick={() => {
                setModalOpen(!modalOpen)
              }}
            >
              <ListItemIcon>
                <BsCheck2Circle className={styles.icon} />
              </ListItemIcon>
              <Typography>Mr. Tanbir</Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disableGutters>
            <ListItemButton
              size="full"
              sx={{ padding: '10px 0' }}
              onClick={() => {
                setModalOpen(!modalOpen)
              }}
            >
              <ListItemIcon>
                <BsCheck2Circle className={styles.icon} />
              </ListItemIcon>
              <Typography>Mr. Tanbir</Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Container>
      <ModalUI modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  )
}
