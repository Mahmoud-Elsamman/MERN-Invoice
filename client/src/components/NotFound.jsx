import { Container, Box, Typography } from "@mui/material";
import { FaSadTear, FaHeartBroken } from "react-icons/fa";
function Notfound() {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          height: "94vh",
        }}
      >
        <Typography
          variant='h1'
          align='center'
          sx={{ fontSize: "10rem", mt: "14rem" }}
        >
          404 Not Found
        </Typography>
        <Box>
          <FaHeartBroken className='broken-heart' />
          <FaSadTear className='sad-tear' />
        </Box>
      </Box>
    </Container>
  );
}

export default Notfound;
