import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>choose something</h1>
      <p>
        <Link href={"/meals"}>Meals</Link>{" "}
      </p>
      <p>
        <Link href={"/community"}>community</Link>{" "}
      </p>
    </main>
  );
}
