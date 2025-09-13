
function Loading() {
    return ( <div className="d-flex justify-content-center align-items-center  position-fixed top-0 start-0 bg-body-secondary bg-opacity-50" style={{width:"100vw",height:"100vh",zIndex:"2000"}}>
        <div className="spinner-border text-danger fs-3 " role="status" style={{width:"70px",height:"70px"}}><span className="visually-hidden">Loading...</span></div>
    </div> );
}

export default Loading;