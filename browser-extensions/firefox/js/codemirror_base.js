/* globals browser */

setTimeout(function () {
    console.log("Hello");

    const url = browser.runtime.getURL("dependencies.json");

    fetch(url)
        .then((res) => res.json())
        .then((out) => {
            console.log("Checkout this JSON! ", out);
            load_dependencies(out);
        })
        .catch((err) => {
            throw err;
        });

    function load_dependencies(config) {
        const lib = config["main"];
        const url = config["cdn"] + "/" + lib;

        console.log("load: " + url);
        var script = document.createElement("script");
        script.src = url;
        document.body.appendChild(script);
        document.body.removeChild(script);
    }
}, 3000);