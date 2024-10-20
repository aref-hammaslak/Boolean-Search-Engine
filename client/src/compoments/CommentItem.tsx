import React, { useState, useRef , useEffect} from "react";
import { Comment } from "../App";

type CommmentItemProps = {
  commentItem: Comment;
};
export const CommentItem = (props: CommmentItemProps) => {
  const {
    commentItem: { comment, index },
  } = props;
  const [isMore, setIsMore] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const paragraphRef = useRef(null);

  useEffect(() => {
     if (paragraphRef.current === null) return ;
     const element: HTMLElement = paragraphRef.current;
     const hasOeverflow = element.scrollHeight > element.clientHeight;
     setIsHidden(!hasOeverflow);
  }, [paragraphRef]);

  return (
    <div className="text-sm text-neutral-600 border-b border-primary-content last:pb-0  pb-2 last:border-none">
      <span className="text-primary  text-base font-semibold">
        {index + 1}.
      </span>
      <span
        onClick={() => setIsMore((n) => !n)}
        className={`text-xs  p-2 text-blue-400 cursor-pointer ${
          isHidden && "hidden"
        }`}
      >
        show {isMore ? "less" : "more"}
      </span>
      <p
        ref={paragraphRef}
        className={`text-right ${
          !isMore && "h-5 overflow-hidden"
        }  pl-4 cursor-text`}
      >
        {!isMore && !isHidden && <span> ...</span>}
        {comment}
        
      </p>
    </div>
  );
};
