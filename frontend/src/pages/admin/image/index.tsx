import Dashboard from "@/shared/layout/Dashboard";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Image, message, Popconfirm, Row, Space, Table } from "antd";
import Search from "antd/es/input/Search";
import { ColumnType } from "antd/es/table";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import FormImage from "./form";
import { PreImage } from "@/shared/components/common/PreImage";
import { imageService } from "@/shared/services/image.service";
import { IImage } from "@/shared/typeDef/image.type";

type Props = {};

const ImageManagement = ({}: Props) => {
  const [open, setOpen] = useState(false);
  const [action, setAtion] = useState<string>("");
  const [rowId, setRowId] = useState<number>();
  const { data: dataImage, refetch } = useQuery(["listImage"], () =>
    imageService.getAllImage()
  );
  const deleteMutation = useMutation({
    mutationKey: ["deleteImageMutation"],
    mutationFn: (id: number) => imageService.deleteImage(id),
    onSuccess: () => {
      message.success("Xoá thành công");
      refetch();
    },
    onError() {
      message.error("Xoá không thành công");
    },
  });
  const columns: ColumnType<IImage>[] = [
    {
      title: "#",
      key: "id",
      render: (value, record, index) => (
        <div>
          <p>{index}</p>
        </div>
      ),
    },
    {
      title: "Thư mục",
      dataIndex: "folder_name",
      key: "folder_name",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      key: "url",
      render: (_, record) => (
        <Image
          src={record.url}
          alt={record.name}
          width={350}
          height={200}
        ></Image>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div
            className="cursor-pointer"
            onClick={() => {
              setAtion("edit");
              setOpen(true);
              setRowId(record.id);
            }}
          >
            <EditOutlined />
          </div>
          <Popconfirm
            okButtonProps={{
              style: { background: "red", color: "white" },
              loading: deleteMutation.isLoading,
            }}
            onConfirm={() => {
              deleteMutation.mutate(record.id);
            }}
            title={"Xoá"}
          >
            <DeleteOutlined className="cursor-pointer"></DeleteOutlined>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {dataImage && (
        <Dashboard>
          <Row justify={"space-between"} align="middle" gutter={16}>
            <Col span={12}>
              <h1 className="font-bold text-2xl">Quản lý ảnh</h1>
            </Col>
            <Col span={12}>
              <div className="flex py-2 justify-between items-center gap-3">
                <Search
                  className="bg-blue-300 rounded-lg"
                  placeholder="Tìm kiếm"
                  onSearch={() => {}}
                  enterButton
                />
                <Button
                  onClick={() => {
                    setAtion("create");
                    setRowId(NaN);
                    setOpen(true);
                  }}
                >
                  Tạo mới
                </Button>
              </div>
            </Col>
          </Row>
          <Table dataSource={dataImage.data} columns={columns} />
          {action === "create" && !rowId ? (
            <FormImage refetch={refetch} open={open} setOpen={setOpen} />
          ) : (
            <FormImage
              refetch={refetch}
              editId={rowId}
              open={open}
              setOpen={setOpen}
            />
          )}
        </Dashboard>
      )}
    </>
  );
};
export default ImageManagement;
