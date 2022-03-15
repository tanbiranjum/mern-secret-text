import React from 'react'
import { Modal, Typography, Box } from '@mui/material'

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

export const ModalUI = ({ modalOpen, setModalOpen, data }) => {
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {data?.nickName || 'Nick Name'}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {data.text}
        </Typography>
      </Box>
    </Modal>
  )
}
