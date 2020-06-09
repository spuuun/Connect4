import { useState } from "react";
import Link from 'react-router-dom  '
import { Button, FormControlLabel, Typography, Checkbox, Container, TextField } from '@material-ui/core'
import firebaseAuth from 'firebase/auth'

const auth = firebaseAuth.auth();

export default function ResetPassword() {
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  // 0 = nothing's been attempted
  // 1 = success!
  // 2 = error/failure
  const [success, setSuccess] = useState(0)
  
  let message = null;

  if (success === 2) {
    message = "something went wrong. email not sent. please try again"
  } else if (success === 1) {
    message = "Success! Please check your email for password reset instructions"
  } else if (message === 0) {
    message = null
  }

/* ***************************************************************** */

  function handleFieldChange(e) {
    e.preventDefault
    setEmail(e.target.value)
  }

  function doResetPassword(userEmail) {

    auth.sendPasswordResetEmail(userEmail).then(function () {
      setIsLoading(true)
      setSuccess(1)
    }).catch(function (error) {
      setIsLoading(true)
      setSuccess(2)
      console.log(error)
    });
  }

  return (
    <>
      <div id='email-resetPassword-container' className='resetPassword'>
        <Typography component='h1' variant='h5'>Enter you email to reset your password</Typography>
        <form className='resetPassword-form'>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='resetPassword-email'
            label='email'
            name='email'
            value={email || ''}
            autoComplete='email'
            onChange={e => handleFieldChange(e)}
            type='email'
          // error={error.isEmailError}
          />
          <Button
            type='button'
            fullWidth
            variant='contained'
            color='secondary'
            onClick={() => doResetPassword(email)}
            disabled = {isLoading}
          >
            Submit
          </Button>
          { <Typography id='resetPassword-message'>{message}</Typography> }
          {success === 1 && <Link  to='/'>Return to Home Page?</Link>}
        </form>
      </div>
    </>
  )
}