/* global CodeMirror Backbone */

let editors = new Map();
let fullscreen_editors = new Map();

const STORED_CONTENT = new Map();
const STORED_HISTORY = new Map();
const STORED_CURSOR = new Map();

let focus_fullscreen = false;
let active_card = null;

function until(conditionFunction) {
    const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else setTimeout((_) => poll(resolve), 400);
    };

    return new Promise(poll);
}

function create_codemirror(textarea, config) {
    const codeMirrorWrapper = CodeMirror.fromTextArea(textarea, {
        mode: "markdown",
        lineWrapping: true,
        matchBrackets: true,
        scrollbarStyle: "null",
        theme: config.theme,
        fullScreen: false,
        keyMap: config.keyMap,
        autofocus: true,
        extraKeys: {
            "Shift-F8": function (cm) {
                let new_theme = window.prompt("Current theme", cm.getOption("theme"));

                cm.setOption("theme", new_theme);
                config.theme = new_theme;
            },

            F8: function (cm) {
                const theme = config.themes[config.themeIdx];
                cm.setOption("theme", theme);

                config.theme = theme;
                config.themeIdx = (config.themeIdx + 1) % config.themes.length;
            },
        },
    });
    codeMirrorWrapper.setSize(null, null);

    // reflect changes in the codemirror instance in the
    // wrapped textarea, so that changes get for
    codeMirrorWrapper.on("change", function (cm, _change) {
        cm.save();
    });

    return codeMirrorWrapper;
}

function create_fullscreen_codemirror(cm, textarea, config) {
    const linked_doc = cm.getDoc().linkedDoc({ sharedHist: true });

    const codeMirror = CodeMirror.fromTextArea(textarea, {
        mode: "markdown",
        lineWrapping: true,
        matchBrackets: true,
        scrollbarStyle: "null",
        theme: config.theme,
        fullScreen: true,
        keyMap: config.keyMap,
        autofocus: true,
        extraKeys: {
            "Shift-F8": function (cm) {
                let new_theme = window.prompt("Current theme", cm.getOption("theme"));
                cm.setOption("theme", new_theme);

                config.theme = new_theme;
            },

            F8: function (cm) {
                const theme = config.themes[config.themeIdx];
                cm.setOption("theme", theme);

                config.theme = theme;
                config.themeIdx = (config.themeIdx + 1) % config.themes.length;
            },
            F9: function (cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
        },
    });

    codeMirror.swapDoc(linked_doc);

    return codeMirror;
}

function enable_fullscreen() {
    focus_fullscreen = true;

    console.log("set fullscreen to " + focus_fullscreen);
}

function disable_fullscreen() {
    focus_fullscreen = false;

    console.log("set fullscreen to " + focus_fullscreen);
}

function toggle_fullscreen(id, config) {
    focus_fullscreen = !focus_fullscreen;

    console.log("set fullscreen to " + focus_fullscreen);
    if (is_fullscreen()) {
        create_fullscreen_editor(id, config);
    }
}

function is_fullscreen() {
    return focus_fullscreen;
}

function get_editor(id) {
    return editors.get(id);
}

function get_fullscreen_editor(id) {
    return fullscreen_editors.get(id);
}

function set_fullscreen_editor(id, cm) {
    fullscreen_editors.set(id, cm);
}

function remove_fullscreen_editor(id) {
    fullscreen_editors.delete(id);
}

async function create_fullscreen_editor(id, config) {
    const codemirror = get_editor(id);

    if (typeof codemirror === "undefined") {
        throw "reference editor must be defined";
    }

    codemirror.setOption("theme", config.theme);
    let fullscreen_editor = get_fullscreen_editor(id);

    if (typeof fullscreen_editor !== "undefined") {
        console.log("focus existing fullscreen editor");
        fullscreen_editor.setOption("theme", config.theme);
        fullscreen_editor.focus();
    } else {
        console.log("create new fullscreen editor");
        const fullscreen_container = document.querySelector(
            ".fullscreen-container"
        );

        await until(() => fullscreen_container.querySelector("textarea"));
        let fullscreen_textarea = fullscreen_container.querySelector("textarea");

        fullscreen_editor = create_fullscreen_codemirror(
            codemirror,
            fullscreen_textarea,
            config
        );
        set_fullscreen_editor(id, fullscreen_editor);
    }
}

async function create_editor(id, config) {
    const card = document.querySelector("#card" + id);
    await until(() => card.querySelector("textarea"));

    const textarea = card.querySelector("textarea");
    let codemirror = null;

    if (typeof editors.get(id) !== "undefined") {
        codemirror = editors.get(id);
        codemirror.setOption("theme", config.theme);
        codemirror.focus();
    } else {
        codemirror = create_codemirror(textarea, config);
        editors.set(id, codemirror);
    }

    if (is_fullscreen()) {
        create_fullscreen_editor(id, config);
    }

    save_history(id);
    save_content(id);
    save_cursor(id);
}

function load_content(id) {
    return STORED_CONTENT.get(id);
}

function load_history(id) {
    return STORED_HISTORY.get(id);
}

function load_cursor(id) {
    return STORED_CURSOR.get(id);
}

function save_content(id) {
    const content = get_editor(id).getDoc().getValue();
    STORED_CONTENT.set(id, content);
}

function save_history(id) {
    const history = get_editor(id).getDoc().getHistory();
    STORED_HISTORY.set(id, history);
}

function save_cursor(id) {
    const cursor = get_editor(id).getDoc().getCursor();
    STORED_CURSOR.set(id, cursor);
}

function close_editor(id) {
    const content = load_content(id);
    const history = load_history(id);
    const cursor = load_cursor(id);
    const editor = get_editor(id);

    editor.getDoc().setValue(content);
    editor.setHistory(history);
    editor.setCursor(cursor);

    const fullscreen_editor = get_fullscreen_editor(id);

    if (typeof fullscreen_editor !== "undefined") {
        fullscreen_editor.toTextArea();
        remove_fullscreen_editor(id);
    }
    disable_fullscreen();
    // let editor = editors.get(id);
    // editor.toTextArea();
}

function save_editor(id) {
    const editor = editors.get(id);
    editor.save();

    save_history(id);
    save_content(id);
    save_cursor(id);
}

function set_active(id) {
    active_card = id;
}

function get_active() {
    return active_card;
}

async function waitForAndRun(condition, run) {
    await until(condition);
    run();
}

function backboneEvents(config) {
    Backbone.on("card:edit", (id) => {
        create_editor(id, config);
        set_active(id);
    });

    Backbone.on("card:save", (id) => {
        save_editor(id);
        close_editor(id);
    });

    Backbone.on("card:cancel", (id) => {
        close_editor(id);
    });

    Backbone.on("key:editFullscreen", (_) => {
        enable_fullscreen();
    });

    Backbone.on("key:fullscreen", (_) => {
        toggle_fullscreen(get_active(), config);
    });
}

function run(config, init) {
    waitForAndRun(
        () => typeof Backbone !== "undefined",
        () => {
            backboneEvents(config);
        }
    );

    init();
}

window.run = run;
