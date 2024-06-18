export async function wait(ms: number = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
