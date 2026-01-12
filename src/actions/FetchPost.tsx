// actions/FetchPosts.ts
import { getPayload } from 'payload'
import config from '../payload.config'

export async function fetchPosts({
  page = 1,
  limit = 3,
  sort = '-publishedDate',
} = {}) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    depth: 0,
    page,
    limit,
    sort,
    where: {
      publishedDate: { exists: true },
    },
  })

  return result.docs
}
