import './App.css';
import React from 'react';
// import request from 'superagent';
const axios = require('axios');

function App() {
  const [ images , setImages] = React.useState([])
  const [ details , setDetails] = React.useState([])

  React.useEffect(() =>{
   axios.get(`https://api.unsplash.com/search/photos?query=cars`, {
     headers:{
       'Accept-Version': 'v1',
       'Authorization':`Client-ID saultIHsKp5v-4TNAZxtaaL8hMNeNdHXy_xFtQvVCyk`
     }
   })
   .then(images =>{
    setImages(images.data)  
  })
  },[])
  console.log('images', images)

  React.useEffect(() =>{
    axios.get('https://api.overheid.io/voertuiggegevens/4TFL24', {
      headers: {
        'ovio-api-key': `bbf11093e9311172756976d59ca3704f6c661bf0eb38cb8e26ad664369c645f8`
      }
    })
    .then(details =>{
      setDetails(details.data)
    });
   },[])
   console.log('deatils', details)
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
