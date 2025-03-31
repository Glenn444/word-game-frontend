import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import Post from '../components/PostComponent'
import Posts from '../components/Posts'

export const Route = createFileRoute('/posts')({
  component: RouteComponent,
})


export default function RouteComponent() {
    const [postId, setPostId] = React.useState(-1)
  
    return (
        <>
        <p>
          As you visit the posts below, you will notice them in a loading state
          the first time you load them. However, after you return to this list and
          click on any posts you have already visited again, you will see them
          load instantly and background refresh right before your eyes!{' '}
          <strong>
            (You may need to throttle your network speed to simulate longer
            loading sequences)
          </strong>
        </p>
        {postId > -1 ? (
          <Post postId={postId} setPostId={setPostId} />
        ) : (
          <Posts setPostId={setPostId} />
        )}
       </>
    )
  }
  