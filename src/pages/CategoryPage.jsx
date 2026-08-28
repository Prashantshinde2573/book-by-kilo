import { useParams } from "react-router-dom";
import CataloguePage from "./CataloguePage";

export default function CategoryPage({ allBooks }) {
  const { slug } = useParams();
  return <CataloguePage allBooks={allBooks} defaultCategory={slug} />;
}
