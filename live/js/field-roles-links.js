(function () {
    const FIELDSET_SELECTOR = "#NVVolunteerForm2588973-Interests";
    const SUPPORT_SELECTOR = "#NVVolunteerForm2588973-AdditionalInformation-CustomFormFieldQuestion_4140351343741448-select";
    const MORE_INFO_VALUE = "1347479379289759";
    const ROLE_LINK_CONFIG = [
        {
            selector: '#NVVolunteerForm2591515-Interests-Interest_5502793-label',
            matchText: 'Regional Field Coordinator',
            url: 'https://drive.google.com/file/d/19xwOEkPgwssC5ZdSKZZYsX75pnLkfqzY/view?usp=sharing',
            popupName: 'regionalFieldCoordinator'
        },
        {
            selector: '#NVVolunteerForm2591515-Interests-Interest_5502859-label',
            matchText: 'Area Lead',
            url: 'https://drive.google.com/file/d/15Ujd_D5K9tzPU6wRsmL6WXHZ2w918Aey/view?usp=sharing',
            popupName: 'areaLead'
        },
        {
            selector: '#NVVolunteerForm2591515-Interests-Interest_5502797-label',
            matchText: 'Canvassing Lead',
            url: 'https://drive.google.com/file/d/1Hi5JDP3hROgE2wD6uCNhp54Sh9nVFMhe/view?usp=sharing',
            popupName: 'canvassingLead'
        },
        {
            selector: '#NVVolunteerForm2591515-Interests-Interest_5502798-label',
            matchText: 'Phone Bank Lead',
            url: 'https://drive.google.com/file/d/1jUeSqoh5FQjJH3Ljd95N5wo551K46WLh/view?usp=sharing',
            popupName: 'phoneBankLead'
        },
        {
            selector: '#NVVolunteerForm2591515-Interests-Interest_5502800-label',
            matchText: 'Events and Visibility Lead',
            url: 'https://drive.google.com/file/d/1357Ptai0CTuxuFmrD6RFzpry5Z0sDU-i/view?usp=sharing',
            popupName: 'eventsLead'
        },
        {
            selector: '#NVVolunteerForm2591515-Interests-Interest_5502807-label',
            matchText: 'Data Management Lead',
            url: 'https://drive.google.com/file/d/1nYPGeuRaEAjg4Xo42CDD0Ul1yOuD4Cmu/view?usp=sharing',
            popupName: 'dataLead'
        },
        {
            selector: '#NVVolunteerForm2591515-Interests-Interest_5502809-label',
            matchText: 'Volunteer Team Lead',
            url: 'https://drive.google.com/file/d/1tjoAU1peKtGLq9i9kgDgb7w11ieGD0VL/view?usp=sharing',
            popupName: 'volTeamLead'
        },
        {
            selector: '#NVVolunteerForm2591515-Interests-Interest_5502864-label',
            matchText: 'Volunteer Coordinator',
            url: 'https://drive.google.com/file/d/13qWz9c6qpO0dW1LgZq4WmVsN1EuoPMmG/view?usp=sharing',
            popupName: 'volCoordinator'
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
    function addRoleLinks(configList) {
        configList.forEach(config => {
            const {
                matchText,
                url,
                popupName
            } = config;

            const label =  Array.from(
                ROOT.querySelectorAll("span.at-checkbox-title")
            ).find(el => el.textContent.includes(matchText));
            // console.log(label);
            if (!label) return;

            if (label.querySelector(".van-role-link")) return;

            const link = ROOT.createElement("a");
            link.href = url;
            link.textContent = ` (View Role Description)`;
            link.className = "van-role-link";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            label.appendChild(link);
        });
    }


    /* =================================================
      Main init
    ================================================= */
    let initialized = false;

    function init(){
        if (initialized) return;
        initialized = true;
        addRoleLinks(ROLE_LINK_CONFIG);
    }

    /* =============================================================
      Watch DOM for VAN injecting the form & initialize logic once
    ============================================================= */
    function waitforFieldset() {
        const fieldset = getSelector(FIELDSET_SELECTOR);

        if (fieldset) {
            init();
            return;
        }

        const observer = new MutationObserver(() => {
            const fs = getSelector(FIELDSET_SELECTOR);
            addRoleLinks(ROLE_LINK_CONFIG);
            
            if (fs) {
                console.log("Fieldset found, initializing logic");
                init();
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