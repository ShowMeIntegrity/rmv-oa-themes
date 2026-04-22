var nvtag_callbacks = nvtag_callbacks || {};
nvtag_callbacks.preSegue = nvtag_callbacks.preSegue || [];
nvtag_callbacks.preSegue.push(function submitSegue(args) {
    console.log(args.postVals);
    var interestVol = args.postVals.Interest_5448342;
    var activeTest = args.postVals.Interest_5474686;
    console.log("Volunteer:", interestVol);
    console.log("Active Test:", activeTest);

    if (activeTest && !interestVol) {
        window.location = "https://respectmovoters.org/checkin";
    } else if (interestVol && !activeTest) {
        window.location = "https://respectmovoters.org/reminders";
    } else if (activeTest && interestVol) {
        window.location = "https://respectmovoters.org/dashboard";
    } else {
        window.location = "https://respectmovoters.org";
    }

    return args
});