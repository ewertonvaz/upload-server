import { Router } from "express";
import AWS from "aws-sdk";
//import bodyParser from "body-parser";

const s3 = new AWS.S3()
const app = express()

const S3Routes = new Router();
//app.use(bodyParser.json())

// curl -i https://some-app.cyclic.app/s3/myFile.txt
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


// curl -i -XPUT --data '{"k1":"value 1", "k2": "value 2"}' -H 'Content-type: application/json' https://some-app.cyclic.app/s3/myFile.txt
S3Routes.put('*', async (req,res) => {
  let filename = req.path.slice(1)

  console.log(typeof req.body)

  await s3.putObject({
    Body: JSON.stringify(req.body),
    Bucket: process.env.BUCKET,
    Key: filename,
  }).promise()

  res.set('Content-type', 'text/plain')
  res.send('ok').end()
})

// curl -i -XDELETE https://some-app.cyclic.app/s3/myFile.txt
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