import React from 'react'
import {Button} from '@material-ui/core'
import firebase from 'firebase'

async function doSignOut() {
  await firebase.auth().signOut().then(function() {
       console.log("Sign-out successful")
      }).catch(function(error) {
        console.log("Sign-out error", error)
     });
}

export default function SignOutButton() {
  return <Button variant="contained" color="primary" onClick={() => doSignOut()}>Sign Out</Button>
}