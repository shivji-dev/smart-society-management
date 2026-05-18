import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import { getAllUsers }
  from '../../services/userService'

function Residents() {

  const [users, setUsers] =
    useState([])

  const fetchUsers =
    async () => {

      try {

        const data =
          await getAllUsers()

        const residents =
          data.users.filter(
            (item) =>
              item.role ===
              'resident'
          )

        setUsers(residents)

      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <DashboardLayout>

      <div className='space-y-8'>

        <h1 className='text-3xl font-bold'>
          Residents
        </h1>

        <div className='overflow-auto bg-white rounded-3xl shadow-md'>

          <table className='w-full min-w-[800px]'>

            <thead className='bg-[#0B1F4D] text-white'>

              <tr>

                <th className='p-4 text-left'>
                  Name
                </th>

                <th className='p-4 text-left'>
                  Email
                </th>

                <th className='p-4 text-left'>
                  Phone
                </th>

                <th className='p-4 text-left'>
                  Flat
                </th>

              </tr>

            </thead>

            <tbody>

              {
                users.map((item) => (

                  <tr
                    key={item._id}
                    className='border-b'
                  >

                    <td className='p-4'>
                      {item.name}
                    </td>

                    <td className='p-4'>
                      {item.email}
                    </td>

                    <td className='p-4'>
                      {item.phone}
                    </td>

                    <td className='p-4'>
                      {item.flatNumber}
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

export default Residents