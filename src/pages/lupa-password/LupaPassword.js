import React, { useState } from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import useStyles from './Style';

import { Redirect } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import { useFirebase } from '../../components/FirebaseProvider';
import AppLoading from '../../components/AppLoading/AppLoading';
import { useSnackbar } from 'notistack';

const LupaPassword = () => {
  const classes = useStyles();
  const { auth, user, loading } = useFirebase();
  const { enqueueSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    email: ''
  });

  const [error, setError] = useState({
    email: ''
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const validate = () => {
    const newError = { ...error };

    if (!form.email) {
      newError.email = 'Email Wajib Di Isi';
    } else if (!isEmail(form.email)) {
      newError.email = 'Email Tidak Valid';
    }

    return newError;
  };

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError({
      ...error,
      [e.target.name]: ''
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const findErrors = validate();
    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors);
    } else {
      try {
        setSubmitting(true);
        const actionCodeSetting = { url: `${window.location.origin}/login` };
        await auth.sendPasswordResetEmail(form.email, actionCodeSetting);
        enqueueSnackbar(
          `Cek kotak masuk email: ${form.email}, sebuah tautan untuk me-reset password telah dikirim.`,
          { variant: 'success' }
        );
        setSubmitting(false);
      } catch (error) {
        const newError = {};
        switch (error.code) {
          case 'auth/user-not-found':
            newError.email = error.message;
            break;
          case 'auth/invalid-email':
            newError.email = error.message;
            break;
          default:
            newError.email = 'Terjadi Kesalahan, Silahkan Coba Lagi';
            break;
        }
        setSubmitting(false);
        setError(newError);
      }
    }
  };

  if (loading) {
    return <AppLoading />;
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <Container maxWidth='xs'>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant='h5' component='h1'>
          Lupa Password
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Alamat Email'
            margin='normal'
            fullWidth
            required
            value={form.email}
            onChange={handleChange}
            helperText={error.email}
            error={error.email ? true : false}
            disabled={isSubmitting}
          />
          <Grid container className={classes.buttons}>
            <Grid item xs>
              <Button
                type='submit'
                color='primary'
                size='large'
                variant='contained'
                disabled={isSubmitting}
              >
                Kirim
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default LupaPassword;
