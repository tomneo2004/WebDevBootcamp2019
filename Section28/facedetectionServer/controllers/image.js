const Clarifai = require('clarifai');

// const app = new Clarifai.App({
//  apiKey: '125b100789d5484f9e096e481a38b4dd'
// });
const app = new Clarifai.App({
 apiKey: process.env.ClarifaiApiKey
});

const handleAPICall = (req, res)=>{

  const {input} = req.body;

  app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
  .then((response) => {

      return res.json(response);
  })
  .catch(error=>{
    console.log(err);
    return res.status(400).json('Unable to detect face');
  });
}

const handleImage = (req, res, db)=>{

	const {id} = req.body;

  db('users')
  .where({id:id})
  .increment('entries', 1)
  .returning('entries')
  .then(entries=>{

    console.log(entries);
    if(entries.length > 0)
      return res.json(entries[0]);
    else
      throw 'Increase entries fail'
  })
  .catch(err=>{
    return res.status(400).json(err);
  });

}

module.exports = {

	handleImage,
  handleAPICall
}