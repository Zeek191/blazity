import UserBar from "@/components/sections/user-bar/user-bar";
import withProtectedPath from "@/base/hoc/with-protected-path";

function Dashboard() {
  return (
    <div>
      <UserBar />
    </div>
  );
}

export default withProtectedPath(Dashboard);
