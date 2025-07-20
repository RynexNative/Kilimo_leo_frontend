import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

const GoogleLoginButton = () => {
  const handleSuccess = async(credentialResponse) => {
    const idToken = credentialResponse.credential;

    try {
      const res = await fetch("http://localhost:8000/api/auth/google/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: idToken }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Login successful", data);
        // Save JWT token (optional)
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        // Redirect au onyesha dashboard
      } else {
        console.error("❌ Backend error", data);
      }

    } catch (error) {
      console.error("❌ Network error", error);
    }
    // JWT token ya Google iko hapa. Tunaweza kuipeleka kwa backend baadaye.
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap // hiyari
      />
    </div>
  );
};

export default GoogleLoginButton;
