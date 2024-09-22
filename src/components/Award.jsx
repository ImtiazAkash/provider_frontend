import { Button } from "antd";
import classes from "../styles/Awards.module.css";
import {
  CloseOutlined,
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  EditOutlined,
  PlusOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Awards() {
  const location = useLocation();
  const { provider } = location.state;
  const [modalVisible, setModalVisible] = useState(false);
  const [award, setAward] = useState({
    awardTitle: "",
    awardDescription: "",
    awardYear: "",
  });
  const [awardList, setAwardList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setAward({ awardTitle: "", awardDescription: "", awardYear: "" });
    setEditIndex(null);
  };

  const onAwardAdd = () => {
    if (award.awardTitle && award.awardDescription && award.awardYear) {
      if (editIndex !== null) {

        const updatedAwards = [...awardList];
        updatedAwards[editIndex] = award;
        setAwardList(updatedAwards);
        setEditIndex(null); 
      } else {

        setAwardList([...awardList, award]);
      }

      
      setAward({
        awardTitle: "",
        awardDescription: "",
        awardYear: "",
      });
      closeModal();
    }
  };

  const onEdit = (award, index) => {
    setAward(award);
    setEditIndex(index);
    showModal();
  };

  const submitAwards = async () => {
    let token = sessionStorage.getItem("jwtToken");
    try {
      const response = await axios.post(
        `http://localhost:8080/${provider.providerId}/replace-awards`,
        awardList,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
        }
      );

      if (response.status === 200) {
        console.log("Awards added successfully:", response.data);
      } else {
        console.error("Failed to add awards");
      }
    } catch (error) {
      console.error("Error while adding awards:", error);
    }
  };

  const fetchData = async () => {
    let token = sessionStorage.getItem("jwtToken");
    try {
      const response = await axios.get(
        `http://localhost:8080/${provider.providerId}/get-awards-by-providerId`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      setAwardList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={classes.awardContainer}>
        <div className={classes.awardHeader}>
          <h3>Awards and Recognition</h3>
          <button onClick={showModal}>
            <PlusOutlined /> Add New
          </button>
        </div>

        <div className={`modal ${modalVisible ? "show" : "hide"}`}>
          <div className="modal-content">
            <div style={{ textAlign: "right" }}>
              <Button type="text" onClick={closeModal}>
                <CloseOutlined />
              </Button>
            </div>
            <div className="input_field">
              <label htmlFor="">Award Title</label>
              <input
                type="text"
                placeholder="Title"
                value={award.awardTitle}
                onChange={(e) =>
                  setAward({ ...award, awardTitle: e.target.value })
                }
              />
            </div>
            <div className="input_field">
              <label htmlFor="">Award Description</label>
              <textarea
                name=""
                id=""
                placeholder="Description"
                rows={8}
                cols={12}
                value={award.awardDescription}
                onChange={(e) =>
                  setAward({ ...award, awardDescription: e.target.value })
                }
              ></textarea>
            </div>
            <div className={classes.bottomInputs}>
              <div className="input_field">
                <label htmlFor="">Award Year</label>
                <input
                  type="number"
                  placeholder="Year"
                  value={award.awardYear}
                  onChange={(e) =>
                    setAward({ ...award, awardYear: e.target.value })
                  }
                />
              </div>
              <button onClick={onAwardAdd}>
                {editIndex !== null ? "Update Award" : "Add Award"}
              </button>
            </div>
          </div>
        </div>

        <div className={classes.awardList}>
          {awardList.length > 0 ? (
            awardList.map((award, index) => (
              <div key={index} className={classes.awardItem}>
                <div style={{ display: "flex" }}>
                  <TrophyOutlined style={{ fontSize: "6rem" }} />
                  <hr />
                </div>
                <div>
                  <h4>{award.awardTitle}</h4>
                  <p>{award.awardDescription}</p>
                  <h5>Year - {award.awardYear}</h5>
                </div>
                <div
                  style={{ display: "flex", gap: "1rem", marginLeft: "auto" }}
                >
                  <EditFilled
                    style={{ fontSize: "1.5rem" }}
                    onClick={() => onEdit(award, index)}
                  />{" "}
                  <DeleteFilled
                    style={{ fontSize: "1.5rem" }}
                    onClick={() =>
                      setAwardList(awardList.filter((_, i) => i !== index))
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No awards added yet.</p>
          )}
        </div>
      </div>
      <div className={classes.bottomButtons}>
        <button style={{ backgroundColor: "#ffffff", color: "#000000" }}>
          Cancel
        </button>
        <button onClick={submitAwards}>Save Changes</button>
      </div>
    </>
  );
}
