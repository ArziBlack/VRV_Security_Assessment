/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAdminStore } from "../api/admin";
import { useEffect } from "react";
import { Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useAuthStore } from "../api/auth";
import { Role } from "../interfaces/auth";
import VerifyModal from "../components/verify-modal";
import React from "react";
import { Spinner } from "@chakra-ui/react";

export default function ModDataTable() {
  const { users, getModAllUsers, loading } = useAdminStore();
  const { user } = useAuthStore();
  const [modal, setModal] = React.useState(false);
  const [id, setId] = React.useState(0);
  function toggleModal() {
    setModal(!modal);
  }

  useEffect(() => {
    getModAllUsers();
  }, []);

  if (user?.role !== Role.SECURITY_ANALYST) {
    return (
      <div className="flex w-full items-center justify-center h-screen">
        {" "}
        you are not authorized to view this page
      </div>
    );
  }

  if (loading) {
    return (
      <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full inset-0 bg-black/50 backdrop-blur-md">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-5 mt-10">
      <Heading size="md" mb={5}>
        Unverified Users
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
            users
              ?.filter((user: any) => !user.isVerified)
              .map((user: any) => (
                <Tr
                  key={user?.id}
                  onClick={() => {
                    toggleModal();
                    setId(user?.id);
                  }}
                  className="cursor-pointer"
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
