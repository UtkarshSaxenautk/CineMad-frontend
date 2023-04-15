/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer>
		<div clas="footer-content">
		  <div clas="footer-section about">
			<h2 clas="logo-text">Cine Mad</h2>
			<p>
			  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada risus et elit malesuada tempus. 
			</p>
			<div clas="contact">
			  <span><i clas="phone"></i> &nbsp; +1-234-567-890</span>
			  <span><i clas="envelope"></i> &nbsp; example@example.com</span>
			</div>
			<div clas="socials">
			  <a href="#"><i clas="facebook"></i></a>
			  <a href="#"><i clas="twitter"></i></a>
			  <a href="#"><i clas="instagram"></i></a>
			  <a href="#"><i clas="linkedin"></i></a>
			</div>
		  </div>
	  
		  <div clas="footer-section links">
			<h2>Quick Links</h2>
			<ul>
			  <li><a href="#">About Us</a></li>
			  <li><a href="#">Services</a></li>
			  <li><a href="#">Testimonials</a></li>
			  <li><a href="#">Blog</a></li>
			</ul>
		  </div>
	  
		  <div clas="footer-section contact-form">
			<h2>Contact Us</h2>
			<form action="#" method="post">
			  <input type="email" name="email" clas="text-input contact-input" placeholder="Your email address..."/>
			  <textarea name="message" clas="text-input contact-input" placeholder="Your message..."></textarea>
			  <button type="submit" clas="contact-btn">
				<i clas="button"></i>
				Send
			  </button>
			</form>
		  </div>
		</div>
	  
		<div clas="footer-bottom">
		  &copy; 2023 Example Company | Designed by Huehue
		</div>
	  </footer>
	  
  );
}

export default Footer