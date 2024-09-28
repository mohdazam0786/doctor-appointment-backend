import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Tag, Divider } from "antd";
import { UserOutlined, ClockCircleOutlined, DollarOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        backgroundColor: '#dcfce7',
      }}
      bodyStyle={{ padding: "20px" }}
    >
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <Title level={4}>Dr. {doctor.firstName} {doctor.lastName}</Title>
        <Text type="secondary">{doctor.specialization}</Text>
      </div>

      <Divider />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Text>
            <UserOutlined style={{ marginRight: "8px" }} />
            <b>Experience:</b><br></br> {doctor.experience}
          </Text>
        </div>
        <div>
          <Text>
            <DollarOutlined style={{ marginRight: "8px" }} />
            <b>Consultation Fee:</b><br></br> ₹{doctor.feesPerCunsaltation}
          </Text>
        </div>
      </div>

      <Divider />

      <div style={{ textAlign: "center" }}>
        <Tag icon={<ClockCircleOutlined />} color="blue">
          {doctor.timings[0]} - {doctor.timings[1]}
        </Tag>
      </div>
    </Card>
  );
};

export default DoctorList;
