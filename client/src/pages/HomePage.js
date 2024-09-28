import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row, Col, Spin } from "antd";
import DoctorList from "../components/DoctorList";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ marginTop: '50px' }}> {/* Add top margin here */}
          <Row gutter={[16, 16]}> 
            {doctors.map((doctor) => (
              <Col span={8} key={doctor._id}>
                <DoctorList doctor={doctor} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
