import React,{useContext} from 'react';
import { Typography,Paper,Grid } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { socektContext } from './SocketIo';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '400px',
    [theme.breakpoints.down('xs')]:{
      width: '300px',
    }
  },
  
  gridContainer: {
justifyContent: 'center',
[theme.breakpoints.down('xs')]:{
  flexDirection: 'column',
}

  },
  paper: {
   padding: '10px',
   border: '2px solid black',
   margin:'10px',
  },
}));

const VideoPlayer = () => {
  const {stream,me,call,callAccepted,callEnded,name,setName,userToCall,answerCall,leaveCall,myVideo,userVideo}=useContext(socektContext)
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.gridContainer}>
        {stream&&(
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6} >

            <Typography variant='h5' gutterBottom>
              {name||'Name'}

            </Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>
            
          </Grid>

        </Paper>
        )
}
      { 
      callAccepted&&!callEnded&&(
      <Paper className={classes.paper}>
          <Grid item xs={12} md={6} >

            <Typography variant='h5' gutterBottom>
              {call.name||'Name'}

            </Typography>
            <video playsInline muted ref={userVideo} autoPlay className={classes.video}/>
            
          </Grid>

        </Paper>)
}
        </Grid> 
    </>
  )
}

export default VideoPlayer