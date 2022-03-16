import React, { useState, useContext, useEffect } from 'react'
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
} from '@mui/material'
import { BsCheck2Circle } from 'react-icons/bs'
import styles from './Send.module.css'
import Avatar from 'avataaars'
import { useNavigate, useParams } from 'react-router-dom'
import AppService from '../../service/AppService'
import { ModalUI } from '../ModalUI/ModalUI'
import { AuthContext } from '../../contexts/AuthContext'

export const Send = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const [modalOpen, setModalOpen] = useState(false)

  const checkSameUser = () => {
    console.log(id, user._id)
    if (id === user._id) {
      navigate(`/inbox`)
      return
    }
  }

  useEffect(() => {
    checkSameUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value
    AppService.sendText({
      sender: user._id,
      receiver: id,
      text: message,
    })
  }
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
        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            id="outlined-name"
            label="Message"
            multiline
            rows="3"
            name="message"
          />
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{ margin: '20px 0' }}
            type="submit"
          >
            Send
          </Button>
        </form>
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
      <ModalUI
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        data={{ nickName: 'Test', text: 'Hello' }}
      />
    </div>
  )
}
