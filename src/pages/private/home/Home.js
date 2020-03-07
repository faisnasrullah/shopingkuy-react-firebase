import React from 'react';
import Button from '@material-ui/core/Button';
import { useFirebase } from '../../../components/FirebaseProvider';

const Home = () => {
  const { auth } = useFirebase();
  return (
    <>
      <h1>Halaman Home</h1>
      <Button
        onClick={e => {
          auth.signOut();
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default Home;
