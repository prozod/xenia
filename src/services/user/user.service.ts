export const getUserProfile = async ({ userId }: { userId: string }) => {
  const res = await fetch(`/api/user?id=${userId}`);
  if (!res.ok) {
    throw new Error(`An error occured in getUserProfile fn`);
  }
  const data = await res.json();
  return data;
};
