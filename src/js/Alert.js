import ExternalServices from "./ExternalServices.mjs";

function alertTemplate(alert) {
  const finishedAlert = document.createElement("p");
  finishedAlert.innerHTML = `${alert.message}`;
  finishedAlert.style.color = alert.color;
  finishedAlert.style.backgroundColor = alert.background;
  document.querySelector(".alert-list").appendChild(finishedAlert);
}

export default class Alert {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  async init() {
    const dataSource = new ExternalServices("alerts");
    const alerts = await dataSource.getData(dataSource);
    this.alertRender(alerts);
  }

  alertRender(alerts) {
    const htmlItem = document.createElement("section");
    htmlItem.classList.add(`alert-list`);
    this.parentElement.appendChild(htmlItem);
    alerts.map(alertTemplate);
  }
}
