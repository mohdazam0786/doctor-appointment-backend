import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table, Typography, Spin, Empty } from "antd";

const { Title } = Typography;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    // {
    //   title: "Doctor Name",
    //   dataIndex: "doctorInfo",
    //   key: "doctorInfo",
    //   render: (doctorInfo) => (
    //     <span>
    //       {doctorInfo.firstName} {doctorInfo.lastName}
    //     </span>
    //   ),
    // },
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <Layout>
      <div style={{ padding: "50px" }}>
        <Title level={2}>Your Appointments</Title>
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Spin size="large" />
          </div>
        ) : appointments.length > 0 ? (
          <Table
            columns={columns}
            dataSource={appointments}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
            bordered
          />
        ) : (
          <Empty description="No appointments found" />
        )}
      </div>
    </Layout>
  );
};

export default Appointments;
