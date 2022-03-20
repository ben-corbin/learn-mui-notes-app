import React, { useState } from "react"
import { useEffect } from "react"
import { Grid, Paper, Container } from "@mui/material"
import NoteCard from '../Components/NoteCard'
import Masonry from "react-masonry-css"



export default function Notes() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/notes")
      .then((res) => res.json())
      .then((notes) => setNotes(notes))
  }, [])

  const handleDelete = (id) => {
    fetch("http://localhost:4000/notes/" + id, {
      method: "DELETE"
  })
  const newNotes = notes.filter(note => note.id !== id)
  setNotes(newNotes)
  }

  
  

  // function handleEdit(id) {
  //   // e.preventDefault()
  //   fetch("http://localhost:4000/notes/" + id, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(noteData)
  //   })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     const editedNote = notes.map(note => 
  //       note.id === data.id ? data : note
  //       )
  //       setNotes(editedNote)
  //   })
  // }
   
  
  
    

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  }

  return (
    <Container>
      <Masonry 
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
