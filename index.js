// mảng để lưu lại các nhân viên
let employees = [];

// biến kiểm tra xem form đã được submit chưa ?
let isSubmitted = false;

init();

function init() {
  // student = null || []
  // || lấy giá trị true đầu tiên
  employees = JSON.parse(localStorage.getItem("employees")) || [];

  // HÀM MAP ĐI QUA TỪNG OBJECT TRONG EMPLOYEE RỒI TRUY CẬP TỪNG PHẦN TỬ
  employees = employees.map((value) => {
    return new Employee(
      value.id,
      value.name,
      value.email,
      value.password,
      value.daysOfWork,
      value.basicSalary,
      value.position,
      value.timesOfWork
    );
  });

  display(employees);
}

getElement("btnThem").onclick = function () {
  getElement("btnCapNhat").disabled = true;
};
// thêm nhân viên
function addEmployee() {
  isSubmitted = true;
  let employee = validate();
  if (!employee) {
    return;
  }

  employees.push(employee);
  resetForm();
  $("#myModal").modal("hide");

  localStorage.setItem("employees", JSON.stringify(employees));

  display(employees);
}

// xóa nhân viên
function removeEmployee(employeeId) {
  employees = employees.filter((value) => {
    return value.id !== employeeId;
  });

  localStorage.setItem("employees", JSON.stringify(employees));
  display(employees);
}

// hiển thị
function display(employees) {
  let html = employees.reduce((result, value) => {
    return (
      result +
      `
      <tr>
          <td>${value.id}</td>
          <td>${value.name}</td>
          <td>${value.email}</td>
          <td>${value.daysOfWork}</td>
          <td>${value.position}</td>
          <td>${value.calSalary()}</td>
          <td>${value.rankingEmployee()}</td>
          <td>
          <button onclick="selectEmployee('${
            value.id
          }')" class="btn btn-success">Chỉnh Sửa</button>
          <button onclick="removeEmployee('${
            value.id
          }')" class="btn btn-danger">Xóa</button>
          </td>
      </tr>
      `
    );
  }, "");

  getElement("tableDanhSach").innerHTML = html;
}

// cập nhật
function updateEmployee() {
  let employee = validate();
  if (!employee) {
    return;
  }

  let index = employees.findIndex((value) => {
    return value.id === employee.id;
  });

  employees[index] = employee;
  resetForm();
  $("#myModal").modal("hide");

  localStorage.setItem("employees", JSON.stringify(employees));
  // B4: HIỂN THỊ
  display(employees);
}

function resetForm() {
  //input
  getElement("tknv").value = "";
  getElement("name").value = "";
  getElement("email").value = "";
  getElement("password").value = "";
  getElement("datepicker").value = "";
  getElement("luongCB").value = "";
  getElement("chucvu").value = "";
  getElement("gioLam").value = "";
  //span
  getElement("tbTKNV").innerHTML = "";
  getElement("tbTen").innerHTML = "";
  getElement("tbEmail").innerHTML = "";
  getElement("tbMatKhau").innerHTML = "";
  getElement("tbNgay").innerHTML = "";
  getElement("tbLuongCB").innerHTML = "";
  getElement("tbChucVu").innerHTML = "";
  getElement("tbGiolam").innerHTML = "";
}

// lấy thông tin nhân viên
function selectEmployee(employeeId) {
  let employee = employees.find((value) => {
    return value.id === employeeId;
  });

  getElement("tknv").value = employee.id;
  getElement("name").value = employee.name;
  getElement("email").value = employee.email;
  getElement("password").value = employee.password;
  getElement("datepicker").value = employee.daysOfWork;
  getElement("luongCB").value = employee.basicSalary;
  getElement("chucvu").value = employee.position;
  getElement("gioLam").value = employee.timesOfWork;

  getElement("btnCapNhat").disabled = false;
  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;

  $("#myModal").modal("show");
}

// tìm nhân viên theo xếp loại
function findEmployee() {
  // B1 : DOM INPUT
  let search = document.getElementById("searchName").value;
  search = search.trim(); //xóa bỏ khoảng trắng đầu cuối
  search = search.toLowerCase();

  // B2 : LỌC
  let newEmployees = employees.filter((value) => {
    let type = value.rankingEmployee().trim().toLowerCase();
    return type.includes(search);
  });

  // B3 : HIỂN THỊ LẠI
  if (newEmployees.length === 0) {
    alert("Không có loại nhân viên bạn cần tìm");
  }
  display(newEmployees);
}

function getElement(selector) {
  return document.getElementById(selector);
}

// hàm kiểm tra giá trị có rỗng hay không
function isRequired(value) {
  // tìm xoá bỏ khoảng trắng đầu và cuối
  if (!value.trim()) {
    // chuỗi rỗng là falsy value, !false => true , nếu true là chuỗi rỗng
    return false;
  }
  return true;
}

// hàm kiểm tra mật khẩu
function isPassword(value) {
  let regex =
    /^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{6,10}$/;

  // hàm test dành riêng cho chuỗi regex - regular expression , trả về boolean
  return regex.test(value);
}

// hàm kiểm tra số tài khoản
function checkAccountNumber(accountNumber) {
  // Chuyển số tài khoản thành chuỗi
  var accountNumberString = accountNumber.toString();

  // Kiểm tra độ dài tài khoản
  var accountLength = accountNumberString.length;
  if (accountLength >= 4 && accountLength <= 6) {
    return true;
  } else {
    return false;
  }
}

// hàm kiểm tra tên tài khoản
function checkAccountName(accountName) {
  if (
    typeof accountName === "string" &&
    /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/.test(
      accountName
    )
  ) {
    return true;
  } else {
    return false;
  }
}

// hàm kiểm tra email
function isEmail(value) {
  let regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(value);
}

// hàm kiểm tra lương
function checkBasicSalary(salary) {
  var regex = /^\d+$/;
  if (regex.test(salary)) {
    if (salary < 1000000 || salary > 20000000) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

// hàm kiểm giờ làm
function checkTimeWork(timework) {
  var regex = /^\d+$/;
  if (regex.test(timework)) {
    if (timework < 80 || timework > 200) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
