import React, { useState } from "react";
import classes from "../styles/Provider.module.css";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const data = [
  {
    name: "X Hair Transplant",
    email: "xhairtransplant@gmail.com",
    phone: "+90xxxxxxxx",
    address: "Istanbul, Turkey",
    staff: 50,
    rating: 4.8,
  },
  {
    name: "Y Clinic",
    email: "yclinic@gmail.com",
    phone: "+90xxxxxxxx",
    address: "Ankara, Turkey",
    staff: 40,
    rating: 4.6,
  },
  {
    name: "Z Hair Clinic",
    email: "zhairclinic@gmail.com",
    phone: "+90xxxxxxxx",
    address: "Izmir, Turkey",
    staff: 45,
    rating: 4.7,
  },
  // Add more data for the pagination
];

export default function Provider() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [itemsPerPage, setItemsPerPage] = useState(10); // Track items per page

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Slice data for the current page
  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page change
  };

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle "Next" button click
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const addNewProvider = () => {
    navigate("/add-provider");
  };

  return (
    <>
      <div className={classes.header}>
        <h1>Providers</h1>
        <button onClick={addNewProvider}>
          {" "}
          <PlusOutlined /> Add New Providers
        </button>
      </div>
      <div className={classes.table_container}>
        <div className={classes.provider_upper_row}>
          <div className={classes.select_row_count}>
            <p>Show</p>
            <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
          <div className={classes.search_form}>
            <input type="text" placeholder="Search Here" />
          </div>
          <div className={classes.select_role}>
            <select>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>

        <div className={classes.tableBox}>
          <table>
            <thead>
              <tr>
                <th>Provider Name</th>
                <th>Email Address</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Staff</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{item.staff}</td>
                  <td>{item.rating}</td>
                  <td>Action</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className={classes.pagination_controls}>
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
              className={currentPage === index + 1 ? classes.active : ""}
            >
              {index + 1}
            </button>
          ))}

          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
