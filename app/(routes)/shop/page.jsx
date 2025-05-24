"use client";

import DealsComponent from "@/app/_components/DealsComponent";
import SearchShopForm from "@/app/_components/forms/SearchShopForm";
import CardProduct from "@/app/_components/products/CardProduct";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";

const ShopPage = () => {
  const [productList, setProductList] = useState([]);
  const [originalList, setOriginalList] = useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    GlobalApi.GetProducts().then((resp) => {
      setProductList(resp.products);
      setOriginalList(resp.products);
    });
  };

  const handleFilter = (filters) => {
    const { minPrice, maxPrice, category } = filters;

    const filtered = originalList.filter((product) => {
      const price = parseFloat(product.price);
      const min = parseFloat(minPrice) || 0;
      const max = parseFloat(maxPrice) || Infinity;
      console.log(category);
      console.log(product);
      console.log(product.category[0]?.id);

      return (
        price >= min &&
        price <= max &&
        (!category || product.category[0]?.id === category)
      );
    });

    setProductList(filtered);
  };

  return (
    <div className="contenedor">
      <DealsComponent />
      <SearchShopForm onFilter={handleFilter} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
        {productList.map((product, index) => (
          <CardProduct key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
