// =================* FEEDBACK *================//
document.getElementById("surveyForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Ngăn form reload trang
  
    // Lấy các giá trị từ form
    const name = document.getElementById("name").value;
    const feedback = document.getElementById("feedback").value;
    const source = document.querySelector('input[name="source"]:checked').value;
  
    // Ẩn form và hiện lời cảm ơn
    document.getElementById("surveyForm").classList.add("hidden");
    document.getElementById("thankYouMessage").classList.remove("hidden");
  
    console.log("Submitted Data:", { name, feedback, source });
  });
