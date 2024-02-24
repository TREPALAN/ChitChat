import axios from "axios";
import Cookies from "universal-cookie";
import refresh from "../../../server/routes/refresh";

const cookies = new Cookies();
// Handle refresh token
let refresh = false;
axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      const response = await axios.post(
        "http://localhost:8000/refresh/",
        {
          refreshToken: cookies.get("refresh_token"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        cookies.set("token", response.data.token);
        cookies.set("refresh_token", response.data.refreshToken);
        return axios(error.config);
        refresh = false;
      }
    }
    return error;
  }
);
