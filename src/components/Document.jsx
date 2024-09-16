import React, { useState } from "react";

import classes from "../styles/Document.module.css";
import { useOutletContext } from "react-router-dom";

function Document() {
  const { updatedocumentData } = useOutletContext();
  const [documentData, setDocumentData] = useState({ documentFile: "" });

  return (
    <div className="document-uploader">
      <h2>Documents</h2>
      <p>Upload your documents like insurance and licenses</p>
      <div className={classes.form_group}>
        <label htmlFor="file">Upload File:</label>
        <input
          type="file"
          id="file"
          name="file"
          
          onChange={(e) => {
            const newValue = e.target.files[0];
            setDocumentData((prev) => {
              const updatedDocumentData = { ...prev, documentFile: newValue };
              updatedocumentData(updatedDocumentData);
              return updatedDocumentData;
            });
          }}
        />
      </div>
    </div>
  );
}

export default Document;
