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
      Create disabled messgaes
    ========================= */
    const volLabel = volCheckbox.closest("label");
    const notVolLabel = notVolCheckbox.closest("label");

    const volMessage = document.createElement("span");
    volMessage.className = "checkbox-disabled-message";
    volMessage.textContent =
        'Unavailable because "I\'m not ready to volunteer right now" is selected.';

    const notVolMessage = document.createElement("span");
    notVolMessage.className = "checkbox-disabled-message";
    notVolMessage.textContent =
        'Unavailable because "I want to volunteer" is selected.';


    /* =========================
      Remove disabled messgaes
    ========================= */
    function removeMessages() {
        volMessage.remove();
        notVolMessage.remove();

        volLabel.classList.remove("checkbox-disabled");
        notVolLabel.classList.remove("checkbox-disabled");
    }


    /* =========================
      Uncheck and disable
      opposite checkbox if
      checked
    ========================= */
    function updateCheckboxLogic() {
        
        removeMessages();

        // I want to volunteer - Checked
        if (volCheckbox.checked) {
            notVolCheckbox.checked = false;
            notVolCheckbox.disabled = true;

            notVolLabel.classList.add("checkbox-disabled");
            notVolLabel.appendChild(notVolMessage);
        } else {
            notVolCheckbox.disabled = false;
        }

        // I'm not ready to volunteer right now - Checked
        if (notVolCheckbox.checked) {
            volCheckbox.checked = false;
            volCheckbox.disabled = true;

            volLabel.classList.add("checkbox-disabled");
            volLabel.appendChild(volMessage);
        } else {
            volCheckbox.disabled = false;
        }
    }

    updateCheckboxLogic();

    volCheckbox.addEventListener("change", updateCheckboxLogic);
    notVolCheckbox.addEventListener("change", updateCheckboxLogic);

});