import axios from "axios";

export const getAdoptionRequests =(userId) => async (dispatch) => {
    try {
 
      dispatch({ type: "PET_ADOPTION_REQUESTS_REQUEST" });
      const userInfo =JSON.parse(window.localStorage.getItem("userInfo"))
  
  
      const header = {
        headers: {
          Authorization: userInfo.token 
        }
      }
        const {data} = await axios.get(`/api/admin/adoptpet/${userId}`,header);
        const requestsData  = data?data:[];
 

  
      dispatch({
        type: "PET_ADOPTION_REQUESTS_SUCCESS",
        payload: requestsData,})
    } catch (error) {
      dispatch({
        type: "PET_ADOPTION_REQUESTS_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };