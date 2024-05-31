import { useEffect, useState } from "react";
import { ComplexNavbar } from "./ALL_CPR/components/shared_components/ProfileMenu";
import "./App.css";
import { Outlet } from "react-router-dom";
import Loading from "./ALL_CPR/components/shared_components/Loading";
import { FooterWithSitemap } from "./ALL_CPR/components/shared_components/FooterWithSitemap";

function App() {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    window.onload = () => {
      setLoad(false);
    };
  }, []);
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
