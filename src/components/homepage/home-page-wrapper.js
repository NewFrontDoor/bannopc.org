import React from "react";
import slider from "../../assets/img/slider.png";
//import Carousel from '../carousel/carousel';
//import Welcome from "./Welcome";
//import HomePageContent from "./home-page-content";
import styled from "@emotion/styled";

const SliderImg = styled("img")`
	width: 100%;
	height: auto;
`;

const SliderWrapper = styled("div")`
	text-align: center;
	margin: 0;
`;

export default function HomePageWrapper({ globalSermons, setGlobalSermons, upcomingEventsData }) {
	return (
		<section>
			<SliderWrapper>
				<SliderImg className="img-responsive img-full-width" src={slider} width="1440" height="600" />
			</SliderWrapper>
			{/* <Welcome />
      <HomePageContent
        globalSermons={globalSermons}
        setGlobalSermons={setGlobalSermons}
        upcomingEventsData={upcomingEventsData}
      /> */}
		</section>
	);
}
