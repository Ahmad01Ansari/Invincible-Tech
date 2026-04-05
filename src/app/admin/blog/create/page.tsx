import { Container } from "@/components/ui/Container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreateBlogForm } from "./CreateBlogForm";

export const metadata = {
  title: "Write Technical Insight | Admin Portal",
};

export default async function CreateBlogPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-obsidian py-24">
      <Container>
        <CreateBlogForm />
      </Container>
    </main>
  );
}
