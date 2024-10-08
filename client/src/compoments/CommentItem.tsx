import React from 'react'
import { Comment } from '../App'

type CommmentItemProps = {
  commentItem: Comment 
}
export const CommentItem = (props: CommmentItemProps) => {
  const {
    commentItem: { comment, index },
  } = props;
  console.log("🚀 ~ CommentItem ~ commment:", )

  return (
    <div className='text-sm text-neutral-700 border-b border-primary-content last:pb-0  pb-2 last:border-none'>
      <span className='text-primary text-base font-semibold'>
        {index + 1}.
      </span>
      <p className='text-right pl-4 cursor-text'>
        {comment}
      </p>
    </div>
  )
}
