from fastapi import FastAPI, HTTPException, Request
from typing import Optional, List
import pyodbc
import jwt
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

SECRET_KEY = "duycao"
TOKEN_EXPIRE_MINUTES = 30

class User:
    def __init__(self, username: str, password: str):
        self.username = username
        self.password = password

class SinhVien(BaseModel):
    MaSv: str
    name: str
    date: str
    lop: str

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các nguồn
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Cho phép các phương thức yêu cầu
    allow_headers=["*"],  # Cho phép tất cả các tiêu đề
)

def connect_to_database():
    return pyodbc.connect('DRIVER={SQL Server};'
                          'SERVER=DUYCAO;'
                          'DATABASE=ProJect_ReactJs;'
                          'UID=sa;'
                          'PWD=123456')

def get_user_by_username(username: str) -> Optional[User]:
    connection = connect_to_database()
    cursor = connection.cursor()
    cursor.execute("SELECT username, password FROM Login WHERE username = ?", (username,))
    row = cursor.fetchone()
    connection.close()
    if row:
        return User(username=row[0], password=row[1])
    else:
        return None

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
    return encoded_jwt

# API để đăng nhập
@app.post("/login/")
async def login(request: Request):
    body = await request.json()
    print(f"Received data: {body}")
    
    username = body.get("username")
    password = body.get("password")
    
    user = get_user_by_username(username)
    if user and user.password == password:
        # Tạo token khi đăng nhập thành công
        access_token = create_access_token(data={"sub": username})
        return {"token": access_token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="Invalid username or password")

# API để lấy danh sách sinh viên
@app.get("/sinhvien/", response_model=List[SinhVien])
async def get_sinhvien():
    connection = connect_to_database()
    cursor = connection.cursor()
    cursor.execute("SELECT MaSv, name, date, lop FROM Sinh_vien")
    rows = cursor.fetchall()
    print(rows)
    connection.close()
    sinhvien_list = []
    for row in rows:
        sinhvien = SinhVien(
            MaSv=row[0],
            name=row[1],
            date=row[2].strftime("%Y-%m-%d") if isinstance(row[2], datetime) else row[2],
            lop=row[3].strip()  # Loại bỏ khoảng trắng dư thừa nếu có
        )
        sinhvien_list.append(sinhvien)
    return sinhvien_list

# API để thêm sinh viên mới
@app.post("/sinhvien/")
async def create_sinhvien(sinhvien: SinhVien):
    connection = connect_to_database()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO Sinh_vien (MaSv, name, date, lop) VALUES (?, ?, ?, ?)",
                   (sinhvien.MaSv, sinhvien.name, sinhvien.date, sinhvien.lop))
    connection.commit()
    connection.close()
    return {"message": "Sinh viên đã được thêm thành công"}

# API để sửa thông tin sinh viên
@app.put("/sinhvien/{ma_sv}/")
async def update_sinhvien(ma_sv: str, sinhvien: SinhVien):
    connection = connect_to_database()
    cursor = connection.cursor()
    cursor.execute("UPDATE Sinh_vien SET name = ?, date = ?, lop = ? WHERE MaSv = ?",
                   (sinhvien.name, sinhvien.date, sinhvien.lop, ma_sv))
    connection.commit()
    connection.close()
    return {"message": "Thông tin sinh viên đã được cập nhật thành công"}

# API để xóa sinh viên
@app.delete("/sinhvien/{ma_sv}/")
async def delete_sinhvien(ma_sv: str):
    connection = connect_to_database()
    cursor = connection.cursor()
    cursor.execute("DELETE FROM Sinh_vien WHERE MaSv = ?", (ma_sv,))
    connection.commit()
    connection.close()
    return {"message": "Sinh viên đã được xóa thành công"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)