const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const csv = require("csvtojson");
const user = require("./model.js");
mongoose.connect("mongodb://localhost/jsontocsv",(err,data)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log("database connected")
  }
});

const file = path.join(__dirname, "csvfile.csv");
  csv()
    .fromFile(file)
    .subscribe(json => {
      return new Promise((resolve, reject) => {
        let { sno, name, description } = json;
        user.create(
          {
            name,
            description
          },
          (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
    })
    .then(() => {
     console.log("saved")
    })
    .catch(err => {
      throw err;
    });

app.listen(5000);
module.exports = app;
