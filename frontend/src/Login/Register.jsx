import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register, authError } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    if (profilePicture) {
      formData.append("image", profilePicture);
    }
    await register(formData);
  };

  return (
    <>
      <Navbar />
      <div className="grid w-full h-full place-items-center items-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            {authError && (
              <div className="font-bold text-sm text-center mb-6 text-orange-700">
                <p> {authError} </p>
              </div>
            )}
            <h2 className="card-title text-2xl font-bold mb-6">Register</h2>
            <form onSubmit={handleRegister} encType="multipart/form-data">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Profile Picture</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
              </div>
              <div className="form-control mt-6 flex justify-center">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
            <div className="divider">OR</div>
            <div className="text-center">
              <p>Already have an account?</p>
              <a
                onClick={() => navigate("/login")}
                className="link link-primary"
              >
                Login here
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
