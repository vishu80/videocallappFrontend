import React,{createContext,useState,useRef,useEffect} from "react";
import {connect, io, Socket} from 'socket.io-client';
import Peer from 'simple-peer';

const socektContext=createContext();

const socket=io('http://localhost:3000');

const ContextProvider = ({children})=>{
    const [stream,SetStream]=useState()
    const [me,setMe]=useState();
    const [call,SetCall]=useState();
    const [callAccepted,SetCallAceepted]=useState(false);
    const [callEnded,SetCallEnded]=useState(false)
    const [name,setName]=useState();
    const myVideo=useRef();
    const userVideo=useRef();
    const connectionRef=useRef();
    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((currenStream)=>{
            SetStream(currenStream);
            myVideo.current.srcObject=currenStream;
        }) //THIS WILL USED TO GET THE MEDIAL PERMISSIONS FROM THE USER
        socket.on('me', (id)=>setMe(id));
        socket.on('calluser', ({signal,from,name:callerName})=>{
            console.log('call user',from)
            SetCall({signal,from,name:callerName})
        })
    },[])

    const answerCall=()=>{
        SetCallAceepted(true);
        const peer=new Peer({
            initiator:false,
            trickle:false,
            stream
        })
        peer.on('signal',(data)=>socket.emit('answercall',{signal:data,to:call.from}))
        peer.on('stream',(currenStream)=>{
            userVideo.current.srcObject = currenStream;
        })

        peer.signal(call.signal)
        connectionRef.current=peer;

    }

    const userToCall=(id)=>{

         const peer=new Peer({
            initiator:false,
            trickle:false,
            stream
        })
        peer.on('signal',(data)=>socket.emit('callUser',{userToCall:id,signalData:data,from:me,name}))
        peer.on('stream',(currenStream)=>{
            userVideo.current.srcObject = currenStream;
        })

        socket.on('callAccepted',(data)=>{
            SetCallAceepted(true)
            peer.signal(data);
        })

        connectionRef.current=peer

    }

    const leaveCall=()=>{
        SetCallEnded(true);
        connectionRef.current.destroye();
        window.location.reload();
    }

    return (
        <socektContext.Provider value={{stream,me,call,callAccepted,callEnded,name,setName,userToCall,answerCall,leaveCall,myVideo,userVideo}}>
            {children}
        </socektContext.Provider>
    )
}

export {ContextProvider,socektContext}