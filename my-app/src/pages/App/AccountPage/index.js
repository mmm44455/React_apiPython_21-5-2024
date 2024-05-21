import TextInput from "../../../common/componets/Form/TextInput"
import { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./sytle.css"
import UserContext from "../../../common/context/UserContext/useContext";
import axios from 'axios';

const Account = () => {
    const [maSv, setMaSv] = useState('');
    const [name, setName] = useState('');
    const [lop, setLop] = useState('');
    const [date, setDate] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'maSv') setMaSv(value);
        else if (name === 'name') setName(value);
        else if (name === 'lop') setLop(value);
        else if (name === 'date') setDate(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newStudent = {
            MaSv: maSv,
            name: name,
            lop: lop,
            date: date
        };

        if (!maSv || !name || !lop || !date) {
            alert('Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        axios.post('http://127.0.0.1:8000/sinhvien/', newStudent)
            .then(response => {
               alert('Student added successfully:', response.data);
                
                // Reset các trường nhập liệu
                setMaSv('');
                setName('');
                setLop('');
                setDate('');
            })
            .catch(error => {
                console.error('Error adding student:', error);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Mã Sinh viên</label> <br></br>
            <TextInput className="Insertinto" name="maSv" type="text" placeholder="Mã số sinh viên " value={maSv} onChange={handleChange}></TextInput>
            <label>Tên Sinh viên</label> <br></br>
            <TextInput className="Insertinto" name="name" type="text" placeholder="Tên sinh viên " value={name} onChange={handleChange}></TextInput>
            <label>Lớp Sinh viên</label> <br></br>
            <TextInput className="Insertinto" name="lop" type="text" placeholder="Lớp sinh viên " value={lop} onChange={handleChange}></TextInput>
            <label>Ngày sinh</label> <br></br>
            <TextInput className="Insertinto" name="date" type="date" placeholder="Ngày sinh " value={date} onChange={handleChange}></TextInput>
            <Button className="Change-acc" variant="danger" type="submit">Thêm sinh viên</Button>
        </form>
    )
}

export default Account;
