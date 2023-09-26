import { type GetServerSideProps } from "next";

import { withRoleAuthorization } from "@/features/auth";
import { Course } from "@/features/course";
import { ShopLayout } from "@/features/shop";
import { useUser } from "@/features/user";

export default function MyCoursesPage() {
  const { userData } = useUser();

  return (
    <ShopLayout>
      <div className="w-11/12 max-w-6xl mx-auto mt-10 ">
        <h1 className="text-center text-3xl font-bold  tracking-tighter md:text-5xl ">
          Your courses:{" "}
        </h1>
        <div className=" flex justify-center gap-5 mt-10 flex-wrap">
          {userData &&
            (userData?.courses?.length ?? 0) > 0 &&
            userData.courses.map((course) => (
              <Course buttonText="Watch" course={course} key={course.id} />
            ))}
        </div>
      </div>
    </ShopLayout>
  );
}

export const getServerSideProps: GetServerSideProps = ({ req, res }) => {
  return withRoleAuthorization({ req, res });
};
