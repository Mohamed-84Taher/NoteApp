import { Container, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NoteCard from "../components/NoteCard";
import { useConfirm } from "material-ui-confirm";
import Masonry from "react-masonry-css";
import "./Notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
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
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  return (
    <Container>
      <TextField
        style={{ marginBottom: 50, display: "block" }}
        label='Search Notes'
        variant='outlined'
        fullWidth
        helperText='Search note by title'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={e => setSearchText(e.target.value)}
      />
      <Masonry
        breakpointCols={breakpoints}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {notes
          .filter(note =>
            note.title.toLowerCase().includes(searchText.toLowerCase().trim())
          )
          .map(note => (
            <div key={note.id}>
              <NoteCard note={note} handleDelete={handleDelete} />
            </div>
          ))}
      </Masonry>
    </Container>
  );
}

export default Notes;
