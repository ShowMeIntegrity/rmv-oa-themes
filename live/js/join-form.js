document.addEventListener("DOMContentLoaded", function () {
    /* =========================
      Find volunteer & not a vol
      checkboxes
    ========================= */
    const volCheckbox = document.querySelector(
        'input[name="CustomFormFieldQuestion_4036957255566841_CustomFormFieldQuestion_5859012618782469_MappedActivistCodeQuestion_5448342"]'
    );
    const notVolCheckbox = document.querySelector(
        'input[name="CustomFormFieldQuestion_4036957255566841_CustomFormFieldQuestion_1094947885690281_MappedActivistCodeQuestion_5473023"]'
    );


    /* =========================
      Uncheck and disable
      opposite checkbox if
      checked
    ========================= */
    function updateCheckboxLogic() {

        // I want to volunteer - Checked
        if (volCheckbox.checked) {
            notVolCheckbox.checked = false;
            notVolCheckbox.disabled = true;
        } else {
            notVolCheckbox.disabled = false;
        }

        // I'm not ready to volunteer right now - Checked
        if (notVolCheckbox.checked) {
            volCheckbox.checked = false;
            volCheckbox.disabled = true;
        } else {
            volCheckbox.disabled = false;
        }
    }

    updateCheckboxLogic();

    volCheckbox.addEventListener("change", updateCheckboxLogic);
    notVolCheckbox.addEventListener("change", updateCheckboxLogic);

});