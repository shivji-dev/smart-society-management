import {
  LayoutDashboard,
  Users,
  Shield,
  UserCheck,
  MessageSquare,
  CreditCard,
  Bell,
  FileText,
  Settings,
  User,
  LogOut,
} from "lucide-react";

function Sidebar({ role }) {
  return (
    <div className="w-72 h-full lg:min-h-screen bg-[#0B1F4D] text-white flex flex-col">

      {/* LOGO */}
      <div className="p-6 border-b border-white/10">

        <h1 className="text-3xl font-bold">
          Smart Society
        </h1>

        <p className="text-sm text-gray-300 mt-2 capitalize">
          {role} Panel
        </p>

      </div>

      {/* MENU */}
      <div className="flex-1 overflow-y-auto p-5 space-y-2">

        {/* DASHBOARD */}
        <div className="flex items-center gap-4 bg-blue-600 px-5 py-4 rounded-2xl cursor-pointer">

          <LayoutDashboard size={20} />

          <span className="font-medium">
            Dashboard
          </span>

        </div>

        {/* RESIDENTS */}
        <div className="flex items-center gap-4 hover:bg-white/10 duration-300 px-5 py-4 rounded-2xl cursor-pointer">

          <Users size={20} />

          <span>
            Residents
          </span>

        </div>

        {/* GUARDS */}
        <div className="flex items-center gap-4 hover:bg-white/10 duration-300 px-5 py-4 rounded-2xl cursor-pointer">

          <Shield size={20} />

          <span>
            Guards
          </span>

        </div>

        {/* VISITORS */}
        <div className="flex items-center gap-4 hover:bg-white/10 duration-300 px-5 py-4 rounded-2xl cursor-pointer">

          <UserCheck size={20} />

          <span>
            Visitors
          </span>

        </div>

        {/* COMPLAINTS */}
        <div className="flex items-center gap-4 hover:bg-white/10 duration-300 px-5 py-4 rounded-2xl cursor-pointer">

          <MessageSquare size={20} />

          <span>
            Complaints
          </span>

        </div>

        {/* MAINTENANCE */}
        <div className="flex items-center gap-4 hover:bg-white/10 duration-300 px-5 py-4 rounded-2xl cursor-pointer">

          <CreditCard size={20} />

          <span>
            Maintenance
          </span>

        </div>

        {/* NOTICES */}
        <div className="flex items-center gap-4 hover:bg-white/10 duration-300 px-5 py-4 rounded-2xl cursor-pointer">

          <Bell size={20} />

          <span>
            Notices
          </span>

        </div>

        {/* REPORTS */}
        <div className="flex items-center gap-4 hover:bg-white/10 duration-300 px-5 py-4 rounded-2xl cursor-pointer">

          <FileText size={20} />

          <span>
            Reports
          </span>

        </div>

        {/* SETTINGS */}
        <div className="flex items-center gap-4 hover:bg-white/10 duration-300 px-5 py-4 rounded-2xl cursor-pointer">

          <Settings size={20} />

          <span>
            Settings
          </span>

        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-4 hover:bg-white/10 duration-300 px-5 py-4 rounded-2xl cursor-pointer">

          <User size={20} />

          <span>
            Profile
          </span>

        </div>

      </div>

      {/* USER INFO */}
      <div className="border-t border-white/10 p-5">

        <div className="flex items-center gap-4">

          <img
            src="https://i.pravatar.cc/50"
            alt=""
            className="w-12 h-12 rounded-full border-2 border-white"
          />

          <div>

            <h3 className="font-semibold">
              Admin User
            </h3>

            <p className="text-sm text-gray-300 capitalize">
              {role}
            </p>

          </div>

        </div>

        {/* LOGOUT */}
        <button className="w-full mt-5 bg-red-500 hover:bg-red-600 duration-300 py-3 rounded-xl flex items-center justify-center gap-3">

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>
  );
}

export default Sidebar;