
function Pagination({pages,page,setPage}) {
    return (  <nav aria-label="Page navigation example my-5">
                    <ul className="pagination justify-content-center">
                        <li className="page-item ">
                        <span className={`page-link ${page <=1 && 'disabled opacity-75'}`} role='button' onClick={()=>{ setPage(page-1)}} style={{backgroundColor:"var(--secondary-color)",color:"var(--text-secondary-color)"}}>Previous</span>
                        </li>
                        {[...Array(pages)].map((_,i)=><li key={i+1} className="page-item"><span className="page-link text-danger" role='button' onClick={()=> setPage(i+1)}>{i+1}</span></li>)}
                     
                        <li className="page-item">
                        <span className={`page-link ${pages<=page && 'disabled opacity-75'}`} role='button' onClick={()=>{setPage(page+1)}} style={{backgroundColor:"var(--secondary-color)",color:"var(--text-secondary-color)"}}>Next</span>
                        </li>
                    </ul>
                    </nav> );
}

export default Pagination;