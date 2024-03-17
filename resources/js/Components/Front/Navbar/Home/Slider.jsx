import React, { useState } from 'react';

const images = [
    'https://via.placeholder.com/800x400/FF0000/FFFFFF',
    'https://via.placeholder.com/800x400/00FF00/FFFFFF',
    'https://via.placeholder.com/800x400/0000FF/FFFFFF',
];

const Slider = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToPreviousSlide = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNextSlide = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative">
            <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-l-md"
                onClick={goToPreviousSlide}
            >
                Previous
            </button>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-r-md"
                onClick={goToNextSlide}
            >
                Next
            </button>
            <img
                src={images[currentImageIndex]}
                alt="Slider"
                className="w-full rounded-md"
            />
        </div>
    );
};

export default Slider;
