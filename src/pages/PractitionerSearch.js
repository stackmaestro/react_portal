import { useState, useEffect } from 'react'
import PractitionerFilterComponent from '../components/PractitionerFilterComponent'
import PractitionerResultsComponent from '../components/PractitionerResultsComponent'

export default function PractitionerSearch() {
  const [filters, setFilters] = useState({
    text: '',
    specialty: '',
  })

  const [specialties, setSpecialties] = useState([])
  const [practitioners, setPractitioners] = useState([])
  const [filteredPractitioners, setFilteredPractitioners] = useState([])

  useEffect(() => {
    const fetchSpecialties = async () => {
      fetch('http://localhost:8080/specialties')
        .then((response) => response.json())
        .then((data) => {
          setSpecialties([...data])
        })
    }

    fetchSpecialties()
  }, [])

  useEffect(() => {
    const fetchPractitioners = async () => {
      fetch('http://localhost:8080/practitioners')
        .then((response) => response.json())
        .then((data) => {
          setPractitioners([...data])
          setFilteredPractitioners([...data])
        })
    }
    if (!practitioners.length) fetchPractitioners()
    else {
      let data = practitioners
      let text = filters.text.trim().toUpperCase()
      let spec = filters.specialty
      if (text)
        data = data.filter(
          (prac) =>
            prac.first_name.toUpperCase().includes(text) ||
            prac.last_name.toUpperCase().includes(text) ||
            prac.address.find((addr) => addr.zip.toUpperCase().includes(text))
        )
      if (spec) data = data.filter((prac) => prac.specialty.includes(spec))

      setFilteredPractitioners(JSON.parse(JSON.stringify(data)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '20px', overflowY: 'scroll' }}>
        <div style={{ width: '100%' }}>
          <PractitionerFilterComponent
            filters={filters}
            setFilters={setFilters}
            specialties={specialties}
          />
        </div>
        <div style={{  width: '100%' }}>
          <PractitionerResultsComponent data={filteredPractitioners} filters={filters}/>
        </div>
      </div>
    </>
  )
}
