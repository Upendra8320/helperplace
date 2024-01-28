import helperplacelogo from "../assets/helperplace_logo.jpg";
import locationlogo from "../assets/helperlocationlogo.webp"
import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    const [toggle, setToggle] = useState(false)

    const togglebtn = ()=>{
        setToggle(!toggle)
    }
  return (
    <>
    <nav className="lg:px-5 sticky top-0 border-b-[1px] border-gray-100 2xl:w-[80%] m-auto bg-white z-[1000]">
      <div className="hidden lg:flex xl:w-[80%] lg:mx-auto lg:items-center lg:justify-between h-[60px]">
        {/* hidden below 786px */}
        <div className="hidden lg:block">
         <Link to="/find-candidate"><img className="max-w-[180px]" src={helperplacelogo} alt="" /></Link> 
        </div>
        <div className="hidden lg:flex lg:w-[100%] lg:justify-between lg:px-10 lg:items-center xl:px-4">
          <div className="w-auto">
            <Link className="font-medium text-[1rem] lg:mx-2 xl:mx-4" to="/">
              JOBS
            </Link>
            <Link className="font-medium text-[1rem] lg:mx-2 xl:mx-4" to="/find-candidate">
              CANDIDATES
            </Link>
            <Link className="font-medium text-[1rem] lg:mx-2 xl:mx-4" to="#">
              AGENDY SERVICES
            </Link>
            <Link className="font-medium text-[1rem] lg:mx-2 xl:mx-4 " to="#">
              NEWS & MORE
            </Link>
          </div>
          <div>
            <button className="mx-2 bg-green-500 text-white box-border py-3 px-6 rounded font-medium lg:mx-0">
              LOGIN
            </button>
            <button className="mx-2 bg-yellow-500 text-white box-border py-3 px-6 rounded font-medium">
              REGISTER
            </button>
          </div>
        </div>
        {/* hidden below 786 ends here */}
      </div>
      <div className="py-1 px-8 flex items-center lg:hidden border-b-[1px] border-gray-100">
        <div className=" box-border">
        <div className="text-[1.4rem] text-blue-900 mr-5 cursor-pointer hover:bg-gray-100 p-2 hover:rounded-full font-bold h-[100%] w-[100%] flex justify-center items-center" onClick={togglebtn}>&#9776;</div>
        </div>
        <div className="w-[100%] flex justify-between items-center m-auto">
          <div className="m-auto">
          <Link to="/find-candidate"> <img className="max-w-[180px]" src={helperplacelogo} alt="helperplacelogo" /></Link> 
          </div>
        </div>
      </div>
    </nav>

    {/* sidebar */}
    <div id="maindiv" className={`absolute h-[100%] transition-all max-w-[320px] bg-red-100 lg:hidden ${toggle ? "ml-[0px]" : "ml-[-320px]" } z-[100]`}>
        <div id="subdiv" className="py-4">
            <div id="buttonsdiv" className="flex items-center justify-center">
                <div>
                    <button className="mx-2 bg-green-500 text-white box-border py-3 px-6 rounded font-medium">Login</button>
                    <button className="mx-2 bg-yellow-500 text-white box-border py-3 px-6 rounded font-medium lg:mx-0">Register</button>
                </div>
                <div><img className="max-w-[60px]" src={locationlogo} alt="" /></div>
            </div>
            <div className="mt-6 px-6">
                <Link className="block py-4"  to="/"><img src="" alt="" />JOBS</Link>
                <Link className="block py-4" to="/find-candidate"><img src="" alt="" />CANDIDATE</Link>
                <Link className="block py-4" to="#"><img src="" alt="" />AGENCY SERVICES</Link>
                <Link className="block py-4" to="#"><img src="" alt="" />NEWS & MORE</Link>
            </div>
        </div>
    </div>

    </>
  );
};

export default Navbar;
