# Mobile Application สำหรับบุคลากร

## รายละเอียดโครงการ
ระบบ Mobile Application สำหรับบุคลากรนี้ถูกออกแบบมาเพื่อเพิ่มประสิทธิภาพการทำงานและการสื่อสารภายในองค์กร โดยรองรับการใช้งานบนระบบปฏิบัติการ **iOS** และ **Android** 

## ฟีเจอร์หลัก
- **ระบบเช็คอิน-เช็คเอาท์**
  - รองรับการเช็คอินผ่าน GPS และกล้องถ่ายรูป
  - ตรวจสอบตำแหน่งของจุดเช็คอินที่กำหนด
  - บันทึกข้อมูลวันที่ เวลา และพิกัดที่เช็คอิน-เช็คเอาท์
- **การแจ้งเตือน (Push Notification)**
  - แจ้งเตือนข่าวสารภายในองค์กร
  - สามารถตั้งค่าการแจ้งเตือนเฉพาะบุคคลได้
- **ระบบการเข้าสู่ระบบ**
  - รองรับการล็อกอินด้วย **WU PASS**
  - รองรับการเข้าสู่ระบบด้วย **PIN** ที่ตั้งค่าไว้
  - ระบบความปลอดภัยในการเข้าถึงข้อมูล

## เทคโนโลยีที่ใช้
- **Frontend:** React Native
- **Backend:** Express.js
- **Database:** Oracle
- **API Gateway:** Kong
- **Authentication:** LDAP

## โครงสร้างระบบ
```
├── frontend/                # React Native (Mobile App)
├── backend/                 # Express.js (API Server)
├── database/                # โครงสร้างฐานข้อมูล Oracle
├── docs/                    # เอกสารโครงการ
└── README.md                # คำแนะนำและรายละเอียดโครงการ
```

## การติดตั้งและการใช้งาน
### 1. Clone Repository
```sh
git clone https://github.com/your-repo/mobile-app.git
cd mobile-app
```

### 2. ติดตั้ง Dependencies
#### สำหรับ Mobile App (React Native)
```sh
cd frontend
npm install
```

#### สำหรับ Backend (Express.js)
```sh
cd backend
npm install
```

### 3. การตั้งค่า Environment Variables
สร้างไฟล์ `.env` ในโฟลเดอร์ `backend` และกำหนดค่าต่อไปนี้:
```
PORT=5000
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
JWT_SECRET=your-jwt-secret
LDAP_SERVER=your-ldap-server
```

### 4. การรันเซิร์ฟเวอร์
#### Backend
```sh
cd backend
npm start
```

#### Frontend (React Native)
```sh
cd frontend
npx react-native run-android  # สำหรับ Android
npx react-native run-ios      # สำหรับ iOS
```

## Workflows
### การเข้าสู่ระบบ
1. ผู้ใช้ล็อกอินด้วย **WU PASS**
2. หากล็อกอินสำเร็จ ระบบจะตรวจสอบว่าผู้ใช้เคยตั้งค่า **PIN** หรือไม่
3. ถ้าเคยตั้งค่า PIN ระบบจะนำไปที่หน้า PIN Login
4. หากไม่เคย ระบบจะพาไปตั้งค่า PIN ก่อนเข้าสู่ระบบ

### การเช็คอิน-เช็คเอาท์
1. ผู้ใช้เปิดแอปแล้วไปที่หน้า **เช็คอิน**
2. ระบบแสดงแผนที่พร้อมระยะห่างจากจุดเช็คอิน
3. กดปุ่ม **เช็คอิน** หรือ **เช็คเอาท์** และบันทึกภาพหลักฐาน
4. ระบบบันทึกข้อมูลเวลาและพิกัดลงฐานข้อมูล

## ข้อจำกัดของระบบ
- GPS อาจไม่ทำงานในบางพื้นที่ที่ไม่มีสัญญาณอินเทอร์เน็ต
- Push Notification อาจมีความล่าช้าขึ้นอยู่กับเครือข่ายของผู้ใช้

## แผนการพัฒนา
| ระยะเวลา | รายละเอียด |
|-----------|------------|
| 1 เดือน | วิเคราะห์ระบบ |
| 4 เดือน | พัฒนาและทดสอบ |
| 1 เดือน | นำระบบขึ้นใช้งานจริง |

## ทีมพัฒนา
- นักพัฒนา: 3 คน
- นักออกแบบ UI/UX: 1 คน
- ผู้ทดสอบระบบ: 2 คน

## License
This project is licensed under the MIT License - see the LICENSE file for details.
