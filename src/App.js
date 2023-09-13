import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ROUTE_ERROR_REPORTS, ROUTE_PRACTITIONER_SEARCH,
        ROUTE_DATA_REPORTS, ROUTE_LIBRARY, ROUTE_PRACTITIONER_DETAILS
} from './routes'
import ErrorReports from './pages/ErrorReports'
import DataReports from './pages/DataReports'
import PractitionerSearch from './pages/PractitionerSearch'
import PractitionerDetails from './pages/PractitionerDetails';
import Library from './pages/Library'
import SidebarComponent from './components/SidebarComponent'

function App() {

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Router>
            <SidebarComponent/>
                <Routes>
                    <Route path={ROUTE_LIBRARY} element={<Library/>}/>
                    <Route path={ROUTE_ERROR_REPORTS} element={<ErrorReports/>}/>
                    <Route path={ROUTE_DATA_REPORTS} element={<DataReports/>}/>
                    <Route path={ROUTE_PRACTITIONER_SEARCH} element={<PractitionerSearch/>}/>
                    <Route path={ROUTE_PRACTITIONER_DETAILS} element={<PractitionerDetails/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
