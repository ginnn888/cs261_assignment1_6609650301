function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // ตรวจสอบว่ามีการกรอกข้อมูล
    if (!username || !password) {
        document.getElementById('message').innerText = "กรุณากรอกข้อมูลให้ครบถ้วน";
        return; // ไม่ทำอะไรต่อ
    }

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key' : 'TU1565d83398ef0e6ea030b17a1b40fa79583760f885a4ccd6eff897cdf3e726bf9e0ee59227767455b20aecc2750beca5',
        },
        body: JSON.stringify({"UserName" : username, "PassWord" : password})
    })
    .then(response => response.json())
  .then(data => {
      if (data.status) {
          const popupMessage = `
              <strong>สถานะ :</strong> ${data.status ? "สำเร็จ" : "ไม่สำเร็จ"}<br>
              <strong>ประเภท :</strong> ${data.type}<br>
              <strong>ชื่อผู้ใช้ :</strong> ${data.username}<br>
              <strong>สถานะที่ TU :</strong> ${data.tu_status}<br>
              <strong>รหัสสถานะ :</strong> ${data.statusid}<br>
              <strong>ชื่อ (ไทย) :</strong> ${data.displayname_th}<br>
              <strong>ชื่อ (Eng) :</strong> ${data.displayname_en}<br>
              <strong>อีเมล :</strong> ${data.email}<br>
              <strong>ภาควิชา :</strong> ${data.department}<br>
              <strong>คณะ :</strong> ${data.faculty}
          ` ;

          document.getElementById('popup-message').innerHTML = popupMessage;
          document.getElementById('popup').style.display = 'flex'; // Show popup
      } else {
          document.getElementById('message').innerText = "Login failed. Please try again.";
      }
  })
  .catch(error => console.error('Error:', error));
}

// ปิด popup เมื่อคลิกที่มัน
document.getElementById('popup').onclick = function() {
    this.style.display = 'none'; // ซ่อน popup เมื่อคลิก
};
