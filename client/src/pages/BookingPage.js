import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  DatePicker,
  message,
  TimePicker,
  Card,
  Typography,
  Button,
  Space,
  Row,
  Col,
} from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import bookdoctor from "../assessts/bookdoctor.png";

const { Title, Text } = Typography;

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(); // Ensure it's defined
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  // Fetch doctor data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle availability check
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // Handle booking
  const handleBooking = async () => {
    if (!date || !time) {
      return message.error("Date and time are required!");
    }
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date,
          time,
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
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div className="booking-page-container" style={{ padding: "30px", marginTop: "20px" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Book an Appointment
        </Title>
        <Row gutter={[20, 20]} justify="center">
          {/* Left column for image */}
          <Col xs={24} md={12} style={{ textAlign: "center" }}>
            <img
              src={bookdoctor} // Replace with your actual image path
              alt="Doctor"
              style={{
                maxWidth: "100%",
                borderRadius: "10px",
                height: "100vh",
                marginLeft: "180px",
              }}
            />
          </Col>

          {/* Right column for the booking form */}
          <Col xs={24} md={12}>
            <Card
              hoverable
              bordered={false}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                margin: "20px",
                backgroundColor: '#dcfce7',
              }}
            >
              {doctors && (
                <div>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    <Title level={4}>
                      Dr. {doctors.firstName} {doctors.lastName}
                    </Title>
                    <Text type="secondary">
                      Fees: ₹{doctors.feesPerCunsaltation}
                    </Text>
                    <Text type="secondary">
                      Timings: {doctors.timings && doctors.timings[0]} -{" "}
                      {doctors.timings && doctors.timings[1]}
                    </Text>

                    <DatePicker
                      className="m-2"
                      format="DD-MM-YYYY"
                      onChange={(value) => {
                        const selectedDate = moment(value).format("DD-MM-YYYY");
                        setDate(selectedDate);
                        console.log("Selected Date:", selectedDate); // Debugging
                      }}
                      style={{ width: "100%" }}
                      placeholder="Select Date"
                    />
                    <TimePicker
                      className="mt-3"
                      format="HH:mm"
                      onChange={(value) => {
                        if (value) {
                          const formattedTime = moment(value).format("HH:mm");
                          setTime(formattedTime); // Ensure the value is properly set
                          console.log("Selected Time:", formattedTime); // Debugging
                        } else {
                          setTime(null); // Clear the time if no value is selected
                        }
                      }}
                      style={{ width: "100%" }}
                      placeholder="Select Time"
                    />

                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                      <Button
                        type="primary"
                        size="large"
                        style={{ marginBottom: "10px", width: "100%" }}
                        onClick={handleAvailability}
                      >
                        Check Availability
                      </Button>

                      <Button
                        type="default"
                        size="large"
                        style={{ width: "100%" }}
                        onClick={handleBooking}
                      >
                        Book Now
                      </Button>
                    </div>
                  </Space>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default BookingPage;
