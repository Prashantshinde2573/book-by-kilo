import CategoryLandingPage from "./CategoryLandingPage";

export default function CategoryPage({ allBooks, type = "category" }) {
  return <CategoryLandingPage allBooks={allBooks} type={type} />;
}
