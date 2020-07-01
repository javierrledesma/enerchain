import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ipfsAPI from 'ipfs-api'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({row}) {

  

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [js, setjs] = React.useState({ "lecturas": [{}]});
  

 
  getJSONdeIPFS(row).then(json => {
    const jipfs=JSON.parse(json)
    setjs(jipfs)
   
  })


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Ver detalles
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          
          {js.lecturas.map(l=>
          <div>{l.lectura}</div>
          )}
          </div>
        </Fade>
      </Modal>
    </div>
  );

  
}


function getJSONdeIPFS(hash) {
  return new Promise((resolve, reject) => {
    const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' })
    var jsonIpfs = {}
    
    ipfs.files.get(hash, function (err, files) {
      files.forEach((file) => {

        resolve(jsonIpfs = file.content.toString('utf8'))
        
      })
    })

  })
}
