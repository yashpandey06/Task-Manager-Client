import { NavLink } from "react-router-dom";

function Welcome() {
  return (
    <div className="w-screen h-screen">
      <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply min-h-full w-full">
        <div className="px-4 mx-auto text-center py-16 md:py-24 lg:py-56 relative top-[100px] md:top-0">
          <h1 className="mb-2 text-2xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
            Welcome to your Daily Schedule
          </h1>
          <p className="mb-4 text-sm md:text-lg lg:text-xl font-normal text-gray-300 sm:px-4 md:px-16 lg:px-48">
            Here, you can make and summarize your daily tasks with ease.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <NavLink
              to="/login"
              className="inline-flex justify-center items-center py-2 px-4 md:py-3 md:px-5 text-base md:text-lg font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get started
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Welcome;
