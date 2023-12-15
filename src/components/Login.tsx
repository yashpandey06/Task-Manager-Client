import { useState } from "react";
import { authPayload } from "./Types/Types";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const url: string = "http://localhost:3000/login";
    const data: authPayload = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(url, data);
      if (response) {
        alert("login success");
        Cookies.set("auth-token", response.data.token, { expires: 1 });
        navigate("/dashboard");
      } else {
        alert("login failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error !!");
    }
  }
  return (
    <div
      style={{
        background:
          "#333 url(https://source.unsplash.com/jimGvAMRlWk/2400x1823) center / cover no-repeat fixed",
        font: "1em/1.618 Mulish, sans-serif",
      }}
      className="min-h-screen p-4 md:p-6 lg:p-8 flex justify-center items-center "
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-sm p-8 md:p-10 lg:p-10 bg-gradient-to-b from-black/80 to-black/40 text-[#fff] backdrop-blur-lg border-[1px] border-solid border-white border-opacity-10 rounded-2xl shadow-[0_0_20px_10px_rgba(0,0,0,0.75)]"
      >
        <h3 className="text-xl md:text-2xl lg:text-2xl mb-6 uppercase font-bold">
          Signup required !
        </h3>

        <p className="mb-6 text-sm text-[#fff]/60 text-opacity-50">
          Enter a valid email & password in the fields below to get started.
        </p>

        <label
          htmlFor="email"
          className="relative text-[#fff]/50 focus-within:text-[#fff]/70 block mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="transition pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
            fill="currentColor"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 1.95c-5.52 0-10 4.48-10 10s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57v-1.43c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57v-1.43c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
          </svg>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-input transition-colors duration-200 py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 w-full bg-[#fff]/10 text-white focus:bg-[#fff]/20 focus:shadow-sm focus:outline-none leading-none placeholder-gray-400 appearance-none block pl-12 rounded-lg"
          />
        </label>

        <label
          htmlFor="password"
          className="relative text-[#fff]/50 focus-within:text-[#fff]/70 block mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="transition pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3"
            fill="currentColor"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
          </svg>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-input transition-colors duration-200 py-3 pr-3 md:py-4 md:pr-4 lg:py-4 lg:pr-4 w-full bg-[#fff]/10 text-white focus:bg-[#fff]/20 focus:shadow-sm focus:outline-none leading-none placeholder-gray-400 appearance-none block pl-12 rounded-lg"
          />
        </label>

        <button
          type="submit"
          className="p-3 md:p-4 focus:outline-none lg:p-4 transition-colors duration-500  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-full rounded-lg font-bold text-white"
        >
          Continue
        </button>
        <ul className="mt-4 flex justify-center"></ul>
        <NavLink to="/register" className="hover:underline">
          Not a User? Register here
        </NavLink>
      </form>
    </div>
  );
}
