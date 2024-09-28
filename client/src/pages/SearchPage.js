import { useState, useEffect } from "react";
import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios"; // For making API calls
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom"; // For navigation

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [doctorsData, setDoctorsData] = useState([]);
  const navigate = useNavigate(); // Use navigate for redirection

  // Fetch doctors data from backend API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/api/v1/user/getAllDoctors");
        setDoctorsData(response.data.data); // Assuming response data structure
      } catch (error) {
        console.error("Error fetching doctors data", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // Filter data based on the search value
  const filteredData = doctorsData
    .filter(
      (doctor) =>
        doctor.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        doctor.specialization
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        doctor.phone.includes(searchValue)
    )
    .sort((a, b) => {
      const searchTerm = searchValue.toLowerCase();
      const aMatch =
        a.firstName.toLowerCase().startsWith(searchTerm) ||
        a.lastName.toLowerCase().startsWith(searchTerm) ||
        a.specialization.toLowerCase().startsWith(searchTerm);

      const bMatch =
        b.firstName.toLowerCase().startsWith(searchTerm) ||
        b.lastName.toLowerCase().startsWith(searchTerm) ||
        b.specialization.toLowerCase().startsWith(searchTerm);

      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });

  const handleChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  // Define columns for the table
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
      sorter: (a, b) => a.specialization.localeCompare(b.specialization),
    },
    {
      title: "Experience",
      dataIndex: "experience",
      key: "experience",
      sorter: (a, b) => a.experience - b.experience,
    },
    {
      title: "Fees Per Consultation",
      dataIndex: "feesPerCunsaltation",
      key: "feesPerCunsaltation",
      sorter: (a, b) => a.feesPerCunsaltation - b.feesPerCunsaltation,
    },
  ];

  // Handle row click to redirect to booking page
  const onRowClick = (record) => {
    // Redirect to booking page with the doctor's ID (or any unique identifier like email)
    navigate(`/doctor/book-appointment/${record._id}`, { state: { doctor: record } });
  };

  return (
    <>
      <Layout>
        <div className="container mt-3 px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-center m-2 text-3xl">Find Doctor</h1>
          <div className="mb-6">
            <Input
              placeholder="Search by Name, Specialization, or Phone"
              value={searchValue}
              onChange={handleSearch}
              className="border-2 border-sky-300 rounded-lg h-10 w-full"
            />
          </div>
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: filteredData.length,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20"],
              }}
              onChange={handleChange}
              rowKey="_id" // Assuming '_id' is unique, else use another unique field
              className="w-full"
              scroll={{ x: true }}
              onRow={(record) => {
                return {
                  onClick: () => onRowClick(record), // Call the row click handler
                };
              }}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default App;
