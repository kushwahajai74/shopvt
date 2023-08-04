import React, { useState, useEffect } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import "./ForgotPassword.css";
import { toast } from "react-hot-toast";
import MetaData from "../layouts/MetaData";
import {
  clearErrors,
  forgotPassword,
  forgotReset,
} from "../../features/user/forgotPasswordSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { error, message, isLoading } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(forgotReset());
    }
  }, [dispatch, error, message]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
