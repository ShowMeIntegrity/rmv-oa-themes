(function () {
    console.log("Checkbox disabler initalizing...")
    console.log("Checkboxes:");
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        console.log("\t"+cb.name);
    });

    const FIELDSET_SELECTOR = '#NVSignupForm2574972-AdditionalInformation';

    function initCheckboxLogic(fieldset) {
        /* =========================
          Find volunteer & not a
          vol checkboxes
        ========================= */
        const checkboxes = fieldset.querySelectorAll('input[type="checkbox"]');

        const volCheckbox = Array.from(checkboxes).find(cb =>
            cb.parentElement.innerText.includes("I want to volunteer")
        );

        const notVolCheckbox = Array.from(checkboxes).find(cb =>
            cb.parentElement.innerText.includes("I'm not ready to volunteer")
        );

        if (!volCheckbox || !notVolCheckbox) {
            console.log("Checkboxes not found yet);");
            return;
        }

        /* =========================
          Uncheck and disable
          opposite checkbox if
          checked
        ========================= */
        function updateCheckboxLogic(){
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

    }

    /* =========================
      Watch DOM for VAN
      injecting the form &
      initialize logic once
    ========================= */
    const observer = new MutationObserver((mutations, obs) => {
        const fieldset = document.querySelector(FIELDSET_SELECTOR);

        if (fieldset) {
            console.log("Fieldset found, initializing logic");
            initCheckboxLogic(fieldset);
            obs.disconnect(); // Stop watching after initialization
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();