import { useAuth } from "../context/authContext";

function Nav({ onMenuOpen }) {
  const { user, logout, isAdmin, isUser } = useAuth();

  console.log(user)
  return (
    <>
      <nav>
        <div className="big linksCont">
          <a href="/">Home</a>
          {user && isUser && <a href="/me">My Info</a>}
          {user && isAdmin && <a href="/admin">Users Info</a>}
        </div>
        <div>
          {user ? (
            <button className="logout big" onClick={logout}>Logout</button>
          ) : (
            <a className="big" href="/login">Login</a>
          )}
        </div>
      </nav>
    </>
  );
}

export default Nav;
