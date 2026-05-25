export class Email {
  private readonly value: string;

  constructor(value: string) {
    const normalized =
      value.trim().toLowerCase();

    const isValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        normalized,
      );

    if (!isValid) {
      throw new Error("Invalid email");
    }

    this.value = normalized;
  }

  toString() {
    return this.value;
  }
}