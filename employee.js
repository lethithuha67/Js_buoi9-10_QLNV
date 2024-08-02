// Hàm khởi tạo đối tượng Employee
function Employee(
  id,
  name,
  email,
  password,
  daysOfWork,
  basicSalary,
  position,
  timesOfWork
) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.daysOfWork = daysOfWork;
  this.basicSalary = basicSalary;
  this.position = position;
  this.timesOfWork = timesOfWork;
}
// Hàm tính lương nhân viên
Employee.prototype.calSalary = function () {
  if (this.position === "Sếp") {
    // Giám đốc  lương gấp 3 lần lương cơ bản
    return this.basicSalary * 3;
  } else if (this.position === "Trưởng phòng") {
    // Quản lý  lương gấp 2 lần lương cơ bản
    return this.basicSalary * 2;
  } else if (this.position === "Nhân viên") {
    // Nhân viên  lương cơ bản
    return this.basicSalary * 1;
  }
};

// Hàm đánh giá hiệu suất nhân viên qua giờ làm
Employee.prototype.rankingEmployee = function () {
  if (this.timesOfWork >= 192) {
    return "Xuất sắc";
  } else if (this.timesOfWork >= 176) {
    return "Giỏi";
  } else if (this.timesOfWork >= 160) {
    return "Khá";
  } else {
    return "Trung bình";
  }
};
