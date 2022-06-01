import { Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { useConfirm, ConfirmProvider } from "material-ui-confirm";

function Notes() {
  const [notes, setNotes] = useState([]);
  const confirm = useConfirm();

  // fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // delete note
  const handleDelete = async id => {
    try {
      await confirm({
        description: `This will  delete the note with id = ${id}.`,
      });
      await fetch(`http://localhost:8080/notes/${id}`, {
        method: "DELETE",
      });
      const newNotes = notes.filter(note => note.id !== id);
      setNotes(newNotes);
    } catch (err) {
      console.log("Deletion cancelled.");
    }
  };

  return (
    <ConfirmProvider>
      <Container>
        <Grid container spacing={3}>
          {notes.map(note => (
            <Grid item xs={12} md={6} lg={4} key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ConfirmProvider>
  );
}

export default Notes;
