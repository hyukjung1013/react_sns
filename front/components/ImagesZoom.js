import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';

import { Overlay, Header, CloseBtn, SlickWrapper, ImgWrapper, Indicator } from './styles/ImageZoomStyle'

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn type="close" onClick={onClose} />
      </Header>
      <SlickWrapper style={{ height: 'calc(100% - 44px)', background: '#090909' }}>
        <div>
          <Slick
            initialSlide={0}
            afterChange={slide => setCurrentSlide(slide)}
            infinite={false}
            arrows
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => {
              return (
                <ImgWrapper>
                  <img src={`http://localhost:8080/${v.src}`}/>
                </ImgWrapper>
              );
            })}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;