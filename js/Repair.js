const repairForm = document.getElementById("repairForm");

if (repairForm) {
  repairForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const customer = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const cost = document.getElementById("estimatedCost").value;

    if (!customer || !email || !phone) {
      alert("Please fill customer name, email and phone");
      return;
    }

    if (cost && isNaN(cost)) {
      alert("Cost has to be a number");
      return;
    }

    let repairJobs = JSON.parse(localStorage.getItem("repairJobs")) || [];

    let counter = parseInt(localStorage.getItem("jobCounter")) || 0;
    counter++;
    localStorage.setItem("jobCounter", counter);

    const id = "SRV-" + (counter < 10 ? "0" + counter : counter);

    const repairJob = {
      id,
      customer,
      email,
      phone,
      brand: document.getElementById("vehicleBrand").value,
      model: document.getElementById("vehicleModel").value,
      plate: document.getElementById("plateNumber").value,
      mileage: document.getElementById("mileage").value,
      repair: document.getElementById("repairType").value,
      mechanic: document.getElementById("mechanic").value,
      date: document.getElementById("preferredDate").value,
      cost,
      notes: document.getElementById("notes").value,
      status: "Pending",
    };

    repairJobs.push(repairJob);
    localStorage.setItem("repairJobs", JSON.stringify(repairJobs));

    sendNotification({
      email: repairJob.email,
      customer: repairJob.customer,
      jobId: repairJob.id,
      status: repairJob.status,
    }).catch((err) => console.log("notify failed:", err));

    // popup right here, no dashboard, no extra file
    showPopUp("New job booked", repairJob.customer + " — " + repairJob.id);

    repairForm.reset();
  });
}

// Pop-up Message NotificationAPI on both Repair & Worshop JavaScript //
function showPopUp(title, msg) {
  const box = document.createElement("div");
  box.className = "pop-up";
  box.innerHTML = `<h4><i class="fa-solid fa-bell"></i> ${title}</h4><p>${msg}</p>`;
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 8000);
}