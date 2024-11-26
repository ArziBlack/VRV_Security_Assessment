/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAdminStore } from "../api/admin";
import { useEffect } from "react";
import { Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useAuthStore } from "../api/auth";

export default function DataTable() {
  const { users, getAllUsers } = useAdminStore();
  const { user } = useAuthStore();
  console.log(users);
  console.log(user);

  useEffect(() => {
    getAllUsers();
  }, []);

  if (user?.role !== "ADMIN") {
    return (
      <div className="flex w-full items-center justify-center h-screen">
        {" "}
        you are not authorized to view this page
      </div>
    );
  }

  return (
    <div className="p-5 mt-10">
      <Heading size="md" mb={5}>
        User Data
      </Heading>
      <Table variant="simple" colorScheme="purple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Created At</Th>
            <Th>Updated At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users &&
            users.map((user: any) => (
              <Tr key={user.id}>
                <Td>{user?.id}</Td>
                <Td>{user?.name}</Td>
                <Td>{user?.email}</Td>
                <Td>{new Date(user?.createdAt).toLocaleString()}</Td>
                <Td>{new Date(user?.updatedAt).toLocaleString()}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </div>
  );
}
