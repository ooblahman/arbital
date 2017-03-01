import React from 'react'
import Header from '../../components/Header'
import './CoreLayout.scss'
import '../../styles/core.scss'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const CoreLayout = ({ children }) => (
  <MuiThemeProvider>
    <div>
      <Header />
      {children}
    </div>
  </MuiThemeProvider>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
