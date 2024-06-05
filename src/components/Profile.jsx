import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, loadingAuth] = useAuthState(auth);
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const q = query(collection(db, 'uploads'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const userData = querySnapshot.docs.map(doc => doc.data());
          setUploads(userData);
          console.log(userData);
        } catch (error) {
          console.error('Error fetching user uploads:', error);
        }
      }
    };
  
    fetchData();
  }, [user]);
  

  if (loadingAuth) {
    return <div>Loading...</div>;
  }

  console.log(uploads)

  return (
    <>
      {user ? (
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold mb-6">Welcome {user.displayName || user.email}</h1>
          {user.photoURL && <img src={user.photoURL} alt="User Avatar" className="rounded-full mb-4 w-32 h-32" />}
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">Your Uploads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploads.map((upload, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                  <img src={upload.imageUrl} alt="Uploaded" className="w-full h-48 object-cover rounded-lg mb-4" />
                  <p className="text-lg font-semibold">Disease: {upload.disease}</p>
                  <p className="text-sm text-gray-500">Uploaded on: {new Date(upload.createdAt.seconds * 1000).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl">You need to login to access this page.</h1>
          <Link to="/login" className="text-blue-500 hover:underline mt-4">Login</Link>
        </div>
      )}
    </>
  );
};

export default Profile;
