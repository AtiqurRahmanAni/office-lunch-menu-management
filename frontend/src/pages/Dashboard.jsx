import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Button, Checkbox, Spinner, Table } from "flowbite-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ["itemsToday"],
    queryFn: () => axiosInstance.get("/items/today"),
  });

  const mutation = useMutation({
    mutationFn: () => {
      return axiosInstance.post("/items/choose", { itemIds: selectedItems });
    },
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: ["itemsToday"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        error.response ? error.response.data.message : "Something went wrong"
      );
    },
  });

  const onSelectItem = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
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
        <h1 className="text-center font-semibold text-2xl">Today's Item</h1>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center">
          <Spinner aria-label="Extra large spinner example" size="xl" />
        </div>
      )}
      {data && (
        <div>
          <div className="overflow-auto">
            <Table striped hoverable>
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
                          selectedItems.includes(item.id) ||
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
          </div>
          <div className="mt-4">
            <Button
              color="blue"
              onClick={() => mutation.mutate()}
              isProcessing={mutation.isPending}
              disabled={mutation.isPending}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
