import { styled, TableRow } from "@mui/material";

const TableRowStyled = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last th": {
    border: 0,
  },
}));
function StyledTableRow({ children }) {
  return <TableRowStyled>{children}</TableRowStyled>;
}

export default StyledTableRow;
