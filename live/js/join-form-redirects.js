var nvtag_callbacks = nvtag_callbacks || {};
nvtag_callbacks.preSegue = nvtag_callbacks.preSegue || [];
nvtag_callbacks.preSegue.push(function submitSegue(args) {
    console.log(args.postVals);
    var endorser = args.postVals.CustomFormFieldQuestion_4036957255566841_CustomFormFieldQuestion_3931566655683606_MappedActivistCodeQuestion_5453604;
    var donor = args.postVals.CustomFormFieldQuestion_4036957255566841_CustomFormFieldQuestion_4917592324368908_MappedActivistCodeQuestion_5454187;
    var volunteer = args.postVals.CustomFormFieldQuestion_4036957255566841_CustomFormFieldQuestion_5859012618782469_MappedActivistCodeQuestion_5448342;

    console.log("Volunteer:", volunteer);
    console.log("Endorser:", endorser);
    console.log("Donor:", donor);

    var isVolunteer = volunteer === "true";
    var isEndorser = endorser === "true";
    var isDonor = donor === "true";

    if (isVolunteer) {
        window.location = "https://respectmovoters.org/orientation";
    } else if (isEndorser) {
        window.location = "https://respectmovoters.org/candidate";
    } else if (isDonor) {
        window.location = "https://respectmovoters.org/donate";
    }

    return args
});