import axios from "../config/axios";
import cookies from "universal-cookie";

const cookie = new cookies();

export const onLoginClick = (user, pass) => {
  return async dispatch => {
    try {
      const res = await axios.post("/users/login", {
        username: user,
        password: pass
      });
      let users = res.data;
      
      if (users !==501 && users !==503) {
          console.log(users);
          console.log("login sukses");
            
        cookie.set("masihLogin", res.data.cust_username, { path: "/" });
        cookie.set("tipeUser", res.data.cust_type, { path: "/" });

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            id: res.data.customer_id,
            username: res.data.cust_username,
            userStat: res.data.cust_type
          }
        });
      } 
      else if(users !==501){
          console.log('Username/Password wrong');     
      }
      else {
          console.log('belum terdaftar');
      }
      
    } catch (e) {
      console.log(e);
    }
  };
};

export const onRegisterUser = (firstname,lastname,username,email,password) => {
  return dispatch => {
    axios.post("/users", {
        cust_firstname: firstname,
        cust_lastname: lastname,
        cust_username: username,
        cust_email: email,
        cust_password: password
      })
      .then(res => {
        dispatch({
          type: "AUTH_SUCCESS",
          payload: "Registered Successfully"
        });
      });
  };
};

export const onLogoutUser = () => {
  cookie.remove("masihLogin");
  cookie.remove("tipeUser");
  // karena action creator mereturn object, maka tidak perlu menggunakan dispatch
  return {
    type: "LOGOUT"
  };
};

//Stay login
export const keepLogin = (user, tipe) => {
  return dispatch => {
    axios
      .get("/users/username", {
        params: {
          username: user
        }
      })
      .then(res => {
        if (res.data.length > 0) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { username: user, userStat: tipe }
          });
        }
      });
  };
};
