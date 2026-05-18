import { useEffect, useState } from 'react'

import DashboardLayout from '../../layouts/DashboardLayout'

import {
  createServiceRequest,
  getServiceRequests
} from '../../services/serviceRequestService'

function Maintenance() {

  const [requests, setRequests] =
    useState([])

  const [formData, setFormData] =
    useState({
      serviceType: '',
      description: ''
    })

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

        await createServiceRequest(
          formData
        )

        alert(
          'Request Created'
        )

        setFormData({
          serviceType: '',
          description: ''
        })

        fetchRequests()

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
          Service Requests
        </h1>

        <form
          onSubmit={handleSubmit}
          className='bg-white p-6 rounded-3xl shadow-md space-y-4'
        >

          <input
            type='text'
            name='serviceType'
            placeholder='Service Type'
            value={formData.serviceType}
            onChange={handleChange}
            className='w-full border p-4 rounded-xl'
          />

          <textarea
            rows='5'
            name='description'
            placeholder='Description'
            value={formData.description}
            onChange={handleChange}
            className='w-full border p-4 rounded-xl'
          />

          <button className='bg-blue-600 text-white px-6 py-3 rounded-xl'>
            Submit Request
          </button>

        </form>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

          {
            requests.map((item) => (

              <div
                key={item._id}
                className='bg-white p-6 rounded-3xl shadow-md'
              >

                <div className='flex items-center justify-between'>

                  <h2 className='text-xl font-semibold'>
                    {item.serviceType}
                  </h2>

                  <span className='bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm'>
                    {item.status}
                  </span>

                </div>

                <p className='mt-4 text-gray-600'>
                  {item.description}
                </p>

              </div>
            ))
          }

        </div>

      </div>

    </DashboardLayout>
  )
}

export default Maintenance