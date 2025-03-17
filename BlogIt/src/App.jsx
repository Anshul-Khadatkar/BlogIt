// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import './App.css'
// import { login, logout } from './store/authSlice'
// import authService from './appwrite/auth';
// import Header from './components/Header/Header';
// import Footer  from './components/Footer/Footer';
// function App() {
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
  
//   useEffect(() => { 
//     authService.getCurrentUser()
//       .then((userdata) => {
//         if (userdata) {
//           dispatch(login({ userdata }))
//         } else {
//           dispatch(logout())
//         }
//       })
//       .finally(
//         setLoading(false)
//       )
//   }, []);


//   //Conditional Rendering
//   return !loading ?(
//     <div className='min-h-screen flex flex-wrap content-between bg-gray-50'>
//       <div className='w-full-block'>
//         <Header />
//         <main>
//         {/* TODO: <Outlet/> */}
//         </main>
//         <Footer/>

//       </div>
//     </div>
//   ) : null;

// }

// export default App
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { login, logout } from './store/authSlice';
import authService from './appwrite/auth';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login(userdata)); // Corrected payload
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error('Error fetching current user:', error);
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);

  // Conditional Rendering
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full-block'>
        <Header />
        <main>
          TODO: <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;