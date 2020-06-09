import { useState } from "react";
import { Button, FormControlLabel, Typography, Checkbox, Container, TextField } from '@material-ui/core'


// simple form for user to submit email address --- pings the firebase passwordReset function

export default function ResetPassword() {
  const [email, setEmail] = useState(null);

  function handleFieldChange(e) {
    e.preventDefault
    setEmail(e.target.value)
  }

  async function doResetPassword() {

  }

  return (
    <>
      <div id='email-resetPassword-container' className='resetPassword'>
        <Typography component='h1' variant='h5'>Enter you email to reset your password</Typography>
        <form className='resetPassword-form'>
          {/* {(error.isEmailError || error.isPasswordError) && <Typography id='login-error-message'>{error.errorMessage}</Typography>} */}
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
              onClick={() => doResetPassword()}
            >
              submit
                    </Button>
        </form>
      </div>

    </>
  )
}