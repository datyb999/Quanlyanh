import React, { useState } from 'react';
import { FileImageOutlined, FolderOpenOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, MenuProps, Modal, Row } from 'antd';
import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
import { useCookies } from 'react-cookie';
import { APP_SAVE_KEYS } from '../constant/AppConstant';
import { getCookie } from 'cookies-next';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}
interface Props {
  children: React.ReactNode;
}
const itemsAdmin: MenuItem[] = [
  getItem('Tài khoản', '/admin/account', <UserOutlined />),
  getItem('Thư mục', '/admin/folder', <FolderOpenOutlined />),
  getItem('Ảnh', '/admin/image', <FileImageOutlined />),
];

const items: MenuItem[] = [
  getItem('Trang chủ', '/user', <UserOutlined />),
  getItem('Thư mục', '/user/folder', <FolderOpenOutlined />),
  getItem('Ảnh', '/user/image', <FileImageOutlined />),
];

const Dashboard = ({ children }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies([APP_SAVE_KEYS.KEYS]);
  const [isOpenModalLogout, setOpenModalLogout] = useState(false);
  const navigate = useNavigate();
  const role = getCookie(APP_SAVE_KEYS.ROLE)
  const currentPath = window.location.pathname;
  function handleLogout() {
    removeCookie(APP_SAVE_KEYS.KEYS, undefined)
    removeCookie(APP_SAVE_KEYS.ROLE, undefined)
    removeCookie(APP_SAVE_KEYS.USERID, undefined)
    navigate("/login")
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          style={{ backgroundColor: '#fff' }}
        >
          <div className='flex justify-center items-center mt-5'>
            <h1 className='text-xl font-bold'>Hệ thống quản lý</h1>
          </div>
          <Menu
            className='mt-12 items-start justify-start'
            onClick={(item) => navigate(item.key)}
            theme='light'
            defaultSelectedKeys={[`${currentPath.split('/').splice(0, 3).join('/')}` || `${currentPath}`]}
            mode='inline'
            items={role && +role === 2 ? itemsAdmin : items}
          >
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: '#fff' }}>
            <Row gutter={32} justify='space-between' align='middle'>
              <Col span={10}></Col>
              <Col span={5} offset={9}>
                <div className='flex items-center gap-4 justify-end p-6'>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: '1',
                          label: <div>Thông tin người dùng</div>,
                          icon: <UserOutlined />,
                          onClick: () => navigate("/dashboard/profile")
                        },
                        {
                          key: '2',
                          label: <div>Logout</div>,
                          icon: <LogoutOutlined />,
                          onClick: () => setOpenModalLogout(true)
                        }
                      ]
                    }}
                    className='cursor-pointer'
                  >
                    <div className='h-full text-2xl flex items-center justify-center'>
                      <img
                        className='block mx-auto max-w-[32px] max-h-[32px] rounded-[50px]'
                        alt='userIcon'
                        src={"/profile.png"}
                      />
                    </div>
                  </Dropdown>
                </div>
              </Col>
              <Modal
                visible={isOpenModalLogout}
                title='Bạn sắp đăng xuất?'
                onCancel={() => setOpenModalLogout(false)}
                footer={
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleLogout}>Đăng xuất</Button>
                  </div>
                }
              ></Modal>
            </Row>
          </Header>
          <Content style={{ margin: '32px 16px' }}>
            <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Copyright ©2023 Created by Tiến Đạt</Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
