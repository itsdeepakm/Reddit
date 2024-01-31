import  { useState, useEffect, useRef } from 'react';
import './Memes.css';
import { PhotoSwipe } from 'react-photoswipe-2';
import 'react-photoswipe-2/lib/photoswipe.css';

const Memes = () => {
  const [memes, setMemes] = useState([]);
  const [after, setAfter] = useState(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const [photoSwipeOpen, setPhotoSwipeOpen] = useState(false);
  const [photoSwipeIndex, setPhotoSwipeIndex] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`https://www.reddit.com/r/memes.json${after ? `?after=${after}` : ''}`);
      const data = await response.json();

      const newMemes = data.data.children.map(child => ({
        title: child.data.title,
        imageUrl: child.data.url,
      }));

      setMemes(prevMemes => [...prevMemes, ...newMemes]);
      setAfter(data.data.after);
    } catch (error) {
      console.error('Error fetching data from Reddit API:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container && container.scrollHeight - container.scrollTop === container.clientHeight && !loading) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [after]);

  const openPhotoSwipe = (index) => {
    setPhotoSwipeIndex(index);
    setPhotoSwipeOpen(true);
  };

  const closePhotoSwipe = () => {
    setPhotoSwipeOpen(false);
  };

  return (
    <div className="reddit-container">
      <div className="nav">
  <div className="nav-logo">
    <a aria-label="Home" href="/">
      <svg
        className="reddit-logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <g>
          <circle fill="#FF4500" cx={10} cy={10} r={10} />
          <path
            className="main-logo"
            fill="#FFF"
            d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"
          />
        </g>
      </svg>
      <svg
        className="reddit-name"
        viewBox="0 0 57 18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#1c1c1c">
          <path d="M54.63,16.52V7.68h1a1,1,0,0,0,1.09-1V6.65a1,1,0,0,0-.93-1.12H54.63V3.88a1.23,1.23,0,0,0-1.12-1.23,1.2,1.2,0,0,0-1.27,1.11V5.55h-1a1,1,0,0,0-1.09,1v.07a1,1,0,0,0,.93,1.12h1.13v8.81a1.19,1.19,0,0,0,1.19,1.19h0a1.19,1.19,0,0,0,1.25-1.12A.17.17,0,0,0,54.63,16.52Z" />
          <circle fill="#FF4500" cx="47.26" cy="3.44" r="2.12" />
          <path d="M48.44,7.81a1.19,1.19,0,1,0-2.38,0h0v8.71a1.19,1.19,0,0,0,2.38,0Z" />
          <path d="M30.84,1.19A1.19,1.19,0,0,0,29.65,0h0a1.19,1.19,0,0,0-1.19,1.19V6.51a4.11,4.11,0,0,0-3-1.21c-3.1,0-5.69,2.85-5.69,6.35S22.28,18,25.42,18a4.26,4.26,0,0,0,3.1-1.23,1.17,1.17,0,0,0,1.47.8,1.2,1.2,0,0,0,.85-1.05ZM25.41,15.64c-1.83,0-3.32-1.77-3.32-4s1.48-4,3.32-4,3.31,1.78,3.31,4-1.47,3.95-3.3,3.95Z" />
          <path d="M43.28,1.19A1.19,1.19,0,0,0,42.09,0h0a1.18,1.18,0,0,0-1.18,1.19h0V6.51a4.15,4.15,0,0,0-3-1.21c-3.1,0-5.69,2.85-5.69,6.35S34.72,18,37.86,18A4.26,4.26,0,0,0,41,16.77a1.17,1.17,0,0,0,1.47.8,1.19,1.19,0,0,0,.85-1.05ZM37.85,15.64c-1.83,0-3.31-1.77-3.31-4s1.47-4,3.31-4,3.31,1.78,3.31,4-1.47,3.95-3.3,3.95Z" />
          <path d="M17.27,12.44a1.49,1.49,0,0,0,1.59-1.38v-.15a4.81,4.81,0,0,0-.1-.85A5.83,5.83,0,0,0,13.25,5.3c-3.1,0-5.69,2.85-5.69,6.35S10.11,18,13.25,18a5.66,5.66,0,0,0,4.39-1.84,1.23,1.23,0,0,0-.08-1.74l-.11-.09a1.29,1.29,0,0,0-1.58.17,3.91,3.91,0,0,1-2.62,1.12A3.54,3.54,0,0,1,10,12.44h7.27Zm-4-4.76a3.41,3.41,0,0,1,3.09,2.64H10.14A3.41,3.41,0,0,1,13.24,7.68Z" />
          <path d="M7.68,6.53a1.19,1.19,0,0,0-1-1.18A4.56,4.56,0,0,0,2.39,6.91V6.75A1.2,1.2,0,0,0,0,6.75v9.77a1.23,1.23,0,0,0,1.12,1.24,1.19,1.19,0,0,0,1.26-1.1.66.66,0,0,0,0-.14v-5A3.62,3.62,0,0,1,5.81,7.7a4.87,4.87,0,0,1,.54,0h.24A1.18,1.18,0,0,0,7.68,6.53Z" />
        </g>
      </svg>
    </a>
  </div>
  <div className="nav-search">
    <svg
      htmlFor="reddit-search"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.59,13.91l2.78,2.69a1.25,1.25,0,1,1-1.74,1.8l-2.82-2.73a8,8,0,1,1,1.78-1.76ZM14.64,9.2A5.45,5.45,0,1,0,9.2,14.64,5.45,5.45,0,0,0,14.64,9.2Z" />
    </svg>
    <input placeholder="Search" id="reddit-search" />
  </div>
  <div className="nav-login-signup-profile">
    <button className="login">Log In</button>
    <button className="signup">Sign Up</button>
    <button className="profile">
      <svg
        viewBox="0 0 250 250"
        xmlns="http://www.w3.org/2000/svg"
        className="VIlSggfRUkuuHTKa_h8jp"
      >
        <g fill="inherit">
          <path d="M146.8 142.6h-37.6c-31.1 0-56.5 25.3-56.5 56.5 0 5.2 4.2 9.4 9.4 9.4h131.8c5.2 0 9.4-4.2 9.4-9.4 0-31.2-25.3-56.5-56.5-56.5zM128 130.7c20.1 0 36.4-16.3 36.4-36.4v-9.4c0-20.1-16.3-36.4-36.4-36.4S91.6 64.8 91.6 84.9v9.4c0 20.1 16.3 36.4 36.4 36.4z" />
        </g>
      </svg>
      <svg
        className="XHbKeEqnW58ib9mTN6jnS u_kypUXmB-k1A5TcC8MI9 _50RxI-5rW1xzwoC42vhzM"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.17,9.35,10,13.53,5.83,9.35a.5.5,0,0,1,.35-.85h7.64a.5.5,0,0,1,.35.85" />
      </svg>
    </button>
  </div>
</div>
      <div className="reddit-content" ref={containerRef}>
        <div className="memes-container">
          {memes.map((meme, index) => (
                       <div
                       key={index}
                       className="meme-item"
                       onClick={() => openPhotoSwipe(index)}
                     >
                       <h2 className="meme-title">{meme.title}</h2>
                       <img src={meme.imageUrl} alt={meme.title} className="meme-image" />
                       </div>
          ))}
        </div>
      </div>

      {photoSwipeOpen && (
        <PhotoSwipe
          isOpen={photoSwipeOpen}
          items={memes.map(meme => ({ src: meme.imageUrl, w: 0, h: 0 }))}
          options={{ index: photoSwipeIndex }}
          onClose={closePhotoSwipe}
        />
      )}
    </div>
  );
};

export default Memes;
