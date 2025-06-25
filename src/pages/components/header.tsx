import React from "react";
import { useLogout, useGetIdentity, useNavigation } from "@refinedev/core";

import { Link } from "react-router";

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  const { data: identity } = useGetIdentity();

  const { listUrl, createUrl } = useNavigation();

  return (
    <>
      <h2>Welcome, </h2>
      <span>{identity?.name ?? ""}</span>
      <Link to={listUrl("protected-products")}>List Products</Link>
      <Link to={createUrl("protected-products")}>Create Product</Link>
      <button
        type="button"
        disabled={isLoading}
        onClick={mutate}
      >
        Logout
      </button>
    </>
  );
};