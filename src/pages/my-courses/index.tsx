import { Course } from "@/features/course";
import { ShopLayout } from "@/features/shop";
import { useUser } from "@/features/user";
import { withRoleAuthorization } from "@/shared/utils";

function MyCoursesPage() {
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

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withRoleAuthorization(MyCoursesPage, {
  userRolesToExclude: [],
  redirectDestination: "/auth",
});
