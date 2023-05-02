import React, { useState, useEffect, useContext } from "react";
import { JwtContext, UserProfileContext } from "../JwtContext";
import axios from "axios";
import "./Profile.css";
import Nav from './Nav'
import SessionExpired from "./SessionExpired";


function getCookie(name) {
  const cookieString = decodeURIComponent(document.cookie);
  const cookies = cookieString.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

const ProfilePage = () => {
  const { jwt, setJwt } = useContext(JwtContext);
  const { userProfile, setUserProfile } = useContext(UserProfileContext);
  const [isLoading, setIsLoading] = useState(true);
  const [moviesWatched, setMoviesWatched] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempJwt = getCookie("jwt");
        console.log(jwt);
        if (jwt === "" || jwt == null) {
          setJwt(tempJwt);
        }
        const body = {
          jwt: tempJwt,
        };
        const response = await axios.post(
          "http://localhost:50081/user/getprofile",
          body
        );
        console.log(response.data);
        setUserProfile(response.data);
        setIsLoading(false);
        setMoviesWatched([
          ...moviesWatched,
          ...response.data.MoviesWatchedInformation,
        ]);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(moviesWatched);
    return (
        <>
            <Nav />
    <>
      {isLoading ? (
        // Show preloader while waiting for data to load
        <div>Loading...</div>
      ) : (
        <div className="bg-gray-400 min-h-screen py-8 px-4 sm:px-8 lg:px-16 xl:px-32">
          <h1 className="text-4xl text-center font-bold mb-2 text-neutral-900">Profile Page</h1>
          {jwt === "" || jwt == null ? (
            // <div className="pt-16 justify-center text-center ">
            //   <a className="text-center bg-slate-500 text-4xl rounded-lg border-x-4 border-black border-y-4" href="/login">
            //     <button >Login First</button>
            //   </a>
            // </div>
           <SessionExpired />
          ) : (
            <>
              <div className="bg-black text-white rounded-3xl shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-semibold mb-12 text-center">Profile Info</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Username</h3>
                    {/* Display username from user data */}
                    <p className="text-gray-600">{userProfile.Username}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-right">Current Mood</h3>
                    {/* Display current mood from user data */}
                    <p  className="text-right text-gray-600">
                      {userProfile.MoodPreviously[0]}
                    </p>
                                                </div>
                                                
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    {/* Display email from user data */}
                    <p className="text-gray-600">{userProfile.Email}</p>
                  </div>
                </div>
                <div></div>
                                        </div>
                                         <h2 className="text-center text-3xl mb-14">Top Movies</h2>
                                   <main className="grid">
                        {userProfile.MoviesWatchedInformation === null ? <>
                        </>:<>
  
                                  {userProfile.MoviesWatchedInformation.map((movie) => (
                                       <article key={movie.ID}>
                                          <img className="h-96 w-full" src={movie.ImageUrl} alt={ movie.Name} />
      <div className="text">
        <h3>{movie.Name}</h3>
        <p>{movie.OverView}</p>
        <a href={movie.Url} className="btn btn-primary btn-block">Watch</a>
      </div>
    </article>
                                     
                                  ))}</>}
                                      </main>
            </>
          )}
        </div>
      )}
            </>
            </>
  );
};

export default ProfilePage;
