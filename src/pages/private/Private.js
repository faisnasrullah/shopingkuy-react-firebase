import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Pengaturan from './pengaturan/Pengaturan';
import Produk from './produk/Produk';
import Transaksi from './transaksi/Transaksi';
import Home from './home/Home';

const Private = () => {
  return (
    <Switch>
      <Route path='/pengaturan' component={Pengaturan} />
      <Route path='/produk' component={Produk} />
      <Route path='/transaksi' component={Transaksi} />
      <Route component={Home} />
    </Switch>
  );
};

export default Private;
