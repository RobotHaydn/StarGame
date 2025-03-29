import { Link } from "react-router-dom";

export function Welcome() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/gig">Gig</Link>

      <br />
      <Link to="/base">Base</Link>
    </div>
  );
}
