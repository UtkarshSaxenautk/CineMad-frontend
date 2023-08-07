import React from 'react'
import ReactDOM from 'react-dom/client'
//import App component 
import App from './App'
import './index.css'
// create Root then render App component Strict mode makes it easier to write "secure" JavaScript
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
