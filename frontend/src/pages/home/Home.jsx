import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f5f7fb] overflow-hidden">

      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm px-16 py-5 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            S
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Smart Society
          </h1>

        </div>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-10 font-medium text-gray-700">

          <li className="hover:text-blue-600 cursor-pointer transition">
            Home
          </li>

          <li className="hover:text-blue-600 cursor-pointer transition">
            Features
          </li>

          <li className="hover:text-blue-600 cursor-pointer transition">
            About Us
          </li>

          <li className="hover:text-blue-600 cursor-pointer transition">
            Contact
          </li>

        </ul>

        {/* Login Button */}
        <Link to="/login">

          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-7 py-3 rounded-xl shadow-lg font-medium">

            Login / Register

          </button>

        </Link>

      </nav>

      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 items-center px-16 py-20 gap-10">

        {/* Left Side */}
        <div>

          <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold">
            Smart Living, Better Community
          </span>

          <h1 className="text-7xl font-bold text-gray-900 leading-tight mt-8">

            Smart Society <br />
            Management System

          </h1>

          <p className="text-gray-600 text-xl mt-8 leading-9">

            A complete solution to manage your society efficiently.
            <br />
            Secure, simple and smart.

          </p>

          {/* Buttons */}
          <div className="flex gap-6 mt-12">

            <Link to="/register">

              <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-10 py-4 rounded-2xl text-lg shadow-xl">

                Get Started

              </button>

            </Link>

            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition px-10 py-4 rounded-2xl text-lg">

              Learn More

            </button>

          </div>

        </div>

        {/* Right Side */}
        <div className="relative flex justify-center items-center">

          {/* Blur Background */}
          <div className="absolute w-[550px] h-[550px] bg-blue-100 rounded-full blur-3xl opacity-60"></div>

          {/* Main Image */}
          <img
            src="https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&auto=format&fit=crop"
            alt="Smart Society"
            className="relative z-10 w-full max-w-3xl rounded-3xl shadow-2xl"
          />

        </div>

      </section>

      {/* Features Section */}
      <section className="px-16 py-20 bg-white">

        <h2 className="text-5xl font-bold text-center text-gray-800">
          Features
        </h2>

        <p className="text-center text-gray-500 mt-4 text-lg">
          Everything you need to manage your society efficiently
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-16">

          {/* Card 1 */}
          <div className="bg-[#f5f7fb] p-10 rounded-3xl shadow-lg hover:shadow-2xl transition">

            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl">
              👥
            </div>

            <h3 className="text-2xl font-bold mt-8 text-gray-800">
              Visitor Management
            </h3>

            <p className="text-gray-600 mt-4 leading-7">
              Easily manage visitor entries and approvals securely.
            </p>

          </div>

          {/* Card 2 */}
          <div className="bg-[#f5f7fb] p-10 rounded-3xl shadow-lg hover:shadow-2xl transition">

            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white text-3xl">
              🛠️
            </div>

            <h3 className="text-2xl font-bold mt-8 text-gray-800">
              Complaint System
            </h3>

            <p className="text-gray-600 mt-4 leading-7">
              Raise and track complaints quickly with transparency.
            </p>

          </div>

          {/* Card 3 */}
          <div className="bg-[#f5f7fb] p-10 rounded-3xl shadow-lg hover:shadow-2xl transition">

            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl">
              🔔
            </div>

            <h3 className="text-2xl font-bold mt-8 text-gray-800">
              Notifications
            </h3>

            <p className="text-gray-600 mt-4 leading-7">
              Get instant society updates and visitor alerts.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;