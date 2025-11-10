import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function Detail() {
  const { id } = useParams();
  const [ loading, setLoading ] = useState(true);
  const [ movie, setMovie ] = useState(null);

  const getMovie = async () => {
    try {
      const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      const json = await response.json();
      setMovie(json.data.movie);
      setLoading(false);
    } catch (err) {
      console.log('영화 정보를 불러오는 중 오류 발생, ', err)
    }
  }
  useEffect(() => {
    getMovie();
  }, [id]);   // id 값이 변할 때 마다.

  if(loading) {
    return <div className="detail-loading">영화 정보 불러오는 중 ...</div>
  }

  if(!movie) {
    return <div className="detail-error">해당 ID의 영화 정보를 찾을 수 없습니다.</div>
  }
  return (
    <div className="detail-container">
      <div
      className="detail-backdrop"
      style={{
        backgroundImage: `url(${movie.background_image_original})`,
      }}
      >
        <div className="detail-overlay">
          <div className="detail-content">
            <img className="detail-poster"
            src={movie.large_cover_image}
            alt={movie.title}
            />
            <div className="detail-info">
              <h1 className="detail-title">{movie.title}</h1>
              <p className="detail-meta">
                {movie.rating} 점 / ⌚ {movie.runtime} 분
              </p>
              <div className="detail-genres">
                {movie.genres.map(g => (
                  <span key={g} className="detail-genres">
                    {g}
                    </span>
                ))}
              </div>
              <p className="detail-description">{movie.description_full}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Detail