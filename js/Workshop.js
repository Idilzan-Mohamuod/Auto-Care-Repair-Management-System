const jobTable = document.getElementById("jobTable");
const searchJob = document.getElementById("searchJob");
const statusFilter = document.getElementById("statusFilter");
const mechanicFilter = document.getElementById("mechanicFilter");
const jobCounter = document.getElementById("jobCounter");

if (jobTable && searchJob && statusFilter && mechanicFilter && jobCounter) {

  let repairJobs = JSON.parse(localStorage.getItem("repairJobs")) || [];

  function showJobs() {
    const search = searchJob.value.toLowerCase();
    const status = statusFilter.value;
    const mechanic = mechanicFilter.value;

    const filtered = repairJobs.filter(job => {
      const vehicleText = (job.vehicle || "").toLowerCase();
      const matchesSearch = job.customer.toLowerCase().includes(search) || vehicleText.includes(search);
      const matchesStatus = status === "" || job.status === status;
      const matchesMechanic = mechanic === "" || job.mechanic === mechanic;

      return matchesSearch && matchesStatus && matchesMechanic;
    });

    jobCounter.textContent = filtered.length + " Jobs";

    let htmlRows = "";

    filtered.forEach(job => {
      let badge = "pending";
      let icon = "fa-clock";
      if (job.status === "In Progress") { badge = "progress"; icon = "fa-gears"; }
      if (job.status === "Completed") { badge = "completed"; icon = "fa-circle-check"; }
      if (job.status === "Collected") { badge = "collected"; icon = "fa-box"; }

      htmlRows += `
        <tr>
          <td>${job.id}</td>
          <td>${job.customer}</td>
          <td>${job.vehicle || "N/A"}</td>
          <td>${job.repair}</td>
          <td>${job.mechanic}</td>
          <td><span class="status ${badge}"><i class="fa-solid ${icon}"></i> ${job.status}</span></td>
          <td class="action-buttons">
            <button class="btn" onclick="editJob('${job.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
            <button class="btn" onclick="deleteJob('${job.id}')"><i class="fa-solid fa-trash"></i> Delete</button>
          </td>
        </tr>
      `;
    });

    jobTable.innerHTML = htmlRows;
  }

  showJobs();

  
  searchJob.addEventListener("input", showJobs);
  statusFilter.addEventListener("change", showJobs);
  mechanicFilter.addEventListener("change", showJobs);

  // Edit a job
  window.editJob = function (id) {
    const job = repairJobs.find(j => j.id === id);
    if (!job) {
      alert("Couldn't find that job");
      return;
    }

    let newCustomer = prompt("Customer name:", job.customer);
    if (newCustomer === null) return;

    let newVehicle = prompt("Vehicle Info (Brand & Model):", job.vehicle || "");
    if (newVehicle === null) return;

    let newRepair = prompt("Repair Info:", job.repair);
    if (newRepair === null) return;

    let newMechanic = prompt("Mechanic:", job.mechanic);
    if (newMechanic === null) return;

    let newStatus = prompt("Status (Pending, In Progress, Completed, Collected):", job.status);
    if (newStatus === null) return;


    job.customer = newCustomer;
    job.vehicle = newVehicle;
    job.repair = newRepair;
    job.mechanic = newMechanic;
    job.status = newStatus;

    localStorage.setItem("repairJobs", JSON.stringify(repairJobs));

    if (typeof sendNotification === "function") {
      sendNotification({
        email: job.email,
        customer: job.customer,
        jobId: job.id,
        status: job.status
      }).catch(err => console.log(err));
    }

    if (newStatus === "Completed") {
      showPopUp("Job completed", job.customer + " — " + job.id);
    }

    showJobs();
  };

  // Pop-up Message Notification API
  function showPopUp(title, msg) {
    const box = document.createElement("div");
    box.className = "pop-up";
    box.innerHTML = `<h4><i class="fa-solid fa-bell"></i> ${title}</h4><p>${msg}</p>`;
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 8000);
  }

  // Delete a job
  window.deleteJob = function (id) {
    if (!confirm("Delete this job?")) return;

    repairJobs = repairJobs.filter(job => job.id !== id);
    localStorage.setItem("repairJobs", JSON.stringify(repairJobs));

    showJobs();
  };
}