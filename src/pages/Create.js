import React from "react"
import { useState, useEffect } from "react"
import { useLocation } from "react-router"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow"
import TextField from "@mui/material/TextField"
import Radio from "@mui/material/Radio"
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from "@mui/material"
import { useHistory } from "react-router-dom"

export default function Create(props) {

  const { notes, setNotes } = props
  
  const history = useHistory()
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState("work")

  const location = useLocation()

  useEffect(() => {
    if(location.state) {
      console.log("this is location.state", location.state)
      const {note} = location.state
      setNoteData(note)
    }
  }, [location] )

  const [noteData, setNoteData] = useState({
    title: "",
    details: ""
  })


  const handleSubmit = (e, id) => {

    if (notes.id) {
      e.preventDefault()
      fetch('http://localhost:4000/notes/' + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData)
      })
      .then((res) => res.json())
      .then((data) => {
        const editedNote = notes.map(note => 
          note.id === data.id ? data : note
          )
          setNotes(editedNote)
      })
    }

    else {
    setTitleError(false)
    setDetailsError(false)

    if (title === "") {
      setTitleError(true)
    }

    if (details === "") {
      setDetailsError(true)
    }
    if (title && details) {
      fetch('http://localhost:4000/notes', {
        method: 'POST',
        headers: {"content-type": "application/json"},
        body: JSON.stringify({title, details, category})
      }).then(() => history.push('/'))
    }
   } 
  }

  return (
    <Container>
      <Typography
        variant="h2"
        color="textSecondary"
        gutterBottom
        paddingTop="20px"
      >
        Create a New Note
      </Typography>

      <form
        noValidate
        autoComplete="off"
        sx={{ marginTop: 20, marginBottom: 20, display: "block" }}
        onSubmit={handleSubmit}
      >
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />

        <TextField
          onChange={(e) => setDetails(e.target.value)}
          sx={{ marginTop: 3 }}
          label="Details"
          variant="outlined"
          color="secondary"
          fullWidth
          multiline
          rows="4"
          required
          error={detailsError}
        />

        <FormControl>
          <FormLabel sx={{ marginTop: 3 }}>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="work" control={<Radio />} label="Work" />
            <FormControlLabel value="home" control={<Radio />} label="Home" />
            <FormControlLabel value="todo" control={<Radio />} label="To Do" />
            <FormControlLabel
              value="reminder"
              control={<Radio />}
              label="Reminder"
            />
          </RadioGroup>
          <Button
            sx={{ marginTop: 3 }}
            type="submit"
            color="secondary"
            variant="contained"
            endIcon={<DoubleArrowIcon />}
          >
            Submit
          </Button>
        </FormControl>
      </form>

      <br></br>
    </Container>
  )
}
