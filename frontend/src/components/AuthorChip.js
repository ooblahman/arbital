import React, { Component, PropTypes } from 'react'

import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

const styles = {
  chip: {
    margin: 4,
  },
}

const AuthorChip = (props) => {
  const { authorName, onTouchTap } = props

  return (
    <Chip
      onTouchTap={e => onTouchTap(e)}
      style={styles.chip}
    >
      <Avatar size={32}>{authorName[0]}</Avatar>
      {authorName}
    </Chip>
  )
}

export default AuthorChip
