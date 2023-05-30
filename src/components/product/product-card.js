import { Button, TableCell, TableRow } from '@mui/material';

export default function ProductCard({ row, setFile }) {

    const download = () => {
      let path = 'static/evidence/' + row;
      setFile(path);
      fetch(path)
      .then(res => {
        res.blob()
        .then(blob => {
          const fileURL = window.URL.createObjectURL(blob);
          let alink = document.createElement('a');
          alink.href = fileURL;
          alink.download = path;
          alink.click();
        })
      })
    }

    const handleClick = () => {
      setFile(null);
      setFile(row);
    }

  return (
    <TableRow>
      <TableCell sx={{width:"25%", borderLeft:"1px solid black", borderBottom:"1px solid black", borderTop:"1px solid black"}}align="center" onClick={handleClick}><Button>{row.name}</Button></TableCell>
      <TableCell sx={{width:"50%", borderBottom:"1px solid black", borderTop:"1px solid black"}}></TableCell>
{/*   <TableCell sx={{width:"25%", borderRight:"1px solid black", borderBottom:"1px solid black", borderTop:"1px solid black"}}align="center" onClick={() => download()}><Button>Download</Button></TableCell>
    */}
    </TableRow>
  )
};
