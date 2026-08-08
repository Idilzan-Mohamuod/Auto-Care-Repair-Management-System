const totalJobs = document.getElementById("totalJobs");
const pendingJobs = document.getElementById("pendingJobs");
const progressJobs = document.getElementById("progressJobs");
const completedJobs = document.getElementById("completedJobs");
const collectedJobs = document.getElementById("collectedJobs");
const recentJobs = document.getElementById("recentJobs");

if (
  totalJobs &&
  pendingJobs &&
  progressJobs &&
  completedJobs &&
  collectedJobs &&
  recentJobs
) {
  const repairJobs = JSON.parse(localStorage.getItem("repairJobs")) || [];

  totalJobs.textContent = repairJobs.length;

  repairJobs.forEach((job) => {
    let statusClass = "pending";
    if (job.status === "In Progress") statusClass = "progress";
    if (job.status === "Completed") statusClass = "completed";
    if (job.status === "Collected") statusClass = "collected";

    recentJobs.innerHTML += `
      <tr>
        <td>${job.id}</td>
        <td>${job.customer}</td>
        <td>${job.brand} ${job.model}</td>
        <td>${job.repair}</td>
        <td>${job.mechanic}</td>
        <td><span class="status ${statusClass}">${job.status}</span></td>
      </tr>
    `;
  });

  pendingJobs.textContent = repairJobs.filter(
    (j) => j.status === "Pending",
  ).length;
  progressJobs.textContent = repairJobs.filter(
    (j) => j.status === "In Progress",
  ).length;
  completedJobs.textContent = repairJobs.filter(
    (j) => j.status === "Completed",
  ).length;
  collectedJobs.textContent = repairJobs.filter(
    (j) => j.status === "Collected",
  ).length;
}
