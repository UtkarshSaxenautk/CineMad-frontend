/* eslint-disable react/jsx-no-target-blank */
import { useNavigate } from 'react-router-dom'
import errorImg from '../images/empty.png'

const Error500 = () => {
    const navigate = useNavigate();
    return (
      
    <div className="container mt-36 flex flex-col h-screen my-auto items-center bgimg bg-cover">
            <img  src={ errorImg} />

      <h1>
        
        Internal server error 500
      </h1>
      <p>We are currently trying to fix the problem. Go back to Home?</p>
      <p><button className='border-x-2 border-y-2 border-black  bg-orange-300 rounded-xl' onClick={()=> {navigate('/')}}>Home</button></p>
    </div>
  )
}

export default Error500