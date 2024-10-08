import React, { useState, useEffect } from "react";
import classes from "../styles/Provider.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  DeleteFilled,
  EditFilled,
  EyeFilled,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";

export default function Provider() {
  const navigate = useNavigate();

  const [data, setData] = useState([{}]); 
  const [filteredData, setFilteredData] = useState([{}]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const [totalPages, setTotalPages] = useState(0); 
  const [loading, setLoading] = useState(false); 
  const [sortBy, setSortBy] = useState("providerName"); 
  const [sortDir, setSortDir] = useState("asc"); 
  const [searchTerm, setSearchTerm] = useState(""); 

 
  const fetchData = async () => {
    let token = sessionStorage.getItem("jwtToken");
    setLoading(true); 

    try {
      const response = await axios.get(
        `http://localhost:8080/get-all-providers?pageNumber=${currentPage}&pageSize=${itemsPerPage}&sortBy=${sortBy}&sortDir=${sortDir}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setData(data.providers); 
      setFilteredData(data.providers); 
      setTotalPages(data.totalPages); 
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); 
    }
  };

 
  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, sortBy, sortDir]);


  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data); 
    } else {
      const filtered = data.filter(
        (item) =>
          item.providerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);


  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); 
  };


  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  const addNewProvider = () => {
    navigate("/add-provider");
  };

  return (
    <>
      <div className={classes.header}>
        <h1>Providers</h1>
        <button onClick={addNewProvider}>
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
            <Input
              prefix={<SearchOutlined />}
              type="text"
              placeholder="Search Here"
              value={searchTerm}
              onChange={handleSearchChange} // Trigger search on input change
            />
          </div>
        </div>

        <div className={classes.tableBox}>
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("providerName")}>
                  Provider Name{" "}
                  {sortBy === "providerName" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("email")}>
                  Email Address{" "}
                  {sortBy === "email" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("phone")}>
                  Phone {sortBy === "phone" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("address")}>
                  Address{" "}
                  {sortBy === "address" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("staff")}>
                  Staff {sortBy === "staff" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("rating")}>
                  Rating{" "}
                  {sortBy === "rating" && (sortDir === "asc" ? "↑" : "↓")}
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7">Loading...</td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.providerName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      {item.city}, {item.country}
                    </td>
                    <td>80</td>
                    <td>{item.rating}</td>
                    <td>
                      <Button type="text" icon={<EyeFilled />} />{" "}
                      <Button
                        type="text"
                        icon={<EditFilled />}
                        onClick={() => {
                          let index = data.findIndex(data =>data.providerId === item.providerId);
                          navigate("/edit-provider", {
                            state: { provider: data[index]},
                          });
                        }}
                      />{" "}
                      <Button type="text" icon={<DeleteFilled />} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className={classes.pagination_controls}>
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            <LeftOutlined />
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
            <RightOutlined />
          </button>
        </div>
      </div>
    </>
  );
}
