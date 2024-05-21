export const getHeaderToken = ()=>{
    return {
        Authorization: localStorage.getItem("token")
    }
}