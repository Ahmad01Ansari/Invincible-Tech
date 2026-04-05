import { projectType } from './project'
import { postType } from './post'
import { authorType } from './author'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const schema: { types: any[] } = {
  types: [projectType, postType, authorType],
}
