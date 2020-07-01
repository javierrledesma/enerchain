var obtenerJSON=function  () {
return new Promise(function(resolve,reject){
var json ={lecturas:[]}
var valor=0
var fecha = Date.now()
var fechaMenos = fecha - 82800000
const fs = require('fs');
 
  for (let index = 0; index < 24; index++) {
    if(index<12){
        valor=Math.floor(Math.random() * 100) + 80 
        json.lecturas.push({lectura:valor, date:fechaMenos})
    }
    else{
       valor= Math.floor(Math.random() * 70) + 10 
       json.lecturas.push({lectura:valor, date:fechaMenos})
    }
    fechaMenos = fechaMenos + 3600000
  }
    fs.writeFile('lecturaPorHoras.json', JSON.stringify(json),'utf8', (err) => {
        if (err){
            throw err;
            reject({})
            } 
        console.log('The file has been saved!');
        resolve(json) 
    });
  })
}
module.exports = { obtenerJSON };