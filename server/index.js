const express = require('express');
const app = express();
const HOME_DIR = '/home/harjeevan/Downloads'

app.get('/readHomeDir', function(req, res){
    try {
          // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        const fs = require('fs')
        const moment = require('moment'); // require       
        const files = fs.readdirSync(HOME_DIR)
        let returnFiles = []
        let yesterdayDate   =  moment().subtract(1, 'days').format("YYYY-MM-DD").toString()
        let todayDate       =  moment().format("YYYY-MM-DD").toString()
        let count           = 1; 
        for (const file of files) {
            
          const allMeta = fs.statSync(HOME_DIR+'/'+file)
          let modifyDate = moment(allMeta.mtime).format("YYYY-MM-DD").toString()
          let createdDate = moment(allMeta.birthtime).format("YYYY-MM-DD").toString()
          if( ( ( modifyDate === yesterdayDate ) || ( modifyDate === todayDate ) ) && ( allMeta.isFile() == true ) ){

              let fileObj = {
                  id:count,
                  name:file,
                  createdDate,
                  allMeta
                }
                returnFiles.push(fileObj);
                count++
            }
        }
    
        return res.status(200).json({  status: true, returnFiles });
    
      } catch (err) {
        return res.status(200).json({  status: true, err });
      }
 });

app.listen(4000);