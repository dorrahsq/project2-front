import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Fade } from "react-awesome-reveal";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const BASE_URL = "https://project2back.herokuapp.com";

const Home = () => {
  let navigate = useNavigate();
  const [posts, setPost] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  // eslint-disable-next-line
  const [maxx, setMaxx] = useState();
  // eslint-disable-next-line
  const [moreLikesPostt, setMoreLikesPostt] = useState("");
  const [onePost, setOnePost] = useState();
  useEffect(() => {
    getAllPosts();
    getAllPostss();
    // eslint-disable-next-line
  }, []);

  const getAllPostss = async () => {
    const postss = await axios.get(`${BASE_URL}/posts/`);
    setAllPosts(postss.data);
    const onePost = postss.data.find((ele) => {
      // eslint-disable-next-line
      return ele._id == "61a1d58d1beb96e90894030e";
    });
    setOnePost(onePost);
  };

  const getAllPosts = async () => {
    const posts = await axios.get(`${BASE_URL}/posts/hash?hashtags=pink`);
// eslint-disable-next-line
    posts.data.map((ele) => {
      countLike(ele);
    });
  };

  let max = 0;

  let moreLikesPost;
  const countLike = async (ele) => {
    const likesCount = await axios.get(
      `${BASE_URL}/likes/count?onPost=${ele._id}`
    );
    if (likesCount.data > max) {
      max = likesCount.data;
      moreLikesPost = ele._id;
      setMaxx(max);
      setMoreLikesPostt(moreLikesPost);
      setPost(ele);
    }
  };
  const goExplore = () => {
    navigate(`/posts`);
  };
  const goInside = (id) => {
    navigate(`/posts/${id}`);
  };
  return (
    <div className="home">
      {allPosts ? (
        <div className="anim">
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
                  <img alt="img" className="bgDivImg" src={ele.img} />
                </div>
              );
            })}
            <div>
              <img alt="img"
                className="bgDivImg"
                src="https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              />
            </div>
            <div>
              <img alt="img"
                className="bgDivImg"
                src="https://images.pexels.com/photos/9373483/pexels-photo-9373483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              />
            </div>
          </Carousel>
        </div>
      ) : (
        console.log("f")
      )}
      <div className="homeText">
        <div className="main"> The best free stock photos </div>
        <span className="shared"> Shared by creators </span>
        <div className="exploreDiv">
          <button onClick={goExplore}> Explore Now </button>{" "}
        </div>
      </div>

      {/* <div className="bgDiv">
        {" "}
        <img className="bgDivImg" src="https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
      </div> */}
      <div className="lineInBack"></div>
      {posts ? (
        <>
          <div className="line"></div>
          <Fade>
            <div className="winner">
              <i>
                Winner posts in this week <span className="hash"> #PINK</span>
              </i>
            </div>
          </Fade>
          {/* <Fade> */}

          <div className="bg">
            <span className="whySpan"> Most liked photo </span>
            <Fade>
              <span className="why">
                We selected this post based on the most likes according to the
                hashtag of the week, which is #pink. Moreover, the win doesn't
                have any evaluation, just the highest likes. There will be a new
                hashtag weekly, so be here and get excited!
              </span>
            </Fade>
          </div>
          <Fade>
            <div className="imgContener">
              <img alt="img"
                src={posts.img}
                onClick={() => {
                  goInside(posts._id);
                }}
              />
            </div>
          </Fade>

          {onePost && (
            <>
              <div className="bg2">
                <span className="whySpan2"> Professional choice </span>
                <Fade>
                  <span className="why2">
                    green is restful and calming, while pink is soft and dreamy,
                    This combination has become incredibly great, These colors
                    are complementary, sitting opposite each other on the wheel,
                    therefore the high contrast creates a vibrant look. Green is
                    also bringing a sense of visual balance and, as a result, a
                    soothing and relaxing influence.
                  </span>
                </Fade>
              </div>
              <Fade>
                <div className="imgContener2">
                  <img alt="img"
                    src={onePost.img}
                    onClick={() => {
                      goInside(onePost._id);
                    }}
                  />
                </div>
              </Fade>
            </>
          )}
        </>
      ) : (
        <h1>loading ...</h1>
      )}
    </div>
  );
};

export default Home;
