import { useSelector } from "react-redux";
import useUserActions from "../hooks/useReduxActions";
import { useEffect } from "react";
import { persistor } from "../redux/store";
import { useNavigate } from "react-router-dom";
// import axiosInstance from '../hooks/axiosConfig';
export default function Logout() {
  const { logout } = useUserActions();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  useEffect(() => {
    // localStorage.removeItem('google_access_token');
    logout();
    persistor.purge();
    // axios.defaults.headers.common['Authorization'] = null;
    //       const logoutr = async () => {
    // 	 try {
    // 	    await axiosInstance.delete('api/logout', {
    // 	       data: { id: user._id },
    // 	    });
    // 	 } catch (err) {
    // 	    console.log(err);
    // 	 }
    //       };
    //       logoutr();
    navigate("/signin");
  }, []);
  return null;
}
