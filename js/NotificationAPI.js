//  Local API TO Send Notification To The Use Via Email with Pop-Up Menu
function sendNotification(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data.email) {
        reject("no email given");
        return;
      }

      const notification = {
        to: data.email,
        customer: data.customer,
        jobId: data.jobId,
        status: data.status,
        sentAt: new Date().toLocaleString(),
      };

      const log = JSON.parse(localStorage.getItem("notificationLog")) || [];
      log.push(notification);
      localStorage.setItem("notificationLog", JSON.stringify(log));

      resolve(notification);
    }, 800); // waa Seconds Uu Notification Ka muuqanayo Shaashada! //
  });
}
