import { DataGrid } from '@mui/x-data-grid'
import {useLocation, useNavigate} from 'react-router-dom';

function DataTable() {

const location = useLocation();
  const navigate = useNavigate();

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Room Name',
    flex: 1,
  },
  {
            field: "reserve",
            headerClassName: 'super-app-theme--header',
            renderCell: (cellValues) => {
              return (
                <button
                  variant="contained"
                  color="primary"
                  onClick={(event) => {
                    reserveRoom(event, cellValues);
                  }}
                >
                Reserve
                </button>
              );
            },
            width: 250
          }
]

const rows = [
    { id: 1, name: 'Mercury',reserve: 'Book'},
    { id: 2, name: 'Venus',reserve: 'Book'},
    { id: 3, name: 'Jupiter',reserve: 'Book'},
    { id: 4, name: 'Saturn',reserve: 'Book'}
]

const reserveRoom = (param,event) => {
    navigate('/bookingdetails');
}

  return (
    <>
      <div style={{ height: 400, display: 'flex' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            hei
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </div>
    </>
  )
}

export default DataTable
