import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

const TimeAgo = ({ timestamp , style }) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <div>
    <i>{timeAgo}</i>
    </div>
  )
}


export default TimeAgo

