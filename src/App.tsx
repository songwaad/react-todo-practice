import { Link } from "react-router";
import { Button } from "./components/ui/button";
import { apiLogout } from "./api/auth";

function App() {
  const handleLogout = async () => {
    await apiLogout();
    window.location.reload();
  }

  return (
    <>
      <div>App.tsx</div><br />
      <Link to="/login">Go to Login Page</Link>
      <br />
      <Link to="/signup">Go to Sign Up Page</Link>
      <br />
      <Button onClick={handleLogout}>Log out</Button>
    </>
  );
}

export default App;
