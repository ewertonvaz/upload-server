import { Router } from "express";
import AWS from "aws-sdk";
import formidable from "formidable";
import fs from "fs";

const s3 = new AWS.S3()
const S3Routes = new Router();
//app.use(bodyParser.json())

// curl -i https://ecv-upload-server.cyclic.app/s3/myFile.txt
S3Routes.get('*', async (req,res) => {
  let filename = req.path.slice(1)

  try {
    let s3File = await s3.getObject({
      Bucket: process.env.BUCKET,
      Key: filename,
    }).promise()

    res.set('Content-type', s3File.ContentType)
    res.send(s3File.Body.toString()).end()
  } catch (error) {
    if (error.code === 'NoSuchKey') {
      console.log(`No such key ${filename}`)
      res.sendStatus(404).end()
    } else {
      console.log(error)
      res.sendStatus(500).end()
    }
  }
})


// curl -i -XPUT --data '{"k1":"value 1", "k2": "value 2"}' -H 'Content-type: application/json' https://ecv-upload-server.cyclic.app/s3/myFile.txt
S3Routes.put('*', async (req,res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    const extension = files.file.originalFilename.split('.');
    const filename = files.file.newFilename + "." + extension[ extension.length - 1 ];
    console.log(filename);

    await s3.putObject({
    //await s3.upload({
      Body: fs.readFileSync(files.file.filepath),
      Bucket: process.env.BUCKET,
      Key: filename,
    }).promise()

    res.set('Content-type', 'text/plain')
    res.send('ok').end();
  });
})

// curl -i -XDELETE https://ecv-upload-server.cyclic.app/s3/myFile.txt
S3Routes.delete('*', async (req,res) => {
  let filename = req.path.slice(1)

  await s3.deleteObject({
    Bucket: process.env.BUCKET,
    Key: filename,
  }).promise()

  res.set('Content-type', 'text/plain')
  res.send('ok').end()
})

// /////////////////////////////////////////////////////////////////////////////
// Catch all handler for all other request.
S3Routes.use('*', (req,res) => {
  res.sendStatus(404).end()
})

export default S3Routes;