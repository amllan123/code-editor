import React from 'react'
import Avatar from 'react-avatar'
import Styles from './Client.module.css'


function Client({username}) {
  return (
<>

<div  className={`${Styles.client}`} >

    <Avatar name={username} size={50} round="14px" />

<span className={`${Styles.username}`} > {username}</span>


</div>
  
  </>
  )
}

export default Client