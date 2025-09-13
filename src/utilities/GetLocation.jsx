import { Link, useLocation } from "react-router";


function GetLocation() {
   const location=useLocation(); 
   let path=location.pathname.split('/');
//    console.log(path);
//    console.log(location.pathname);
   return (<div className="get-location">
            {path.map((p,index)=>{
                if(index===0){
                    return <span key={index}  to={'/'} style={{color:"var(--text-third-color)"}}>home</span>
                }
                if(index===path.length-1){
                   if(path[index-1]=="products") return  <span key={index} className="text-black" to={location.pathname}> / productDetails</span>
                   return <span key={index} className="text-black" to={location.pathname}> / {p}</span>
                  }
               return <span key={index}  style={{color:"var(--text-third-color)"}}> / {p}</span>
                })}
   </div>)
}

export default GetLocation;