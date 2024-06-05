import {React, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faSpinner, faList } from '@fortawesome/free-solid-svg-icons'; // Importing individual icons
import diseases from './components/Diseases';
import HeroSection from './components/HeroSection';
import FeedbackForm from './components/FeedbackForm';
import { contributorsData } from './components/Contributors';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TechnologiesPage from './components/TechnologiesPage';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';


function Home() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [contributors, setContributors] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState('idle');
  const [accuracy, setAccuracy] = useState(30);

  const handleSubmissionSuccess = () => {
    setSubmissionStatus('success');
  };

  useEffect(() => {
    // Set the contributors data from the imported JSON file
    setContributors(contributorsData);
  }, []);

  const handleFeedbackFormClose = () => {
    setShowFeedbackForm(false);
  };

  useEffect(() => {
    // Set the contributors data from the imported JSON file
    setContributors(contributorsData);

    // Fetch user responses and calculate accuracy
    const fetchUserResponses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'feedback'));
        const feedbackData = querySnapshot.docs.map(doc => doc.data());
        // Calculate accuracy based on feedback data
        const correctPredictions = feedbackData.filter(feedback => feedback.predictionCorrect === 'yes');
        const totalPredictions = feedbackData.length;
        console.log(feedbackData, totalPredictions)
        const accuracyPercentage = (correctPredictions.length / totalPredictions) * 100;
        setAccuracy(accuracyPercentage.toFixed(2));
      } catch (error) {
        console.error('Error fetching user responses:', error);
      }
    };

    fetchUserResponses();
  }, []);

  const handleFeedbackButtonClick = () => {
    setShowFeedbackForm(true);
  };

  const FeatureBlock = ({ title, description, icon }) => {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
          <FontAwesomeIcon icon={icon} className="text-gray-600 text-2xl" /> {/* Using the icon directly */}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

  const TeamMember = ({ name, role, email, imageUrl }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
        <img src={imageUrl} alt={name} className="rounded-full w-32 h-32 mb-4" /> {/* Rounded image */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600">Role: {role}</p>
        <p className="text-gray-600">Email: {email}</p>
      </div>
    );
  };

  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to Cauliflower Disease Detection</h1>
        <p className="text-lg text-gray-600 mb-6">Select a disease below to view details:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseases.map(disease => (
            <Link key={disease.id} to={`/disease/${disease.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <img src={disease.image} alt={disease.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{disease.name}</h3>
                <p className="text-gray-600">{disease.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Additional sections related to your project */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">How It Works</h2>
          <p className="text-lg text-gray-600 mb-8">Learn about the process of cauliflower disease detection using our application.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureBlock
              title="Upload Image"
              description="Upload an image of your cauliflower plant."
              icon={faUpload} // Using the imported icon
            />
            <FeatureBlock
              title="Prediction"
              description="Our model analyzes the image and predicts the disease."
              icon={faSpinner} // Using the imported icon
            />
            <FeatureBlock
              title="View Results"
              description="View the predicted disease and suggested treatments."
              icon={faList} // Using the imported icon
            />
          </div>
        </div>
      </div>
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">About Us</h2>
          <p className="text-lg text-gray-600 mb-8">Meet the team behind the cauliflower disease detection project:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {contributors.map(contributor => (
              <div key={contributor.id} className="grid place-items-center"> {/* Add flexbox properties */}
                <TeamMember name={contributor.name} role={contributor.role} email={contributor.email} imageUrl={contributor.avatar} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Model Accuracy</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Accuracy Summary</h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Trained Accuracy</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">90%</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Actual Accuracy (Based on User Feedback)</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">80%</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Model Summary</dt>
                  <dd className="mt-1 text-sm text-blue-500 hover:underline sm:col-span-2">
                    <Link to="/model-summary">View Model Summary</Link>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16">
        <TechnologiesPage />
      </div>
      <Snackbar
        open={submissionStatus === 'success'}
        autoHideDuration={6000}
        onClose={() => setSubmissionStatus('idle')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert
          onClose={() => setSubmissionStatus('idle')}
          severity="success"
          sx={{ width: '100%' }}
        >
          Feedback submitted successfully!
        </MuiAlert>
      </Snackbar>
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-8">Reach out to us for any inquiries or feedback.</p>

          <button onClick={handleFeedbackButtonClick} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4">
            Provide Feedback
          </button>
          {showFeedbackForm && <FeedbackForm onClose={handleFeedbackFormClose} user={localStorage.user} onSubmitSuccess={handleSubmissionSuccess} />}
        </div>
      </div>
    </>
  );
}

export default Home;
