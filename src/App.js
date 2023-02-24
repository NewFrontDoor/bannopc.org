import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Global, css } from "@emotion/core";
import Navigation from "./components/Navigation";
import HomePageWrapper from "./components/homepage/home-page-wrapper";
import OtherPageWrapper from "./components/other-page-wrapper";
import Footer from "./components/Footer";
import { fetchDrupalData } from "./utils/fetch-functions";

require("typeface-lato");
require("typeface-roboto-slab");

const globalStyles = css`
	html,
	body {
		margin: 0;
		outline: 0;
		padding: 0;
	}

	body {
		color: #777;
		font-family: "Lato", sans-serif;
		font-weight: 300;
		text-rendering: optimizeLegibility;
		word-wrap: break-word;
		font-style: normal;
		width: 100%;
	}

	a {
		text-decoration: none;
		-webkit-transition: all 0.3s ease-out;
		-moz-transition: all 0.3s ease-out;
		-o-transition: all 0.3s ease-out;
		transition: all 0.3s ease-out;
		color: #c2b49a;
	}

	a:hover,
	a:focus,
	a:active {
		color: #2b2b2b;
		text-decoration: none;
	}

	b,
	strong {
		font-weight: 700;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: "Roboto Slab";
		font-style: normal;
		font-weight: 300;
	}
`;

/*const sanityQuery = `*[_type == "page"][0] {
  ...,
  body[]{
    ...,
    _type == 'reference' => @-> {
      ...,
      blocks[] {
        ...,
        _type == 'reference' => @ -> {
          ...,
          'image': mainImage.asset->url,
          'header': title,
          'link': slug.current
        }
      }
    },
    markDefs[] {
      ...,
      _type == 'internalLink' => {
          'slug': @.reference->slug.current
      },
      _type == 'asset' => {
          'url': @.reference->file.asset->url
      }
    }
  },
  'mainImage': mainImage.asset->url
}`*/

export default function App() {
	const [globalSermons, setGlobalSermons] = useState(null);
	const [pagesData, setpagesData] = useState();
	const [pagesFetched, setPagesFetched] = useState(false);
	const [newslettersFetched, setnewslettersFetched] = useState(false);
	const [newslettersData, setNewslettersData] = useState();
	const [upcomingEventsDataFetched, setUpcomingEventDataFetched] = useState(false);
	const [upcomingEventsData, setUpcomingEventsData] = useState(null);

	useEffect(() => {
		if (pagesFetched === false) {
			fetchDrupalData("all_pages", {}).then((response) => {
				let mapped = response.map((item) => ({
					[item.slug.toLowerCase()]: item
				}));
				let mappedObj = Object.assign({}, ...mapped);
				setpagesData(mappedObj);
				setPagesFetched(true);
			});
		}
	}, [pagesFetched, pagesData]);

	useEffect(() => {
		if (newslettersFetched === false) {
			fetchDrupalData("newsletter", {}).then((response) => {
				setNewslettersData(response);
				setnewslettersFetched(true);
			});
		}
	}, [newslettersFetched, newslettersData]);

	useEffect(() => {
		if (upcomingEventsDataFetched === false) {
			fetchDrupalData("upcomingEvents", {}).then((response) => {
				setUpcomingEventsData(response);
				setUpcomingEventDataFetched(true);
			});
		}
	}, [upcomingEventsDataFetched, upcomingEventsData]);

	return pagesFetched === true ? (
		<Router>
			<Global styles={globalStyles} />
			<Route path="*" component={Navigation} />
			<Route
				exact
				path="/"
				render={() => (
					<HomePageWrapper
						globalSermons={globalSermons}
						setGlobalSermons={setGlobalSermons}
						upcomingEventsData={upcomingEventsData}
						setUpcomingEventsData={setUpcomingEventsData}
					/>
				)}
			/>
			<Route
				path="/:path"
				render={() => (
					<OtherPageWrapper
						globalSermons={globalSermons}
						setGlobalSermons={setGlobalSermons}
						pagesData={pagesData}
						newslettersData={newslettersData}
					/>
				)}
			/>
			<Route path="*" render={() => <Footer globalSermons={globalSermons} setGlobalSermons={setGlobalSermons} />} />
		</Router>
	) : (
		""
	);
}
