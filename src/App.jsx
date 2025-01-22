import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IndexPage from './components/IndexPage'
import Navbar from './components/Navbar'
import Footer from './components/footer';




function App() {
  
  return (
    <div>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />}>
        </Route>
      </Routes>
    </BrowserRouter>
    <Footer />
    </div>
  )
}

export default App
