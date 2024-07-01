import { Link } from "react-router-dom";

import ErrorImage from "../../assets/images/icon/error-page-img.svg";

const NotFound = () => {
  return (
    <>
      {/* Error/404 Section Area */}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <img
            className="w-80 h-80 cover m-10"
            src={ErrorImage}
            alt="error-page-img"
            data-aos="fade-right"
          />
          {/* <p className="text-base font-semibold text-indigo-600">404</p> */}
          <h1
            className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 sm:text-5xl"
            data-aos="fade-left"
          >
            Oops! Pagina nu există
          </h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              data-aos="fade-up"
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Înapoi la prima pagină
              <i className="fal fa-arrow-right-long" />
            </Link>
          </div>
        </div>
      </main>
      {/* End Error/404 Section Area */}
    </>
  );
};

export default NotFound;
