import { useMutation, useQuery } from "react-query";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Row,
  Col,
  Select,
  DatePicker,
  DatePickerProps,
} from "antd";
import { IRegister } from "@/shared/typeDef/auth.type";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { accountService } from "@/shared/services/account.service";

interface Props {
  editId?: number;
  open: any;
  setOpen: any;
  refetch: any;
}
const FormUser = ({ editId, open, setOpen, refetch }: Props) => {
  const [form] = useForm();
  const isEditIdValidNumber = typeof editId === "number";
  const registerMutation = useMutation({
    mutationKey: "register",
    mutationFn: (body: { username: string; password: string }) =>
      accountService.newAccount(body),
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
    mutationFn: (body: IRegister) =>
      accountService.updateAccount(editId as number, body),
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
  function handleregister(value: any) {
    if (editId) {
      updateMutation.mutate(value);
    } else {
      registerMutation.mutate(value);
    }
  }
  const { data } = useQuery(
    ["attendence"],
    () => accountService.getAccountById(editId as number),
    {
      enabled: isEditIdValidNumber,
    }
  );
  useEffect(() => {
    if (editId && data) {
      form.setFieldsValue(data.data);
    }
  }, [data]);
  return (
    <Modal
      title={editId ? `Chỉnh sửa tài khoản` : "Tạo tài khoản mới"}
      centered
      open={open}
      width={1000}
      footer={false}
    >
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleregister}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Tài khoản"
          name="username"
          rules={[{ required: true, message: "Vui lòng ký tài khoản" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng ký mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Vai trò"
          name="role"
          rules={[{ required: true, message: "Vui lòng ký vai trò" }]}
        >
          <Select
            options={[
              { value: 1, label: "Admin" },
              { value: 2, label: "Thợ ảnh" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng ký tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: "Vui lòng ký địa chỉ" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: "Vui lòng ký giới tính" }]}
        >
          <Select
            options={[
              { value: 0, label: "Nam" },
              { value: 1, label: "Nữ" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Ngày sinh"
          name="birthday"
          rules={[{ required: true, message: "Vui lòng ký ngày sinh" }]}
        >
          <DatePicker />
        </Form.Item>

        <Row justify={"center"} align={"middle"} gutter={16}>
          <Col>
            <Form.Item style={{ textAlign: "center" }}>
              <Button onClick={() => setOpen(false)} htmlType="button">
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

export default FormUser;
