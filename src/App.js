// import logo from './logo.svg';
import './App.css';
import { useEffect , useRef, useState} from 'react';
// import axios from 'axios';
function App() {
  const searchData = useRef(null)
  const [searchText, setSearchText] = useState("mountains");
  const [imageData, setImageData] = useState([]);
  useEffect(() => {
    //methodkey cat/moutain/ sort per_page:40 format xml/json
    const params = {
      method: "flickr.photos.search",
      api_key: "6458e17e300b626cbd9fbc45869eac07",
      text: searchText,
      sort: "",
      per_page: 40,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }
    // farm id secret server
    const parameters = new URLSearchParams(params)
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    fetch(url).then((resp) => {
      console.log(resp.data);
      const arr = resp.data.photos.photo.map((imgData)=>{
       return fetchFlickrImageUrl(imgData, 'q')
      })
      setImageData(arr);
    }).catch((e) => { console.log(e)

    }).finally(()=>{

    })

    
  }, [searchText])
  // farm66 staticflickr.com/server/id_
  const fetchFlickrImageUrl = (photo, size) =>{
      let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
      if(size){
         url +=`-${size}`
      }
      url +='.jpg'
      return url
  }
  return (
    <>
     <input onChange={(e)=>{searchData.current = e.target.value} } value={searchData.current ? searchData.current:""}/>
      <button onClick={()=>{setSearchText(searchData.current)}}>Search</button>
      <section>
      <button onClick={()=>{setSearchText("mountains")}}>Mountains</button>
      <button onClick={()=>{setSearchText("beaches")}}>Beaches</button>
      <button onClick={()=>{setSearchText("birds")}}>Birds</button>
      <button onClick={()=>{setSearchText("food")}}>Food</button>
      </section>
      <section className="image-container">
          {imageData.map((imageurl, key)=>{
            return(
              <article className='flickr-image'>
                <img src={imageurl} key={key} />
                </article>
            )  
          })}
        
      </section>
    </>
  );
}

export default App;
