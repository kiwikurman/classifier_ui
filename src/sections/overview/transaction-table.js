import { format } from 'date-fns';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import * as React from 'react';
import PropTypes from 'prop-types';
const { v4: uuidv4 } = require('uuid');
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import StorageIcon from '@mui/icons-material/Storage';
import ClassIcon from '@mui/icons-material/Class';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid';



const now = new Date();






function FileUploadButton(props) {
  const { getData } = props;
  const [selectedFile, setSelectedFile] = React.useState(null);
  const fileInputRef = React.useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    handleFileUpload(event.target.files[0]);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (the_file) => {
    if (the_file) {
      console.log(the_file);
      const fileData = new Blob([the_file], { type: 'application/vnd.ms-excel' });
      const formData = new FormData();
      formData.append('file', fileData, the_file.name);

      fetch('https://g1y4r7q6t5.execute-api.eu-central-1.amazonaws.com/classifier/input_files',
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        getData();
        if (response.ok) {
          // Handle the response from the server
          // e.g., display success message
          console.log('File uploaded successfully!');
        } else {
          // Handle server errors or non-OK responses
          console.error('Error uploading file. Status:', response.status);
        }
      })
      .catch(error => {
        // Handle any errors that occur during the request
        console.error('Error uploading file:', error);
      });
    } else {
      console.log('No file selected.');
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <Button
        color="primary"
        onClick={handleButtonClick}
        startIcon={<CloudUploadIcon />}>
          Upload
      </Button>
    </div>
  );
}


function EditToolbar(props) {
  const { setTransactions, setRowModesModel, getDataClick, getCategories } = props;

  const handleClick = () => {
    const id = uuidv4();
    setTransactions((oldTransactions) => ({...oldTransactions, transactions: [{ id, amount: 0, merchant: '', date: "", full_text_classification: "", isNew: true }, ...oldTransactions.transactions]}));
    setRowModesModel((oldModel) => ({
    ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'date' }
    }));
  };



  const post_action = async (action) => {
  fetch('https://g1y4r7q6t5.execute-api.eu-central-1.amazonaws.com/classifier/' + action,
  {
    method: 'POST',
    mode: "no-cors",
    headers: {
      'Content-Type': 'application/json',
    },
    body: "",
  }).then(response => {
        if (response.ok) {
          // Handle the response from the server
          // e.g., display success message
          console.log('post to ' + action + " successful");
        } else {
          // Handle server errors or non-OK responses
          console.log('Error post to ' + action + ' successful. Status:', response.status);
        }
        getDataClick();
      })
      .catch(error => {
        // Handle any errors that occur during the request
        console.error('Error posting:', error);
      });
};



  return (
    <GridToolbarContainer>
      <FileUploadButton getData={getDataClick}/>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}>
          Add record
      </Button>
      <Button color="primary"
        startIcon={<SvgIcon fontSize="small"><StorageIcon /></SvgIcon>}
        onClick={getDataClick}>
            Load Chart
      </Button>
      <Button color="primary"
        startIcon={<SvgIcon fontSize="small"><ClassIcon /></SvgIcon>}
        onClick={getCategories}>
            Load Categories
      </Button>
      <Button color="primary"
        startIcon={<SvgIcon fontSize="small"><AutoGraphIcon /></SvgIcon>}
        onClick={() => post_action("classify")}>
            Classify
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setTransactions: PropTypes.func.isRequired,
  getDataClick: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
};




export const TransactionTable = (props) => {
  const { transactions = {}, sx, getDataClick, setTransactions, getCategories} = props;
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleSendList = async (transactionList) => {
    const response = await fetch('https://g1y4r7q6t5.execute-api.eu-central-1.amazonaws.com/classifier/transactions',
    {
      method: 'POST',
      mode: "no-cors",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transactionList }),
    });
    getDataClick();
    if (response.ok) {
      console.log('List sent successfully!');
    } else {
      console.log('Error sending list.');
    }
  };

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    const t = transactions.transactions.filter((row) => row.id !== id);
    setTransactions((oldTransactions) => ({...oldTransactions, transactions: t}));
    handleSendList(t);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = transactions.transactions.find((row) => row.id === id);
    if (editedRow.isNew) {
      const t = transactions.transactions.filter((row) => row.id !== id);
      setTransactions((oldTransactions) => ({...oldTransactions, transactions: t}));
    }
  };

  const processRowUpdate = (newRow) => {
    const bad_hack = (newRow.full_text_classification.length === 0) ? null : false;
    const updatedRow = { ...newRow, isNew: bad_hack };
    const a = transactions.transactions.map((row) => (row.id === newRow.id ? updatedRow : row));
    transactions.transactions = a;
    handleSendList(a);
    setTransactions(transactions);
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  const columns = [
    { field: 'date', headerName: 'DATE', width: 150, editable: true  },
    { field: 'merchant',headerName: 'MERCHANT',width: 200, editable: true  },
    { field: 'amount', headerName: 'AMOUNT', width: 200, editable: true  },
    { field: 'full_text_classification', headerName: 'CLASSIFICATION',width: 200, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="11001"
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key="11002"
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key="11003"
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="11004"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Card sx={sx}>
      <CardHeader title="Transactions" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <DataGrid
            rows={transactions.transactions}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={(error) => console.log(error)}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setTransactions, setRowModesModel, getDataClick, getCategories},
            }}
           />
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
      </CardActions>
    </Card>
  );
};

TransactionTable.prototype = {
  transactions: PropTypes.shape({
      transactions: PropTypes.array,
      summary: PropTypes.array
    }),
  sx: PropTypes.object
};



