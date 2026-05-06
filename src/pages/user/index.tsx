/**
 * 用户管理页。
 *
 * 这是当前项目里业务最完整的页面之一，涵盖了典型后台 CRUD 流程：
 * 1. 查询用户列表。
 * 2. 通过关键字筛选用户。
 * 3. 新增用户。
 * 4. 编辑已有用户。
 * 5. 删除指定用户。
 */
import {
  UserFormData,
  UserListParams,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useUserListQuery,
} from "@/services";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Table,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import "./user.css";

type UserFormValues = Omit<UserFormData, "birth"> & {
  birth: Dayjs | string;
};

const User: React.FC = () => {
  // listData 作为查询条件对象，后续如果要扩展分页、状态筛选也可以继续往里加。
  const [listData, setListData] = useState<UserListParams>({
    name: "",
  });
  // 弹窗模式标记：当前代码约定 0 表示新增，1 表示编辑。
  const [madalType, setMadalType] = useState(0);
  // 控制新增 / 编辑弹窗是否打开。
  const [isModalOpen, setIsModalOpen] = useState(false);
  // antd Form 实例，用于手动校验、回填和重置表单。
  const [form] = Form.useForm();
  const { data: userListData, isFetching } = useUserListQuery(listData);
  const addUserMutation = useAddUserMutation();
  const editUserMutation = useEditUserMutation();
  const deleteUserMutation = useDeleteUserMutation();
  const tableData = userListData?.list ?? [];

  const handleClick = (type: string, rowData?: any) => {
    // 点击“新增”或“编辑”时统一打开弹窗。
    setIsModalOpen(true);
    if (type === "add") {
      // 新增模式不需要预填数据。
      setMadalType(0);
    } else {
      // 编辑模式需要把当前行数据克隆后写入表单。
      setMadalType(1);
      const cloneData = JSON.parse(JSON.stringify(rowData));
      // DatePicker 组件需要 dayjs 对象，字符串必须先转换。
      cloneData.birth = dayjs(cloneData.birth);
      form.setFieldsValue(cloneData);
    }
  };
  const handleFinish = (e: { keyword?: string }) => {
    // 查询表单提交后，更新查询条件，下面的 useEffect 会自动重新拉表格。
    setListData({
      name: e.keyword ?? "",
    });
  };

  const handleDelete = ({ id }: Pick<UserFormData, "id">) => {
    // 删除成功后由 mutation 自动失效查询并刷新列表。
    deleteUserMutation.mutate({ id });
  };

  // Table 列定义：描述每一列怎么取值、怎么渲染。
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
    },
    {
      title: "性别",
      dataIndex: "sex",
      render: (val: number) => {
        // 把后端数字值转换成中文文案，避免表格显示 0 / 1。
        const sexMap = {
          0: "男",
          1: "女",
        };
        return sexMap[val as keyof typeof sexMap] || "未知";
      },
    },
    {
      title: "出生日期",
      dataIndex: "birth",
    },
    {
      title: "地址",
      dataIndex: "addr",
    },
    {
      title: "操作",
      render: (rowData: any) => {
        return (
          <div className="flex-box">
            {/* 编辑按钮：打开弹窗并回填当前行数据。 */}
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => handleClick("edit", rowData)}
            >
              编辑
            </Button>
            <Popconfirm
              // 删除前增加二次确认，降低误操作风险。
              title="提示"
              description="此操作将删除该用户,是否继续?"
              okText="确认"
              cancelText="取消"
              onConfirm={() => handleDelete(rowData)}
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const handleOK = () => {
    form.validateFields().then((values: UserFormValues) => {
      // DatePicker 返回 dayjs，提交给接口前必须转成字符串日期。
      const payload: UserFormData = {
        ...values,
        birth: dayjs(values.birth).format("YYYY-MM-DD"),
      };
      if (madalType) {
        // 编辑模式：调用更新接口，成功后关闭弹窗并刷新列表。
        editUserMutation.mutate(payload, {
          onSuccess: () => {
            handleCancel();
          },
        });
      } else {
        // 新增模式：调用新增接口，成功后刷新列表并关闭弹窗。
        addUserMutation.mutate(payload, {
          onSuccess: () => {
            handleCancel();
          },
        });
      }
    });
  };
  const handleCancel = () => {
    // 关闭弹窗时顺手清空表单，避免下次打开看到旧数据。
    setIsModalOpen(false);
    form.resetFields();
  };
  return (
    <div className="user">
      <div className="flex-box space-between">
        {/* 左侧新增按钮。 */}
        <Button type="primary" onClick={() => handleClick("add")}>
          +新增
        </Button>
        {/* 右侧内联查询表单。 */}
        <Form layout="inline" onFinish={handleFinish}>
          <Form.Item name="keyword">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        // 表格使用 id 作为唯一键，更符合用户实体特征。
        style={{ marginTop: "10px" }}
        dataSource={tableData}
        columns={columns}
        loading={isFetching}
        rowKey={"id"}
      />
      <Modal
        title={madalType === 1 ? "编辑用户" : "新增用户"}
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
        confirmLoading={addUserMutation.isPending || editUserMutation.isPending}
        okText="确认"
        cancelText="取消"
      >
        <Form
          // 绑定 form 实例，便于外部校验和重置。
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
        >
          {madalType === 1 && (
            // 编辑时需要保留 id 给后端识别，新建时则不显示该字段。
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
          )}

          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            name="age"
            label="年龄"
            rules={[
              { required: true, message: "请输入年龄" },
              // 虽然使用了 InputNumber，这里仍做一层规则兜底。
              { pattern: /^\d+$/, message: "年龄必须为数字" },
            ]}
          >
            <InputNumber placeholder="请输入年龄" />
          </Form.Item>

          <Form.Item
            name="sex"
            label="性别"
            rules={[{ required: true, message: "请输入性别" }]}
          >
            <Select
              placeholder="请选择性别"
              options={[
                { label: "男", value: 0 },
                { label: "女", value: 1 },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="birth"
            label="出生日期"
            rules={[{ required: true, message: "请输入出生日期" }]}
          >
            {/* format 决定输入框中展示的日期格式。 */}
            <DatePicker placeholder="请选择出生日期" format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="addr"
            label="地址"
            rules={[{ required: true, message: "请输入地址" }]}
          >
            <Input placeholder="请输入地址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
