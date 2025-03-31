import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  //loader:({params}) => fetchPost(params.postId),
  component: RouteComponent,
})

function RouteComponent() {
  //IN a component
  const {postId} = Route.useParams();
  return (<>
  <div>Hello "/posts/$postId"!</div>
  <h1>Post ID:{postId}</h1>
  </>)
}
