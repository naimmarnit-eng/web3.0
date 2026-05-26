import { PostRepository } from "@/application/ports/post-repository";

export class DeletePost {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.postRepository.findById(id);
    if (!existing) {
      throw new Error("ไม่พบบทความที่ต้องการลบในระบบ");
    }
    await this.postRepository.delete(id);
  }
}
