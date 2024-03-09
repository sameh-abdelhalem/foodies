import Link from "next/link";

const Meals = () => {
  return (
    <main>
      <h2>Meals Section</h2>
      <Link href={"/meals/share"}>share meal</Link>
    </main>
  );
};
export default Meals;
