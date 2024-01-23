import { useMutation, useQuery } from "react-query";
import { Button, Form, Input, message, Modal, Row, Col } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { folderService } from "@/shared/services/folder.service";
import TextArea from "antd/es/input/TextArea";
import { getCookie } from "cookies-next";
import { APP_SAVE_KEYS } from "@/shared/constant/AppConstant";

interface Props {
  editId?: number;
  open: any;
  setOpen: any;
  refetch: any;
}
const FormFolder = ({ editId, open, setOpen, refetch }: Props) => {
  const [form] = useForm();
  const isEditIdValidNumber = typeof editId === "number";
  const userId = getCookie(APP_SAVE_KEYS.USERID)
  const { data } = useQuery(
    ["class"],
    () => folderService.getFolderById(editId as number),
    {
      enabled: isEditIdValidNumber,
    }
  );

  const createMutation = useMutation({
    mutationKey: "create",
    mutationFn: (body: { name: string; description: string }) =>
      folderService.newFolder(body),
    onSuccess(data, _variables, _context) {
      const res = data.data;
      if (!res) return;
      message.success("Tạo thành công");
      setOpen(false);
      refetch();
    },
    onError(error, variables, context) {
      message.error("Tạo không thành công");
    },
  });
  const updateMutation = useMutation({
    mutationKey: "update",
    mutationFn: (body: { name: string; description: string }) =>
      folderService.updateFolder(editId as number, body),
    onSuccess(data, _variables, _context) {
      const res = data.data;
      if (!res) return;
      message.success("Cập nhật thành công");
      setOpen(false);
      refetch();
    },
    onError(error, variables, context) {
      message.error("Cập nhật không thành công");
    },
  });
  function handleOperation(value: any) {
    const body = {
      creator: Number(userId),
      ...value
    }
    if (editId) {
      updateMutation.mutate(body);
    } else {
      createMutation.mutate(body);
    }
  }
  useEffect(() => {
    if (editId && data) {
      form.setFieldsValue(data.data);
    }
  }, [editId && data]);
  return (
    <Modal
      title={editId ? `Chỉnh sửa thư mục` : "Tạo thư mục mới"}
      centered
      open={open}
      width={1000}
      footer={false}
    >
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleOperation}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng ký mô tả" }]}
        >
          <TextArea />
        </Form.Item>

        <Row justify={"center"} align={"middle"} gutter={16}>
          <Col>
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                htmlType="button"
              >
                Huỷ bỏ
              </Button>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item style={{ textAlign: "center" }}>
              <Button htmlType="submit">
                {editId ? "Chỉnh sửa" : "Tạo mới"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormFolder;
