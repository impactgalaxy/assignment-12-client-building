import AboutBuilding from "./home_components/AboutBuilding";
import Banner from "./home_components/Banner";
import BuildingLocation from "./home_components/BuildingLocation";
import GetCoupon from "./home_components/GetCoupon";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <AboutBuilding></AboutBuilding>
      <BuildingLocation></BuildingLocation>
      <GetCoupon></GetCoupon>
    </div>
  );
}
