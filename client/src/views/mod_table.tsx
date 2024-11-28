/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAdminStore } from "../api/admin";
import { useEffect } from "react";
import { Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useAuthStore } from "../api/auth";
import { Role } from "../interfaces/auth";
import VerifyModal from "../components/verify-modal";
import React from "react";

export default function ModDataTable() {
  const { users, getModAllUsers } = useAdminStore();
  const { user } = useAuthStore();
  const [modal, setModal] = React.useState(false);
  const [id, setId] = React.useState(0);
  function toggleModal() {
    setModal(!modal);
  }
  console.log(users);
  console.log(user);

  useEffect(() => {
    getModAllUsers();
  }, []);

  console.log(users);
  console.log(Role.SECURITY_ANALYST);

  if (user?.role !== Role.SECURITY_ANALYST) {
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
              <Tr
                key={user.id}
                onClick={() => {
                  toggleModal();
                  setId(user?.id);
                }}
              >
                <Td>{user?.id}</Td>
                <Td>{user?.name}</Td>
                <Td>{user?.email}</Td>
                <Td>{new Date(user?.createdAt).toLocaleString()}</Td>
                <Td>{new Date(user?.updatedAt).toLocaleString()}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      {modal && <VerifyModal toggleModal={toggleModal} id={id} />}
    </div>
  );
}
