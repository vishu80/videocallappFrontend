import React,{useContext} from 'react'
import { Button } from '@material-ui/core'
import { socektContext } from './SocketIo'
const Notification = () => {

  const {call,callAccepted,answerCall}=useContext(socektContext);
  return (
    <>
    {
      call?.isReceivedCall&&!callAccepted&&(
        <div style={{display:'flex',justifyContent:'center'}}>
          <h1>{call.name} is calling </h1>

          <Button variant='contained' color='primary' onClick={answerCall} >
            Answer
          </Button>
        </div>
      )
    }
    </>
  )
}

export default Notification