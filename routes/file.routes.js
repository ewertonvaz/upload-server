import express from "express";
import formidable from "formidable";
import fs from "fs";
import path from "path";

const fileRoutes = express.Router();

fileRoutes.put('/upload', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        //console.dir(req.headers);
        //console.log(fields);
        //console.log(files);

        const extension = files.file.originalFilename.split('.');
        const newName = files.file.newFilename + "." + extension[ extension.length - 1 ];
        const oldpath = files.file.filepath;
        const newpath = path.join('./uploaded/', newName);
        
        fs.renameSync(oldpath, newpath);
        res.status(201).json({ filename: newName });
    });
});

fileRoutes.get('/download/:fileName', (req, res) => {
    const { fileName } = req.params;
    try {
        const file = path.resolve("./") + `/uploaded/${fileName}`;
        console.log(file);
        res.sendFile(file);
    } catch (e) {
        console.log(e);
        return res.status(500).json("Não foi possíve fazer o download este arquivo!");
    }
});

export default fileRoutes;