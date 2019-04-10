import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ImageModal from './ImageModal';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux';
import { getImages, addImage } from '../../actions/images';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    marginTop: '25px',
  }
});

class Gallery extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getImages())
  }

  handleUpload = (image) => {
    const { dispatch } = this.props;
    // dispatch(addImage(image))
    console.log(image)
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.header} align='center' variant="h2" gutterBottom>
          Gallery
      </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <div id='table'>
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
          </Grid>
        </Grid>
      </div>
    )
  };
};

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { images: state.images, user: state.user }
}

export default connect(mapStateToProps)(withStyles(styles)(Gallery));