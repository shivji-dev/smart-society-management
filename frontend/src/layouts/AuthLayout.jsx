import {
  Link
} from "react-router-dom";

const AuthLayout = ({
  children,
  title,
  subtitle
}) => {

  return (

    <div className="min-h-screen flex">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex w-1/2 bg-blue-600 text-white flex-col justify-center px-16">

        <h1 className="text-5xl font-bold leading-tight mb-6">

          Smart Society
          Management System

        </h1>

        <p className="text-lg text-blue-100">

          Manage visitors,
          complaints, services,
          residents and security
          easily with modern
          society management.

        </p>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex-1 flex items-center justify-center bg-gray-100 px-4 py-10">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          {/* LOGO */}

          <div className="flex justify-center mb-5">

            <img
              src="/logo.png"
              alt="logo"
              className="w-20 h-20 object-contain"
            />

          </div>

          {/* TITLE */}

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">

            {title}

          </h2>

          <p className="text-center text-gray-500 mb-8">

            {subtitle}

          </p>

          {/* FORM */}

          {children}

          {/* HOME */}

          <div className="mt-6 text-center">

            <Link
              to="/"
              className="text-blue-600 font-medium hover:underline"
            >

              Back To Home

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;