import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { DashboardLayout } from "@/features/dashboard";
import { useGetOrder } from "@/features/order";
import { UserRole } from "@/features/user";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components";
import { withRoleAuthorization } from "@/shared/utils";

export function OrderPage() {
  const { id } = useParams();
  const { data: order } = useGetOrder(id as string);
  return (
    <DashboardLayout
      navbar={{
        backLink: {
          href: "/dashboard",
          label: "Go back to dashboard",
        },
        pageTitle: "Orders",
      }}
    >
      <div className="w-full flex flex-col items-center gap-8">
        {order && (
          <Card className="mx-auto h-fit p-4 mt-14 w-1/2">
            <CardHeader>
              <CardTitle>Price: $ {order.price.toFixed(2)}</CardTitle>
              <CardTitle className="text-green-400 ml-auto">
                Status: {order.status}
              </CardTitle>
              <CardDescription className="text-lg">
                Client: {order.user.personalDetails?.firstName}{" "}
                {order.user.personalDetails?.lastName} @{order.user.username}
              </CardDescription>
            </CardHeader>
            <CardContent>
              Course Details
              <CardDescription className="text-lg">
                {order.courses[0]?.name} by {order.courses[0]?.instructorName}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link href={`/course/${order.courses[0]?.id}`}>
                <Button>Check course</Button>
              </Link>
            </CardFooter>
          </Card>
        )}
        <Link href="/dashboard/orders">
          {" "}
          <Button>Go back to orders</Button>
        </Link>
      </div>
    </DashboardLayout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(OrderPage, {
  userRolesToExclude: [UserRole.USER],
  redirectDestination: "/",
});
