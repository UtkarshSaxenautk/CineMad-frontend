/* eslint-disable react/jsx-no-target-blank */
import { useNavigate } from 'react-router-dom'
import errorImg from '../images/empty.png'
import Nav from './Nav';

const SessionExpired = () => {
    const navigate = useNavigate();
    return (
      <> 
     
    <div className="container mt-36 flex flex-col h-screen my-auto items-center bgimg bg-cover">
            <img className='rounded-3xl'  src={errorImg} />

      <h1 className='mt-6 text-4xl'>
        
        Oops! look like you are not logged In, To use this feature you need to  
      </h1>
            
            <p><button className='mt-8 text-2xl pt-1 px-1 py-1 pb-1 border-x-2 border-y-2 border-black bg-slate-500 rounded-xl' onClick={() => { navigate('/login') }}>Login</button></p>
            
            <p><button className='mt-8 text-2xl pt-1 px-1 py-1 pb-1 border-x-2 border-y-2 border-black bg-slate-500 rounded-xl' onClick={() => { navigate('/') }}>Home</button></p>
     
            </div>
            </> 
  )
}

export default SessionExpired