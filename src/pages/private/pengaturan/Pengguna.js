import React, { useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useFirebase } from '../../../components/FirebaseProvider';
import { useSnackbar } from 'notistack';
import isEmail from 'validator/lib/isEmail';
import useStyles from './StylePengaturan';

const Pengguna = () => {
  const clasess = useStyles();
  const displayNameRef = useRef();
  const emailRef = useRef();
  const { user } = useFirebase();
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState({ displayName: '', email: '' });
  const [isSubmitting, setSubmitting] = useState(false);

  const saveDisplayName = async (e) => {
    const displayName = displayNameRef.current.value;
    console.log(displayName);

    if (!displayName) {
      setError({ displayName: 'Nama Pengguna Harus Di Isi.' });
    } else if (displayName !== user.displayName) {
      setError({ displayName: '' });
      setSubmitting(true);

      await user.updateProfile({
        displayName,
      });

      setSubmitting(false);
      enqueueSnackbar('Nama Pengguna Berhasil Diperbarui', {
        variant: 'success',
      });
    }
  };

  const updateEmail = async (e) => {
    const email = emailRef.current.value;

    if (!email) {
      setError({ email: 'Email Pengguna Harus Di Isi.' });
    } else if (!isEmail(email)) {
      setError({ email: 'Email Tidak Valid.' });
    } else if (email !== user.email) {
      setError({ email: '' });
      setSubmitting(true);

      try {
        await user.updateEmail(email);
        enqueueSnackbar('Email Pengguna Berhasil Diperbarui', {
          variant: 'success',
        });
      } catch (error) {
        let emailError = '';

        switch (error.code) {
          case 'auth/invalid-email':
            emailError = 'Email Tidak Valid';
            break;

          case 'auth/email-already-in-use':
            emailError = 'Email Sudah Digunakan Oleh Pengguna Lain.';
            break;

          case 'auth/requires-recent-login':
            emailError =
              'Silahkan Logout, Kemudian Login Kembali Untuk Memperbarui Email.';
            break;

          default:
            emailError = 'Terjadi Kesalahan, Silahkan Coba Lagi.';
            break;
        }

        setError({ email: emailError });
      }

      setSubmitting(false);
    }
  };

  return (
    <div className={clasess.pengaturanPengguna}>
      <TextField
        id='displayName'
        name='displayName'
        label='Nama'
        margin='normal'
        defaultValue={user.displayName}
        inputProps={{ ref: displayNameRef, onBlur: saveDisplayName }}
        disabled={isSubmitting}
        helperText={error.displayName}
        error={error.displayName ? true : false}
      />
      <TextField
        id='email'
        name='email'
        label='Email'
        margin='normal'
        defaultValue={user.email}
        inputProps={{ ref: emailRef, onBlur: updateEmail }}
        disabled={isSubmitting}
        helperText={error.email}
        error={error.email ? true : false}
      />
    </div>
  );
};

export default Pengguna;
