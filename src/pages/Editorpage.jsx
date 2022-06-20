import React, { useEffect, useRef, useState } from 'react'
import Styles from './Editorpage.module.css'
import Client from '../components/Client';
import Editor from '../components/Editor';
import {initSocket} from '../socket'
import toast from 'react-hot-toast';
import ACTIONS from '../Action';
import { useLocation ,useNavigate ,Navigate,useParams} from 'react-router-dom';


function Editorpage() {
  const [clients,setClients]=useState([]);

const socketRef=useRef(null);
const codeRef=useRef(null);
const location=useLocation();
const reactNavigator = useNavigate();
const {roomid}=useParams();




useEffect(()=>{
const init =async()=>{

socketRef.current=await initSocket();
socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
     
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }



socketRef.current.emit(ACTIONS.JOIN,{
    roomid,
   username:location.state?.username


});




//listen
socketRef.current.on(
  ACTIONS.JOINED,
  ({ clients, username, socketId }) => {
      if (username !== location.state?.username) {
          toast.success(`${username} joined the room.`);
  
      }
      setClients(clients);
      socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
      });
  }
);

//listening for disconnected

socketRef.current.on(ACTIONS.DISCONNECTED,({socketId,username})=>{
  toast.success(`${username} left the room.`);

   setClients((prev)=>{
     return prev.filter((client)=>client.socketId!==socketId);

   })

})




}

init();
return () => {
  socketRef.current.disconnect();
  socketRef.current.off(ACTIONS.JOINED);
  socketRef.current.off(ACTIONS.DISCONNECTED);
};

},[])









// if (!location.state) {
//   return <Navigate to="/" />;
// }

async function copyid(){
  try {
    await navigator.clipboard.writeText(roomid);
    toast.success('Room ID has been copied to your clipboard');
} catch (err) {
    toast.error('Could not copy the Room ID');

}

}

function leaveRoom() {
  reactNavigator('/');
}

  return (
<>

<div  className={`${Styles.mainWrapper}`} >
<div  className={`${Styles.leftside}`}>

<div className={`${Styles.leftsideinner}`}>

<div className={`${Styles.logo}`}>
<img src="/code-sync.png" alt=""style={{height:"80px",width:"150px"}} />
</div>

<h3>Connected</h3>



<div className={`${Styles.clientList}`}>
{

    clients.map((client)=>(
    <Client key={client.socketId} username={client.username}/>

    ))
}

</div>


</div>


<button className={`${Styles.editorButton}`} onClick={copyid} >
Copy ROOM ID

</button>
<button className={`${Styles.leavebtn}`} onClick={leaveRoom}>
Leave Room
</button>

</div>




<div  className={`${Styles.EditorWrapper}`}>


    <Editor socketRef={socketRef} roomid={roomid} 
    onCodeChange={(code)=>{

      codeRef.current=code;
    }}
    
    />
</div>



</div>




</>
  )
}

export default Editorpage