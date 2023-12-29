import { ApplicationList } from "@/components/admin/application";
import { showAllDriverApplications } from "@/models/application.model";

export default async function Admin() {
  // const data = await fetch(`${process.env.NEXTAUTH_URL}/api/driver/admin`, {
  //   cache: "no-cache",
  // })
  //   .then((res) => res.json())
  //   .then((res) => res.data);
  const data = await showAllDriverApplications();

  return (
    <div className="container">
      <h1>Application List</h1>
      <ApplicationList data={data} />
    </div>
  );
}
