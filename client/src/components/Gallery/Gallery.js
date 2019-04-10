import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Dropzone from 'react-dropzone'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { ROLE_URL } from '../../Secrets/env';
import { connect } from 'react-redux';
import { getImages, addImage, deleteImage } from '../../actions/images';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    marginTop: '25px',
  },
  gridList: {
    width: '80vw',
    height: '80vh',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  title: {
    color: '#f44336'
  },
});

class Gallery extends React.Component {
  state = {
    loading: false
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getImages())
  }

  toggleLoading = () => {
    const { loading } = this.state
    this.setState({loading: !loading})
  }

  handleUpload = (image) => {
    const { dispatch } = this.props;
    this.toggleLoading()
    dispatch(addImage(image[0], this.toggleLoading))
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
    const { user, classes } = this.props;
    const profile = user.profile
    const role = profile[ROLE_URL]

    if (role[0] === 'admin') {
      return (
        <GridListTileBar
          classes={{
            root: classes.titleBar,
            title: classes.title,
          }}
          actionIcon={
            <IconButton onClick={() => this.deleteImage(id)}>
              <DeleteIcon className={classes.title} />
            </IconButton>
          }
        /> 
      )
    }
  }

  displayImages = () => {
    const { images, user } = this.props;

    return images.map( image => {
      return(
        <GridListTile key={image.id} cols={1}>
          <img src={image.url} alt=''/>
          {user.isAuthenticated ? this.deleteButton(image.id) : null}
        </GridListTile>
      )
    })
  }

  getGridListCols = () => {
    if (isWidthUp('xl', this.props.width)) {
      return 4;
    } else if (isWidthUp('lg', this.props.width)) {
      return 4;
    } else if (isWidthUp('md', this.props.width)) {
      return 3;
    } else if (isWidthUp('sm', this.props.width)) {
      return 2;
    } else {
      return 1;
    };
  }

  render() {
    const { classes, user } = this.props;

    return (
      <div>
        { this.state.loading ?
          <Typography className={classes.header} align='center' variant="h2" gutterBottom>
            Loading...
          </Typography> :
          <Typography className={classes.header} align='center' variant="h2" gutterBottom>
            Gallery
          </Typography> 
        }
        <div>
          { user.isAuthenticated ? this.addButton() : null}
        </div>
        <div className={classes.root}>
          <GridList cellHeight={250} className={classes.gridList} cols={this.getGridListCols()}>
              {this.displayImages()}
          </GridList>
        </div>
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

export default connect(mapStateToProps)(withWidth()(withStyles(styles)(Gallery)));