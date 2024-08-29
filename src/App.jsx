/* eslint-disable no-unused-vars */
import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import CoverPage from './pages/CoverPage';
import MyTask from './pages/MyTask';
import NewTask from './pages/NewTask';
import EditTask from './pages/EditTask';
import NavBar from './components/NavBar';
import { Toaster } from 'react-hot-toast';

function App() {

  // Base URL for API requests from our backend. 
  const baseURL = "https://task-manager-backend-2-xxza.onrender.com";


  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Toaster position='top-right' />  {/* Toaster for showing notifications */}  {/* Toast.success, Toast.error, Toast.info */}  {/* These are provided by react-hot-toast library */}
        <NavBar />
          <Routes>
              <Route path='/' element={<CoverPage />} />
              <Route path='/tasks' element={<MyTask baseURL={baseURL} />} />
              <Route path='/new' element={<NewTask baseURL={baseURL}  />} />
              <Route path='/edit' element={<EditTask baseURL={baseURL}  />}/>
          </Routes>
      </Router>
    </>
  )
}

export default App;


// Netlify, Vercel, Render etc are popular free cloud platforms for hosting web applications. 

// Netlify is best for static sites and applications with a focus on simplicity and serverless functions. 

// Vercel is optimized for frontend development, especially those using React and Next.js, with strong serverless and edge capabilities

// Render is a versatile Platform suitable for FullStack Applications, offering more flexible in    terms of supported frameworks, database and backend services.  