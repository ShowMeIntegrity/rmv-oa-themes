(function () {
    const MAX_CHECKED = 2;
    const FIELDSET_SELECTOR = "#NVVolunteerForm2588973-Interests";
    const SUPPORT_SELECTOR = "#NVVolunteerForm2588973-AdditionalInformation-CustomFormFieldQuestion_4140351343741448-select";
    const MORE_INFO_VALUE = "1347479379289759";
    const AGREEMENT_LINK_CONFIG = [
        {
            selector: '#NVVolunteerForm2588464-AdditionalInformation-CustomFormFieldQuestion_5030964258686487-label',
            matchText: 'Excellence Pledge',
            url: 'https://respectmovoters.org/excellence-pledge',
            popupName: 'excellencePopup'
        },
        {
            selector: '#NVVolunteerForm2588464-AdditionalInformation-CustomFormFieldQuestion_4722964258211707-label',
            matchText: 'Confidentiality Agreement',
            url: 'https://respectmovoters.org/confidentiality-agreement',
            popupName: 'confidentialityPopup'
        }
    ];

    /* =================================================
      Determine if form is embedded or standalone
    ================================================= */
    function getRoot() {

        // Embedded form
        const embedRoot = document.querySelector(".rmv-embed-form");

        if (embedRoot) {
            return embedRoot;
        }

        // Standalone VAN page
        return document;
    }

    const ROOT = getRoot();


    /* =================================================
      Get query selector
    ================================================= */
    function getSelector(selector) {
        return ROOT.querySelector(selector);
    }


    /* =================================================
      Add Agreements links
    ================================================= */
    function addAgreementLinks(configList) {
        configList.forEach(config => {
            const {
                matchText,
                url,
                popupName
            } = config;

            const label =  Array.from(
                ROOT.querySelectorAll("span.at-checkbox-title")
            ).find(el => el.textContent.includes(matchText));
            console.log(label);
            if (!label) return;

            if (label.querySelector(".van-agreement-link")) return;

            const link = ROOT.createElement("a");
            link.href = url;
            link.textContent = ` (View ${matchText})`;
            link.className = "van-agreement-link";

            link.addEventListener("click", (e) => {
                e.preventDefault();

                window.open(
                    url,
                    popupName,
                    "width=700,height=800,resizable=yes,scrollbars=yes"
                );
            });

            label.appendChild(link);
        });
    }


    /* =================================================
      Main init
    ================================================= */
    let initialized = false;

    function init(fieldset){
        if (initialized) return;
        initialized = true;

        /* =================================================
          Find department & unsure checkboxes
        ================================================= */
        const checkboxes = fieldset.querySelectorAll('input[type="checkbox"]');
        const unsureCheckbox = Array.from(checkboxes).find(
            checkbox => {
                const labelText = checkbox.closest("label")?.innerText || "";
                return labelText.includes("I'm not sure");
            }
        );
        const supportSelect = getSelector(SUPPORT_SELECTOR);


        /* =================================================
          Check which checkboxes are checked
        ================================================= */
        function updateCheckboxState() {
            const checkedCount = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .length;

            const maxReached = checkedCount >= MAX_CHECKED;

            checkboxes.forEach(checkbox => {
                checkbox.disabled = maxReached && !checkbox.checked;
            });

            /* =================================================
              If "I'm not sure" checkbox is checked answer
              and disable support level question
            ================================================= */
            if (unsureCheckbox && supportSelect) {
                if (unsureCheckbox.checked) {
                    supportSelect.value = MORE_INFO_VALUE;
                    supportSelect.disabled = true;
                }
                else {
                    supportSelect.disabled = false;
                }
            }
        }

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener(
                "change",
                updateCheckboxState
            );
        });

        updateCheckboxState();
        addAgreementLinks(AGREEMENT_LINK_CONFIG);
    }

    /* =============================================================
      Watch DOM for VAN injecting the form & initialize logic once
    ============================================================= */
    function waitforFieldset() {
        const fieldset = getSelector(FIELDSET_SELECTOR);

        if (fieldset) {
            init(fieldset);
            return;
        }

        const observer = new MutationObserver(() => {
            const fs = getSelector(FIELDSET_SELECTOR);
            addAgreementLinks(AGREEMENT_LINK_CONFIG);
            
            if (fs) {
                console.log("Fieldset found, initializing logic");
                init(fs);
                observer.disconnect();
            }
        });

        observer.observe(ROOT.documentElement, {
            childList: true,
            subtree: true
        });
    }

    waitforFieldset();

})();