export const getUserProfile = async ({ userId }: { userId: string }) => {
  const res = await fetch(`/api/user?id=${userId}`);
  const data = await res.json();
  return data;
};
