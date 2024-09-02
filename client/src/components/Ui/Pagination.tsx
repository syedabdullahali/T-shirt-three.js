interface Pagination {
    paging:number,
    setPaging:(paging:number)=>void,
    currentPage:number,
    totalDocuments:number
}

const handaleActivePage = (number:number|string,currentNumber:number|string)=>{
    return `mx-1 cursor-pointer ${number===currentNumber?"bg-blue-700 text-white":"bg-white border hover:bg-blue-50 "} rounded  border  py-1 px-4 text-lg`
}

const Pagination = ({paging,setPaging,currentPage,totalDocuments}:Pagination)=>{

  return  +totalDocuments?  <div id="pageing"  className="flex justify-center mt-4">
    <div   className="mb-2  flex w-96 h-10 justify-center itmes-center text-black">
      <button
         type="button"
         id="pageing"
        className="text-6xl  grid content-center   "
        disabled={paging != 0 ? false : true}
        onClick={() => paging > 0 && setPaging(paging - 1)}
      >
        <span className="mb-3">&laquo;</span>
      </button>

      <button
          type="button"
          id="pageing" 
          className={handaleActivePage(paging + 1,currentPage)}
          onClick={() => setPaging(0)}
      >
        {paging + 1}
      </button>
      {totalDocuments > (paging + 1) * 5 && (
        <button
        type="button"
        id="pageing"
        className={handaleActivePage(paging + 2,currentPage)}
        onClick={() => setPaging(paging + 1)}
        >
          {paging + 2}
        </button>
      )}
      {totalDocuments > (paging + 2) * 5 && (
        <button
          type="button"
          id="pageing" 
          className={handaleActivePage(paging + 3,currentPage)}
          onClick={() => setPaging(paging + 2)}
        >
          {paging + 3}
        </button>
      )}

      {totalDocuments > (paging + 1) * 5 ? (
        <button
        id="pageing" 
          type="button"
          className="text-6xl  grid content-center   "
          onClick={() => setPaging(paging + 1)}
        >
          <span className="mb-3">&raquo;</span>
        </button>
      ) : (
        <button
        type="button"
        id="pageing" 
        className="text-6xl  grid content-center   ">
          <span className="mb-3">&raquo;</span>
        </button>
      )}
    </div>
  </div>:''

}

export default Pagination