
import axiosClient from "./axiosClient";



const login = (username, password) => {
  return axiosClient.post(
    "/login/",
      {
        username,
        password
      }
  )
}

const authService = {
  login: login
}


export default authService

