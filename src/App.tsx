import {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Define the type for the data objects
type DataItem = {
  property: string;
  value: string;
};


// Function to create data objects
function createData(property: string, value: string): DataItem {
  return { property, value };
}


export default function BasicTable() {
  const [rows, setRows] = useState<DataItem[]>([]);
  
  useEffect(() => {
    chrome.runtime.sendMessage({ action: 'getCPUInfo' }, function(response) {
      console.log(response)
      const newRows = [...rows, 
        createData('Model Name', response.modelName),
        createData('Architecture Name', response.archName),
        createData('Number of Processors', response.numOfProcessors)
      ];

      Object.entries<{usage: { idle: number, kernel: number, total: number, user: number }}>(response.processors).forEach(([processor, value]) => {
        // Add each property to newRows using createData
        newRows.push(createData(`Processor ${processor} time spent idle`, `${(value.usage.idle / 1e9).toFixed(2).toString()} seconds`));
      });

      Object.entries<{usage: { idle: number, kernel: number, total: number, user: number }}>(response.processors).forEach(([processor, value]) => {
        // Add each property to newRows using createData
        newRows.push(createData(`Processor ${processor} time used by the kernel programs`, `${(value.usage.kernel / 1e9).toFixed(2).toString()} seconds`));
      });


      Object.entries<{usage: { idle: number, kernel: number, total: number, user: number }}>(response.processors).forEach(([processor, value]) => {
        // Add each property to newRows using createData
        newRows.push(createData(`Processor ${processor} total time`, `${(value.usage.total / 1e9).toFixed(2).toString()} seconds`));
      });

      Object.entries<{usage: { idle: number, kernel: number, total: number, user: number }}>(response.processors).forEach(([processor, value]) => {
        // Add each property to newRows using createData
        newRows.push(createData(`Processor ${processor} time used by userspace programs`, `${(value.usage.user / 1e9).toFixed(2).toString()} seconds`));
      });


      setRows(newRows);
      
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.property}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.property}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}