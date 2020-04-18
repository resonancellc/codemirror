const config = {
    cdn: "https://cdnjs.cloudflare.com/ajax/libs",
    libs: [
        "codemirror/5.52.2/codemirror.min.js",
        "codemirror/5.52.2/mode/markdown/markdown.min.js",
        "codemirror/5.52.2/addon/display/fullscreen.min.js",
        "codemirror/5.52.2/keymap/vim.min.js",
        "codemirror/5.52.2/addon/dialog/dialog.min.js",
        "codemirror/5.52.2/addon/search/jump-to-line.min.js",
        "codemirror/5.52.2/addon/search/match-highlighter.min.js",
        "codemirror/5.52.2/addon/search/search.min.js",
        "codemirror/5.52.2/addon/search/searchcursor.min.js",
    ],

    resources: [
        "codemirror/5.52.2/codemirror.min.css",
        "codemirror/5.52.2/theme/3024-day.min.css",
        "codemirror/5.52.2/theme/3024-night.min.css",
        "codemirror/5.52.2/theme/abcdef.min.css",
        "codemirror/5.52.2/theme/ambiance.min.css",
        "codemirror/5.52.2/theme/ayu-dark.min.css",
        "codemirror/5.52.2/theme/ayu-mirage.min.css",
        "codemirror/5.52.2/theme/base16-dark.min.css",
        "codemirror/5.52.2/theme/base16-light.min.css",
        "codemirror/5.52.2/theme/bespin.min.css",
        "codemirror/5.52.2/theme/blackboard.min.css",
        "codemirror/5.52.2/theme/cobalt.min.css",
        "codemirror/5.52.2/theme/colorforth.min.css",
        "codemirror/5.52.2/theme/darcula.min.css",
        "codemirror/5.52.2/theme/dracula.min.css",
        "codemirror/5.52.2/theme/duotone-dark.min.css",
        "codemirror/5.52.2/theme/duotone-light.min.css",
        "codemirror/5.52.2/theme/eclipse.min.css",
        "codemirror/5.52.2/theme/elegant.css",
        "codemirror/5.52.2/theme/erlang-dark.min.css",
        "codemirror/5.52.2/theme/gruvbox-dark.min.css",
        "codemirror/5.52.2/theme/hopscotch.min.css",
        "codemirror/5.52.2/theme/icecoder.min.css",
        "codemirror/5.52.2/theme/idea.min.css",
        "codemirror/5.52.2/theme/isotope.min.css",
        "codemirror/5.52.2/theme/lesser-dark.min.css",
        "codemirror/5.52.2/theme/liquibyte.min.css",
        "codemirror/5.52.2/theme/lucario.min.css",
        "codemirror/5.52.2/theme/material-darker.min.css",
        "codemirror/5.52.2/theme/material-ocean.min.css",
        "codemirror/5.52.2/theme/material-palenight.min.css",
        "codemirror/5.52.2/theme/material.min.css",
        "codemirror/5.52.2/theme/mbo.min.css",
        "codemirror/5.52.2/theme/mdn-like.min.css",
        "codemirror/5.52.2/theme/midnight.min.css",
        "codemirror/5.52.2/theme/monokai.min.css",
        "codemirror/5.52.2/theme/moxer.min.css",
        "codemirror/5.52.2/theme/neo.min.css",
        "codemirror/5.52.2/theme/night.min.css",
        "codemirror/5.52.2/theme/nord.min.css",
        "codemirror/5.52.2/theme/oceanic-next.min.css",
        "codemirror/5.52.2/theme/panda-syntax.min.css",
        "codemirror/5.52.2/theme/paraiso-dark.min.css",
        "codemirror/5.52.2/theme/paraiso-light.min.css",
        "codemirror/5.52.2/theme/pastel-on-dark.min.css",
        "codemirror/5.52.2/theme/railscasts.min.css",
        "codemirror/5.52.2/theme/rubyblue.min.css",
        "codemirror/5.52.2/theme/seti.min.css",
        "codemirror/5.52.2/theme/shadowfox.min.css",
        "codemirror/5.52.2/theme/solarized.min.css",
        "codemirror/5.52.2/theme/ssms.min.css",
        "codemirror/5.52.2/theme/the-matrix.min.css",
        "codemirror/5.52.2/theme/tomorrow-night-bright.min.css",
        "codemirror/5.52.2/theme/tomorrow-night-eighties.min.css",
        "codemirror/5.52.2/theme/ttcn.min.css",
        "codemirror/5.52.2/theme/twilight.min.css",
        "codemirror/5.52.2/theme/vibrant-ink.min.css",
        "codemirror/5.52.2/theme/xq-dark.min.css",
        "codemirror/5.52.2/theme/xq-light.min.css",
        "codemirror/5.52.2/theme/yeti.min.css",
        "codemirror/5.52.2/theme/yonce.min.css",
        "codemirror/5.52.2/theme/zenburn.min.css",
        "codemirror/5.52.2/addon/dialog/dialog.min.css",
        "codemirror/5.52.2/addon/search/matchesonscrollbar.min.css",
    ],
};

for (const css of config["resources"]) {
    const url = config["cdn"] + "/" + css;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
}

for (const lib of config["libs"]) {
    const script = document.createElement("script");
    const url = config["cdn"] + "/" + lib;
    console.log(url);
    script.src = url;
    document.head.appendChild(script);
}
