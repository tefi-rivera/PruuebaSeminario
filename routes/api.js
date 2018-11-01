var express = require('express');
var router = express.Router();
var uuidGen = require('uuid/v4');

//REST
//post  -- ingresar
//get -- consultar
//delete -- borrar
//put -- modificar
let logs = [];

let contactos = {
"_id":"",
    "nombre":"",
    "apellido":"",
    "correo":"",
    "telefono":""
};
logs.push(
    Object.assign( {}, contactos, {
    _id: uuidGen(),
    nombre:"Estephany",
    apellido:"Rivera",
    correo:"tutephy@gmail.com",
    telefono:"99999999"
    })
);

logs.push(
    Object.assign( {}, contactos, {
    _id: uuidGen(),
    nombre:"Prueba2",
    apellido:"Prueba2",
    correo:"Prueba2",
    telefono:"99999999"
    })
);

router.get('/about', function( req, res, next ){
    console.log("Entro en About con metodo GET");
    res.json(
      {"version":"1.0", "name":"Service Log Manager API"}
    );
  }
 );


  

  router.get('/logs', function( req, res, next ){
    res.json(logs);
  }); // get /logs
  
  router.get('/logs/:_id', function( req, res, next ){
    var _id = req.params._id;
    res.json(logs[_id]);
  } );
  
  
  router.post('/logs/new', function( req, res, next) {
    var logsParams = req.body;
    var newItem = Object.assign({},
      contactos, {
        _id : uuidGen(),
        nombre:logsParams.nombre,
        apellido:logsParams.apellido,
        correo:logsParams.correo,
        telefono:logsParams.telefono
      }
      );
    logs.push(newItem);
    res.json(newItem);
  }); // post /logs/new
  
  router.put('/logs/update/:_id', function(req, res, next){
    var _id = req.params._id;
    var itemToSend = {};
    logs = logs.map(function( currentItem, index){
      if( currentItem.id === _id ){
        currentItem = Object.assign({}, currentItem, req.body);
        itemToSend = currentItem;
      }
      return currentItem;
    });
    itemToSend= logs[_id];

    res.json(itemToSend);
  }
  ); // update _id put
  
  router.delete('/logs/delete/:_id', function(req, res, next){
    var _id = req.params._id;
    res.json({"Conteo antes de borrar": logs.length });

    logs = logs.filter(function( currentItem, index){
      return currentItem._id !== _id;
    });
    res.json({"Conteo despues de borrar": logs.length });
    
  }
  ); // delete _id delete
  
  module.exports = router;