import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import red from '@material-ui/core/colors/red';
import JaidenImage from '../../assets/images/jaidenPortrait.jpg'

const styles = theme => ({
  card: {
    maxWidth: '100%',
    height: 350,
  },
  media: {
    height: 350,
    paddingTop: '56.25%', // 16:9
    position: 'top',
  },
});

class AboutMeCards extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={JaidenImage}
          title="Paella dish"
        />
      </Card>
    );
  }
}

AboutMeCards.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AboutMeCards);