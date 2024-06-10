import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../others/hooks/axios/useAxiosSecure";
import Loading from "../../components/shared_components/Loading";
import { Pie, PieChart } from "recharts";

export default function Admin() {
  const secureApi = useAxiosSecure();
  const { data: admin = {}, isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const adminQuery = await secureApi.get(`/admin-query`);
      return adminQuery.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  const member = admin.allUsers.filter(
    (member) => member.role === "member"
  ).length;
  const generalUser = admin.allUsers.filter(
    (member) => member.role == "user"
  ).length;
  const bookedApartments = admin.allApartments.filter(
    (apartment) => apartment?.apartment_booked === "booked"
  ).length;
  const bookedLessApartment = admin.allApartments.filter(
    (apartment) => apartment?.apartment_booked !== "booked"
  ).length;
  const data01 = [
    {
      name: "Group A",
      value: (bookedApartments * 100) / 20,
    },
  ];
  const data02 = [
    {
      name: "Group A",
      value: 100 - (bookedApartments * 100) / 20,
    },
  ];
  return (
    <section className="p-2 lg:p-6 dark:bg-gray-100 dark:text-gray-800">
      <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3">
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">20</p>
          <p className="text-sm sm:text-base">Total Apartment</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">
            {admin.allUsers.length - 1}
          </p>
          <p className="text-sm sm:text-base">Total user</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">
            {member}
          </p>
          <p className="text-sm sm:text-base">Members</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">
            {generalUser}
          </p>
          <p className="text-sm sm:text-base">General user</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">
            {bookedApartments}
          </p>
          <p className="text-sm sm:text-base">Booked apartment</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">
            {bookedLessApartment}
          </p>
          <p className="text-sm sm:text-base">Remain apartment</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">
            ${admin.amount / 100}
          </p>
          <p className="text-sm sm:text-base">Total amount</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">
            {(bookedApartments * 100) / 20}%
          </p>
          <p className="text-sm sm:text-base">Booked</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">
            {100 - (bookedApartments * 100) / 20}%
          </p>
          <p className="text-sm sm:text-base">Remain Free</p>
        </div>
        <div>
          <PieChart width={250} height={200}>
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            />
            <Pie
              data={data02}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </div>
      </div>
    </section>
  );
}
