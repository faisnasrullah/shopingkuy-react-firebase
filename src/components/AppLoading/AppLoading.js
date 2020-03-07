import React from 'react';

import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import useStyles from './Style';

const AppLoading = () => {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.loadingBox}>
        <Typography varian='h6' component='h2' className={classes.title}>
          Aplikasi Penjualan
        </Typography>
        <LinearProgress />
      </div>
    </Container>
  );
};

export default AppLoading;
