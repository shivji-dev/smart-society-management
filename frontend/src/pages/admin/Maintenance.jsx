import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import {
  getServiceRequests,
  updateServiceStatus
} from '../../services/serviceRequestService'

function Maintenance() {

  const [requests, setRequests] =
    useState([])

  const fetchRequests =
    async () => {

      try {

        const data =
          await getServiceRequests()

        setRequests(
          data.requests
        )

      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleStatus =
    async (id, status) => {

      try {

        await updateServiceStatus(
          id,
          status
        )

        fetchRequests()

      } catch (error) {
        console.log(error)
      }
    }

  return (
    <DashboardLayout>

      <div className='space-y-8'>

        <h1 className='text-3xl font-bold'>
          Service Requests
        </h1>

        <div className='overflow-auto bg-white rounded-3xl shadow-md'>

          <table className='w-full min-w-[900px]'>

            <thead className='bg-[#0B1F4D] text-white'>

              <tr>

                <th className='p-4 text-left'>
                  Resident
                </th>

                <th className='p-4 text-left'>
                  Flat
                </th>

                <th className='p-4 text-left'>
                  Service
                </th>

                <th className='p-4 text-left'>
                  Description
                </th>

                <th className='p-4 text-left'>
                  Status
                </th>

                <th className='p-4 text-left'>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {
                requests.map((item) => (

                  <tr
                    key={item._id}
                    className='border-b'
                  >

                    <td className='p-4'>
                      {item.resident?.name}
                    </td>

                    <td className='p-4'>
                      {item.resident?.flatNumber}
                    </td>

                    <td className='p-4'>
                      {item.serviceType}
                    </td>

                    <td className='p-4'>
                      {item.description}
                    </td>

                    <td className='p-4'>
                      {item.status}
                    </td>

                    <td className='p-4 flex gap-2'>

                      <button
                        onClick={() =>
                          handleStatus(
                            item._id,
                            'in-progress'
                          )
                        }
                        className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                      >
                        Progress
                      </button>

                      <button
                        onClick={() =>
                          handleStatus(
                            item._id,
                            'completed'
                          )
                        }
                        className='bg-green-500 text-white px-4 py-2 rounded-lg'
                      >
                        Complete
                      </button>

                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  )
}

export default Maintenance