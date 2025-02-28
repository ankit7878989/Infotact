import React, { useState } from "react";
import "./LoginPage.css";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "", remember: false });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.get("api/auth/google", {
        token: credentialResponse.credential,
      });
      login(res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      login(res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        
      
        
        <div className="form-container">
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field" 
                required 
              />
            </div>
            
            <div className="input-group">
              <input 
                type="password" 
                placeholder="Password" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input-field" 
                required 
              />
            </div>
            
            <div className="options">
              <label className="remember-me">
                <input 
                  type="checkbox" 
                  checked={formData.remember} 
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })} 
                />
                Remember Me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
          <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log("Login Failed")} />
      </div>
    </div>
  );
};

export default LoginPage;
