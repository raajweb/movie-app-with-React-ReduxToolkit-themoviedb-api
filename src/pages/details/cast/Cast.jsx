import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";




import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
        responsive: [
          {
            breakpoint: 10000,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
              infinite: true,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
        ],
      };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div >
                         <Slider {...settings} className="listItems">
                            
                        {data?.map((item) => {
                            let imgUrl = item.profile_path
                                ? url.profile + item.profile_path
                                : avatar;
                            return (
                                <div key={item.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl} style={{borderRadius:"50%" }} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                        
                        </Slider>
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;