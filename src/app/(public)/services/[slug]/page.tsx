import type { Metadata } from "next";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } =
    await params;

  return {
    title: slug,
    description: `Service page for ${slug}`,
  };
}

export default async function ServicePage({
  params,
}: Props) {
  const { slug } =
    await params;

  return <div>{slug}</div>;
}
