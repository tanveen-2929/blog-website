import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'  //kis path te kehra element aau eh mtlb aa oitlet da in main.jsx ch path ch jo assi upr url ch dva ge oh aajaye ga
function App() {

  return (
    <>
    <Header />
    <main className='py-5'>
      <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default App
