import React, { useEffect, useState } from 'react';

// import SliderData from './SliderData';
// import NewSliderData from './NewSliderData';
// const SliderData = NewSliderData;

import SliderData from './2NewSliderData';

const ImageSlider = ({ currentSlide }) => {
  const [current, setCurrent] = useState(currentSlide);
  console.log(current);
  useEffect(() => {
    setCurrent(currentSlide);
  }, [currentSlide]);

  return (
    <section className='slider'>
      <div
        className={
          current === 'Event 1-Bogey Sport NCR Open, Delhi'
            ? 'slide active'
            : 'slide'
        }
      >
        {current === 'Event 1-Bogey Sport NCR Open, Delhi' && (
          <picture>
            <source
              srcSet={SliderData[0].images[2]}
              className='image'
              media='(max-width: 600px)'
            />
            <source
              srcSet={SliderData[0].images[1]}
              className='image'
              media='(max-width: 1200px)'
            />
            <img className='image' src={SliderData[0].images[0]} />
          </picture>
        )}
      </div>

      <div
        className={
          current === 'Event 2-Bogey Sport Chandigarh Open'
            ? 'slide active'
            : 'slide'
        }
      >
        {current === 'Event 2-Bogey Sport Chandigarh Open' && (
          <picture>
            <source
              srcSet={SliderData[1].images[2]}
              className='image'
              media='(max-width: 600px)'
            />
            <source
              srcSet={SliderData[1].images[1]}
              className='image'
              media='(max-width: 1140px)'
            />
            <img className='image' src={SliderData[1].images[0]} />
          </picture>
        )}
      </div>

      <div
        className={
          current === 'Event 3-Bogey Sport NCR Open, Delhi'
            ? 'slide active'
            : 'slide'
        }
      >
        {current === 'Event 3-Bogey Sport NCR Open, Delhi' && (
          <picture>
            <source
              srcSet={SliderData[2].images[2]}
              className='image'
              media='(max-width: 600px)'
            />
            <source
              srcSet={SliderData[2].images[1]}
              className='image'
              media='(max-width: 1200px)'
            />
            <img className='image' src={SliderData[2].images[0]} />
          </picture>
        )}
      </div>

      <div
        className={
          current === 'ITC Classic, Golf & Country Club Gurgaon, Delhi'
            ? 'slide active'
            : 'slide'
        }
      >
        {current === 'ITC Classic, Golf & Country Club Gurgaon, Delhi' && (
          <picture>
            <source
              srcSet={SliderData[3].images[2]}
              className='image'
              media='(max-width: 600px)'
            />
            <source
              srcSet={SliderData[3].images[1]}
              className='image'
              media='(max-width: 1200px)'
            />
            <img className='image' src={SliderData[3].images[0]} />
          </picture>
        )}
      </div>
      <div className={current === 'Event 5-Finale' ? 'slide active' : 'slide'}>
        {current === 'Event 5-Finale' && (
          <picture>
            <source
              srcSet={SliderData[4].images[2]}
              className='image'
              media='(max-width: 600px)'
            />
            <source
              srcSet={SliderData[4].images[1]}
              className='image'
              media='(max-width: 1200px)'
            />
            <img className='image' src={SliderData[4].images[0]} />
          </picture>
        )}
      </div>

      {/* {SliderData.map(({ image, name }, index) => {
        return (
          <div
          className={index === current ? 'slide active' : 'slide'}
          key={index}
          >
            {name === current && (
              <img src={image} alt='travel image' className='image' />
            )}
          </div>
        );
      })} */}
    </section>
  );
};

export default ImageSlider;
