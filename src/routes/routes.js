import React from 'react'

import { redditDetailAction } from '../features/redditDetail/redux'
import { redditListAction } from '../features/redditList/redux'
// import GridPage from '../pages/GridPage'
import GridSortablePage from '../pages/GridSortablePage'
import NoteDetailPage from '../pages/NoteDetailPage'
import RedditDetailPage from '../pages/RedditDetailPage'
import RedditListPage from '../pages/RedditListPage'

const routes = [
  {
    path: '/',
    exact: true,
    element: <GridSortablePage />,
  },
  {
    path: '/detail/:noteId',
    exact: true,
    element: <NoteDetailPage />,
  },
  // {
  //   path: '/',
  //   exact: true,
  //   element: <RedditListPage />,
  // },
  {
    path: '/server',
    exact: true,
    element: <RedditListPage />,
    loadData: [() => redditListAction.fetchRedditIfNeeded()],
  },
  {
    path: '/detail/:name',
    exact: true,
    element: <RedditDetailPage />,
    loadData: [
      ({ params }) => {
        return redditDetailAction.fetchRedditDetailIfNeeded(params.name)
      },
    ],
  },
]

export default routes
