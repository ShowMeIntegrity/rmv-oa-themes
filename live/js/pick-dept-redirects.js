var nvtag_callbacks = nvtag_callbacks || {};
nvtag_callbacks.preSegue = nvtag_callbacks.preSegue || [];
nvtag_callbacks.preSegue.push(function submitSegue(args) {
    var supportStatus = args.postVals.CustomFormFieldQuestion_4140351343741448_MappedCustomFormFieldQuestion_180;
    var needsSupport = supportStatus === "1";
    
    if (needsSupport) {
        window.location = "https://respectmovoters.org/guidancecall";
    }

    return args;
});