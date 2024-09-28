import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, Button, Card, Typography, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong!");
    }
  };

  return (
    <div className="form-container">
      <Card
        className="register-card"
        bordered={false}
        style={{
          maxWidth: 400,
          margin: "0 auto",
          padding: "30px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <Title level={3} className="text-center" style={{ marginBottom: "30px" }}>
          Create Your Account
        </Title>

        <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter your name"
              size="large"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Enter your email"
              type="email"
              size="large"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Enter your password"
              size="large"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            style={{ borderRadius: "8px", marginTop: "10px" }}
          >
            Register
          </Button>
        </Form>

        <Text className="text-center" style={{ display: "block", marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1890ff" }}>
            Login here
          </Link>
        </Text>
      </Card>
    </div>
  );
};

export default Register;
