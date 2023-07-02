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
  const [notifications, setNotifications] = useState(10);
  const userDetails = props.userDetails;

  return (
    <Stack
      direction="row"
      alignItems="center"
      px={3}
      py={1}
      bgcolor={colors.indigo[900]}
    >
      {/* userdetails */}
      <AccountCircle fontSize="large" color="warning" />
      <Stack className="ms-1">
        <Typography variant="h6" className="lh-1" color={colors.common.white}>
          {userDetails.username}
        </Typography>
        <Typography
          variant="caption"
          color={colors.cyan[100]}
          className="fw-medium"
        >
          {userDetails.email}
        </Typography>
      </Stack>

      <FormControl className="mx-auto w-25">
        <InputLabel
          htmlFor="homeSearch"
          size="small"
          className="fs-6 fw-bold text-info"
        >
          Search
        </InputLabel>
        <OutlinedInput
          id="homeSearch"
          type="text"
          label="Search"
          size="small"
          color="info"
          className="fs-6 fw-bold"
          sx={{ color: colors.blueGrey[200] }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton color="info">
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <IconButton className="me-3">
        <Badge
          badgeContent={notifications === 0 ? undefined : notifications}
          color="primary"
        >
          <Notifications fontSize="medium" className="text-warning" />
        </Badge>
      </IconButton>
      <Button variant="contained" color="error">
        Log Out
      </Button>
    </Stack>
  );
}
