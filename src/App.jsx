import { ComplexNavbar } from "./ALL_CPR/components/shared_components/ProfileMenu";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <ComplexNavbar></ComplexNavbar>
      <Outlet></Outlet>
    </>
  );
}

export default App;
