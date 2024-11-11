import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App/App.jsx'
import './index.css'
import CinemaPage from 'components/Pages/CinemaPage.jsx';
import HomePage from 'components/Pages/HomePage.jsx';
import MovieListPage from 'components/Pages/MovieListPage.jsx';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddMovieForm from 'components/AddMovieForm/AddMovieForm.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "cinema",
        element: <CinemaPage/>,
      },
      {
        path: "movie",
        element: <MovieListPage/>,
      },
      {
        path: "movie/add",
        element: <AddMovieForm/>,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <RouterProvider router={router}/>  
  </StrictMode>,
)
