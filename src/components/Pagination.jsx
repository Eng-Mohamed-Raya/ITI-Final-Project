import { useEffect, useState } from "react";
import ScrollToTop from "./ScrollToTop";

function Pagination({pages,page,setPage}) {
    const [clicked,setIsClicked]=useState(false)
    useEffect(()=>{
        setIsClicked(false)
    },[page])
    return (  <nav aria-label="Page navigation example my-5">
                    <ul className="pagination justify-content-center">
                        <li className="page-item ">
                        <span className={`page-link ${page <=1 && 'disabled opacity-75'}`} role='button' onClick={()=>{ setPage(page-1); setIsClicked(true)}} style={{backgroundColor:"var(--secondary-color)",color:"var(--text-secondary-color)"}}>Previous</span>
                        </li>
                        {[...Array(pages)].map((_,i)=><li key={i+1} className="page-item"><span className="page-link text-danger" role='button' onClick={()=> {
                            setIsClicked(true)
                            setPage(i+1)
                        }}>{i+1}</span></li>)}
                        {clicked && <ScrollToTop/>}
                     
                        <li className="page-item">
                        <span className={`page-link ${pages<=page && 'disabled opacity-75'}`} role='button' onClick={()=>{setPage(page+1); setIsClicked(true)}} style={{backgroundColor:"var(--secondary-color)",color:"var(--text-secondary-color)"}}>Next</span>
                        </li>
                    </ul>
                    </nav> );
}

export default Pagination;