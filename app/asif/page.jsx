import DriverApplication from "@/models/application.schema";

export default async function Page() {
  async function handleSubmit() {
    "use server";
    const data = await DriverApplication.updateMany({}, { status: "pending" });
    console.log(data);
  }
  return (
    <div>
      <form action={handleSubmit}>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
