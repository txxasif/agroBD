import ApplicationList from "@/components/admin/application";

export default async function Admin() {
  const data = await fetch(`${process.env.NEXTAUTH_URL}/api/driver/admin`, {
    cache: "no-cache",
  })
    .then((res) => res.json())
    .then((res) => res.data);

  return (
    <div className="container">
      <h1>Application List</h1>
      <ApplicationList data={data} />
    </div>
  );
}
