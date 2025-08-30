import React, { useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'



const TitleCards = ({title, categories}) => {
  const cardRef = useRef()
  // Changess
  useEffect(() => {
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
        {cards_data.map((card) => {
          return (
            <div className="titleCards__card" key={card.id}>
              <img src={card.image} alt="Tumbnail image" className='titleCards__card-img' />
              <p className='titleCards__card-name'>{card.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards
