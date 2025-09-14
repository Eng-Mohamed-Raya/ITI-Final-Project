import { useEffect, useState } from "react";
import { Navigate } from "react-router";

function DoneOrder() {
   const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (redirect) {
    return <Navigate to="/" />;
  }

    return ( <div className="container done-order " style={{minHeight:"100vh"}}>
            <div className="text-center center mt-5">
                     <img src="/cart/pngwing.com (20) 1.svg" />
                    <h1 style={{color:"var(--secondary-color)"}}>Thank you for ordering!</h1>
            </div>
    </div> );
}

export default DoneOrder;