import {Routes,Route, BrowserRouter} from "react-router-dom"
import React from "react"
import "../src/App.css"
import Home from "./pages/Home"
import Navbar from "./components/navbar/Navbar"
import Admin from "./pages/Admin"

function App(){  

	return (
    
    <BrowserRouter>
    <div className="app">
      <Navbar/>
      <div className="global"> 
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </div>
    </div>
    </BrowserRouter>
	)
}

export default App