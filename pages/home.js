import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import prisma from 'lib/prisma'
import { getTweets } from 'lib/data.js'
//Components
import NewTweet from 'components/NewTweet'
import Tweets from 'components/Tweets'
import Utils from 'components/Utils'
export default function Home({tweets}) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const router = useRouter()

  if (loading) {
    return null
  }

  if (!session) {
    router.push('/')
  }
  if (session && !session.user.name) {
    router.push('/setup')
  }
  return (
    <>
      <NewTweet />
      <Tweets tweets={tweets} />
      <Utils/>
    </>
  )
  
}
export async function getServerSideProps() {
	let tweets = await getTweets(prisma)
  tweets = JSON.parse(JSON.stringify(tweets))

  return {
    props: {
      tweets,
    },
  }
}