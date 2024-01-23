import { useMutation, useQuery } from "react-query";
import { Button, Form, Input, message, Modal, Row, Col, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import InputUpload from "@/shared/components/common/InputUpload";
import { imageService } from "@/shared/services/image.service";
import { folderService } from "@/shared/services/folder.service";

interface Props {
  editId?: number;
  open: any;
  setOpen: any;
  refetch: any;
}
const FormImage = ({ editId, open, setOpen, refetch }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>("");
  const [form] = useForm();
  const isEditIdValidNumber = typeof editId === "number";
  const [folderId, setFolderId] = useState<number | undefined>()
  const { data } = useQuery(
    ["Image"],
    () => imageService.getImageById(editId as number),
    {
      enabled: isEditIdValidNumber,
    }
  );
  const { data: folders } = useQuery(
    ["folders"],
    () => folderService.getAllFolder(),
    {
      select(data) {
        const result = data.data;
        if (!result) return;
        const res = result.map((folder) => ({
          label: folder.name,
          value: folder.id,
        }));
        return res;
      },
    }
  );
  const createMutation = useMutation({
    mutationKey: "create",
    mutationFn: (body: any) => imageService.newImage(body),
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
    mutationFn: (body: any) => imageService.updateImage(editId as number, body),
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
  const handleAvatarChange = (newAvatarUrl: string) => {
    const updatedAvatarUrl = newAvatarUrl || "";
    setImageUrl(updatedAvatarUrl);
  };

  function handleOperation(value: any) {
    const body = {
      ...value,
      image: imageUrl,
    };
    if (editId) {
      updateMutation.mutate(body);
    } else {
      createMutation.mutate(body);
    }
  }
  useEffect(() => {
    if (editId && data) {
      setFolderId(data.data.folder_id)
      setImageUrl(data.data.url)
      form.setFieldsValue(data.data);
    }
  }, [editId && data]);
  return (
    <Modal
      title={editId ? `Chỉnh sửa ảnh` : "Tạo ảnh mới"}
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
          label="Thư mục"
          name="folder_id"
          rules={[{ required: true, message: "Chưa điền thư mục" }]}
        >
          <Select
            defaultValue={folderId && folderId}
            placeholder="Lựa chọn thư mục"
            optionLabelProp="label"
            options={folders}
          />
        </Form.Item>

        <Form.Item
          label="Tên ảnh"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên ảnh" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Hình ảnh" name="url">
          <InputUpload initSrc={imageUrl} onChange={handleAvatarChange} />
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

export default FormImage;
