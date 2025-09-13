
function SearchAndFilter({handelSearch,searchValue,handelFilter}) {
    return (  
         <form className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between  gap-2" role="search" onSubmit={(e)=>e.preventDefault()}>
                    <div className="d-flex position-relative">
                        <input className="form-control  pe-2" type="text" placeholder="Search By name" aria-label="Search" onChange={handelSearch} value={searchValue}/>
                        <i className="fa-solid fa-magnifying-glass position-absolute" style={{right:"15px",top:"12px"}}></i>
                    </div>
                        <select id="filter" className='fw-light border text-center' style={{padding:"6px 0px",minWidth:"150px" }} name="filter" onChange={handelFilter}>
                            <option value="sortBy">Sort by</option>
                            <option value="name">Name</option>
                            <option value="highPrice">High Price</option>
                            <option value="lowPrice">Low Price</option>
                            <option value="highRate">High Rate</option>
                            <option value="lowRate">low Rate</option>
                        </select>
                </form>
    );
}

export default SearchAndFilter;