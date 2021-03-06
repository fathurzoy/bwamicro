import React, { useState, useEffect, useRef } from "react";

import Head from "next/head";
import Link from "next/link";

import courses from "src/constants/api/courses";

import Header from "src/parts/Header";
import Footer from "src/parts/Footer";
import ListCourses from "src/parts/ListCourses";

function Courses({ data }) {
  // console.log(data);

  const [Search, setSearch] = useState(() => "");
  const [SearchFocus, setSearchFocus] = useState(() => false);
  const [SearchResponse, setSearchResponse] = useState(() => ({
    isLoading: false,
    isError: false,
    data: [],
  }));

  const selectWrapper = useRef(null);

  function clickOutside(event) {
    if (selectWrapper && !selectWrapper.current.contains(event.target)) {
      setSearch("");
    }
  }

  let timeoutSearch = useRef(null);
  function handleSearch(e) {
    e.persist();
    setSearch(e.target.value);
    clearTimeout(timeoutSearch.current);
    timeoutSearch.current = setTimeout(() => {
      setSearchResponse({
        isLoading: true,
        isError: false,
        data: null,
      });
      courses
        .all({ params: { q: e.target.value } })
        .then((res) => {
          // console.log(res);
          setSearchResponse({
            isLoading: false,
            isError: false,
            data: res.data,
          });
        })
        .catch((err) => {
          setSearchResponse({
            isLoading: false,
            isError: true,
            data: null,
          });
        });
    }, 1000);
  }

  useEffect(() => {
    window.addEventListener("mousedown", clickOutside);
    return () => {
      window.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  // console.log(SearchResponse);

  return (
    <>
      <Head>
        <title>Micro | Courses</title>
      </Head>

      <section className="pt-10 z-30 relative" style={{ height: 360 }}>
        <div className="absolute inset-0 z-0 w-full h-full bg-black opacity-75">
          <div
            className="meta-title absolute bottom-0 object-fill z-0 w-full flex justify-center items-center"
            style={{ marginBottom: "-25px" }}
          >
            <div className="">
              <h3 className="text-6xl text-center text-teal-500 font-semibold">
                Library
              </h3>
              <h4 className="text-lg text-center text-white">
                Jangan mau kalah update dengan yang lainnya. <br /> Yuk ikuti
                perkembangan teknologi
              </h4>
              <div className="flex flex-col relative" ref={selectWrapper}>
                <input
                  type="text"
                  id="q"
                  onChange={handleSearch}
                  onFocus={() => setSearchFocus(!SearchFocus)}
                  onBlur={() => setSearchFocus(!SearchFocus)} //blur tuh ketika kita masuk dan keluar dari input
                  value={Search}
                  placeholder={
                    SearchFocus
                      ? "Ketik minimal 3 karakter untuk mencari"
                      : "Lagi nyari kelas apa?"
                  }
                  className="bg-white focus:outline-none transition-all duration-200 focus:border-teal-500 border border-gray-600 px-4 py-3 w-full mt-6"
                />
                {Search.length >= 3 && (
                  <div
                    className="flex flex-col absolute py-2 px-4 bg-white border border-gray-600 w-full"
                    style={{ top: 75 }}
                  >
                    {SearchResponse.isLoading ? (
                      "Loading... "
                    ) : (
                      <>
                        {SearchResponse.isError &&
                          "Something is technically wrong"}
                        {SearchResponse.data?.length > 0
                          ? SearchResponse.data?.map((item, index) => {
                              console.log(item);
                              return (
                                <div
                                  key={index}
                                  className="flex items-center -mx-4 py-2 cursor-pointer hover:bg-gray-200 relative"
                                >
                                  <div
                                    className="w-auto px-4"
                                    style={{ width: 150 }}
                                  >
                                    <img
                                      src={item?.thumbnail ?? ""}
                                      alt={item?.name ?? "Course Name"}
                                    />
                                  </div>
                                  <div className="w-full px-4">
                                    <h6 className="text-gray-900 text-lg">
                                      {item?.name ?? "Course Name"}
                                    </h6>
                                    <p className="text-gray-600">
                                      {item?.level ?? "level"}
                                    </p>
                                    <Link
                                      href="/courses/[id]"
                                      as={`/courses/${item.id}`}
                                    >
                                      <a className="link-wrapped"></a>
                                    </Link>
                                  </div>
                                </div>
                              );
                            })
                          : "No courses found"}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto z-10 relative">
          <Header></Header>
        </div>
      </section>

      <section className="container mx-auto pt-24">
        <ListCourses data={data}></ListCourses>
      </section>

      <section className="mt-24 bg-indigo-1000 py-12">
        <Footer></Footer>
      </section>

      {/* <main className="container mt-12 mx-auto">
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
      </main> */}
    </>
  );
}

// Courses.getInitialProps = async (ctx) => {
//   try {
//     const data = await fetch("https://jsonplaceholder.typicode.com/todos")
//       .then((response) => response.json())
//       .then((json) => json);
//     return { data };
//   } catch (error) {}
// };

Courses.getInitialProps = async (ctx) => {
  try {
    const data = await courses.all();

    return { data: data.data };
  } catch (error) {}
};

export default Courses;
