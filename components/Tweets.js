import Tweet from './Tweet'

export default function Tweets(props) {
  if (!props.tweets) return null

  return (
    <>
      {props.tweets.map((tweet, index) => (
        <Tweet key={index} tweet={tweet} />
      ))}
    </>
  )
}