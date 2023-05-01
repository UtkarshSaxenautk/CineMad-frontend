/* eslint-disable react/jsx-no-target-blank */
import { useNavigate } from 'react-router-dom'
import errorImg from '../images/404.png'
import Nav from './Nav';

const Error400 = () => {
    const navigate = useNavigate();
    return (
        <>
      <Nav />
    <div className="container mt-1 flex flex-col h-screen my-auto items-center bgimg bg-cover">
            <img className='h-3/5 '  src={ errorImg} />

      <h1 className='text-3xl'>
        
        Page Not found
      </h1>
      <p> Go back to Home</p>
      <p><button className=' text-3xl pt-1 px-1 py-1 pb-1 border-x-2 border-y-2 border-black bg-slate-500 rounded-xl' onClick={()=> {navigate('/')}}>Home</button></p>
            </div>
            </>
  )
}

export default Error400