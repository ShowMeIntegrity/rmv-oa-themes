document.addEventListener("DOMContentLoaded", () => {
    const interestSpan = document.getElementById("interest-value");
    const selectionSpan = document.getElementById("selection-value");
    
    if (!interestSpan) return;
    
    const interestValue = interestSpan.textContent.trim();
    const messages = {
        volunteer: document.getElementById("volunteer-message"),
        donor: document.getElementById("donor-message"),
        endorser: document.getElementById("endorser-message"),
        other: document.getElementById("other-message"),
    };

    /* =============================================================
      Display cleaned version of volunteer interest
    ============================================================= */
    const selection = interestValue.replace(". and ", ". ");
    if (selectionSpan) {
        selectionSpan.textContent = selection;
    }

    /* =============================================================
      Ensure all div tags start hidden
    ============================================================= */
    Object.values(messages).forEach((el) => {
        if (el) el.style.display = "none";
    });

    /* =============================================================
      Match interest value to correct div block
    ============================================================= */
    if (interestValue.includes("I want to volunteer.")) {
        messages.volunteer.style.display = "block";
        setTimeout(() => {
            window.location.href = "http://respectmovoters.org/orientation";
        }, 3000);
    } else if (interestValue.includes("I want to donate.")) {
        messages.donor.style.display = "block";
        setTimeout(() => {
            window.location.href = "http://respectmovoters.org/donate";
        }, 3000);
    } else if (interestValue.includes("I want to endorse as an individual.")) {
        messages.endorser.style.display = "block";
        setTimeout(() => {
            window.location.href = "http://respectmovoters.org/candidate";
        }, 3000);
    } else {
        messages.other.style.display = "block";
    }
});