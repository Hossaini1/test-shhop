import { getPayload } from 'payload'
import buildConfig from '../payload.config'

const Posts = async () => {
  const payload = await getPayload({ config: buildConfig }) // man kann diese locale fetch auch in 2 extra datei machen zb postFetch.tsx in action ordner für alle fetch und limit und postPage.tsx in [page] ordner für pagination

  const postsData = await payload.find({
    collection: 'posts',
    where: {
      publishedDate: { exists: true },
    },
    
        limit:3,
        page:1,
        depth:1,
        sort:'-id'

    
  })

  const posts = postsData.docs;

//   console.log(posts)

  if (!posts.length) {
    return <p>There are no posts!</p>
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

export default Posts
