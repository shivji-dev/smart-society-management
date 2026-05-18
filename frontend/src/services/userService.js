import API from './api'

export const getAllUsers =
  async () => {

    const { data } = await API.get(
      '/users/all'
    )

    return data
  }

export const createGuard =
  async (formData) => {

    const { data } = await API.post(
      '/users/create-guard',
      formData
    )

    return data
  }