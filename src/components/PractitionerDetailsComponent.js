import { useState } from 'react'
import {
  TextField,
  Paper,
  Chip,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material'
import PractitionerAddressComponent from './PractitionerAddressComponent'
const FormControl = ({ name, children }) => {
  return (
    <div style={styles.formControl}>
      <p style={styles.formText}>{name}</p>
      <div style={styles.formInput}>{children}</div>
    </div>
  )
}

function PractitionerDetailsComponent({ data, editable, handleChange }) {
  const [addresses, setAddresses] = useState([
    ...data.address.sort((a, b) => (a.isPrimary === 'true' ? -1 : 1)),
  ])
  const handleAddressChange = (index, name, value) => {
    let addrs = [...addresses]
    addrs[index] = {
      ...addrs[index],
      [name]: value,
    }
    setAddresses([...addrs])
  }
  return (
    <div style={styles.outer}>
      <Paper sx={styles.paper} elevation={3}>
        <div style={styles.aignment}>
          <FormControl name="NPI">
            <TextField
              size="small"
              value={data?.npi}
              name="npi"
              fullWidth
              disabled={!editable}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl name="First Name">
            <TextField
              size="small"
              value={data?.first_name}
              fullWidth
              name="first_name"
              disabled={!editable}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl name="Last Name">
            <TextField
              size="small"
              value={data?.last_name}
              fullWidth
              name="last_name"
              disabled={!editable}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl name="Gender">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="gender"
              value={data?.gender}
              onChange={handleChange}
              disabled={!editable}
            >
              <FormControlLabel
                value="f"
                control={<Radio />}
                label="Female"
                disabled={!editable}
              />
              <FormControlLabel
                value="m"
                control={<Radio />}
                label="Male"
                disabled={!editable}
              />
              <FormControlLabel
                value="o"
                control={<Radio />}
                label="Other"
                disabled={!editable}
              />
            </RadioGroup>
          </FormControl>

          <FormControl name="Credential">
            {data.credential.map((cred, index) => {
              return (
                <div style={styles.chipItem} key={index}>
                  <Chip
                    label={cred}
                    onDelete={editable ? undefined : undefined}
                  />
                </div>
              )
            })}
          </FormControl>

          <FormControl name="Specialties">
            {data.specialty.map((spec, index) => {
              return (
                <div style={styles.chipItem} key={index}>
                  <Chip
                    label={spec}
                    onDelete={editable ? undefined : undefined}
                  />
                </div>
              )
            })}
          </FormControl>

          <FormControl name="Addresses"></FormControl>
          {addresses
            .sort((a, b) => (a.isPrimary === 'true' ? -1 : 1))
            .map((addr, index) => {
              return (
                <PractitionerAddressComponent
                  key={index}
                  data={addr}
                  editable={editable}
                  handleAddressChange={handleAddressChange}
                  index={index}
                />
              )
            })}
        </div>
      </Paper>
    </div>
  )
}

export default PractitionerDetailsComponent

const styles = {
  outer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    padding: '50px',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  aignment:{
    width: '60%'
  },
  paper: {
    width: '100%',
    padding: '20px',
  },
  formControl: {
    display: 'flex',
    width: '100%',
    maxWidth: '1400px',
    padding: '20px 0',
  },
  formText: {
    width: '50%',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  formInput: {
    width: '50%',
  },
  chipItem: {
    marginRight: '5px',
    marginBottom: '1rem'
  },
  addressPaper: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    padding: '20px',
  },
}
