
import React from 'react';
import { Card, IconButton, CardHeader, CardContent, Typography, Avatar } from '@mui/material';
import { DeleteOutlined } from '@material-ui/icons';
import { yellow, green, pink, blue } from '@mui/material/colors';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const getAvatarBgColor = ({ category }) => ({
    work: yellow[700],
    home: green[500],
    todo: pink[500],
  }[category] || blue[500]);


export default function NoteCard({ note, handleDelete, handleEdit }) {

    return (
        <div>
            <Card elevation={4}>
                <CardHeader 
                avatar={
                    <Avatar sx={{ bgcolor: getAvatarBgColor(note) }}>
                    {note.category[0].toUpperCase()}
                    </Avatar>
                }
                action={
                    <>
                    <IconButton onClick={() => handleDelete(note.id)}>
                      <DeleteOutlined />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(note.id)}>
                        <ModeEditOutlineOutlinedIcon />
                    </IconButton>
                    </>
                  }
                  
                  title={note.title}
                  subheader={note.category}
                  />
                  <CardContent>
                      <Typography
                      variant="body2"
                      color="textSecondary"
                      >{note.details}</Typography>
                  </CardContent>
            </Card>
        
        </div>
    )
}