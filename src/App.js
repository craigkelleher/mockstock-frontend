import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Components/Navbar'
import Transactions from './Components/Transactions'
import EditModal from './Components/EditModal'
import { useDispatch, useSelector } from 'react-redux'
import { setRecordsToDisplay } from './features/recordsToDisplay'
import NewRecordModal from './Components/NewRecordModal'
import Footer from './features/Footer'
import Login from './features/Login'
import PortfolioPage from './features/PortfolioPage'

export const URL = {
  "LIST_NAME": "recordList",
  "FETCH_ALL": "http://localhost:8080/api/records",
  "FETCH_ONE": "http://localhost:8080/api/records/",
  "POST": "http://localhost:8080/api/records/add",
  "PATCH": "http://localhost:8080/api/records/update/",
  "DELETE": "http://localhost:8080/api/records/delete/"
}

const App = () => {
  const dispatch = useDispatch();
  const allRecords = useSelector((state) => state.allRecords.value)
  const startIndex = useSelector((state) => state.startIndex.value)
  const endIndex = useSelector((state) => state.endIndex.value)
  const showModal = useSelector(state => state.showModal.value)
  const showMsg = useSelector(state => state.showMsg.value)
  const msgText = useSelector(state => state.msgText.value)
  const showNewRecordModal = useSelector(state => state.showNewRecordModal.value)

  // TEST ID
  const userId = 14;

  useEffect(() => {
    updateRecordsDisplay();
  }, [startIndex, endIndex, allRecords])

  const updateRecordsDisplay = () => {
    dispatch(setRecordsToDisplay(allRecords.slice(startIndex, endIndex)))
  }

  return (
    <div className="appContainer">
      <Navbar />
      {showMsg && <div className='updateMsgContainer'><h3>{msgText}</h3></div>}
      {showModal && <EditModal />}
      {showNewRecordModal && <NewRecordModal />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path='/transactions' element={<Transactions userId={userId}/>} />
      </Routes>
      <Footer/>
    </div>
  );
}
export default App;
