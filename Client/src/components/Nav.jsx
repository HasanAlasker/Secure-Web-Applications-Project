import { useAuth } from "../context/authContext";

function Nav({ onMenuOpen }) {
  const { user, logout, isAdmin, isUser } = useAuth();

  console.log(user)
  return (
    <>
      <nav>
        <div>
          {user && isUser && <a href="/me">My Info</a>}
          {user && isAdmin && <a href="/admin">Users Info</a>}
        </div>
        <div>
          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <a href="/login">Login</a>
          )}
        </div>
      </nav>
    </>
  );
}

export default Nav;
