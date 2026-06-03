(function () {
    const wrapperID = "rmv-van-form-wrapper";
    const wrapper = document.getElementById(wrapperID);

    const observer = new MutationObserver(() => {        
        const form = document.querySelector(
            `#${wrapperID} form`
        );
        if (!form) return;

        const contact = form.querySelector("fieldset.ContactInformation");
        if (!contact) return;

        const postalRow = contact.querySelector(".at-row.PostalCode");
        if (!postalRow) return;

        if (form.dataset.accordionApplied === "true") return;
        form.dataset.accordionApplied = "true";

        // =====================================================
        // STEP 1: SNAPSHOT EVERYTHING FIRST (NO DOM CHANGES)
        // =====================================================

        const contactNodes = [];
        let node = postalRow;

        while (node && node.closest("fieldset") === contact) {
            contactNodes.push(node);
            node = node.nextElementSibling;
        }

        const afterContactNodes = [];
        let after = contact.nextElementSibling;

        while (after) {
            afterContactNodes.push(after);
            after = after.nextElementSibling;
        }

        // =====================================================
        // STEP 2: CREATE CONTAINERS
        // =====================================================

        const acc1 = document.createElement("div");
        acc1.className = "accordion-content";

        const cue = document.createElement("div");
        cue.className = "form-continue-cue";
        cue.textContent = "Continue to complete your signup ↓";

        postalRow.after(cue);

        const acc2 = document.createElement("div");
        acc2.className = "accordion-content";

        // Insert containers BEFORE moving anything
        postalRow.after(acc1);
        contact.after(acc2);

        // =====================================================
        // STEP 3: MOVE NODES SAFELY
        // =====================================================

        contactNodes.forEach(n => acc1.appendChild(n));
        afterContactNodes.forEach(n => acc2.appendChild(n));

        // =====================================================
        // STEP 4: SINGLE TRIGGER
        // =====================================================

        let expanded = false;

        const expand = () => {
            if (expanded) return;
            expanded = true;

            acc1.classList.add("expanded");
            acc2.classList.add("expanded");

            cue.remove();
        };

        form.addEventListener("focusin", expand, { once: true });
        form.addEventListener("click", expand, { once: true });
    });

    observer.observe(wrapper, {
        childList: true,
        subtree: true
    });
})();