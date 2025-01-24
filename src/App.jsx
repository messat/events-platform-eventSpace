import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import IndexPage from './components/IndexPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import EventInformation from './components/EventInfo';
import 'react-calendar/dist/Calendar.css';




function App() {
  
  return (
    <div>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/event/:event_id" element={<EventInformation />} />
      </Routes>
      </BrowserRouter>
    <Footer />
    </div>
  )
}

export default App
