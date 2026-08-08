const reportTotal = document.getElementById("reportTotal");
const reportPending = document.getElementById("reportPending");
const reportCollected = document.getElementById("reportCollected");
const reportCompleted = document.getElementById("reportCompleted");

const commonRepair = document.getElementById("commonRepair");
const reportChart = document.getElementById("reportChart");

if (reportTotal && reportPending  && reportCollected  && reportCompleted && commonRepair && reportChart) {

  const repairJobs = JSON.parse(localStorage.getItem("repairJobs")) || [];

  reportTotal.textContent = repairJobs.length;
  reportPending.textContent = repairJobs.filter(j => j.status === "Pending").length;
  reportCollected.textContent = repairJobs.filter(j => j.status === "Collected").length;
  reportCompleted.textContent = repairJobs.filter(j => j.status === "Completed").length;
  

  // count repair types
  const repairCounts = {};
  repairJobs.forEach(job => {
    repairCounts[job.repair] = (repairCounts[job.repair] || 0) + 1;
  });

  let topRepair = "-";
  let topCount = 0;
  for (let type in repairCounts) {
    if (repairCounts[type] > topCount) {
      topCount = repairCounts[type];
      topRepair = type;
    }
  }
  commonRepair.textContent = topRepair;

  // build the chart
  if (repairJobs.length === 0) {
    reportChart.innerHTML = "<p>No repair data yet.</p>";
  } else {
    for (let type in repairCounts) {
      const percent = (repairCounts[type] / repairJobs.length) * 100;

      reportChart.innerHTML += `
        <div class="chart-row">
          <span class="chart-label">${type}</span>
          <div class="chart-bar-bg">
            <div class="chart-bar" style="width: ${percent}%"></div>
          </div>
          <span class="chart-count">${repairCounts[type]}</span>
        </div>
      `;
    }
  }
}