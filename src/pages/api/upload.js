import { IncomingForm } from 'formidable'
// import { promises as fs } from 'fs'
import { useState } from 'react';

var mv = require('mv');


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    
    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            let oldPath = files.file.filepath;
            let newPath = `./public/static/evidence/${files.file.originalFilename}`;
            mv(oldPath, newPath, function(err) {
            });
            res.status(200).json({ path: "testPath" })
        })

      })
      
      return data;
}