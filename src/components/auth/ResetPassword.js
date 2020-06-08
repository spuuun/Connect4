import { useState } from "react";
import { Button, FormControlLabel, Typography, Checkbox, Container, TextField } from '@material-ui/core'


// simple form for user to submit email address --- pings the firebase passwordReset function

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  return
  <>
    <Typography component='h1'>Enter your email to reset password</Typography>
    <Button>Submit</Button>
  </>


}