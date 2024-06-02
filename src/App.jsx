import { useEffect, useState } from "react";
import { ComplexNavbar } from "./ALL_CPR/components/shared_components/ProfileMenu";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Loading from "./ALL_CPR/components/shared_components/Loading";
import { FooterWithSitemap } from "./ALL_CPR/components/shared_components/FooterWithSitemap";

function App() {
  const [load, setLoad] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.onload = () => {
      setLoad(false);
    };
  }, [location?.pathname]);
  console.log(location?.pathname, load);

  return (
    <>
      <ComplexNavbar></ComplexNavbar>
      <div className="min-h-[calc(100vh-80px)]">
        {load ? <Loading /> : <Outlet></Outlet>}
      </div>
      <FooterWithSitemap></FooterWithSitemap>
    </>
  );
}

export default App;
