import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Accordion, List, Spinner } from "flowbite-react";
import { useAuthContext } from "../context/AuthContextProvider";
import toast from "react-hot-toast";

const ViewChoices = () => {
  const { setUserInfo } = useAuthContext();

  const {
    isLoading,
    error,
    data: userSelections,
  } = useQuery({
    queryKey: ["userSelections"],
    queryFn: () => axiosInstance.get("/items/selections"),
  });

  useEffect(() => {
    if (error) {
      if (error.response && error.response.status === 401) {
        setUserInfo(null);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [error, setUserInfo]);

  return (
    <div className="container max-h-screen overflow-auto">
      <div className="pt-24">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        ) : (
          userSelections?.data?.map((user) => (
            <Accordion key={user.id} className="mb-4">
              <Accordion.Panel>
                <Accordion.Title>{user.displayName}</Accordion.Title>
                <Accordion.Content>
                  {user.choseItems.length === 0 ? (
                    <div>
                      <p>User did not select any item</p>
                    </div>
                  ) : (
                    <List>
                      {user.choseItems.map((itemObj) => (
                        <List.Item key={itemObj.itemId}>
                          {itemObj.item.itemName}
                        </List.Item>
                      ))}
                    </List>
                  )}
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewChoices;
