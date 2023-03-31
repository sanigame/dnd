import React from 'react'

import { Routes, Route } from 'react-router-dom'

import { Layout } from '../layout'

import routes from './routes'

const renderRoutes = (routeList) => {
  return routeList.map((route, i) => (
    <Route key={i} path={route.path} element={route.element} exact />
  ))
}

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>{renderRoutes(routes)}</Routes>
    </Layout>
  )
}

export default AppRoutes
