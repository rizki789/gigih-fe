const Login = () => {
        const handleLogin = () => {
            window.open(
              `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/`
            );
          };

          return (
            <div className="App">
              <div className="btn-wrapper">
                <h1>Click here..</h1>  
                <button className="btn bg-secondary1" onClick={() => handleLogin()}>
                  Login
                </button>
              </div>
            </div>
          );
}

export default Login