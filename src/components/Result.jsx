/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MovieIcon from '@mui/icons-material/Movie';
import { JwtContext } from '../JwtContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Result(props) {
    const boxes = props.movies.map(
        (item, index) => {
           // console.log("id: "  , item.id)
            if (!item.adult && item.id !== 73475 && item.original_language === "en" || item.original_language === "hi") {
                return <Box key={index} image={item.poster_path} title={item.original_title} rating={item.vote_average} id={item.id} />
            }
        }
    )
    return (
        <div className='w-full grid md:grid-cols-4 gap-5'>
            {boxes}
        </div>
    )
}


const Box = (props) => {
    const {jwt , setJwt} = useContext(JwtContext)
    const IMGPATH = "https://image.tmdb.org/t/p/w1280";

    const onWatchLater = async(movieId) => {
        console.log("onWatchLater: ", movieId)
         const data = {
        "id" : movieId+"",
         "jwt":jwt,
        "isMovieDB":true,
        "type":"movie",
   
        }
        try {
    const response = await axios.post("http://localhost:50081/user/updateWatchLater", data);
            console.log(response.data); // handle successful sign-up response here
             toast("added to  watch later")
      //navigate('/')
  } catch (error) {
            console.log(error.response.data); // handle sign-up error response here
             toast("failed to add in watch later")
  }
    }
    const onWatchNow = async(movieId , title) => {
        console.log("onWatchLater: ", movieId)
        console.log("title : " , title)
        const data = {
        
         "jwt":jwt,
        "movie":movieId+"",
       
   
        }
        
        try {
       const response = await axios.post("http://localhost:50081/user/updateWatchedMovie", data);
        console.log(response.data); 
        //navigate('/')
        } catch (error) {
    console.log(error.response.data); 
        }
        const url = "https://www.justwatch.com/in/search?q=" + title
        window.open(url, '_blank');
    }
    return (
        
       
        <div className='shadow min-h-[200px] m-2 rounded-lg shadow-lg shadow-stone-600 cursor-pointer hover:shadow-stone800 hover:m-4 duration-75 overflow-hidden'>
                <img src={IMGPATH + props.image} alt="" className='w-full' />
            <div className='p-2 mb-1'>
                <div className='flex justify-between  px-2 items-center text-white'>
                <span className='text-xl font-semibold'>{props.title}</span>
                <span className='text-xl text-yellow-500 font-bold'>{props.rating}</span>
                
                </div>
               
            <div className='flex justify-between  px-2 items-center mt-3 text-slate-300'>
                    <span className=' rounded-3xl text-sm  justify-start text-left '>
                        <button onClick={() => onWatchNow(props.id, props.title)} >
                            <MovieIcon className='mr-1' />
                            Watch Now</button></span>
                <span className='  rounded-3xl mx-2 text-sm justify-end text-right'><button onClick={() => onWatchLater(props.id)}  ><BookmarkIcon className='mr-1' />Watch Later</button></span>
                
             </div>
                <ToastContainer/>
            </div>
            
        </div>
            
    )
}