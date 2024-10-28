

export const config = ()=>{
  const getTokenFromLocalStorage = localStorage.getItem("authentication")
  ? localStorage.getItem("authentication")
  : null;

  return {headers: {
    authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
    }`,
    Accept: "application/json",
  },
}
};

export const upadeAccessToken = (response)=>{
  const newAccessToken = response.headers['authorization'];

  if (newAccessToken) {
    const token = newAccessToken.split(' ')[1];
    localStorage.setItem('accessToken', token);
  }

}