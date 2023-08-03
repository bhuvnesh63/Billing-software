import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Admin/Sidebar/Sidebar';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import Sale from './components/Admin/Sale/Sale';
import Additem from './components/Admin/Add-Item/Additem';
import Billing from './components/Admin/Billing/Billing';
import Itemlist from './components/Admin/Add-Item/Itemlist';
import GstSale from './components/Admin/GstSale/GstSale';
import SaleList from './components/Admin/Sale/SaleList';
import CreateGst from './components/Admin/GstSale/AddAccount';
import AddAccount from './components/Admin/GstSale/AddAccount';
import AddAccountList from './components/Admin/GstSale/AddAccountList';
import GstSaleList from './components/Admin/GstSale/GstSaleList';
import EditItem from './components/Admin/Add-Item/EditItem';
import EditAccount from './components/Admin/GstSale/EditAccount';
import EditSale from './components/Admin/Sale/EditSale';


function App() {
  return (
    <div className="App">


      <Routes>

        <Route path='/' element={<Sidebar><Dashboard /></Sidebar>} />
        <Route path='/sale' element={<Sidebar><Sale /></Sidebar>} />
        <Route path='/salelist' element={<Sidebar><SaleList /></Sidebar>} />
        <Route path='/editsale/:id' element={<Sidebar><EditSale /></Sidebar>} />
        <Route path='/additem' element={<Sidebar><Additem /></Sidebar>} />
        <Route path='/edititem/:id' element={<Sidebar><EditItem /></Sidebar>} />
        <Route path='/itemlist' element={<Sidebar><Itemlist /></Sidebar>} />
        <Route path='/gstsale' element={<Sidebar><GstSale /></Sidebar>} />
        <Route path='/gstsale-list' element={<Sidebar><GstSaleList /></Sidebar>} />
        <Route path='/addaccount' element={<Sidebar><AddAccount /></Sidebar>} />
        <Route path='/editaccount/:id' element={<Sidebar><EditAccount /></Sidebar>} />
        <Route path='/addaccount-list' element={<Sidebar><AddAccountList /></Sidebar>} />

        <Route path='/billing' element={<Sidebar><Billing /></Sidebar>} />



      </Routes>

    </div>
  );
}

export default App;
