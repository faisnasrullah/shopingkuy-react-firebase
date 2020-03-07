import React, { useState } from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import useStyles from './Style';

import { Link, Redirect } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import { useFirebase } from '../../components/FirebaseProvider';
import AppLoading from '../../components/AppLoading/AppLoading';

const Registrasi = () => {
  const classes = useStyles();
  const { auth, user, loading } = useFirebase();

  const [form, setForm] = useState({
    email: '',
    password: '',
    ulangi_password: ''
  });

  const [error, setError] = useState({
    email: '',
    password: '',
    ulangi_password: ''
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const validate = () => {
    const newError = { ...error };

    if (!form.email) {
      newError.email = 'Email Wajib Di Isi';
    } else if (!isEmail(form.email)) {
      newError.email = 'Email Tidak Valid';
    }

    if (!form.password) {
      newError.password = 'Password Wajib Di Isi';
    }

    if (!form.ulangi_password) {
      newError.ulangi_password = 'Ulangi Password Wajib Di Isi';
    } else if (form.ulangi_password !== form.password) {
      newError.ulangi_password = 'Password Tidak Cocok';
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
        await auth.createUserWithEmailAndPassword(form.email, form.password);
      } catch (error) {
        const newError = {};
        switch (error.code) {
          case 'auth/email-already-in-use':
            newError.email = error.message;
            break;
          case 'auth/invalid-email':
            newError.email = error.message;
            break;
          case 'auth/weak-password':
            newError.password = error.message;
            break;
          case 'auth/operation-not-allowed':
            newError.password = error.message;
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
          Buat Akun Baru
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
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            margin='normal'
            fullWidth
            required
            value={form.password}
            onChange={handleChange}
            helperText={error.password}
            error={error.password ? true : false}
            disabled={isSubmitting}
          />
          <TextField
            id='ulangi_password'
            name='ulangi_password'
            type='password'
            label='Ulangi Password'
            margin='normal'
            fullWidth
            required
            value={form.ulangi_password}
            onChange={handleChange}
            helperText={error.ulangi_password}
            error={error.ulangi_password ? true : false}
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
                Daftar
              </Button>
            </Grid>
            <Grid item>
              <Button
                size='large'
                variant='contained'
                component={Link}
                to='/login'
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Registrasi;
