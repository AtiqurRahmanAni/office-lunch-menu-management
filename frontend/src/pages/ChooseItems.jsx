import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Button, Checkbox, Spinner, Table } from "flowbite-react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContextProvider";
import useFetchData from "../hooks/useFetchData";
import SelectionConfirmationModal from "../components/SelectionConfirmationModal";

const ChooseItems = () => {
  const [selectedItemsIds, setSelectedItemsIds] = useState([]);
  const queryClient = useQueryClient();
  const { setUserInfo } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading, data } = useFetchData(["itemsToday"], "/items/today");

  const mutation = useMutation({
    mutationFn: () => {
      return axiosInstance.post("/items/choose", { itemIds: selectedItemsIds });
    },
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: ["itemsToday"] });
      setSelectedItemsIds([]);
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error.response ? error.response.data.message : "Something went wrong"
      );
      if (error?.response?.status === 401) {
        setUserInfo(null);
      }
    },
  });

  const onSelectItem = (itemId) => {
    setSelectedItemsIds((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  return (
    <div className="pt-16 container">
      <div className="my-4">
        <h1 className="text-center font-semibold text-2xl">Today's Items</h1>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center">
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      )}
      {data && (
        <div>
          <Table>
            <Table.Head>
              <Table.HeadCell>Item Name</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Select</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data.data?.items?.map((item) => (
                <Table.Row key={item.id} className="w-full">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                    {item.itemName}
                  </Table.Cell>
                  <Table.Cell>{item.itemName}</Table.Cell>
                  <Table.Cell>
                    <Checkbox
                      id={item.id}
                      checked={
                        selectedItemsIds.includes(item.id) ||
                        data.data?.choseItemIds.includes(item.id)
                      }
                      onChange={() => onSelectItem(item.id)}
                      disabled={data.data?.choseItemIds.includes(item.id)}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <div className="mt-4">
            <Button
              color="blue"
              onClick={() => setIsModalOpen(true)}
              disabled={mutation.isPending || selectedItemsIds.length === 0}
            >
              Add
            </Button>
          </div>
        </div>
      )}
      <SelectionConfirmationModal
        openModal={isModalOpen}
        setOpenModal={setIsModalOpen}
        items={selectedItemsIds.map(
          (id) => data.data?.items?.find((item) => item.id === id).itemName
        )}
        onConfirm={() => mutation.mutate()}
        loading={mutation.isPending}
      />
    </div>
  );
};

export default ChooseItems;
