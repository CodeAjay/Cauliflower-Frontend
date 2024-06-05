import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Assuming your Firebase auth instance is in '../firebase'

const ProtectedRoute = ({ path: Path, element: Element,}) => {
  const [user] = useAuthState(auth);

  return (
    // <Route
    //   path={Path}
    //   element={
        <Element />
        // user ? (
        //   <Element />
        // ) : (
        // //   <Navigate to="/login" replace /> // Redirect if not authorized
        // )
    //   }
    // />
  );
};

export default ProtectedRoute;
