import React from 'react'

import PropTypes from 'prop-types'

const Grid = ({ children, columns }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: 10,
        maxWidth: '800px',
        margin: '100px auto',
      }}>
      {children}
    </div>
  )
}

Grid.propTypes = {
  children: PropTypes.any,
  columns: PropTypes.any,
}

export default Grid
