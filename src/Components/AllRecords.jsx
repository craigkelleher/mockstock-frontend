import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Pagination from "./Pagination"
import { setShowModal } from "../features/showModal"
import { setShowMsg } from "../features/showMsg"
import { fetchAllRecords } from "../features/allRecords"
import { fetchIndividualRecord } from "../features/individualRecord"

const AllRecords = () => {
    const dispatch = useDispatch();
    const recordsToShow = useSelector(state => state.recordsToShow.value);

    useEffect(() => {
        dispatch(fetchAllRecords())
    }, [])

    const handleRecordClicked = (e) => {
        dispatch(fetchIndividualRecord(e.currentTarget.id))
        dispatch(setShowMsg(false))
        dispatch(setShowModal(true))
    }

    return (
        <div className='allRecordsContainer'>
            <Pagination />

            <div className="allRecordsDisplay">
                {recordsToShow.map(elem => (
                    <div className='recordCard' key={elem.id} id={elem.id} onClick={handleRecordClicked}>
                        <h3 className="recordTitle">{elem.title}</h3>
                        <p className="recordBody">{elem.body}</p>
                        <div className="cardDataInfo">Record id: {elem.id}</div>
                    </div>
                ))}
            </div>

            <Pagination />
        </div>
    )
}

export default AllRecords