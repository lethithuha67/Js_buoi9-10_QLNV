function validate() {
  let id = getElement("tknv").value;
  let name = getElement("name").value;
  let email = getElement("email").value;
  let password = getElement("password").value;
  let daysOfWork = getElement("datepicker").value;
  let basicSalary = getElement("luongCB").value;
  let position = getElement("chucvu").value;
  let timesOfWork = getElement("gioLam").value;

  let isValid = true;

  if (!isRequired(id)) {
    isValid = false;
    getElement("tbTKNV").innerHTML = "Mã không được để trống";
  } else if (!checkAccountNumber(id)) {
    isValid = false;
    getElement("tbTKNV").innerHTML = "Vui lòng nhập từ 4 đến 6 kí tự";
  }

  if (!isRequired(name)) {
    isValid = false;
    getElement("tbTen").innerHTML = "Tên không được để trống";
  } else if (!checkAccountName(name)) {
    isValid = false;
    getElement("tbTen").innerHTML = "Vui lòng nhập chuỗi";
  }

  if (!isRequired(email)) {
    isValid = false;
    getElement("tbEmail").innerHTML = "Email không được để trống";
  } else if (!isEmail(email)) {
    isValid = false;
    getElement("tbEmail").innerHTML = "Vui lòng nhập email hợp lệ";
  }

  if (!isRequired(password)) {
    isValid = false;
    getElement("tbMatKhau").innerHTML = "Mật khẩu không được để trống";
  } else if (!isPassword(password)) {
    isValid = false;
    getElement("tbMatKhau").innerHTML =
      "Quy định mật khẩu: mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống";
  }

  if (!isRequired(daysOfWork)) {
    isValid = false;
    getElement("tbNgay").innerHTML = "Vui lòng không để trống ngày";
  }

  if (!isRequired(basicSalary)) {
    isValid = false;
    getElement("tbLuongCB").innerHTML = "Lương cơ bản không được để trống";
  } else if (!checkBasicSalary(basicSalary)) {
    isValid = false;
    getElement("tbLuongCB").innerHTML =
      "Vui lòng nhập SỐ lương cơ bản từ 1.000.000 đến 20.000.000";
  }

  if (!isRequired(position)) {
    isValid = false;
    getElement("tbChucVu").innerHTML = "Lương cơ bản không được để trống";
  } else if (getElement("chucvu").value === "Chọn chức vụ") {
    isValid = false;
    getElement("tbChucVu").innerHTML = "Vui lòng chọn chức vụ";
  }

  if (!isRequired(timesOfWork)) {
    isValid = false;
    getElement("tbGiolam").innerHTML = "Lương cơ bản không được để trống";
  } else if (!checkTimeWork(timesOfWork)) {
    isValid = false;
    getElement("tbGiolam").innerHTML =
      "Vui lòng nhập SỐ giờ làm từ 80 đến 200 giờ";
  }

  if (isValid) {
    let employee = new Employee(
      id,
      name,
      email,
      password,
      daysOfWork,
      +basicSalary,
      position,
      +timesOfWork
    );

    return employee;
  }

  return undefined;
}

// tài khoản
getElement("tknv").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbTKNV");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};

// tên
getElement("name").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbTen");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};

// email
getElement("email").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbEmail");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};

// password
getElement("password").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbMatKhau");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};

// Ngày
getElement("datepicker").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbNgay");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};

// Lương cơ bản
getElement("luongCB").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbLuongCB");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};

// chức vụ
getElement("chucvu").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbChucVu");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};

// giờ làm
getElement("gioLam").oninput = (event) => {
  if (!isSubmitted) return;

  let idSpan = getElement("tbGiolam");

  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  }
};
