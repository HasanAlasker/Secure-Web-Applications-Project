import { useAuth } from "../context/authContext";

function Nav({ onMenuOpen }) {
  const { user, logout, isAdmin, isUser } = useAuth();

  return (
    <>
      <nav>
        <div className="big linksCont">
          <a href="/">Home</a>
          {user && isUser && !user.isDeleted && <a href="/me">My Info</a>}
          {user && isAdmin && <a href="/admin">Users Info</a>}
        </div>
        <div>
          {user ? (
            <button className="logout big" onClick={logout}>
              Logout
            </button>
          ) : (
            <div className="linksCont">
              <a className="big" href="/login">
                Login
              </a>
              <a className="big" href="/register">
                Register
              </a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Nav;
