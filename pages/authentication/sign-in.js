// Import node module libraries
import { useState, useEffect } from "react"; // Thêm useState và useEffect
import { Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Link from "next/link";
import Cookies from "js-cookie"; // Import thư viện js-cookie

import { callLoginAdmin } from "../../lib/api";

import AuthLayout from "layouts/AuthLayout";

const SignIn = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null); // State cho lỗi
  const [rememberMe, setRememberMe] = useState(false); // State cho "Remember me"

  // Load email và password từ localStorage nếu có
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const remember = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && remember) {
      setCredentials({ email: savedEmail, password: savedPassword });
      setRememberMe(remember);
    }
  }, []);
  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem("email", credentials.email);
      localStorage.setItem("password", credentials.password);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }
  }, [rememberMe]);
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang

    try {
      const response = await callLoginAdmin(
        credentials.email,
        credentials.password
      );

      if (response && response.token) {
        localStorage.setItem("token", response.token);

        Cookies.set("infoUser", JSON.stringify(response.data.user), {
          expires: 1,
        }); // Cookie sẽ hết hạn sau 1 ngày (expires: 1)

        window.location.href = "/";
      } else {
        console.error("Đăng nhập thất bại. Không có token trong phản hồi.");
      }
    } catch (error) {
      // Lưu thông báo lỗi nếu có
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target; // Lấy name và value từ event
    setCredentials((prev) => ({
      ...prev,
      [name]: value, // Cập nhật giá trị tương ứng
    }));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked); // Cập nhật trạng thái "Remember me"
  };
  console.log(rememberMe);

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/">
                <Image
                  src="/images/brand/logo/logo-primary.svg"
                  className="mb-2"
                  alt=""
                />
              </Link>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            <Form onSubmit={handleSubmit}>
              {/* Email */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email" // Đặt name cho input
                  placeholder="Enter your email address here"
                  value={credentials.email} // Liên kết với state
                  onChange={handleChange} // Cập nhật state
                  required
                />
              </Form.Group>
              {/* Password */}
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password" // Đặt name cho input
                  placeholder="**************"
                  value={credentials.password} // Liên kết với state
                  onChange={handleChange} // Cập nhật state
                  required
                />
              </Form.Group>
              {/* Checkbox */}
              <div className="d-lg-flex justify-content-between align-items-center mb-4">
                <Form.Check
                  type="checkbox"
                  id="rememberme"
                  // Gọi hàm cập nhật khi checkbox thay đổi
                >
                  <Form.Check.Input
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    type="checkbox"
                  />
                  <Form.Check.Label>Remember me</Form.Check.Label>
                </Form.Check>
              </div>
              <div>
                {/* Button */}
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Sign In
                  </Button>
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}{" "}
                {/* Hiện thông báo lỗi nếu có */}
                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/authentication/sign-up" className="fs-5">
                      Create An Account{" "}
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/authentication/forget-password"
                      className="text-inherit fs-5"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

SignIn.Layout = AuthLayout;

export default SignIn;
