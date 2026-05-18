import { Bell, Menu } from "lucide-react";

function Topbar({ name, setIsOpen }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-4">

        {/* MOBILE MENU */}
        <Menu
          className="lg:hidden cursor-pointer"
          onClick={() => setIsOpen(true)}
        />

        <div>

          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back, {name}
          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        <Bell className="cursor-pointer" />

        <div className="hidden sm:flex items-center gap-3">

          <img
            src="https://i.pravatar.cc/40"
            alt=""
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h3 className="font-semibold">{name}</h3>

            <p className="text-sm text-gray-500">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Topbar;