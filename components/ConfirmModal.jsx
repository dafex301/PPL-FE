import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

function ConfirmModal({ open, handleClose, setReset }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "background.paper",
    p: 4,
  };

  const styleBtn = {
    margin: "5px"
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} textAlign='center'>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Reset Password Akun 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Apakah anda yakin ingin melanjutkan aksi ini ?
        </Typography>
        <div style={{paddingTop: "15px", textAlign: "center"}}>
          <Button sx={styleBtn} variant="contained" open={open} onClick={handleClose}>Cancel</Button>
          <Button sx={styleBtn} color="error"  variant="contained" onClick={() => {setReset(true)}} >Confirm</Button>
        </div>
      </Box>
    </Modal>
  );
}

export default ConfirmModal;
