import { useEffect, useState } from 'react';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import styles from './Player.module.css'
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  // State hooks
  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)


  // Api key
  const apiKey = import.meta.env.VITE_APP_TMDB_API_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey} `
    }
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);

        if (!response.ok) {
          throw new Error('Failed to fetch video data.');
        }

        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setApiData(data.results[0])
        } else {
          throw new Error('No video available for this movie.');
        }

      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVideoData()
  }, [id])

  // Loading state
  if (loading) {
    return (
      <div className={styles['player__loading']}>
        <span className={styles["loader"]}></span>
      </div>
    );

  }

  // Error state
  if (error) {
    return <div className={styles['player__error']}>Error: {error}</div>;
  }

  return (
    <div className={styles['player']}>
      <img src={back_arrow_icon} className={styles['player__backBtn']} alt="Back arrow icon" onClick={() => {navigate(-1)}} />
      <iframe className={styles['player_video']}
        width="90%" height="90%"
        src={`https://youtube.com/embed/${apiData.key}`}
        title='Trailer' frameborder="0" allowFullScreen>
      </iframe>
      <div className="player__info">
        <p>{apiData.published_at.slice(0, 10) || 'N/A'}</p>
        <p>{apiData.name || 'Unknown'}</p>
        <p>{apiData.typeOf || 'Unknown'}</p>
      </div>
    </div>
  )
}

export default Player
