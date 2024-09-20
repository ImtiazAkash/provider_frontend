import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import classes from "../styles/Language.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Language() {
  const location = useLocation();
  const { provider } = location.state;
  const [language, setLanguage] = useState("");
  const [languageList, setLanguageList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const addLanguage = () => {
    if(languageList.find(lang => lang ===language)) {
        alert('Language already exists');
        return;
    }
    if (language.trim()) {
      setLanguageList([...languageList, language]);
      setLanguage("");
      setSearchResults([]);
    }
  };

  const handleSearch = async (value) => {
    setLanguage(value);

    if (value.trim()) {
      try {
        let token = sessionStorage.getItem("jwtToken");
        const response = await axios.get(
          `http://localhost:8080/languages/${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const submitLanguages = async () => {
    let token = sessionStorage.getItem("jwtToken");
    try {
      const response = await axios.post(
        `http://localhost:8080/${provider.providerId}/add-languages`,
        languageList,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Rewards added successfully!")
        console.log("Languages added successfully:", response.data);
      } else {
        console.error("Failed to add languages");
      }
    } catch (error) {
      console.error("Error while adding languages:", error);
    }
  };

  const fetchData = async () => {
    let token = sessionStorage.getItem("jwtToken");
    try {
      const response = await axios.get(
        `http://localhost:8080/${provider.providerId}/get-language-by-providerId`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      setLanguageList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={classes.languageContainer}>
        <h1>Language</h1>
        <h5>Add Language</h5>
        <Input
          style={{ width: "23rem" }}
          type="text"
          placeholder="Search Language"
          value={language}
          onChange={(e) => handleSearch(e.target.value)}
          suffix={
            <Button type="text" icon={<PlusOutlined />} onClick={addLanguage} />
          }
         
        />

        {searchResults.length > 0 && (
          <div className={classes.dropdown}>
            {searchResults.map((lang, index) => (
              <div
                key={index}
                className={classes.dropdownItem}
                onClick={() => {
                  setLanguage(lang);
                  setSearchResults([])
                }}
              >
                {lang}
              </div>
            ))}
          </div>
        )}

        <div className={classes.languageList}>
          {languageList.map((lang, index) => (
            <div key={index} className={classes.languageItem}>
              <Button
                type="default"
                icon={<CloseOutlined />}
                iconPosition="end"
                onClick={() =>
                  setLanguageList(languageList.filter((item) => item !== lang))
                }
              >
                {lang}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.bottomButtons}>
        <button style={{backgroundColor: "#ffffff", color: "#000000"}}>Cancel</button>
        <button onClick={submitLanguages}>Save Changes</button>
      </div>
    </>
  );
}
