import { useRouter } from 'next/router'

const Event = () => {
  const router = useRouter()
  const { eventId } = router.query

  return<h1>Events {eventId}</h1>
}

export default Event;