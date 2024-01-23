import Dashboard from "@/shared/layout/Dashboard";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, message, Popconfirm, Row, Space, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import { ColumnType } from "antd/es/table";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import FormFolder from "./form";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import { folderService } from "@/shared/services/folder.service";
import { IFolder } from "@/shared/typeDef/folder.type";
import { getCookie } from "cookies-next";
import { APP_SAVE_KEYS } from "@/shared/constant/AppConstant";

type Props = {};

const FolderManagementUser = ({}: Props) => {
  const [open, setOpen] = useState(false);
  const [action, setAtion] = useState<string>("");
  const [rowId, setRowId] = useState<number>();
  const userId = getCookie(APP_SAVE_KEYS.USERID)
  const { data: dataFolder, refetch } = useQuery(["listFolders"], () =>
    folderService.getAllFolder(), {
      select(data) {
          if(userId){
            const filterData = data.data.filter(item => item.creator === +userId)
            return filterData
          }else{
            return data.data
          }
      },
    }
  );
  const deleteMutation = useMutation({
    mutationKey: ["deleteFoldersMutation"],
    mutationFn: (id: number) => folderService.deleteFolder(id),
    onSuccess: () => {
      message.success("Xoá thành công");
      refetch();
    },
    onError() {
      message.error("Xoá không thành công");
    },
  });
  const columns: ColumnType<IFolder>[] = [
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
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
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
      {dataFolder && (
        <Dashboard>
          <Row justify={"space-between"} align="middle" gutter={16}>
            <Col span={12}>
              <h1 className="font-bold text-2xl">Quản lý thư mục</h1>
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
          <Table dataSource={dataFolder} columns={columns} />
          {action === "create" && !rowId ? (
            <FormFolder refetch={refetch} open={open} setOpen={setOpen} />
          ) : (
            <FormFolder
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
export default FolderManagementUser;
