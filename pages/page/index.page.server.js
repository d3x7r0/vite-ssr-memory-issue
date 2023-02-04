import { faker } from '@faker-js/faker'

const PAGE_PREFIX = '/page'

// Just increase to increase memory usage
const PAGE_COUNT = 25_000

export async function prerender () {
  return Array.from({ length: PAGE_COUNT })
    .map((_, idx) => [PAGE_PREFIX, idx].join('/'))
}

export async function onBeforeRender (pageContext) {
  const uri = pageContext.routeParams['*']

  // Generate some random data as props. Make it big
  const pageProps = {
    id: faker.datatype.uuid(),
    title: faker.lorem.lines(1),
    date: faker.datatype.datetime(),
    excerpt: faker.lorem.words(30),
    content: faker.lorem.paragraphs(60),
    slug: uri,
    uri: `${PAGE_PREFIX}/${uri}`,
    featuredImage: {
      node: {
        altText: faker.lorem.sentence(),
        mediaItemUrl: faker.internet.url(),
        mediaType: 'image/jpg',
        mediaDetails: {
          width: faker.datatype.number(),
          height: faker.datatype.number(),
        }
      }
    },
    nextPost: {
      node: {
        id: faker.datatype.uuid(),
        title: faker.lorem.lines(1),
        date: faker.datatype.datetime(),
        excerpt: faker.lorem.words(30),
        slug: faker.lorem.slug(32),
      }
    },
    previousPost: {
      node: {
        id: faker.datatype.uuid(),
        title: faker.lorem.lines(1),
        date: faker.datatype.datetime(),
        excerpt: faker.lorem.words(30),
        slug: faker.lorem.slug(32),
      }
    },
    author: {
      node: {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        url: faker.internet.url(),
        nickname: faker.internet.userName(),
        nicename: faker.name.fullName(),
        username: faker.internet.userName(),
        avatar: faker.internet.avatar(),
      }
    },
    tags: {
      nodes: Array.from({ length: 30 }).map(() => ({
        id: faker.datatype.uuid(),
        name: faker.lorem.word(),
        slug: faker.lorem.slug(),
      }))
    },
    categories: {
      nodes: Array.from({ length: 5 }).map(() => ({
        id: faker.datatype.uuid(),
        name: faker.lorem.word(),
        uri: faker.internet.url(),
      }))
    }
  }

  return {
    pageContext: {
      pageProps,
    },
  }
}
