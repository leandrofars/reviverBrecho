const express = require("express");
const Routes = express.Router();
//Puxa as categorias existentes
Routes.route("/categories").get(function (req, res) {
  const https = require('https');
  https.get('https://api.smartpos.net.br/catalog/public/v1/categories/4eb908c6-07a9-4861-b0de-443370759008', (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
      data += chunk;
  });
  resp.on('end', () => {
      res.json(data)
      console.log("success");
  });
  }).on("error", (err) => {
  console.log("Error: " + err.message);
  });
});
//Requisita os produtos cadastrados naquela categoria
Routes.route("/categoria/:id/").get(function (req, res) {
  const https = require('https');
  https.get(`https://ms.smartpos.net.br/catalog/v1/loja/produtos/4eb908c6-07a9-4861-b0de-443370759008?label=&categoria=${req.params.id}&redirect=false&categoryName=Lingeries&pages=1&stock=ONLY_STOCK`, (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
      data += chunk;
  });
  resp.on('end', () => {
      res.json(data)
      console.log("success");
  });
  }).on("error", (err) => {
  console.log("Error: " + err.message);
  });
});

Routes.route("/categoria/:id/:page").get(function (req, res) {
  const https = require('https');
  https.get(`https://ms.smartpos.net.br/catalog/v1/loja/produtos/4eb908c6-07a9-4861-b0de-443370759008?label=&page=${req.params.page}&categoria=${req.params.id}&redirect=false&categoryName=Lingeries&pages=1&stock=ONLY_STOCK`, (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
      data += chunk;
  });
  resp.on('end', () => {
      res.json(data)
      console.log("success");
  });
  }).on("error", (err) => {
  console.log("Error: " + err.message);
  });
});

Routes.route("/imgs/:id").get(function (req, res) {
  const https = require('https');
  https.get(`https://ms.smartpos.net.br/photo-service/v1/list/?tenant_id=4eb908c6-07a9-4861-b0de-443370759008&id=${req.params.id}`, (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
      data += chunk;
  });
  resp.on('end', () => {
      res.json(data)
      console.log("success");
  });
  }).on("error", (err) => {
  console.log("Error: " + err.message);
  });
});

Routes.route("/busca/:search").get(function (req, res) {
  const https = require('https');
  https.get(`https://ms.smartpos.net.br/catalog/v1/loja/4eb908c6-07a9-4861-b0de-443370759008/produtos/busca?q=${req.params.search}&label=&page=1&categoria=0&redirect=false`, (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
      data += chunk;
  });
  resp.on('end', () => {
      res.json(data)
      console.log("success");
  });
  }).on("error", (err) => {
  console.log("Error: " + err.message);
  });
});

 
module.exports = Routes;