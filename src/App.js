import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Booking from "./Booking";
import Menu from "./Menu";
import Services from "./Services";
import Contact from "./Contact";
import PageNotFound from "./PageNotFound";
import Sign from "./Sign";
import SignUp from "./SignUp";
import AdminHeader from "./AdminHeader";
import AdminHome from "./AdminHome";
import AdminLogin from "./AdminLogin";
import AdminMeals from "./AdminMenu";
import AdminTeam from "./AdminTeams";
import AdminUser from "./AdminUser";
import AdminBook from "./AdminBook";
import Profile from "./Profile";

const App = () => {
  const [id,setId]=useState(localStorage.getItem("adminToken"));
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            {/* Home -*/}
            <Route index element={<Home />} />
            {/* about - */}
            <Route path="/about" element={<About />} />
            {/* service -*/}
            <Route path="/service" element={<Services />} />
            {/* menu */}
            <Route path="/menu" element={<Menu />} />
            {/* booking */}
            <Route path="/book" element={<Booking />} />
            {/* contact */}
            <Route path="/contact" element={<Contact />} />
            {/* profile */}
            <Route path="/profile/:id" element={<Profile/>}/>

            {/* fallback routing */}
            <Route path="*" element={<PageNotFound />} />
            {/* sign up */}
            <Route path="/Signup" element={<SignUp />} />
            {/* sign in */}
            <Route path="/sign" element={<Sign />} />
          </Route>

          <Route path="/admin" element={<AdminHeader/>}>
             <Route index element={(id)?<AdminHome/>:<AdminLogin/>}/>
             <Route path="/admin/menu" element={(id)?<AdminMeals/>:<AdminLogin/>}/>
             <Route path="/admin/team" element={(id)?<AdminTeam/>:<AdminLogin/>}/>
             <Route path="/admin/user" element={(id)?<AdminUser/>:<AdminLogin/>}/>
             <Route path="/admin/book" element={(id)?<AdminBook/>:<AdminLogin/>}/>
             <Route path="/admin/login" element={<AdminLogin/>}/>
          </Route>
        </Routes>

       
      </Router>
    </>
  );
};

export default App;
