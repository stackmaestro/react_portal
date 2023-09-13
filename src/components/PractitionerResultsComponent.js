import {useState, useEffect} from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import Badge from '@mui/material/Badge';
import { useNavigate } from 'react-router-dom'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#0d2244',
    color: theme.palette.common.white,
    width: '33%'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export default function PractitionerResultsComponent({ data,filters }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(()=>{
    setPage(0)
  },[filters])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleClick = (event, row, index,mode) => {
    navigate(`/practitionerSearch/${row.npi}/${mode}`)
  }

  let rows = []
  if (data.length) {
    rows = data.map((item) => {
      const address = item.address.find((add) => add.isPrimary)
      return {
        address: address.addr1 + ' ' + address.addr2,
        name: item.first_name + ' ' + item.last_name,
        specialty: item.specialty,
        npi: item.npi,
      }
    })
  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Specialty</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.length
              ? rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,index) => (
                    <StyledTableRow
                      key={row.name}
                      onClick={(event) => handleClick(event, row, index,'view')}
                      hover
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell>{row.address}</StyledTableCell>
                      <StyledTableCell>{row.specialty[0]}{row.specialty.length > 1 ? <Badge color='primary' sx={styles.badge} badgeContent={row.specialty.length}/> : null}</StyledTableCell>
                    </StyledTableRow>
                  ))
              : null}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: ( 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

const styles={
  badge:{
    marginLeft: '15px'
  }
}