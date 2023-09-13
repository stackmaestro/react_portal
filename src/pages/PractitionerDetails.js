import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import PractitionerDetailsComponent from '../components/PractitionerDetailsComponent';

function PractitionerDetails() {

  const {npi,view} = useParams();
  const [info, setInfo] = useState();
  const [editable] = useState(view === 'edit' ? true : false);

  const handleChange = (event,value)=>{
    setInfo((old)=>{
      return ({
        ...old,
        [event.target.name]: event.target.value
      })
    })
  }

  useEffect(()=>{
    const fetchInformation = async()=>{
      fetch(`http://localhost:8080/practitioners?npi=${npi}`)
      .then((response) => response.json())
      .then((data) => {
        setInfo(data[0]);
      })
    }
    fetchInformation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    info? <PractitionerDetailsComponent data={info} editable={editable} handleChange={handleChange}/> : null
  )
}

export default PractitionerDetails