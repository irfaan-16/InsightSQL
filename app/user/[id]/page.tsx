import SolvedProblemsStats from "@/components/SolvedProblemsStats";
import connect from "@/lib/database/mongo";
import User from "@/lib/models/User";
import Image from "next/image";
const page = async ({ params }) => {
  async function findUser() {
    "use server";
    await connect();
    const user = await User.findById(params.id);
    return user;
  }
  const user = await findUser();
  console.log(user);
  return (
    <main className="p-6">
      <div className="flex gap-6 items-center bg-[#131317] rounded-md max-w-max p-4 m-auto">
        <div className="rounded-md flex items-center gap-3">
          <Image
            src={user?.avatar as string}
            alt="user avatar"
            height={100}
            width={100}
            className="rounded-full"
          />
          <div>
            <h1 className="text-4xl font-bold mb-1">{user?.name}</h1>
            <p>{user?.email}</p>
          </div>
        </div>
        <SolvedProblemsStats showFullStats={true} userId={params.id} />
      </div>
    </main>
  );
};

export default page;
