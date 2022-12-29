// import './App.css';

// import "./categories.styles.scss";

import { Outlet } from 'react-router-dom';
import Directory from './../../components/directory/directory-component';

const Home = () => {
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;
