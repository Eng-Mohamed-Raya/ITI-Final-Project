import GetLocation from "../../utilities/GetLocation";

function Profile() {
      
    return ( <div className="container">
    <div className="d-flex align-items-center justify-content-between my-5">
        <GetLocation/>
        <div>Welcome!<span className="text-danger ">  Mohamed</span></div>
    </div>
    <h1>profile</h1>
    </div> );
}

export default Profile;