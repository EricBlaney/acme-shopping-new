// try{
//   require('./.env.js');
//   console.log(process.env.CLIENT_ID)
// }
// catch(ex){
//   console.log('running locally? create .env file');
//   console.log('deployed? set env variables');
// }
const app = require('./app');

const setUp = async()=> {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

setUp();
