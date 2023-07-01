import React from "react";
import { TextField } from "@mui/material";

export default function CreateProject() {
  return (
    <form className="mx-auto py-2">
      <TextField
        type="text"
        id="projectName"
        name="projectName"
        label="Project Name"
        inputProps={{ className: "fs-6 fw-bold" }}
        InputLabelProps={{ className: "fs-6 fw-bold" }}
      />
    </form>
  );
}
