import TextInput from "../../../../../common/componets/Form/TextInput";
import Logo from "../../../../../accset/img/login.png";
import React, { useState } from "react";
import loadingGif from "../../../../../accset/img/loading1.gif";
import { useFormik } from "formik";
import { object, string } from "yup";
import axios from "axios"; // Import Axios
import './sytle.css'
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [loadDing, setLoadDing] = useState(false);
  const [onButton, setonButton] = useState(true);
  const navigate = useNavigate();

  const loginFrom = useFormik({
    initialValues: { username: "", pass: "" },
    onSubmit: async (values) => {
      const { username, pass } = values;
      setLoadDing(true);
      setonButton(false);

      try {
        const response = await axios.post("/login/", { // Gửi yêu cầu POST đến API login
          username:username,
          password: pass // Đặt tên biến password thay vì pass để phù hợp với API
        });

        const data = response.data;
        setLoadDing(false);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        navigate("/");
      } catch {
        alert("Đăng nhập thất bại ");
        setLoadDing(false);
        setonButton(true);
      }
    },
    validationSchema: object().shape({
      username: string()
        .required("Tên đăng nhập là bắt buộc")
        .min(3, "Tên đăng nhập phải có ít nhất 3 ký tự")
        .max(20, "Tên đăng nhập quá dài"),
      pass: string()
        .required("Mật khẩu là bắt buộc")
        .min(3, "Mật khẩu phải có ít nhất 3 ký tự")
        .max(8, "Mật khẩu đã quá ký tự"),
    }),
  });

  return (
    <div className="container">
      <img src={Logo} id="logo" alt="" />
      <form onSubmit={loginFrom.handleSubmit}>
        <div>
          <label className="titile">username</label>
          <TextInput
            type={"text"}
            placeholder={"Tên đăng nhập"}
            name="username"
            id={"username"}
            onChange={loginFrom.handleChange}
            value={loginFrom.values.username}
            error={loginFrom.errors.username}
          />
        </div>
        <div>
          <label className="titile">password</label>
          <TextInput
            type={"pass"} // Sửa type thành password để ẩn mật khẩu
            name="pass"
            placeholder={"Mật khẩu"}
            id={"pass"}
            onChange={loginFrom.handleChange}
            value={loginFrom.values.pass}
            error={loginFrom.errors.pass}
          />
        </div>
        <div className="btn-submit">
          {onButton && <button type={"submit"} id={"login"}>Đăng nhập</button>}
        </div>
      </form>
      <div>
        {loadDing && <img style={{ marginTop: "20px", backgroundImage: "none" }} src={loadingGif} alt="" id="loading" />}
      </div>
    </div>
  );
}
