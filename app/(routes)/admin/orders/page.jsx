"use client";
import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const columns = [
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "adress",
    header: "Address",
    cell: ({ row }) => {
      const address = `${row.original.adress}, ${row.original.city}, ${row.original.country}`;
      return <div>{address}</div>;
    },
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const products = row.original.productocantidad;
      return (
        <div className="flex flex-col gap-2">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 border p-1 rounded"
            >
              <Image
                src={product.product.image.url}
                alt={product.product.name}
                width={40}
                height={40}
                className="rounded"
              />
              <div>
                <div className="text-sm font-medium">
                  {product.product.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  Qty: {product.cantidad}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex space-x-2">
          <Link href={`/admin/orders/${order.id}`}>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

export default function OrderAdminPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const userId = user.id;
      GlobalApi.GetOrdersUser(userId).then((resp) => {
        setOrders(resp.orders);
      });
    }
  }, [isLoaded, isSignedIn, user]);

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="contenedor p-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
