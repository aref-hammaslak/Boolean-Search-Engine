/* eslint-disable @typescript-eslint/no-unused-vars */
import { Key, useEffect, useState } from "react";
import { SearchField } from "./compoments/SearchField";
import { useQuery } from "@tanstack/react-query";
import axios, { Axios } from "axios";
import { CommentItem } from "./compoments/CommentItem";
import { Pagination } from "./compoments/Pagination";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 10000,
});

export type Comment = {
  _id: string;
  comment: string;
  index: number;
}

function App() {
  const [searchExpresion, setSearchExpresion] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: { comments, total },
    isLoading,
    isPending,
    isFetching,
    error,
    isSuccess
  } = useQuery({
    queryKey: ["commments", page, searchExpresion],
    queryFn: async () => {
      const res = await api.get("/comments", {
        params: {
          expression: searchExpresion,
          page,
          limit: 10,
        },
      });
      return res.data.payload;
    },
    initialData: {
      comments: [],
      total: 1,
    },
  });

  useEffect(() => {
    setPage(1);
  } , [searchExpresion])

  const handelExpresionChange = (expresion: string) => {
    setSearchExpresion(expresion);
  };

  return (
    <div className=" flex flex-col gap-4  container  mx-auto py-4 px-8 h-screen   justify-center">
      <SearchField
        searchExpresion={searchExpresion}
        onExpresionChange={handelExpresionChange}
      />
      <div className="flex-1   overflow-y-auto px-4 relative">
        <div className="flex justify-center items-center inset-0 absolute -z-10 ">
          {
            error && <p>
              Invalide expresion, Try again!
           </p>
          }
          {
            (isFetching && !comments.length) && <p>
              Loading...
            </p>
          }
          {
            (!isFetching && !comments.length) && <p>
              No matching comment found!
            </p>
          }
        </div>
        {comments.map((comment: Comment) => {
          return <CommentItem key={comment.index} commentItem={comment} />;
        })}
      </div>
      <Pagination
        totalPage={Math.ceil(total / 10)}
        page={page}
        onPageChange={(pageNum) => setPage(pageNum)}
      />
    </div>
  );
}

export default App;
