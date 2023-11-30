import dayjs from "dayjs";
import Link from "next/link";

import { Button } from "@/shared/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { type OrderDto } from "../types";

interface Props {
  orders: OrderDto[];
}

export const OrdersTable = ({ orders }: Props) => {
  return (
    <Table className="mt-12">
      <TableCaption>A list of orders.</TableCaption>
      <TableHeader>
        <TableRow className="border-slate-800">
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Creation date</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id} className="border-slate-800">
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{order.price}</TableCell>
            <TableCell>
              {dayjs(order.createdAt).format("YYYY-MM-DD HH:mm")}
            </TableCell>
            <TableCell>{order.user.username}</TableCell>
            <TableCell>
              <Link href={`/dashboard/orders/${order.id}`}>
                <Button>Details</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
