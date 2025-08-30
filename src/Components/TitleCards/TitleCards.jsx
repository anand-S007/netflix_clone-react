import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'



const TitleCards = ({title, category}) => {
  const [apiData, setApiData] = useState([])
  const cardRef = useRef()

  // Fetching data from TMDB 
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDJjNWQwODllYzhiNjM2ZTIxMGU5Y2M4NmZkYmVhZCIsIm5iZiI6MTc1NjQ2NTEwOC4wNjcwMDAyLCJzdWIiOiI2OGIxODdkNGRhNjgwMWU5YTE5ZTEwNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9McEUMANrOa5PkWYEkivtqEHdN7z9yeBEXAl8aUqrvM'
    }
  };
  
  

  useEffect(() => {
    fetch( `https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    const element = cardRef.current;

    const isTouchpad = (event) => {
      return Math.abs(event.deltaY) < 15;
    };

    const handleWheel = (event) => {
      if (!isTouchpad(event)) { // apply only for mouse
        event.preventDefault();
        element.scrollLeft += event.deltaY;
      }
    };

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => element.removeEventListener("wheel", handleWheel);
  }, []);


  return (
    <div className='titleCards'>
      <h2 className='titleCards__heading'>{title? title:"Popular on Netflix"}</h2>
      <div className="titleCard__list" ref={cardRef}>
        {apiData.map((card) => {
          return (
            <div className="titleCards__card" key={card.id}>
              <img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt="Tumbnail image" className='titleCards__card-img' />
              <p className='titleCards__card-name'>{card.original_title}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards
