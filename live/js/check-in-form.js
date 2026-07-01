/* =========================
  Dept name to VANid mapping
========================= */
const deptMap = {
  comms:      "4666193462379692",
  field:      "1000761908753303",
  funds:      "3756246609760897",
  logistics:  "5658104019172261",  
  notary:     "5802458084645267",
  outreach:   "2206187084194357",
  policy:     "5586985590815803",
  tech:       "5716779966810194",
  volex:      "4054865110312500",
  other:      "5751770051237373"
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
    'select[name="CustomFormFieldQuestion_5579699772702712"]'
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