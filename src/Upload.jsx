import React, { useState } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import FullScreenLoading from './FullScreenLoading';
import { Link } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './index.css'

const Upload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewURL, setPreviewURL] = useState("https://ajaxuploader.com/document/scr/images/drag-drop-file-upload.png");
    const [prediction, setPrediction] = useState(null);
    const [user, loadingAuth] = useAuthState(auth);
    const [predictedImage, setPredictedImage] = useState("");
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);

    const [submissionStatus, setSubmissionStatus] = useState('idle');

    const handleSubmissionSuccess = () => {
      setSubmissionStatus('success');
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewURL(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please upload an image for prediction.");
            return;
        }
        
        setLoading(true);
        
        try {
            // Upload image to Firebase Storage
            const storageRef = ref(storage, `uploads/${user.uid}/${file.name}`);
            await uploadBytes(storageRef, file);
            const imageUrl = await getDownloadURL(storageRef);
        
            // Get prediction from API
            const formData = new FormData();
            formData.append('file', file);
        
            const response = await axios.post('http://localhost:5000/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { prediction } = response.data;
            console.log(prediction);
            setPrediction(prediction); // Update prediction state
        
            // Set the predicted image URL
            const predictedImageRef = ref(storage, `uploads/${user.uid}/${file.name}`);
            const predictedImageUrl = await getDownloadURL(predictedImageRef);
            setPredictedImage(predictedImageUrl);
        
            // Save upload metadata to Firestore
            await addDoc(collection(db, 'uploads'), {
                userId: user.uid,
                imageUrl: imageUrl,
                disease: prediction,
                createdAt: new Date()
            });
        
            console.log("After uploading to firebase")
            setLoading(false);
            setTimeout(() => {
                setShowFeedbackForm(true);
            }, 6000); // Show feedback form after getting prediction
        } catch (error) {
            console.error('Error occurred:', error);
            setLoading(false);
        }
        
    };

    const handleFeedbackFormClose = () => {
        setShowFeedbackForm(false);
    };

    if (loadingAuth) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {user ? (
                <>
                <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <h1 className="text-3xl mb-6">Upload your Cauliflower image to detect the disease</h1>
                    <label htmlFor="fileInput" className="cursor-pointer image-container">
                        <img src={previewURL} alt="Selected Image" className="my-4 max-w-full h-auto rounded-lg border border-gray-300 hover:border-gray-500" />
                        <div className="image-overlay">Click to upload a new image</div>
                    </label>
                    <input id="fileInput" type="file" onChange={handleFileChange} className="hidden" />
                    <button
                        onClick={handleUpload}
                        className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 ${!file ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!file}
                    >
                        Upload
                    </button>
                    {loading && <FullScreenLoading />}
                </div>
                {!loading && prediction && (
                    <div className="flex flex-col items-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <h1 className="text-3xl mb-6">Possible Disease in your Cauliflower: {prediction}</h1>
                        <img src={predictedImage} alt="Predicted" className="max-w-full h-auto rounded-lg border border-gray-300" />
                    </div>
                )}

                </>
            ) : (
                <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <h1 className="text-3xl mb-6">You need to login to access this page.</h1>
                    <Link to="/login" className="text-blue-500 hover:underline mt-4">Login</Link>
                </div>
            )}
            <Snackbar
                open={submissionStatus === 'success'}
                autoHideDuration={6000}
                onClose={() => setSubmissionStatus('idle')}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MuiAlert
                onClose={() => setSubmissionStatus('idle')}
                severity="success"
                sx={{ width: '100%' }}
                >
                Feedback submitted successfully!
                </MuiAlert>
            </Snackbar>
            {showFeedbackForm && <FeedbackForm onClose={handleFeedbackFormClose} user={localStorage.user} onSubmitSuccess={handleSubmissionSuccess} />}
        </>
    );
};

export default Upload;
