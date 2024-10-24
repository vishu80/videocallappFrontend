import React, { useState,useContext } from 'react';
import { Button,TextField,Grid,Typography,Container,Paper } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CopyToClipboard, {copyToClipboard} from 'react-copy-to-clipboard';
import {Assignment,Phone,PhoneDisabled} from '@material-ui/icons';
import { socektContext } from './SocketIo';

const useStyles = makeStyles((theme) => ({
  root:{
    display: 'flex',
    flexDirection: 'column',
  },
 
  
  container:{
width:'600px',
margin: '0 auto',
padding:0,
[theme.breakpoints.down('xs')]:{
  width: '80%',
  }
},

  gridContainer: {
justifyContent: 'center',
[theme.breakpoints.down('xs')]:{
  flexDirection: 'column',
}

  },

  margin:{
    marginTop: 20,
  },

  paper: {
   padding: '10px',
   border: '2px solid black',
  },
}));

const Option = ({children}) => {
  const {me,callAccepted,callEnded,name,setName,userToCall,answerCall,leaveCall}=useContext(socektContext);
  const [idToCall,setIdToCall]=useState();
  const classes = useStyles();
  return (
    <Container className={classes.Container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete='off'>
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography variant='h6' gutterBottom >
                Account Info
              </Typography>
              {console.log(me)}
              <TextField label='Name' value={name} onChange={(e)=>setName(e.target.value)} fullWidth/>
                <CopyToClipboard text={me} className={classes.margin}>
                  <Button variant='outlined' color='primary' fullWidth startIcon={<Assignment fontSize='large'/>}>
                  Copy Your Id
                  </Button>
                  </CopyToClipboard>
            </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography variant='h6' gutterBottom >
                Make A call
              </Typography>
              <TextField label='Name' value={idToCall} onChange={(e)=>setIdToCall(e.target.value)} fullWidth/>
                {/* <CopyToClipboard text={me} className={classes.margin}> */}
                {
                  callAccepted&&!callEnded? 
                  <Button variant='contained' color='secondary' fullWidth onClick={leaveCall} startIcon={<PhoneDisabled fontSize='large' className={classes.margin}/>}>
                    Leave Call
                  </Button>
                  :
                  <Button variant='contained' color='primary' fullWidth onClick={()=>answerCall(idToCall)} startIcon={<Phone fontSize='large'/>}>
                     Call
                  </Button>
                }
                  {/* <Button variant='outlined' color='primary' fullWidth startIcon={<Assignment fontSize='large'/>}>
                  
                  </Button> */}
                  {/* </CopyToClipboard> */}
            </Grid>
            </Grid>

        </form>
        {children}
      </Paper>

    </Container>
  )
}

export default Option