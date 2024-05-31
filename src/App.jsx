import { useEffect, useState } from "react";
import { ComplexNavbar } from "./ALL_CPR/components/shared_components/ProfileMenu";
import "./App.css";
import { Outlet } from "react-router-dom";
import Loading from "./ALL_CPR/components/shared_components/Loading";

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
      {load ? <Loading /> : <Outlet></Outlet>}
    </>
  );
}

export default App;
