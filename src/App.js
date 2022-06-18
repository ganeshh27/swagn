// import './App.css';

import { Route, Routes, Outlet } from "react-router-dom";

import "./categories.styles.scss";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
// import { SignUp } from "./components/sign-up-form/sign-up-form.component";

const Shop = () => {
  return <div>shopping page</div>;
};
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        {/* <Route path='signUp' element={<SignUp />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
