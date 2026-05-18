import API from '../utils/api'

export const addVisitor = async (
  formData
) => {

  const { data } = await API.post(
    '/visitors/add',
    formData
  )

  return data
}

export const getVisitors =
  async () => {

    const { data } = await API.get(
      '/visitors/all'
    )

    return data
  }

export const updateVisitorStatus =
  async (id, status) => {

    const { data } = await API.put(
      `/visitors/update/${id}`,
      { status }
    )

    return data
  }