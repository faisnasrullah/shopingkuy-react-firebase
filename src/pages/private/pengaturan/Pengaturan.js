import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Pengguna from './Pengguna';
import Toko from './Toko';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import useStyles from './StylePengaturan';

const Pengaturan = props => {
  const { location, history } = props;
  const clasess = useStyles();

  const handleChangeTab = (e, value) => {
    history.push(value);
  };

  return (
    <Paper square>
      <Tabs
        value={location.pathname}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleChangeTab}
      >
        <Tab label='Pengguna' value='/pengaturan/pengguna' />
        <Tab label='Toko' value='/pengaturan/toko' />
      </Tabs>

      <div className={clasess.tabContent}>
        <Switch>
          <Route path='/pengaturan/pengguna' component={Pengguna} />
          <Route path='/pengaturan/toko' component={Toko} />
          <Redirect to='/pengaturan/pengguna' />
        </Switch>
      </div>
    </Paper>
  );
};

export default Pengaturan;
