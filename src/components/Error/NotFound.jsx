import { useNavigate } from "react-router";


function NotFound() {
    const navigate=useNavigate()
    return (
        <div style={{height:"70vh"}}>
        <div className="center w-75 ">
            <div className="text-center">
                <h2 style={{fontSize:"4rem"}}>404 Not Found</h2>
                <p className="my-4">Your visited page not found. You may go home page.</p>
                <button className="btn btn-danger py-3 px-4 mt-3 " onClick={()=>navigate("/")}>Back to Home Page</button>
            </div>
        </div>
    </div> );
}

export default NotFound;