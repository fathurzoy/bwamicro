import Head from "next/head";
import Link from "next/link";

function Random({ data }) {
  // console.log(data);
  return (
    <>
      <Head>
        <title>Micro | Random</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mt-12 mx-auto">
        <h1 className="text-3xl">Fetching random words</h1>
        <ul>
          {data.map((todo) => {
            // null coalesing javascript jadi ketika tidak ada title akan muncul apa
            return (
              <li key={todo.id} className="border border-indigo-700 p-4">
                {todo?.title ?? "-"}{" "}
                <Link href="/random/[id]" as={`/random/${todo.id}`}>
                  <a>Launch</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

Random.getInitialProps = async (ctx) => {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => json);
    return { data };
  } catch (error) {}
};

export default Random;
