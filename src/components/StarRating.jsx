import React from 'react';

const StarRating = ({ rating, setRating }) => {
    const handleClick = (value) => {
        setRating(value);
    };

    return (
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`h-8 w-8 cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    onClick={() => handleClick(star)}
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ))}
        </div>
    );
};

export default StarRating;
