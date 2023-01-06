// import { useContext } from "react";
// import { CreateOllApp } from "../../context/ContextStore";
import { Helmet } from "react-helmet";



export default function Portifolio({DatatokenApp}) {
  // let { frist, last, increaceCount, DecreaceCount } = useContext(CreateOllApp);

  let {first_name,last_name,email,age} = DatatokenApp
  return (
    <>
        <Helmet>
        <meta charSet="utf-8" content=" lolo elhag" />
        <title>My Portifolio</title>
      </Helmet>

      <div className=' text-center my-3'>
    <h1 className=' text-white p-2 '>Name : <span className=" text-danger">{first_name}{last_name}</span></h1>
    <h1 className=' text-white p-2 '>email : <span className=" text-info">{email}</span></h1>
    <h1 className='   p-2 '>age : <span className=" text-primary">{age}</span></h1>

    </div>

    
    </>
  );
}
