import React, { useState, useEffect } from 'react';
import { Table, Button, Divider, Pagination, Modal, Form, Input } from 'antd';
import axios from 'axios';
import './sytle.css';

function BoardPage() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('/sinhvien/')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the students!", error);
      });
  };

  const handleEdit = (record) => {
    setEditingStudent(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record) => {
    const maSV = record.MaSv;
    axios.delete(`http://127.0.0.1:8000/sinhvien/${maSV}/`)
      .then(response => {
        fetchStudents();
        alert('Deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting student:', error);
      });
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingStudent(null);
  };

  const handleUpdate = (values) => {
    axios.put(`/sinhvien/${editingStudent.MaSv}/`, values)
      .then(response => {
        setIsModalVisible(false);
        setEditingStudent(null);
        fetchStudents();
        alert('Updated successfully');
      })
      .catch(error => {
        console.error('Error updating student:', error);
      });
  };
  const handleSapxep = () => {
    const sortedStudents = [...students].sort((a, b) => a.MaSv.localeCompare(b.MaSv, undefined, { numeric: true }));
    setStudents(sortedStudents);
  };
  const columns = [
    {
      title: 'Mã SV',
      dataIndex: 'MaSv',
      key: 'MaSv',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Lớp',
      dataIndex: 'lop',
      key: 'lop',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button className="edit-button" onClick={() => handleEdit(record)}>Sửa</Button>
          <Divider type="vertical" />
          <Button onClick={() => handleDelete(record)} type="primary" danger>Xóa</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="App">
      <h1>Danh sách Sinh Viên</h1>
      <Button type="primary" onClick={handleSapxep}>
            Sắp xếp
          </Button>
      <Table
        dataSource={students.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        columns={columns}
        pagination={{
          pageSize: pageSize,
          total: students.length,
          onChange: handlePageChange,
          onShowSizeChange: handlePageSizeChange,
        }}
      />

      <Modal title="Sửa thông tin sinh viên" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          name="editStudentForm"
          initialValues={{
            MaSv: editingStudent?.MaSv,
            name: editingStudent?.name,
            date: editingStudent?.date,
            lop: editingStudent?.lop,
          }}
          onFinish={handleUpdate}
        >
          <Form.Item name="MaSv" label="Mã Sinh viên">
            <Input disabled />
          </Form.Item>
          <Form.Item name="name" label="Tên">
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Ngày sinh">
            <Input type="date" />
          </Form.Item>
          <Form.Item name="lop" label="Lớp">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Lưu</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default BoardPage;
