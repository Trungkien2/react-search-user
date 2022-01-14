import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollwers] = useState(mockFollowers);

  // requesst loading
  const [request, setRequest] = useState(0);
  const [loading, setLoanding] = useState(false);
  const [error, seterror] = useState({ show: false, msg: "" });

  const seachGithubUser = async (user) => {
    toggleEror();
    setLoanding(true);
    const respone = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log(error)
    );
    if (respone) {
      setGithubUser(respone.data);
      const { login, followers_url } = respone.data;
      await Promise.allSettled([
        axios(`${rootUrl}/users/${user}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ]).then((result) => {
          const [repos,followers] = result;
          const status = 'fulfilled';
          if(repos.status===status){
              setRepos(repos.value.data);
          }
          if(followers.status===status){
            setFollwers(followers.value.data);
        }
          
      }).catch(error=>console.log(error));
    } else {
      toggleEror(true, "no user with that user name");
    }
    setLoanding(false);
  };
  // check rate
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let { remaining } = data.rate;
        setRequest(remaining);
        if (remaining === 0) {
          toggleEror(true, "sorry, you have exceeded your rate limit");
        }
      })
      .catch((error) => console.log(error));
  };

  function toggleEror(show = false, msg = "") {
    seterror({ show, msg });
  }
  useEffect(() => {
    checkRequest();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        request,
        error,
        seachGithubUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
