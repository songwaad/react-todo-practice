import { Link } from "react-router";

function App() {

  return (
    <>
      <div>App.tsx</div><br />
      <Link to="/login">Go to Login Page</Link>
      <br />
      <Link to="/signup">Go to Sign Up Page</Link>
    </>
  );
}

export default App;
