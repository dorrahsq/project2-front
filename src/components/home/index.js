import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Fade } from "react-awesome-reveal";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import firstImage from "./../../imges/first-image.jpeg";
import firstCarouselImage from "./../../imges/first-carousel-image.jpeg";

const BASE_URL = "http://localhost:5500";

const Home = () => {
  let navigate = useNavigate();
  const [moreLikesPost, setMoreLikesPost] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [onePost, setOnePost] = useState();

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line
  }, []);

  const getAllPosts = async () => {
    const allPosts = await axios.get(`${BASE_URL}/posts/`);
    setAllPosts(allPosts.data);
    const onePost = allPosts.data.find((ele) => {
      // eslint-disable-next-line
      return ele._id == "61a1d58d1beb96e90894030e";
    });
    setOnePost(onePost);
    getMoreLikesPost();
  };

  const getMoreLikesPost = async () => {
    const post = await axios.get(`${BASE_URL}/posts/hash?hashtags=pink`);
    setMoreLikesPost(post.data);
  };

  const goExplore = () => {
    navigate(`/posts`);
  };

  const goInside = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className="home">
      <div className="center">
        <div className="home-header-container">
          <div className="home-text-container">
            <div> The best free stock photos </div>
            <div> Shared by creators </div>
            <div>
              <button className="explore-btn" onClick={goExplore}>
                Explore Now
              </button>
            </div>
          </div>
          {allPosts && (
            <div className="carousel-container">
              <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={2000}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                dynamicHeight={false}
                showArrows={false}
              >
                {allPosts.map((ele) => {
                  return (
                    <div key={ele._id}>
                      <img alt="img" className="carousel-img" src={ele.img} />
                    </div>
                  );
                })}
                <div>
                  <img alt="img" className="carousel-img" src={firstImage} />
                </div>
                <div>
                  <img
                    alt="img"
                    className="carousel-img"
                    src={firstCarouselImage}
                  />
                </div>
              </Carousel>
              <div className="background-line"></div>
            </div>
          )}
        </div>
      </div>

      {moreLikesPost ? (
        <div className="winner-container">
          <div>
            <Fade>
              <div className="d-flex align-items-center">
                <div className="line"></div>
                <div className="winner-post-header ms-3">
                  <i>
                    Winner posts in this week
                    <span className="hashtag"> #PINK</span>
                  </i>
                </div>
              </div>
            </Fade>
          </div>
          <Fade>
            <div className="gray-background d-flex align-items-center">
              <div>
                <span> Most liked photo </span>
                <span className="description">
                  We selected this post based on the most likes according to the
                  hashtag of the week, which is #pink. Moreover, the win doesn't
                  have any evaluation, just the highest likes. There will be a
                  new hashtag weekly, so be here and get excited!
                </span>
              </div>
              <div className="img-container right">
                <img
                  alt="img"
                  src={moreLikesPost.img}
                  onClick={() => {
                    goInside(moreLikesPost._id);
                  }}
                />
              </div>
            </div>
          </Fade>
          {onePost && (
            <Fade>
              <div className="gray-background right-side d-flex align-items-center">
                <div>
                  <span> Professional choice </span>
                  <span className="description">
                    green is restful and calming, while pink is soft and dreamy,
                    This combination has become incredibly great, These colors
                    are complementary, sitting opposite each other on the wheel,
                    therefore the high contrast creates a vibrant look. Green is
                    also bringing a sense of visual balance and, as a result, a
                    soothing and relaxing influence.
                  </span>
                </div>
                <div className="img-container left">
                  <img
                    alt="img"
                    src={onePost.img}
                    onClick={() => {
                      goInside(onePost._id);
                    }}
                  />
                </div>
              </div>
            </Fade>
          )}
        </div>
      ) : (
        <h1>loading ...</h1>
      )}
    </div>
  );
};
export default Home;
