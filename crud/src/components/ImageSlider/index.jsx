// // import React, { useState, useCallback, useMemo } from 'react';
// // import './index.css';

// // const ImageSlider = ({ images, onImageClick }) => {
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   const handlePrevious = useCallback(() => {
// //     setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
// //   }, [images.length]);

// //   const handleNext = useCallback(() => {
// //     setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
// //   }, [images.length]);

// //   const currentImage = useMemo(() => images[currentIndex], [images, currentIndex]);

// //   return (
// //     <div className="image-slider">
// //       <button className="arrow left-arrow" onClick={handlePrevious}>
// //         &#10094;
// //       </button>
// //       <div className="image-item" onClick={() => onImageClick(currentImage)}>
// //         <img src={currentImage} alt={`Product ${currentIndex + 1}`} />
// //       </div>
// //       <button className="arrow right-arrow" onClick={handleNext}>
// //         &#10095;
// //       </button>
// //     </div>
// //   );
// // };

// // export default ImageSlider;


// import React, { useState, useMemo } from 'react';
// import './index.css';
// import { ImageUrl } from '../../API/BaseUrl';

// const ImageSlider = ({ images, onImageClick }) => {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const handlePrevious = () => {
//         setCurrentIndex((currentIndex === 0 ? images.length - 5 : currentIndex - 1));
//     };

//     const handleNext = () => {
//         setCurrentIndex((currentIndex + 1) % (images.length - 4));
//     }

//     const currentImages = useMemo(() => {
//         return images.slice(currentIndex, currentIndex + 4);
//     }, [images, currentIndex]);

//     return (
//         <div className="image-slider">
//             {
//                 images.length > 4 ?
//             <button className="arrow left-arrow" onClick={handlePrevious}>
//                 &#10094;
//             </button> : ""
//             }
//             <div className={`image-list`}>
//                 {currentImages.map((image, index) => (
//                     <div className="image-item" key={image?._id} onClick={() => onImageClick(image)}>
//                         <img src={`${ImageUrl}${image.image}`} alt={`Product ${currentIndex + index + 1}`} />
//                     </div>
//                 ))}
//             </div>
//             {
//             images.length > 4 ?
//             <button className="arrow right-arrow" onClick={handleNext}>
//                 &#10095;
//             </button> : ""

//             }
//         </div>
//     );
// };

// export default ImageSlider;

import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ImageUrl } from '../../API/BaseUrl';
import './index.css'; 
import { getImagePath } from '../../Utils/localImage';



const ImageSlider = ({ images, onImageClick }) => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 100 },
            items: 2,

        },
        mobile: {
            breakpoint: { max: 432, min: 0 },
            items: 1,
        }
    };


    return (
        images.length ?
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                ssr={false} // means to render carousel on server-side.
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                // customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container-custom"
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-custom"
            >

                {
                    images.map((val, index) => {
                        return (
                            <div
                                key={index} style={{height: '150px'}}>
                                <img 
                                className='slide_image'
                                src={getImagePath(val?.image)} 
                                alt={index} 
                                onClick={()=> onImageClick(val)}
                                />
                            </div>

                        )

                    })
                }
            </Carousel>
            :
            <></>
    )
}

export default ImageSlider;



