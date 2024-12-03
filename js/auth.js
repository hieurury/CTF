// ============================* AUTH *=======================//

const loginContainer = document.querySelector(".auth-login");
const registerContainer = document.querySelector(".auth-register");
const loginRedirect = document.querySelector(".login-redirect");
const registerRedirect = document.querySelector(".register-redirect");

function redirect(from, to) {
  from.classList.toggle("d-none");
  to.classList.toggle("d-none");
}

loginRedirect.addEventListener("click", () => {
  redirect(loginContainer, registerContainer);
});
registerRedirect.addEventListener("click", () => {
  redirect(loginContainer, registerContainer);
});
// TODO: xử lí input description cho phù hợp với ô input
const inputList = document.querySelectorAll(".auth-right input");
inputList.forEach((input) => {
  input.addEventListener("focusout", function (e) {
    const parentInput = input.parentElement;
    const inputDes = parentInput.querySelector(".input-des");
    if (input.value != "") inputDes.classList.add("input-des-forward");
    else inputDes.classList.remove("input-des-forward");
  });
});

// TODO: chuẩn hoá form
function validator(elementSelector, errorElement = ".group-message") {
  console.log(elementSelector);
  //xác định form để validate bằng class hoặc id được truyền vào
  const formSelector = document.querySelector(elementSelector);
  //khởi tạo những phần cần validate trong form vừa triển khai
  const formRules = {};

  //các rule của thư viện
  const validatorRules = {
    required: function (value) {
      return value ? undefined : "trường này bắt buộc nhập";
    },
    email: function (value) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : "email chưa hợp lệ";
    },
    min: function (number) {
      return function (value) {
        return value.length >= number
          ? undefined
          : `mật khẩu tối thiểu ${number} kí tự`;
      };
    },
    gender: function (element) {
      return element.checked ? undefined : "vui lòng chọn giới tính";
    },
  };

  //nếu cái form đầu vào có tồn tại
  if (formSelector) {
    //lấy ra các thẻ input trong form
    const inputElements = formSelector.querySelectorAll("input[name]");
    console.log(inputElements);

    //lập qua từng thẻ input
    inputElements.forEach((input) => {
      //xác định các thành phần cần validate bằng name;
      let element = input.name;
      //lấy các yêu cầu validate bằng attribute được tạo(rules);
      let elementRules = input.getAttribute("rules");

      //kiểm tra nếu có nhiều hơn 1 yêu câu thì biến thành 1 array;
      if (elementRules.includes("|")) {
        //biến thành một array các rule với dấu "|" làm điều kiện
        elementRules = elementRules.split("|");

        //tiếp tục kiểm tra bên trong từng rule xem còn điều kiện nào không
        elementRules.forEach((rule, index) => {
          if (rule.includes(":")) {
            const ruleContent = rule.split(":");
            const ruleName = ruleContent[0];
            const ruleValue = ruleContent[1];
            //chạy sẵn cái rule 2 lớp.
            //do đây là một rule được xác định bằng value sau dấu ":"
            //ta sẽ truyền cho nó chạy với chính ruleValue của nó.
            elementRules[index] = validatorRules[ruleName](ruleValue);
          } else {
            //gắn cho đối tượng đó bằng chính cái rule trùng tên với nó trong validatorRules
            elementRules[index] = validatorRules[elementRules[index]];
          }
        });
      } else {
        //nếu là rule đơn thì gắn bằng chính hàm chạy rule trùng tên trong validatorRules
        elementRules = validatorRules[elementRules];
      }
      //tổng kết lại các hàm chạy rule có trong form.
      formRules[element] = elementRules;

      //XỬ LÍ CÁC SỰ KIỆN Ở ĐÂY
      //khi đưa con trỏ chuột ra ngoài
      input.onblur = blurHandler;

      //khi bắt đầu nhập dữ liệu
      input.onfocus = focusHandler;
    });
  }
  console.log(formRules);

  //hàm xử lí tìm thẻ parent
  function getParent(input, errorElement) {
    //gán các giá trị biến
    let currentChild = input; //xác định thẻ con để tìm thẻ cha chính.
    let groupMessage; //tạo biến lưu element hiển thị lỗi.
    let count = 0; //điếm để giới hạn số lần tìm tránh lập vô tận.
    while (true) {
      //tìm ra ngoài xem có thấy vùng để chứa message lỗi chưa
      groupMessage = currentChild.parentElement.querySelector(errorElement);
      if (groupMessage) {
        //nếu thấy vùng đó rồi thì trả về thẻ cha chứa nó.
        return groupMessage.parentElement;
      } else {
        //chưa tìm thấy thì tiếp tục tìm bên ngoài
        currentChild = currentChild.parentElement;
      }
      //tìm quá 3 lớp thì dừng
      if (count >= 3) {
        return null;
      }
      count++;
    }
  }

  //hàm xử lí khi blur khỏi input;
  function blurHandler(e) {
    //lấy các giá trị của thẻ input được chọn.
    const input = e.target;
    console.log(input.type);
    console.log(input);

    //nếu là dạng radio thì không cần kiểm tra blur chi cho mệt
    if (input.type == "radio") {
      return true;
    }
    const inputName = e.target.name;
    const inputValue = e.target.value;
    //gán bộ rule của form để thuận tiện xử lí
    const rules = formRules[inputName];

    //lỗi bằng rỗng
    let errorMessage = "";
    //kiểm tra xem nếu có nhiều rule thì lập qua kiểm tra từng rule
    if (Array.isArray(rules)) {
      for (rule of rules) {
        errorMessage = rule(inputValue);
        if (errorMessage) {
          break;
        }
      }
    } else {
      errorMessage = rules(inputValue);
    }

    // lấy ra các thẻ input cần so sánh
    const passwordInput = document.querySelector("#register-password");
    const confirmPasswordInput = document.querySelector("#register-re-password");

    if (errorMessage) {
      // tìm thẻ cha chính bằng hàm và hiển thị lỗi
      const inputParent = getParent(input, errorElement);
      const inputBlock = inputParent.querySelector(".input-wrapper");
      const errorGroup = inputParent.querySelector(errorElement);

      errorGroup.innerText = errorMessage;
      inputBlock.classList.add("invalid");
      return false;
    }

    // so sánh 2 trường password và confirm password
    if (passwordInput && confirmPasswordInput && passwordInput.value !== confirmPasswordInput.value) {
      const inputParent = getParent(confirmPasswordInput, errorElement);
      const inputBlock = inputParent.querySelector(".input-wrapper");
      const errorGroup = inputParent.querySelector(errorElement);

      errorGroup.innerText = "Mật khẩu không khớp";
      inputBlock.classList.add("invalid");
      return false;
    }

    return true;
  }

  function radioHandler() {
    const inputRadioElements = document.querySelectorAll('input[type="radio"]');
    let errorMessage;
    console.log(inputRadioElements);
    for (input of inputRadioElements) {
      const radioName = input.name;
      errorMessage = formRules[radioName](input);
      if (errorMessage == undefined) break;
    }
    if (errorMessage) {
      //tìm thẻ cha chính bằng hàm
      const inputParent = getParent(input, errorElement);
      const inputBlock = inputParent.querySelector(".input-wrapper");
      //xác định nơi hiện message lỗi
      const errorGroup = inputParent.querySelector(errorElement);

      //hiển thị giao diện
      errorGroup.innerText = errorMessage;
      inputBlock.classList.add("invalid");
      return false;
    }
    return true;
  }

  //hàm xử lí khi focus vào input;
  function focusHandler(e) {
    //lấy input cụ thể
    const input = e.target;
    //tìm thẻ cha chính bằng hàm
    const inputParent = getParent(input, errorElement);
    const inputBlock = inputParent.querySelector(".input-wrapper");
    console.log(inputBlock);
    //xác định nơi hiện message lỗi
    const errorGroup = inputParent.querySelector(errorElement);

    //bỏ hết các thông báo lỗi đi
    inputBlock.classList.remove("invalid");
    errorGroup.innerText = "";
  }

  formSelector.onsubmit = function (e) {
    e.preventDefault();
    let result = true;
    const inputElements = formSelector.querySelectorAll("input");

    //kiểm tra việc chọn giới tính
    result = radioHandler();

    //kiểm tra lại các trường khác.
    inputElements.forEach((input) => {
      const value = blurHandler({ target: input });

      if (!value) {
        result = false;
      }
    });
    console.log(formSelector);

    if (result) {
      // formSelector.submit();
      alert("Đăng ký thành công");
      window.location.reload();
    }
  };
}
validator(".auth-login");
validator(".auth-register");