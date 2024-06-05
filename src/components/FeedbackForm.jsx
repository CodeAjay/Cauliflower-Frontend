import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import StarRating from './StarRating'; // import the StarRating component

const FeedbackForm = ({ onClose, user, onSubmitSuccess }) => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [predictionCorrect, setPredictionCorrect] = useState('');
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Check if all required fields are filled
        if (feedback && rating && predictionCorrect) {
            setIsSubmitEnabled(true);
        } else {
            setIsSubmitEnabled(false);
        }
    }, [feedback, rating, predictionCorrect]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        
        try {
            // Save feedback to Firebase
            await addDoc(collection(db, 'feedback'), {
                predictionCorrect,
                feedback,
                rating,
                createdAt: new Date()
            });
            onSubmitSuccess();
            // Close the feedback form
            onClose();
        } catch (error) {
            console.error('Error occurred:', error);
        } finally {
            setIsSubmitting(false); // Hide loader
        }
    };

    if (!user) {
        return (
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                        <div>
                            <div className="mt-3 text-center sm:mt-5">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Feedback</h3>
                                <p className="text-gray-600 mb-4">You need to log in to submit feedback.</p>
                                <Link to="/login">
                                    <button
                                        type="submit"
                                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
                                    >
                                        Login
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                        <div className="mt-3 text-center sm:mt-5">
                            <button onClick={onClose} className="absolute top-0 right-0 p-2 m-2 rounded-full hover:bg-gray-200">
                                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Feedback</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mt-2 text-left">
                                    <label htmlFor="predictionCorrect" className="block mb-3 text-sm font-medium text-gray-700">Was the prediction correct?</label>
                                    <select
                                        id="predictionCorrect"
                                        name="predictionCorrect"
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={predictionCorrect}
                                        onChange={(e) => setPredictionCorrect(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                    <label htmlFor="feedback" className="block text-sm font-medium mb-3 text-gray-700 mt-4">Feedback:</label>
                                    <textarea
                                        id="feedback"
                                        name="feedback"
                                        rows="4"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Enter your feedback..."
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="mt-4 py-3 text-left">
                                    <label htmlFor="rating" className="block text-sm mb-2 font-medium text-gray-700">Rating:</label>
                                    <StarRating rating={rating} setRating={setRating} />
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className={`inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 ${isSubmitEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400'} text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm`}
                                        disabled={!isSubmitEnabled || isSubmitting} // Disable button if not enabled or submitting
                                    >
                                        {isSubmitting ? ( // Show loader if submitting
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.008 8.008 0 014 12H0c0 3.042 1.135 5.84 3 7.979l3-2.688zM20 12c0-3.042-1.135-5.84-3-7.979l-3 2.688A8.008 8.008 0 0120 12h4zm-6 7.291A7.96 7.96 0 0012 20c-2.18 0-4.179-.882-5.657-2.311l-3 2.688C5.979 22.865 8.777 24 12 24v-4zm0-20c3.223 0 6.021 1.135 8.313 3.011l3-2.687A7.96 7.96 0 0020 4c-4.418 0-8 3.582-8 8h4z"></path>
                                            </svg>
                                        ) : (
                                            'Submit'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackForm;
