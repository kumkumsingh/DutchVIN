import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { Image } from "semantic-ui-react";
import './SimpleCarousal.css';
import ImagesStore from '../../redux/CarImages';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        paritialVisibilityGutter: 30
      },
    tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        paritialVisibilityGutter: 30
    }
 
};

const SimpleCarousal = ({ deviceType }) => {

  const [newimages, setImages] = useState([]);

  const details = useSelector(state => state.details.details);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ImagesStore.actions.getImages(details.handelsbenaming, (response) => {
      setImages(response.results);
    }));
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[details]);


  return (
    <Carousel
      ssr
      deviceType={deviceType}
      itemClass="image-item"
      responsive={responsive}
    >
      {newimages.map((image, i) => {
        return (
            <Image
              key={i}
              draggable={false}
              style={{ width: "100%", height: '40%' }}
              src={image.urls.thumb}
            />
        );
      })}
    </Carousel>
  );
};

export default SimpleCarousal;