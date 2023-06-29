import React, { useState } from "react";
import {
  Badge,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import * as colors from "@mui/material/colors";
import { AccountCircle, Notifications, Search } from "@mui/icons-material";

export default function Navbar(props) {
  const [notifications, setNotifications] = useState(0);
  const userDetails = props.userDetails;

  return (
    <Stack
      direction="row"
      alignItems="center"
      px={3}
      py={1}
      bgcolor={colors.indigo[50]}
    >
      {/* userdetails */}
      <AccountCircle fontSize="large" />
      <Stack className="ms-1">
        <Typography variant="h6" className="lh-1" color={colors.blue[900]}>
          {userDetails.username}
        </Typography>
        <Typography
          variant="caption"
          color={colors.yellow[800]}
          className="fw-medium"
        >
          {userDetails.email}
        </Typography>
      </Stack>

      <FormControl className="mx-auto">
        <InputLabel htmlFor="homeSearch" className="fs-6 fw-bold">
          Search
        </InputLabel>
        <OutlinedInput
          id="homeSearch"
          type="text"
          label="Search"
          size="medium"
          color="secondary"
          className="fs-6 fw-bold"
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button className="me-2">
        <Badge
          badgeContent={notifications === 0 ? undefined : notifications}
          color="error"
        >
          <Notifications fontSize="large" color="action" />
        </Badge>
      </Button>
      <Button variant="contained" color="error">
        Log Out
      </Button>
    </Stack>
  );
}
