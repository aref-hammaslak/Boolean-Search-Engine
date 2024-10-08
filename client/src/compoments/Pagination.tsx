import React from 'react'

type PaginationType = {
  totalPage: number;
  page: number;
  onPageChange: (pageNum: number) => void;
}
export const Pagination = (props: PaginationType) => {
  const { page, totalPage, onPageChange} = props;
  return (
    <div className="join ">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`join-item btn disabled:btn-disabled btn-sm ${""}`}
      >
        Prev Page
      </button>

      <span  className='join-item btn-smn btn btn-sm'>
        {`${page}/${totalPage}`}
      </span>
      {/* <button className={`join-item btn btn-sm  btn-active`}>{page}</button>
      <button className={"join-item btn btn-sm"}>{page + 1}</button>

      <button className={"join-item btn btn-sm btn-disabled"}>...</button>
      <button
        onClick={() => onPageChange(totalPage - 1)}
        className={"join-item btn btn-sm"}
      >
        {totalPage - 1}
      </button>
      <button
        onClick={() => onPageChange(totalPage)}
        className={"join-item btn btn-sm"}
      >
        {totalPage}
      </button> */}
      <button
        disabled={page === totalPage}
        onClick={() => onPageChange(page + 1)}
        className={"join-item btn btn-sm"}
      >
        Next Page
      </button>
    </div>
  );
}
