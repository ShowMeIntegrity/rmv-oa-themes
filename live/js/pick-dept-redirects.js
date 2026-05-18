var nvtag_callbacks = nvtag_callbacks || {};
nvtag_callbacks.preSegue = nvtag_callbacks.preSegue || [];
nvtag_callbacks.preSegue.push(function submitSegue(args) {
    console.log(args.postVals);
    var supportStatus = args.postVals.CustomFormFieldQuestion_4140351343741448;

    var needsSupport = supportStatus === "1347479379289759";

    if (needsSupport) {
        window.location = "https://respectmovoters.org/guidancecall";
    }

    return args
});