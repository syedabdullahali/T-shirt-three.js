const getHeaders = () => {
    const token = JSON.parse(localStorage.getItem("user-auth") || '{}')?.token;
    return {
      "Content-Type": "application/json",
      "Authorization": token ? `${token}` : '',
    };
  };

export {getHeaders}  