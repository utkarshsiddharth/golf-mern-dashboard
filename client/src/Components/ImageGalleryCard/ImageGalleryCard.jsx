import React from 'react'

// css //
import './ImageGalleryCard.css'

const ImageGalleryCard = () => {
  return (
    <div className='gallery_image_card'>
      <div className='image'>
        <img
          src='https://images.unsplash.com/photo-1636621274074-5e0812978dec?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
          alt=''
        />
      </div>
      <div className='gallery_image_card-content'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem vel id
        dolorem nulla consequatur laboriosam laborum minima asperiores, numquam
        voluptatibus.
      </div>
    </div>
  )
}

export default ImageGalleryCard
