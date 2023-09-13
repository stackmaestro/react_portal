import { TextField } from '@mui/material'

function PractitionerAddressComponent({index, data, editable, handleAddressChange }) {
  const handleChange = (event,value) =>{
    if(event.target.name === 'insurances')
      handleAddressChange(index,event.target.name,[event.target.value])
    else
    handleAddressChange(index,event.target.name,event.target.value)
  }
  return (
    <div style={styles.outer}>
      <h3>{data.isPrimary ==='true' ? 'Primary' : 'Secondary'}</h3>
      <TextField
        size="small"
        value={data.addr1}
        fullWidth
        label="Line 1"
        name="addr1"
        disabled={!editable}
        onChange={handleChange}
        margin={'normal'}
      />

      <TextField
        size="small"
        value={data.addr2 || "--"}
        fullWidth
        label="Line 2"
        name="addr2"
        disabled={!editable}
        onChange={handleChange}
        margin={'normal'}
      />

      <TextField
        size="small"
        value={data.city}
        label="City"
        name="city"
        disabled={!editable}
        onChange={handleChange}
        margin={'normal'}
      />

      <TextField
        size="small"
        value={data.fax || "--"}
        label="Fax"
        name="fax"
        disabled={!editable}
        onChange={handleChange}
        margin={'normal'}
      />

      <TextField
        size="small"
        value={data.phone}
        label="Phone"
        name="phone"
        disabled={!editable}
        onChange={handleChange}
        margin={'normal'}
      />

      <TextField
        size="small"
        value={data.state}
        label="State"
        name="state"
        disabled={!editable}
        onChange={handleChange}
        margin={'normal'}
      />

      <TextField
        size="small"
        value={data.zip}
        label="Zip Code"
        name="zip"
        disabled={!editable}
        onChange={handleChange}
        margin={'normal'}
      />

      <TextField
        size="small"
        value={data.insurances.join(',') || "--"}
        label="Insurances"
        name="insurances"
        disabled={!editable}
        onChange={handleChange}
        margin={'normal'}
      />
    </div>
  )
}

export default PractitionerAddressComponent

const styles = {
  outer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '20px',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1400px'
  },
}
