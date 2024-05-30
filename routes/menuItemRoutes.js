const express = require('express');

const router = express.Router();

const MenuItem  = require("../models/MenuItem");

  router.post("/menu", async (req, res) => {
    try {
      const data = req.body;
      const newMenuItem = new MenuItem(data);
      const response = await newMenuItem.save();
      console.log("Menu Item saved");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.get('/menu', async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log("Menu Item data fetched");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get('/:taste', async(req,res) => {
    try{
      const taste = req.params.taste;                         // Extract the taste type from the URL parameter
      if (taste == 'spicy' || taste == 'sweet' || taste == 'sour'){
        const response = await MenuItem.find({taste: taste});
        console.log('response fetched') ;
        res.status(200).json(response) ;
      }else{
        res.status(404).json({error: 'Invalid taste type'}) ;
      }
    }catch(err){
      console.log(err);
      res.status( 500).json({error:'Internal Server Error'});
    }
  });

  module.exports = router;