"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GlobalApi from "@/app/_utils/GlobalApi";

const formSchema = z.object({
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  category: z.string().optional(),
});

const SearchShopForm = ({ onFilter }) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    GlobalApi.GetCategory().then((resp) => {
      setCategoryList(resp.categories);
    });
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minPrice: "",
      maxPrice: "",
      category: "",
    },
  });

  const onSubmit = (values) => {
    onFilter(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col md:flex-row gap-5 justify-between items-center mt-15"
      >
        <FormField
          control={form.control}
          name="minPrice"
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <FormLabel>Precio mínimo</FormLabel>
              <FormControl>
                <Input placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxPrice"
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <FormLabel>Precio máximo</FormLabel>
              <FormControl>
                <Input placeholder="1000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className={"w-full"}>
              <FormLabel>Categoría</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryList.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className={"w-full md:w-fit"} type="submit">Buscar</Button>
      </form>
    </Form>
  );
};

export default SearchShopForm;
