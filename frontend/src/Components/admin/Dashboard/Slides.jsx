import slide1 from "../../Image/slide1.jpg";
import slide2 from "../../Image/slide2.jpg";
import slide3 from "../../Image/slide3.jpg";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";

export default function Slides() {
    const [slides, setSlides] = useState([
        {
            image: slide1, title: "Title jkhdfs sdhf 1", subTitle: " Lorem ipsum dolor sit amet consectetur adipisicing elit."
        },
        { image: slide2, title: "Title 2", subTitle: "Sub Title 2" },
        { image: slide3, title: "Title 3", subTitle: "Sub Title 3" },
    ]);
    const dataSlides = () => {

        return (
            slides.map((slide, index) =>
                <div className="sliders" key={index}>
                    <h1 className="titleSlides">{slide.title}</h1>
                    <img src={slide.image} />
                    <p className="legend">{slide.subTitle}</p>
                </div>
            ));

    };
    return (
        <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            stopOnHover={true}
            showIndicators={false}
        >
            {dataSlides()}
        </Carousel>
    );
}
