import React, { useContext, useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

import AppService from '../../service/AppService'
import styles from './Inbox.module.css'

import { ModalUI } from '../ModalUI/ModalUI'
import { AuthContext } from '../../contexts/AuthContext'

export const Inbox = () => {
  const { user } = useContext(AuthContext)
  const [modalOpen, setModalOpen] = useState(false)
  const [texts, setTexts] = useState([])

  useEffect(() => {
    async function getAllTextsForThisUser() {
      const res = await AppService.getInbox(user._id)
      setTexts(res.data.text)
    }
    getAllTextsForThisUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={styles.container}>
      <Paper square sx={{ pb: '50px' }}>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ p: 2, pb: 0 }}
        >
          Inbox
        </Typography>
        <List sx={{ mb: 2 }}>
          {texts &&
            texts.map(({ _id, text, receiver }, index) => (
              <React.Fragment key={_id}>
                {index === 1 && (
                  <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                    Today
                  </ListSubheader>
                )}

                {index === 3 && (
                  <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                    Yesterday
                  </ListSubheader>
                )}

                <ListItem
                  button
                  onClick={() => {
                    setModalOpen(!modalOpen)
                  }}
                >
                  <ListItemAvatar>
                    {/* <Avatar alt="Profile Picture" src={person} /> */}
                  </ListItemAvatar>
                  <ListItemText primary={receiver.nickName} secondary={text} />
                </ListItem>
                <ModalUI
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  data={{nickName: receiver.nickName, text}}
                />
              </React.Fragment>
            ))}
        </List>
      </Paper>
    </div>
  )
}
