interface UserData {
  name: string;
  email: string;
}

const getUserData = async (): Promise<UserData> => {

  return {
    name: "Alex",
    email: "alex@example.com",
  };
};

export default async function UserProfile() {
  const userData = await getUserData();

  return (
    <div className="bg-gray-700 p-4 rounded">
      <h4 className="font-bold mb-2">User Profile (SSR)</h4>
      <p>
        <strong>Name:</strong> {userData.name}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
    </div>
  );
}
