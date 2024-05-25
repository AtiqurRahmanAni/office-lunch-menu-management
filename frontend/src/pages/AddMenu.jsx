import React from "react";
import { Formik, Form } from "formik";
import { Button, Table, Spinner } from "flowbite-react";
import { Datepicker, Label } from "flowbite-react";
import Input from "../components/Input";
import { formatDate } from "../utils";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { createItemFormSchema } from "../utils/validationSchema";

const AddMenu = () => {
  const queryClient = useQueryClient();

  const { isLoading, data: menuItems } = useQuery({
    queryKey: ["menuItems"],
    queryFn: () => axiosInstance.get("/items"),
  });

  const mutation = useMutation({
    mutationFn: (values) => {
      return axiosInstance.post("/items", values);
    },
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries({ queryKey: ["menuItems"] });
    },
    onError: (error) => {
      toast.error(
        error.response ? error.response.data.message : "Something went wrong"
      );
    },
  });

  return (
    <div className="flex justify-center items-center container gap-x-10 h-screen">
      <div>
        <div>
          <h2 className="text-center mb-6 font-semibold text-lg text-gray-700">
            Create Item
          </h2>
        </div>
        <Formik
          initialValues={{
            date: new Date().toLocaleDateString(),
            itemName: "",
            description: "",
          }}
          validationSchema={createItemFormSchema}
          onSubmit={(values) =>
            mutation.mutate({ ...values, date: formatDate(values.date) })
          }
        >
          {(props) => (
            <Form className="min-w-96">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="datePicker"
                    value="Select a date to add item"
                  />
                </div>
                <Datepicker
                  id="datePicker"
                  language="en-US"
                  minDate={new Date()}
                  onSelectedDateChanged={(e) =>
                    props.setFieldValue("date", e.toLocaleDateString())
                  }
                />
              </div>
              <div className="mt-6">
                <Input
                  label="Item Name"
                  className="mb-2"
                  fieldName="itemName"
                />
                <Input
                  label="Description"
                  className="mb-2"
                  fieldName="itemDescription"
                  textArea={true}
                />
              </div>
              <div className="mt-2">
                <Button
                  color="blue"
                  type="submit"
                  isProcessing={mutation.isPending}
                  disabled={mutation.isPending}
                >
                  Add Item
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <Spinner
            className="mx-auto"
            aria-label="Extra large spinner example"
            size="xl"
          />
        </div>
      ) : (
        <div className="table-container w-full">
          {menuItems && (
            <Table>
              <Table.Head>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Item Name</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-dashed divide-y">
                {menuItems?.data?.map(
                  (itemGroup, idx) =>
                    itemGroup.items.length > 0 && (
                      <React.Fragment key={idx}>
                        <Table.Row className="bg-white">
                          <Table.Cell
                            rowSpan={itemGroup.items.length}
                            className="whitespace-nowrap font-medium text-gray-900"
                          >
                            {itemGroup.date}
                          </Table.Cell>
                          <Table.Cell>{itemGroup.items[0].itemName}</Table.Cell>
                          <Table.Cell>
                            {itemGroup.items[0].description}
                          </Table.Cell>
                        </Table.Row>
                        {itemGroup.items.slice(1).map((item, itemIdx) => (
                          <Table.Row key={itemIdx} className="bg-white">
                            <Table.Cell>{item.itemName}</Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                          </Table.Row>
                        ))}
                      </React.Fragment>
                    )
                )}
              </Table.Body>
            </Table>
          )}
        </div>
      )}
    </div>
  );
};

export default AddMenu;
