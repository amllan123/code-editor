import React, { useState } from 'react'
import Styles from './Home.module.css'
import {v4 as uuidv4} from 'uuid';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
function Home() {


  const [roomid,setroomid]=useState('');
  const [username,setusername]=useState('');
  const navigate=useNavigate();

  const createNewRoom =(e) =>{
   e.preventDefault();
   const id=uuidv4();

   setroomid(id);
   toast.success('created a new room');


  }

  function joinRoom(){
  if(!roomid || !username){
    toast.error('ROOM ID & USERNAME is Required')
    return;
}
navigate(`/editor/${roomid}`, {

  state:{

    username,
  }
})


}



//

function handleInputEnter(e){

//console.log('event',e.code);
if(e.code === 'Enter'){

joinRoom();

}

}
  return (
    <>
    <div className={`${Styles.homeWrapper}`}>
       <div className={`${Styles.formWrapper}`}>

        <img src="/code-sync.png" alt=""style={{height:"80px",width:"150px"}} />
        <h4 className={`${Styles.labeltext}`}>Paste Invitation ROOM ID</h4>
          


          <div className={`${Styles.inputgroup}`}>
             <input type="text" className={`${Styles.inputbox}`} placeholder=" ROOM ID" value={roomid}  onChange={(e)=>setroomid(e.target.value)} onKeyUp={handleInputEnter} />
             <input type="text" className={`${Styles.inputbox}`} placeholder=" USERNAME"  value={username}  onChange={(e)=>setusername(e.target.value)}  onKeyUp={handleInputEnter}  />


            <button onClick={joinRoom} className={`${Styles.inputbutton}`}>Join</button>

            <span className={`${Styles.createInfo}`} >

              If you dont have an invite then create . 
              <a   onClick={createNewRoom}   className={`${Styles.createNew}`}   href=""> New room</a>
      
            </span>

              <span className={`${Styles.myinfo}`}>Made with ❤️ by Amllan</span>   
          </div>
         
       </div>

       
       
    </div>
    

    
    
    
    
    </>
  )
}

export default Home