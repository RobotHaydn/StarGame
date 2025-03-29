import { Link } from "react-router-dom";

export function Base() {
  return (
    <div>
      <h1>Base</h1>
      <Link to="/gig">Gig</Link>

      <br />

      <Link to="/">Return to Welcome</Link>
    </div>
  );
}
