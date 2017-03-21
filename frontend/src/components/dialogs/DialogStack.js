import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import StackedHOC from '../hoc/StackedHOC'
import DialogSwitch from './DialogSwitch'

const DialogStack = StackedHOC(DialogSwitch)

export default connect(
  ({ lastDialogPushState }) => {
    console.warn('sending push state to StackedHOC', lastDialogPushState)
    if (!! lastDialogPushState) {
      return { pushState: lastDialogPushState }
    } else {
      return {}
    }
  },
  (dispatch) => ({ dispatch })
)(DialogStack)