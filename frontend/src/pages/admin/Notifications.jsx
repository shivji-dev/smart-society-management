import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import {
  getNotifications,
  markAsRead,
  deleteNotification
} from '../../services/notificationService'

function Notifications() {

  const [notifications, setNotifications] =
    useState([])

  const fetchNotifications =
    async () => {

      try {

        const data =
          await getNotifications()

        setNotifications(
          data.notifications
        )

      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const handleRead =
    async (id) => {

      await markAsRead(id)

      fetchNotifications()
    }

  const handleDelete =
    async (id) => {

      await deleteNotification(id)

      fetchNotifications()
    }

  return (
    <DashboardLayout>

      <div className='space-y-8'>

        <h1 className='text-3xl font-bold'>
          Notifications
        </h1>

        <div className='space-y-4'>

          {
            notifications.map((item) => (

              <div
                key={item._id}
                className='bg-white p-6 rounded-3xl shadow-md flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'
              >

                <div>

                  <div className='flex items-center gap-3'>

                    <h2 className='text-xl font-semibold'>
                      {item.title}
                    </h2>

                    {
                      !item.isRead && (
                        <span className='bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs'>
                          New
                        </span>
                      )
                    }

                  </div>

                  <p className='text-gray-600 mt-2'>
                    {item.message}
                  </p>

                  <p className='text-sm text-gray-400 mt-2'>
                    {item.type}
                  </p>

                </div>

                <div className='flex gap-3'>

                  <button
                    onClick={() =>
                      handleRead(item._id)
                    }
                    className='bg-blue-500 text-white px-5 py-2 rounded-xl'
                  >
                    Read
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item._id)
                    }
                    className='bg-red-500 text-white px-5 py-2 rounded-xl'
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </DashboardLayout>
  )
}

export default Notifications