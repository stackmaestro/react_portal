import React from 'react'
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material'

function PractitionerFilterComponent({ filters, setFilters, specialties }) {
  const handleFilterChange = (e) => {
    setFilters((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div style={styles.wrapper}>
      <TextField
        size="small"
        label="Search By First Name, Last Name, Zipcode"
        value={filters.text}
        sx={{ minWidth: '700px' }}
        name="text"
        onChange={handleFilterChange}
      />

      <FormControl sx={{ m: 1, minWidth: '300px' }} size="small">
        <InputLabel id="select-label">Specialty</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={filters.specialty}
          label="Specialty"
          name="specialty"
          onChange={handleFilterChange}
        >
          <MenuItem value="">None</MenuItem>
          {specialties?.length
            ? specialties.map((item, index) => {
                return (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                )
              })
            : null}
        </Select>
      </FormControl>
    </div>
  )
}

export default PractitionerFilterComponent

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    width: '100%',
  },
}
