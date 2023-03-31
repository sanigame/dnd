import React from 'react'

import PropTypes from 'prop-types'

import { ResponsiveDrawer } from './components'

const Layout = ({ children }) => {
  return <ResponsiveDrawer>{children}</ResponsiveDrawer>
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
