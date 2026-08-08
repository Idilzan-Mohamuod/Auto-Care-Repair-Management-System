const jobTable = document.getElementById("jobTable");
const searchJob = document.getElementById("searchJob");
const statusFilter = document.getElementById("statusFilter");
const mechanicFilter = document.getElementById("mechanicFilter");
const jobCounter = document.getElementById("jobCounter");

if (jobTable && searchJob && statusFilter && mechanicFilter && jobCounter) {

  let repairJobs = JSON.parse(localStorage.getItem("repairJobs")) || [];

  function showJobs() {
    jobTable.innerHTML = "";

    const search = searchJob.value.toLowerCase();
    const status = statusFilter.value;
    const mechanic = mechanicFilter.value;

    const filtered = repairJobs.filter(job =>
      job.customer.toLowerCase().includes(search) &&
      (status === "" || job.status === status) &&
      (mechanic === "" || job.mechanic === mechanic)
    );

    jobCounter.textContent = filtered.length + " Jobs";

    filtered.forEach(job => {

      let badge = "pending";
  let icon = "fa-clock";
  if (job.status === "In Progress") { badge = "progress"; icon = "fa-gears"; }
  if (job.status === "Completed") { badge = "completed"; icon = "fa-circle-check"; }
  if (job.status === "Collected") { badge = "collected"; icon = "fa-box"; }

      jobTable.innerHTML += `
        <tr>
          <td>${job.id}</td>
          <td>${job.customer}</td>
          <td>${job.brand} ${job.model}</td>
          <td>${job.repair}</td>
          <td>${job.mechanic}</td>
          <td><span class="status ${badge}"> <i class="fa-solid ${icon}"></i> ${job.status}</span></td>
          <td class="action-buttons">
            <button class="btn" onclick="editJob('${job.id}')"><i class="fa-solid fa-pen"></i>Edit</button>
            <button class="btn" onclick="deleteJob('${job.id}')"><i class="fa-solid fa-trash"></i> Delete</button>
          </td>
        </tr>
      `;
    });
  }

  showJobs();

  searchJob.addEventListener("keyup", showJobs);
  statusFilter.addEventListener("change", showJobs);
  mechanicFilter.addEventListener("change", showJobs);

  // edit a job
  window.editJob = function (id) {
  const job = repairJobs.find(j => j.id === id);
  if (!job) {
    alert("Couldn't find that job");
    return;
  }

  let newCustomer = prompt("Customer name:", job.customer);
  if (!newCustomer) return;

  let newMechanic = prompt("Mechanic:", job.mechanic);
  if (!newMechanic) return;

  let newStatus = prompt("Status:", job.status);
  if (!newStatus) return;

  job.customer = newCustomer;
  job.mechanic = newMechanic;
  job.status = newStatus;

  localStorage.setItem("repairJobs", JSON.stringify(repairJobs));

  sendNotification({
    email: job.email,
    customer: job.customer,
    jobId: job.id,
    status: job.status
  }).catch(err => console.log(err));

 // only showPopUp  when the job Is Compeleted
  if (newStatus === "Completed") {
    showPopUp("Job completed", job.customer + " — " + job.id);
  }

  showJobs();
};

// Pop-up Message NotificationAPI on both Repair & Worshop JavaScript //
function showPopUp(title, msg) {
  const box = document.createElement("div");
  box.className = "pop-up";
  box.innerHTML = `<h4><i class="fa-solid fa-bell"></i> ${title}</h4><p>${msg}</p>`;
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 8000);
}

  // delete a job
  window.deleteJob = function (id) {
    if (!confirm("Delete this job?")) return;

    repairJobs = repairJobs.filter(job => job.id !== id);
    localStorage.setItem("repairJobs", JSON.stringify(repairJobs));

    showJobs();
  };
}