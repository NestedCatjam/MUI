import { Avatar, Box, Card, CardContent, Divider, Grid, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

export default function ProductCard({ row, setDoc, setFileType }) {
    const link = row;

    const handleClick = () => {
      console.log("link used:", link);
      setDoc(link);
    }

  return (
    <ListItemButton onClick={() => handleClick()}>
      <ListItemText primary={row}/>
    </ListItemButton>
  )
};
