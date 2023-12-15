import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const [username, setUsername] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:3000/kanban";
      const token = Cookies.get("auth-token");

      if (token) {
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsername(
            response.data.email.substring(
              0,
              Math.min(1, response.data.email.length)
            )
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Error: No authentication token found.");
      }
    };

    fetchData();
  }, []);
  function Logout() {
    Cookies.remove("auth-token");
    navigate("/login");
  }
  return (
    <div className="pt-4 lg:pb-16 md:pb-10 pb-8 px-5 relative ">
      <div className="bg-gradient-to-l from-pink-500 to-[#0055D1] blur-3xl absolute inset-0 opacity-60 -z-50 top-10"></div>
      <nav className="">
        
        <ul className="flex  justify-between  items-center">
          <NavLink to="/">
            <img
              src="/logo.png"
              alt="Logo of the webapp"
              className="w-[50px] h-[50px] shadow-md rounded-xl"
            />
          </NavLink>
         
          <li className="">
            {username === undefined ? (
              <Button className="" onClick={() => navigate("/register")}>
                Signup
              </Button>
            ) : (
              <>
                <div className="bg-gradient-to-b from-blue-500 to-blue-500 flex justify-center items-center p-[1px] rounded-full">
                  <Button
                    onClick={Logout}
                    className=" text-white rounded-full font-bold text-lg uppercase"
                  >
                    {username}
                  </Button>
                </div>
              </>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
{
  /* <div className="bg-gradient-to-b from-yellow-500 to-orange-500 flex justify-center items-center p-[0.9px] rounded-full">
<Button
  onClick={Logout}
  className="bg-black text-white rounded-full"
>
  Logout
</Button>
</div> */
}
