import './Foot.css'
import logo from '../images/LOGO.png'
const Foot = () => {
    return (
    <footer className="mt-24 footer-sec inline-block  align-text-bottom  ... !important">
    <div className="main">
      
      
      <div className="logo row">
        <div className="footer-header">
          <img src={logo} className="manik ml-3" alt=""/>
        </div>
        <div className="px-4 logo-des">
          <p className='px-4'>Get your movies according to mood. Top Movies Suggestions and your personal movie tracker</p>
          
          <a href="#" className="btn-know ml-3">Know More</a>
        </div>
        
        
      </div>
      
      
      
      <div className="office row">
        <div className="footer-header">
          <h3>Movies</h3>
        </div>
        <div className="office-des">
          <p>here are <br/> many movies<br/>of Your choice available<br/>available</p>
          
         <a href="#">cinemad@gmail.com</a>
          
          <p className = "num">+91-7985259022</p>
        </div>
      </div>
      
      
      <div className="link row">
        <div className="footer-header">
          <h3>Links</h3>
        </div>
        
        <div className="link-des">
          <a href="#" className="footer-links">Home</a>
          <a href="/guide" className="footer-links">Guide</a>
          <a href="#" className="footer-links">Services</a>
          <a href="#" className="footer-links">Galary</a>
          <a href="#" className="footer-links">Contact</a>
        </div>
        
      </div>
      
      
      <div className="newsletter row">
        <div className="footer-header">
          <h3>Newsletter</h3>
        </div>
        <div className="newsletter-des">
          <div className="subcribe"><i className="sub-icon ri-mail-check-fill"></i>
            <input type="mail" placeholder = "Enter Email ID" required/>
            <i className="sub-icon ri-arrow-right-line"></i>
          </div>
          <div className="icons">
            <a href="#"><i className="social-icon ri-facebook-fill"></i></a>
            <a href="#"><i className="social-icon ri-instagram-line"></i></a>
            <a href="#"><i className="social-icon ri-linkedin-fill"></i></a>
            <a href="#"><i className="social-icon ri-github-line"></i></a>
            
          </div>
        </div>
      </div>
      
      
    </div>
    <div className="copyright">
    
    <p>© Copyright 2023 utk.</p>
    </div>
  </footer>
  )
}

export default Foot