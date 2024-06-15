import { styled } from "@mui/system";
import { Box, Card, Avatar } from "@mui/material";

export const Root = styled("div")({
  // display: 'flex',
  // backgroundColor: 'rgb(207 223 255)',
});

export const Content = styled(Box)(({ theme }) => ({
  marginTop: "0px",
  marginLeft: "0px",
  marginRight: "0px",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  minHeight: "100vh",
  padding: "20px",
  [theme.breakpoints.down("md")]: {
    marginLeft: "0px",
    padding: "10px",
  },
}));

export const ProfileCard = styled(Card)({
  width: "100%",
  padding: "20px",
  textAlign: "center",
  height: "640px",
});

export const ProfileAvatar = styled(Avatar)({
  width: "100px",
  height: "100px",
  marginBottom: "20px",
});

export const OrderTrackingCard = styled(Card)({
  width: "100%",
  padding: "20px",
  textAlign: "center",
  height: "640px",
});

export const SummaryCard = styled(Card)({
  width: "100%",
  padding: "20px",
  textAlign: "center",
  marginTop: "20px",
});
