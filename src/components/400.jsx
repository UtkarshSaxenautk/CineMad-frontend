/* eslint-disable react/jsx-no-target-blank */
import { useNavigate } from 'react-router-dom'
import errorImg from '../images/404.png'
import Nav from './Nav';

const Error400 = () => {
    const navigate = useNavigate();
    return (
        <>
      <Nav />
    <div className="container mt-1 flex flex-col h-screen my-auto items-center bgimg bg-cover style={{background:#828E82;}}">
            <img className='h-3/5 '  src={ errorImg} />

      <h1 className='text-3xl'>
        
        Page Not found
      </h1>
      <p> Go back to Home</p>
          <p className='text-center'>
            <button className=' mt-8 text-2xl px-10 py-2 rounded-full bg-orange-300 rounded-xl' onClick={() => { navigate('/') }}>Home</button></p>
            </div>
            </>
  )
}

export default Error400