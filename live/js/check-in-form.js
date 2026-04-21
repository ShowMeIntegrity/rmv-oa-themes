/* =========================
  Dept name to VANid mapping
========================= */
const deptMap = {
  comms:      "2864522",
  field:      "2864523",
  funds:      "2864524",
  vibes:      "2864525",
  notary:     "2864623",
  onboarding: "2864528",
  outreach:   "2864529",
  policy:     "2864532",
  tech:       "2864538",
  vc:         "2864630",
  other:      "2864539"
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
    'select[name="CustomFormFieldQuestion_1115962816574494_MappedSurveyQuestion_713048"]'
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