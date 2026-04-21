/* =========================
  Dept name to VANid mapping
========================= */
const deptMap = {
  opt1: "5244987045769477",
  opt2: "6387810916493776",
  opt3: "5041402579891816",
};


/* =========================
  Read custom query param
========================= */
function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}


/* =========================
  Set department in dropdown
========================= */
function setDepartment() {
  const param = getParam("dept"); // your clean param
  if (!param) return;

  const value = deptMap[param.toLowerCase()];
  if (!value) return;

  const select = document.querySelector(
    'select[name="CustomFormFieldQuestion_8024435924867900"]'
  );

  if (select) {
    select.value = value;

    // Trigger change event (important for VAN)
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }
}


/* =========================
  Make resilient to re-rendering
========================= */
document.addEventListener("DOMContentLoaded", function () {
  setDepartment();

  // Retry a few times in case VAN overwrites it
  let attempts = 0;
  const interval = setInterval(() => {
    setDepartment();
    attempts++;
    if (attempts > 10) clearInterval(interval);
  }, 300);
});