import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import User from './pages/User';
import NotFound from './pages/NotFound';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import { GithubProvider } from './context/github/GithubContext';
import { AlertProvider } from './context/alert/AlertContext';

function App() {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Navbar />
      <main className='container mx-auto px-3 pb-12'>
        <GithubProvider>
          <AlertProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/user/:login' element={<User />} />
              <Route path='/notfound' element={<NotFound />}></Route>
              <Route path='/*' element={<NotFound />} />
            </Routes>
          </AlertProvider>
        </GithubProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
