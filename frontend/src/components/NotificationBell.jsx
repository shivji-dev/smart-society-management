import { useEffect, useState }
from "react";

import {
  Bell
} from "lucide-react";

import socket from "../socket";

import {
  getNotifications,
  markAsRead
} from "../services/notificationService";

const NotificationBell = () => {

  const [
    notifications,
    setNotifications
  ] = useState([]);

  const [
    open,
    setOpen
  ] = useState(false);

  // Fetch

  const fetchNotifications =
    async () => {

      try {

        const data =
          await getNotifications();

        setNotifications(
          data.notifications
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    fetchNotifications();

  }, []);

  // Socket

  useEffect(() => {

    socket.on(
      "newNotification",
      () => {

        fetchNotifications();

      }
    );

    return () => {

      socket.off(
        "newNotification"
      );

    };

  }, []);

  // Read

  const handleRead =
    async (id) => {

      try {

        await markAsRead(id);

        fetchNotifications();

      } catch (error) {

        console.log(error);

      }

    };

  const unread =
    notifications.filter(
      (n) => !n.isRead
    ).length;

  return (

    <div className="relative">

      {/* Bell */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="relative"
      >

        <Bell size={28} />

        {unread > 0 && (

          <span
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center"
          >

            {unread}

          </span>

        )}

      </button>

      {/* Dropdown */}

      {open && (

        <div className="absolute right-0 mt-4 w-[350px] bg-white rounded-2xl shadow-2xl p-5 z-50">

          <h2 className="text-xl font-bold mb-5">

            Notifications

          </h2>

          {notifications.length ===
          0 ? (

            <p className="text-gray-500">

              No notifications

            </p>

          ) : (

            <div className="space-y-4 max-h-[400px] overflow-auto">

              {notifications.map(
                (item) => (

                  <div
                    key={item._id}
                    className={`border rounded-xl p-4 cursor-pointer
                  
                    ${
                      item.isRead
                        ? "bg-white"

                        : "bg-blue-50"
                    }
                    
                    `}
                    onClick={() =>
                      handleRead(
                        item._id
                      )
                    }
                  >

                    <h3 className="font-bold">

                      {item.title}

                    </h3>

                    <p className="text-sm text-gray-600 mt-1">

                      {item.message}

                    </p>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      )}

    </div>

  );


export default NotificationBell;