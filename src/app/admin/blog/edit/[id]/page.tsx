import { Container } from "@/components/ui/Container";
import { getBlogById } from "@/app/actions/blog";
import { notFound, redirect } from "next/navigation";
import BlogForm from "../../components/BlogForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function EditBlogPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const { data: blog, success } = await getBlogById(id);

  if (!success || !blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-obsidian pt-12 pb-24">
      <Container>
        <BlogForm initialData={blog} isEdit={true} blogId={id} />
      </Container>
    </main>
  );
}
