import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  // items: [{ label, to }]
  return (
    <nav className="catalog-breadcrumbs" aria-label="Breadcrumbs">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="sep">/</span>}
          {item.to
            ? <Link to={item.to}>{item.label}</Link>
            : <strong className="current">{item.label}</strong>
          }
        </span>
      ))}
    </nav>
  );
}
