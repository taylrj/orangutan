import AddImageLinkForm from './form'
import EmbeddedCodeModal from './embedded-code-modal'
import ImageList from './image-list'
import React, { useState } from 'react'
import useImagesState from '../hooks/use-images-state'
// @material-ui
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  formControlLabel: {
    display: 'block',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const Content = () => {
  const classes = useStyles()
  const { imageLinks, addImageLink, deleteImageLink } = useImagesState([])
  const [state, setState] = useState({
    checkedLazyload: false,
  })

  const handleSaveLink = link => {
    const trimmedLink = link.trim()
    if (trimmedLink.length > 0) {
      addImageLink(trimmedLink)
    }
  }

  const handleCheckChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    })
  }

  return (
    <Container className={classes.container} maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Scrollable Image Maker
      </Typography>
      <AddImageLinkForm
        buttonLabel="ADD"
        placeholder="Add image link"
        submitHandler={handleSaveLink}
      />
      <ImageList imageLinks={imageLinks} deleteImageLink={deleteImageLink} />
      <FormControlLabel
        className={classes.formControlLabel}
        control={
          <Checkbox
            checked={state.checkedLazyload}
            onChange={handleCheckChange}
            name="checkedLazyload"
            color="primary"
          />
        }
        label="enable Lazyload"
      />
      <EmbeddedCodeModal
        header="Embedded Code"
        description="Place this code wherever you want the plugin to appear on your page."
        buttonLabel="GET CODE"
        config={{
          data: imageLinks,
          lazyload: state.checkedLazyload,
        }}
      />
    </Container>
  )
}

const App = () => {
  return (
    <>
      <CssBaseline />
      <Content />
    </>
  )
}

export default App
