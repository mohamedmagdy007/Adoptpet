import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux"
import DashboardNavbar from "../../components/dashboard/navbar/nav-bar";

export default function SetAdmin() {

  const handleEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      getUser();
    }
  };

  const [search, setSearch] = useState({ isData: false, data: {} });
  const [serachEmail, setSearchEmail] = useState("");
  const userLogin = useSelector((state) => state.userLogin);


  const getUser = async () => {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    const header = {
      headers: {
        Authorization: userInfo.token,
      },
    };
    const { data } = await axios.get(`/api/user?email=${serachEmail}`, header);
    if (data) {
      setSearch({ isData: true, data: data });
    }

  };

  const setEmail = (event) => {
    setSearchEmail(event.target.value);
  };
  const makeAdmin = async () => {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));

    fetch(`/api/admin/assignrole/${search.data._id}?role=ADMIN`, {
      method: "PATCH",
      headers: { Authorization: userInfo.token },
    })
      .then((response) => response.json())
      .then((data) => {

      });
    const hideUser = { ...search };
    hideUser.isData = false;
    setSearch(hideUser);
  };
  const removeAdmin = async () => {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));


    fetch(`/api/admin/assignrole/${search.data._id}?role=USER`, {
      method: "PATCH",
      headers: { Authorization: userInfo.token },
    })
      .then((response) => response.json())
      .then((data) => {

      });
    const hideUser = { ...search };
    hideUser.isData = false;
    setSearch(hideUser);
  };

  return (
    <>
      <DashboardNavbar />

      {userLogin.info.userRole === "SUPER_ADMIN" && (
        <div className="my-5 form-inline">
          <div className="col-12 d-flex justify-content-center flex-wrap">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search By Email"
              aria-label="Search"
              value={serachEmail}
              onChange={setEmail}
              onKeyUp={handleEnter}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
              onClick={getUser}
            >
              Search
            </button>
          </div>
          {search.isData && (
            <div className="d-flex justify-content-center w-100">
              <div
                className="card d-flex flex-column align-content-center"
                style={{ width: "18rem" }}
              >
                <img
                  className="card-img-top"
                  src={
                    search.data.image
                      ? search.data.image
                      : `/assets/person/noAvatar.png`
                  }
                  alt="user"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {search.data.firstName} {search.data.lastName}
                  </h5>
                </div>
                <ul className="list-group list-group-flush">
                  {search.data?.phone && (
                    <li className="list-group-item">
                      <strong>Phone:</strong> {search.data.phone}{" "}
                    </li>
                  )}
                  {search.data?.country && (
                    <li className="list-group-item">
                      <strong>Country:</strong> {search.data.country}
                    </li>
                  )}
                  {search.data?.city && (
                    <li className="list-group-item">
                      <strong>City:</strong> {search.data.city}
                    </li>
                  )}
                </ul>
                <div className="d-flex justify-content-center w-100">
                  {search.data.role === "USER" && (
                    <div className="card-body">
                      <button className="btn btn-danger" onClick={makeAdmin}>
                        Make Admin
                      </button>
                    </div>
                  )}
                  {search.data.role === "ADMIN" && (
                    <div className="card-body">
                      <button className="btn btn-danger" onClick={removeAdmin}>
                        Remove Admin
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}