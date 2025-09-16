"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useDebounce from "@/hooks/useDebounce";
import queryString from "query-string";
import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const query = {
      q: debouncedValue, // changed param name to 'q' for Spotify search API convention if desired
    };

    const url = queryString.stringifyUrl({
      url: "/search",
      query: query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="What do you want to listen to?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
