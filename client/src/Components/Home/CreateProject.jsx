import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, TextField } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { postToNodeServer } from "../../utils";

export default function CreateProject() {
  const [description, setDescription] = useState("");
  const userDetails = useOutletContext();

  const modules = {
    clipboard: {
      matchVisual: false,
    },
    toolbar: [
      ["bold", "italic", "underline", "strike", "code-block", "link"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "code-block",
    "link",
    "header",
    "list",
    "indent",
    "color",
    "background",
    "font",
    "align",
  ];

  const handleChange = (html) => {
    setDescription(html);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const projectDetails = {
      projectName: document.getElementById("projectName").value,
      projectDescription: description,
      owner: userDetails.username,
    };
    const res = await postToNodeServer(
      "/project/createProject",
      projectDetails
    );
  };

  return (
    <form className="mx-auto d-flex flex-column py-4" onSubmit={onSubmit}>
      <TextField
        type="text"
        id="projectName"
        name="projectName"
        label="Project Name"
        inputProps={{ className: "fs-6 fw-bold" }}
        InputLabelProps={{ className: "fs-6 fw-bold" }}
        margin="dense"
        autoFocus
        autoComplete="off"
        required
      />
      <ReactQuill
        theme="snow"
        onChange={handleChange}
        value={description}
        modules={modules}
        formats={formats}
        placeholder={"Add project description(optional)"}
        className="fw-medium flex-fill"
        scrollingContainer=".ql-editor"
      />
      <Button type="submit" variant="contained" color="info" sx={{ mt: 6 }}>
        Submit
      </Button>
    </form>
  );
}
