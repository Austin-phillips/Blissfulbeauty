import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Dropzone from 'react-dropzone'
import Grid from '@material-ui/core/Grid';
import { ROLE_URL } from '../../Secrets/env';
import { connect } from 'react-redux';
import { getImages, addImage, deleteImage } from '../../actions/images';
import './Gallery.css'
import { Divider } from '@material-ui/core';

class Gallery extends React.Component {
  state = {
    loading: false
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getImages())
    window.scrollTo(0, 0);
  }

  toggleLoading = () => {
    const { loading } = this.state
    this.setState({loading: !loading})
  }

  handleUpload = (images) => {
    const { dispatch } = this.props;
    this.toggleLoading()
    dispatch(addImage(images, this.toggleLoading))
  }

  deleteImage = (id) => {
    const deleted = window.confirm('Are you sure you want to delete?')
    if (deleted)
      this.props.dispatch(deleteImage(id))
  } 

  addButton = () => {
    const { user } = this.props;
    const profile = user.profile
    const role = profile[ROLE_URL]

    if (role[0] === 'admin') {
    return(
      <div>
        <Dropzone onDrop={acceptedFiles => this.handleUpload(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <IconButton id='addButton' aria-label="add">
                  <AddIcon />
                </IconButton>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    )}
  };

  deleteButton = (id) => {
    const { user } = this.props;
    const profile = user.profile
    const role = profile[ROLE_URL]

    if (role[0] === 'admin') {
      return (
        <IconButton onClick={() => this.deleteImage(id)}>
          <DeleteIcon />
        </IconButton>
      )
    }
  }

  displayImages = () => {
    const { images, user } = this.props;

    return images.map( image => {
      return(
        <Grid item xs={12} sm={4} lg={3}>
          <div id="imageContainer">
            <img id="image" src={image.url} alt=""/>
          </div>
          {user.isAuthenticated ? this.deleteButton(image.id) : null}
        </Grid>
      )
    })
  }

  render() {
    const { user } = this.props;

    return (
      <div id="galleryContainer">
        { this.state.loading ?
          <Typography id="galleryHeader" align='center' variant="h2" gutterBottom>
            Loading...
          </Typography> :
          <Typography id="galleryHeader" align='center' variant="h4" gutterBottom>
            Gallery
          </Typography> 
        }
        <Divider id="galleryDivider" />
        <div>
          { user.isAuthenticated ? this.addButton() : null}
        </div>
        <Grid container spacing={24}>
          {this.displayImages()}
        </Grid>
      </div>
    )
  };
};

const mapStateToProps = (state) => {
  return { images: state.images, user: state.user }
}

export default connect(mapStateToProps)((Gallery));