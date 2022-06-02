import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import CardContent from "@mui/material/CardContent";
import { Avatar, IconButton, Typography } from "@mui/material";

function NoteCard({ note, handleDelete }) {
  const avatarColor =
    note.category === "work"
      ? "#14C38E"
      : note.category === "todos"
      ? "#F47C7C"
      : "#92B4EC";
  return (
    <div>
      <Card elevation={3}>
        <CardHeader
          avatar={
            <Avatar style={{ backgroundColor: avatarColor }}>
              {note.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteIcon />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary'>
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default NoteCard;
