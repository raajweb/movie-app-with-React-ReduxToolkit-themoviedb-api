import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { GiClamp } from "react-icons/gi";
import Slider from "react-slick";
import { PlayIcon } from "../../details/Playbtn";
import dayjs from "dayjs";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";






const HeroSlider = () => {
    const { url } = useSelector((state) => state.home);

    const { data, loading } = useFetch("/movie/upcoming");
    const _genres = data?.genres?.map((g) => g.id);


    const [bannerData, setBannerData] = useState(data?.results)
    console.log('banner data', data?.results)


    const settings = {
        dots: false,
        speed: 3000,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton" ></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };
    return (
        <> <div className="banner-cover" >{!loading ? (
            <div>
                <Slider {...settings}>
                    {data?.results?.map((item, index) => {
                        return (<div key={index}>
                            <div>
                                <div style={{
                                    margin: " 0 auto", position: "relative", top: "0px",
                                 objectFit: "cover", width: " 100%", backgroundImage: 'url(' + url?.backdrop + item.backdrop_path + ')', backgroundSize: 'cover',overflow:"hidden"
                                }} className="d-flex justify-content-center align-items-center img-cover"> <div className="container  text-bg  z-10 relative" style={{zIndex:"99999"}} >
                                        <div className="row">
                                            <div className="col-md-3 d-flex justify-content-center align-items-center p-4 d-none d-md-block d-lg-block"> <div className="row">
                                                <div className="videoThumbnail">
                                                    {!item?.poster_path ? (<p>loading</p> ) :
                                                    
                                                    (

                                                        <img
                                                        src={url?.backdrop + item?.poster_path} className="img-fluid"
                                                    />
                                                    )}
                                                   

                                                </div>
                                                
                                            </div></div>
                                            <div className="col-md-9 mt-md-3 mt-lg-3">
                                                <h1 className="big-title">{item.original_title}</h1>
                                                <p className="desc">{item.overview}</p>
                                                <div className="d-flex">

                                                <CircleRating
                                                    rating={item.vote_average.toFixed(
                                                        1
                                                    )}
                                                />
                                                <div
                                                    className="playbtn ms-4"
                                                    onClick={() => {
                                                        setShow(true);
                                                        setVideoId(video.key);
                                                    }}
                                                >
                                                    <PlayIcon />
                                                    <span className="text">
                                                        Watch Trailer
                                                    </span>
                                                </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div></div>

                            </div>

                            <div className="opacity-layer"></div>


                        </div>)
                    })

                    }
                </Slider>

            </div>
        ) : (
            <div style={{ width: "100%", display: "flex", justifyContent: "center", height: "500px", alignItems: "center", color: "white" }}><p>Loding....</p></div>
        )}
        </div>
        </>
    )
}

export default HeroSlider