import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import {
  createGuard,
  getAllUsers
} from '../../services/userService'

function Guards() {

  const [guards, setGuards] =
    useState([])

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      phone: '',
      password: ''
    })

  const fetchGuards =
    async () => {

      try {

        const data =
          await getAllUsers()

        const filtered =
          data.users.filter(
            (item) =>
              item.role ===
              'guard'
          )

        setGuards(filtered)

      } catch (error) {
        console.log(error)
      }
    }

  useEffect(() => {
    fetchGuards()
  }, [])

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    })
  }

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        await createGuard(
          formData
        )

        alert(
          'Guard Created'
        )

        setFormData({
          name: '',
          email: '',
          phone: '',
          password: ''
        })

        fetchGuards()

      } catch (error) {

        alert(
          error.response?.data?.message
        )
      }
    }

  return (
    <DashboardLayout>

      <div className='space-y-8'>

        <h1 className='text-3xl font-bold'>
          Guards
        </h1>

        <form
          onSubmit={handleSubmit}
          className='bg-white p-6 rounded-3xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-4'
        >

          <input
            type='text'
            name='name'
            placeholder='Guard Name'
            value={formData.name}
            onChange={handleChange}
            className='border p-4 rounded-xl'
          />

          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className='border p-4 rounded-xl'
          />

          <input
            type='text'
            name='phone'
            placeholder='Phone'
            value={formData.phone}
            onChange={handleChange}
            className='border p-4 rounded-xl'
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='border p-4 rounded-xl'
          />

          <button className='bg-blue-600 text-white py-4 rounded-xl md:col-span-2'>
            Create Guard
          </button>

        </form>

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

              </tr>

            </thead>

            <tbody>

              {
                guards.map((item) => (

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

export default Guards