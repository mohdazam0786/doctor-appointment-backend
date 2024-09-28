import React from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker, message, Typography, Button, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";
import doctorImage from "./../assessts/doctor.png"; // Adjust the path to your image
import '../styles/LayoutStyles.css'

const { Title } = Typography;

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <div style={{ textAlign: "center", margin: "40px 0" }}>
        <Title level={2}>Apply as a Doctor</Title>
      </div>
      <Row gutter={20} style={{ padding: "20px" }}>
        <Col xs={24} md={12}>
          <Card
            style={{
              padding: "30px",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}
          >
            <Form layout="vertical" onFinish={handleFinish} className="formy">
              <h4 style={{ marginBottom: "20px" }}>Personal Details:</h4>
              <Row gutter={20}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: "Please enter your first name" }]}
                  >
                    <Input placeholder="Your first name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: "Please enter your last name" }]}
                  >
                    <Input placeholder="Your last name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Phone No"
                    name="phone"
                    rules={[{ required: true, message: "Please enter your contact number" }]}
                  >
                    <Input placeholder="Your contact number" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
                  >
                    <Input placeholder="Your email address" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Website" name="website">
                    <Input placeholder="Your website (optional)" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "Please enter your clinic address" }]}
                  >
                    <Input placeholder="Your clinic address" />
                  </Form.Item>
                </Col>
              </Row>

              <h4 style={{ margin: "30px 0 20px" }}>Professional Details:</h4>
              <Row gutter={20}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Specialization"
                    name="specialization"
                    rules={[{ required: true, message: "Please enter your specialization" }]}
                  >
                    <Input placeholder="Your specialization" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Experience"
                    name="experience"
                    rules={[{ required: true, message: "Please enter your experience in years" }]}
                  >
                    <Input placeholder="Your experience in years" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label="Fees Per Consultation"
                    name="feesPerConsultation"
                    rules={[{ required: true, message: "Please enter your fees" }]}
                  >
                    <Input placeholder="Your fees per consultation" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Timings" name="timings" rules={[{ required: true, message: "Please select your available timings" }]}>
                    <TimePicker.RangePicker format="HH:mm" style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

              {/* Submit Button */}
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Button type="primary" htmlType="submit" style={{ padding: "0 40px" }}>
                  Submit
                </Button>
              </div>
            </Form>
          </Card>
        </Col>

        {/* Right Column for Image */}
        <Col xs={24} md={12}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <img src={doctorImage} alt="Doctor" style={{ width: "100%", maxWidth: "700px", borderRadius: "100px" }} />
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default ApplyDoctor;
