import { useState, useEffect } from "react";
import Cookies from "js-cookie";


const All_Milestones = ({ close }) => {
  const [milestones, setMilestones] = useState([]);
  const [userMilestone, setUserMilestone] = useState(0);

  useEffect(() => {
    fetch(`http://127.0.0.1:4000/milestones`)
      .then((response) => response.json())
      .then((milestones) => {
        setMilestones(milestones);
        console.log(milestones);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    const authCookie = Cookies.get("auth");
    const idFromCookie = JSON.parse(authCookie).user_id;
    fetch(`http://127.0.0.1:4000/milestone_reached?userId=${idFromCookie}`)
      .then((response) => response.json())
      .then((milestone_reached) => {
        setUserMilestone(milestone_reached);
        console.log("heruheurer" + userMilestone);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);


  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-[#D7BC95] p-8 rounded-lg max-w-6xl">
          <div class="flex items-center justify-between p-2 border-b border-gray-900 rounded-t ">
            <h3 class="text-4xl text-[#211B11]">Milestones</h3>
            <button
              onClick={close}
              class="text-[#211B11] bg-transparent hover:bg-brown-50 rounded-lg text-lg  ms-auto inline-flex justify-center items-center"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          <div>
            <div className="row">
            {milestones.map((milestone, index) => (
                  <div key={index}>
                    {milestone.milestone_icon !== "N/A" &&
                      (
                        <div
                          className={`m-3 flex flex-col justify-center items-center ${
                            milestone.milestone_id <= userMilestone
                              ? ""
                              : "grayscale"
                          }`}
                        >
                          <img
                            src={require("../" + milestone.milestone_icon)}
                            alt="Milestone"
                          />
                          <p className="text-md text-center">
                            {milestone.milestone_name}
                          </p>
                          <p className="text-sm text-center">
                            {milestone.milestone_points} points
                          </p>
                        </div>
                      )}
                  </div>
                ))}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default All_Milestones;
