(function () {
    function getFieldset() {
        return document.querySelector('#NVSignupForm2574972-AdditionalInformation');
    }

    let initialized = false;

    function init(fieldset){
        if (initialized) return;
        initialized = true;

        /* =================================================
          Find volunteer & not a volunteer checkboxes
        ================================================= */
        const checkboxes = fieldset.querySelectorAll('input[type="checkbox"]');

        const volCheckbox = Array.from(checkboxes).find(cb =>
            cb.parentElement.innerText.includes("I want to volunteer")
        );

        const notVolCheckbox = Array.from(checkboxes).find(cb =>
            cb.parentElement.innerText.includes("I'm not ready to volunteer")
        );

        if (!volCheckbox || !notVolCheckbox) {
            console.warn("Checkboxes not found yet);");
            return;
        }

        /* =================================================
          Find label attached to each checkbox
        ================================================= */
        const volLabel = volCheckbox.closest("label");
        const notVolLabel = notVolCheckbox.closest("label");


        /* =================================================
          Create helper text for disabled checkboxes
        ================================================= */
        function addHelper(label, message) {
            const container = label.querySelector(".at-checkbox-title-container");
            if (!container) {
                console.warn("Checkbox container not found.")
                return;
            }

            const msg = document.createElement("div");
            msg.className = "checkbox-helper-text";
            msg.textContent = message;

            container.insertAdjacentElement("afterend", msg);
        }


        /* =================================================
          Clear helper text for disabled checkboxes
        ================================================= */
        function clearHelpers() {
            fieldset.querySelectorAll(".checkbox-helper-text").forEach(el => el.remove());
        }


        /* =================================================
          Uncheck and disable opposite checkbox if checked
        ================================================= */
        function update(){
            // Remove all helper text
            clearHelpers();
            
            // VOL checked --> NOT VOL disabled
            if (volCheckbox.checked) {
                notVolCheckbox.checked = false;
                notVolCheckbox.disabled = true;
                
                addHelper(
                    notVolLabel,
                    'Unavailable when "I\'m not ready to volunteer right now" is selected.'
                );
            } else {
                notVolCheckbox.disabled = false;
            }

            // NOT VOL checked --> VOL disabled
            if (notVolCheckbox.checked) {
                volCheckbox.checked = false;
                volCheckbox.disabled = true;
                
                addHelper(
                    volLabel,
                    'Unavailable when "I want to volunteer" is selected.'
                );
            } else {
                volCheckbox.disabled = false;
            }
        }

        update();

        volCheckbox.addEventListener("change", update);
        notVolCheckbox.addEventListener("change", update);
    }
    

    /* =============================================================
      Watch DOM for VAN injecting the form & initialize logic once
    ============================================================= */
    function waitforFieldset() {
        const fieldset = getFieldset();

        if (fieldset) {
            init(fieldset);
            return;
        }

        const observer = new MutationObserver(() => {
            const fs = getFieldset();
            
            if (fs) {
                console.log("Fieldset found, initializing logic");
                init(fs);
                observer.disconnect();
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    waitforFieldset();

})();