import { Box } from "@chakra-ui/react";
import { useState } from "react";

export default function AboutBuilding() {
  const [state, setState] = useState(0);
  return (
    <>
      <section className="py-8 my-8 bg-gray-100 text-white bg-[url('https://i.ibb.co/1X2Tph6/simone-hutsch-l8fy-K9-RS-OU-unsplash.jpg')] bg-center bg-no-repeat bg-cover rounded-2xl">
        <Box className="opacity-60" bg="linear-gradient(#123456, #123123)">
          <div className="p-4 mx-auto text-center md:px-10 lg:px-32 xl:max-w-3xl">
            <h2 className="text-2xl font-bold leading-none sm:text-4xl">
              Where are you find the building?
            </h2>
            <p className="px-8 my-4">It&apos;s very simple</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:p-8">
            <div className="flex  px-4 w-full md:w-40 overflow-x-scroll md:overflow-hidden  md:flex-col">
              <button
                onClick={() => setState(0)}
                className={`p-2 ${
                  state === 0 ? "border-deep-orange-400" : ""
                } border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-gray-700 dark:text-gray-600`}>
                Bangladesh
              </button>
              <button
                onClick={() => setState(1)}
                className={`p-2 ${
                  state === 1 ? "border-deep-orange-400" : ""
                } border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-gray-700 dark:text-gray-600`}>
                Dhaka
              </button>
              <button
                onClick={() => setState(2)}
                className={`p-2 ${
                  state === 2 ? "border-deep-orange-400" : ""
                } border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-gray-700 dark:text-gray-600`}>
                Mirpur
              </button>
              <button
                onClick={() => setState(3)}
                className={`p-2 ${
                  state === 3 ? "border-deep-orange-400" : ""
                } border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-gray-700 dark:text-gray-600`}>
                National Housing Complex
              </button>
              <button
                onClick={() => setState(4)}
                className={`p-2 ${
                  state === 4 ? "border-deep-orange-400" : ""
                } border-b-2 md:border-l-2 md:border-b-0 md:py-3 dark:border-gray-700 dark:text-gray-600`}>
                Building
              </button>
            </div>
            <div className="relative *:absolute *:top-0 *:left-1/2 *:-translate-x-1/2 h-80">
              <div
                className={` ${
                  state === 0 ? "visible" : "invisible"
                } flex flex-col items-center justify-center gap-4 w-full`}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 dark:text-violet-600">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
                <h5 className="text-xl font-semibold">Bangladesh</h5>
                <p>Bangladesh is an independent country of Southeast Asia</p>
              </div>
              <div
                className={` ${
                  state === 1 ? "visible" : "invisible"
                } flex flex-col items-center justify-center gap-4 w-full`}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 dark:text-violet-600">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                </svg>
                <h5 className="text-xl font-semibold">Dhaka</h5>
                <p>
                  Then first you should closer look at Dhaka. Dhaka is the
                  capital city of Bangladesh.
                </p>
              </div>
              <div
                className={` ${
                  state === 2 ? "visible" : "invisible"
                } flex flex-col items-center justify-center gap-4 w-full`}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 dark:text-violet-600">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                </svg>
                <h5 className="text-xl font-semibold">Mirpur</h5>
                <p>
                  Next step is further more to look at mirpur. Mirpur is the sub
                  district of Dhaka city.
                </p>
              </div>
              <div
                className={` ${
                  state === 3 ? "visible" : "invisible"
                } flex flex-col items-center justify-center gap-4 w-full`}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 dark:text-violet-600">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <h5 className="text-xl font-semibold">
                  National housing complex
                </h5>
                <p>
                  The apartment series location at Block-H, Road-5, Near
                  Sher-E-Bangla National Cricket Stadium, Mirpur-2
                </p>
              </div>
              <div
                className={` ${
                  state === 4 ? "visible" : "invisible"
                } flex flex-col items-center justify-center gap-4 w-full`}>
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 dark:text-violet-600">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <h5 className="text-xl font-semibold">
                  Building and building number
                </h5>
                <p>
                  Finally you got the building.Building number of{" "}
                  <span className="font-bold">005</span>
                </p>
              </div>
            </div>
          </div>
        </Box>
      </section>
    </>
  );
}
