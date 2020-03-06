import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EditProduk from './EditProduk';
import AllProduk from './AllProduk';

const Produk = () => {
  return (
    <Switch>
      <Route path='/produk/edit/:idProduk' component={EditProduk} />
      <Route component={AllProduk} />
    </Switch>
  );
};

export default Produk;
