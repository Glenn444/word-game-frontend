import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'


export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <ul className='flex space-x-3'>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/posts/1">LeaderBoard</a></li>
      </ul>
      <Outlet />
    </React.Fragment>
  )
}
