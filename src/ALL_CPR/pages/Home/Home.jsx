import AboutBuilding from "./home_components/AboutBuilding";
import Banner from "./home_components/Banner";
import BuildingLocation from "./home_components/BuildingLocation";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <AboutBuilding></AboutBuilding>
      <BuildingLocation></BuildingLocation>
    </div>
  );
}
