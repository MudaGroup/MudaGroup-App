import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './component/navbar'
import { Home, Profile } from './pages'
import Footer from './component/footer'
import GeneralContractor from './pages/GeneralContractor/GeneralContractor'
import ProjectKandang from './pages/Project/ProjectKandang'
import ProjectTempatIbadah from './pages/Project/ProjectTempatIbadah'
import ProjectGedung from './pages/Project/ProjectGedung'
import Kandang from './component/Project/Kandang'
import Gedung from './component/Project/Gedung'
import TempatIbadah from './component/Project/TempatIbadah'
import DetailRetail from './component/Retail/DetailRetail'

function AdminRedirect() {
  window.location.href = "http://localhost:1337/admin";
  return null;
}
function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/GeneralContractor' element={<GeneralContractor />} />
        <Route path='/GeneralContractor/Kandang' element={<ProjectKandang />} />
        <Route path='/GeneralContractor/TempatIbadah' element={<ProjectTempatIbadah />} />
        <Route path='/GeneralContractor/Gedung' element={<ProjectGedung />} />
        <Route path='/GeneralContractor/Kandang/:name/:id' element={<Kandang />} />
        <Route path='/GeneralContractor/TempatIbadah/:name/:id' element={<TempatIbadah />} />
        <Route path='/GeneralContractor/Gedung/:name/:id' element={<Gedung />} />
        <Route path='/MudaGroup/Retail/:name/:id' element={<DetailRetail />} />
        <Route path="/admin" element={<AdminRedirect />} />
        {/* Route untuk menangani rute yang tidak ada */}
        <Route path='*' element={null} /> {/* Tidak menampilkan apa-apa */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
