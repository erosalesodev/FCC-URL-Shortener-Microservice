require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortId = require('shortid');
const validUrl = require('valid-url');
app.use(bodyParser.urlencoded({
  extended:false,
}))

// Basic Configuration
const port = process.env.PORT || 3000;

const host = process.env.MONGO_URI;
mongoose.connect(host, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex:true})
          .then(
            console.log('Conected with Mongo Database Successfully')
          )
          .catch(error => handleError(error));




app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


//Creating Schema
const { Schema } = mongoose;

const urlSchema = new Schema({
    original_url: String,
    short_url: String,
  });

const URL = mongoose.model("URL",urlSchema)

//Create new URL
app.post('/api/shorturl',function(req,res){
  const url = req.body.url;
  const url_short = shortId.generate();
 

  //Check for a invalid URL
  if(!validUrl.isWebUri(url)){
    return res.json({
      error: 'invalid url'
    })
  }else{
    //Check if current url exit
    URL.findOne({
      original_url:url
    },(err,data)=>{
      if(err){
        return res.status(500).json('Server error');
      }else{
        //If already exist return its data esle create a new one
        if(data){
          return res.json({
            original_url: data.original_url,
            short_url: data.short_url,
          })
        }else{
          //Save new URL
          new_url = new URL({
            original_url: url,
            short_url: url_short,
          })

          new_url.save().then(data=>{
              return res.json({
                original_url: data.original_url,
                short_url: data.short_url,
              })
          })
          .catch(err=>{
            return res.status(500).json('Server error');
          })
        }
      }
        
    });
  }
});

//Get original url via shorturl
app.get('/api/shorturl/:short_url?',function(req,res){
      URL.findOne({
      short_url:req.params.short_url,
    },(err,data)=>{
      if(err){
        return res.status(500).json('Server error');
      }else{
        //If find a URL
        if(data){
          return res.redirect(data.original_url)
        }else{
          //If dont find the URL
          return res.status(404).json('No URL found' )
        }
      }
        
    });;
});
