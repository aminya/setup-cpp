var $dQzAa$os = require("os");
var $dQzAa$path = require("path");
var $dQzAa$fs = require("fs");
var $dQzAa$crypto = require("crypto");
var $dQzAa$http = require("http");
var $dQzAa$https = require("https");
require("net");
var $dQzAa$tls = require("tls");
var $dQzAa$events = require("events");
var $dQzAa$assert = require("assert");
var $dQzAa$util = require("util");
var $dQzAa$child_process = require("child_process");
var $dQzAa$string_decoder = require("string_decoder");
var $dQzAa$timers = require("timers");
var $dQzAa$buffer = require("buffer");
var $dQzAa$stream = require("stream");
var $dQzAa$process = require("process");
var $dQzAa$url = require("url");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire810d"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire810d"] = parcelRequire;
}
parcelRequire.register("9Ei2d", function(module, exports) {
"use strict";
var $7065d6cfc1ba453b$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $7065d6cfc1ba453b$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $7065d6cfc1ba453b$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $7065d6cfc1ba453b$var$__createBinding(result, mod, k);
    }
    $7065d6cfc1ba453b$var$__setModuleDefault(result, mod);
    return result;
};
var $7065d6cfc1ba453b$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.getIDToken = module.exports.getState = module.exports.saveState = module.exports.group = module.exports.endGroup = module.exports.startGroup = module.exports.info = module.exports.notice = module.exports.warning = module.exports.error = module.exports.debug = module.exports.isDebug = module.exports.setFailed = module.exports.setCommandEcho = module.exports.setOutput = module.exports.getBooleanInput = module.exports.getMultilineInput = module.exports.getInput = module.exports.addPath = module.exports.setSecret = module.exports.exportVariable = module.exports.ExitCode = void 0;

var $tn2E1 = parcelRequire("tn2E1");

var $eEkRA = parcelRequire("eEkRA");

var $efWJf = parcelRequire("efWJf");

const $7065d6cfc1ba453b$var$os = $7065d6cfc1ba453b$var$__importStar($dQzAa$os);

const $7065d6cfc1ba453b$var$path = $7065d6cfc1ba453b$var$__importStar($dQzAa$path);
parcelRequire("29x7E");
var $a9rtJ = parcelRequire("a9rtJ");

var $5lJ9b = parcelRequire("5lJ9b");
/**
 * The code to exit an action
 */ var $7065d6cfc1ba453b$var$ExitCode;
(function(ExitCode) {
    /**
     * A code indicating that the action was successful
     */ ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */ ExitCode[ExitCode["Failure"] = 1] = "Failure";
})($7065d6cfc1ba453b$var$ExitCode = module.exports.ExitCode || (module.exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $7065d6cfc1ba453b$var$exportVariable(name, val) {
    const convertedVal = $efWJf.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env["GITHUB_ENV"] || "";
    if (filePath) {
        const delimiter = `ghadelimiter_${$a9rtJ.default()}`;
        // These should realistically never happen, but just in case someone finds a way to exploit uuid generation let's not allow keys or values that contain the delimiter.
        if (name.includes(delimiter)) throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
        if (convertedVal.includes(delimiter)) throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
        const commandValue = `${name}<<${delimiter}${$7065d6cfc1ba453b$var$os.EOL}${convertedVal}${$7065d6cfc1ba453b$var$os.EOL}${delimiter}`;
        $eEkRA.issueCommand("ENV", commandValue);
    } else $tn2E1.issueCommand("set-env", {
        name: name
    }, convertedVal);
}
module.exports.exportVariable = $7065d6cfc1ba453b$var$exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */ function $7065d6cfc1ba453b$var$setSecret(secret) {
    $tn2E1.issueCommand("add-mask", {}, secret);
}
module.exports.setSecret = $7065d6cfc1ba453b$var$setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */ function $7065d6cfc1ba453b$var$addPath(inputPath) {
    const filePath = process.env["GITHUB_PATH"] || "";
    if (filePath) $eEkRA.issueCommand("PATH", inputPath);
    else $tn2E1.issueCommand("add-path", {}, inputPath);
    process.env["PATH"] = `${inputPath}${$7065d6cfc1ba453b$var$path.delimiter}${process.env["PATH"]}`;
}
module.exports.addPath = $7065d6cfc1ba453b$var$addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */ function $7065d6cfc1ba453b$var$getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
    if (options && options.required && !val) throw new Error(`Input required and not supplied: ${name}`);
    if (options && options.trimWhitespace === false) return val;
    return val.trim();
}
module.exports.getInput = $7065d6cfc1ba453b$var$getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */ function $7065d6cfc1ba453b$var$getMultilineInput(name, options) {
    const inputs = $7065d6cfc1ba453b$var$getInput(name, options).split("\n").filter((x)=>x !== "");
    return inputs;
}
module.exports.getMultilineInput = $7065d6cfc1ba453b$var$getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */ function $7065d6cfc1ba453b$var$getBooleanInput(name, options) {
    const trueValue = [
        "true",
        "True",
        "TRUE"
    ];
    const falseValue = [
        "false",
        "False",
        "FALSE"
    ];
    const val = $7065d6cfc1ba453b$var$getInput(name, options);
    if (trueValue.includes(val)) return true;
    if (falseValue.includes(val)) return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` + `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
module.exports.getBooleanInput = $7065d6cfc1ba453b$var$getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $7065d6cfc1ba453b$var$setOutput(name, value) {
    process.stdout.write($7065d6cfc1ba453b$var$os.EOL);
    $tn2E1.issueCommand("set-output", {
        name: name
    }, value);
}
module.exports.setOutput = $7065d6cfc1ba453b$var$setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */ function $7065d6cfc1ba453b$var$setCommandEcho(enabled) {
    $tn2E1.issue("echo", enabled ? "on" : "off");
}
module.exports.setCommandEcho = $7065d6cfc1ba453b$var$setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */ function $7065d6cfc1ba453b$var$setFailed(message) {
    process.exitCode = $7065d6cfc1ba453b$var$ExitCode.Failure;
    $7065d6cfc1ba453b$var$error(message);
}
module.exports.setFailed = $7065d6cfc1ba453b$var$setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */ function $7065d6cfc1ba453b$var$isDebug() {
    return process.env["RUNNER_DEBUG"] === "1";
}
module.exports.isDebug = $7065d6cfc1ba453b$var$isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */ function $7065d6cfc1ba453b$var$debug(message) {
    $tn2E1.issueCommand("debug", {}, message);
}
module.exports.debug = $7065d6cfc1ba453b$var$debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */ function $7065d6cfc1ba453b$var$error(message, properties = {}) {
    $tn2E1.issueCommand("error", $efWJf.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
module.exports.error = $7065d6cfc1ba453b$var$error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */ function $7065d6cfc1ba453b$var$warning(message, properties = {}) {
    $tn2E1.issueCommand("warning", $efWJf.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
module.exports.warning = $7065d6cfc1ba453b$var$warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */ function $7065d6cfc1ba453b$var$notice(message, properties = {}) {
    $tn2E1.issueCommand("notice", $efWJf.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
module.exports.notice = $7065d6cfc1ba453b$var$notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */ function $7065d6cfc1ba453b$var$info(message) {
    process.stdout.write(message + $7065d6cfc1ba453b$var$os.EOL);
}
module.exports.info = $7065d6cfc1ba453b$var$info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */ function $7065d6cfc1ba453b$var$startGroup(name) {
    $tn2E1.issue("group", name);
}
module.exports.startGroup = $7065d6cfc1ba453b$var$startGroup;
/**
 * End an output group.
 */ function $7065d6cfc1ba453b$var$endGroup() {
    $tn2E1.issue("endgroup");
}
module.exports.endGroup = $7065d6cfc1ba453b$var$endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */ function $7065d6cfc1ba453b$var$group(name, fn) {
    return $7065d6cfc1ba453b$var$__awaiter(this, void 0, void 0, function*() {
        $7065d6cfc1ba453b$var$startGroup(name);
        let result;
        try {
            result = yield fn();
        } finally{
            $7065d6cfc1ba453b$var$endGroup();
        }
        return result;
    });
}
module.exports.group = $7065d6cfc1ba453b$var$group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $7065d6cfc1ba453b$var$saveState(name, value) {
    $tn2E1.issueCommand("save-state", {
        name: name
    }, value);
}
module.exports.saveState = $7065d6cfc1ba453b$var$saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */ function $7065d6cfc1ba453b$var$getState(name) {
    return process.env[`STATE_${name}`] || "";
}
module.exports.getState = $7065d6cfc1ba453b$var$getState;
function $7065d6cfc1ba453b$var$getIDToken(aud) {
    return $7065d6cfc1ba453b$var$__awaiter(this, void 0, void 0, function*() {
        return yield $5lJ9b.OidcClient.getIDToken(aud);
    });
}
module.exports.getIDToken = $7065d6cfc1ba453b$var$getIDToken;

var $7prty = parcelRequire("7prty");
Object.defineProperty(module.exports, "summary", {
    enumerable: true,
    get: function() {
        return $7prty.summary;
    }
});

var $7prty = parcelRequire("7prty");
Object.defineProperty(module.exports, "markdownSummary", {
    enumerable: true,
    get: function() {
        return $7prty.markdownSummary;
    }
});

var $3gazV = parcelRequire("3gazV");
Object.defineProperty(module.exports, "toPosixPath", {
    enumerable: true,
    get: function() {
        return $3gazV.toPosixPath;
    }
});
Object.defineProperty(module.exports, "toWin32Path", {
    enumerable: true,
    get: function() {
        return $3gazV.toWin32Path;
    }
});
Object.defineProperty(module.exports, "toPlatformPath", {
    enumerable: true,
    get: function() {
        return $3gazV.toPlatformPath;
    }
});

});
parcelRequire.register("tn2E1", function(module, exports) {
"use strict";
var $0584952409258443$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $0584952409258443$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $0584952409258443$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $0584952409258443$var$__createBinding(result, mod, k);
    }
    $0584952409258443$var$__setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.issue = module.exports.issueCommand = void 0;

const $0584952409258443$var$os = $0584952409258443$var$__importStar($dQzAa$os);

var $efWJf = parcelRequire("efWJf");
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */ function $0584952409258443$var$issueCommand(command, properties, message) {
    const cmd = new $0584952409258443$var$Command(command, properties, message);
    process.stdout.write(cmd.toString() + $0584952409258443$var$os.EOL);
}
module.exports.issueCommand = $0584952409258443$var$issueCommand;
function $0584952409258443$var$issue(name, message = "") {
    $0584952409258443$var$issueCommand(name, {}, message);
}
module.exports.issue = $0584952409258443$var$issue;
const $0584952409258443$var$CMD_STRING = "::";
class $0584952409258443$var$Command {
    constructor(command, properties, message){
        if (!command) command = "missing.command";
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = $0584952409258443$var$CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += " ";
            let first = true;
            for(const key in this.properties)if (this.properties.hasOwnProperty(key)) {
                const val = this.properties[key];
                if (val) {
                    if (first) first = false;
                    else cmdStr += ",";
                    cmdStr += `${key}=${$0584952409258443$var$escapeProperty(val)}`;
                }
            }
        }
        cmdStr += `${$0584952409258443$var$CMD_STRING}${$0584952409258443$var$escapeData(this.message)}`;
        return cmdStr;
    }
}
function $0584952409258443$var$escapeData(s) {
    return $efWJf.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function $0584952409258443$var$escapeProperty(s) {
    return $efWJf.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
}

});
parcelRequire.register("efWJf", function(module, exports) {
"use strict";
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */ Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.toCommandProperties = module.exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */ function $a61005b96e944286$var$toCommandValue(input) {
    if (input === null || input === undefined) return "";
    else if (typeof input === "string" || input instanceof String) return input;
    return JSON.stringify(input);
}
module.exports.toCommandValue = $a61005b96e944286$var$toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */ function $a61005b96e944286$var$toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) return {};
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
module.exports.toCommandProperties = $a61005b96e944286$var$toCommandProperties;

});


parcelRequire.register("eEkRA", function(module, exports) {
"use strict";
// For internal use, subject to change.
var $aaa4fc1ff78fff9c$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $aaa4fc1ff78fff9c$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $aaa4fc1ff78fff9c$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $aaa4fc1ff78fff9c$var$__createBinding(result, mod, k);
    }
    $aaa4fc1ff78fff9c$var$__setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.issueCommand = void 0;

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */ const $aaa4fc1ff78fff9c$var$fs = $aaa4fc1ff78fff9c$var$__importStar($dQzAa$fs);

const $aaa4fc1ff78fff9c$var$os = $aaa4fc1ff78fff9c$var$__importStar($dQzAa$os);

var $efWJf = parcelRequire("efWJf");
function $aaa4fc1ff78fff9c$var$issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) throw new Error(`Unable to find environment variable for file command ${command}`);
    if (!$aaa4fc1ff78fff9c$var$fs.existsSync(filePath)) throw new Error(`Missing file at path: ${filePath}`);
    $aaa4fc1ff78fff9c$var$fs.appendFileSync(filePath, `${$efWJf.toCommandValue(message)}${$aaa4fc1ff78fff9c$var$os.EOL}`, {
        encoding: "utf8"
    });
}
module.exports.issueCommand = $aaa4fc1ff78fff9c$var$issueCommand;

});

parcelRequire.register("29x7E", function(module, exports) {

$parcel$export(module.exports, "v4", () => (parcelRequire("a9rtJ")).default);



var $a9rtJ = parcelRequire("a9rtJ");







});
parcelRequire.register("a9rtJ", function(module, exports) {

$parcel$export(module.exports, "default", () => $76400f4fe6ea5a21$export$2e2bcd8739ae039);

var $4jKkz = parcelRequire("4jKkz");

var $7NW5m = parcelRequire("7NW5m");
function $76400f4fe6ea5a21$var$v4(options, buf, offset) {
    options = options || {};
    const rnds = options.random || (options.rng || (0, $4jKkz.default))(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(let i = 0; i < 16; ++i)buf[offset + i] = rnds[i];
        return buf;
    }
    return (0, $7NW5m.default)(rnds);
}
var $76400f4fe6ea5a21$export$2e2bcd8739ae039 = $76400f4fe6ea5a21$var$v4;

});
parcelRequire.register("4jKkz", function(module, exports) {

$parcel$export(module.exports, "default", () => $324ce016a03d2aed$export$2e2bcd8739ae039);

const $324ce016a03d2aed$var$rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
let $324ce016a03d2aed$var$poolPtr = $324ce016a03d2aed$var$rnds8Pool.length;
function $324ce016a03d2aed$export$2e2bcd8739ae039() {
    if ($324ce016a03d2aed$var$poolPtr > $324ce016a03d2aed$var$rnds8Pool.length - 16) {
        (0, ($parcel$interopDefault($dQzAa$crypto))).randomFillSync($324ce016a03d2aed$var$rnds8Pool);
        $324ce016a03d2aed$var$poolPtr = 0;
    }
    return $324ce016a03d2aed$var$rnds8Pool.slice($324ce016a03d2aed$var$poolPtr, $324ce016a03d2aed$var$poolPtr += 16);
}

});

parcelRequire.register("7NW5m", function(module, exports) {

$parcel$export(module.exports, "default", () => $5aea2a97fa11a543$export$2e2bcd8739ae039);

var $dehNX = parcelRequire("dehNX");
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ const $5aea2a97fa11a543$var$byteToHex = [];
for(let i = 0; i < 256; ++i)$5aea2a97fa11a543$var$byteToHex.push((i + 0x100).toString(16).substr(1));
function $5aea2a97fa11a543$var$stringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    const uuid = ($5aea2a97fa11a543$var$byteToHex[arr[offset + 0]] + $5aea2a97fa11a543$var$byteToHex[arr[offset + 1]] + $5aea2a97fa11a543$var$byteToHex[arr[offset + 2]] + $5aea2a97fa11a543$var$byteToHex[arr[offset + 3]] + "-" + $5aea2a97fa11a543$var$byteToHex[arr[offset + 4]] + $5aea2a97fa11a543$var$byteToHex[arr[offset + 5]] + "-" + $5aea2a97fa11a543$var$byteToHex[arr[offset + 6]] + $5aea2a97fa11a543$var$byteToHex[arr[offset + 7]] + "-" + $5aea2a97fa11a543$var$byteToHex[arr[offset + 8]] + $5aea2a97fa11a543$var$byteToHex[arr[offset + 9]] + "-" + $5aea2a97fa11a543$var$byteToHex[arr[offset + 10]] + $5aea2a97fa11a543$var$byteToHex[arr[offset + 11]] + $5aea2a97fa11a543$var$byteToHex[arr[offset + 12]] + $5aea2a97fa11a543$var$byteToHex[arr[offset + 13]] + $5aea2a97fa11a543$var$byteToHex[arr[offset + 14]] + $5aea2a97fa11a543$var$byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!(0, $dehNX.default)(uuid)) throw TypeError("Stringified UUID is invalid");
    return uuid;
}
var $5aea2a97fa11a543$export$2e2bcd8739ae039 = $5aea2a97fa11a543$var$stringify;

});
parcelRequire.register("dehNX", function(module, exports) {

$parcel$export(module.exports, "default", () => $9a1a64cdac8934fd$export$2e2bcd8739ae039);

var $eyCAj = parcelRequire("eyCAj");
function $9a1a64cdac8934fd$var$validate(uuid) {
    return typeof uuid === "string" && (0, $eyCAj.default).test(uuid);
}
var $9a1a64cdac8934fd$export$2e2bcd8739ae039 = $9a1a64cdac8934fd$var$validate;

});
parcelRequire.register("eyCAj", function(module, exports) {

$parcel$export(module.exports, "default", () => $a9922bc44aff8856$export$2e2bcd8739ae039);
var $a9922bc44aff8856$export$2e2bcd8739ae039 = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

});





parcelRequire.register("5lJ9b", function(module, exports) {
"use strict";
var $3e51ef3300576fb8$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.OidcClient = void 0;

var $c0Wlj = parcelRequire("c0Wlj");

var $lV76L = parcelRequire("lV76L");

var $9Ei2d = parcelRequire("9Ei2d");
class $3e51ef3300576fb8$var$OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new $c0Wlj.HttpClient("actions/oidc-client", [
            new $lV76L.BearerCredentialHandler($3e51ef3300576fb8$var$OidcClient.getRequestToken())
        ], requestOptions);
    }
    static getRequestToken() {
        const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
        if (!token) throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
        if (!runtimeUrl) throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return $3e51ef3300576fb8$var$__awaiter(this, void 0, void 0, function*() {
            const httpclient = $3e51ef3300576fb8$var$OidcClient.createHttpClient();
            const res = yield httpclient.getJson(id_token_url).catch((error)=>{
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) throw new Error("Response json body do not have ID Token field");
            return id_token;
        });
    }
    static getIDToken(audience) {
        return $3e51ef3300576fb8$var$__awaiter(this, void 0, void 0, function*() {
            try {
                // New ID Token is requested from action service
                let id_token_url = $3e51ef3300576fb8$var$OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                $9Ei2d.debug(`ID token url is ${id_token_url}`);
                const id_token = yield $3e51ef3300576fb8$var$OidcClient.getCall(id_token_url);
                $9Ei2d.setSecret(id_token);
                return id_token;
            } catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
module.exports.OidcClient = $3e51ef3300576fb8$var$OidcClient;

});
parcelRequire.register("c0Wlj", function(module, exports) {
"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */ var $8bf2bdc967275f3f$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $8bf2bdc967275f3f$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $8bf2bdc967275f3f$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $8bf2bdc967275f3f$var$__createBinding(result, mod, k);
    }
    $8bf2bdc967275f3f$var$__setModuleDefault(result, mod);
    return result;
};
var $8bf2bdc967275f3f$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.HttpClient = module.exports.isHttps = module.exports.HttpClientResponse = module.exports.HttpClientError = module.exports.getProxyUrl = module.exports.MediaTypes = module.exports.Headers = module.exports.HttpCodes = void 0;

const $8bf2bdc967275f3f$var$http = $8bf2bdc967275f3f$var$__importStar($dQzAa$http);

const $8bf2bdc967275f3f$var$https = $8bf2bdc967275f3f$var$__importStar($dQzAa$https);

const $8bf2bdc967275f3f$var$pm = $8bf2bdc967275f3f$var$__importStar((parcelRequire("BNk1O")));

const $8bf2bdc967275f3f$var$tunnel = $8bf2bdc967275f3f$var$__importStar((parcelRequire("djfQq")));
var $8bf2bdc967275f3f$var$HttpCodes;
(function(HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})($8bf2bdc967275f3f$var$HttpCodes = module.exports.HttpCodes || (module.exports.HttpCodes = {}));
var $8bf2bdc967275f3f$var$Headers;
(function(Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})($8bf2bdc967275f3f$var$Headers = module.exports.Headers || (module.exports.Headers = {}));
var $8bf2bdc967275f3f$var$MediaTypes;
(function(MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})($8bf2bdc967275f3f$var$MediaTypes = module.exports.MediaTypes || (module.exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */ function $8bf2bdc967275f3f$var$getProxyUrl(serverUrl) {
    const proxyUrl = $8bf2bdc967275f3f$var$pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : "";
}
module.exports.getProxyUrl = $8bf2bdc967275f3f$var$getProxyUrl;
const $8bf2bdc967275f3f$var$HttpRedirectCodes = [
    $8bf2bdc967275f3f$var$HttpCodes.MovedPermanently,
    $8bf2bdc967275f3f$var$HttpCodes.ResourceMoved,
    $8bf2bdc967275f3f$var$HttpCodes.SeeOther,
    $8bf2bdc967275f3f$var$HttpCodes.TemporaryRedirect,
    $8bf2bdc967275f3f$var$HttpCodes.PermanentRedirect
];
const $8bf2bdc967275f3f$var$HttpResponseRetryCodes = [
    $8bf2bdc967275f3f$var$HttpCodes.BadGateway,
    $8bf2bdc967275f3f$var$HttpCodes.ServiceUnavailable,
    $8bf2bdc967275f3f$var$HttpCodes.GatewayTimeout
];
const $8bf2bdc967275f3f$var$RetryableHttpVerbs = [
    "OPTIONS",
    "GET",
    "DELETE",
    "HEAD"
];
const $8bf2bdc967275f3f$var$ExponentialBackoffCeiling = 10;
const $8bf2bdc967275f3f$var$ExponentialBackoffTimeSlice = 5;
class $8bf2bdc967275f3f$var$HttpClientError extends Error {
    constructor(message, statusCode){
        super(message);
        this.name = "HttpClientError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, $8bf2bdc967275f3f$var$HttpClientError.prototype);
    }
}
module.exports.HttpClientError = $8bf2bdc967275f3f$var$HttpClientError;
class $8bf2bdc967275f3f$var$HttpClientResponse {
    constructor(message){
        this.message = message;
    }
    readBody() {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            return new Promise((resolve)=>$8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
                    let output = Buffer.alloc(0);
                    this.message.on("data", (chunk)=>{
                        output = Buffer.concat([
                            output,
                            chunk
                        ]);
                    });
                    this.message.on("end", ()=>{
                        resolve(output.toString());
                    });
                }));
        });
    }
}
module.exports.HttpClientResponse = $8bf2bdc967275f3f$var$HttpClientResponse;
function $8bf2bdc967275f3f$var$isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === "https:";
}
module.exports.isHttps = $8bf2bdc967275f3f$var$isHttps;
class $8bf2bdc967275f3f$var$HttpClient {
    constructor(userAgent, handlers, requestOptions){
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) this._ignoreSslError = requestOptions.ignoreSslError;
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) this._allowRedirects = requestOptions.allowRedirects;
            if (requestOptions.allowRedirectDowngrade != null) this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            if (requestOptions.maxRedirects != null) this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            if (requestOptions.keepAlive != null) this._keepAlive = requestOptions.keepAlive;
            if (requestOptions.allowRetries != null) this._allowRetries = requestOptions.allowRetries;
            if (requestOptions.maxRetries != null) this._maxRetries = requestOptions.maxRetries;
        }
    }
    options(requestUrl, additionalHeaders) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
        });
    }
    get(requestUrl, additionalHeaders) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            return this.request("GET", requestUrl, null, additionalHeaders || {});
        });
    }
    del(requestUrl, additionalHeaders) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            return this.request("DELETE", requestUrl, null, additionalHeaders || {});
        });
    }
    post(requestUrl, data, additionalHeaders) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            return this.request("POST", requestUrl, data, additionalHeaders || {});
        });
    }
    patch(requestUrl, data, additionalHeaders) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            return this.request("PATCH", requestUrl, data, additionalHeaders || {});
        });
    }
    put(requestUrl, data, additionalHeaders) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            return this.request("PUT", requestUrl, data, additionalHeaders || {});
        });
    }
    head(requestUrl, additionalHeaders) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            return this.request("HEAD", requestUrl, null, additionalHeaders || {});
        });
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            return this.request(verb, requestUrl, stream, additionalHeaders);
        });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */ getJson(requestUrl, additionalHeaders = {}) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            additionalHeaders[$8bf2bdc967275f3f$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $8bf2bdc967275f3f$var$Headers.Accept, $8bf2bdc967275f3f$var$MediaTypes.ApplicationJson);
            const res = yield this.get(requestUrl, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    postJson(requestUrl, obj, additionalHeaders = {}) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[$8bf2bdc967275f3f$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $8bf2bdc967275f3f$var$Headers.Accept, $8bf2bdc967275f3f$var$MediaTypes.ApplicationJson);
            additionalHeaders[$8bf2bdc967275f3f$var$Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, $8bf2bdc967275f3f$var$Headers.ContentType, $8bf2bdc967275f3f$var$MediaTypes.ApplicationJson);
            const res = yield this.post(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    putJson(requestUrl, obj, additionalHeaders = {}) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[$8bf2bdc967275f3f$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $8bf2bdc967275f3f$var$Headers.Accept, $8bf2bdc967275f3f$var$MediaTypes.ApplicationJson);
            additionalHeaders[$8bf2bdc967275f3f$var$Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, $8bf2bdc967275f3f$var$Headers.ContentType, $8bf2bdc967275f3f$var$MediaTypes.ApplicationJson);
            const res = yield this.put(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    patchJson(requestUrl, obj, additionalHeaders = {}) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[$8bf2bdc967275f3f$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $8bf2bdc967275f3f$var$Headers.Accept, $8bf2bdc967275f3f$var$MediaTypes.ApplicationJson);
            additionalHeaders[$8bf2bdc967275f3f$var$Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, $8bf2bdc967275f3f$var$Headers.ContentType, $8bf2bdc967275f3f$var$MediaTypes.ApplicationJson);
            const res = yield this.patch(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */ request(verb, requestUrl, data, headers) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            if (this._disposed) throw new Error("Client has already been disposed.");
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries = this._allowRetries && $8bf2bdc967275f3f$var$RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
            let numTries = 0;
            let response;
            do {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response && response.message && response.message.statusCode === $8bf2bdc967275f3f$var$HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (const handler of this.handlers)if (handler.canHandleAuthentication(response)) {
                        authenticationHandler = handler;
                        break;
                    }
                    if (authenticationHandler) return authenticationHandler.handleAuthentication(this, info, data);
                    else // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
                let redirectsRemaining = this._maxRedirects;
                while(response.message.statusCode && $8bf2bdc967275f3f$var$HttpRedirectCodes.includes(response.message.statusCode) && this._allowRedirects && redirectsRemaining > 0){
                    const redirectUrl = response.message.headers["location"];
                    if (!redirectUrl) break;
                    const parsedRedirectUrl = new URL(redirectUrl);
                    if (parsedUrl.protocol === "https:" && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // strip authorization header if redirected to a different hostname
                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                        for(const header in headers)// header names are case insensitive
                        if (header.toLowerCase() === "authorization") delete headers[header];
                    }
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (!response.message.statusCode || !$8bf2bdc967275f3f$var$HttpResponseRetryCodes.includes(response.message.statusCode)) // If not a retry code, return immediately instead of retrying
                return response;
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            }while (numTries < maxTries);
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */ dispose() {
        if (this._agent) this._agent.destroy();
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */ requestRaw(info, data) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            return new Promise((resolve, reject)=>{
                function callbackForResult(err, res) {
                    if (err) reject(err);
                    else if (!res) // If `err` is not passed, then `res` must be passed.
                    reject(new Error("Unknown error"));
                    else resolve(res);
                }
                this.requestRawWithCallback(info, data, callbackForResult);
            });
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */ requestRawWithCallback(info, data, onResult) {
        if (typeof data === "string") {
            if (!info.options.headers) info.options.headers = {};
            info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
        }
        let callbackCalled = false;
        function handleResult(err, res) {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        }
        const req = info.httpModule.request(info.options, (msg)=>{
            const res = new $8bf2bdc967275f3f$var$HttpClientResponse(msg);
            handleResult(undefined, res);
        });
        let socket;
        req.on("socket", (sock)=>{
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 180000, ()=>{
            if (socket) socket.end();
            handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on("error", function(err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
        });
        if (data && typeof data === "string") req.write(data, "utf8");
        if (data && typeof data !== "string") {
            data.on("close", function() {
                req.end();
            });
            data.pipe(req);
        } else req.end();
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */ getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === "https:";
        info.httpModule = usingSsl ? $8bf2bdc967275f3f$var$https : $8bf2bdc967275f3f$var$http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) info.options.headers["user-agent"] = this.userAgent;
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) for (const handler of this.handlers)handler.prepareRequest(info.options);
        return info;
    }
    _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) return Object.assign({}, $8bf2bdc967275f3f$var$lowercaseKeys(this.requestOptions.headers), $8bf2bdc967275f3f$var$lowercaseKeys(headers || {}));
        return $8bf2bdc967275f3f$var$lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) clientHeader = $8bf2bdc967275f3f$var$lowercaseKeys(this.requestOptions.headers)[header];
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = $8bf2bdc967275f3f$var$pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) agent = this._proxyAgent;
        if (this._keepAlive && !useProxy) agent = this._agent;
        // if agent is already assigned use that agent.
        if (agent) return agent;
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (this.requestOptions) maxSockets = this.requestOptions.maxSockets || $8bf2bdc967275f3f$var$http.globalAgent.maxSockets;
        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
        if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                }), {
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                })
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === "https:";
            if (usingSsl) tunnelAgent = overHttps ? $8bf2bdc967275f3f$var$tunnel.httpsOverHttps : $8bf2bdc967275f3f$var$tunnel.httpsOverHttp;
            else tunnelAgent = overHttps ? $8bf2bdc967275f3f$var$tunnel.httpOverHttps : $8bf2bdc967275f3f$var$tunnel.httpOverHttp;
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = {
                keepAlive: this._keepAlive,
                maxSockets: maxSockets
            };
            agent = usingSsl ? new $8bf2bdc967275f3f$var$https.Agent(options) : new $8bf2bdc967275f3f$var$http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) agent = usingSsl ? $8bf2bdc967275f3f$var$https.globalAgent : $8bf2bdc967275f3f$var$http.globalAgent;
        if (usingSsl && this._ignoreSslError) // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
        // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
        // we have to cast it to any and change it directly
        agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
        });
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            retryNumber = Math.min($8bf2bdc967275f3f$var$ExponentialBackoffCeiling, retryNumber);
            const ms = $8bf2bdc967275f3f$var$ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
            return new Promise((resolve)=>setTimeout(()=>resolve(), ms));
        });
    }
    _processResponse(res, options) {
        return $8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
            return new Promise((resolve, reject)=>$8bf2bdc967275f3f$var$__awaiter(this, void 0, void 0, function*() {
                    const statusCode = res.message.statusCode || 0;
                    const response = {
                        statusCode: statusCode,
                        result: null,
                        headers: {}
                    };
                    // not found leads to null obj returned
                    if (statusCode === $8bf2bdc967275f3f$var$HttpCodes.NotFound) resolve(response);
                    // get the result from the body
                    function dateTimeDeserializer(key, value) {
                        if (typeof value === "string") {
                            const a = new Date(value);
                            if (!isNaN(a.valueOf())) return a;
                        }
                        return value;
                    }
                    let obj;
                    let contents;
                    try {
                        contents = yield res.readBody();
                        if (contents && contents.length > 0) {
                            if (options && options.deserializeDates) obj = JSON.parse(contents, dateTimeDeserializer);
                            else obj = JSON.parse(contents);
                            response.result = obj;
                        }
                        response.headers = res.message.headers;
                    } catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                    }
                    // note that 3xx redirects are handled by the http layer.
                    if (statusCode > 299) {
                        let msg;
                        // if exception/error in body, attempt to get better error
                        if (obj && obj.message) msg = obj.message;
                        else if (contents && contents.length > 0) // it may be the case that the exception is in the body message as string
                        msg = contents;
                        else msg = `Failed request: (${statusCode})`;
                        const err1 = new $8bf2bdc967275f3f$var$HttpClientError(msg, statusCode);
                        err1.result = response.result;
                        reject(err1);
                    } else resolve(response);
                }));
        });
    }
}
module.exports.HttpClient = $8bf2bdc967275f3f$var$HttpClient;
const $8bf2bdc967275f3f$var$lowercaseKeys = (obj)=>Object.keys(obj).reduce((c, k)=>(c[k.toLowerCase()] = obj[k], c), {});

});
parcelRequire.register("BNk1O", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.checkBypass = module.exports.getProxyUrl = void 0;
function $0719b72534dccbc4$var$getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === "https:";
    if ($0719b72534dccbc4$var$checkBypass(reqUrl)) return undefined;
    const proxyVar = (()=>{
        if (usingSsl) return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
        else return process.env["http_proxy"] || process.env["HTTP_PROXY"];
    })();
    if (proxyVar) return new URL(proxyVar);
    else return undefined;
}
module.exports.getProxyUrl = $0719b72534dccbc4$var$getProxyUrl;
function $0719b72534dccbc4$var$checkBypass(reqUrl) {
    if (!reqUrl.hostname) return false;
    const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
    if (!noProxy) return false;
    // Determine the request port
    let reqPort;
    if (reqUrl.port) reqPort = Number(reqUrl.port);
    else if (reqUrl.protocol === "http:") reqPort = 80;
    else if (reqUrl.protocol === "https:") reqPort = 443;
    // Format the request hostname and hostname with port
    const upperReqHosts = [
        reqUrl.hostname.toUpperCase()
    ];
    if (typeof reqPort === "number") upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy.split(",").map((x)=>x.trim().toUpperCase()).filter((x)=>x)){
        if (upperReqHosts.some((x)=>x === upperNoProxyItem)) return true;
    }
    return false;
}
module.exports.checkBypass = $0719b72534dccbc4$var$checkBypass;

});

parcelRequire.register("djfQq", function(module, exports) {

module.exports = (parcelRequire("jkqqg"));

});
parcelRequire.register("jkqqg", function(module, exports) {

$parcel$export(module.exports, "httpOverHttp", () => $e124618d61c4a678$export$25cbd437c61a3835, (v) => $e124618d61c4a678$export$25cbd437c61a3835 = v);
$parcel$export(module.exports, "httpsOverHttp", () => $e124618d61c4a678$export$c06e3df7111bae43, (v) => $e124618d61c4a678$export$c06e3df7111bae43 = v);
$parcel$export(module.exports, "httpOverHttps", () => $e124618d61c4a678$export$5d50e36ef656139f, (v) => $e124618d61c4a678$export$5d50e36ef656139f = v);
$parcel$export(module.exports, "httpsOverHttps", () => $e124618d61c4a678$export$212d6605025321cc, (v) => $e124618d61c4a678$export$212d6605025321cc = v);
$parcel$export(module.exports, "debug", () => $e124618d61c4a678$export$1c9f709888824e05, (v) => $e124618d61c4a678$export$1c9f709888824e05 = v);
var $e124618d61c4a678$export$25cbd437c61a3835;
var $e124618d61c4a678$export$c06e3df7111bae43;
var $e124618d61c4a678$export$5d50e36ef656139f;
var $e124618d61c4a678$export$212d6605025321cc;
var $e124618d61c4a678$export$1c9f709888824e05;
"use strict";







$e124618d61c4a678$export$25cbd437c61a3835 = $e124618d61c4a678$var$httpOverHttp;
$e124618d61c4a678$export$c06e3df7111bae43 = $e124618d61c4a678$var$httpsOverHttp;
$e124618d61c4a678$export$5d50e36ef656139f = $e124618d61c4a678$var$httpOverHttps;
$e124618d61c4a678$export$212d6605025321cc = $e124618d61c4a678$var$httpsOverHttps;
function $e124618d61c4a678$var$httpOverHttp(options) {
    var agent = new $e124618d61c4a678$var$TunnelingAgent(options);
    agent.request = $dQzAa$http.request;
    return agent;
}
function $e124618d61c4a678$var$httpsOverHttp(options) {
    var agent = new $e124618d61c4a678$var$TunnelingAgent(options);
    agent.request = $dQzAa$http.request;
    agent.createSocket = $e124618d61c4a678$var$createSecureSocket;
    agent.defaultPort = 443;
    return agent;
}
function $e124618d61c4a678$var$httpOverHttps(options) {
    var agent = new $e124618d61c4a678$var$TunnelingAgent(options);
    agent.request = $dQzAa$https.request;
    return agent;
}
function $e124618d61c4a678$var$httpsOverHttps(options) {
    var agent = new $e124618d61c4a678$var$TunnelingAgent(options);
    agent.request = $dQzAa$https.request;
    agent.createSocket = $e124618d61c4a678$var$createSecureSocket;
    agent.defaultPort = 443;
    return agent;
}
function $e124618d61c4a678$var$TunnelingAgent(options) {
    var self = this;
    self.options = options || {};
    self.proxyOptions = self.options.proxy || {};
    self.maxSockets = self.options.maxSockets || $dQzAa$http.Agent.defaultMaxSockets;
    self.requests = [];
    self.sockets = [];
    self.on("free", function onFree(socket, host, port, localAddress) {
        var options = $e124618d61c4a678$var$toOptions(host, port, localAddress);
        for(var i = 0, len = self.requests.length; i < len; ++i){
            var pending = self.requests[i];
            if (pending.host === options.host && pending.port === options.port) {
                // Detect the request to connect same origin server,
                // reuse the connection.
                self.requests.splice(i, 1);
                pending.request.onSocket(socket);
                return;
            }
        }
        socket.destroy();
        self.removeSocket(socket);
    });
}
$dQzAa$util.inherits($e124618d61c4a678$var$TunnelingAgent, $dQzAa$events.EventEmitter);
$e124618d61c4a678$var$TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
    var self = this;
    var options = $e124618d61c4a678$var$mergeOptions({
        request: req
    }, self.options, $e124618d61c4a678$var$toOptions(host, port, localAddress));
    if (self.sockets.length >= this.maxSockets) {
        // We are over limit so we'll add it to the queue.
        self.requests.push(options);
        return;
    }
    // If we are under maxSockets create a new one.
    self.createSocket(options, function(socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
            self.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
            self.removeSocket(socket);
            socket.removeListener("free", onFree);
            socket.removeListener("close", onCloseOrRemove);
            socket.removeListener("agentRemove", onCloseOrRemove);
        }
    });
};
$e124618d61c4a678$var$TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
    var self = this;
    var placeholder = {};
    self.sockets.push(placeholder);
    var connectOptions = $e124618d61c4a678$var$mergeOptions({}, self.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
            host: options.host + ":" + options.port
        }
    });
    if (options.localAddress) connectOptions.localAddress = options.localAddress;
    if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
    }
    $e124618d61c4a678$var$debug("making CONNECT request");
    var connectReq = self.request(connectOptions);
    connectReq.useChunkedEncodingByDefault = false; // for v0.6
    connectReq.once("response", onResponse); // for v0.6
    connectReq.once("upgrade", onUpgrade); // for v0.6
    connectReq.once("connect", onConnect); // for v0.7 or later
    connectReq.once("error", onError);
    connectReq.end();
    function onResponse(res) {
        // Very hacky. This is necessary to avoid http-parser leaks.
        res.upgrade = true;
    }
    function onUpgrade(res, socket, head) {
        // Hacky.
        process.nextTick(function() {
            onConnect(res, socket, head);
        });
    }
    function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
            $e124618d61c4a678$var$debug("tunneling socket could not be established, statusCode=%d", res.statusCode);
            socket.destroy();
            var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
            error.code = "ECONNRESET";
            options.request.emit("error", error);
            self.removeSocket(placeholder);
            return;
        }
        if (head.length > 0) {
            $e124618d61c4a678$var$debug("got illegal response body from proxy");
            socket.destroy();
            var error = new Error("got illegal response body from proxy");
            error.code = "ECONNRESET";
            options.request.emit("error", error);
            self.removeSocket(placeholder);
            return;
        }
        $e124618d61c4a678$var$debug("tunneling connection has established");
        self.sockets[self.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
    }
    function onError(cause) {
        connectReq.removeAllListeners();
        $e124618d61c4a678$var$debug("tunneling socket could not be established, cause=%s\n", cause.message, cause.stack);
        var error = new Error("tunneling socket could not be established, cause=" + cause.message);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self.removeSocket(placeholder);
    }
};
$e124618d61c4a678$var$TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
    var pos = this.sockets.indexOf(socket);
    if (pos === -1) return;
    this.sockets.splice(pos, 1);
    var pending = this.requests.shift();
    if (pending) // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
        pending.request.onSocket(socket);
    });
};
function $e124618d61c4a678$var$createSecureSocket(options, cb) {
    var self = this;
    $e124618d61c4a678$var$TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
        var hostHeader = options.request.getHeader("host");
        var tlsOptions = $e124618d61c4a678$var$mergeOptions({}, self.options, {
            socket: socket,
            servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
        });
        // 0 is dummy port for v0.6
        var secureSocket = $dQzAa$tls.connect(0, tlsOptions);
        self.sockets[self.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
    });
}
function $e124618d61c4a678$var$toOptions(host, port, localAddress) {
    if (typeof host === "string") return {
        host: host,
        port: port,
        localAddress: localAddress
    };
    return host; // for v0.11 or later
}
function $e124618d61c4a678$var$mergeOptions(target) {
    for(var i = 1, len = arguments.length; i < len; ++i){
        var overrides = arguments[i];
        if (typeof overrides === "object") {
            var keys = Object.keys(overrides);
            for(var j = 0, keyLen = keys.length; j < keyLen; ++j){
                var k = keys[j];
                if (overrides[k] !== undefined) target[k] = overrides[k];
            }
        }
    }
    return target;
}
var $e124618d61c4a678$var$debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) $e124618d61c4a678$var$debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === "string") args[0] = "TUNNEL: " + args[0];
    else args.unshift("TUNNEL:");
    console.error.apply(console, args);
};
else $e124618d61c4a678$var$debug = function() {};
$e124618d61c4a678$export$1c9f709888824e05 = $e124618d61c4a678$var$debug; // for test

});



parcelRequire.register("lV76L", function(module, exports) {
"use strict";
var $ff546f5f1095b9ea$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.PersonalAccessTokenCredentialHandler = module.exports.BearerCredentialHandler = module.exports.BasicCredentialHandler = void 0;
class $ff546f5f1095b9ea$var$BasicCredentialHandler {
    constructor(username, password){
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) throw Error("The request has no headers");
        options.headers["Authorization"] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return $ff546f5f1095b9ea$var$__awaiter(this, void 0, void 0, function*() {
            throw new Error("not implemented");
        });
    }
}
module.exports.BasicCredentialHandler = $ff546f5f1095b9ea$var$BasicCredentialHandler;
class $ff546f5f1095b9ea$var$BearerCredentialHandler {
    constructor(token){
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) throw Error("The request has no headers");
        options.headers["Authorization"] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return $ff546f5f1095b9ea$var$__awaiter(this, void 0, void 0, function*() {
            throw new Error("not implemented");
        });
    }
}
module.exports.BearerCredentialHandler = $ff546f5f1095b9ea$var$BearerCredentialHandler;
class $ff546f5f1095b9ea$var$PersonalAccessTokenCredentialHandler {
    constructor(token){
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) throw Error("The request has no headers");
        options.headers["Authorization"] = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return $ff546f5f1095b9ea$var$__awaiter(this, void 0, void 0, function*() {
            throw new Error("not implemented");
        });
    }
}
module.exports.PersonalAccessTokenCredentialHandler = $ff546f5f1095b9ea$var$PersonalAccessTokenCredentialHandler;

});


parcelRequire.register("7prty", function(module, exports) {
"use strict";
var $56502e520acf57c2$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.summary = module.exports.markdownSummary = module.exports.SUMMARY_DOCS_URL = module.exports.SUMMARY_ENV_VAR = void 0;


const { access: $56502e520acf57c2$var$access , appendFile: $56502e520acf57c2$var$appendFile , writeFile: $56502e520acf57c2$var$writeFile  } = $dQzAa$fs.promises;
module.exports.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
module.exports.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
class $56502e520acf57c2$var$Summary {
    constructor(){
        this._buffer = "";
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */ filePath() {
        return $56502e520acf57c2$var$__awaiter(this, void 0, void 0, function*() {
            if (this._filePath) return this._filePath;
            const pathFromEnv = process.env[module.exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) throw new Error(`Unable to find environment variable for $${module.exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
            try {
                yield $56502e520acf57c2$var$access(pathFromEnv, $dQzAa$fs.constants.R_OK | $dQzAa$fs.constants.W_OK);
            } catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */ wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs).map(([key, value])=>` ${key}="${value}"`).join("");
        if (!content) return `<${tag}${htmlAttrs}>`;
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */ write(options) {
        return $56502e520acf57c2$var$__awaiter(this, void 0, void 0, function*() {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? $56502e520acf57c2$var$writeFile : $56502e520acf57c2$var$appendFile;
            yield writeFunc(filePath, this._buffer, {
                encoding: "utf8"
            });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */ clear() {
        return $56502e520acf57c2$var$__awaiter(this, void 0, void 0, function*() {
            return this.emptyBuffer().write({
                overwrite: true
            });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */ stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */ isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */ emptyBuffer() {
        this._buffer = "";
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */ addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */ addEOL() {
        return this.addRaw($dQzAa$os.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */ addCodeBlock(code, lang) {
        const attrs = Object.assign({}, lang && {
            lang: lang
        });
        const element = this.wrap("pre", this.wrap("code", code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */ addList(items, ordered = false) {
        const tag = ordered ? "ol" : "ul";
        const listItems = items.map((item)=>this.wrap("li", item)).join("");
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */ addTable(rows) {
        const tableBody = rows.map((row)=>{
            const cells = row.map((cell)=>{
                if (typeof cell === "string") return this.wrap("td", cell);
                const { header: header , data: data , colspan: colspan , rowspan: rowspan  } = cell;
                const tag = header ? "th" : "td";
                const attrs = Object.assign(Object.assign({}, colspan && {
                    colspan: colspan
                }), rowspan && {
                    rowspan: rowspan
                });
                return this.wrap(tag, data, attrs);
            }).join("");
            return this.wrap("tr", cells);
        }).join("");
        const element = this.wrap("table", tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */ addDetails(label, content) {
        const element = this.wrap("details", this.wrap("summary", label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */ addImage(src, alt, options) {
        const { width: width , height: height  } = options || {};
        const attrs = Object.assign(Object.assign({}, width && {
            width: width
        }), height && {
            height: height
        });
        const element = this.wrap("img", null, Object.assign({
            src: src,
            alt: alt
        }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */ addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6"
        ].includes(tag) ? tag : "h1";
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */ addSeparator() {
        const element = this.wrap("hr", null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */ addBreak() {
        const element = this.wrap("br", null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */ addQuote(text, cite) {
        const attrs = Object.assign({}, cite && {
            cite: cite
        });
        const element = this.wrap("blockquote", text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */ addLink(text, href) {
        const element = this.wrap("a", text, {
            href: href
        });
        return this.addRaw(element).addEOL();
    }
}
const $56502e520acf57c2$var$_summary = new $56502e520acf57c2$var$Summary();
/**
 * @deprecated use `core.summary`
 */ module.exports.markdownSummary = $56502e520acf57c2$var$_summary;
module.exports.summary = $56502e520acf57c2$var$_summary;

});

parcelRequire.register("3gazV", function(module, exports) {
"use strict";
var $25fb125a8369054c$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $25fb125a8369054c$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $25fb125a8369054c$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $25fb125a8369054c$var$__createBinding(result, mod, k);
    }
    $25fb125a8369054c$var$__setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.toPlatformPath = module.exports.toWin32Path = module.exports.toPosixPath = void 0;

const $25fb125a8369054c$var$path = $25fb125a8369054c$var$__importStar($dQzAa$path);
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */ function $25fb125a8369054c$var$toPosixPath(pth) {
    return pth.replace(/[\\]/g, "/");
}
module.exports.toPosixPath = $25fb125a8369054c$var$toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */ function $25fb125a8369054c$var$toWin32Path(pth) {
    return pth.replace(/[/]/g, "\\");
}
module.exports.toWin32Path = $25fb125a8369054c$var$toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */ function $25fb125a8369054c$var$toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, $25fb125a8369054c$var$path.sep);
}
module.exports.toPlatformPath = $25fb125a8369054c$var$toPlatformPath;

});


parcelRequire.register("7w88d", function(module, exports) {

$parcel$export(module.exports, "addExeExt", () => $64a9c8c639f900e4$export$2d20c564cade3c93);
$parcel$export(module.exports, "addShExt", () => $64a9c8c639f900e4$export$609be29b80b555e1);
$parcel$export(module.exports, "addShRelativePrefix", () => $64a9c8c639f900e4$export$e1f23f8d3e53fe6);
$parcel$export(module.exports, "dirname", () => $dQzAa$path.dirname);
$parcel$export(module.exports, "join", () => $dQzAa$path.join);


var $2Qyc5 = parcelRequire("2Qyc5");

var $4x0FW = parcelRequire("4x0FW");
function $64a9c8c639f900e4$var$e(e, a) {
    return Object.keys(a).forEach((r)=>{
        "default" === r || "__esModule" === r || e.hasOwnProperty(r) || Object.defineProperty(e, r, {
            enumerable: !0,
            get () {
                return a[r];
            }
        });
    }), e;
}
function $64a9c8c639f900e4$var$a(e, a, r, s) {
    Object.defineProperty(e, a, {
        get: r,
        set: s,
        enumerable: !0,
        configurable: !0
    });
}
function $64a9c8c639f900e4$export$a8ff84c12d48cfa6(e, a = !0) {
    return a ? (0, $dQzAa$path.basename)(e) : (0, $dQzAa$path.basename)(e, (0, $dQzAa$path.extname)(e));
}
function $64a9c8c639f900e4$export$873fead74fe2f1ff(e) {
    return (0, $dQzAa$path.normalize)(e).replace(RegExp((0, $2Qyc5.default)((0, $dQzAa$path.sep)) + "$"), "");
}
function $64a9c8c639f900e4$export$2d20c564cade3c93(e, a = ".exe", r = "") {
    return "win32" === process.platform ? `${e}${a}` : `${e}${r}`;
}
function $64a9c8c639f900e4$export$3e333f8cb13439c(e, a) {
    const r = (0, $dQzAa$path.extname)(e), s = `${a}${(0, $dQzAa$path.basename)(e, r)}${r}`;
    return (0, $dQzAa$path.join)((0, $dQzAa$path.dirname)(e), s);
}
function $64a9c8c639f900e4$export$3b60a3e9bd1aef9d(e, a) {
    const r = (0, $dQzAa$path.extname)(e), s = `${(0, $dQzAa$path.basename)(e, r)}${a}${r}`;
    return (0, $dQzAa$path.join)((0, $dQzAa$path.dirname)(e), s);
}
function $64a9c8c639f900e4$export$609be29b80b555e1(e, a = ".cmd", r = ".sh") {
    return "win32" === process.platform ? `${e}${a}` : `${e}${r}`;
}
function $64a9c8c639f900e4$export$e1f23f8d3e53fe6(e) {
    return "win32" === process.platform ? e : "./" + e;
}
function $64a9c8c639f900e4$export$19c5468f88f6e968(e) {
    const a = (0, $dQzAa$path.extname)(e).length;
    return e.slice(0, -a);
}
function $64a9c8c639f900e4$export$e9c34737ac8e53d2(e, a) {
    return (0, (/*@__PURE__*/$parcel$interopDefault($4x0FW)))(e, a);
}
function $64a9c8c639f900e4$export$7d0573375890d05c(e, a) {
    const r = (0, $dQzAa$path.relative)(a, e);
    return !(!r || ".." === r || r.startsWith(".." + (0, $dQzAa$path.sep)) || r === (0, $dQzAa$path.resolve)(e));
}
var $64a9c8c639f900e4$var$O = {}, $64a9c8c639f900e4$var$R = {};
$64a9c8c639f900e4$var$a($64a9c8c639f900e4$var$R, "name", ()=>$64a9c8c639f900e4$export$a8ff84c12d48cfa6);
var $64a9c8c639f900e4$var$A = {};
$64a9c8c639f900e4$var$a($64a9c8c639f900e4$var$A, "normalizeTrim", ()=>$64a9c8c639f900e4$export$873fead74fe2f1ff);
var $64a9c8c639f900e4$var$I = {};
$64a9c8c639f900e4$var$a($64a9c8c639f900e4$var$I, "addExeExt", ()=>$64a9c8c639f900e4$export$2d20c564cade3c93);
var $64a9c8c639f900e4$var$T = {};
$64a9c8c639f900e4$var$a($64a9c8c639f900e4$var$T, "addNamePrefix", ()=>$64a9c8c639f900e4$export$3e333f8cb13439c);
var $64a9c8c639f900e4$var$_ = {};
$64a9c8c639f900e4$var$a($64a9c8c639f900e4$var$_, "addNameSuffix", ()=>$64a9c8c639f900e4$export$3b60a3e9bd1aef9d);
var $64a9c8c639f900e4$var$k = {};
$64a9c8c639f900e4$var$a($64a9c8c639f900e4$var$k, "addShExt", ()=>$64a9c8c639f900e4$export$609be29b80b555e1);
var $64a9c8c639f900e4$var$M = {};
$64a9c8c639f900e4$var$a($64a9c8c639f900e4$var$M, "addShRelativePrefix", ()=>$64a9c8c639f900e4$export$e1f23f8d3e53fe6);
var $64a9c8c639f900e4$var$W = {};
$64a9c8c639f900e4$var$a($64a9c8c639f900e4$var$W, "removeExt", ()=>$64a9c8c639f900e4$export$19c5468f88f6e968);
var $64a9c8c639f900e4$var$q = {};
$64a9c8c639f900e4$var$a($64a9c8c639f900e4$var$q, "replaceExt", ()=>$64a9c8c639f900e4$export$e9c34737ac8e53d2);
var $64a9c8c639f900e4$var$B = {};
$64a9c8c639f900e4$var$a($64a9c8c639f900e4$var$B, "isPathInside", ()=>$64a9c8c639f900e4$export$7d0573375890d05c), $64a9c8c639f900e4$var$e($64a9c8c639f900e4$var$O, $64a9c8c639f900e4$var$R), $64a9c8c639f900e4$var$e($64a9c8c639f900e4$var$O, $64a9c8c639f900e4$var$A), $64a9c8c639f900e4$var$e($64a9c8c639f900e4$var$O, $64a9c8c639f900e4$var$I), $64a9c8c639f900e4$var$e($64a9c8c639f900e4$var$O, $64a9c8c639f900e4$var$T), $64a9c8c639f900e4$var$e($64a9c8c639f900e4$var$O, $64a9c8c639f900e4$var$_), $64a9c8c639f900e4$var$e($64a9c8c639f900e4$var$O, $64a9c8c639f900e4$var$k), $64a9c8c639f900e4$var$e($64a9c8c639f900e4$var$O, $64a9c8c639f900e4$var$M), $64a9c8c639f900e4$var$e($64a9c8c639f900e4$var$O, $64a9c8c639f900e4$var$W), $64a9c8c639f900e4$var$e($64a9c8c639f900e4$var$O, $64a9c8c639f900e4$var$q), $64a9c8c639f900e4$var$e($64a9c8c639f900e4$var$O, $64a9c8c639f900e4$var$B);

});
parcelRequire.register("2Qyc5", function(module, exports) {

$parcel$export(module.exports, "default", () => $212af64b4dba74ba$export$2e2bcd8739ae039);
function $212af64b4dba74ba$export$2e2bcd8739ae039(string) {
    if (typeof string !== "string") throw new TypeError("Expected a string");
    // Escape characters with special meaning either inside or outside character sets.
    // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
    return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

});

parcelRequire.register("4x0FW", function(module, exports) {
"use strict";

function $34cac4a0fbcefeac$var$replaceExt(npath, ext) {
    if (typeof npath !== "string") return npath;
    if (npath.length === 0) return npath;
    var nFileName = $dQzAa$path.basename(npath, $dQzAa$path.extname(npath)) + ext;
    var nFilepath = $dQzAa$path.join($dQzAa$path.dirname(npath), nFileName);
    // Because `path.join` removes the head './' from the given path.
    // This removal can cause a problem when passing the result to `require` or
    // `import`.
    if ($34cac4a0fbcefeac$var$startsWithSingleDot(npath)) return "." + $dQzAa$path.sep + nFilepath;
    return nFilepath;
}
function $34cac4a0fbcefeac$var$startsWithSingleDot(fpath) {
    var first2chars = fpath.slice(0, 2);
    return first2chars === "." + $dQzAa$path.sep || first2chars === "./";
}
module.exports = $34cac4a0fbcefeac$var$replaceExt;

});


parcelRequire.register("9nH4i", function(module, exports) {
module.exports = $6d47ab7c8274c2a0$var$isexe;
$6d47ab7c8274c2a0$var$isexe.sync = $6d47ab7c8274c2a0$var$sync;

function $6d47ab7c8274c2a0$var$checkPathExt(path, options) {
    var pathext = options.pathExt !== undefined ? options.pathExt : process.env.PATHEXT;
    if (!pathext) return true;
    pathext = pathext.split(";");
    if (pathext.indexOf("") !== -1) return true;
    for(var i = 0; i < pathext.length; i++){
        var p = pathext[i].toLowerCase();
        if (p && path.substr(-p.length).toLowerCase() === p) return true;
    }
    return false;
}
function $6d47ab7c8274c2a0$var$checkStat(stat, path, options) {
    if (!stat.isSymbolicLink() && !stat.isFile()) return false;
    return $6d47ab7c8274c2a0$var$checkPathExt(path, options);
}
function $6d47ab7c8274c2a0$var$isexe(path, options, cb) {
    $dQzAa$fs.stat(path, function(er, stat) {
        cb(er, er ? false : $6d47ab7c8274c2a0$var$checkStat(stat, path, options));
    });
}
function $6d47ab7c8274c2a0$var$sync(path, options) {
    return $6d47ab7c8274c2a0$var$checkStat($dQzAa$fs.statSync(path), path, options);
}

});

parcelRequire.register("gPh6F", function(module, exports) {
module.exports = $c3feadc2b1668b36$var$isexe;
$c3feadc2b1668b36$var$isexe.sync = $c3feadc2b1668b36$var$sync;

function $c3feadc2b1668b36$var$isexe(path, options, cb) {
    $dQzAa$fs.stat(path, function(er, stat) {
        cb(er, er ? false : $c3feadc2b1668b36$var$checkStat(stat, options));
    });
}
function $c3feadc2b1668b36$var$sync(path, options) {
    return $c3feadc2b1668b36$var$checkStat($dQzAa$fs.statSync(path), options);
}
function $c3feadc2b1668b36$var$checkStat(stat, options) {
    return stat.isFile() && $c3feadc2b1668b36$var$checkMode(stat, options);
}
function $c3feadc2b1668b36$var$checkMode(stat, options) {
    var mod = stat.mode;
    var uid = stat.uid;
    var gid = stat.gid;
    var myUid = options.uid !== undefined ? options.uid : process.getuid && process.getuid();
    var myGid = options.gid !== undefined ? options.gid : process.getgid && process.getgid();
    var u = parseInt("100", 8);
    var g = parseInt("010", 8);
    var o = parseInt("001", 8);
    var ug = u | g;
    var ret = mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && myUid === 0;
    return ret;
}

});

parcelRequire.register("kKlMx", function(module, exports) {
// This is not the set of all possible signals.
//
// It IS, however, the set of all signals that trigger
// an exit on either Linux or BSD systems.  Linux is a
// superset of the signal names supported on BSD, and
// the unknown signals just fail to register, so we can
// catch that easily enough.
//
// Don't bother with SIGKILL.  It's uncatchable, which
// means that we can't fire any callbacks anyway.
//
// If a user does happen to register a handler on a non-
// fatal signal like SIGWINCH or something, and then
// exit, it'll end up firing `process.emit('exit')`, so
// the handler will be fired anyway.
//
// SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
// artificially, inherently leave the process in a
// state from which it is not safe to try and enter JS
// listeners.
module.exports = [
    "SIGABRT",
    "SIGALRM",
    "SIGHUP",
    "SIGINT",
    "SIGTERM"
];
if (process.platform !== "win32") module.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
if (process.platform === "linux") module.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");

});

parcelRequire.register("5Knzt", function(module, exports) {
module.exports = ()=>process.env.GERRIT_PROJECT ? "gerrit" : process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI ? "azure-pipelines" : process.env.BITRISE_IO ? "bitrise" : process.env.BUDDY_WORKSPACE_ID ? "buddy" : process.env.BUILDKITE ? "buildkite" : process.env.CIRRUS_CI ? "cirrus" : process.env.GITLAB_CI ? "gitlab" : process.env.APPVEYOR ? "appveyor" : process.env.CIRCLECI ? "circle-ci" : process.env.SEMAPHORE ? "semaphore" : process.env.DRONE ? "drone" : process.env.DSARI ? "dsari" : process.env.GITHUB_ACTION ? "github-actions" : process.env.TDDIUM ? "tddium" : process.env.SCREWDRIVER ? "screwdriver" : process.env.STRIDER ? "strider" : process.env.TASKCLUSTER_ROOT_URL ? "taskcluster" : process.env.JENKINS_URL ? "jenkins" : process.env["bamboo.buildKey"] ? "bamboo" : process.env.GO_PIPELINE_NAME ? "gocd" : process.env.HUDSON_URL ? "hudson" : process.env.WERCKER ? "wercker" : process.env.NETLIFY ? "netlify" : process.env.NOW_GITHUB_DEPLOYMENT ? "now-github" : process.env.GITLAB_DEPLOYMENT ? "now-gitlab" : process.env.BITBUCKET_DEPLOYMENT ? "now-bitbucket" : process.env.BITBUCKET_BUILD_NUMBER ? "bitbucket-pipelines" : process.env.NOW_BUILDER ? "now" : process.env.VERCEL_GITHUB_DEPLOYMENT ? "vercel-github" : process.env.VERCEL_GITLAB_DEPLOYMENT ? "vercel-gitlab" : process.env.VERCEL_BITBUCKET_DEPLOYMENT ? "vercel-bitbucket" : process.env.VERCEL_URL ? "vercel" : process.env.MAGNUM ? "magnum" : process.env.NEVERCODE ? "nevercode" : process.env.RENDER ? "render" : process.env.SAIL_CI ? "sail" : process.env.SHIPPABLE ? "shippable" : process.env.TEAMCITY_VERSION ? "teamcity" : process.env.CI_NAME ? process.env.CI_NAME : /\/\.heroku\/node\/bin\/node$/.test(process.env.NODE || "") ? "heroku" : process.env.TRAVIS ? "travis-ci" : process.env.CODEBUILD_SRC_DIR ? "aws-codebuild" : process.env.CI === "true" || process.env.CI === "1" ? "custom" : process.env.BUILDER_OUTPUT ? "builder" : false;

});

parcelRequire.register("8pybT", function(module, exports) {

$parcel$export(module.exports, "error", () => $c21abac276c70e34$export$a3bc9b8ed74fc);
$parcel$export(module.exports, "success", () => $c21abac276c70e34$export$fe7c49d056ea1d88);
$parcel$export(module.exports, "warning", () => $c21abac276c70e34$export$491112666e282270);
$parcel$export(module.exports, "notice", () => $c21abac276c70e34$export$b31f6ae88848cf15);
$parcel$export(module.exports, "info", () => $c21abac276c70e34$export$a80b3bd66acc52ff);

var $9Ei2d = parcelRequire("9Ei2d");

var $5Knzt = parcelRequire("5Knzt");
function $c21abac276c70e34$export$a3bc9b8ed74fc(err) {
    return (0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() === "github-actions" ? $9Ei2d.error(err) : console.log(`\x1b[31m${err}\x1b[0m`);
}
function $c21abac276c70e34$export$fe7c49d056ea1d88(msg) {
    return console.log(`\x1b[32m${msg}\x1b[0m`);
}
function $c21abac276c70e34$export$491112666e282270(msg) {
    return (0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() === "github-actions" ? $9Ei2d.warning(msg) : console.log(`\x1b[33m${msg}\x1b[0m`);
}
function $c21abac276c70e34$export$b31f6ae88848cf15(msg) {
    return (0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() === "github-actions" ? $9Ei2d.notice(msg) : console.log(`\x1b[94m${msg}\x1b[0m`);
}
function $c21abac276c70e34$export$a80b3bd66acc52ff(msg) {
    return (0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() === "github-actions" ? $9Ei2d.info(msg) : console.log(msg);
}

});

parcelRequire.register("9oxKF", function(module, exports) {
"use strict";
var $6d708950dc9b9bbc$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $6d708950dc9b9bbc$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $6d708950dc9b9bbc$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $6d708950dc9b9bbc$var$__createBinding(result, mod, k);
    }
    $6d708950dc9b9bbc$var$__setModuleDefault(result, mod);
    return result;
};
var $6d708950dc9b9bbc$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.findInPath = module.exports.which = module.exports.mkdirP = module.exports.rmRF = module.exports.mv = module.exports.cp = void 0;


const $6d708950dc9b9bbc$var$childProcess = $6d708950dc9b9bbc$var$__importStar($dQzAa$child_process);

const $6d708950dc9b9bbc$var$path = $6d708950dc9b9bbc$var$__importStar($dQzAa$path);


const $6d708950dc9b9bbc$var$ioUtil = $6d708950dc9b9bbc$var$__importStar((parcelRequire("246jA")));
const $6d708950dc9b9bbc$var$exec = $dQzAa$util.promisify($6d708950dc9b9bbc$var$childProcess.exec);
const $6d708950dc9b9bbc$var$execFile = $dQzAa$util.promisify($6d708950dc9b9bbc$var$childProcess.execFile);
/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */ function $6d708950dc9b9bbc$var$cp(source, dest, options = {}) {
    return $6d708950dc9b9bbc$var$__awaiter(this, void 0, void 0, function*() {
        const { force: force , recursive: recursive , copySourceDirectory: copySourceDirectory  } = $6d708950dc9b9bbc$var$readCopyOptions(options);
        const destStat = (yield $6d708950dc9b9bbc$var$ioUtil.exists(dest)) ? yield $6d708950dc9b9bbc$var$ioUtil.stat(dest) : null;
        // Dest is an existing file, but not forcing
        if (destStat && destStat.isFile() && !force) return;
        // If dest is an existing directory, should copy inside.
        const newDest = destStat && destStat.isDirectory() && copySourceDirectory ? $6d708950dc9b9bbc$var$path.join(dest, $6d708950dc9b9bbc$var$path.basename(source)) : dest;
        if (!(yield $6d708950dc9b9bbc$var$ioUtil.exists(source))) throw new Error(`no such file or directory: ${source}`);
        const sourceStat = yield $6d708950dc9b9bbc$var$ioUtil.stat(source);
        if (sourceStat.isDirectory()) {
            if (!recursive) throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
            else yield $6d708950dc9b9bbc$var$cpDirRecursive(source, newDest, 0, force);
        } else {
            if ($6d708950dc9b9bbc$var$path.relative(source, newDest) === "") // a file cannot be copied to itself
            throw new Error(`'${newDest}' and '${source}' are the same file`);
            yield $6d708950dc9b9bbc$var$copyFile(source, newDest, force);
        }
    });
}
module.exports.cp = $6d708950dc9b9bbc$var$cp;
/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */ function $6d708950dc9b9bbc$var$mv(source, dest, options = {}) {
    return $6d708950dc9b9bbc$var$__awaiter(this, void 0, void 0, function*() {
        if (yield $6d708950dc9b9bbc$var$ioUtil.exists(dest)) {
            let destExists = true;
            if (yield $6d708950dc9b9bbc$var$ioUtil.isDirectory(dest)) {
                // If dest is directory copy src into dest
                dest = $6d708950dc9b9bbc$var$path.join(dest, $6d708950dc9b9bbc$var$path.basename(source));
                destExists = yield $6d708950dc9b9bbc$var$ioUtil.exists(dest);
            }
            if (destExists) {
                if (options.force == null || options.force) yield $6d708950dc9b9bbc$var$rmRF(dest);
                else throw new Error("Destination already exists");
            }
        }
        yield $6d708950dc9b9bbc$var$mkdirP($6d708950dc9b9bbc$var$path.dirname(dest));
        yield $6d708950dc9b9bbc$var$ioUtil.rename(source, dest);
    });
}
module.exports.mv = $6d708950dc9b9bbc$var$mv;
/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */ function $6d708950dc9b9bbc$var$rmRF(inputPath) {
    return $6d708950dc9b9bbc$var$__awaiter(this, void 0, void 0, function*() {
        if ($6d708950dc9b9bbc$var$ioUtil.IS_WINDOWS) {
            // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
            // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
            // Check for invalid characters
            // https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
            if (/[*"<>|]/.test(inputPath)) throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
            try {
                const cmdPath = $6d708950dc9b9bbc$var$ioUtil.getCmdPath();
                if (yield $6d708950dc9b9bbc$var$ioUtil.isDirectory(inputPath, true)) yield $6d708950dc9b9bbc$var$exec(`${cmdPath} /s /c "rd /s /q "%inputPath%""`, {
                    env: {
                        inputPath: inputPath
                    }
                });
                else yield $6d708950dc9b9bbc$var$exec(`${cmdPath} /s /c "del /f /a "%inputPath%""`, {
                    env: {
                        inputPath: inputPath
                    }
                });
            } catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== "ENOENT") throw err;
            }
            // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
            try {
                yield $6d708950dc9b9bbc$var$ioUtil.unlink(inputPath);
            } catch (err1) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err1.code !== "ENOENT") throw err1;
            }
        } else {
            let isDir = false;
            try {
                isDir = yield $6d708950dc9b9bbc$var$ioUtil.isDirectory(inputPath);
            } catch (err2) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err2.code !== "ENOENT") throw err2;
                return;
            }
            if (isDir) yield $6d708950dc9b9bbc$var$execFile(`rm`, [
                `-rf`,
                `${inputPath}`
            ]);
            else yield $6d708950dc9b9bbc$var$ioUtil.unlink(inputPath);
        }
    });
}
module.exports.rmRF = $6d708950dc9b9bbc$var$rmRF;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */ function $6d708950dc9b9bbc$var$mkdirP(fsPath) {
    return $6d708950dc9b9bbc$var$__awaiter(this, void 0, void 0, function*() {
        $dQzAa$assert.ok(fsPath, "a path argument must be provided");
        yield $6d708950dc9b9bbc$var$ioUtil.mkdir(fsPath, {
            recursive: true
        });
    });
}
module.exports.mkdirP = $6d708950dc9b9bbc$var$mkdirP;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */ function $6d708950dc9b9bbc$var$which(tool, check) {
    return $6d708950dc9b9bbc$var$__awaiter(this, void 0, void 0, function*() {
        if (!tool) throw new Error("parameter 'tool' is required");
        // recursive when check=true
        if (check) {
            const result = yield $6d708950dc9b9bbc$var$which(tool, false);
            if (!result) {
                if ($6d708950dc9b9bbc$var$ioUtil.IS_WINDOWS) throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
                else throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
            }
            return result;
        }
        const matches = yield $6d708950dc9b9bbc$var$findInPath(tool);
        if (matches && matches.length > 0) return matches[0];
        return "";
    });
}
module.exports.which = $6d708950dc9b9bbc$var$which;
/**
 * Returns a list of all occurrences of the given tool on the system path.
 *
 * @returns   Promise<string[]>  the paths of the tool
 */ function $6d708950dc9b9bbc$var$findInPath(tool) {
    return $6d708950dc9b9bbc$var$__awaiter(this, void 0, void 0, function*() {
        if (!tool) throw new Error("parameter 'tool' is required");
        // build the list of extensions to try
        const extensions = [];
        if ($6d708950dc9b9bbc$var$ioUtil.IS_WINDOWS && process.env["PATHEXT"]) {
            for (const extension of process.env["PATHEXT"].split($6d708950dc9b9bbc$var$path.delimiter))if (extension) extensions.push(extension);
        }
        // if it's rooted, return it if exists. otherwise return empty.
        if ($6d708950dc9b9bbc$var$ioUtil.isRooted(tool)) {
            const filePath = yield $6d708950dc9b9bbc$var$ioUtil.tryGetExecutablePath(tool, extensions);
            if (filePath) return [
                filePath
            ];
            return [];
        }
        // if any path separators, return empty
        if (tool.includes($6d708950dc9b9bbc$var$path.sep)) return [];
        // build the list of directories
        //
        // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
        // it feels like we should not do this. Checking the current directory seems like more of a use
        // case of a shell, and the which() function exposed by the toolkit should strive for consistency
        // across platforms.
        const directories = [];
        if (process.env.PATH) {
            for (const p of process.env.PATH.split($6d708950dc9b9bbc$var$path.delimiter))if (p) directories.push(p);
        }
        // find all matches
        const matches = [];
        for (const directory of directories){
            const filePath1 = yield $6d708950dc9b9bbc$var$ioUtil.tryGetExecutablePath($6d708950dc9b9bbc$var$path.join(directory, tool), extensions);
            if (filePath1) matches.push(filePath1);
        }
        return matches;
    });
}
module.exports.findInPath = $6d708950dc9b9bbc$var$findInPath;
function $6d708950dc9b9bbc$var$readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    const copySourceDirectory = options.copySourceDirectory == null ? true : Boolean(options.copySourceDirectory);
    return {
        force: force,
        recursive: recursive,
        copySourceDirectory: copySourceDirectory
    };
}
function $6d708950dc9b9bbc$var$cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return $6d708950dc9b9bbc$var$__awaiter(this, void 0, void 0, function*() {
        // Ensure there is not a run away recursive copy
        if (currentDepth >= 255) return;
        currentDepth++;
        yield $6d708950dc9b9bbc$var$mkdirP(destDir);
        const files = yield $6d708950dc9b9bbc$var$ioUtil.readdir(sourceDir);
        for (const fileName of files){
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield $6d708950dc9b9bbc$var$ioUtil.lstat(srcFile);
            if (srcFileStat.isDirectory()) // Recurse
            yield $6d708950dc9b9bbc$var$cpDirRecursive(srcFile, destFile, currentDepth, force);
            else yield $6d708950dc9b9bbc$var$copyFile(srcFile, destFile, force);
        }
        // Change the mode for the newly created directory
        yield $6d708950dc9b9bbc$var$ioUtil.chmod(destDir, (yield $6d708950dc9b9bbc$var$ioUtil.stat(sourceDir)).mode);
    });
}
// Buffered file copy
function $6d708950dc9b9bbc$var$copyFile(srcFile, destFile, force) {
    return $6d708950dc9b9bbc$var$__awaiter(this, void 0, void 0, function*() {
        if ((yield $6d708950dc9b9bbc$var$ioUtil.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
                yield $6d708950dc9b9bbc$var$ioUtil.lstat(destFile);
                yield $6d708950dc9b9bbc$var$ioUtil.unlink(destFile);
            } catch (e) {
                // Try to override file permission
                if (e.code === "EPERM") {
                    yield $6d708950dc9b9bbc$var$ioUtil.chmod(destFile, "0666");
                    yield $6d708950dc9b9bbc$var$ioUtil.unlink(destFile);
                }
            // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield $6d708950dc9b9bbc$var$ioUtil.readlink(srcFile);
            yield $6d708950dc9b9bbc$var$ioUtil.symlink(symlinkFull, destFile, $6d708950dc9b9bbc$var$ioUtil.IS_WINDOWS ? "junction" : null);
        } else if (!(yield $6d708950dc9b9bbc$var$ioUtil.exists(destFile)) || force) yield $6d708950dc9b9bbc$var$ioUtil.copyFile(srcFile, destFile);
    });
}

});
parcelRequire.register("246jA", function(module, exports) {
"use strict";
var $1810da7c996f8c51$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $1810da7c996f8c51$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $1810da7c996f8c51$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $1810da7c996f8c51$var$__createBinding(result, mod, k);
    }
    $1810da7c996f8c51$var$__setModuleDefault(result, mod);
    return result;
};
var $1810da7c996f8c51$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $1810da7c996f8c51$var$_a;
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.getCmdPath = module.exports.tryGetExecutablePath = module.exports.isRooted = module.exports.isDirectory = module.exports.exists = module.exports.IS_WINDOWS = module.exports.unlink = module.exports.symlink = module.exports.stat = module.exports.rmdir = module.exports.rename = module.exports.readlink = module.exports.readdir = module.exports.mkdir = module.exports.lstat = module.exports.copyFile = module.exports.chmod = void 0;

const $1810da7c996f8c51$var$fs = $1810da7c996f8c51$var$__importStar($dQzAa$fs);

const $1810da7c996f8c51$var$path = $1810da7c996f8c51$var$__importStar($dQzAa$path);
$1810da7c996f8c51$var$_a = $1810da7c996f8c51$var$fs.promises, module.exports.chmod = $1810da7c996f8c51$var$_a.chmod, module.exports.copyFile = $1810da7c996f8c51$var$_a.copyFile, module.exports.lstat = $1810da7c996f8c51$var$_a.lstat, module.exports.mkdir = $1810da7c996f8c51$var$_a.mkdir, module.exports.readdir = $1810da7c996f8c51$var$_a.readdir, module.exports.readlink = $1810da7c996f8c51$var$_a.readlink, module.exports.rename = $1810da7c996f8c51$var$_a.rename, module.exports.rmdir = $1810da7c996f8c51$var$_a.rmdir, module.exports.stat = $1810da7c996f8c51$var$_a.stat, module.exports.symlink = $1810da7c996f8c51$var$_a.symlink, module.exports.unlink = $1810da7c996f8c51$var$_a.unlink;
module.exports.IS_WINDOWS = process.platform === "win32";
function $1810da7c996f8c51$var$exists(fsPath) {
    return $1810da7c996f8c51$var$__awaiter(this, void 0, void 0, function*() {
        try {
            yield module.exports.stat(fsPath);
        } catch (err) {
            if (err.code === "ENOENT") return false;
            throw err;
        }
        return true;
    });
}
module.exports.exists = $1810da7c996f8c51$var$exists;
function $1810da7c996f8c51$var$isDirectory(fsPath, useStat = false) {
    return $1810da7c996f8c51$var$__awaiter(this, void 0, void 0, function*() {
        const stats = useStat ? yield module.exports.stat(fsPath) : yield module.exports.lstat(fsPath);
        return stats.isDirectory();
    });
}
module.exports.isDirectory = $1810da7c996f8c51$var$isDirectory;
/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */ function $1810da7c996f8c51$var$isRooted(p) {
    p = $1810da7c996f8c51$var$normalizeSeparators(p);
    if (!p) throw new Error('isRooted() parameter "p" cannot be empty');
    if (module.exports.IS_WINDOWS) return p.startsWith("\\") || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
    ; // e.g. C: or C:\hello
    return p.startsWith("/");
}
module.exports.isRooted = $1810da7c996f8c51$var$isRooted;
/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */ function $1810da7c996f8c51$var$tryGetExecutablePath(filePath, extensions) {
    return $1810da7c996f8c51$var$__awaiter(this, void 0, void 0, function*() {
        let stats = undefined;
        try {
            // test file exists
            stats = yield module.exports.stat(filePath);
        } catch (err) {
            if (err.code !== "ENOENT") // eslint-disable-next-line no-console
            console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
        }
        if (stats && stats.isFile()) {
            if (module.exports.IS_WINDOWS) {
                // on Windows, test for valid extension
                const upperExt = $1810da7c996f8c51$var$path.extname(filePath).toUpperCase();
                if (extensions.some((validExt)=>validExt.toUpperCase() === upperExt)) return filePath;
            } else {
                if ($1810da7c996f8c51$var$isUnixExecutable(stats)) return filePath;
            }
        }
        // try each extension
        const originalFilePath = filePath;
        for (const extension of extensions){
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
                stats = yield module.exports.stat(filePath);
            } catch (err1) {
                if (err1.code !== "ENOENT") // eslint-disable-next-line no-console
                console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err1}`);
            }
            if (stats && stats.isFile()) {
                if (module.exports.IS_WINDOWS) {
                    // preserve the case of the actual file (since an extension was appended)
                    try {
                        const directory = $1810da7c996f8c51$var$path.dirname(filePath);
                        const upperName = $1810da7c996f8c51$var$path.basename(filePath).toUpperCase();
                        for (const actualName of yield module.exports.readdir(directory))if (upperName === actualName.toUpperCase()) {
                            filePath = $1810da7c996f8c51$var$path.join(directory, actualName);
                            break;
                        }
                    } catch (err2) {
                        // eslint-disable-next-line no-console
                        console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err2}`);
                    }
                    return filePath;
                } else {
                    if ($1810da7c996f8c51$var$isUnixExecutable(stats)) return filePath;
                }
            }
        }
        return "";
    });
}
module.exports.tryGetExecutablePath = $1810da7c996f8c51$var$tryGetExecutablePath;
function $1810da7c996f8c51$var$normalizeSeparators(p) {
    p = p || "";
    if (module.exports.IS_WINDOWS) {
        // convert slashes on Windows
        p = p.replace(/\//g, "\\");
        // remove redundant slashes
        return p.replace(/\\\\+/g, "\\");
    }
    // remove redundant slashes
    return p.replace(/\/\/+/g, "/");
}
// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function $1810da7c996f8c51$var$isUnixExecutable(stats) {
    return (stats.mode & 1) > 0 || (stats.mode & 8) > 0 && stats.gid === process.getgid() || (stats.mode & 64) > 0 && stats.uid === process.getuid();
}
// Get the path of cmd.exe in windows
function $1810da7c996f8c51$var$getCmdPath() {
    var _a;
    return (_a = process.env["COMSPEC"]) !== null && _a !== void 0 ? _a : `cmd.exe`;
}
module.exports.getCmdPath = $1810da7c996f8c51$var$getCmdPath;

});


parcelRequire.register("gWoto", function(module, exports) {
"use strict";
var $c5550bf1a4c6ddf4$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $c5550bf1a4c6ddf4$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $c5550bf1a4c6ddf4$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $c5550bf1a4c6ddf4$var$__createBinding(result, mod, k);
    }
    $c5550bf1a4c6ddf4$var$__setModuleDefault(result, mod);
    return result;
};
var $c5550bf1a4c6ddf4$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports._readLinuxVersionFile = module.exports._getOsVersion = module.exports._findMatch = void 0;

const $c5550bf1a4c6ddf4$var$semver = $c5550bf1a4c6ddf4$var$__importStar((parcelRequire("93KhT")));

var $9Ei2d = parcelRequire("9Ei2d");



function $c5550bf1a4c6ddf4$var$_findMatch(versionSpec, stable, candidates, archFilter) {
    return $c5550bf1a4c6ddf4$var$__awaiter(this, void 0, void 0, function*() {
        const platFilter = $dQzAa$os.platform();
        let result;
        let match;
        let file;
        for (const candidate of candidates){
            const version = candidate.version;
            $9Ei2d.debug(`check ${version} satisfies ${versionSpec}`);
            if ($c5550bf1a4c6ddf4$var$semver.satisfies(version, versionSpec) && (!stable || candidate.stable === stable)) {
                file = candidate.files.find((item)=>{
                    $9Ei2d.debug(`${item.arch}===${archFilter} && ${item.platform}===${platFilter}`);
                    let chk = item.arch === archFilter && item.platform === platFilter;
                    if (chk && item.platform_version) {
                        const osVersion = module.exports._getOsVersion();
                        if (osVersion === item.platform_version) chk = true;
                        else chk = $c5550bf1a4c6ddf4$var$semver.satisfies(osVersion, item.platform_version);
                    }
                    return chk;
                });
                if (file) {
                    $9Ei2d.debug(`matched ${candidate.version}`);
                    match = candidate;
                    break;
                }
            }
        }
        if (match && file) {
            // clone since we're mutating the file list to be only the file that matches
            result = Object.assign({}, match);
            result.files = [
                file
            ];
        }
        return result;
    });
}
module.exports._findMatch = $c5550bf1a4c6ddf4$var$_findMatch;
function $c5550bf1a4c6ddf4$var$_getOsVersion() {
    // TODO: add windows and other linux, arm variants
    // right now filtering on version is only an ubuntu and macos scenario for tools we build for hosted (python)
    const plat = $dQzAa$os.platform();
    let version = "";
    if (plat === "darwin") version = $dQzAa$child_process.execSync("sw_vers -productVersion").toString();
    else if (plat === "linux") {
        // lsb_release process not in some containers, readfile
        // Run cat /etc/lsb-release
        // DISTRIB_ID=Ubuntu
        // DISTRIB_RELEASE=18.04
        // DISTRIB_CODENAME=bionic
        // DISTRIB_DESCRIPTION="Ubuntu 18.04.4 LTS"
        const lsbContents = module.exports._readLinuxVersionFile();
        if (lsbContents) {
            const lines = lsbContents.split("\n");
            for (const line of lines){
                const parts = line.split("=");
                if (parts.length === 2 && (parts[0].trim() === "VERSION_ID" || parts[0].trim() === "DISTRIB_RELEASE")) {
                    version = parts[1].trim().replace(/^"/, "").replace(/"$/, "");
                    break;
                }
            }
        }
    }
    return version;
}
module.exports._getOsVersion = $c5550bf1a4c6ddf4$var$_getOsVersion;
function $c5550bf1a4c6ddf4$var$_readLinuxVersionFile() {
    const lsbReleaseFile = "/etc/lsb-release";
    const osReleaseFile = "/etc/os-release";
    let contents = "";
    if ($dQzAa$fs.existsSync(lsbReleaseFile)) contents = $dQzAa$fs.readFileSync(lsbReleaseFile).toString();
    else if ($dQzAa$fs.existsSync(osReleaseFile)) contents = $dQzAa$fs.readFileSync(osReleaseFile).toString();
    return contents;
}
module.exports._readLinuxVersionFile = $c5550bf1a4c6ddf4$var$_readLinuxVersionFile;

});
parcelRequire.register("93KhT", function(module, exports) {

var $7B4tz = parcelRequire("7B4tz");









































module.exports = {
    re: $7B4tz.re,
    src: $7B4tz.src,
    tokens: $7B4tz.t,
    SEMVER_SPEC_VERSION: (parcelRequire("78MeM")).SEMVER_SPEC_VERSION,
    SemVer: (parcelRequire("cMlz8")),
    compareIdentifiers: (parcelRequire("7tKDo")).compareIdentifiers,
    rcompareIdentifiers: (parcelRequire("7tKDo")).rcompareIdentifiers,
    parse: (parcelRequire("edtIK")),
    valid: (parcelRequire("9tUGm")),
    clean: (parcelRequire("kpB0g")),
    inc: (parcelRequire("ebFni")),
    diff: (parcelRequire("cXXHs")),
    major: (parcelRequire("eFoxk")),
    minor: (parcelRequire("4GN2U")),
    patch: (parcelRequire("5CvV0")),
    prerelease: (parcelRequire("6idFh")),
    compare: (parcelRequire("7i3IQ")),
    rcompare: (parcelRequire("gbai1")),
    compareLoose: (parcelRequire("dIRxb")),
    compareBuild: (parcelRequire("i3flK")),
    sort: (parcelRequire("kQanq")),
    rsort: (parcelRequire("5sd5L")),
    gt: (parcelRequire("5AjSi")),
    lt: (parcelRequire("fHaxc")),
    eq: (parcelRequire("3qzIf")),
    neq: (parcelRequire("jXs4Q")),
    gte: (parcelRequire("gAEwK")),
    lte: (parcelRequire("lP7aG")),
    cmp: (parcelRequire("j91Lg")),
    coerce: (parcelRequire("efeiw")),
    Comparator: (parcelRequire("g39Mn")),
    Range: (parcelRequire("amxyM")),
    satisfies: (parcelRequire("dVFEG")),
    toComparators: (parcelRequire("lxbDr")),
    maxSatisfying: (parcelRequire("lDVw1")),
    minSatisfying: (parcelRequire("lUre0")),
    minVersion: (parcelRequire("fpRgu")),
    validRange: (parcelRequire("04YGR")),
    outside: (parcelRequire("fokkL")),
    gtr: (parcelRequire("8sqEB")),
    ltr: (parcelRequire("eTS3H")),
    intersects: (parcelRequire("fPSDL")),
    simplifyRange: (parcelRequire("7OGJZ")),
    subset: (parcelRequire("kxkVU"))
};

});
parcelRequire.register("7B4tz", function(module, exports) {

var $78MeM = parcelRequire("78MeM");
var $587f75f32815a256$require$MAX_SAFE_COMPONENT_LENGTH = $78MeM.MAX_SAFE_COMPONENT_LENGTH;

var $iQbhJ = parcelRequire("iQbhJ");
exports = module.exports = {};
// The actual regexps go on exports.re
const re = exports.re = [];
const src = exports.src = [];
const t = exports.t = {};
let R = 0;
const createToken = (name, value, isGlobal)=>{
    const index = R++;
    $iQbhJ(name, index, value);
    t[name] = index;
    src[index] = value;
    re[index] = new RegExp(value, isGlobal ? "g" : undefined);
};
// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.
// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.
createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.
createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
// ## Main Version
// Three dot-separated numeric identifiers.
createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})`);
createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})`);
// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.
createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.
createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.
createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.
createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.
// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.
createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
createToken("FULL", `^${src[t.FULLPLAIN]}$`);
// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
createToken("GTLT", "((?:<|>)?=?)");
// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?` + `)?)?`);
createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?` + `)?)?`);
createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
// Coercion.
// Extract anything that could conceivably be a part of a valid semver
createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${$587f75f32815a256$require$MAX_SAFE_COMPONENT_LENGTH}})` + `(?:\\.(\\d{1,${$587f75f32815a256$require$MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:\\.(\\d{1,${$587f75f32815a256$require$MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:$|[^\\d])`);
createToken("COERCERTL", src[t.COERCE], true);
// Tilde ranges.
// Meaning is "reasonably at or greater than"
createToken("LONETILDE", "(?:~>?)");
createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
exports.tildeTrimReplace = "$1~";
createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
// Caret ranges.
// Meaning is "at least and backwards compatible with"
createToken("LONECARET", "(?:\\^)");
createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
exports.caretTrimReplace = "$1^";
createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
// A simple gt/lt/eq thing, or just "" to indicate "any version"
createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
exports.comparatorTrimReplace = "$1$2$3";
// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAIN]})` + `\\s*$`);
createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAINLOOSE]})` + `\\s*$`);
// Star ranges basically just allow anything at all.
createToken("STAR", "(<|>)?=?\\s*\\*");
// >=0.0.0 is like a star
createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");

});
parcelRequire.register("78MeM", function(module, exports) {
// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const $532eb2af96499a03$var$SEMVER_SPEC_VERSION = "2.0.0";
const $532eb2af96499a03$var$MAX_LENGTH = 256;
const $532eb2af96499a03$var$MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */ 9007199254740991;
// Max safe segment length for coercion.
const $532eb2af96499a03$var$MAX_SAFE_COMPONENT_LENGTH = 16;
module.exports = {
    SEMVER_SPEC_VERSION: $532eb2af96499a03$var$SEMVER_SPEC_VERSION,
    MAX_LENGTH: $532eb2af96499a03$var$MAX_LENGTH,
    MAX_SAFE_INTEGER: $532eb2af96499a03$var$MAX_SAFE_INTEGER,
    MAX_SAFE_COMPONENT_LENGTH: $532eb2af96499a03$var$MAX_SAFE_COMPONENT_LENGTH
};

});

parcelRequire.register("iQbhJ", function(module, exports) {
const $db75d6464793934a$var$debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args)=>console.error("SEMVER", ...args) : ()=>{};
module.exports = $db75d6464793934a$var$debug;

});


parcelRequire.register("cMlz8", function(module, exports) {

var $iQbhJ = parcelRequire("iQbhJ");

var $78MeM = parcelRequire("78MeM");
var $94dab23edc0de326$require$MAX_LENGTH = $78MeM.MAX_LENGTH;
var $94dab23edc0de326$require$MAX_SAFE_INTEGER = $78MeM.MAX_SAFE_INTEGER;

var $7B4tz = parcelRequire("7B4tz");
var $94dab23edc0de326$require$re = $7B4tz.re;
var $94dab23edc0de326$require$t = $7B4tz.t;

var $glUsB = parcelRequire("glUsB");

var $7tKDo = parcelRequire("7tKDo");
var $94dab23edc0de326$require$compareIdentifiers = $7tKDo.compareIdentifiers;
class $94dab23edc0de326$var$SemVer {
    constructor(version, options){
        options = $glUsB(options);
        if (version instanceof $94dab23edc0de326$var$SemVer) {
            if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) return version;
            else version = version.version;
        } else if (typeof version !== "string") throw new TypeError(`Invalid Version: ${version}`);
        if (version.length > $94dab23edc0de326$require$MAX_LENGTH) throw new TypeError(`version is longer than ${$94dab23edc0de326$require$MAX_LENGTH} characters`);
        $iQbhJ("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        // this isn't actually relevant for versions, but keep it so that we
        // don't run into trouble passing this.options around.
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? $94dab23edc0de326$require$re[$94dab23edc0de326$require$t.LOOSE] : $94dab23edc0de326$require$re[$94dab23edc0de326$require$t.FULL]);
        if (!m) throw new TypeError(`Invalid Version: ${version}`);
        this.raw = version;
        // these are actually numbers
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > $94dab23edc0de326$require$MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
        if (this.minor > $94dab23edc0de326$require$MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
        if (this.patch > $94dab23edc0de326$require$MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
        // numberify any prerelease numeric ids
        if (!m[4]) this.prerelease = [];
        else this.prerelease = m[4].split(".").map((id)=>{
            if (/^[0-9]+$/.test(id)) {
                const num = +id;
                if (num >= 0 && num < $94dab23edc0de326$require$MAX_SAFE_INTEGER) return num;
            }
            return id;
        });
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
    }
    format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) this.version += `-${this.prerelease.join(".")}`;
        return this.version;
    }
    toString() {
        return this.version;
    }
    compare(other) {
        $iQbhJ("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof $94dab23edc0de326$var$SemVer)) {
            if (typeof other === "string" && other === this.version) return 0;
            other = new $94dab23edc0de326$var$SemVer(other, this.options);
        }
        if (other.version === this.version) return 0;
        return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
        if (!(other instanceof $94dab23edc0de326$var$SemVer)) other = new $94dab23edc0de326$var$SemVer(other, this.options);
        return $94dab23edc0de326$require$compareIdentifiers(this.major, other.major) || $94dab23edc0de326$require$compareIdentifiers(this.minor, other.minor) || $94dab23edc0de326$require$compareIdentifiers(this.patch, other.patch);
    }
    comparePre(other) {
        if (!(other instanceof $94dab23edc0de326$var$SemVer)) other = new $94dab23edc0de326$var$SemVer(other, this.options);
        // NOT having a prerelease is > having one
        if (this.prerelease.length && !other.prerelease.length) return -1;
        else if (!this.prerelease.length && other.prerelease.length) return 1;
        else if (!this.prerelease.length && !other.prerelease.length) return 0;
        let i = 0;
        do {
            const a = this.prerelease[i];
            const b = other.prerelease[i];
            $iQbhJ("prerelease compare", i, a, b);
            if (a === undefined && b === undefined) return 0;
            else if (b === undefined) return 1;
            else if (a === undefined) return -1;
            else if (a === b) continue;
            else return $94dab23edc0de326$require$compareIdentifiers(a, b);
        }while (++i);
    }
    compareBuild(other) {
        if (!(other instanceof $94dab23edc0de326$var$SemVer)) other = new $94dab23edc0de326$var$SemVer(other, this.options);
        let i = 0;
        do {
            const a = this.build[i];
            const b = other.build[i];
            $iQbhJ("prerelease compare", i, a, b);
            if (a === undefined && b === undefined) return 0;
            else if (b === undefined) return 1;
            else if (a === undefined) return -1;
            else if (a === b) continue;
            else return $94dab23edc0de326$require$compareIdentifiers(a, b);
        }while (++i);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(release, identifier) {
        switch(release){
            case "premajor":
                this.prerelease.length = 0;
                this.patch = 0;
                this.minor = 0;
                this.major++;
                this.inc("pre", identifier);
                break;
            case "preminor":
                this.prerelease.length = 0;
                this.patch = 0;
                this.minor++;
                this.inc("pre", identifier);
                break;
            case "prepatch":
                // If this is already a prerelease, it will bump to the next version
                // drop any prereleases that might already exist, since they are not
                // relevant at this point.
                this.prerelease.length = 0;
                this.inc("patch", identifier);
                this.inc("pre", identifier);
                break;
            // If the input is a non-prerelease version, this acts the same as
            // prepatch.
            case "prerelease":
                if (this.prerelease.length === 0) this.inc("patch", identifier);
                this.inc("pre", identifier);
                break;
            case "major":
                // If this is a pre-major version, bump up to the same major version.
                // Otherwise increment major.
                // 1.0.0-5 bumps to 1.0.0
                // 1.1.0 bumps to 2.0.0
                if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
                this.minor = 0;
                this.patch = 0;
                this.prerelease = [];
                break;
            case "minor":
                // If this is a pre-minor version, bump up to the same minor version.
                // Otherwise increment minor.
                // 1.2.0-5 bumps to 1.2.0
                // 1.2.1 bumps to 1.3.0
                if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
                this.patch = 0;
                this.prerelease = [];
                break;
            case "patch":
                // If this is not a pre-release version, it will increment the patch.
                // If it is a pre-release it will bump up to the same patch version.
                // 1.2.0-5 patches to 1.2.0
                // 1.2.0 patches to 1.2.1
                if (this.prerelease.length === 0) this.patch++;
                this.prerelease = [];
                break;
            // This probably shouldn't be used publicly.
            // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
            case "pre":
                if (this.prerelease.length === 0) this.prerelease = [
                    0
                ];
                else {
                    let i = this.prerelease.length;
                    while(--i >= 0)if (typeof this.prerelease[i] === "number") {
                        this.prerelease[i]++;
                        i = -2;
                    }
                    if (i === -1) // didn't increment anything
                    this.prerelease.push(0);
                }
                if (identifier) {
                    // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
                    // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
                    if ($94dab23edc0de326$require$compareIdentifiers(this.prerelease[0], identifier) === 0) {
                        if (isNaN(this.prerelease[1])) this.prerelease = [
                            identifier,
                            0
                        ];
                    } else this.prerelease = [
                        identifier,
                        0
                    ];
                }
                break;
            default:
                throw new Error(`invalid increment argument: ${release}`);
        }
        this.format();
        this.raw = this.version;
        return this;
    }
}
module.exports = $94dab23edc0de326$var$SemVer;

});
parcelRequire.register("glUsB", function(module, exports) {
// parse out just the options we care about so we always get a consistent
// obj with keys in a consistent order.
const $be7a6759abed9a5f$var$opts = [
    "includePrerelease",
    "loose",
    "rtl"
];
const $be7a6759abed9a5f$var$parseOptions = (options)=>!options ? {} : typeof options !== "object" ? {
        loose: true
    } : $be7a6759abed9a5f$var$opts.filter((k)=>options[k]).reduce((o, k)=>{
        o[k] = true;
        return o;
    }, {});
module.exports = $be7a6759abed9a5f$var$parseOptions;

});

parcelRequire.register("7tKDo", function(module, exports) {
const $571f6a7a2afcaefe$var$numeric = /^[0-9]+$/;
const $571f6a7a2afcaefe$var$compareIdentifiers = (a, b)=>{
    const anum = $571f6a7a2afcaefe$var$numeric.test(a);
    const bnum = $571f6a7a2afcaefe$var$numeric.test(b);
    if (anum && bnum) {
        a = +a;
        b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const $571f6a7a2afcaefe$var$rcompareIdentifiers = (a, b)=>$571f6a7a2afcaefe$var$compareIdentifiers(b, a);
module.exports = {
    compareIdentifiers: $571f6a7a2afcaefe$var$compareIdentifiers,
    rcompareIdentifiers: $571f6a7a2afcaefe$var$rcompareIdentifiers
};

});


parcelRequire.register("edtIK", function(module, exports) {

var $78MeM = parcelRequire("78MeM");
var $a599557facf9685e$require$MAX_LENGTH = $78MeM.MAX_LENGTH;

var $7B4tz = parcelRequire("7B4tz");
var $a599557facf9685e$require$re = $7B4tz.re;
var $a599557facf9685e$require$t = $7B4tz.t;

var $cMlz8 = parcelRequire("cMlz8");

var $glUsB = parcelRequire("glUsB");
const $a599557facf9685e$var$parse = (version, options)=>{
    options = $glUsB(options);
    if (version instanceof $cMlz8) return version;
    if (typeof version !== "string") return null;
    if (version.length > $a599557facf9685e$require$MAX_LENGTH) return null;
    const r = options.loose ? $a599557facf9685e$require$re[$a599557facf9685e$require$t.LOOSE] : $a599557facf9685e$require$re[$a599557facf9685e$require$t.FULL];
    if (!r.test(version)) return null;
    try {
        return new $cMlz8(version, options);
    } catch (er) {
        return null;
    }
};
module.exports = $a599557facf9685e$var$parse;

});

parcelRequire.register("9tUGm", function(module, exports) {

var $edtIK = parcelRequire("edtIK");
const $6e72ca60d10ec0ae$var$valid = (version, options)=>{
    const v = $edtIK(version, options);
    return v ? v.version : null;
};
module.exports = $6e72ca60d10ec0ae$var$valid;

});

parcelRequire.register("kpB0g", function(module, exports) {

var $edtIK = parcelRequire("edtIK");
const $edc2d88793af99ab$var$clean = (version, options)=>{
    const s = $edtIK(version.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
};
module.exports = $edc2d88793af99ab$var$clean;

});

parcelRequire.register("ebFni", function(module, exports) {

var $cMlz8 = parcelRequire("cMlz8");
const $a5422fece6913853$var$inc = (version, release, options, identifier)=>{
    if (typeof options === "string") {
        identifier = options;
        options = undefined;
    }
    try {
        return new $cMlz8(version instanceof $cMlz8 ? version.version : version, options).inc(release, identifier).version;
    } catch (er) {
        return null;
    }
};
module.exports = $a5422fece6913853$var$inc;

});

parcelRequire.register("cXXHs", function(module, exports) {

var $edtIK = parcelRequire("edtIK");

var $3qzIf = parcelRequire("3qzIf");
const $97094ddeb5590139$var$diff = (version1, version2)=>{
    if ($3qzIf(version1, version2)) return null;
    else {
        const v1 = $edtIK(version1);
        const v2 = $edtIK(version2);
        const hasPre = v1.prerelease.length || v2.prerelease.length;
        const prefix = hasPre ? "pre" : "";
        const defaultResult = hasPre ? "prerelease" : "";
        for(const key in v1)if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) return prefix + key;
        }
        return defaultResult // may be undefined
        ;
    }
};
module.exports = $97094ddeb5590139$var$diff;

});
parcelRequire.register("3qzIf", function(module, exports) {

var $7i3IQ = parcelRequire("7i3IQ");
const $27ef8094e95dfc67$var$eq = (a, b, loose)=>$7i3IQ(a, b, loose) === 0;
module.exports = $27ef8094e95dfc67$var$eq;

});
parcelRequire.register("7i3IQ", function(module, exports) {

var $cMlz8 = parcelRequire("cMlz8");
const $54ed19fece4012fa$var$compare = (a, b, loose)=>new $cMlz8(a, loose).compare(new $cMlz8(b, loose));
module.exports = $54ed19fece4012fa$var$compare;

});



parcelRequire.register("eFoxk", function(module, exports) {

var $cMlz8 = parcelRequire("cMlz8");
const $aad7ed75c4913c59$var$major = (a, loose)=>new $cMlz8(a, loose).major;
module.exports = $aad7ed75c4913c59$var$major;

});

parcelRequire.register("4GN2U", function(module, exports) {

var $cMlz8 = parcelRequire("cMlz8");
const $36a1212815bc83e0$var$minor = (a, loose)=>new $cMlz8(a, loose).minor;
module.exports = $36a1212815bc83e0$var$minor;

});

parcelRequire.register("5CvV0", function(module, exports) {

var $cMlz8 = parcelRequire("cMlz8");
const $417942b1c0bfe8d0$var$patch = (a, loose)=>new $cMlz8(a, loose).patch;
module.exports = $417942b1c0bfe8d0$var$patch;

});

parcelRequire.register("6idFh", function(module, exports) {

var $edtIK = parcelRequire("edtIK");
const $494f061653d919d5$var$prerelease = (version, options)=>{
    const parsed = $edtIK(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};
module.exports = $494f061653d919d5$var$prerelease;

});

parcelRequire.register("gbai1", function(module, exports) {

var $7i3IQ = parcelRequire("7i3IQ");
const $bc75a7bfccf7013b$var$rcompare = (a, b, loose)=>$7i3IQ(b, a, loose);
module.exports = $bc75a7bfccf7013b$var$rcompare;

});

parcelRequire.register("dIRxb", function(module, exports) {

var $7i3IQ = parcelRequire("7i3IQ");
const $9fd8e930f77b89b9$var$compareLoose = (a, b)=>$7i3IQ(a, b, true);
module.exports = $9fd8e930f77b89b9$var$compareLoose;

});

parcelRequire.register("i3flK", function(module, exports) {

var $cMlz8 = parcelRequire("cMlz8");
const $d24469f3e02c5203$var$compareBuild = (a, b, loose)=>{
    const versionA = new $cMlz8(a, loose);
    const versionB = new $cMlz8(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB);
};
module.exports = $d24469f3e02c5203$var$compareBuild;

});

parcelRequire.register("kQanq", function(module, exports) {

var $i3flK = parcelRequire("i3flK");
const $f2c0b6986a6bee42$var$sort = (list, loose)=>list.sort((a, b)=>$i3flK(a, b, loose));
module.exports = $f2c0b6986a6bee42$var$sort;

});

parcelRequire.register("5sd5L", function(module, exports) {

var $i3flK = parcelRequire("i3flK");
const $3f89b90cc359a4d2$var$rsort = (list, loose)=>list.sort((a, b)=>$i3flK(b, a, loose));
module.exports = $3f89b90cc359a4d2$var$rsort;

});

parcelRequire.register("5AjSi", function(module, exports) {

var $7i3IQ = parcelRequire("7i3IQ");
const $410fbb45db494c7f$var$gt = (a, b, loose)=>$7i3IQ(a, b, loose) > 0;
module.exports = $410fbb45db494c7f$var$gt;

});

parcelRequire.register("fHaxc", function(module, exports) {

var $7i3IQ = parcelRequire("7i3IQ");
const $b6d30b125d8e8d19$var$lt = (a, b, loose)=>$7i3IQ(a, b, loose) < 0;
module.exports = $b6d30b125d8e8d19$var$lt;

});

parcelRequire.register("jXs4Q", function(module, exports) {

var $7i3IQ = parcelRequire("7i3IQ");
const $e8794e871e6c3769$var$neq = (a, b, loose)=>$7i3IQ(a, b, loose) !== 0;
module.exports = $e8794e871e6c3769$var$neq;

});

parcelRequire.register("gAEwK", function(module, exports) {

var $7i3IQ = parcelRequire("7i3IQ");
const $c13f71fc3fc2bc76$var$gte = (a, b, loose)=>$7i3IQ(a, b, loose) >= 0;
module.exports = $c13f71fc3fc2bc76$var$gte;

});

parcelRequire.register("lP7aG", function(module, exports) {

var $7i3IQ = parcelRequire("7i3IQ");
const $fe33ec77049956bd$var$lte = (a, b, loose)=>$7i3IQ(a, b, loose) <= 0;
module.exports = $fe33ec77049956bd$var$lte;

});

parcelRequire.register("j91Lg", function(module, exports) {

var $3qzIf = parcelRequire("3qzIf");

var $jXs4Q = parcelRequire("jXs4Q");

var $5AjSi = parcelRequire("5AjSi");

var $gAEwK = parcelRequire("gAEwK");

var $fHaxc = parcelRequire("fHaxc");

var $lP7aG = parcelRequire("lP7aG");
const $df00395c983827cc$var$cmp = (a, op, b, loose)=>{
    switch(op){
        case "===":
            if (typeof a === "object") a = a.version;
            if (typeof b === "object") b = b.version;
            return a === b;
        case "!==":
            if (typeof a === "object") a = a.version;
            if (typeof b === "object") b = b.version;
            return a !== b;
        case "":
        case "=":
        case "==":
            return $3qzIf(a, b, loose);
        case "!=":
            return $jXs4Q(a, b, loose);
        case ">":
            return $5AjSi(a, b, loose);
        case ">=":
            return $gAEwK(a, b, loose);
        case "<":
            return $fHaxc(a, b, loose);
        case "<=":
            return $lP7aG(a, b, loose);
        default:
            throw new TypeError(`Invalid operator: ${op}`);
    }
};
module.exports = $df00395c983827cc$var$cmp;

});

parcelRequire.register("efeiw", function(module, exports) {

var $cMlz8 = parcelRequire("cMlz8");

var $edtIK = parcelRequire("edtIK");

var $7B4tz = parcelRequire("7B4tz");
var $a5ed8e9ea20614e9$require$re = $7B4tz.re;
var $a5ed8e9ea20614e9$require$t = $7B4tz.t;
const $a5ed8e9ea20614e9$var$coerce = (version, options)=>{
    if (version instanceof $cMlz8) return version;
    if (typeof version === "number") version = String(version);
    if (typeof version !== "string") return null;
    options = options || {};
    let match = null;
    if (!options.rtl) match = version.match($a5ed8e9ea20614e9$require$re[$a5ed8e9ea20614e9$require$t.COERCE]);
    else {
        // Find the right-most coercible string that does not share
        // a terminus with a more left-ward coercible string.
        // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
        //
        // Walk through the string checking with a /g regexp
        // Manually set the index so as to pick up overlapping matches.
        // Stop when we get a match that ends at the string end, since no
        // coercible string can be more right-ward without the same terminus.
        let next;
        while((next = $a5ed8e9ea20614e9$require$re[$a5ed8e9ea20614e9$require$t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)){
            if (!match || next.index + next[0].length !== match.index + match[0].length) match = next;
            $a5ed8e9ea20614e9$require$re[$a5ed8e9ea20614e9$require$t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
        }
        // leave it in a clean state
        $a5ed8e9ea20614e9$require$re[$a5ed8e9ea20614e9$require$t.COERCERTL].lastIndex = -1;
    }
    if (match === null) return null;
    return $edtIK(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
};
module.exports = $a5ed8e9ea20614e9$var$coerce;

});

parcelRequire.register("g39Mn", function(module, exports) {
const $baf48319c647ebfe$var$ANY = Symbol("SemVer ANY");
// hoisted class for cyclic dependency
class $baf48319c647ebfe$var$Comparator {
    static get ANY() {
        return $baf48319c647ebfe$var$ANY;
    }
    constructor(comp, options){
        options = $glUsB(options);
        if (comp instanceof $baf48319c647ebfe$var$Comparator) {
            if (comp.loose === !!options.loose) return comp;
            else comp = comp.value;
        }
        $iQbhJ("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === $baf48319c647ebfe$var$ANY) this.value = "";
        else this.value = this.operator + this.semver.version;
        $iQbhJ("comp", this);
    }
    parse(comp) {
        const r = this.options.loose ? $baf48319c647ebfe$require$re[$baf48319c647ebfe$require$t.COMPARATORLOOSE] : $baf48319c647ebfe$require$re[$baf48319c647ebfe$require$t.COMPARATOR];
        const m = comp.match(r);
        if (!m) throw new TypeError(`Invalid comparator: ${comp}`);
        this.operator = m[1] !== undefined ? m[1] : "";
        if (this.operator === "=") this.operator = "";
        // if it literally is just '>' or '' then allow anything.
        if (!m[2]) this.semver = $baf48319c647ebfe$var$ANY;
        else this.semver = new $cMlz8(m[2], this.options.loose);
    }
    toString() {
        return this.value;
    }
    test(version) {
        $iQbhJ("Comparator.test", version, this.options.loose);
        if (this.semver === $baf48319c647ebfe$var$ANY || version === $baf48319c647ebfe$var$ANY) return true;
        if (typeof version === "string") try {
            version = new $cMlz8(version, this.options);
        } catch (er) {
            return false;
        }
        return $j91Lg(version, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
        if (!(comp instanceof $baf48319c647ebfe$var$Comparator)) throw new TypeError("a Comparator is required");
        if (!options || typeof options !== "object") options = {
            loose: !!options,
            includePrerelease: false
        };
        if (this.operator === "") {
            if (this.value === "") return true;
            return new $amxyM(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
            if (comp.value === "") return true;
            return new $amxyM(this.value, options).test(comp.semver);
        }
        const sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
        const sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
        const sameSemVer = this.semver.version === comp.semver.version;
        const differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
        const oppositeDirectionsLessThan = $j91Lg(this.semver, "<", comp.semver, options) && (this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<");
        const oppositeDirectionsGreaterThan = $j91Lg(this.semver, ">", comp.semver, options) && (this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">");
        return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    }
}
module.exports = $baf48319c647ebfe$var$Comparator;

var $glUsB = parcelRequire("glUsB");

var $7B4tz = parcelRequire("7B4tz");
var $baf48319c647ebfe$require$re = $7B4tz.re;
var $baf48319c647ebfe$require$t = $7B4tz.t;

var $j91Lg = parcelRequire("j91Lg");

var $iQbhJ = parcelRequire("iQbhJ");

var $cMlz8 = parcelRequire("cMlz8");

var $amxyM = parcelRequire("amxyM");

});
parcelRequire.register("amxyM", function(module, exports) {
// hoisted class for cyclic dependency
class $78b5fdc685b3bf08$var$Range {
    constructor(range, options){
        options = $glUsB(options);
        if (range instanceof $78b5fdc685b3bf08$var$Range) {
            if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) return range;
            else return new $78b5fdc685b3bf08$var$Range(range.raw, options);
        }
        if (range instanceof $g39Mn) {
            // just put it in the set and return
            this.raw = range.value;
            this.set = [
                [
                    range
                ]
            ];
            this.format();
            return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        // First, split based on boolean or ||
        this.raw = range;
        this.set = range.split("||")// map the range to a 2d array of comparators
        .map((r)=>this.parseRange(r.trim()))// throw out any comparator lists that are empty
        // this generally means that it was not a valid range, which is allowed
        // in loose mode, but will still throw if the WHOLE range is invalid.
        .filter((c)=>c.length);
        if (!this.set.length) throw new TypeError(`Invalid SemVer Range: ${range}`);
        // if we have any that are not the null set, throw out null sets.
        if (this.set.length > 1) {
            // keep the first one, in case they're all null sets
            const first = this.set[0];
            this.set = this.set.filter((c)=>!$78b5fdc685b3bf08$var$isNullSet(c[0]));
            if (this.set.length === 0) this.set = [
                first
            ];
            else if (this.set.length > 1) {
                // if we have any that are *, then the range is just *
                for (const c of this.set)if (c.length === 1 && $78b5fdc685b3bf08$var$isAny(c[0])) {
                    this.set = [
                        c
                    ];
                    break;
                }
            }
        }
        this.format();
    }
    format() {
        this.range = this.set.map((comps)=>{
            return comps.join(" ").trim();
        }).join("||").trim();
        return this.range;
    }
    toString() {
        return this.range;
    }
    parseRange(range) {
        range = range.trim();
        // memoize range parsing for performance.
        // this is a very hot path, and fully deterministic.
        const memoOpts = Object.keys(this.options).join(",");
        const memoKey = `parseRange:${memoOpts}:${range}`;
        const cached = $78b5fdc685b3bf08$var$cache.get(memoKey);
        if (cached) return cached;
        const loose = this.options.loose;
        // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
        const hr = loose ? $78b5fdc685b3bf08$require$re[$78b5fdc685b3bf08$require$t.HYPHENRANGELOOSE] : $78b5fdc685b3bf08$require$re[$78b5fdc685b3bf08$require$t.HYPHENRANGE];
        range = range.replace(hr, $78b5fdc685b3bf08$var$hyphenReplace(this.options.includePrerelease));
        $iQbhJ("hyphen replace", range);
        // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
        range = range.replace($78b5fdc685b3bf08$require$re[$78b5fdc685b3bf08$require$t.COMPARATORTRIM], $78b5fdc685b3bf08$require$comparatorTrimReplace);
        $iQbhJ("comparator trim", range);
        // `~ 1.2.3` => `~1.2.3`
        range = range.replace($78b5fdc685b3bf08$require$re[$78b5fdc685b3bf08$require$t.TILDETRIM], $78b5fdc685b3bf08$require$tildeTrimReplace);
        // `^ 1.2.3` => `^1.2.3`
        range = range.replace($78b5fdc685b3bf08$require$re[$78b5fdc685b3bf08$require$t.CARETTRIM], $78b5fdc685b3bf08$require$caretTrimReplace);
        // normalize spaces
        range = range.split(/\s+/).join(" ");
        // At this point, the range is completely trimmed and
        // ready to be split into comparators.
        let rangeList = range.split(" ").map((comp)=>$78b5fdc685b3bf08$var$parseComparator(comp, this.options)).join(" ").split(/\s+/)// >=0.0.0 is equivalent to *
        .map((comp)=>$78b5fdc685b3bf08$var$replaceGTE0(comp, this.options));
        if (loose) // in loose mode, throw out any that are not valid comparators
        rangeList = rangeList.filter((comp)=>{
            $iQbhJ("loose invalid filter", comp, this.options);
            return !!comp.match($78b5fdc685b3bf08$require$re[$78b5fdc685b3bf08$require$t.COMPARATORLOOSE]);
        });
        $iQbhJ("range list", rangeList);
        // if any comparators are the null set, then replace with JUST null set
        // if more than one comparator, remove any * comparators
        // also, don't include the same comparator more than once
        const rangeMap = new Map();
        const comparators = rangeList.map((comp)=>new $g39Mn(comp, this.options));
        for (const comp of comparators){
            if ($78b5fdc685b3bf08$var$isNullSet(comp)) return [
                comp
            ];
            rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) rangeMap.delete("");
        const result = [
            ...rangeMap.values()
        ];
        $78b5fdc685b3bf08$var$cache.set(memoKey, result);
        return result;
    }
    intersects(range, options) {
        if (!(range instanceof $78b5fdc685b3bf08$var$Range)) throw new TypeError("a Range is required");
        return this.set.some((thisComparators)=>{
            return $78b5fdc685b3bf08$var$isSatisfiable(thisComparators, options) && range.set.some((rangeComparators)=>{
                return $78b5fdc685b3bf08$var$isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator)=>{
                    return rangeComparators.every((rangeComparator)=>{
                        return thisComparator.intersects(rangeComparator, options);
                    });
                });
            });
        });
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(version) {
        if (!version) return false;
        if (typeof version === "string") try {
            version = new $cMlz8(version, this.options);
        } catch (er) {
            return false;
        }
        for(let i = 0; i < this.set.length; i++){
            if ($78b5fdc685b3bf08$var$testSet(this.set[i], version, this.options)) return true;
        }
        return false;
    }
}
module.exports = $78b5fdc685b3bf08$var$Range;

var $a7Q4V = parcelRequire("a7Q4V");
const $78b5fdc685b3bf08$var$cache = new $a7Q4V({
    max: 1000
});

var $glUsB = parcelRequire("glUsB");

var $g39Mn = parcelRequire("g39Mn");

var $iQbhJ = parcelRequire("iQbhJ");

var $cMlz8 = parcelRequire("cMlz8");

var $7B4tz = parcelRequire("7B4tz");
var $78b5fdc685b3bf08$require$re = $7B4tz.re;
var $78b5fdc685b3bf08$require$t = $7B4tz.t;
var $78b5fdc685b3bf08$require$comparatorTrimReplace = $7B4tz.comparatorTrimReplace;
var $78b5fdc685b3bf08$require$tildeTrimReplace = $7B4tz.tildeTrimReplace;
var $78b5fdc685b3bf08$require$caretTrimReplace = $7B4tz.caretTrimReplace;
const $78b5fdc685b3bf08$var$isNullSet = (c)=>c.value === "<0.0.0-0";
const $78b5fdc685b3bf08$var$isAny = (c)=>c.value === "";
// take a set of comparators and determine whether there
// exists a version which can satisfy it
const $78b5fdc685b3bf08$var$isSatisfiable = (comparators, options)=>{
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while(result && remainingComparators.length){
        result = remainingComparators.every((otherComparator)=>{
            return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
    }
    return result;
};
// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
const $78b5fdc685b3bf08$var$parseComparator = (comp, options)=>{
    $iQbhJ("comp", comp, options);
    comp = $78b5fdc685b3bf08$var$replaceCarets(comp, options);
    $iQbhJ("caret", comp);
    comp = $78b5fdc685b3bf08$var$replaceTildes(comp, options);
    $iQbhJ("tildes", comp);
    comp = $78b5fdc685b3bf08$var$replaceXRanges(comp, options);
    $iQbhJ("xrange", comp);
    comp = $78b5fdc685b3bf08$var$replaceStars(comp, options);
    $iQbhJ("stars", comp);
    return comp;
};
const $78b5fdc685b3bf08$var$isX = (id)=>!id || id.toLowerCase() === "x" || id === "*";
// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
const $78b5fdc685b3bf08$var$replaceTildes = (comp, options)=>comp.trim().split(/\s+/).map((c)=>{
        return $78b5fdc685b3bf08$var$replaceTilde(c, options);
    }).join(" ");
const $78b5fdc685b3bf08$var$replaceTilde = (comp, options)=>{
    const r = options.loose ? $78b5fdc685b3bf08$require$re[$78b5fdc685b3bf08$require$t.TILDELOOSE] : $78b5fdc685b3bf08$require$re[$78b5fdc685b3bf08$require$t.TILDE];
    return comp.replace(r, (_, M, m, p, pr)=>{
        $iQbhJ("tilde", comp, _, M, m, p, pr);
        let ret;
        if ($78b5fdc685b3bf08$var$isX(M)) ret = "";
        else if ($78b5fdc685b3bf08$var$isX(m)) ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        else if ($78b5fdc685b3bf08$var$isX(p)) // ~1.2 == >=1.2.0 <1.3.0-0
        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        else if (pr) {
            $iQbhJ("replaceTilde pr", pr);
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else // ~1.2.3 == >=1.2.3 <1.3.0-0
        ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        $iQbhJ("tilde return", ret);
        return ret;
    });
};
// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
// ^1.2.3 --> >=1.2.3 <2.0.0-0
// ^1.2.0 --> >=1.2.0 <2.0.0-0
const $78b5fdc685b3bf08$var$replaceCarets = (comp, options)=>comp.trim().split(/\s+/).map((c)=>{
        return $78b5fdc685b3bf08$var$replaceCaret(c, options);
    }).join(" ");
const $78b5fdc685b3bf08$var$replaceCaret = (comp, options)=>{
    $iQbhJ("caret", comp, options);
    const r = options.loose ? $78b5fdc685b3bf08$require$re[$78b5fdc685b3bf08$require$t.CARETLOOSE] : $78b5fdc685b3bf08$require$re[$78b5fdc685b3bf08$require$t.CARET];
    const z = options.includePrerelease ? "-0" : "";
    return comp.replace(r, (_, M, m, p, pr)=>{
        $iQbhJ("caret", comp, _, M, m, p, pr);
        let ret;
        if ($78b5fdc685b3bf08$var$isX(M)) ret = "";
        else if ($78b5fdc685b3bf08$var$isX(m)) ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        else if ($78b5fdc685b3bf08$var$isX(p)) {
            if (M === "0") ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
            else ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
        } else if (pr) {
            $iQbhJ("replaceCaret pr", pr);
            if (M === "0") {
                if (m === "0") ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
                else ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            } else ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
        } else {
            $iQbhJ("no pr");
            if (M === "0") {
                if (m === "0") ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
                else ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            } else ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
        }
        $iQbhJ("caret return", ret);
        return ret;
    });
};
const $78b5fdc685b3bf08$var$replaceXRanges = (comp, options)=>{
    $iQbhJ("replaceXRanges", comp, options);
    return comp.split(/\s+/).map((c)=>{
        return $78b5fdc685b3bf08$var$replaceXRange(c, options);
    }).join(" ");
};
const $78b5fdc685b3bf08$var$replaceXRange = (comp, options)=>{
    comp = comp.trim();
    const r = options.loose ? $78b5fdc685b3bf08$require$re[$78b5fdc685b3bf08$require$t.XRANGELOOSE] : $78b5fdc685b3bf08$require$re[$78b5fdc685b3bf08$require$t.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr)=>{
        $iQbhJ("xRange", comp, ret, gtlt, M, m, p, pr);
        const xM = $78b5fdc685b3bf08$var$isX(M);
        const xm = xM || $78b5fdc685b3bf08$var$isX(m);
        const xp = xm || $78b5fdc685b3bf08$var$isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) gtlt = "";
        // if we're including prereleases in the match, then we need
        // to fix this to -0, the lowest possible prerelease value
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
            if (gtlt === ">" || gtlt === "<") // nothing is allowed
            ret = "<0.0.0-0";
            else // nothing is forbidden
            ret = "*";
        } else if (gtlt && anyX) {
            // we know patch is an x, because we have any x at all.
            // replace X with 0
            if (xm) m = 0;
            p = 0;
            if (gtlt === ">") {
                // >1 => >=2.0.0
                // >1.2 => >=1.3.0
                gtlt = ">=";
                if (xm) {
                    M = +M + 1;
                    m = 0;
                    p = 0;
                } else {
                    m = +m + 1;
                    p = 0;
                }
            } else if (gtlt === "<=") {
                // <=0.7.x is actually <0.8.0, since any 0.7.x should
                // pass.  Similarly, <=7.x is actually <8.0.0, etc.
                gtlt = "<";
                if (xm) M = +M + 1;
                else m = +m + 1;
            }
            if (gtlt === "<") pr = "-0";
            ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        else if (xp) ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        $iQbhJ("xRange return", ret);
        return ret;
    });
};
// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
const $78b5fdc685b3bf08$var$replaceStars = (comp, options)=>{
    $iQbhJ("replaceStars", comp, options);
    // Looseness is ignored here.  star is always as loose as it gets!
    return comp.trim().replace($78b5fdc685b3bf08$require$re[$78b5fdc685b3bf08$require$t.STAR], "");
};
const $78b5fdc685b3bf08$var$replaceGTE0 = (comp, options)=>{
    $iQbhJ("replaceGTE0", comp, options);
    return comp.trim().replace($78b5fdc685b3bf08$require$re[options.includePrerelease ? $78b5fdc685b3bf08$require$t.GTE0PRE : $78b5fdc685b3bf08$require$t.GTE0], "");
};
// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0-0
const $78b5fdc685b3bf08$var$hyphenReplace = (incPr)=>($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb)=>{
        if ($78b5fdc685b3bf08$var$isX(fM)) from = "";
        else if ($78b5fdc685b3bf08$var$isX(fm)) from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
        else if ($78b5fdc685b3bf08$var$isX(fp)) from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
        else if (fpr) from = `>=${from}`;
        else from = `>=${from}${incPr ? "-0" : ""}`;
        if ($78b5fdc685b3bf08$var$isX(tM)) to = "";
        else if ($78b5fdc685b3bf08$var$isX(tm)) to = `<${+tM + 1}.0.0-0`;
        else if ($78b5fdc685b3bf08$var$isX(tp)) to = `<${tM}.${+tm + 1}.0-0`;
        else if (tpr) to = `<=${tM}.${tm}.${tp}-${tpr}`;
        else if (incPr) to = `<${tM}.${tm}.${+tp + 1}-0`;
        else to = `<=${to}`;
        return `${from} ${to}`.trim();
    };
const $78b5fdc685b3bf08$var$testSet = (set, version, options)=>{
    for(let i = 0; i < set.length; i++){
        if (!set[i].test(version)) return false;
    }
    if (version.prerelease.length && !options.includePrerelease) {
        // Find the set of versions that are allowed to have prereleases
        // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
        // That should allow `1.2.3-pr.2` to pass.
        // However, `1.2.4-alpha.notready` should NOT be allowed,
        // even though it's within the range set by the comparators.
        for(let i1 = 0; i1 < set.length; i1++){
            $iQbhJ(set[i1].semver);
            if (set[i1].semver === $g39Mn.ANY) continue;
            if (set[i1].semver.prerelease.length > 0) {
                const allowed = set[i1].semver;
                if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return true;
            }
        }
        // Version has a -pre, but it's not one of the ones we like.
        return false;
    }
    return true;
};

});
parcelRequire.register("a7Q4V", function(module, exports) {
const $75f2f483a8750099$var$perf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
const $75f2f483a8750099$var$hasAbortController = typeof AbortController !== "undefined";
// minimal backwards-compatibility polyfill
const $75f2f483a8750099$var$AC = $75f2f483a8750099$var$hasAbortController ? AbortController : Object.assign(class AbortController1 {
    constructor(){
        this.signal = new $75f2f483a8750099$var$AC.AbortSignal;
    }
    abort() {
        this.signal.aborted = true;
    }
}, {
    AbortSignal: class AbortSignal {
        constructor(){
            this.aborted = false;
        }
    }
});
const $75f2f483a8750099$var$warned = new Set();
const $75f2f483a8750099$var$deprecatedOption = (opt, instead)=>{
    const code = `LRU_CACHE_OPTION_${opt}`;
    if ($75f2f483a8750099$var$shouldWarn(code)) $75f2f483a8750099$var$warn(code, `${opt} option`, `options.${instead}`, $75f2f483a8750099$var$LRUCache);
};
const $75f2f483a8750099$var$deprecatedMethod = (method, instead)=>{
    const code = `LRU_CACHE_METHOD_${method}`;
    if ($75f2f483a8750099$var$shouldWarn(code)) {
        const { prototype: prototype  } = $75f2f483a8750099$var$LRUCache;
        const { get: get  } = Object.getOwnPropertyDescriptor(prototype, method);
        $75f2f483a8750099$var$warn(code, `${method} method`, `cache.${instead}()`, get);
    }
};
const $75f2f483a8750099$var$deprecatedProperty = (field, instead)=>{
    const code = `LRU_CACHE_PROPERTY_${field}`;
    if ($75f2f483a8750099$var$shouldWarn(code)) {
        const { prototype: prototype  } = $75f2f483a8750099$var$LRUCache;
        const { get: get  } = Object.getOwnPropertyDescriptor(prototype, field);
        $75f2f483a8750099$var$warn(code, `${field} property`, `cache.${instead}`, get);
    }
};
const $75f2f483a8750099$var$emitWarning = (...a)=>{
    typeof process === "object" && process && typeof process.emitWarning === "function" ? process.emitWarning(...a) : console.error(...a);
};
const $75f2f483a8750099$var$shouldWarn = (code)=>!$75f2f483a8750099$var$warned.has(code);
const $75f2f483a8750099$var$warn = (code, what, instead, fn)=>{
    $75f2f483a8750099$var$warned.add(code);
    const msg = `The ${what} is deprecated. Please use ${instead} instead.`;
    $75f2f483a8750099$var$emitWarning(msg, "DeprecationWarning", code, fn);
};
const $75f2f483a8750099$var$isPosInt = (n)=>n && n === Math.floor(n) && n > 0 && isFinite(n);
/* istanbul ignore next - This is a little bit ridiculous, tbh.
 * The maximum array length is 2^32-1 or thereabouts on most JS impls.
 * And well before that point, you're caching the entire world, I mean,
 * that's ~32GB of just integers for the next/prev links, plus whatever
 * else to hold that many keys and values.  Just filling the memory with
 * zeroes at init time is brutal when you get that big.
 * But why not be complete?
 * Maybe in the future, these limits will have expanded. */ const $75f2f483a8750099$var$getUintArray = (max)=>!$75f2f483a8750099$var$isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? $75f2f483a8750099$var$ZeroArray : null;
class $75f2f483a8750099$var$ZeroArray extends Array {
    constructor(size){
        super(size);
        this.fill(0);
    }
}
class $75f2f483a8750099$var$Stack {
    constructor(max){
        if (max === 0) return [];
        const UintArray = $75f2f483a8750099$var$getUintArray(max);
        this.heap = new UintArray(max);
        this.length = 0;
    }
    push(n) {
        this.heap[this.length++] = n;
    }
    pop() {
        return this.heap[--this.length];
    }
}
class $75f2f483a8750099$var$LRUCache {
    constructor(options = {}){
        const { max: max = 0 , ttl: ttl , ttlResolution: ttlResolution = 1 , ttlAutopurge: ttlAutopurge , updateAgeOnGet: updateAgeOnGet , updateAgeOnHas: updateAgeOnHas , allowStale: allowStale , dispose: dispose , disposeAfter: disposeAfter , noDisposeOnSet: noDisposeOnSet , noUpdateTTL: noUpdateTTL , maxSize: maxSize = 0 , sizeCalculation: sizeCalculation , fetchMethod: fetchMethod ,  } = options;
        // deprecated options, don't trigger a warning for getting them if
        // the thing being passed in is another LRUCache we're copying.
        const { length: length , maxAge: maxAge , stale: stale ,  } = options instanceof $75f2f483a8750099$var$LRUCache ? {} : options;
        if (max !== 0 && !$75f2f483a8750099$var$isPosInt(max)) throw new TypeError("max option must be a nonnegative integer");
        const UintArray = max ? $75f2f483a8750099$var$getUintArray(max) : Array;
        if (!UintArray) throw new Error("invalid max value: " + max);
        this.max = max;
        this.maxSize = maxSize;
        this.sizeCalculation = sizeCalculation || length;
        if (this.sizeCalculation) {
            if (!this.maxSize) throw new TypeError("cannot set sizeCalculation without setting maxSize");
            if (typeof this.sizeCalculation !== "function") throw new TypeError("sizeCalculation set to non-function");
        }
        this.fetchMethod = fetchMethod || null;
        if (this.fetchMethod && typeof this.fetchMethod !== "function") throw new TypeError("fetchMethod must be a function if specified");
        this.keyMap = new Map();
        this.keyList = new Array(max).fill(null);
        this.valList = new Array(max).fill(null);
        this.next = new UintArray(max);
        this.prev = new UintArray(max);
        this.head = 0;
        this.tail = 0;
        this.free = new $75f2f483a8750099$var$Stack(max);
        this.initialFill = 1;
        this.size = 0;
        if (typeof dispose === "function") this.dispose = dispose;
        if (typeof disposeAfter === "function") {
            this.disposeAfter = disposeAfter;
            this.disposed = [];
        } else {
            this.disposeAfter = null;
            this.disposed = null;
        }
        this.noDisposeOnSet = !!noDisposeOnSet;
        this.noUpdateTTL = !!noUpdateTTL;
        if (this.maxSize !== 0) {
            if (!$75f2f483a8750099$var$isPosInt(this.maxSize)) throw new TypeError("maxSize must be a positive integer if specified");
            this.initializeSizeTracking();
        }
        this.allowStale = !!allowStale || !!stale;
        this.updateAgeOnGet = !!updateAgeOnGet;
        this.updateAgeOnHas = !!updateAgeOnHas;
        this.ttlResolution = $75f2f483a8750099$var$isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
        this.ttlAutopurge = !!ttlAutopurge;
        this.ttl = ttl || maxAge || 0;
        if (this.ttl) {
            if (!$75f2f483a8750099$var$isPosInt(this.ttl)) throw new TypeError("ttl must be a positive integer if specified");
            this.initializeTTLTracking();
        }
        // do not allow completely unbounded caches
        if (this.max === 0 && this.ttl === 0 && this.maxSize === 0) throw new TypeError("At least one of max, maxSize, or ttl is required");
        if (!this.ttlAutopurge && !this.max && !this.maxSize) {
            const code = "LRU_CACHE_UNBOUNDED";
            if ($75f2f483a8750099$var$shouldWarn(code)) {
                $75f2f483a8750099$var$warned.add(code);
                const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
                $75f2f483a8750099$var$emitWarning(msg, "UnboundedCacheWarning", code, $75f2f483a8750099$var$LRUCache);
            }
        }
        if (stale) $75f2f483a8750099$var$deprecatedOption("stale", "allowStale");
        if (maxAge) $75f2f483a8750099$var$deprecatedOption("maxAge", "ttl");
        if (length) $75f2f483a8750099$var$deprecatedOption("length", "sizeCalculation");
    }
    getRemainingTTL(key) {
        return this.has(key, {
            updateAgeOnHas: false
        }) ? Infinity : 0;
    }
    initializeTTLTracking() {
        this.ttls = new $75f2f483a8750099$var$ZeroArray(this.max);
        this.starts = new $75f2f483a8750099$var$ZeroArray(this.max);
        this.setItemTTL = (index, ttl)=>{
            this.starts[index] = ttl !== 0 ? $75f2f483a8750099$var$perf.now() : 0;
            this.ttls[index] = ttl;
            if (ttl !== 0 && this.ttlAutopurge) {
                const t = setTimeout(()=>{
                    if (this.isStale(index)) this.delete(this.keyList[index]);
                }, ttl + 1);
                /* istanbul ignore else - unref() not supported on all platforms */ if (t.unref) t.unref();
            }
        };
        this.updateItemAge = (index)=>{
            this.starts[index] = this.ttls[index] !== 0 ? $75f2f483a8750099$var$perf.now() : 0;
        };
        // debounce calls to perf.now() to 1s so we're not hitting
        // that costly call repeatedly.
        let cachedNow = 0;
        const getNow = ()=>{
            const n = $75f2f483a8750099$var$perf.now();
            if (this.ttlResolution > 0) {
                cachedNow = n;
                const t = setTimeout(()=>cachedNow = 0, this.ttlResolution);
                /* istanbul ignore else - not available on all platforms */ if (t.unref) t.unref();
            }
            return n;
        };
        this.getRemainingTTL = (key)=>{
            const index = this.keyMap.get(key);
            if (index === undefined) return 0;
            return this.ttls[index] === 0 || this.starts[index] === 0 ? Infinity : this.starts[index] + this.ttls[index] - (cachedNow || getNow());
        };
        this.isStale = (index)=>{
            return this.ttls[index] !== 0 && this.starts[index] !== 0 && (cachedNow || getNow()) - this.starts[index] > this.ttls[index];
        };
    }
    updateItemAge(index) {}
    setItemTTL(index, ttl) {}
    isStale(index) {
        return false;
    }
    initializeSizeTracking() {
        this.calculatedSize = 0;
        this.sizes = new $75f2f483a8750099$var$ZeroArray(this.max);
        this.removeItemSize = (index)=>this.calculatedSize -= this.sizes[index];
        this.requireSize = (k, v, size, sizeCalculation)=>{
            if (!$75f2f483a8750099$var$isPosInt(size)) {
                if (sizeCalculation) {
                    if (typeof sizeCalculation !== "function") throw new TypeError("sizeCalculation must be a function");
                    size = sizeCalculation(v, k);
                    if (!$75f2f483a8750099$var$isPosInt(size)) throw new TypeError("sizeCalculation return invalid (expect positive integer)");
                } else throw new TypeError("invalid size value (must be positive integer)");
            }
            return size;
        };
        this.addItemSize = (index, v, k, size)=>{
            this.sizes[index] = size;
            const maxSize = this.maxSize - this.sizes[index];
            while(this.calculatedSize > maxSize)this.evict(true);
            this.calculatedSize += this.sizes[index];
        };
        this.delete = (k)=>{
            if (this.size !== 0) {
                const index = this.keyMap.get(k);
                if (index !== undefined) this.calculatedSize -= this.sizes[index];
            }
            return $75f2f483a8750099$var$LRUCache.prototype.delete.call(this, k);
        };
    }
    removeItemSize(index) {}
    addItemSize(index, v, k, size) {}
    requireSize(k, v, size, sizeCalculation) {
        if (size || sizeCalculation) throw new TypeError("cannot set size without setting maxSize on cache");
    }
    *indexes({ allowStale: allowStale = this.allowStale  } = {}) {
        if (this.size) for(let i = this.tail;;){
            if (!this.isValidIndex(i)) break;
            if (allowStale || !this.isStale(i)) yield i;
            if (i === this.head) break;
            else i = this.prev[i];
        }
    }
    *rindexes({ allowStale: allowStale = this.allowStale  } = {}) {
        if (this.size) for(let i = this.head;;){
            if (!this.isValidIndex(i)) break;
            if (allowStale || !this.isStale(i)) yield i;
            if (i === this.tail) break;
            else i = this.next[i];
        }
    }
    isValidIndex(index) {
        return this.keyMap.get(this.keyList[index]) === index;
    }
    *entries() {
        for (const i of this.indexes())yield [
            this.keyList[i],
            this.valList[i]
        ];
    }
    *rentries() {
        for (const i of this.rindexes())yield [
            this.keyList[i],
            this.valList[i]
        ];
    }
    *keys() {
        for (const i of this.indexes())yield this.keyList[i];
    }
    *rkeys() {
        for (const i of this.rindexes())yield this.keyList[i];
    }
    *values() {
        for (const i of this.indexes())yield this.valList[i];
    }
    *rvalues() {
        for (const i of this.rindexes())yield this.valList[i];
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    find(fn, getOptions = {}) {
        for (const i of this.indexes()){
            if (fn(this.valList[i], this.keyList[i], this)) return this.get(this.keyList[i], getOptions);
        }
    }
    forEach(fn, thisp = this) {
        for (const i of this.indexes())fn.call(thisp, this.valList[i], this.keyList[i], this);
    }
    rforEach(fn, thisp = this) {
        for (const i of this.rindexes())fn.call(thisp, this.valList[i], this.keyList[i], this);
    }
    get prune() {
        $75f2f483a8750099$var$deprecatedMethod("prune", "purgeStale");
        return this.purgeStale;
    }
    purgeStale() {
        let deleted = false;
        for (const i of this.rindexes({
            allowStale: true
        }))if (this.isStale(i)) {
            this.delete(this.keyList[i]);
            deleted = true;
        }
        return deleted;
    }
    dump() {
        const arr = [];
        for (const i of this.indexes()){
            const key = this.keyList[i];
            const value = this.valList[i];
            const entry = {
                value: value
            };
            if (this.ttls) entry.ttl = this.ttls[i];
            if (this.sizes) entry.size = this.sizes[i];
            arr.unshift([
                key,
                entry
            ]);
        }
        return arr;
    }
    load(arr) {
        this.clear();
        for (const [key, entry] of arr)this.set(key, entry.value, entry);
    }
    dispose(v, k, reason) {}
    set(k, v, { ttl: ttl = this.ttl , noDisposeOnSet: noDisposeOnSet = this.noDisposeOnSet , size: size = 0 , sizeCalculation: sizeCalculation = this.sizeCalculation , noUpdateTTL: noUpdateTTL = this.noUpdateTTL ,  } = {}) {
        size = this.requireSize(k, v, size, sizeCalculation);
        let index = this.size === 0 ? undefined : this.keyMap.get(k);
        if (index === undefined) {
            // addition
            index = this.newIndex();
            this.keyList[index] = k;
            this.valList[index] = v;
            this.keyMap.set(k, index);
            this.next[this.tail] = index;
            this.prev[index] = this.tail;
            this.tail = index;
            this.size++;
            this.addItemSize(index, v, k, size);
            noUpdateTTL = false;
        } else {
            // update
            const oldVal = this.valList[index];
            if (v !== oldVal) {
                if (this.isBackgroundFetch(oldVal)) oldVal.__abortController.abort();
                else if (!noDisposeOnSet) {
                    this.dispose(oldVal, k, "set");
                    if (this.disposeAfter) this.disposed.push([
                        oldVal,
                        k,
                        "set"
                    ]);
                }
                this.removeItemSize(index);
                this.valList[index] = v;
                this.addItemSize(index, v, k, size);
            }
            this.moveToTail(index);
        }
        if (ttl !== 0 && this.ttl === 0 && !this.ttls) this.initializeTTLTracking();
        if (!noUpdateTTL) this.setItemTTL(index, ttl);
        if (this.disposeAfter) while(this.disposed.length)this.disposeAfter(...this.disposed.shift());
        return this;
    }
    newIndex() {
        if (this.size === 0) return this.tail;
        if (this.size === this.max && this.max !== 0) return this.evict(false);
        if (this.free.length !== 0) return this.free.pop();
        // initial fill, just keep writing down the list
        return this.initialFill++;
    }
    pop() {
        if (this.size) {
            const val = this.valList[this.head];
            this.evict(true);
            return val;
        }
    }
    evict(free) {
        const head = this.head;
        const k = this.keyList[head];
        const v = this.valList[head];
        if (this.isBackgroundFetch(v)) v.__abortController.abort();
        else {
            this.dispose(v, k, "evict");
            if (this.disposeAfter) this.disposed.push([
                v,
                k,
                "evict"
            ]);
        }
        this.removeItemSize(head);
        // if we aren't about to use the index, then null these out
        if (free) {
            this.keyList[head] = null;
            this.valList[head] = null;
            this.free.push(head);
        }
        this.head = this.next[head];
        this.keyMap.delete(k);
        this.size--;
        return head;
    }
    has(k, { updateAgeOnHas: updateAgeOnHas = this.updateAgeOnHas  } = {}) {
        const index = this.keyMap.get(k);
        if (index !== undefined) {
            if (!this.isStale(index)) {
                if (updateAgeOnHas) this.updateItemAge(index);
                return true;
            }
        }
        return false;
    }
    // like get(), but without any LRU updating or TTL expiration
    peek(k, { allowStale: allowStale = this.allowStale  } = {}) {
        const index = this.keyMap.get(k);
        if (index !== undefined && (allowStale || !this.isStale(index))) return this.valList[index];
    }
    backgroundFetch(k, index, options) {
        const v = index === undefined ? undefined : this.valList[index];
        if (this.isBackgroundFetch(v)) return v;
        const ac = new $75f2f483a8750099$var$AC();
        const fetchOpts = {
            signal: ac.signal,
            options: options
        };
        const p = Promise.resolve(this.fetchMethod(k, v, fetchOpts)).then((v)=>{
            if (!ac.signal.aborted) this.set(k, v, fetchOpts.options);
            return v;
        });
        p.__abortController = ac;
        p.__staleWhileFetching = v;
        if (index === undefined) {
            this.set(k, p, fetchOpts.options);
            index = this.keyMap.get(k);
        } else this.valList[index] = p;
        return p;
    }
    isBackgroundFetch(p) {
        return p && typeof p === "object" && typeof p.then === "function" && Object.prototype.hasOwnProperty.call(p, "__staleWhileFetching");
    }
    // this takes the union of get() and set() opts, because it does both
    async fetch(k, { allowStale: allowStale = this.allowStale , updateAgeOnGet: updateAgeOnGet = this.updateAgeOnGet , ttl: ttl = this.ttl , noDisposeOnSet: noDisposeOnSet = this.noDisposeOnSet , size: size = 0 , sizeCalculation: sizeCalculation = this.sizeCalculation , noUpdateTTL: noUpdateTTL = this.noUpdateTTL ,  } = {}) {
        if (!this.fetchMethod) return this.get(k, {
            allowStale: allowStale,
            updateAgeOnGet: updateAgeOnGet
        });
        const options = {
            allowStale: allowStale,
            updateAgeOnGet: updateAgeOnGet,
            ttl: ttl,
            noDisposeOnSet: noDisposeOnSet,
            size: size,
            sizeCalculation: sizeCalculation,
            noUpdateTTL: noUpdateTTL
        };
        let index = this.keyMap.get(k);
        if (index === undefined) return this.backgroundFetch(k, index, options);
        else {
            // in cache, maybe already fetching
            const v = this.valList[index];
            if (this.isBackgroundFetch(v)) return allowStale && v.__staleWhileFetching !== undefined ? v.__staleWhileFetching : v;
            if (!this.isStale(index)) {
                this.moveToTail(index);
                if (updateAgeOnGet) this.updateItemAge(index);
                return v;
            }
            // ok, it is stale, and not already fetching
            // refresh the cache.
            const p = this.backgroundFetch(k, index, options);
            return allowStale && p.__staleWhileFetching !== undefined ? p.__staleWhileFetching : p;
        }
    }
    get(k, { allowStale: allowStale = this.allowStale , updateAgeOnGet: updateAgeOnGet = this.updateAgeOnGet ,  } = {}) {
        const index = this.keyMap.get(k);
        if (index !== undefined) {
            const value = this.valList[index];
            const fetching = this.isBackgroundFetch(value);
            if (this.isStale(index)) {
                // delete only if not an in-flight background fetch
                if (!fetching) {
                    this.delete(k);
                    return allowStale ? value : undefined;
                } else return allowStale ? value.__staleWhileFetching : undefined;
            } else {
                // if we're currently fetching it, we don't actually have it yet
                // it's not stale, which means this isn't a staleWhileRefetching,
                // so we just return undefined
                if (fetching) return undefined;
                this.moveToTail(index);
                if (updateAgeOnGet) this.updateItemAge(index);
                return value;
            }
        }
    }
    connect(p, n) {
        this.prev[n] = p;
        this.next[p] = n;
    }
    moveToTail(index) {
        // if tail already, nothing to do
        // if head, move head to next[index]
        // else
        //   move next[prev[index]] to next[index] (head has no prev)
        //   move prev[next[index]] to prev[index]
        // prev[index] = tail
        // next[tail] = index
        // tail = index
        if (index !== this.tail) {
            if (index === this.head) this.head = this.next[index];
            else this.connect(this.prev[index], this.next[index]);
            this.connect(this.tail, index);
            this.tail = index;
        }
    }
    get del() {
        $75f2f483a8750099$var$deprecatedMethod("del", "delete");
        return this.delete;
    }
    delete(k) {
        let deleted = false;
        if (this.size !== 0) {
            const index = this.keyMap.get(k);
            if (index !== undefined) {
                deleted = true;
                if (this.size === 1) this.clear();
                else {
                    this.removeItemSize(index);
                    const v = this.valList[index];
                    if (this.isBackgroundFetch(v)) v.__abortController.abort();
                    else {
                        this.dispose(v, k, "delete");
                        if (this.disposeAfter) this.disposed.push([
                            v,
                            k,
                            "delete"
                        ]);
                    }
                    this.keyMap.delete(k);
                    this.keyList[index] = null;
                    this.valList[index] = null;
                    if (index === this.tail) this.tail = this.prev[index];
                    else if (index === this.head) this.head = this.next[index];
                    else {
                        this.next[this.prev[index]] = this.next[index];
                        this.prev[this.next[index]] = this.prev[index];
                    }
                    this.size--;
                    this.free.push(index);
                }
            }
        }
        if (this.disposed) while(this.disposed.length)this.disposeAfter(...this.disposed.shift());
        return deleted;
    }
    clear() {
        for (const index of this.rindexes({
            allowStale: true
        })){
            const v = this.valList[index];
            if (this.isBackgroundFetch(v)) v.__abortController.abort();
            else {
                const k = this.keyList[index];
                this.dispose(v, k, "delete");
                if (this.disposeAfter) this.disposed.push([
                    v,
                    k,
                    "delete"
                ]);
            }
        }
        this.keyMap.clear();
        this.valList.fill(null);
        this.keyList.fill(null);
        if (this.ttls) {
            this.ttls.fill(0);
            this.starts.fill(0);
        }
        if (this.sizes) this.sizes.fill(0);
        this.head = 0;
        this.tail = 0;
        this.initialFill = 1;
        this.free.length = 0;
        this.calculatedSize = 0;
        this.size = 0;
        if (this.disposed) while(this.disposed.length)this.disposeAfter(...this.disposed.shift());
    }
    get reset() {
        $75f2f483a8750099$var$deprecatedMethod("reset", "clear");
        return this.clear;
    }
    get length() {
        $75f2f483a8750099$var$deprecatedProperty("length", "size");
        return this.size;
    }
}
module.exports = $75f2f483a8750099$var$LRUCache;

});



parcelRequire.register("dVFEG", function(module, exports) {

var $amxyM = parcelRequire("amxyM");
const $a240e90f53a1aa11$var$satisfies = (version, range, options)=>{
    try {
        range = new $amxyM(range, options);
    } catch (er) {
        return false;
    }
    return range.test(version);
};
module.exports = $a240e90f53a1aa11$var$satisfies;

});

parcelRequire.register("lxbDr", function(module, exports) {

var $amxyM = parcelRequire("amxyM");
// Mostly just for testing and legacy API reasons
const $fad5b483efbc2c02$var$toComparators = (range, options)=>new $amxyM(range, options).set.map((comp)=>comp.map((c)=>c.value).join(" ").trim().split(" "));
module.exports = $fad5b483efbc2c02$var$toComparators;

});

parcelRequire.register("lDVw1", function(module, exports) {

var $cMlz8 = parcelRequire("cMlz8");

var $amxyM = parcelRequire("amxyM");
const $fc19dadc96d0778f$var$maxSatisfying = (versions, range, options)=>{
    let max = null;
    let maxSV = null;
    let rangeObj = null;
    try {
        rangeObj = new $amxyM(range, options);
    } catch (er) {
        return null;
    }
    versions.forEach((v)=>{
        if (rangeObj.test(v)) // satisfies(v, range, options)
        {
            if (!max || maxSV.compare(v) === -1) {
                // compare(max, v, true)
                max = v;
                maxSV = new $cMlz8(max, options);
            }
        }
    });
    return max;
};
module.exports = $fc19dadc96d0778f$var$maxSatisfying;

});

parcelRequire.register("lUre0", function(module, exports) {

var $cMlz8 = parcelRequire("cMlz8");

var $amxyM = parcelRequire("amxyM");
const $ff33f23ca79dd224$var$minSatisfying = (versions, range, options)=>{
    let min = null;
    let minSV = null;
    let rangeObj = null;
    try {
        rangeObj = new $amxyM(range, options);
    } catch (er) {
        return null;
    }
    versions.forEach((v)=>{
        if (rangeObj.test(v)) // satisfies(v, range, options)
        {
            if (!min || minSV.compare(v) === 1) {
                // compare(min, v, true)
                min = v;
                minSV = new $cMlz8(min, options);
            }
        }
    });
    return min;
};
module.exports = $ff33f23ca79dd224$var$minSatisfying;

});

parcelRequire.register("fpRgu", function(module, exports) {

var $cMlz8 = parcelRequire("cMlz8");

var $amxyM = parcelRequire("amxyM");

var $5AjSi = parcelRequire("5AjSi");
const $b392821eb7606911$var$minVersion = (range, loose)=>{
    range = new $amxyM(range, loose);
    let minver = new $cMlz8("0.0.0");
    if (range.test(minver)) return minver;
    minver = new $cMlz8("0.0.0-0");
    if (range.test(minver)) return minver;
    minver = null;
    for(let i = 0; i < range.set.length; ++i){
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator)=>{
            // Clone to avoid manipulating the comparator's semver object.
            const compver = new $cMlz8(comparator.semver.version);
            switch(comparator.operator){
                case ">":
                    if (compver.prerelease.length === 0) compver.patch++;
                    else compver.prerelease.push(0);
                    compver.raw = compver.format();
                /* fallthrough */ case "":
                case ">=":
                    if (!setMin || $5AjSi(compver, setMin)) setMin = compver;
                    break;
                case "<":
                case "<=":
                    break;
                /* istanbul ignore next */ default:
                    throw new Error(`Unexpected operation: ${comparator.operator}`);
            }
        });
        if (setMin && (!minver || $5AjSi(minver, setMin))) minver = setMin;
    }
    if (minver && range.test(minver)) return minver;
    return null;
};
module.exports = $b392821eb7606911$var$minVersion;

});

parcelRequire.register("04YGR", function(module, exports) {

var $amxyM = parcelRequire("amxyM");
const $00ef73a662a30bc3$var$validRange = (range, options)=>{
    try {
        // Return '*' instead of '' so that truthiness works.
        // This will throw if it's invalid anyway
        return new $amxyM(range, options).range || "*";
    } catch (er) {
        return null;
    }
};
module.exports = $00ef73a662a30bc3$var$validRange;

});

parcelRequire.register("fokkL", function(module, exports) {

var $cMlz8 = parcelRequire("cMlz8");

var $g39Mn = parcelRequire("g39Mn");
const { ANY: $b348deca4a642e3d$var$ANY  } = $g39Mn;

var $amxyM = parcelRequire("amxyM");

var $dVFEG = parcelRequire("dVFEG");

var $5AjSi = parcelRequire("5AjSi");

var $fHaxc = parcelRequire("fHaxc");

var $lP7aG = parcelRequire("lP7aG");

var $gAEwK = parcelRequire("gAEwK");
const $b348deca4a642e3d$var$outside = (version, range, hilo, options)=>{
    version = new $cMlz8(version, options);
    range = new $amxyM(range, options);
    let gtfn, ltefn, ltfn, comp, ecomp;
    switch(hilo){
        case ">":
            gtfn = $5AjSi;
            ltefn = $lP7aG;
            ltfn = $fHaxc;
            comp = ">";
            ecomp = ">=";
            break;
        case "<":
            gtfn = $fHaxc;
            ltefn = $gAEwK;
            ltfn = $5AjSi;
            comp = "<";
            ecomp = "<=";
            break;
        default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    // If it satisfies the range it is not outside
    if ($dVFEG(version, range, options)) return false;
    // From now on, variable terms are as if we're in "gtr" mode.
    // but note that everything is flipped for the "ltr" function.
    for(let i = 0; i < range.set.length; ++i){
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator)=>{
            if (comparator.semver === $b348deca4a642e3d$var$ANY) comparator = new $g39Mn(">=0.0.0");
            high = high || comparator;
            low = low || comparator;
            if (gtfn(comparator.semver, high.semver, options)) high = comparator;
            else if (ltfn(comparator.semver, low.semver, options)) low = comparator;
        });
        // If the edge version comparator has a operator then our version
        // isn't outside it
        if (high.operator === comp || high.operator === ecomp) return false;
        // If the lowest version comparator has an operator and our version
        // is less than it then it isn't higher than the range
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) return false;
        else if (low.operator === ecomp && ltfn(version, low.semver)) return false;
    }
    return true;
};
module.exports = $b348deca4a642e3d$var$outside;

});

parcelRequire.register("8sqEB", function(module, exports) {

var $fokkL = parcelRequire("fokkL");
const $62859d2a0bd23b28$var$gtr = (version, range, options)=>$fokkL(version, range, ">", options);
module.exports = $62859d2a0bd23b28$var$gtr;

});

parcelRequire.register("eTS3H", function(module, exports) {

var $fokkL = parcelRequire("fokkL");
// Determine if version is less than all the versions possible in the range
const $ad9022af24f9eb83$var$ltr = (version, range, options)=>$fokkL(version, range, "<", options);
module.exports = $ad9022af24f9eb83$var$ltr;

});

parcelRequire.register("fPSDL", function(module, exports) {

var $amxyM = parcelRequire("amxyM");
const $b87600dd688ad0f2$var$intersects = (r1, r2, options)=>{
    r1 = new $amxyM(r1, options);
    r2 = new $amxyM(r2, options);
    return r1.intersects(r2);
};
module.exports = $b87600dd688ad0f2$var$intersects;

});

parcelRequire.register("7OGJZ", function(module, exports) {

var $dVFEG = parcelRequire("dVFEG");

var $7i3IQ = parcelRequire("7i3IQ");
module.exports = (versions, range, options)=>{
    const set = [];
    let first = null;
    let prev = null;
    const v = versions.sort((a, b)=>$7i3IQ(a, b, options));
    for (const version of v){
        const included = $dVFEG(version, range, options);
        if (included) {
            prev = version;
            if (!first) first = version;
        } else {
            if (prev) set.push([
                first,
                prev
            ]);
            prev = null;
            first = null;
        }
    }
    if (first) set.push([
        first,
        null
    ]);
    const ranges = [];
    for (const [min, max] of set){
        if (min === max) ranges.push(min);
        else if (!max && min === v[0]) ranges.push("*");
        else if (!max) ranges.push(`>=${min}`);
        else if (min === v[0]) ranges.push(`<=${max}`);
        else ranges.push(`${min} - ${max}`);
    }
    const simplified = ranges.join(" || ");
    const original = typeof range.raw === "string" ? range.raw : String(range);
    return simplified.length < original.length ? simplified : range;
};

});

parcelRequire.register("kxkVU", function(module, exports) {

var $amxyM = parcelRequire("amxyM");

var $g39Mn = parcelRequire("g39Mn");
const { ANY: $ef3720983bbb16f9$var$ANY  } = $g39Mn;

var $dVFEG = parcelRequire("dVFEG");

var $7i3IQ = parcelRequire("7i3IQ");
// Complex range `r1 || r2 || ...` is a subset of `R1 || R2 || ...` iff:
// - Every simple range `r1, r2, ...` is a null set, OR
// - Every simple range `r1, r2, ...` which is not a null set is a subset of
//   some `R1, R2, ...`
//
// Simple range `c1 c2 ...` is a subset of simple range `C1 C2 ...` iff:
// - If c is only the ANY comparator
//   - If C is only the ANY comparator, return true
//   - Else if in prerelease mode, return false
//   - else replace c with `[>=0.0.0]`
// - If C is only the ANY comparator
//   - if in prerelease mode, return true
//   - else replace C with `[>=0.0.0]`
// - Let EQ be the set of = comparators in c
// - If EQ is more than one, return true (null set)
// - Let GT be the highest > or >= comparator in c
// - Let LT be the lowest < or <= comparator in c
// - If GT and LT, and GT.semver > LT.semver, return true (null set)
// - If any C is a = range, and GT or LT are set, return false
// - If EQ
//   - If GT, and EQ does not satisfy GT, return true (null set)
//   - If LT, and EQ does not satisfy LT, return true (null set)
//   - If EQ satisfies every C, return true
//   - Else return false
// - If GT
//   - If GT.semver is lower than any > or >= comp in C, return false
//   - If GT is >=, and GT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the GT.semver tuple, return false
// - If LT
//   - If LT.semver is greater than any < or <= comp in C, return false
//   - If LT is <=, and LT.semver does not satisfy every C, return false
//   - If GT.semver has a prerelease, and not in prerelease mode
//     - If no C has a prerelease and the LT.semver tuple, return false
// - Else return true
const $ef3720983bbb16f9$var$subset = (sub, dom, options = {})=>{
    if (sub === dom) return true;
    sub = new $amxyM(sub, options);
    dom = new $amxyM(dom, options);
    let sawNonNull = false;
    OUTER: for (const simpleSub of sub.set){
        for (const simpleDom of dom.set){
            const isSub = $ef3720983bbb16f9$var$simpleSubset(simpleSub, simpleDom, options);
            sawNonNull = sawNonNull || isSub !== null;
            if (isSub) continue OUTER;
        }
        // the null set is a subset of everything, but null simple ranges in
        // a complex range should be ignored.  so if we saw a non-null range,
        // then we know this isn't a subset, but if EVERY simple range was null,
        // then it is a subset.
        if (sawNonNull) return false;
    }
    return true;
};
const $ef3720983bbb16f9$var$simpleSubset = (sub, dom, options)=>{
    if (sub === dom) return true;
    if (sub.length === 1 && sub[0].semver === $ef3720983bbb16f9$var$ANY) {
        if (dom.length === 1 && dom[0].semver === $ef3720983bbb16f9$var$ANY) return true;
        else if (options.includePrerelease) sub = [
            new $g39Mn(">=0.0.0-0")
        ];
        else sub = [
            new $g39Mn(">=0.0.0")
        ];
    }
    if (dom.length === 1 && dom[0].semver === $ef3720983bbb16f9$var$ANY) {
        if (options.includePrerelease) return true;
        else dom = [
            new $g39Mn(">=0.0.0")
        ];
    }
    const eqSet = new Set();
    let gt, lt;
    for (const c of sub){
        if (c.operator === ">" || c.operator === ">=") gt = $ef3720983bbb16f9$var$higherGT(gt, c, options);
        else if (c.operator === "<" || c.operator === "<=") lt = $ef3720983bbb16f9$var$lowerLT(lt, c, options);
        else eqSet.add(c.semver);
    }
    if (eqSet.size > 1) return null;
    let gtltComp;
    if (gt && lt) {
        gtltComp = $7i3IQ(gt.semver, lt.semver, options);
        if (gtltComp > 0) return null;
        else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) return null;
    }
    // will iterate one or zero times
    for (const eq of eqSet){
        if (gt && !$dVFEG(eq, String(gt), options)) return null;
        if (lt && !$dVFEG(eq, String(lt), options)) return null;
        for (const c1 of dom){
            if (!$dVFEG(eq, String(c1), options)) return false;
        }
        return true;
    }
    let higher, lower;
    let hasDomLT, hasDomGT;
    // if the subset has a prerelease, we need a comparator in the superset
    // with the same tuple and a prerelease, or it's not a subset
    let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
    let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
    // exception: <1.2.3-0 is the same as <1.2.3
    if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) needDomLTPre = false;
    for (const c2 of dom){
        hasDomGT = hasDomGT || c2.operator === ">" || c2.operator === ">=";
        hasDomLT = hasDomLT || c2.operator === "<" || c2.operator === "<=";
        if (gt) {
            if (needDomGTPre) {
                if (c2.semver.prerelease && c2.semver.prerelease.length && c2.semver.major === needDomGTPre.major && c2.semver.minor === needDomGTPre.minor && c2.semver.patch === needDomGTPre.patch) needDomGTPre = false;
            }
            if (c2.operator === ">" || c2.operator === ">=") {
                higher = $ef3720983bbb16f9$var$higherGT(gt, c2, options);
                if (higher === c2 && higher !== gt) return false;
            } else if (gt.operator === ">=" && !$dVFEG(gt.semver, String(c2), options)) return false;
        }
        if (lt) {
            if (needDomLTPre) {
                if (c2.semver.prerelease && c2.semver.prerelease.length && c2.semver.major === needDomLTPre.major && c2.semver.minor === needDomLTPre.minor && c2.semver.patch === needDomLTPre.patch) needDomLTPre = false;
            }
            if (c2.operator === "<" || c2.operator === "<=") {
                lower = $ef3720983bbb16f9$var$lowerLT(lt, c2, options);
                if (lower === c2 && lower !== lt) return false;
            } else if (lt.operator === "<=" && !$dVFEG(lt.semver, String(c2), options)) return false;
        }
        if (!c2.operator && (lt || gt) && gtltComp !== 0) return false;
    }
    // if there was a < or >, and nothing in the dom, then must be false
    // UNLESS it was limited by another range in the other direction.
    // Eg, >1.0.0 <1.0.1 is still a subset of <2.0.0
    if (gt && hasDomLT && !lt && gtltComp !== 0) return false;
    if (lt && hasDomGT && !gt && gtltComp !== 0) return false;
    // we needed a prerelease range in a specific tuple, but didn't get one
    // then this isn't a subset.  eg >=1.2.3-pre is not a subset of >=1.0.0,
    // because it includes prereleases in the 1.2.3 tuple
    if (needDomGTPre || needDomLTPre) return false;
    return true;
};
// >=1.2.3 is lower than >1.2.3
const $ef3720983bbb16f9$var$higherGT = (a, b, options)=>{
    if (!a) return b;
    const comp = $7i3IQ(a.semver, b.semver, options);
    return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
};
// <=1.2.3 is higher than <1.2.3
const $ef3720983bbb16f9$var$lowerLT = (a, b, options)=>{
    if (!a) return b;
    const comp = $7i3IQ(a.semver, b.semver, options);
    return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
};
module.exports = $ef3720983bbb16f9$var$subset;

});



parcelRequire.register("96ILy", function(module, exports) {

var $9oshp = parcelRequire("9oshp");

var $9HcM0 = parcelRequire("9HcM0");
function $6a17662ee8f3c789$var$v4(options, buf, offset) {
    var i = buf && offset || 0;
    if (typeof options == "string") {
        buf = options === "binary" ? new Array(16) : null;
        options = null;
    }
    options = options || {};
    var rnds = options.random || (options.rng || $9oshp)();
    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80;
    // Copy bytes to buffer, if provided
    if (buf) for(var ii = 0; ii < 16; ++ii)buf[i + ii] = rnds[ii];
    return buf || $9HcM0(rnds);
}
module.exports = $6a17662ee8f3c789$var$v4;

});
parcelRequire.register("9oshp", function(module, exports) {

module.exports = function nodeRNG() {
    return $dQzAa$crypto.randomBytes(16);
};

});

parcelRequire.register("9HcM0", function(module, exports) {
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ var $70f209ba826e754d$var$byteToHex = [];
for(var $70f209ba826e754d$var$i = 0; $70f209ba826e754d$var$i < 256; ++$70f209ba826e754d$var$i)$70f209ba826e754d$var$byteToHex[$70f209ba826e754d$var$i] = ($70f209ba826e754d$var$i + 0x100).toString(16).substr(1);
function $70f209ba826e754d$var$bytesToUuid(buf, offset) {
    var i = offset || 0;
    var bth = $70f209ba826e754d$var$byteToHex;
    // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
    return [
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        "-",
        bth[buf[i++]],
        bth[buf[i++]],
        "-",
        bth[buf[i++]],
        bth[buf[i++]],
        "-",
        bth[buf[i++]],
        bth[buf[i++]],
        "-",
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]]
    ].join("");
}
module.exports = $70f209ba826e754d$var$bytesToUuid;

});


parcelRequire.register("jEF4C", function(module, exports) {
"use strict";
var $e4f19d1059d6b458$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $e4f19d1059d6b458$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $e4f19d1059d6b458$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $e4f19d1059d6b458$var$__createBinding(result, mod, k);
    }
    $e4f19d1059d6b458$var$__setModuleDefault(result, mod);
    return result;
};
var $e4f19d1059d6b458$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.getExecOutput = module.exports.exec = void 0;


const $e4f19d1059d6b458$var$tr = $e4f19d1059d6b458$var$__importStar((parcelRequire("bQsiR")));
/**
 * Exec a command.
 * Output will be streamed to the live console.
 * Returns promise with return code
 *
 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
 * @param     args               optional arguments for tool. Escaping is handled by the lib.
 * @param     options            optional exec options.  See ExecOptions
 * @returns   Promise<number>    exit code
 */ function $e4f19d1059d6b458$var$exec(commandLine, args, options) {
    return $e4f19d1059d6b458$var$__awaiter(this, void 0, void 0, function*() {
        const commandArgs = $e4f19d1059d6b458$var$tr.argStringToArray(commandLine);
        if (commandArgs.length === 0) throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
        // Path to tool to execute should be first arg
        const toolPath = commandArgs[0];
        args = commandArgs.slice(1).concat(args || []);
        const runner = new $e4f19d1059d6b458$var$tr.ToolRunner(toolPath, args, options);
        return runner.exec();
    });
}
module.exports.exec = $e4f19d1059d6b458$var$exec;
/**
 * Exec a command and get the output.
 * Output will be streamed to the live console.
 * Returns promise with the exit code and collected stdout and stderr
 *
 * @param     commandLine           command to execute (can include additional args). Must be correctly escaped.
 * @param     args                  optional arguments for tool. Escaping is handled by the lib.
 * @param     options               optional exec options.  See ExecOptions
 * @returns   Promise<ExecOutput>   exit code, stdout, and stderr
 */ function $e4f19d1059d6b458$var$getExecOutput(commandLine, args, options) {
    var _a, _b;
    return $e4f19d1059d6b458$var$__awaiter(this, void 0, void 0, function*() {
        let stdout = "";
        let stderr = "";
        //Using string decoder covers the case where a mult-byte character is split
        const stdoutDecoder = new $dQzAa$string_decoder.StringDecoder("utf8");
        const stderrDecoder = new $dQzAa$string_decoder.StringDecoder("utf8");
        const originalStdoutListener = (_a = options === null || options === void 0 ? void 0 : options.listeners) === null || _a === void 0 ? void 0 : _a.stdout;
        const originalStdErrListener = (_b = options === null || options === void 0 ? void 0 : options.listeners) === null || _b === void 0 ? void 0 : _b.stderr;
        const stdErrListener = (data)=>{
            stderr += stderrDecoder.write(data);
            if (originalStdErrListener) originalStdErrListener(data);
        };
        const stdOutListener = (data)=>{
            stdout += stdoutDecoder.write(data);
            if (originalStdoutListener) originalStdoutListener(data);
        };
        const listeners = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.listeners), {
            stdout: stdOutListener,
            stderr: stdErrListener
        });
        const exitCode = yield $e4f19d1059d6b458$var$exec(commandLine, args, Object.assign(Object.assign({}, options), {
            listeners: listeners
        }));
        //flush any remaining characters
        stdout += stdoutDecoder.end();
        stderr += stderrDecoder.end();
        return {
            exitCode: exitCode,
            stdout: stdout,
            stderr: stderr
        };
    });
}
module.exports.getExecOutput = $e4f19d1059d6b458$var$getExecOutput;

});
parcelRequire.register("bQsiR", function(module, exports) {
"use strict";
var $89fa817a3df148e1$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $89fa817a3df148e1$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $89fa817a3df148e1$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $89fa817a3df148e1$var$__createBinding(result, mod, k);
    }
    $89fa817a3df148e1$var$__setModuleDefault(result, mod);
    return result;
};
var $89fa817a3df148e1$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.argStringToArray = module.exports.ToolRunner = void 0;

const $89fa817a3df148e1$var$os = $89fa817a3df148e1$var$__importStar($dQzAa$os);

const $89fa817a3df148e1$var$events = $89fa817a3df148e1$var$__importStar($dQzAa$events);

const $89fa817a3df148e1$var$child = $89fa817a3df148e1$var$__importStar($dQzAa$child_process);

const $89fa817a3df148e1$var$path = $89fa817a3df148e1$var$__importStar($dQzAa$path);

const $89fa817a3df148e1$var$io = $89fa817a3df148e1$var$__importStar((parcelRequire("9oxKF")));

const $89fa817a3df148e1$var$ioUtil = $89fa817a3df148e1$var$__importStar((parcelRequire("246jA")));

/* eslint-disable @typescript-eslint/unbound-method */ const $89fa817a3df148e1$var$IS_WINDOWS = process.platform === "win32";
/*
 * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
 */ class $89fa817a3df148e1$var$ToolRunner extends $89fa817a3df148e1$var$events.EventEmitter {
    constructor(toolPath, args, options){
        super();
        if (!toolPath) throw new Error("Parameter 'toolPath' cannot be null or empty.");
        this.toolPath = toolPath;
        this.args = args || [];
        this.options = options || {};
    }
    _debug(message) {
        if (this.options.listeners && this.options.listeners.debug) this.options.listeners.debug(message);
    }
    _getCommandString(options, noPrefix) {
        const toolPath = this._getSpawnFileName();
        const args = this._getSpawnArgs(options);
        let cmd = noPrefix ? "" : "[command]"; // omit prefix when piped to a second tool
        if ($89fa817a3df148e1$var$IS_WINDOWS) {
            // Windows + cmd file
            if (this._isCmdFile()) {
                cmd += toolPath;
                for (const a of args)cmd += ` ${a}`;
            } else if (options.windowsVerbatimArguments) {
                cmd += `"${toolPath}"`;
                for (const a1 of args)cmd += ` ${a1}`;
            } else {
                cmd += this._windowsQuoteCmdArg(toolPath);
                for (const a2 of args)cmd += ` ${this._windowsQuoteCmdArg(a2)}`;
            }
        } else {
            // OSX/Linux - this can likely be improved with some form of quoting.
            // creating processes on Unix is fundamentally different than Windows.
            // on Unix, execvp() takes an arg array.
            cmd += toolPath;
            for (const a3 of args)cmd += ` ${a3}`;
        }
        return cmd;
    }
    _processLineBuffer(data, strBuffer, onLine) {
        try {
            let s = strBuffer + data.toString();
            let n = s.indexOf($89fa817a3df148e1$var$os.EOL);
            while(n > -1){
                const line = s.substring(0, n);
                onLine(line);
                // the rest of the string ...
                s = s.substring(n + $89fa817a3df148e1$var$os.EOL.length);
                n = s.indexOf($89fa817a3df148e1$var$os.EOL);
            }
            return s;
        } catch (err) {
            // streaming lines to console is best effort.  Don't fail a build.
            this._debug(`error processing line. Failed with error ${err}`);
            return "";
        }
    }
    _getSpawnFileName() {
        if ($89fa817a3df148e1$var$IS_WINDOWS) {
            if (this._isCmdFile()) return process.env["COMSPEC"] || "cmd.exe";
        }
        return this.toolPath;
    }
    _getSpawnArgs(options) {
        if ($89fa817a3df148e1$var$IS_WINDOWS) {
            if (this._isCmdFile()) {
                let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
                for (const a of this.args){
                    argline += " ";
                    argline += options.windowsVerbatimArguments ? a : this._windowsQuoteCmdArg(a);
                }
                argline += '"';
                return [
                    argline
                ];
            }
        }
        return this.args;
    }
    _endsWith(str, end) {
        return str.endsWith(end);
    }
    _isCmdFile() {
        const upperToolPath = this.toolPath.toUpperCase();
        return this._endsWith(upperToolPath, ".CMD") || this._endsWith(upperToolPath, ".BAT");
    }
    _windowsQuoteCmdArg(arg) {
        // for .exe, apply the normal quoting rules that libuv applies
        if (!this._isCmdFile()) return this._uvQuoteCmdArg(arg);
        // otherwise apply quoting rules specific to the cmd.exe command line parser.
        // the libuv rules are generic and are not designed specifically for cmd.exe
        // command line parser.
        //
        // for a detailed description of the cmd.exe command line parser, refer to
        // http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
        // need quotes for empty arg
        if (!arg) return '""';
        // determine whether the arg needs to be quoted
        const cmdSpecialChars = [
            " ",
            "	",
            "&",
            "(",
            ")",
            "[",
            "]",
            "{",
            "}",
            "^",
            "=",
            ";",
            "!",
            "'",
            "+",
            ",",
            "`",
            "~",
            "|",
            "<",
            ">",
            '"'
        ];
        let needsQuotes = false;
        for (const char of arg)if (cmdSpecialChars.some((x)=>x === char)) {
            needsQuotes = true;
            break;
        }
        // short-circuit if quotes not needed
        if (!needsQuotes) return arg;
        // the following quoting rules are very similar to the rules that by libuv applies.
        //
        // 1) wrap the string in quotes
        //
        // 2) double-up quotes - i.e. " => ""
        //
        //    this is different from the libuv quoting rules. libuv replaces " with \", which unfortunately
        //    doesn't work well with a cmd.exe command line.
        //
        //    note, replacing " with "" also works well if the arg is passed to a downstream .NET console app.
        //    for example, the command line:
        //          foo.exe "myarg:""my val"""
        //    is parsed by a .NET console app into an arg array:
        //          [ "myarg:\"my val\"" ]
        //    which is the same end result when applying libuv quoting rules. although the actual
        //    command line from libuv quoting rules would look like:
        //          foo.exe "myarg:\"my val\""
        //
        // 3) double-up slashes that precede a quote,
        //    e.g.  hello \world    => "hello \world"
        //          hello\"world    => "hello\\""world"
        //          hello\\"world   => "hello\\\\""world"
        //          hello world\    => "hello world\\"
        //
        //    technically this is not required for a cmd.exe command line, or the batch argument parser.
        //    the reasons for including this as a .cmd quoting rule are:
        //
        //    a) this is optimized for the scenario where the argument is passed from the .cmd file to an
        //       external program. many programs (e.g. .NET console apps) rely on the slash-doubling rule.
        //
        //    b) it's what we've been doing previously (by deferring to node default behavior) and we
        //       haven't heard any complaints about that aspect.
        //
        // note, a weakness of the quoting rules chosen here, is that % is not escaped. in fact, % cannot be
        // escaped when used on the command line directly - even though within a .cmd file % can be escaped
        // by using %%.
        //
        // the saving grace is, on the command line, %var% is left as-is if var is not defined. this contrasts
        // the line parsing rules within a .cmd file, where if var is not defined it is replaced with nothing.
        //
        // one option that was explored was replacing % with ^% - i.e. %var% => ^%var^%. this hack would
        // often work, since it is unlikely that var^ would exist, and the ^ character is removed when the
        // variable is used. the problem, however, is that ^ is not removed when %* is used to pass the args
        // to an external program.
        //
        // an unexplored potential solution for the % escaping problem, is to create a wrapper .cmd file.
        // % can be escaped within a .cmd file.
        let reverse = '"';
        let quoteHit = true;
        for(let i = arg.length; i > 0; i--){
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === "\\") reverse += "\\"; // double the slash
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '"'; // double the quote
            } else quoteHit = false;
        }
        reverse += '"';
        return reverse.split("").reverse().join("");
    }
    _uvQuoteCmdArg(arg) {
        // Tool runner wraps child_process.spawn() and needs to apply the same quoting as
        // Node in certain cases where the undocumented spawn option windowsVerbatimArguments
        // is used.
        //
        // Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
        // see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
        // pasting copyright notice from Node within this function:
        //
        //      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
        //
        //      Permission is hereby granted, free of charge, to any person obtaining a copy
        //      of this software and associated documentation files (the "Software"), to
        //      deal in the Software without restriction, including without limitation the
        //      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
        //      sell copies of the Software, and to permit persons to whom the Software is
        //      furnished to do so, subject to the following conditions:
        //
        //      The above copyright notice and this permission notice shall be included in
        //      all copies or substantial portions of the Software.
        //
        //      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        //      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        //      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        //      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        //      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        //      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
        //      IN THE SOFTWARE.
        if (!arg) // Need double quotation for empty argument
        return '""';
        if (!arg.includes(" ") && !arg.includes("	") && !arg.includes('"')) // No quotation needed
        return arg;
        if (!arg.includes('"') && !arg.includes("\\")) // No embedded double quotes or backslashes, so I can just wrap
        // quote marks around the whole thing.
        return `"${arg}"`;
        // Expected input/output:
        //   input : hello"world
        //   output: "hello\"world"
        //   input : hello""world
        //   output: "hello\"\"world"
        //   input : hello\world
        //   output: hello\world
        //   input : hello\\world
        //   output: hello\\world
        //   input : hello\"world
        //   output: "hello\\\"world"
        //   input : hello\\"world
        //   output: "hello\\\\\"world"
        //   input : hello world\
        //   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
        //                             but it appears the comment is wrong, it should be "hello world\\"
        let reverse = '"';
        let quoteHit = true;
        for(let i = arg.length; i > 0; i--){
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === "\\") reverse += "\\";
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += "\\";
            } else quoteHit = false;
        }
        reverse += '"';
        return reverse.split("").reverse().join("");
    }
    _cloneExecOptions(options) {
        options = options || {};
        const result = {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            silent: options.silent || false,
            windowsVerbatimArguments: options.windowsVerbatimArguments || false,
            failOnStdErr: options.failOnStdErr || false,
            ignoreReturnCode: options.ignoreReturnCode || false,
            delay: options.delay || 10000
        };
        result.outStream = options.outStream || process.stdout;
        result.errStream = options.errStream || process.stderr;
        return result;
    }
    _getSpawnOptions(options, toolPath) {
        options = options || {};
        const result = {};
        result.cwd = options.cwd;
        result.env = options.env;
        result["windowsVerbatimArguments"] = options.windowsVerbatimArguments || this._isCmdFile();
        if (options.windowsVerbatimArguments) result.argv0 = `"${toolPath}"`;
        return result;
    }
    /**
     * Exec a tool.
     * Output will be streamed to the live console.
     * Returns promise with return code
     *
     * @param     tool     path to tool to exec
     * @param     options  optional exec options.  See ExecOptions
     * @returns   number
     */ exec() {
        return $89fa817a3df148e1$var$__awaiter(this, void 0, void 0, function*() {
            // root the tool path if it is unrooted and contains relative pathing
            if (!$89fa817a3df148e1$var$ioUtil.isRooted(this.toolPath) && (this.toolPath.includes("/") || $89fa817a3df148e1$var$IS_WINDOWS && this.toolPath.includes("\\"))) // prefer options.cwd if it is specified, however options.cwd may also need to be rooted
            this.toolPath = $89fa817a3df148e1$var$path.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
            // if the tool is only a file name, then resolve it from the PATH
            // otherwise verify it exists (add extension on Windows if necessary)
            this.toolPath = yield $89fa817a3df148e1$var$io.which(this.toolPath, true);
            return new Promise((resolve, reject)=>$89fa817a3df148e1$var$__awaiter(this, void 0, void 0, function*() {
                    this._debug(`exec tool: ${this.toolPath}`);
                    this._debug("arguments:");
                    for (const arg of this.args)this._debug(`   ${arg}`);
                    const optionsNonNull = this._cloneExecOptions(this.options);
                    if (!optionsNonNull.silent && optionsNonNull.outStream) optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + $89fa817a3df148e1$var$os.EOL);
                    const state = new $89fa817a3df148e1$var$ExecState(optionsNonNull, this.toolPath);
                    state.on("debug", (message)=>{
                        this._debug(message);
                    });
                    if (this.options.cwd && !(yield $89fa817a3df148e1$var$ioUtil.exists(this.options.cwd))) return reject(new Error(`The cwd: ${this.options.cwd} does not exist!`));
                    const fileName = this._getSpawnFileName();
                    const cp = $89fa817a3df148e1$var$child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
                    let stdbuffer = "";
                    if (cp.stdout) cp.stdout.on("data", (data)=>{
                        if (this.options.listeners && this.options.listeners.stdout) this.options.listeners.stdout(data);
                        if (!optionsNonNull.silent && optionsNonNull.outStream) optionsNonNull.outStream.write(data);
                        stdbuffer = this._processLineBuffer(data, stdbuffer, (line)=>{
                            if (this.options.listeners && this.options.listeners.stdline) this.options.listeners.stdline(line);
                        });
                    });
                    let errbuffer = "";
                    if (cp.stderr) cp.stderr.on("data", (data)=>{
                        state.processStderr = true;
                        if (this.options.listeners && this.options.listeners.stderr) this.options.listeners.stderr(data);
                        if (!optionsNonNull.silent && optionsNonNull.errStream && optionsNonNull.outStream) {
                            const s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
                            s.write(data);
                        }
                        errbuffer = this._processLineBuffer(data, errbuffer, (line)=>{
                            if (this.options.listeners && this.options.listeners.errline) this.options.listeners.errline(line);
                        });
                    });
                    cp.on("error", (err)=>{
                        state.processError = err.message;
                        state.processExited = true;
                        state.processClosed = true;
                        state.CheckComplete();
                    });
                    cp.on("exit", (code)=>{
                        state.processExitCode = code;
                        state.processExited = true;
                        this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
                        state.CheckComplete();
                    });
                    cp.on("close", (code)=>{
                        state.processExitCode = code;
                        state.processExited = true;
                        state.processClosed = true;
                        this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
                        state.CheckComplete();
                    });
                    state.on("done", (error, exitCode)=>{
                        if (stdbuffer.length > 0) this.emit("stdline", stdbuffer);
                        if (errbuffer.length > 0) this.emit("errline", errbuffer);
                        cp.removeAllListeners();
                        if (error) reject(error);
                        else resolve(exitCode);
                    });
                    if (this.options.input) {
                        if (!cp.stdin) throw new Error("child process missing stdin");
                        cp.stdin.end(this.options.input);
                    }
                }));
        });
    }
}
module.exports.ToolRunner = $89fa817a3df148e1$var$ToolRunner;
/**
 * Convert an arg string to an array of args. Handles escaping
 *
 * @param    argString   string of arguments
 * @returns  string[]    array of arguments
 */ function $89fa817a3df148e1$var$argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let arg = "";
    function append(c) {
        // we only escape double quotes.
        if (escaped && c !== '"') arg += "\\";
        arg += c;
        escaped = false;
    }
    for(let i = 0; i < argString.length; i++){
        const c = argString.charAt(i);
        if (c === '"') {
            if (!escaped) inQuotes = !inQuotes;
            else append(c);
            continue;
        }
        if (c === "\\" && escaped) {
            append(c);
            continue;
        }
        if (c === "\\" && inQuotes) {
            escaped = true;
            continue;
        }
        if (c === " " && !inQuotes) {
            if (arg.length > 0) {
                args.push(arg);
                arg = "";
            }
            continue;
        }
        append(c);
    }
    if (arg.length > 0) args.push(arg.trim());
    return args;
}
module.exports.argStringToArray = $89fa817a3df148e1$var$argStringToArray;
class $89fa817a3df148e1$var$ExecState extends $89fa817a3df148e1$var$events.EventEmitter {
    constructor(options, toolPath){
        super();
        this.processClosed = false; // tracks whether the process has exited and stdio is closed
        this.processError = "";
        this.processExitCode = 0;
        this.processExited = false; // tracks whether the process has exited
        this.processStderr = false; // tracks whether stderr was written to
        this.delay = 10000; // 10 seconds
        this.done = false;
        this.timeout = null;
        if (!toolPath) throw new Error("toolPath must not be empty");
        this.options = options;
        this.toolPath = toolPath;
        if (options.delay) this.delay = options.delay;
    }
    CheckComplete() {
        if (this.done) return;
        if (this.processClosed) this._setResult();
        else if (this.processExited) this.timeout = $dQzAa$timers.setTimeout($89fa817a3df148e1$var$ExecState.HandleTimeout, this.delay, this);
    }
    _debug(message) {
        this.emit("debug", message);
    }
    _setResult() {
        // determine whether there is an error
        let error;
        if (this.processExited) {
            if (this.processError) error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
            else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
            else if (this.processStderr && this.options.failOnStdErr) error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
        }
        // clear the timeout
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.done = true;
        this.emit("done", error, this.processExitCode);
    }
    static HandleTimeout(state) {
        if (state.done) return;
        if (!state.processClosed && state.processExited) {
            const message = `The STDIO streams did not close within ${state.delay / 1000} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            state._debug(message);
        }
        state._setResult();
    }
}

});


parcelRequire.register("eMCrb", function(module, exports) {
module.exports = Promise.resolve(require("./actions_python.76a8e36a.js")).then(()=>parcelRequire("keaYn"));

});

parcelRequire.register("3kwLU", function(module, exports) {

var $2vEB3 = parcelRequire("2vEB3");

var $bJvyy = parcelRequire("bJvyy");
//================//
// MODULE GLOBALS //
//================//
/**
 * Pre-calculating millisecond values for each time unit.
 */ const $26cca9260c24f281$var$timeUnits = [
    [
        "years",
        29030400000
    ],
    [
        "months",
        2419200000
    ],
    [
        "weeks",
        604800000
    ],
    [
        "days",
        86400000
    ],
    [
        "hours",
        3600000
    ],
    [
        "minutes",
        60000
    ],
    [
        "seconds",
        1000
    ], 
];
const $26cca9260c24f281$var$defaultConfig = {
    locale: "en",
    span: 2,
    delimiter: ", ",
    unitType: "long",
    unitTypeLookupOrder: [
        "long",
        "short",
        "narrow"
    ],
    autoloadLocales: true
};
/**
 * Contains data of loaded locales.
 * @type {Object}
 */ const $26cca9260c24f281$var$locales = {};
//=========//
// EXPORTS //
//=========//
module.exports = {
    create: $26cca9260c24f281$var$timeDeltaFactory,
    addLocale: $26cca9260c24f281$var$addLocale,
    defaultConfig: $26cca9260c24f281$var$defaultConfig
};
//===========//
// FUNCTIONS //
//===========//
/**
 * Adds pluralization data for the specified locale.
 * Should be called in browser.
 *
 * @param {Object|Object[]} localeData
 */ function $26cca9260c24f281$var$addLocale(localeData) {
    // Normalizing input
    if (!Array.isArray(localeData)) localeData = [
        localeData
    ];
    for (const item of localeData){
        const { id: id , data: data  } = item;
        $26cca9260c24f281$var$locales[id] = data;
    }
}
/**
 * Creates new instance.
 *
 * @param {object?} config
 *
 * @returns {object}
 */ function $26cca9260c24f281$var$timeDeltaFactory(config) {
    // Initializing config by extending the default one
    config = Object.assign({}, $26cca9260c24f281$var$defaultConfig, config || {});
    return {
        /**
     * Public proxy for internal format function.
     *
     * @param {Date} firstDate
     * @param {Date} secondDate
     * @param {object?} options
     *
     * @returns {string}
     */ format: function(firstDate, secondDate, options) {
            // Allowing to override config with each individual call
            options = Object.assign({}, config, options || {});
            return $26cca9260c24f281$var$format(firstDate, secondDate, options);
        }
    };
}
/**
 * Returns difference between two dates as a text string.
 *
 * @param {Date} firstDate
 * @param {Date} secondDate
 * @param {object} config
 *
 * @returns {string}
 */ function $26cca9260c24f281$var$format(firstDate, secondDate, config) {
    $26cca9260c24f281$var$ensureLocaleLoadedOrThrow(config.locale, {
        autoload: config.autoloadLocales
    });
    // Handling input arguments
    // -----
    if (!firstDate) throw new Error("Missing first date argument");
    if (!secondDate) throw new Error("Missing second date argument");
    // Calculating
    // -----
    const difference = $26cca9260c24f281$var$getDifference(firstDate, secondDate);
    const parts = [];
    for (const unit of difference){
        const [name, value] = unit;
        if (value > 0) parts.push($26cca9260c24f281$var$pluralize(name, value, config));
        if (parts.length >= config.span) break;
    }
    // Returning the string value
    return parts.join(config.delimiter);
}
/**
 * Checks if locale is loaded. If not, tries to load it in Node.js,
 * or throws and error in Browser.
 *
 * @param {string} locale
 * @param {Object?} options
 */ function $26cca9260c24f281$var$ensureLocaleLoadedOrThrow(locale, options) {
    const { autoload: autoload  } = options;
    if ($26cca9260c24f281$var$hasLocale(locale)) return;
    if ($bJvyy && autoload) $26cca9260c24f281$var$requireLocale(locale);
    else throw new Error(`Missing locale: ${locale}, you must load it manually before using it`);
}
/**
 * Returns true if specified locale is loaded, false otherwise.
 *
 * @param {string} localeId
 *
 * @returns {boolean}
 */ function $26cca9260c24f281$var$hasLocale(localeId) {
    return Boolean($26cca9260c24f281$var$locales[localeId]);
}
/**
 * Tries to load the specified locale.
 *
 * @param {string} localeId
 */ function $26cca9260c24f281$var$requireLocale(localeId) {
    try {
        $26cca9260c24f281$var$addLocale(require(`../locales/${localeId}.js`));
    } catch (error) {
        throw Error(`Failed to load locale: ${localeId} from ../locales/${localeId}.js. If using a bundled time-delta, set 'autoloadLocales: false' in the config: ${error}`);
    }
}
/**
 * Returns difference as separate time units.
 *
 * @param {Date} firstDate
 * @param {Date} secondDate
 *
 * @returns {Array}
 */ function $26cca9260c24f281$var$getDifference(firstDate, secondDate) {
    let difference = secondDate - firstDate;
    const results = [];
    $26cca9260c24f281$var$timeUnits.some(function(unit) {
        const name = unit[0];
        const divider = unit[1];
        const value = Math.floor(difference / divider);
        difference -= value * divider;
        results.push([
            name,
            value
        ]);
        if (difference <= 0) // Breaking the loop.
        return true;
    });
    return results;
}
/**
 * Returns localized and pluralized time unit.
 *
 * @param {string} unit
 * @param {int} value
 * @param {object} config
 *
 * @returns {string}
 */ function $26cca9260c24f281$var$pluralize(unit, value, config) {
    const unitTypeData = $26cca9260c24f281$var$getLocaleDataForUnitType(config);
    const unitString = $2vEB3.pluralize(config.locale, value, unitTypeData[unit]);
    return unitString.replace("{0}", value);
}
/**
 * Returns locale data for preferred unit type.
 *
 * @param {object} config
 *
 * @returns {Array}
 */ function $26cca9260c24f281$var$getLocaleDataForUnitType(config) {
    const localeData = $26cca9260c24f281$var$locales[config.locale];
    // Making a copy of array from config.
    let lookupOrder = config.unitTypeLookupOrder.slice();
    // Adding interested type to the top.
    lookupOrder.unshift(config.unitType);
    // Making sure only unique items are present.
    lookupOrder = $26cca9260c24f281$var$arrayUnique(lookupOrder);
    let unitTypeData = null;
    lookupOrder.some(function(unitType) {
        if ("undefined" !== typeof localeData[unitType]) {
            unitTypeData = localeData[unitType];
            // Breaking the loop.
            return true;
        }
    });
    if (null === unitTypeData) throw new Error("Can not find any unit type data for locale: " + config.locale);
    return unitTypeData;
}
/**
 * Returns array with only unique items.
 *
 * @param {Array} array
 *
 * @returns {Array}
 */ function $26cca9260c24f281$var$arrayUnique(array) {
    return Array.from(new Set(array));
}

});
parcelRequire.register("2vEB3", function(module, exports) {

module.exports = (parcelRequire("4xBg6"));

});
parcelRequire.register("4xBg6", function(module, exports) {

var $34e7254e950795aa$var$$parcel$__dirname = $dQzAa$path.resolve(__dirname, "../node_modules/.pnpm/numerous@1.0.3/node_modules/numerous/lib");
(function() {
    "use strict";
    var root = this;
    //=========//
    // GLOBALS //
    //=========//
    var locales = {};
    //==========//
    // EXPOSING //
    //==========//
    var moduleDefinition = {
        create: factory,
        addLocale: addLocale,
        pluralize: pluralize
    };
    if ("undefined" !== typeof module.exports) module.exports = moduleDefinition;
    else root.numerous = moduleDefinition;
    //==================//
    // PUBLIC FUNCTIONS //
    //==================//
    /**
   * Creates new instance of numerous.
   *
   * @param {string} locale
   * @returns {object}
   */ function factory(locale) {
        checkLocale(locale);
        return {
            pluralize: function(value, variants) {
                return pluralize(locale, value, variants);
            }
        };
    }
    /**
   * Adds pluralization function for specified locale.
   * Usually externally called by locale itself.
   *
   * @param {string} locale
   * @param {function} callable
   */ function addLocale(locale, callable) {
        locales[locale] = callable;
    }
    /**
   * Returns variant from the specified list of variants
   * according to the specified value and locale.
   *
   * @param {string} locale
   * @param {int} value
   * @param {object} variants
   */ function pluralize(locale, value, variants) {
        checkLocale(locale);
        if ("object" !== typeof variants) throw new Error("List of variants should be specified as an object");
        var key = locales[locale](value);
        return "undefined" !== typeof variants[key] ? variants[key] : null;
    }
    //===================//
    // PRIVATE FUNCTIONS //
    //===================//
    /**
   * Returns true if specified locale is loaded, false otherwise.
   *
   * @param {string} locale
   *
   * @returns {boolean}
   */ function hasLocale(locale) {
        return "undefined" !== typeof locales[locale];
    }
    /**
   * Checks if locale is loaded. If not, tries to load it.
   *
   * @param {string} locale
   */ function checkLocale(locale) {
        if (!hasLocale(locale)) requireLocale(locale);
    }
    /**
   * Tries to load the specified locale.
   *
   * @param {string} locale
   */ function requireLocale(locale) {
        try {
            require($34e7254e950795aa$var$$parcel$__dirname + "/../locales/" + locale + ".js");
        } catch (error) {
            throw Error("Failed to load the following locale: " + locale);
        }
    }
}).call(module.exports);

});


parcelRequire.register("bJvyy", function(module, exports) {
// Coding standard for this project defined @ https://github.com/MatthewSH/standards/blob/master/JavaScript.md
"use strict";
exports = module.exports = !!(typeof process !== "undefined" && process.versions && process.versions.node);

});



$parcel$export(module.exports, "main", () => $80749a513d62e14e$export$f22da7240b7add18);
$parcel$export(module.exports, "parseArgs", () => $80749a513d62e14e$export$7300a92932ee17a3);
$parcel$export(module.exports, "getCompilerInfo", () => $80749a513d62e14e$export$588248dee5258836);

var $9Ei2d = parcelRequire("9Ei2d");


var $7w88d = parcelRequire("7w88d");
var $94c938c1d2901f7d$exports = {};
const $94c938c1d2901f7d$var$isWindows = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys";

const $94c938c1d2901f7d$var$COLON = $94c938c1d2901f7d$var$isWindows ? ";" : ":";
var $ff510792b04efb12$exports = {};

var $ff510792b04efb12$var$core;


if (process.platform === "win32" || $parcel$global.TESTING_WINDOWS) $ff510792b04efb12$var$core = (parcelRequire("9nH4i"));
else $ff510792b04efb12$var$core = (parcelRequire("gPh6F"));
$ff510792b04efb12$exports = $ff510792b04efb12$var$isexe;
$ff510792b04efb12$var$isexe.sync = $ff510792b04efb12$var$sync;
function $ff510792b04efb12$var$isexe(path, options, cb) {
    if (typeof options === "function") {
        cb = options;
        options = {};
    }
    if (!cb) {
        if (typeof Promise !== "function") throw new TypeError("callback not provided");
        return new Promise(function(resolve, reject) {
            $ff510792b04efb12$var$isexe(path, options || {}, function(er, is) {
                if (er) reject(er);
                else resolve(is);
            });
        });
    }
    $ff510792b04efb12$var$core(path, options || {}, function(er, is) {
        // ignore EACCES because that just means we aren't allowed to run it
        if (er) {
            if (er.code === "EACCES" || options && options.ignoreErrors) {
                er = null;
                is = false;
            }
        }
        cb(er, is);
    });
}
function $ff510792b04efb12$var$sync(path, options) {
    // my kingdom for a filtered catch
    try {
        return $ff510792b04efb12$var$core.sync(path, options || {});
    } catch (er) {
        if (options && options.ignoreErrors || er.code === "EACCES") return false;
        else throw er;
    }
}


const $94c938c1d2901f7d$var$getNotFoundError = (cmd)=>Object.assign(new Error(`not found: ${cmd}`), {
        code: "ENOENT"
    });
const $94c938c1d2901f7d$var$getPathInfo = (cmd, opt)=>{
    const colon = opt.colon || $94c938c1d2901f7d$var$COLON;
    // If it has a slash, then we don't bother searching the pathenv.
    // just check the file itself, and that's it.
    const pathEnv = cmd.match(/\//) || $94c938c1d2901f7d$var$isWindows && cmd.match(/\\/) ? [
        ""
    ] : [
        // windows always checks the cwd first
        ...$94c938c1d2901f7d$var$isWindows ? [
            process.cwd()
        ] : [],
        ...(opt.path || process.env.PATH || /* istanbul ignore next: very unusual */ "").split(colon), 
    ];
    const pathExtExe = $94c938c1d2901f7d$var$isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "";
    const pathExt = $94c938c1d2901f7d$var$isWindows ? pathExtExe.split(colon) : [
        ""
    ];
    if ($94c938c1d2901f7d$var$isWindows) {
        if (cmd.indexOf(".") !== -1 && pathExt[0] !== "") pathExt.unshift("");
    }
    return {
        pathEnv: pathEnv,
        pathExt: pathExt,
        pathExtExe: pathExtExe
    };
};
const $94c938c1d2901f7d$var$which = (cmd, opt, cb)=>{
    if (typeof opt === "function") {
        cb = opt;
        opt = {};
    }
    if (!opt) opt = {};
    const { pathEnv: pathEnv , pathExt: pathExt , pathExtExe: pathExtExe  } = $94c938c1d2901f7d$var$getPathInfo(cmd, opt);
    const found = [];
    const step = (i)=>new Promise((resolve, reject)=>{
            if (i === pathEnv.length) return opt.all && found.length ? resolve(found) : reject($94c938c1d2901f7d$var$getNotFoundError(cmd));
            const ppRaw = pathEnv[i];
            const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
            const pCmd = $dQzAa$path.join(pathPart, cmd);
            const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
            resolve(subStep(p, i, 0));
        });
    const subStep = (p, i, ii)=>new Promise((resolve, reject)=>{
            if (ii === pathExt.length) return resolve(step(i + 1));
            const ext = pathExt[ii];
            $ff510792b04efb12$exports(p + ext, {
                pathExt: pathExtExe
            }, (er, is)=>{
                if (!er && is) {
                    if (opt.all) found.push(p + ext);
                    else return resolve(p + ext);
                }
                return resolve(subStep(p, i, ii + 1));
            });
        });
    return cb ? step(0).then((res)=>cb(null, res), cb) : step(0);
};
const $94c938c1d2901f7d$var$whichSync = (cmd, opt)=>{
    opt = opt || {};
    const { pathEnv: pathEnv , pathExt: pathExt , pathExtExe: pathExtExe  } = $94c938c1d2901f7d$var$getPathInfo(cmd, opt);
    const found = [];
    for(let i = 0; i < pathEnv.length; i++){
        const ppRaw = pathEnv[i];
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw;
        const pCmd = $dQzAa$path.join(pathPart, cmd);
        const p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
        for(let j = 0; j < pathExt.length; j++){
            const cur = p + pathExt[j];
            try {
                const is = $ff510792b04efb12$exports.sync(cur, {
                    pathExt: pathExtExe
                });
                if (is) {
                    if (opt.all) found.push(cur);
                    else return cur;
                }
            } catch (ex) {}
        }
    }
    if (opt.all && found.length) return found;
    if (opt.nothrow) return null;
    throw $94c938c1d2901f7d$var$getNotFoundError(cmd);
};
$94c938c1d2901f7d$exports = $94c938c1d2901f7d$var$which;
$94c938c1d2901f7d$var$which.sync = $94c938c1d2901f7d$var$whichSync;


let $28a97e251fbb61ba$var$binDir;
function $28a97e251fbb61ba$export$c5eeb9c87a610a0e(_version, _setupDir, _arch) {
    if (![
        "darwin",
        "linux"
    ].includes(process.platform)) return undefined;
    if (typeof $28a97e251fbb61ba$var$binDir === "string") return {
        binDir: $28a97e251fbb61ba$var$binDir
    };
    const maybeBinDir = (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("brew", {
        nothrow: true
    });
    if (maybeBinDir !== null) {
        $28a97e251fbb61ba$var$binDir = (0, $7w88d.dirname)(maybeBinDir);
        return {
            binDir: $28a97e251fbb61ba$var$binDir
        };
    }
    // brew is not thread-safe
    (0, $dQzAa$child_process.execFileSync)(`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`, {
        stdio: "inherit"
    });
    $28a97e251fbb61ba$var$binDir = "/usr/local/bin/";
    return {
        binDir: $28a97e251fbb61ba$var$binDir
    };
}



var $0b337dd108862151$exports = {};
"use strict";


var $4287ffb7ac7b713c$exports = {};
"use strict";

var $644b54005e56ed9a$exports = {};
"use strict";

var $faa33d7f3e65892f$exports = {};
"use strict";


var $e41ce92ee54159fb$exports = {};
"use strict";
const $e41ce92ee54159fb$var$pathKey = (options = {})=>{
    const environment = options.env || process.env;
    const platform = options.platform || process.platform;
    if (platform !== "win32") return "PATH";
    return Object.keys(environment).reverse().find((key)=>key.toUpperCase() === "PATH") || "Path";
};
$e41ce92ee54159fb$exports = $e41ce92ee54159fb$var$pathKey;
// TODO: Remove this for the next major release
$e41ce92ee54159fb$exports.default = $e41ce92ee54159fb$var$pathKey;


function $faa33d7f3e65892f$var$resolveCommandAttempt(parsed, withoutPathExt) {
    const env = parsed.options.env || process.env;
    const cwd = process.cwd();
    const hasCustomCwd = parsed.options.cwd != null;
    // Worker threads do not have process.chdir()
    const shouldSwitchCwd = hasCustomCwd && process.chdir !== undefined && !process.chdir.disabled;
    // If a custom `cwd` was specified, we need to change the process cwd
    // because `which` will do stat calls but does not support a custom cwd
    if (shouldSwitchCwd) try {
        process.chdir(parsed.options.cwd);
    } catch (err) {
    /* Empty */ }
    let resolved;
    try {
        resolved = $94c938c1d2901f7d$exports.sync(parsed.command, {
            path: env[$e41ce92ee54159fb$exports({
                env: env
            })],
            pathExt: withoutPathExt ? $dQzAa$path.delimiter : undefined
        });
    } catch (e) {
    /* Empty */ } finally{
        if (shouldSwitchCwd) process.chdir(cwd);
    }
    // If we successfully resolved, ensure that an absolute path is returned
    // Note that when a custom `cwd` was used, we need to resolve to an absolute path based on it
    if (resolved) resolved = $dQzAa$path.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved);
    return resolved;
}
function $faa33d7f3e65892f$var$resolveCommand(parsed) {
    return $faa33d7f3e65892f$var$resolveCommandAttempt(parsed) || $faa33d7f3e65892f$var$resolveCommandAttempt(parsed, true);
}
$faa33d7f3e65892f$exports = $faa33d7f3e65892f$var$resolveCommand;


var $7525896154d1a8d4$export$ae50443ffc990749;
var $7525896154d1a8d4$export$6ea29ee575e3f5ff;
"use strict";
// See http://www.robvanderwoude.com/escapechars.php
const $7525896154d1a8d4$var$metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
function $7525896154d1a8d4$var$escapeCommand(arg) {
    // Escape meta chars
    arg = arg.replace($7525896154d1a8d4$var$metaCharsRegExp, "^$1");
    return arg;
}
function $7525896154d1a8d4$var$escapeArgument(arg, doubleEscapeMetaChars) {
    // Convert to string
    arg = `${arg}`;
    // Algorithm below is based on https://qntm.org/cmd
    // Sequence of backslashes followed by a double quote:
    // double up all the backslashes and escape the double quote
    arg = arg.replace(/(\\*)"/g, '$1$1\\"');
    // Sequence of backslashes followed by the end of the string
    // (which will become a double quote later):
    // double up all the backslashes
    arg = arg.replace(/(\\*)$/, "$1$1");
    // All other backslashes occur literally
    // Quote the whole thing:
    arg = `"${arg}"`;
    // Escape meta chars
    arg = arg.replace($7525896154d1a8d4$var$metaCharsRegExp, "^$1");
    // Double escape meta chars if necessary
    if (doubleEscapeMetaChars) arg = arg.replace($7525896154d1a8d4$var$metaCharsRegExp, "^$1");
    return arg;
}
$7525896154d1a8d4$export$ae50443ffc990749 = $7525896154d1a8d4$var$escapeCommand;
$7525896154d1a8d4$export$6ea29ee575e3f5ff = $7525896154d1a8d4$var$escapeArgument;


var $cd07d079911f1a65$exports = {};
"use strict";

var $eb0c6ccbbd92ccd9$exports = {};
"use strict";
var $e2067ca54e43abee$exports = {};
"use strict";
$e2067ca54e43abee$exports = /^#!(.*)/;


$eb0c6ccbbd92ccd9$exports = (string = "")=>{
    const match = string.match($e2067ca54e43abee$exports);
    if (!match) return null;
    const [path, argument] = match[0].replace(/#! ?/, "").split(" ");
    const binary = path.split("/").pop();
    if (binary === "env") return argument;
    return argument ? `${binary} ${argument}` : binary;
};


function $cd07d079911f1a65$var$readShebang(command) {
    // Read the first 150 bytes from the file
    const size = 150;
    const buffer = Buffer.alloc(size);
    let fd;
    try {
        fd = $dQzAa$fs.openSync(command, "r");
        $dQzAa$fs.readSync(fd, buffer, 0, size, 0);
        $dQzAa$fs.closeSync(fd);
    } catch (e) {}
    // Attempt to extract shebang (null is returned if not a shebang)
    return $eb0c6ccbbd92ccd9$exports(buffer.toString());
}
$cd07d079911f1a65$exports = $cd07d079911f1a65$var$readShebang;


const $644b54005e56ed9a$var$isWin = process.platform === "win32";
const $644b54005e56ed9a$var$isExecutableRegExp = /\.(?:com|exe)$/i;
const $644b54005e56ed9a$var$isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
function $644b54005e56ed9a$var$detectShebang(parsed) {
    parsed.file = $faa33d7f3e65892f$exports(parsed);
    const shebang = parsed.file && $cd07d079911f1a65$exports(parsed.file);
    if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;
        return $faa33d7f3e65892f$exports(parsed);
    }
    return parsed.file;
}
function $644b54005e56ed9a$var$parseNonShell(parsed) {
    if (!$644b54005e56ed9a$var$isWin) return parsed;
    // Detect & add support for shebangs
    const commandFile = $644b54005e56ed9a$var$detectShebang(parsed);
    // We don't need a shell if the command filename is an executable
    const needsShell = !$644b54005e56ed9a$var$isExecutableRegExp.test(commandFile);
    // If a shell is required, use cmd.exe and take care of escaping everything correctly
    // Note that `forceShell` is an hidden option used only in tests
    if (parsed.options.forceShell || needsShell) {
        // Need to double escape meta chars if the command is a cmd-shim located in `node_modules/.bin/`
        // The cmd-shim simply calls execute the package bin file with NodeJS, proxying any argument
        // Because the escape of metachars with ^ gets interpreted when the cmd.exe is first called,
        // we need to double escape them
        const needsDoubleEscapeMetaChars = $644b54005e56ed9a$var$isCmdShimRegExp.test(commandFile);
        // Normalize posix paths into OS compatible paths (e.g.: foo/bar -> foo\bar)
        // This is necessary otherwise it will always fail with ENOENT in those cases
        parsed.command = $dQzAa$path.normalize(parsed.command);
        // Escape command & arguments
        parsed.command = $7525896154d1a8d4$export$ae50443ffc990749(parsed.command);
        parsed.args = parsed.args.map((arg)=>$7525896154d1a8d4$export$6ea29ee575e3f5ff(arg, needsDoubleEscapeMetaChars));
        const shellCommand = [
            parsed.command
        ].concat(parsed.args).join(" ");
        parsed.args = [
            "/d",
            "/s",
            "/c",
            `"${shellCommand}"`
        ];
        parsed.command = process.env.comspec || "cmd.exe";
        parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
    }
    return parsed;
}
function $644b54005e56ed9a$var$parse(command, args, options) {
    // Normalize arguments, similar to nodejs
    if (args && !Array.isArray(args)) {
        options = args;
        args = null;
    }
    args = args ? args.slice(0) : []; // Clone array to avoid changing the original
    options = Object.assign({}, options); // Clone object to avoid changing the original
    // Build our parsed object
    const parsed = {
        command: command,
        args: args,
        options: options,
        file: undefined,
        original: {
            command: command,
            args: args
        }
    };
    // Delegate further parsing to shell or non-shell
    return options.shell ? parsed : $644b54005e56ed9a$var$parseNonShell(parsed);
}
$644b54005e56ed9a$exports = $644b54005e56ed9a$var$parse;


var $0d63e035d1958522$exports = {};
"use strict";
const $0d63e035d1958522$var$isWin = process.platform === "win32";
function $0d63e035d1958522$var$notFoundError(original, syscall) {
    return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: "ENOENT",
        errno: "ENOENT",
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args
    });
}
function $0d63e035d1958522$var$hookChildProcess(cp, parsed) {
    if (!$0d63e035d1958522$var$isWin) return;
    const originalEmit = cp.emit;
    cp.emit = function(name, arg1) {
        // If emitting "exit" event and exit code is 1, we need to check if
        // the command exists and emit an "error" instead
        // See https://github.com/IndigoUnited/node-cross-spawn/issues/16
        if (name === "exit") {
            const err = $0d63e035d1958522$var$verifyENOENT(arg1, parsed, "spawn");
            if (err) return originalEmit.call(cp, "error", err);
        }
        return originalEmit.apply(cp, arguments); // eslint-disable-line prefer-rest-params
    };
}
function $0d63e035d1958522$var$verifyENOENT(status, parsed) {
    if ($0d63e035d1958522$var$isWin && status === 1 && !parsed.file) return $0d63e035d1958522$var$notFoundError(parsed.original, "spawn");
    return null;
}
function $0d63e035d1958522$var$verifyENOENTSync(status, parsed) {
    if ($0d63e035d1958522$var$isWin && status === 1 && !parsed.file) return $0d63e035d1958522$var$notFoundError(parsed.original, "spawnSync");
    return null;
}
$0d63e035d1958522$exports = {
    hookChildProcess: $0d63e035d1958522$var$hookChildProcess,
    verifyENOENT: $0d63e035d1958522$var$verifyENOENT,
    verifyENOENTSync: $0d63e035d1958522$var$verifyENOENTSync,
    notFoundError: $0d63e035d1958522$var$notFoundError
};


function $4287ffb7ac7b713c$var$spawn(command, args, options) {
    // Parse the arguments
    const parsed = $644b54005e56ed9a$exports(command, args, options);
    // Spawn the child process
    const spawned = $dQzAa$child_process.spawn(parsed.command, parsed.args, parsed.options);
    // Hook into child process "exit" event to emit an error if the command
    // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    $0d63e035d1958522$exports.hookChildProcess(spawned, parsed);
    return spawned;
}
function $4287ffb7ac7b713c$var$spawnSync(command, args, options) {
    // Parse the arguments
    const parsed = $644b54005e56ed9a$exports(command, args, options);
    // Spawn the child process
    const result = $dQzAa$child_process.spawnSync(parsed.command, parsed.args, parsed.options);
    // Analyze if the command does not exist, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    result.error = result.error || $0d63e035d1958522$exports.verifyENOENTSync(result.status, parsed);
    return result;
}
$4287ffb7ac7b713c$exports = $4287ffb7ac7b713c$var$spawn;
$4287ffb7ac7b713c$exports.spawn = $4287ffb7ac7b713c$var$spawn;
$4287ffb7ac7b713c$exports.sync = $4287ffb7ac7b713c$var$spawnSync;
$4287ffb7ac7b713c$exports._parse = $644b54005e56ed9a$exports;
$4287ffb7ac7b713c$exports._enoent = $0d63e035d1958522$exports;


var $3f9cf3c038ea29f8$exports = {};
"use strict";
$3f9cf3c038ea29f8$exports = (input)=>{
    const LF = typeof input === "string" ? "\n" : "\n".charCodeAt();
    const CR = typeof input === "string" ? "\r" : "\r".charCodeAt();
    if (input[input.length - 1] === LF) input = input.slice(0, input.length - 1);
    if (input[input.length - 1] === CR) input = input.slice(0, input.length - 1);
    return input;
};


var $4dd4b6c7710decab$exports = {};
"use strict";


const $4dd4b6c7710decab$var$npmRunPath = (options)=>{
    options = {
        cwd: process.cwd(),
        path: process.env[$e41ce92ee54159fb$exports()],
        execPath: process.execPath,
        ...options
    };
    let previous;
    let cwdPath = $dQzAa$path.resolve(options.cwd);
    const result = [];
    while(previous !== cwdPath){
        result.push($dQzAa$path.join(cwdPath, "node_modules/.bin"));
        previous = cwdPath;
        cwdPath = $dQzAa$path.resolve(cwdPath, "..");
    }
    // Ensure the running `node` binary is used
    const execPathDir = $dQzAa$path.resolve(options.cwd, options.execPath, "..");
    result.push(execPathDir);
    return result.concat(options.path).join($dQzAa$path.delimiter);
};
$4dd4b6c7710decab$exports = $4dd4b6c7710decab$var$npmRunPath;
// TODO: Remove this for the next major release
$4dd4b6c7710decab$exports.default = $4dd4b6c7710decab$var$npmRunPath;
$4dd4b6c7710decab$exports.env = (options)=>{
    options = {
        env: process.env,
        ...options
    };
    const env = {
        ...options.env
    };
    const path = $e41ce92ee54159fb$exports({
        env: env
    });
    options.path = env[path];
    env[path] = $4dd4b6c7710decab$exports(options);
    return env;
};


var $fe62cd600ad6aea1$exports = {};
"use strict";
var $89778240afef08e5$exports = {};
"use strict";
const $89778240afef08e5$var$mimicFn = (to, from)=>{
    for (const prop of Reflect.ownKeys(from))Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
    return to;
};
$89778240afef08e5$exports = $89778240afef08e5$var$mimicFn;
// TODO: Remove this for the next major release
$89778240afef08e5$exports.default = $89778240afef08e5$var$mimicFn;


const $fe62cd600ad6aea1$var$calledFunctions = new WeakMap();
const $fe62cd600ad6aea1$var$onetime = (function_, options = {})=>{
    if (typeof function_ !== "function") throw new TypeError("Expected a function");
    let returnValue;
    let callCount = 0;
    const functionName = function_.displayName || function_.name || "<anonymous>";
    const onetime = function(...arguments_) {
        $fe62cd600ad6aea1$var$calledFunctions.set(onetime, ++callCount);
        if (callCount === 1) {
            returnValue = function_.apply(this, arguments_);
            function_ = null;
        } else if (options.throw === true) throw new Error(`Function \`${functionName}\` can only be called once`);
        return returnValue;
    };
    $89778240afef08e5$exports(onetime, function_);
    $fe62cd600ad6aea1$var$calledFunctions.set(onetime, callCount);
    return onetime;
};
$fe62cd600ad6aea1$exports = $fe62cd600ad6aea1$var$onetime;
// TODO: Remove this for the next major release
$fe62cd600ad6aea1$exports.default = $fe62cd600ad6aea1$var$onetime;
$fe62cd600ad6aea1$exports.callCount = (function_)=>{
    if (!$fe62cd600ad6aea1$var$calledFunctions.has(function_)) throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
    return $fe62cd600ad6aea1$var$calledFunctions.get(function_);
};


var $10aa41648cea2e0f$exports = {};
"use strict";
var $b84de30a201d48e8$exports = {};
"use strict";
Object.defineProperty($b84de30a201d48e8$exports, "__esModule", {
    value: true
});
$b84de30a201d48e8$exports.signalsByNumber = $b84de30a201d48e8$exports.signalsByName = void 0;

var $01a630a532adbfdc$exports = {};
"use strict";
Object.defineProperty($01a630a532adbfdc$exports, "__esModule", {
    value: true
});
$01a630a532adbfdc$exports.getSignals = void 0;

var $84a6bc886a252426$exports = {};
"use strict";
Object.defineProperty($84a6bc886a252426$exports, "__esModule", {
    value: true
});
$84a6bc886a252426$exports.SIGNALS = void 0;
const $84a6bc886a252426$var$SIGNALS = [
    {
        name: "SIGHUP",
        number: 1,
        action: "terminate",
        description: "Terminal closed",
        standard: "posix"
    },
    {
        name: "SIGINT",
        number: 2,
        action: "terminate",
        description: "User interruption with CTRL-C",
        standard: "ansi"
    },
    {
        name: "SIGQUIT",
        number: 3,
        action: "core",
        description: "User interruption with CTRL-\\",
        standard: "posix"
    },
    {
        name: "SIGILL",
        number: 4,
        action: "core",
        description: "Invalid machine instruction",
        standard: "ansi"
    },
    {
        name: "SIGTRAP",
        number: 5,
        action: "core",
        description: "Debugger breakpoint",
        standard: "posix"
    },
    {
        name: "SIGABRT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "ansi"
    },
    {
        name: "SIGIOT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "bsd"
    },
    {
        name: "SIGBUS",
        number: 7,
        action: "core",
        description: "Bus error due to misaligned, non-existing address or paging error",
        standard: "bsd"
    },
    {
        name: "SIGEMT",
        number: 7,
        action: "terminate",
        description: "Command should be emulated but is not implemented",
        standard: "other"
    },
    {
        name: "SIGFPE",
        number: 8,
        action: "core",
        description: "Floating point arithmetic error",
        standard: "ansi"
    },
    {
        name: "SIGKILL",
        number: 9,
        action: "terminate",
        description: "Forced termination",
        standard: "posix",
        forced: true
    },
    {
        name: "SIGUSR1",
        number: 10,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
    },
    {
        name: "SIGSEGV",
        number: 11,
        action: "core",
        description: "Segmentation fault",
        standard: "ansi"
    },
    {
        name: "SIGUSR2",
        number: 12,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
    },
    {
        name: "SIGPIPE",
        number: 13,
        action: "terminate",
        description: "Broken pipe or socket",
        standard: "posix"
    },
    {
        name: "SIGALRM",
        number: 14,
        action: "terminate",
        description: "Timeout or timer",
        standard: "posix"
    },
    {
        name: "SIGTERM",
        number: 15,
        action: "terminate",
        description: "Termination",
        standard: "ansi"
    },
    {
        name: "SIGSTKFLT",
        number: 16,
        action: "terminate",
        description: "Stack is empty or overflowed",
        standard: "other"
    },
    {
        name: "SIGCHLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "posix"
    },
    {
        name: "SIGCLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "other"
    },
    {
        name: "SIGCONT",
        number: 18,
        action: "unpause",
        description: "Unpaused",
        standard: "posix",
        forced: true
    },
    {
        name: "SIGSTOP",
        number: 19,
        action: "pause",
        description: "Paused",
        standard: "posix",
        forced: true
    },
    {
        name: "SIGTSTP",
        number: 20,
        action: "pause",
        description: 'Paused using CTRL-Z or "suspend"',
        standard: "posix"
    },
    {
        name: "SIGTTIN",
        number: 21,
        action: "pause",
        description: "Background process cannot read terminal input",
        standard: "posix"
    },
    {
        name: "SIGBREAK",
        number: 21,
        action: "terminate",
        description: "User interruption with CTRL-BREAK",
        standard: "other"
    },
    {
        name: "SIGTTOU",
        number: 22,
        action: "pause",
        description: "Background process cannot write to terminal output",
        standard: "posix"
    },
    {
        name: "SIGURG",
        number: 23,
        action: "ignore",
        description: "Socket received out-of-band data",
        standard: "bsd"
    },
    {
        name: "SIGXCPU",
        number: 24,
        action: "core",
        description: "Process timed out",
        standard: "bsd"
    },
    {
        name: "SIGXFSZ",
        number: 25,
        action: "core",
        description: "File too big",
        standard: "bsd"
    },
    {
        name: "SIGVTALRM",
        number: 26,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
    },
    {
        name: "SIGPROF",
        number: 27,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
    },
    {
        name: "SIGWINCH",
        number: 28,
        action: "ignore",
        description: "Terminal window size changed",
        standard: "bsd"
    },
    {
        name: "SIGIO",
        number: 29,
        action: "terminate",
        description: "I/O is available",
        standard: "other"
    },
    {
        name: "SIGPOLL",
        number: 29,
        action: "terminate",
        description: "Watched event",
        standard: "other"
    },
    {
        name: "SIGINFO",
        number: 29,
        action: "ignore",
        description: "Request for process information",
        standard: "other"
    },
    {
        name: "SIGPWR",
        number: 30,
        action: "terminate",
        description: "Device running out of power",
        standard: "systemv"
    },
    {
        name: "SIGSYS",
        number: 31,
        action: "core",
        description: "Invalid system call",
        standard: "other"
    },
    {
        name: "SIGUNUSED",
        number: 31,
        action: "terminate",
        description: "Invalid system call",
        standard: "other"
    }
];
$84a6bc886a252426$exports.SIGNALS = $84a6bc886a252426$var$SIGNALS;


var $f11d8c4f1dab2034$exports = {};
"use strict";
Object.defineProperty($f11d8c4f1dab2034$exports, "__esModule", {
    value: true
});
$f11d8c4f1dab2034$exports.SIGRTMAX = $f11d8c4f1dab2034$exports.getRealtimeSignals = void 0;
const $f11d8c4f1dab2034$var$getRealtimeSignals = function() {
    const length = $f11d8c4f1dab2034$var$SIGRTMAX - $f11d8c4f1dab2034$var$SIGRTMIN + 1;
    return Array.from({
        length: length
    }, $f11d8c4f1dab2034$var$getRealtimeSignal);
};
$f11d8c4f1dab2034$exports.getRealtimeSignals = $f11d8c4f1dab2034$var$getRealtimeSignals;
const $f11d8c4f1dab2034$var$getRealtimeSignal = function(value, index) {
    return {
        name: `SIGRT${index + 1}`,
        number: $f11d8c4f1dab2034$var$SIGRTMIN + index,
        action: "terminate",
        description: "Application-specific signal (realtime)",
        standard: "posix"
    };
};
const $f11d8c4f1dab2034$var$SIGRTMIN = 34;
const $f11d8c4f1dab2034$var$SIGRTMAX = 64;
$f11d8c4f1dab2034$exports.SIGRTMAX = $f11d8c4f1dab2034$var$SIGRTMAX;


const $01a630a532adbfdc$var$getSignals = function() {
    const realtimeSignals = (0, $f11d8c4f1dab2034$exports.getRealtimeSignals)();
    const signals = [
        ...$84a6bc886a252426$exports.SIGNALS,
        ...realtimeSignals
    ].map($01a630a532adbfdc$var$normalizeSignal);
    return signals;
};
$01a630a532adbfdc$exports.getSignals = $01a630a532adbfdc$var$getSignals;
const $01a630a532adbfdc$var$normalizeSignal = function({ name: name , number: defaultNumber , description: description , action: action , forced: forced = false , standard: standard  }) {
    const { signals: { [name]: constantSignal  }  } = $dQzAa$os.constants;
    const supported = constantSignal !== undefined;
    const number = supported ? constantSignal : defaultNumber;
    return {
        name: name,
        number: number,
        description: description,
        supported: supported,
        action: action,
        forced: forced,
        standard: standard
    };
};



const $b84de30a201d48e8$var$getSignalsByName = function() {
    const signals = (0, $01a630a532adbfdc$exports.getSignals)();
    return signals.reduce($b84de30a201d48e8$var$getSignalByName, {});
};
const $b84de30a201d48e8$var$getSignalByName = function(signalByNameMemo, { name: name , number: number , description: description , supported: supported , action: action , forced: forced , standard: standard  }) {
    return {
        ...signalByNameMemo,
        [name]: {
            name: name,
            number: number,
            description: description,
            supported: supported,
            action: action,
            forced: forced,
            standard: standard
        }
    };
};
const $b84de30a201d48e8$var$signalsByName = $b84de30a201d48e8$var$getSignalsByName();
$b84de30a201d48e8$exports.signalsByName = $b84de30a201d48e8$var$signalsByName;
const $b84de30a201d48e8$var$getSignalsByNumber = function() {
    const signals = (0, $01a630a532adbfdc$exports.getSignals)();
    const length = $f11d8c4f1dab2034$exports.SIGRTMAX + 1;
    const signalsA = Array.from({
        length: length
    }, (value, number)=>$b84de30a201d48e8$var$getSignalByNumber(number, signals));
    return Object.assign({}, ...signalsA);
};
const $b84de30a201d48e8$var$getSignalByNumber = function(number, signals) {
    const signal = $b84de30a201d48e8$var$findSignalByNumber(number, signals);
    if (signal === undefined) return {};
    const { name: name , description: description , supported: supported , action: action , forced: forced , standard: standard  } = signal;
    return {
        [number]: {
            name: name,
            number: number,
            description: description,
            supported: supported,
            action: action,
            forced: forced,
            standard: standard
        }
    };
};
const $b84de30a201d48e8$var$findSignalByNumber = function(number, signals) {
    const signal = signals.find(({ name: name  })=>$dQzAa$os.constants.signals[name] === number);
    if (signal !== undefined) return signal;
    return signals.find((signalA)=>signalA.number === number);
};
const $b84de30a201d48e8$var$signalsByNumber = $b84de30a201d48e8$var$getSignalsByNumber();
$b84de30a201d48e8$exports.signalsByNumber = $b84de30a201d48e8$var$signalsByNumber;


var $10aa41648cea2e0f$require$signalsByName = $b84de30a201d48e8$exports.signalsByName;
const $10aa41648cea2e0f$var$getErrorPrefix = ({ timedOut: timedOut , timeout: timeout , errorCode: errorCode , signal: signal , signalDescription: signalDescription , exitCode: exitCode , isCanceled: isCanceled  })=>{
    if (timedOut) return `timed out after ${timeout} milliseconds`;
    if (isCanceled) return "was canceled";
    if (errorCode !== undefined) return `failed with ${errorCode}`;
    if (signal !== undefined) return `was killed with ${signal} (${signalDescription})`;
    if (exitCode !== undefined) return `failed with exit code ${exitCode}`;
    return "failed";
};
const $10aa41648cea2e0f$var$makeError = ({ stdout: stdout , stderr: stderr , all: all , error: error , signal: signal , exitCode: exitCode , command: command , escapedCommand: escapedCommand , timedOut: timedOut , isCanceled: isCanceled , killed: killed , parsed: { options: { timeout: timeout  }  }  })=>{
    // `signal` and `exitCode` emitted on `spawned.on('exit')` event can be `null`.
    // We normalize them to `undefined`
    exitCode = exitCode === null ? undefined : exitCode;
    signal = signal === null ? undefined : signal;
    const signalDescription = signal === undefined ? undefined : $10aa41648cea2e0f$require$signalsByName[signal].description;
    const errorCode = error && error.code;
    const prefix = $10aa41648cea2e0f$var$getErrorPrefix({
        timedOut: timedOut,
        timeout: timeout,
        errorCode: errorCode,
        signal: signal,
        signalDescription: signalDescription,
        exitCode: exitCode,
        isCanceled: isCanceled
    });
    const execaMessage = `Command ${prefix}: ${command}`;
    const isError = Object.prototype.toString.call(error) === "[object Error]";
    const shortMessage = isError ? `${execaMessage}\n${error.message}` : execaMessage;
    const message = [
        shortMessage,
        stderr,
        stdout
    ].filter(Boolean).join("\n");
    if (isError) {
        error.originalMessage = error.message;
        error.message = message;
    } else error = new Error(message);
    error.shortMessage = shortMessage;
    error.command = command;
    error.escapedCommand = escapedCommand;
    error.exitCode = exitCode;
    error.signal = signal;
    error.signalDescription = signalDescription;
    error.stdout = stdout;
    error.stderr = stderr;
    if (all !== undefined) error.all = all;
    if ("bufferedData" in error) delete error.bufferedData;
    error.failed = true;
    error.timedOut = Boolean(timedOut);
    error.isCanceled = isCanceled;
    error.killed = killed && !timedOut;
    return error;
};
$10aa41648cea2e0f$exports = $10aa41648cea2e0f$var$makeError;


var $36ecf54a36f7e3df$exports = {};
"use strict";
const $36ecf54a36f7e3df$var$aliases = [
    "stdin",
    "stdout",
    "stderr"
];
const $36ecf54a36f7e3df$var$hasAlias = (options)=>$36ecf54a36f7e3df$var$aliases.some((alias)=>options[alias] !== undefined);
const $36ecf54a36f7e3df$var$normalizeStdio = (options)=>{
    if (!options) return;
    const { stdio: stdio  } = options;
    if (stdio === undefined) return $36ecf54a36f7e3df$var$aliases.map((alias)=>options[alias]);
    if ($36ecf54a36f7e3df$var$hasAlias(options)) throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${$36ecf54a36f7e3df$var$aliases.map((alias)=>`\`${alias}\``).join(", ")}`);
    if (typeof stdio === "string") return stdio;
    if (!Array.isArray(stdio)) throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
    const length = Math.max(stdio.length, $36ecf54a36f7e3df$var$aliases.length);
    return Array.from({
        length: length
    }, (value, index)=>stdio[index]);
};
$36ecf54a36f7e3df$exports = $36ecf54a36f7e3df$var$normalizeStdio;
// `ipc` is pushed unless it is already present
$36ecf54a36f7e3df$exports.node = (options)=>{
    const stdio = $36ecf54a36f7e3df$var$normalizeStdio(options);
    if (stdio === "ipc") return "ipc";
    if (stdio === undefined || typeof stdio === "string") return [
        stdio,
        stdio,
        stdio,
        "ipc"
    ];
    if (stdio.includes("ipc")) return stdio;
    return [
        ...stdio,
        "ipc"
    ];
};


var $29b7c9b980a8b889$exports = {};
"use strict";

var $35e5b889e418e0f1$exports = {};
// Note: since nyc uses this module to output coverage, any lines
// that are in the direct sync flow of nyc's outputCoverage are
// ignored, since we can never get coverage for them.
// grab a reference to node's real process object right away
var $35e5b889e418e0f1$var$process = $parcel$global.process;
const $35e5b889e418e0f1$var$processOk = function(process) {
    return process && typeof process === "object" && typeof process.removeListener === "function" && typeof process.emit === "function" && typeof process.reallyExit === "function" && typeof process.listeners === "function" && typeof process.kill === "function" && typeof process.pid === "number" && typeof process.on === "function";
};



// some kind of non-node environment, just no-op
/* istanbul ignore if */ if (!$35e5b889e418e0f1$var$processOk($35e5b889e418e0f1$var$process)) $35e5b889e418e0f1$exports = function() {
    return function() {};
};
else {
    var $35e5b889e418e0f1$var$assert = $dQzAa$assert;
    var $35e5b889e418e0f1$var$signals = (parcelRequire("kKlMx"));
    var $35e5b889e418e0f1$var$isWin = /^win/i.test($35e5b889e418e0f1$var$process.platform);
    var $35e5b889e418e0f1$var$EE = $dQzAa$events;
    /* istanbul ignore if */ if (typeof $35e5b889e418e0f1$var$EE !== "function") $35e5b889e418e0f1$var$EE = $35e5b889e418e0f1$var$EE.EventEmitter;
    var $35e5b889e418e0f1$var$emitter;
    if ($35e5b889e418e0f1$var$process.__signal_exit_emitter__) $35e5b889e418e0f1$var$emitter = $35e5b889e418e0f1$var$process.__signal_exit_emitter__;
    else {
        $35e5b889e418e0f1$var$emitter = $35e5b889e418e0f1$var$process.__signal_exit_emitter__ = new $35e5b889e418e0f1$var$EE();
        $35e5b889e418e0f1$var$emitter.count = 0;
        $35e5b889e418e0f1$var$emitter.emitted = {};
    }
    // Because this emitter is a global, we have to check to see if a
    // previous version of this library failed to enable infinite listeners.
    // I know what you're about to say.  But literally everything about
    // signal-exit is a compromise with evil.  Get used to it.
    if (!$35e5b889e418e0f1$var$emitter.infinite) {
        $35e5b889e418e0f1$var$emitter.setMaxListeners(Infinity);
        $35e5b889e418e0f1$var$emitter.infinite = true;
    }
    $35e5b889e418e0f1$exports = function(cb, opts) {
        /* istanbul ignore if */ if (!$35e5b889e418e0f1$var$processOk($parcel$global.process)) return function() {};
        $35e5b889e418e0f1$var$assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
        if ($35e5b889e418e0f1$var$loaded === false) $35e5b889e418e0f1$var$load();
        var ev = "exit";
        if (opts && opts.alwaysLast) ev = "afterexit";
        var remove = function() {
            $35e5b889e418e0f1$var$emitter.removeListener(ev, cb);
            if ($35e5b889e418e0f1$var$emitter.listeners("exit").length === 0 && $35e5b889e418e0f1$var$emitter.listeners("afterexit").length === 0) $35e5b889e418e0f1$var$unload();
        };
        $35e5b889e418e0f1$var$emitter.on(ev, cb);
        return remove;
    };
    var $35e5b889e418e0f1$var$unload = function unload() {
        if (!$35e5b889e418e0f1$var$loaded || !$35e5b889e418e0f1$var$processOk($parcel$global.process)) return;
        $35e5b889e418e0f1$var$loaded = false;
        $35e5b889e418e0f1$var$signals.forEach(function(sig) {
            try {
                $35e5b889e418e0f1$var$process.removeListener(sig, $35e5b889e418e0f1$var$sigListeners[sig]);
            } catch (er) {}
        });
        $35e5b889e418e0f1$var$process.emit = $35e5b889e418e0f1$var$originalProcessEmit;
        $35e5b889e418e0f1$var$process.reallyExit = $35e5b889e418e0f1$var$originalProcessReallyExit;
        $35e5b889e418e0f1$var$emitter.count -= 1;
    };
    $35e5b889e418e0f1$exports.unload = $35e5b889e418e0f1$var$unload;
    var $35e5b889e418e0f1$var$emit = function emit(event, code, signal) {
        /* istanbul ignore if */ if ($35e5b889e418e0f1$var$emitter.emitted[event]) return;
        $35e5b889e418e0f1$var$emitter.emitted[event] = true;
        $35e5b889e418e0f1$var$emitter.emit(event, code, signal);
    };
    // { <signal>: <listener fn>, ... }
    var $35e5b889e418e0f1$var$sigListeners = {};
    $35e5b889e418e0f1$var$signals.forEach(function(sig) {
        $35e5b889e418e0f1$var$sigListeners[sig] = function listener() {
            /* istanbul ignore if */ if (!$35e5b889e418e0f1$var$processOk($parcel$global.process)) return;
            // If there are no other listeners, an exit is coming!
            // Simplest way: remove us and then re-send the signal.
            // We know that this will kill the process, so we can
            // safely emit now.
            var listeners = $35e5b889e418e0f1$var$process.listeners(sig);
            if (listeners.length === $35e5b889e418e0f1$var$emitter.count) {
                $35e5b889e418e0f1$var$unload();
                $35e5b889e418e0f1$var$emit("exit", null, sig);
                /* istanbul ignore next */ $35e5b889e418e0f1$var$emit("afterexit", null, sig);
                /* istanbul ignore next */ if ($35e5b889e418e0f1$var$isWin && sig === "SIGHUP") // "SIGHUP" throws an `ENOSYS` error on Windows,
                // so use a supported signal instead
                sig = "SIGINT";
                /* istanbul ignore next */ $35e5b889e418e0f1$var$process.kill($35e5b889e418e0f1$var$process.pid, sig);
            }
        };
    });
    $35e5b889e418e0f1$exports.signals = function() {
        return $35e5b889e418e0f1$var$signals;
    };
    var $35e5b889e418e0f1$var$loaded = false;
    var $35e5b889e418e0f1$var$load = function load() {
        if ($35e5b889e418e0f1$var$loaded || !$35e5b889e418e0f1$var$processOk($parcel$global.process)) return;
        $35e5b889e418e0f1$var$loaded = true;
        // This is the number of onSignalExit's that are in play.
        // It's important so that we can count the correct number of
        // listeners on signals, and don't wait for the other one to
        // handle it instead of us.
        $35e5b889e418e0f1$var$emitter.count += 1;
        $35e5b889e418e0f1$var$signals = $35e5b889e418e0f1$var$signals.filter(function(sig) {
            try {
                $35e5b889e418e0f1$var$process.on(sig, $35e5b889e418e0f1$var$sigListeners[sig]);
                return true;
            } catch (er) {
                return false;
            }
        });
        $35e5b889e418e0f1$var$process.emit = $35e5b889e418e0f1$var$processEmit;
        $35e5b889e418e0f1$var$process.reallyExit = $35e5b889e418e0f1$var$processReallyExit;
    };
    $35e5b889e418e0f1$exports.load = $35e5b889e418e0f1$var$load;
    var $35e5b889e418e0f1$var$originalProcessReallyExit = $35e5b889e418e0f1$var$process.reallyExit;
    var $35e5b889e418e0f1$var$processReallyExit = function processReallyExit(code) {
        /* istanbul ignore if */ if (!$35e5b889e418e0f1$var$processOk($parcel$global.process)) return;
        $35e5b889e418e0f1$var$process.exitCode = code || /* istanbul ignore next */ 0;
        $35e5b889e418e0f1$var$emit("exit", $35e5b889e418e0f1$var$process.exitCode, null);
        /* istanbul ignore next */ $35e5b889e418e0f1$var$emit("afterexit", $35e5b889e418e0f1$var$process.exitCode, null);
        /* istanbul ignore next */ $35e5b889e418e0f1$var$originalProcessReallyExit.call($35e5b889e418e0f1$var$process, $35e5b889e418e0f1$var$process.exitCode);
    };
    var $35e5b889e418e0f1$var$originalProcessEmit = $35e5b889e418e0f1$var$process.emit;
    var $35e5b889e418e0f1$var$processEmit = function processEmit(ev, arg) {
        if (ev === "exit" && $35e5b889e418e0f1$var$processOk($parcel$global.process)) {
            /* istanbul ignore else */ if (arg !== undefined) $35e5b889e418e0f1$var$process.exitCode = arg;
            var ret = $35e5b889e418e0f1$var$originalProcessEmit.apply(this, arguments);
            /* istanbul ignore next */ $35e5b889e418e0f1$var$emit("exit", $35e5b889e418e0f1$var$process.exitCode, null);
            /* istanbul ignore next */ $35e5b889e418e0f1$var$emit("afterexit", $35e5b889e418e0f1$var$process.exitCode, null);
            /* istanbul ignore next */ return ret;
        } else return $35e5b889e418e0f1$var$originalProcessEmit.apply(this, arguments);
    };
}


const $29b7c9b980a8b889$var$DEFAULT_FORCE_KILL_TIMEOUT = 5000;
// Monkey-patches `childProcess.kill()` to add `forceKillAfterTimeout` behavior
const $29b7c9b980a8b889$var$spawnedKill = (kill, signal = "SIGTERM", options = {})=>{
    const killResult = kill(signal);
    $29b7c9b980a8b889$var$setKillTimeout(kill, signal, options, killResult);
    return killResult;
};
const $29b7c9b980a8b889$var$setKillTimeout = (kill, signal, options, killResult)=>{
    if (!$29b7c9b980a8b889$var$shouldForceKill(signal, options, killResult)) return;
    const timeout = $29b7c9b980a8b889$var$getForceKillAfterTimeout(options);
    const t = setTimeout(()=>{
        kill("SIGKILL");
    }, timeout);
    // Guarded because there's no `.unref()` when `execa` is used in the renderer
    // process in Electron. This cannot be tested since we don't run tests in
    // Electron.
    // istanbul ignore else
    if (t.unref) t.unref();
};
const $29b7c9b980a8b889$var$shouldForceKill = (signal, { forceKillAfterTimeout: forceKillAfterTimeout  }, killResult)=>{
    return $29b7c9b980a8b889$var$isSigterm(signal) && forceKillAfterTimeout !== false && killResult;
};
const $29b7c9b980a8b889$var$isSigterm = (signal)=>{
    return signal === $dQzAa$os.constants.signals.SIGTERM || typeof signal === "string" && signal.toUpperCase() === "SIGTERM";
};
const $29b7c9b980a8b889$var$getForceKillAfterTimeout = ({ forceKillAfterTimeout: forceKillAfterTimeout = true  })=>{
    if (forceKillAfterTimeout === true) return $29b7c9b980a8b889$var$DEFAULT_FORCE_KILL_TIMEOUT;
    if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
    return forceKillAfterTimeout;
};
// `childProcess.cancel()`
const $29b7c9b980a8b889$var$spawnedCancel = (spawned, context)=>{
    const killResult = spawned.kill();
    if (killResult) context.isCanceled = true;
};
const $29b7c9b980a8b889$var$timeoutKill = (spawned, signal, reject)=>{
    spawned.kill(signal);
    reject(Object.assign(new Error("Timed out"), {
        timedOut: true,
        signal: signal
    }));
};
// `timeout` option handling
const $29b7c9b980a8b889$var$setupTimeout = (spawned, { timeout: timeout , killSignal: killSignal = "SIGTERM"  }, spawnedPromise)=>{
    if (timeout === 0 || timeout === undefined) return spawnedPromise;
    let timeoutId;
    const timeoutPromise = new Promise((resolve, reject)=>{
        timeoutId = setTimeout(()=>{
            $29b7c9b980a8b889$var$timeoutKill(spawned, killSignal, reject);
        }, timeout);
    });
    const safeSpawnedPromise = spawnedPromise.finally(()=>{
        clearTimeout(timeoutId);
    });
    return Promise.race([
        timeoutPromise,
        safeSpawnedPromise
    ]);
};
const $29b7c9b980a8b889$var$validateTimeout = ({ timeout: timeout  })=>{
    if (timeout !== undefined && (!Number.isFinite(timeout) || timeout < 0)) throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
};
// `cleanup` option handling
const $29b7c9b980a8b889$var$setExitHandler = async (spawned, { cleanup: cleanup , detached: detached  }, timedPromise)=>{
    if (!cleanup || detached) return timedPromise;
    const removeExitHandler = $35e5b889e418e0f1$exports(()=>{
        spawned.kill();
    });
    return timedPromise.finally(()=>{
        removeExitHandler();
    });
};
$29b7c9b980a8b889$exports = {
    spawnedKill: $29b7c9b980a8b889$var$spawnedKill,
    spawnedCancel: $29b7c9b980a8b889$var$spawnedCancel,
    setupTimeout: $29b7c9b980a8b889$var$setupTimeout,
    validateTimeout: $29b7c9b980a8b889$var$validateTimeout,
    setExitHandler: $29b7c9b980a8b889$var$setExitHandler
};


var $0b337dd108862151$require$spawnedKill = $29b7c9b980a8b889$exports.spawnedKill;
var $0b337dd108862151$require$spawnedCancel = $29b7c9b980a8b889$exports.spawnedCancel;
var $0b337dd108862151$require$setupTimeout = $29b7c9b980a8b889$exports.setupTimeout;
var $0b337dd108862151$require$validateTimeout = $29b7c9b980a8b889$exports.validateTimeout;
var $0b337dd108862151$require$setExitHandler = $29b7c9b980a8b889$exports.setExitHandler;
var $8867d753dad079b9$exports = {};
"use strict";
var $3f1536620aef2f5f$exports = {};
"use strict";
const $3f1536620aef2f5f$var$isStream = (stream)=>stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
$3f1536620aef2f5f$var$isStream.writable = (stream)=>$3f1536620aef2f5f$var$isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
$3f1536620aef2f5f$var$isStream.readable = (stream)=>$3f1536620aef2f5f$var$isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
$3f1536620aef2f5f$var$isStream.duplex = (stream)=>$3f1536620aef2f5f$var$isStream.writable(stream) && $3f1536620aef2f5f$var$isStream.readable(stream);
$3f1536620aef2f5f$var$isStream.transform = (stream)=>$3f1536620aef2f5f$var$isStream.duplex(stream) && typeof stream._transform === "function";
$3f1536620aef2f5f$exports = $3f1536620aef2f5f$var$isStream;


var $b9172499f48ad8a6$exports = {};
"use strict";

var $b9172499f48ad8a6$require$BufferConstants = $dQzAa$buffer.constants;


var $b9172499f48ad8a6$require$promisify = $dQzAa$util.promisify;
var $67cb2767ab3f439a$exports = {};
"use strict";

var $67cb2767ab3f439a$require$PassThroughStream = $dQzAa$stream.PassThrough;
$67cb2767ab3f439a$exports = (options)=>{
    options = {
        ...options
    };
    const { array: array  } = options;
    let { encoding: encoding  } = options;
    const isBuffer = encoding === "buffer";
    let objectMode = false;
    if (array) objectMode = !(encoding || isBuffer);
    else encoding = encoding || "utf8";
    if (isBuffer) encoding = null;
    const stream = new $67cb2767ab3f439a$require$PassThroughStream({
        objectMode: objectMode
    });
    if (encoding) stream.setEncoding(encoding);
    let length = 0;
    const chunks = [];
    stream.on("data", (chunk)=>{
        chunks.push(chunk);
        if (objectMode) length = chunks.length;
        else length += chunk.length;
    });
    stream.getBufferedValue = ()=>{
        if (array) return chunks;
        return isBuffer ? Buffer.concat(chunks, length) : chunks.join("");
    };
    stream.getBufferedLength = ()=>length;
    return stream;
};


const $b9172499f48ad8a6$var$streamPipelinePromisified = $b9172499f48ad8a6$require$promisify($dQzAa$stream.pipeline);
class $b9172499f48ad8a6$var$MaxBufferError extends Error {
    constructor(){
        super("maxBuffer exceeded");
        this.name = "MaxBufferError";
    }
}
async function $b9172499f48ad8a6$var$getStream(inputStream, options) {
    if (!inputStream) throw new Error("Expected a stream");
    options = {
        maxBuffer: Infinity,
        ...options
    };
    const { maxBuffer: maxBuffer  } = options;
    const stream = $67cb2767ab3f439a$exports(options);
    await new Promise((resolve, reject)=>{
        const rejectPromise = (error)=>{
            // Don't retrieve an oversized buffer.
            if (error && stream.getBufferedLength() <= $b9172499f48ad8a6$require$BufferConstants.MAX_LENGTH) error.bufferedData = stream.getBufferedValue();
            reject(error);
        };
        (async ()=>{
            try {
                await $b9172499f48ad8a6$var$streamPipelinePromisified(inputStream, stream);
                resolve();
            } catch (error) {
                rejectPromise(error);
            }
        })();
        stream.on("data", ()=>{
            if (stream.getBufferedLength() > maxBuffer) rejectPromise(new $b9172499f48ad8a6$var$MaxBufferError());
        });
    });
    return stream.getBufferedValue();
}
$b9172499f48ad8a6$exports = $b9172499f48ad8a6$var$getStream;
$b9172499f48ad8a6$exports.buffer = (stream, options)=>$b9172499f48ad8a6$var$getStream(stream, {
        ...options,
        encoding: "buffer"
    });
$b9172499f48ad8a6$exports.array = (stream, options)=>$b9172499f48ad8a6$var$getStream(stream, {
        ...options,
        array: true
    });
$b9172499f48ad8a6$exports.MaxBufferError = $b9172499f48ad8a6$var$MaxBufferError;


var $398568833c751b7a$exports = {};
"use strict";

var $398568833c751b7a$require$PassThrough = $dQzAa$stream.PassThrough;
$398568833c751b7a$exports = function() {
    var sources = [];
    var output = new $398568833c751b7a$require$PassThrough({
        objectMode: true
    });
    output.setMaxListeners(0);
    output.add = add;
    output.isEmpty = isEmpty;
    output.on("unpipe", remove);
    Array.prototype.slice.call(arguments).forEach(add);
    return output;
    function add(source) {
        if (Array.isArray(source)) {
            source.forEach(add);
            return this;
        }
        sources.push(source);
        source.once("end", remove.bind(null, source));
        source.once("error", output.emit.bind(output, "error"));
        source.pipe(output, {
            end: false
        });
        return this;
    }
    function isEmpty() {
        return sources.length == 0;
    }
    function remove(source) {
        sources = sources.filter(function(it) {
            return it !== source;
        });
        if (!sources.length && output.readable) {
            output.end();
        }
    }
};


// `input` option
const $8867d753dad079b9$var$handleInput = (spawned, input)=>{
    // Checking for stdin is workaround for https://github.com/nodejs/node/issues/26852
    // @todo remove `|| spawned.stdin === undefined` once we drop support for Node.js <=12.2.0
    if (input === undefined || spawned.stdin === undefined) return;
    if ($3f1536620aef2f5f$exports(input)) input.pipe(spawned.stdin);
    else spawned.stdin.end(input);
};
// `all` interleaves `stdout` and `stderr`
const $8867d753dad079b9$var$makeAllStream = (spawned, { all: all  })=>{
    if (!all || !spawned.stdout && !spawned.stderr) return;
    const mixed = $398568833c751b7a$exports();
    if (spawned.stdout) mixed.add(spawned.stdout);
    if (spawned.stderr) mixed.add(spawned.stderr);
    return mixed;
};
// On failure, `result.stdout|stderr|all` should contain the currently buffered stream
const $8867d753dad079b9$var$getBufferedData = async (stream, streamPromise)=>{
    if (!stream) return;
    stream.destroy();
    try {
        return await streamPromise;
    } catch (error) {
        return error.bufferedData;
    }
};
const $8867d753dad079b9$var$getStreamPromise = (stream, { encoding: encoding , buffer: buffer , maxBuffer: maxBuffer  })=>{
    if (!stream || !buffer) return;
    if (encoding) return $b9172499f48ad8a6$exports(stream, {
        encoding: encoding,
        maxBuffer: maxBuffer
    });
    return $b9172499f48ad8a6$exports.buffer(stream, {
        maxBuffer: maxBuffer
    });
};
// Retrieve result of child process: exit code, signal, error, streams (stdout/stderr/all)
const $8867d753dad079b9$var$getSpawnedResult = async ({ stdout: stdout , stderr: stderr , all: all  }, { encoding: encoding , buffer: buffer , maxBuffer: maxBuffer  }, processDone)=>{
    const stdoutPromise = $8867d753dad079b9$var$getStreamPromise(stdout, {
        encoding: encoding,
        buffer: buffer,
        maxBuffer: maxBuffer
    });
    const stderrPromise = $8867d753dad079b9$var$getStreamPromise(stderr, {
        encoding: encoding,
        buffer: buffer,
        maxBuffer: maxBuffer
    });
    const allPromise = $8867d753dad079b9$var$getStreamPromise(all, {
        encoding: encoding,
        buffer: buffer,
        maxBuffer: maxBuffer * 2
    });
    try {
        return await Promise.all([
            processDone,
            stdoutPromise,
            stderrPromise,
            allPromise
        ]);
    } catch (error) {
        return Promise.all([
            {
                error: error,
                signal: error.signal,
                timedOut: error.timedOut
            },
            $8867d753dad079b9$var$getBufferedData(stdout, stdoutPromise),
            $8867d753dad079b9$var$getBufferedData(stderr, stderrPromise),
            $8867d753dad079b9$var$getBufferedData(all, allPromise)
        ]);
    }
};
const $8867d753dad079b9$var$validateInputSync = ({ input: input  })=>{
    if ($3f1536620aef2f5f$exports(input)) throw new TypeError("The `input` option cannot be a stream in sync mode");
};
$8867d753dad079b9$exports = {
    handleInput: $8867d753dad079b9$var$handleInput,
    makeAllStream: $8867d753dad079b9$var$makeAllStream,
    getSpawnedResult: $8867d753dad079b9$var$getSpawnedResult,
    validateInputSync: $8867d753dad079b9$var$validateInputSync
};


var $0b337dd108862151$require$handleInput = $8867d753dad079b9$exports.handleInput;
var $0b337dd108862151$require$getSpawnedResult = $8867d753dad079b9$exports.getSpawnedResult;
var $0b337dd108862151$require$makeAllStream = $8867d753dad079b9$exports.makeAllStream;
var $0b337dd108862151$require$validateInputSync = $8867d753dad079b9$exports.validateInputSync;
var $4a5f78fb787a3698$exports = {};
"use strict";
const $4a5f78fb787a3698$var$nativePromisePrototype = (async ()=>{})().constructor.prototype;
const $4a5f78fb787a3698$var$descriptors = [
    "then",
    "catch",
    "finally"
].map((property)=>[
        property,
        Reflect.getOwnPropertyDescriptor($4a5f78fb787a3698$var$nativePromisePrototype, property)
    ]);
// The return value is a mixin of `childProcess` and `Promise`
const $4a5f78fb787a3698$var$mergePromise = (spawned, promise)=>{
    for (const [property, descriptor] of $4a5f78fb787a3698$var$descriptors){
        // Starting the main `promise` is deferred to avoid consuming streams
        const value = typeof promise === "function" ? (...args)=>Reflect.apply(descriptor.value, promise(), args) : descriptor.value.bind(promise);
        Reflect.defineProperty(spawned, property, {
            ...descriptor,
            value: value
        });
    }
    return spawned;
};
// Use promises instead of `child_process` events
const $4a5f78fb787a3698$var$getSpawnedPromise = (spawned)=>{
    return new Promise((resolve, reject)=>{
        spawned.on("exit", (exitCode, signal)=>{
            resolve({
                exitCode: exitCode,
                signal: signal
            });
        });
        spawned.on("error", (error)=>{
            reject(error);
        });
        if (spawned.stdin) spawned.stdin.on("error", (error)=>{
            reject(error);
        });
    });
};
$4a5f78fb787a3698$exports = {
    mergePromise: $4a5f78fb787a3698$var$mergePromise,
    getSpawnedPromise: $4a5f78fb787a3698$var$getSpawnedPromise
};


var $0b337dd108862151$require$mergePromise = $4a5f78fb787a3698$exports.mergePromise;
var $0b337dd108862151$require$getSpawnedPromise = $4a5f78fb787a3698$exports.getSpawnedPromise;
var $99850708472e48cf$exports = {};
"use strict";
const $99850708472e48cf$var$normalizeArgs = (file, args = [])=>{
    if (!Array.isArray(args)) return [
        file
    ];
    return [
        file,
        ...args
    ];
};
const $99850708472e48cf$var$NO_ESCAPE_REGEXP = /^[\w.-]+$/;
const $99850708472e48cf$var$DOUBLE_QUOTES_REGEXP = /"/g;
const $99850708472e48cf$var$escapeArg = (arg)=>{
    if (typeof arg !== "string" || $99850708472e48cf$var$NO_ESCAPE_REGEXP.test(arg)) return arg;
    return `"${arg.replace($99850708472e48cf$var$DOUBLE_QUOTES_REGEXP, '\\"')}"`;
};
const $99850708472e48cf$var$joinCommand = (file, args)=>{
    return $99850708472e48cf$var$normalizeArgs(file, args).join(" ");
};
const $99850708472e48cf$var$getEscapedCommand = (file, args)=>{
    return $99850708472e48cf$var$normalizeArgs(file, args).map((arg)=>$99850708472e48cf$var$escapeArg(arg)).join(" ");
};
const $99850708472e48cf$var$SPACES_REGEXP = / +/g;
// Handle `execa.command()`
const $99850708472e48cf$var$parseCommand = (command)=>{
    const tokens = [];
    for (const token of command.trim().split($99850708472e48cf$var$SPACES_REGEXP)){
        // Allow spaces to be escaped by a backslash if not meant as a delimiter
        const previousToken = tokens[tokens.length - 1];
        if (previousToken && previousToken.endsWith("\\")) // Merge previous token with current one
        tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}`;
        else tokens.push(token);
    }
    return tokens;
};
$99850708472e48cf$exports = {
    joinCommand: $99850708472e48cf$var$joinCommand,
    getEscapedCommand: $99850708472e48cf$var$getEscapedCommand,
    parseCommand: $99850708472e48cf$var$parseCommand
};


var $0b337dd108862151$require$joinCommand = $99850708472e48cf$exports.joinCommand;
var $0b337dd108862151$require$parseCommand = $99850708472e48cf$exports.parseCommand;
var $0b337dd108862151$require$getEscapedCommand = $99850708472e48cf$exports.getEscapedCommand;
const $0b337dd108862151$var$DEFAULT_MAX_BUFFER = 100000000;
const $0b337dd108862151$var$getEnv = ({ env: envOption , extendEnv: extendEnv , preferLocal: preferLocal , localDir: localDir , execPath: execPath  })=>{
    const env = extendEnv ? {
        ...process.env,
        ...envOption
    } : envOption;
    if (preferLocal) return $4dd4b6c7710decab$exports.env({
        env: env,
        cwd: localDir,
        execPath: execPath
    });
    return env;
};
const $0b337dd108862151$var$handleArguments = (file, args, options = {})=>{
    const parsed = $4287ffb7ac7b713c$exports._parse(file, args, options);
    file = parsed.command;
    args = parsed.args;
    options = parsed.options;
    options = {
        maxBuffer: $0b337dd108862151$var$DEFAULT_MAX_BUFFER,
        buffer: true,
        stripFinalNewline: true,
        extendEnv: true,
        preferLocal: false,
        localDir: options.cwd || process.cwd(),
        execPath: process.execPath,
        encoding: "utf8",
        reject: true,
        cleanup: true,
        all: false,
        windowsHide: true,
        ...options
    };
    options.env = $0b337dd108862151$var$getEnv(options);
    options.stdio = $36ecf54a36f7e3df$exports(options);
    if (process.platform === "win32" && $dQzAa$path.basename(file, ".exe") === "cmd") // #116
    args.unshift("/q");
    return {
        file: file,
        args: args,
        options: options,
        parsed: parsed
    };
};
const $0b337dd108862151$var$handleOutput = (options, value, error)=>{
    if (typeof value !== "string" && !Buffer.isBuffer(value)) // When `execa.sync()` errors, we normalize it to '' to mimic `execa()`
    return error === undefined ? undefined : "";
    if (options.stripFinalNewline) return $3f9cf3c038ea29f8$exports(value);
    return value;
};
const $0b337dd108862151$var$execa = (file, args, options)=>{
    const parsed = $0b337dd108862151$var$handleArguments(file, args, options);
    const command = $0b337dd108862151$require$joinCommand(file, args);
    const escapedCommand = $0b337dd108862151$require$getEscapedCommand(file, args);
    $0b337dd108862151$require$validateTimeout(parsed.options);
    let spawned;
    try {
        spawned = $dQzAa$child_process.spawn(parsed.file, parsed.args, parsed.options);
    } catch (error) {
        // Ensure the returned error is always both a promise and a child process
        const dummySpawned = new $dQzAa$child_process.ChildProcess();
        const errorPromise = Promise.reject($10aa41648cea2e0f$exports({
            error: error,
            stdout: "",
            stderr: "",
            all: "",
            command: command,
            escapedCommand: escapedCommand,
            parsed: parsed,
            timedOut: false,
            isCanceled: false,
            killed: false
        }));
        return $0b337dd108862151$require$mergePromise(dummySpawned, errorPromise);
    }
    const spawnedPromise = $0b337dd108862151$require$getSpawnedPromise(spawned);
    const timedPromise = $0b337dd108862151$require$setupTimeout(spawned, parsed.options, spawnedPromise);
    const processDone = $0b337dd108862151$require$setExitHandler(spawned, parsed.options, timedPromise);
    const context = {
        isCanceled: false
    };
    spawned.kill = $0b337dd108862151$require$spawnedKill.bind(null, spawned.kill.bind(spawned));
    spawned.cancel = $0b337dd108862151$require$spawnedCancel.bind(null, spawned, context);
    const handlePromise = async ()=>{
        const [{ error: error , exitCode: exitCode , signal: signal , timedOut: timedOut  }, stdoutResult, stderrResult, allResult] = await $0b337dd108862151$require$getSpawnedResult(spawned, parsed.options, processDone);
        const stdout = $0b337dd108862151$var$handleOutput(parsed.options, stdoutResult);
        const stderr = $0b337dd108862151$var$handleOutput(parsed.options, stderrResult);
        const all = $0b337dd108862151$var$handleOutput(parsed.options, allResult);
        if (error || exitCode !== 0 || signal !== null) {
            const returnedError = $10aa41648cea2e0f$exports({
                error: error,
                exitCode: exitCode,
                signal: signal,
                stdout: stdout,
                stderr: stderr,
                all: all,
                command: command,
                escapedCommand: escapedCommand,
                parsed: parsed,
                timedOut: timedOut,
                isCanceled: context.isCanceled,
                killed: spawned.killed
            });
            if (!parsed.options.reject) return returnedError;
            throw returnedError;
        }
        return {
            command: command,
            escapedCommand: escapedCommand,
            exitCode: 0,
            stdout: stdout,
            stderr: stderr,
            all: all,
            failed: false,
            timedOut: false,
            isCanceled: false,
            killed: false
        };
    };
    const handlePromiseOnce = $fe62cd600ad6aea1$exports(handlePromise);
    $0b337dd108862151$require$handleInput(spawned, parsed.options.input);
    spawned.all = $0b337dd108862151$require$makeAllStream(spawned, parsed.options);
    return $0b337dd108862151$require$mergePromise(spawned, handlePromiseOnce);
};
$0b337dd108862151$exports = $0b337dd108862151$var$execa;
$0b337dd108862151$exports.sync = (file, args, options)=>{
    const parsed = $0b337dd108862151$var$handleArguments(file, args, options);
    const command = $0b337dd108862151$require$joinCommand(file, args);
    const escapedCommand = $0b337dd108862151$require$getEscapedCommand(file, args);
    $0b337dd108862151$require$validateInputSync(parsed.options);
    let result;
    try {
        result = $dQzAa$child_process.spawnSync(parsed.file, parsed.args, parsed.options);
    } catch (error) {
        throw $10aa41648cea2e0f$exports({
            error: error,
            stdout: "",
            stderr: "",
            all: "",
            command: command,
            escapedCommand: escapedCommand,
            parsed: parsed,
            timedOut: false,
            isCanceled: false,
            killed: false
        });
    }
    const stdout = $0b337dd108862151$var$handleOutput(parsed.options, result.stdout, result.error);
    const stderr = $0b337dd108862151$var$handleOutput(parsed.options, result.stderr, result.error);
    if (result.error || result.status !== 0 || result.signal !== null) {
        const error1 = $10aa41648cea2e0f$exports({
            stdout: stdout,
            stderr: stderr,
            error: result.error,
            signal: result.signal,
            exitCode: result.status,
            command: command,
            escapedCommand: escapedCommand,
            parsed: parsed,
            timedOut: result.error && result.error.code === "ETIMEDOUT",
            isCanceled: false,
            killed: result.signal !== null
        });
        if (!parsed.options.reject) return error1;
        throw error1;
    }
    return {
        command: command,
        escapedCommand: escapedCommand,
        exitCode: 0,
        stdout: stdout,
        stderr: stderr,
        failed: false,
        timedOut: false,
        isCanceled: false,
        killed: false
    };
};
$0b337dd108862151$exports.command = (command, options)=>{
    const [file, ...args] = $0b337dd108862151$require$parseCommand(command);
    return $0b337dd108862151$var$execa(file, args, options);
};
$0b337dd108862151$exports.commandSync = (command, options)=>{
    const [file, ...args] = $0b337dd108862151$require$parseCommand(command);
    return $0b337dd108862151$var$execa.sync(file, args, options);
};
$0b337dd108862151$exports.node = (scriptPath, args, options = {})=>{
    if (args && !Array.isArray(args) && typeof args === "object") {
        options = args;
        args = [];
    }
    const stdio = $36ecf54a36f7e3df$exports.node(options);
    const defaultExecArgv = process.execArgv.filter((arg)=>!arg.startsWith("--inspect"));
    const { nodePath: nodePath = process.execPath , nodeOptions: nodeOptions = defaultExecArgv  } = options;
    return $0b337dd108862151$var$execa(nodePath, [
        ...nodeOptions,
        scriptPath,
        ...Array.isArray(args) ? args : []
    ], {
        ...options,
        stdin: undefined,
        stdout: undefined,
        stderr: undefined,
        stdio: stdio,
        shell: false
    });
};


function $5643e448a91ad22e$var$n(n, o, e, r) {
    Object.defineProperty(n, o, {
        get: e,
        set: r,
        enumerable: !0,
        configurable: !0
    });
}
function $5643e448a91ad22e$export$7683bf1311d8252() {
    return null !== (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("sudo", {
        nothrow: !0
    });
}
function $5643e448a91ad22e$export$e3140dc7d0c35e48() {
    var ref;
    return 0 === ((ref = process.getuid) === null || ref === void 0 ? void 0 : ref.call(process)) || !!process.env.CI;
}
function $5643e448a91ad22e$export$316200228f28b8ce() {
    return $5643e448a91ad22e$export$e3140dc7d0c35e48() && $5643e448a91ad22e$export$7683bf1311d8252();
}
function $5643e448a91ad22e$export$d976d47922ae9667(n) {
    return $5643e448a91ad22e$export$316200228f28b8ce() ? "sudo " + n : n;
}
function $5643e448a91ad22e$export$58f152936f209932(n, o = [], e = {
    stdio: "inherit",
    shell: !0
}) {
    return $5643e448a91ad22e$export$316200228f28b8ce() ? (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports))).commandSync("sudo " + [
        n,
        ...o
    ].map((n)=>`'${n}'`).join(" "), e) : (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports))).sync(n, o, e);
}
function $5643e448a91ad22e$export$351270479e2eef26(n, o = [], e = {
    stdio: "inherit",
    shell: !0
}) {
    return $5643e448a91ad22e$export$316200228f28b8ce() ? (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports))).command("sudo " + [
        n,
        ...o
    ].map((n)=>`'${n}'`).join(" "), e) : (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports)))(n, o, e);
}
function $5643e448a91ad22e$export$fc970ed23da99565() {
    return "win32" === process.platform ? $5643e448a91ad22e$export$36ad181701cee597() : $5643e448a91ad22e$export$e3140dc7d0c35e48();
}
var $5643e448a91ad22e$var$d = {};
$5643e448a91ad22e$var$n($5643e448a91ad22e$var$d, "hasSudo", ()=>$5643e448a91ad22e$export$7683bf1311d8252), $5643e448a91ad22e$var$n($5643e448a91ad22e$var$d, "isRoot", ()=>$5643e448a91ad22e$export$e3140dc7d0c35e48), $5643e448a91ad22e$var$n($5643e448a91ad22e$var$d, "isSudo", ()=>$5643e448a91ad22e$export$316200228f28b8ce), $5643e448a91ad22e$var$n($5643e448a91ad22e$var$d, "prependSudo", ()=>$5643e448a91ad22e$export$d976d47922ae9667), $5643e448a91ad22e$var$n($5643e448a91ad22e$var$d, "execRootSync", ()=>$5643e448a91ad22e$export$58f152936f209932), $5643e448a91ad22e$var$n($5643e448a91ad22e$var$d, "execRoot", ()=>$5643e448a91ad22e$export$351270479e2eef26);
var $5643e448a91ad22e$var$m = {};
$5643e448a91ad22e$var$n($5643e448a91ad22e$var$m, "isAdminWindows", ()=>$5643e448a91ad22e$export$36ad181701cee597), $5643e448a91ad22e$var$n($5643e448a91ad22e$var$m, "isAdminPosix", ()=>$5643e448a91ad22e$export$2ebf12717e6b5bb8), $5643e448a91ad22e$var$n($5643e448a91ad22e$var$m, "isAdmin", ()=>$5643e448a91ad22e$export$fc970ed23da99565);
const $5643e448a91ad22e$export$36ad181701cee597 = async ()=>{
    if ("win32" !== process.platform) return !1;
    try {
        var _systemdrive;
        return await (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports)))("fsutil", [
            "dirty",
            "query",
            (_systemdrive = process.env.systemdrive) !== null && _systemdrive !== void 0 ? _systemdrive : ""
        ]), !0;
    } catch (n) {
        return "ENOENT" === n.code && (async ()=>{
            try {
                return await (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports)))("fltmc"), !0;
            } catch  {
                return !1;
            }
        })();
    }
}, $5643e448a91ad22e$export$2ebf12717e6b5bb8 = $5643e448a91ad22e$export$e3140dc7d0c35e48;



var $9Ei2d = parcelRequire("9Ei2d");

var $5Knzt = parcelRequire("5Knzt");

var $9Ei2d = parcelRequire("9Ei2d");

var $5Knzt = parcelRequire("5Knzt");

var $39a2120dff7d559f$exports = {};
"use strict";

const $39a2120dff7d559f$var$homeDirectory = $dQzAa$os.homedir();
$39a2120dff7d559f$exports = (pathWithTilde)=>{
    if (typeof pathWithTilde !== "string") throw new TypeError(`Expected a string, got ${typeof pathWithTilde}`);
    return $39a2120dff7d559f$var$homeDirectory ? pathWithTilde.replace(/^~(?=$|\/|\\)/, $39a2120dff7d559f$var$homeDirectory) : pathWithTilde;
};












function $4f61f8f98d0e8b39$var$e(e) {
    return e && e.__esModule ? e.default : e;
}
function $4f61f8f98d0e8b39$var$t(e, t, n, r) {
    Object.defineProperty(e, t, {
        get: n,
        set: r,
        enumerable: !0,
        configurable: !0
    });
}
function $4f61f8f98d0e8b39$var$n(e, t, r) {
    if ("function" == typeof t && (r = t, t = {}), !r) {
        if ("function" != typeof Promise) throw new TypeError("callback not provided");
        return new Promise((r, o)=>{
            $4f61f8f98d0e8b39$var$n(e, t || {}, (e, t)=>{
                e ? o(e) : r(t);
            });
        });
    }
    $4f61f8f98d0e8b39$var$W(e, t || {}, (e, n)=>{
        e && ("EACCES" === e.code || t && t.ignoreErrors) && (e = null, n = !1), r(e, n);
    });
}
function $4f61f8f98d0e8b39$var$r(e, t) {
    const n = e.options.env || process.env, r = process.cwd(), o = null != e.options.cwd, i = o && void 0 !== process.chdir && !process.chdir.disabled;
    if (i) try {
        process.chdir(e.options.cwd);
    } catch (e1) {}
    let s;
    try {
        s = $4f61f8f98d0e8b39$var$D.sync(e.command, {
            path: n[$4f61f8f98d0e8b39$var$J({
                env: n
            })],
            pathExt: t ? (0, $dQzAa$path.delimiter) : void 0
        });
    } catch (e2) {} finally{
        i && process.chdir(r);
    }
    return s && (s = (0, $dQzAa$path.resolve)(o ? e.options.cwd : "", s)), s;
}
function $4f61f8f98d0e8b39$var$o(e, t) {
    return Object.assign(Error(`${t} ${e.command} ENOENT`), {
        code: "ENOENT",
        errno: "ENOENT",
        syscall: `${t} ${e.command}`,
        path: e.command,
        spawnargs: e.args
    });
}
function $4f61f8f98d0e8b39$var$i(e, t) {
    return $4f61f8f98d0e8b39$var$ue && 1 === e && !t.file ? $4f61f8f98d0e8b39$var$o(t.original, "spawn") : null;
}
function $4f61f8f98d0e8b39$var$s(e, t, n) {
    const r = $4f61f8f98d0e8b39$var$Q(e, t, n), o = (0, $dQzAa$child_process.spawn)(r.command, r.args, r.options);
    return $4f61f8f98d0e8b39$var$le.hookChildProcess(o, r), o;
}
async function $4f61f8f98d0e8b39$var$a(e, t) {
    if (!e) throw Error("Expected a stream");
    t = {
        maxBuffer: 1 / 0,
        ...t
    };
    const { maxBuffer: n  } = t, r = $4f61f8f98d0e8b39$var$ct(t);
    return await new Promise((t, o)=>{
        const i = (e)=>{
            e && r.getBufferedLength() <= $4f61f8f98d0e8b39$var$lt.MAX_LENGTH && (e.bufferedData = r.getBufferedValue()), o(e);
        };
        (async ()=>{
            try {
                await $4f61f8f98d0e8b39$var$pt(e, r), t();
            } catch (e1) {
                i(e1);
            }
        })(), r.on("data", ()=>{
            r.getBufferedLength() > n && i(new $4f61f8f98d0e8b39$var$mt);
        });
    }), r.getBufferedValue();
}
function $4f61f8f98d0e8b39$export$7683bf1311d8252() {
    return null !== $4f61f8f98d0e8b39$var$e($4f61f8f98d0e8b39$var$D).sync("sudo", {
        nothrow: !0
    });
}
function $4f61f8f98d0e8b39$export$e3140dc7d0c35e48() {
    var ref;
    return 0 === ((ref = process.getuid) === null || ref === void 0 ? void 0 : ref.call(process)) || !!process.env.CI;
}
function $4f61f8f98d0e8b39$export$316200228f28b8ce() {
    return $4f61f8f98d0e8b39$export$e3140dc7d0c35e48() && $4f61f8f98d0e8b39$export$7683bf1311d8252();
}
function $4f61f8f98d0e8b39$export$d976d47922ae9667(e) {
    return $4f61f8f98d0e8b39$export$316200228f28b8ce() ? "sudo " + e : e;
}
function $4f61f8f98d0e8b39$export$58f152936f209932(t, n = [], r = {
    stdio: "inherit",
    shell: !0
}) {
    return $4f61f8f98d0e8b39$export$316200228f28b8ce() ? $4f61f8f98d0e8b39$var$e($4f61f8f98d0e8b39$var$Z).commandSync("sudo " + [
        t,
        ...n
    ].map((e)=>`'${e}'`).join(" "), r) : $4f61f8f98d0e8b39$var$e($4f61f8f98d0e8b39$var$Z).sync(t, n, r);
}
function $4f61f8f98d0e8b39$export$351270479e2eef26(t, n = [], r = {
    stdio: "inherit",
    shell: !0
}) {
    return $4f61f8f98d0e8b39$export$316200228f28b8ce() ? $4f61f8f98d0e8b39$var$e($4f61f8f98d0e8b39$var$Z).command("sudo " + [
        t,
        ...n
    ].map((e)=>`'${e}'`).join(" "), r) : $4f61f8f98d0e8b39$var$e($4f61f8f98d0e8b39$var$Z)(t, n, r);
}
function $4f61f8f98d0e8b39$export$fc970ed23da99565() {
    return "win32" === process.platform ? $4f61f8f98d0e8b39$export$36ad181701cee597() : $4f61f8f98d0e8b39$export$e3140dc7d0c35e48();
}
var $4f61f8f98d0e8b39$var$$ = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof $parcel$global ? $parcel$global : {}, $4f61f8f98d0e8b39$var$B = {}, $4f61f8f98d0e8b39$var$k = {}, $4f61f8f98d0e8b39$var$M = $4f61f8f98d0e8b39$var$$.parcelRequireb51e;
null == $4f61f8f98d0e8b39$var$M && (($4f61f8f98d0e8b39$var$M = (e)=>{
    if (e in $4f61f8f98d0e8b39$var$B) return $4f61f8f98d0e8b39$var$B[e].exports;
    if (e in $4f61f8f98d0e8b39$var$k) {
        var t = $4f61f8f98d0e8b39$var$k[e];
        delete $4f61f8f98d0e8b39$var$k[e];
        var n = {
            id: e,
            exports: {}
        };
        return $4f61f8f98d0e8b39$var$B[e] = n, t.call(n.exports, n, n.exports), n.exports;
    }
    var r = Error("Cannot find module '" + e + "'");
    throw r.code = "MODULE_NOT_FOUND", r;
}).register = (e, t)=>{
    $4f61f8f98d0e8b39$var$k[e] = t;
}, $4f61f8f98d0e8b39$var$$.parcelRequireb51e = $4f61f8f98d0e8b39$var$M), $4f61f8f98d0e8b39$var$M.register("djkmR", (e, t)=>{
    function n(e, t, n) {
        return !(!e.isSymbolicLink() && !e.isFile()) && ((e, t)=>{
            var n = void 0 !== t.pathExt ? t.pathExt : process.env.PATHEXT;
            if (!n) return !0;
            if (-1 !== (n = n.split(";")).indexOf("")) return !0;
            for(var r = 0; n.length > r; r++){
                var o = n[r].toLowerCase();
                if (o && e.substr(-o.length).toLowerCase() === o) return !0;
            }
            return !1;
        })(t, n);
    }
    function r(e, t, r) {
        (0, $dQzAa$fs.stat)(e, (o, i)=>{
            r(o, !o && n(i, e, t));
        });
    }
    e.exports = r, r.sync = (e, t)=>n((0, $dQzAa$fs.statSync)(e), e, t);
}), $4f61f8f98d0e8b39$var$M.register("e1CjR", (e, t)=>{
    function n(e, t, n) {
        (0, $dQzAa$fs.stat)(e, (e, o)=>{
            n(e, !e && r(o, t));
        });
    }
    function r(e, t) {
        return e.isFile() && ((e, t)=>{
            var n = e.mode, r = e.uid, o = e.gid, i = void 0 !== t.uid ? t.uid : process.getuid && process.getuid(), s = void 0 !== t.gid ? t.gid : process.getgid && process.getgid(), a = parseInt("100", 8), c = parseInt("010", 8), d = a | c;
            return n & parseInt("001", 8) || n & c && o === s || n & a && r === i || n & d && 0 === i;
        })(e, t);
    }
    e.exports = n, n.sync = (e, t)=>r((0, $dQzAa$fs.statSync)(e), t);
}), $4f61f8f98d0e8b39$var$M.register("4c98W", (e, t)=>{
    e.exports = [
        "SIGABRT",
        "SIGALRM",
        "SIGHUP",
        "SIGINT",
        "SIGTERM"
    ], "win32" !== process.platform && e.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT"), "linux" === process.platform && e.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
});
var $4f61f8f98d0e8b39$var$U = {};
$4f61f8f98d0e8b39$var$t($4f61f8f98d0e8b39$var$U, "hasSudo", ()=>$4f61f8f98d0e8b39$export$7683bf1311d8252), $4f61f8f98d0e8b39$var$t($4f61f8f98d0e8b39$var$U, "isRoot", ()=>$4f61f8f98d0e8b39$export$e3140dc7d0c35e48), $4f61f8f98d0e8b39$var$t($4f61f8f98d0e8b39$var$U, "isSudo", ()=>$4f61f8f98d0e8b39$export$316200228f28b8ce), $4f61f8f98d0e8b39$var$t($4f61f8f98d0e8b39$var$U, "prependSudo", ()=>$4f61f8f98d0e8b39$export$d976d47922ae9667), $4f61f8f98d0e8b39$var$t($4f61f8f98d0e8b39$var$U, "execRootSync", ()=>$4f61f8f98d0e8b39$export$58f152936f209932), $4f61f8f98d0e8b39$var$t($4f61f8f98d0e8b39$var$U, "execRoot", ()=>$4f61f8f98d0e8b39$export$351270479e2eef26);
var $4f61f8f98d0e8b39$var$D = {};
const $4f61f8f98d0e8b39$var$F = "win32" === process.platform || "cygwin" === process.env.OSTYPE || "msys" === process.env.OSTYPE, $4f61f8f98d0e8b39$var$H = $4f61f8f98d0e8b39$var$F ? ";" : ":";
var $4f61f8f98d0e8b39$var$W, $4f61f8f98d0e8b39$var$K = {};
$4f61f8f98d0e8b39$var$W = "win32" === process.platform || $4f61f8f98d0e8b39$var$$.TESTING_WINDOWS ? $4f61f8f98d0e8b39$var$M("djkmR") : $4f61f8f98d0e8b39$var$M("e1CjR"), $4f61f8f98d0e8b39$var$K = $4f61f8f98d0e8b39$var$n, $4f61f8f98d0e8b39$var$n.sync = (e, t)=>{
    try {
        return $4f61f8f98d0e8b39$var$W.sync(e, t || {});
    } catch (e1) {
        if (t && t.ignoreErrors || "EACCES" === e1.code) return !1;
        throw e1;
    }
};
const $4f61f8f98d0e8b39$var$X = (e)=>Object.assign(Error("not found: " + e), {
        code: "ENOENT"
    }), $4f61f8f98d0e8b39$var$V = (e, t)=>{
    const n = t.colon || $4f61f8f98d0e8b39$var$H, r = e.match(/\//) || $4f61f8f98d0e8b39$var$F && e.match(/\\/) ? [
        ""
    ] : [
        ...$4f61f8f98d0e8b39$var$F ? [
            process.cwd()
        ] : [],
        ...(t.path || process.env.PATH || "").split(n)
    ], o = $4f61f8f98d0e8b39$var$F ? t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", i = $4f61f8f98d0e8b39$var$F ? o.split(n) : [
        ""
    ];
    return $4f61f8f98d0e8b39$var$F && -1 !== e.indexOf(".") && "" !== i[0] && i.unshift(""), {
        pathEnv: r,
        pathExt: i,
        pathExtExe: o
    };
}, $4f61f8f98d0e8b39$var$q = (e, t, n)=>{
    "function" == typeof t && (n = t, t = {}), t || (t = {});
    const { pathEnv: r , pathExt: o , pathExtExe: i  } = $4f61f8f98d0e8b39$var$V(e, t), s = [], a = (n)=>new Promise((o, i)=>{
            if (n === r.length) return t.all && s.length ? o(s) : i($4f61f8f98d0e8b39$var$X(e));
            const a = r[n], d = /^".*"$/.test(a) ? a.slice(1, -1) : a, l = (0, $dQzAa$path.join)(d, e), u = !d && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + l : l;
            o(c(u, n, 0));
        }), c = (e, n, r)=>new Promise((d, l)=>{
            if (r === o.length) return d(a(n + 1));
            const u = o[r];
            $4f61f8f98d0e8b39$var$K(e + u, {
                pathExt: i
            }, (o, i)=>{
                if (!o && i) {
                    if (!t.all) return d(e + u);
                    s.push(e + u);
                }
                return d(c(e, n, r + 1));
            });
        });
    return n ? a(0).then((e)=>n(null, e), n) : a(0);
};
$4f61f8f98d0e8b39$var$D = $4f61f8f98d0e8b39$var$q, $4f61f8f98d0e8b39$var$q.sync = (e, t)=>{
    t = t || {};
    const { pathEnv: n , pathExt: r , pathExtExe: o  } = $4f61f8f98d0e8b39$var$V(e, t), i = [];
    for(let s = 0; n.length > s; s++){
        const a = n[s], c = /^".*"$/.test(a) ? a.slice(1, -1) : a, d = (0, $dQzAa$path.join)(c, e), l = !c && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + d : d;
        for(let e1 = 0; r.length > e1; e1++){
            const n1 = l + r[e1];
            try {
                if ($4f61f8f98d0e8b39$var$K.sync(n1, {
                    pathExt: o
                })) {
                    if (!t.all) return n1;
                    i.push(n1);
                }
            } catch (e2) {}
        }
    }
    if (t.all && i.length) return i;
    if (t.nothrow) return null;
    throw $4f61f8f98d0e8b39$var$X(e);
};
var $4f61f8f98d0e8b39$var$Y, $4f61f8f98d0e8b39$var$Z = {}, $4f61f8f98d0e8b39$var$z = {}, $4f61f8f98d0e8b39$var$Q = {}, $4f61f8f98d0e8b39$var$J = {};
const $4f61f8f98d0e8b39$var$ee = (e = {})=>{
    const t = e.env || process.env;
    return "win32" !== (e.platform || process.platform) ? "PATH" : Object.keys(t).reverse().find((e)=>"PATH" === e.toUpperCase()) || "Path";
};
var $4f61f8f98d0e8b39$var$te, $4f61f8f98d0e8b39$var$ne;
($4f61f8f98d0e8b39$var$J = $4f61f8f98d0e8b39$var$ee).default = $4f61f8f98d0e8b39$var$ee, $4f61f8f98d0e8b39$var$Y = (e)=>$4f61f8f98d0e8b39$var$r(e) || $4f61f8f98d0e8b39$var$r(e, !0);
const $4f61f8f98d0e8b39$var$re = /([()\][%!^"`<>&|;, *?])/g;
$4f61f8f98d0e8b39$var$te = (e)=>e.replace($4f61f8f98d0e8b39$var$re, "^$1"), $4f61f8f98d0e8b39$var$ne = (e, t)=>(e = (e = `"${e = (e = (e = "" + e).replace(/(\\*)"/g, '$1$1\\"')).replace(/(\\*)$/, "$1$1")}"`).replace($4f61f8f98d0e8b39$var$re, "^$1"), t && (e = e.replace($4f61f8f98d0e8b39$var$re, "^$1")), e);
var $4f61f8f98d0e8b39$var$oe, $4f61f8f98d0e8b39$var$ie, $4f61f8f98d0e8b39$var$se;
$4f61f8f98d0e8b39$var$ie = /^#!(.*)/, $4f61f8f98d0e8b39$var$oe = (e = "")=>{
    const t = e.match($4f61f8f98d0e8b39$var$ie);
    if (!t) return null;
    const [n, r] = t[0].replace(/#! ?/, "").split(" "), o = n.split("/").pop();
    return "env" === o ? r : r ? `${o} ${r}` : o;
}, $4f61f8f98d0e8b39$var$se = (e)=>{
    const t = Buffer.alloc(150);
    let n;
    try {
        n = (0, $dQzAa$fs.openSync)(e, "r"), (0, $dQzAa$fs.readSync)(n, t, 0, 150, 0), (0, $dQzAa$fs.closeSync)(n);
    } catch (e1) {}
    return $4f61f8f98d0e8b39$var$oe("" + t);
};
const $4f61f8f98d0e8b39$var$ae = "win32" === process.platform, $4f61f8f98d0e8b39$var$ce = /\.(?:com|exe)$/i, $4f61f8f98d0e8b39$var$de = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
$4f61f8f98d0e8b39$var$Q = (e, t, n)=>{
    t && !Array.isArray(t) && (n = t, t = null);
    const r = {
        command: e,
        args: t = t ? t.slice(0) : [],
        options: n = Object.assign({}, n),
        file: void 0,
        original: {
            command: e,
            args: t
        }
    };
    return n.shell ? r : ((e)=>{
        if (!$4f61f8f98d0e8b39$var$ae) return e;
        const t = ((e)=>{
            e.file = $4f61f8f98d0e8b39$var$Y(e);
            const t = e.file && $4f61f8f98d0e8b39$var$se(e.file);
            return t ? (e.args.unshift(e.file), e.command = t, $4f61f8f98d0e8b39$var$Y(e)) : e.file;
        })(e), n = !$4f61f8f98d0e8b39$var$ce.test(t);
        if (e.options.forceShell || n) {
            const n1 = $4f61f8f98d0e8b39$var$de.test(t);
            e.command = (0, $dQzAa$path.normalize)(e.command), e.command = $4f61f8f98d0e8b39$var$te(e.command), e.args = e.args.map((e)=>$4f61f8f98d0e8b39$var$ne(e, n1));
            const r = [
                e.command
            ].concat(e.args).join(" ");
            e.args = [
                "/d",
                "/s",
                "/c",
                `"${r}"`
            ], e.command = process.env.comspec || "cmd.exe", e.options.windowsVerbatimArguments = !0;
        }
        return e;
    })(r);
};
var $4f61f8f98d0e8b39$var$le = {};
const $4f61f8f98d0e8b39$var$ue = "win32" === process.platform;
var $4f61f8f98d0e8b39$var$pe;
$4f61f8f98d0e8b39$var$le = {
    hookChildProcess (e, t) {
        if (!$4f61f8f98d0e8b39$var$ue) return;
        const n = e.emit;
        e.emit = function(r, o) {
            if ("exit" === r) {
                const r1 = $4f61f8f98d0e8b39$var$i(o, t);
                if (r1) return n.call(e, "error", r1);
            }
            return n.apply(e, arguments);
        };
    },
    verifyENOENT: $4f61f8f98d0e8b39$var$i,
    verifyENOENTSync (e, t) {
        return $4f61f8f98d0e8b39$var$ue && 1 === e && !t.file ? $4f61f8f98d0e8b39$var$o(t.original, "spawnSync") : null;
    },
    notFoundError: $4f61f8f98d0e8b39$var$o
}, ($4f61f8f98d0e8b39$var$z = $4f61f8f98d0e8b39$var$s).spawn = $4f61f8f98d0e8b39$var$s, $4f61f8f98d0e8b39$var$z.sync = (e, t, n)=>{
    const r = $4f61f8f98d0e8b39$var$Q(e, t, n), o = (0, $dQzAa$child_process.spawnSync)(r.command, r.args, r.options);
    return o.error = o.error || $4f61f8f98d0e8b39$var$le.verifyENOENTSync(o.status, r), o;
}, $4f61f8f98d0e8b39$var$z._parse = $4f61f8f98d0e8b39$var$Q, $4f61f8f98d0e8b39$var$z._enoent = $4f61f8f98d0e8b39$var$le, $4f61f8f98d0e8b39$var$pe = (e)=>{
    const t = "string" == typeof e ? "\r" : 13;
    return e[e.length - 1] === ("string" == typeof e ? "\n" : 10) && (e = e.slice(0, e.length - 1)), e[e.length - 1] === t && (e = e.slice(0, e.length - 1)), e;
};
var $4f61f8f98d0e8b39$var$me = {};
const $4f61f8f98d0e8b39$var$fe = (e)=>{
    let t;
    e = {
        cwd: process.cwd(),
        path: process.env[$4f61f8f98d0e8b39$var$J()],
        execPath: process.execPath,
        ...e
    };
    let n = (0, $dQzAa$path.resolve)(e.cwd);
    const r = [];
    for(; t !== n;)r.push((0, $dQzAa$path.join)(n, "node_modules/.bin")), t = n, n = (0, $dQzAa$path.resolve)(n, "..");
    const o = (0, $dQzAa$path.resolve)(e.cwd, e.execPath, "..");
    return r.push(o), r.concat(e.path).join((0, $dQzAa$path.delimiter));
};
($4f61f8f98d0e8b39$var$me = $4f61f8f98d0e8b39$var$fe).default = $4f61f8f98d0e8b39$var$fe, $4f61f8f98d0e8b39$var$me.env = (e)=>{
    const t = {
        ...(e = {
            env: process.env,
            ...e
        }).env
    }, n = $4f61f8f98d0e8b39$var$J({
        env: t
    });
    return e.path = t[n], t[n] = $4f61f8f98d0e8b39$var$me(e), t;
};
var $4f61f8f98d0e8b39$var$ge = {}, $4f61f8f98d0e8b39$var$he = {};
const $4f61f8f98d0e8b39$var$ye = (e, t)=>{
    for (const n of Reflect.ownKeys(t))Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
    return e;
};
($4f61f8f98d0e8b39$var$he = $4f61f8f98d0e8b39$var$ye).default = $4f61f8f98d0e8b39$var$ye;
const $4f61f8f98d0e8b39$var$be = new WeakMap, $4f61f8f98d0e8b39$var$ve = (e, t = {})=>{
    if ("function" != typeof e) throw new TypeError("Expected a function");
    let n, r = 0;
    const o = e.displayName || e.name || "<anonymous>", i = function(...s) {
        if ($4f61f8f98d0e8b39$var$be.set(i, ++r), 1 === r) n = e.apply(this, s), e = null;
        else if (!0 === t.throw) throw Error(`Function \`${o}\` can only be called once`);
        return n;
    };
    return $4f61f8f98d0e8b39$var$he(i, e), $4f61f8f98d0e8b39$var$be.set(i, r), i;
};
($4f61f8f98d0e8b39$var$ge = $4f61f8f98d0e8b39$var$ve).default = $4f61f8f98d0e8b39$var$ve, $4f61f8f98d0e8b39$var$ge.callCount = (e)=>{
    if (!$4f61f8f98d0e8b39$var$be.has(e)) throw Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
    return $4f61f8f98d0e8b39$var$be.get(e);
};
var $4f61f8f98d0e8b39$var$Se, $4f61f8f98d0e8b39$var$xe = {};
Object.defineProperty($4f61f8f98d0e8b39$var$xe, "__esModule", {
    value: !0
}), $4f61f8f98d0e8b39$var$xe.signalsByNumber = $4f61f8f98d0e8b39$var$xe.signalsByName = void 0;
var $4f61f8f98d0e8b39$var$we = {};
Object.defineProperty($4f61f8f98d0e8b39$var$we, "__esModule", {
    value: !0
}), $4f61f8f98d0e8b39$var$we.getSignals = void 0;
var $4f61f8f98d0e8b39$var$Ee = {};
Object.defineProperty($4f61f8f98d0e8b39$var$Ee, "__esModule", {
    value: !0
}), $4f61f8f98d0e8b39$var$Ee.SIGNALS = void 0, $4f61f8f98d0e8b39$var$Ee.SIGNALS = [
    {
        name: "SIGHUP",
        number: 1,
        action: "terminate",
        description: "Terminal closed",
        standard: "posix"
    },
    {
        name: "SIGINT",
        number: 2,
        action: "terminate",
        description: "User interruption with CTRL-C",
        standard: "ansi"
    },
    {
        name: "SIGQUIT",
        number: 3,
        action: "core",
        description: "User interruption with CTRL-\\",
        standard: "posix"
    },
    {
        name: "SIGILL",
        number: 4,
        action: "core",
        description: "Invalid machine instruction",
        standard: "ansi"
    },
    {
        name: "SIGTRAP",
        number: 5,
        action: "core",
        description: "Debugger breakpoint",
        standard: "posix"
    },
    {
        name: "SIGABRT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "ansi"
    },
    {
        name: "SIGIOT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "bsd"
    },
    {
        name: "SIGBUS",
        number: 7,
        action: "core",
        description: "Bus error due to misaligned, non-existing address or paging error",
        standard: "bsd"
    },
    {
        name: "SIGEMT",
        number: 7,
        action: "terminate",
        description: "Command should be emulated but is not implemented",
        standard: "other"
    },
    {
        name: "SIGFPE",
        number: 8,
        action: "core",
        description: "Floating point arithmetic error",
        standard: "ansi"
    },
    {
        name: "SIGKILL",
        number: 9,
        action: "terminate",
        description: "Forced termination",
        standard: "posix",
        forced: !0
    },
    {
        name: "SIGUSR1",
        number: 10,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
    },
    {
        name: "SIGSEGV",
        number: 11,
        action: "core",
        description: "Segmentation fault",
        standard: "ansi"
    },
    {
        name: "SIGUSR2",
        number: 12,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
    },
    {
        name: "SIGPIPE",
        number: 13,
        action: "terminate",
        description: "Broken pipe or socket",
        standard: "posix"
    },
    {
        name: "SIGALRM",
        number: 14,
        action: "terminate",
        description: "Timeout or timer",
        standard: "posix"
    },
    {
        name: "SIGTERM",
        number: 15,
        action: "terminate",
        description: "Termination",
        standard: "ansi"
    },
    {
        name: "SIGSTKFLT",
        number: 16,
        action: "terminate",
        description: "Stack is empty or overflowed",
        standard: "other"
    },
    {
        name: "SIGCHLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "posix"
    },
    {
        name: "SIGCLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "other"
    },
    {
        name: "SIGCONT",
        number: 18,
        action: "unpause",
        description: "Unpaused",
        standard: "posix",
        forced: !0
    },
    {
        name: "SIGSTOP",
        number: 19,
        action: "pause",
        description: "Paused",
        standard: "posix",
        forced: !0
    },
    {
        name: "SIGTSTP",
        number: 20,
        action: "pause",
        description: 'Paused using CTRL-Z or "suspend"',
        standard: "posix"
    },
    {
        name: "SIGTTIN",
        number: 21,
        action: "pause",
        description: "Background process cannot read terminal input",
        standard: "posix"
    },
    {
        name: "SIGBREAK",
        number: 21,
        action: "terminate",
        description: "User interruption with CTRL-BREAK",
        standard: "other"
    },
    {
        name: "SIGTTOU",
        number: 22,
        action: "pause",
        description: "Background process cannot write to terminal output",
        standard: "posix"
    },
    {
        name: "SIGURG",
        number: 23,
        action: "ignore",
        description: "Socket received out-of-band data",
        standard: "bsd"
    },
    {
        name: "SIGXCPU",
        number: 24,
        action: "core",
        description: "Process timed out",
        standard: "bsd"
    },
    {
        name: "SIGXFSZ",
        number: 25,
        action: "core",
        description: "File too big",
        standard: "bsd"
    },
    {
        name: "SIGVTALRM",
        number: 26,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
    },
    {
        name: "SIGPROF",
        number: 27,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
    },
    {
        name: "SIGWINCH",
        number: 28,
        action: "ignore",
        description: "Terminal window size changed",
        standard: "bsd"
    },
    {
        name: "SIGIO",
        number: 29,
        action: "terminate",
        description: "I/O is available",
        standard: "other"
    },
    {
        name: "SIGPOLL",
        number: 29,
        action: "terminate",
        description: "Watched event",
        standard: "other"
    },
    {
        name: "SIGINFO",
        number: 29,
        action: "ignore",
        description: "Request for process information",
        standard: "other"
    },
    {
        name: "SIGPWR",
        number: 30,
        action: "terminate",
        description: "Device running out of power",
        standard: "systemv"
    },
    {
        name: "SIGSYS",
        number: 31,
        action: "core",
        description: "Invalid system call",
        standard: "other"
    },
    {
        name: "SIGUNUSED",
        number: 31,
        action: "terminate",
        description: "Invalid system call",
        standard: "other"
    }
];
var $4f61f8f98d0e8b39$var$Ie = {};
Object.defineProperty($4f61f8f98d0e8b39$var$Ie, "__esModule", {
    value: !0
}), $4f61f8f98d0e8b39$var$Ie.SIGRTMAX = $4f61f8f98d0e8b39$var$Ie.getRealtimeSignals = void 0, $4f61f8f98d0e8b39$var$Ie.getRealtimeSignals = ()=>Array.from({
        length: $4f61f8f98d0e8b39$var$Ge - $4f61f8f98d0e8b39$var$Ce + 1
    }, $4f61f8f98d0e8b39$var$Te);
const $4f61f8f98d0e8b39$var$Te = (e, t)=>({
        name: "SIGRT" + (t + 1),
        number: $4f61f8f98d0e8b39$var$Ce + t,
        action: "terminate",
        description: "Application-specific signal (realtime)",
        standard: "posix"
    }), $4f61f8f98d0e8b39$var$Ce = 34, $4f61f8f98d0e8b39$var$Ge = 64;
$4f61f8f98d0e8b39$var$Ie.SIGRTMAX = $4f61f8f98d0e8b39$var$Ge, $4f61f8f98d0e8b39$var$we.getSignals = ()=>{
    const e = (0, $4f61f8f98d0e8b39$var$Ie.getRealtimeSignals)();
    return [
        ...$4f61f8f98d0e8b39$var$Ee.SIGNALS,
        ...e
    ].map($4f61f8f98d0e8b39$var$Pe);
};
const $4f61f8f98d0e8b39$var$Pe = ({ name: e , number: t , description: n , action: r , forced: o = !1 , standard: i  })=>{
    const { signals: { [e]: s  }  } = (0, $dQzAa$os.constants), a = void 0 !== s;
    return {
        name: e,
        number: a ? s : t,
        description: n,
        supported: a,
        action: r,
        forced: o,
        standard: i
    };
}, $4f61f8f98d0e8b39$var$Oe = (0, $4f61f8f98d0e8b39$var$we.getSignals)().reduce((e, { name: t , number: n , description: r , supported: o , action: i , forced: s , standard: a  })=>({
        ...e,
        [t]: {
            name: t,
            number: n,
            description: r,
            supported: o,
            action: i,
            forced: s,
            standard: a
        }
    }), {});
$4f61f8f98d0e8b39$var$xe.signalsByName = $4f61f8f98d0e8b39$var$Oe;
const $4f61f8f98d0e8b39$var$Ae = (()=>{
    const e = (0, $4f61f8f98d0e8b39$var$we.getSignals)(), t = Array.from({
        length: $4f61f8f98d0e8b39$var$Ie.SIGRTMAX + 1
    }, (t, n)=>((e, t)=>{
            const n = ((e, t)=>{
                const n = t.find(({ name: t  })=>(0, $dQzAa$os.constants).signals[t] === e);
                return void 0 !== n ? n : t.find((t)=>t.number === e);
            })(e, t);
            if (void 0 === n) return {};
            const { name: r , description: o , supported: i , action: s , forced: a , standard: c  } = n;
            return {
                [e]: {
                    name: r,
                    number: e,
                    description: o,
                    supported: i,
                    action: s,
                    forced: a,
                    standard: c
                }
            };
        })(n, e));
    return Object.assign({}, ...t);
})();
$4f61f8f98d0e8b39$var$xe.signalsByNumber = $4f61f8f98d0e8b39$var$Ae;
var $4f61f8f98d0e8b39$var$Re = $4f61f8f98d0e8b39$var$xe.signalsByName;
$4f61f8f98d0e8b39$var$Se = ({ stdout: e , stderr: t , all: n , error: r , signal: o , exitCode: i , command: s , escapedCommand: a , timedOut: c , isCanceled: d , killed: l , parsed: { options: { timeout: u  }  }  })=>{
    const p = void 0 === (o = null === o ? void 0 : o) ? void 0 : $4f61f8f98d0e8b39$var$Re[o].description, m = (({ timedOut: e , timeout: t , errorCode: n , signal: r , signalDescription: o , exitCode: i , isCanceled: s  })=>e ? `timed out after ${t} milliseconds` : s ? "was canceled" : void 0 !== n ? "failed with " + n : void 0 !== r ? `was killed with ${r} (${o})` : void 0 !== i ? "failed with exit code " + i : "failed")({
        timedOut: c,
        timeout: u,
        errorCode: r && r.code,
        signal: o,
        signalDescription: p,
        exitCode: i = null === i ? void 0 : i,
        isCanceled: d
    }), f = `Command ${m}: ${s}`, g = "[object Error]" === ({}).toString.call(r), h = g ? `${f}\n${r.message}` : f, y = [
        h,
        t,
        e
    ].filter(Boolean).join("\n");
    return g ? (r.originalMessage = r.message, r.message = y) : r = Error(y), r.shortMessage = h, r.command = s, r.escapedCommand = a, r.exitCode = i, r.signal = o, r.signalDescription = p, r.stdout = e, r.stderr = t, void 0 !== n && (r.all = n), "bufferedData" in r && delete r.bufferedData, r.failed = !0, r.timedOut = !!c, r.isCanceled = d, r.killed = l && !c, r;
};
var $4f61f8f98d0e8b39$var$Ne = {};
const $4f61f8f98d0e8b39$var$_e = [
    "stdin",
    "stdout",
    "stderr"
], $4f61f8f98d0e8b39$var$je = (e)=>{
    if (!e) return;
    const { stdio: t  } = e;
    if (void 0 === t) return $4f61f8f98d0e8b39$var$_e.map((t)=>e[t]);
    if (((e)=>$4f61f8f98d0e8b39$var$_e.some((t)=>void 0 !== e[t]))(e)) throw Error("It's not possible to provide `stdio` in combination with one of " + $4f61f8f98d0e8b39$var$_e.map((e)=>`\`${e}\``).join(", "));
    if ("string" == typeof t) return t;
    if (!Array.isArray(t)) throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);
    return Array.from({
        length: Math.max(t.length, $4f61f8f98d0e8b39$var$_e.length)
    }, (e, n)=>t[n]);
};
($4f61f8f98d0e8b39$var$Ne = $4f61f8f98d0e8b39$var$je).node = (e)=>{
    const t = $4f61f8f98d0e8b39$var$je(e);
    return "ipc" === t ? "ipc" : void 0 === t || "string" == typeof t ? [
        t,
        t,
        t,
        "ipc"
    ] : t.includes("ipc") ? t : [
        ...t,
        "ipc"
    ];
};
var $4f61f8f98d0e8b39$var$Le, $4f61f8f98d0e8b39$var$$e = {}, $4f61f8f98d0e8b39$var$Be = $4f61f8f98d0e8b39$var$$.process;
const $4f61f8f98d0e8b39$var$ke = (e)=>e && "object" == typeof e && "function" == typeof e.removeListener && "function" == typeof e.emit && "function" == typeof e.reallyExit && "function" == typeof e.listeners && "function" == typeof e.kill && "number" == typeof e.pid && "function" == typeof e.on;
if ($4f61f8f98d0e8b39$var$ke($4f61f8f98d0e8b39$var$Be)) {
    var $4f61f8f98d0e8b39$var$Me, $4f61f8f98d0e8b39$var$Ue = $dQzAa$assert, $4f61f8f98d0e8b39$var$De = $4f61f8f98d0e8b39$var$M("4c98W"), $4f61f8f98d0e8b39$var$Fe = /^win/i.test($4f61f8f98d0e8b39$var$Be.platform), $4f61f8f98d0e8b39$var$He = $dQzAa$events;
    "function" != typeof $4f61f8f98d0e8b39$var$He && ($4f61f8f98d0e8b39$var$He = $4f61f8f98d0e8b39$var$He.EventEmitter), $4f61f8f98d0e8b39$var$Be.__signal_exit_emitter__ ? $4f61f8f98d0e8b39$var$Me = $4f61f8f98d0e8b39$var$Be.__signal_exit_emitter__ : (($4f61f8f98d0e8b39$var$Me = $4f61f8f98d0e8b39$var$Be.__signal_exit_emitter__ = new $4f61f8f98d0e8b39$var$He).count = 0, $4f61f8f98d0e8b39$var$Me.emitted = {}), $4f61f8f98d0e8b39$var$Me.infinite || ($4f61f8f98d0e8b39$var$Me.setMaxListeners(1 / 0), $4f61f8f98d0e8b39$var$Me.infinite = !0), $4f61f8f98d0e8b39$var$$e = (e, t)=>{
        if (!$4f61f8f98d0e8b39$var$ke($4f61f8f98d0e8b39$var$$.process)) return ()=>{};
        $4f61f8f98d0e8b39$var$Ue.equal(typeof e, "function", "a callback must be provided for exit handler"), !1 === $4f61f8f98d0e8b39$var$Ve && $4f61f8f98d0e8b39$var$qe();
        var n = "exit";
        return t && t.alwaysLast && (n = "afterexit"), $4f61f8f98d0e8b39$var$Me.on(n, e), ()=>{
            $4f61f8f98d0e8b39$var$Me.removeListener(n, e), 0 === $4f61f8f98d0e8b39$var$Me.listeners("exit").length && 0 === $4f61f8f98d0e8b39$var$Me.listeners("afterexit").length && $4f61f8f98d0e8b39$var$We();
        };
    };
    var $4f61f8f98d0e8b39$var$We = ()=>{
        $4f61f8f98d0e8b39$var$Ve && $4f61f8f98d0e8b39$var$ke($4f61f8f98d0e8b39$var$$.process) && ($4f61f8f98d0e8b39$var$Ve = !1, $4f61f8f98d0e8b39$var$De.forEach((e)=>{
            try {
                $4f61f8f98d0e8b39$var$Be.removeListener(e, $4f61f8f98d0e8b39$var$Xe[e]);
            } catch (e1) {}
        }), $4f61f8f98d0e8b39$var$Be.emit = $4f61f8f98d0e8b39$var$ze, $4f61f8f98d0e8b39$var$Be.reallyExit = $4f61f8f98d0e8b39$var$Ye, $4f61f8f98d0e8b39$var$Me.count -= 1);
    };
    $4f61f8f98d0e8b39$var$$e.unload = $4f61f8f98d0e8b39$var$We;
    var $4f61f8f98d0e8b39$var$Ke = (e, t, n)=>{
        $4f61f8f98d0e8b39$var$Me.emitted[e] || ($4f61f8f98d0e8b39$var$Me.emitted[e] = !0, $4f61f8f98d0e8b39$var$Me.emit(e, t, n));
    }, $4f61f8f98d0e8b39$var$Xe = {};
    $4f61f8f98d0e8b39$var$De.forEach((e)=>{
        $4f61f8f98d0e8b39$var$Xe[e] = ()=>{
            $4f61f8f98d0e8b39$var$ke($4f61f8f98d0e8b39$var$$.process) && $4f61f8f98d0e8b39$var$Be.listeners(e).length === $4f61f8f98d0e8b39$var$Me.count && ($4f61f8f98d0e8b39$var$We(), $4f61f8f98d0e8b39$var$Ke("exit", null, e), $4f61f8f98d0e8b39$var$Ke("afterexit", null, e), $4f61f8f98d0e8b39$var$Fe && "SIGHUP" === e && (e = "SIGINT"), $4f61f8f98d0e8b39$var$Be.kill($4f61f8f98d0e8b39$var$Be.pid, e));
        };
    }), $4f61f8f98d0e8b39$var$$e.signals = ()=>$4f61f8f98d0e8b39$var$De;
    var $4f61f8f98d0e8b39$var$Ve = !1, $4f61f8f98d0e8b39$var$qe = ()=>{
        !$4f61f8f98d0e8b39$var$Ve && $4f61f8f98d0e8b39$var$ke($4f61f8f98d0e8b39$var$$.process) && ($4f61f8f98d0e8b39$var$Ve = !0, $4f61f8f98d0e8b39$var$Me.count += 1, $4f61f8f98d0e8b39$var$De = $4f61f8f98d0e8b39$var$De.filter((e)=>{
            try {
                return $4f61f8f98d0e8b39$var$Be.on(e, $4f61f8f98d0e8b39$var$Xe[e]), !0;
            } catch (e1) {
                return !1;
            }
        }), $4f61f8f98d0e8b39$var$Be.emit = $4f61f8f98d0e8b39$var$Qe, $4f61f8f98d0e8b39$var$Be.reallyExit = $4f61f8f98d0e8b39$var$Ze);
    };
    $4f61f8f98d0e8b39$var$$e.load = $4f61f8f98d0e8b39$var$qe;
    var $4f61f8f98d0e8b39$var$Ye = $4f61f8f98d0e8b39$var$Be.reallyExit, $4f61f8f98d0e8b39$var$Ze = (e)=>{
        $4f61f8f98d0e8b39$var$ke($4f61f8f98d0e8b39$var$$.process) && ($4f61f8f98d0e8b39$var$Be.exitCode = e || 0, $4f61f8f98d0e8b39$var$Ke("exit", $4f61f8f98d0e8b39$var$Be.exitCode, null), $4f61f8f98d0e8b39$var$Ke("afterexit", $4f61f8f98d0e8b39$var$Be.exitCode, null), $4f61f8f98d0e8b39$var$Ye.call($4f61f8f98d0e8b39$var$Be, $4f61f8f98d0e8b39$var$Be.exitCode));
    }, $4f61f8f98d0e8b39$var$ze = $4f61f8f98d0e8b39$var$Be.emit, $4f61f8f98d0e8b39$var$Qe = function(e, t) {
        if ("exit" === e && $4f61f8f98d0e8b39$var$ke($4f61f8f98d0e8b39$var$$.process)) {
            void 0 !== t && ($4f61f8f98d0e8b39$var$Be.exitCode = t);
            var n = $4f61f8f98d0e8b39$var$ze.apply(this, arguments);
            return $4f61f8f98d0e8b39$var$Ke("exit", $4f61f8f98d0e8b39$var$Be.exitCode, null), $4f61f8f98d0e8b39$var$Ke("afterexit", $4f61f8f98d0e8b39$var$Be.exitCode, null), n;
        }
        return $4f61f8f98d0e8b39$var$ze.apply(this, arguments);
    };
} else $4f61f8f98d0e8b39$var$$e = ()=>()=>{};
const $4f61f8f98d0e8b39$var$Je = (e)=>e === (0, $dQzAa$os.constants).signals.SIGTERM || "string" == typeof e && "SIGTERM" === e.toUpperCase();
var $4f61f8f98d0e8b39$var$et, $4f61f8f98d0e8b39$var$tt = ($4f61f8f98d0e8b39$var$Le = {
    spawnedKill (e, t = "SIGTERM", n = {}) {
        const r = e(t);
        return ((e, t, n, r)=>{
            if (!((e, { forceKillAfterTimeout: t  }, n)=>$4f61f8f98d0e8b39$var$Je(e) && !1 !== t && n)(t, n, r)) return;
            const o = (({ forceKillAfterTimeout: e = !0  })=>{
                if (!0 === e) return 5e3;
                if (!Number.isFinite(e) || 0 > e) throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
                return e;
            })(n), i = setTimeout(()=>{
                e("SIGKILL");
            }, o);
            i.unref && i.unref();
        })(e, t, n, r), r;
    },
    spawnedCancel (e, t) {
        e.kill() && (t.isCanceled = !0);
    },
    setupTimeout (e, { timeout: t , killSignal: n = "SIGTERM"  }, r) {
        if (0 === t || void 0 === t) return r;
        let o;
        const i = new Promise((r, i)=>{
            o = setTimeout(()=>{
                ((e, t, n)=>{
                    e.kill(t), n(Object.assign(Error("Timed out"), {
                        timedOut: !0,
                        signal: t
                    }));
                })(e, n, i);
            }, t);
        }), s = r.finally(()=>{
            clearTimeout(o);
        });
        return Promise.race([
            i,
            s
        ]);
    },
    validateTimeout ({ timeout: e  }) {
        if (void 0 !== e && (!Number.isFinite(e) || 0 > e)) throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
    },
    async setExitHandler (e, { cleanup: t , detached: n  }, r) {
        if (!t || n) return r;
        const o = $4f61f8f98d0e8b39$var$$e(()=>{
            e.kill();
        });
        return r.finally(()=>{
            o();
        });
    }
}).spawnedKill, $4f61f8f98d0e8b39$var$nt = $4f61f8f98d0e8b39$var$Le.spawnedCancel, $4f61f8f98d0e8b39$var$rt = $4f61f8f98d0e8b39$var$Le.setupTimeout, $4f61f8f98d0e8b39$var$ot = $4f61f8f98d0e8b39$var$Le.validateTimeout, $4f61f8f98d0e8b39$var$it = $4f61f8f98d0e8b39$var$Le.setExitHandler, $4f61f8f98d0e8b39$var$st = {};
const $4f61f8f98d0e8b39$var$at = (e)=>null !== e && "object" == typeof e && "function" == typeof e.pipe;
$4f61f8f98d0e8b39$var$at.writable = (e)=>$4f61f8f98d0e8b39$var$at(e) && !1 !== e.writable && "function" == typeof e._write && "object" == typeof e._writableState, $4f61f8f98d0e8b39$var$at.readable = (e)=>$4f61f8f98d0e8b39$var$at(e) && !1 !== e.readable && "function" == typeof e._read && "object" == typeof e._readableState, $4f61f8f98d0e8b39$var$at.duplex = (e)=>$4f61f8f98d0e8b39$var$at.writable(e) && $4f61f8f98d0e8b39$var$at.readable(e), $4f61f8f98d0e8b39$var$at.transform = (e)=>$4f61f8f98d0e8b39$var$at.duplex(e) && "function" == typeof e._transform, $4f61f8f98d0e8b39$var$st = $4f61f8f98d0e8b39$var$at;
var $4f61f8f98d0e8b39$var$ct, $4f61f8f98d0e8b39$var$dt = {}, $4f61f8f98d0e8b39$var$lt = (0, $dQzAa$buffer.constants), $4f61f8f98d0e8b39$var$ut = (0, $dQzAa$stream.PassThrough);
$4f61f8f98d0e8b39$var$ct = (e)=>{
    e = {
        ...e
    };
    const { array: t  } = e;
    let { encoding: n  } = e;
    const r = "buffer" === n;
    let o = !1;
    t ? o = !(n || r) : n = n || "utf8", r && (n = null);
    const i = new $4f61f8f98d0e8b39$var$ut({
        objectMode: o
    });
    n && i.setEncoding(n);
    let s = 0;
    const a = [];
    return i.on("data", (e)=>{
        a.push(e), o ? s = a.length : s += e.length;
    }), i.getBufferedValue = ()=>t ? a : r ? Buffer.concat(a, s) : a.join(""), i.getBufferedLength = ()=>s, i;
};
const $4f61f8f98d0e8b39$var$pt = (0, $dQzAa$util.promisify)((0, $dQzAa$stream.pipeline));
class $4f61f8f98d0e8b39$var$mt extends Error {
    constructor(){
        super("maxBuffer exceeded"), this.name = "MaxBufferError";
    }
}
($4f61f8f98d0e8b39$var$dt = $4f61f8f98d0e8b39$var$a).buffer = (e, t)=>$4f61f8f98d0e8b39$var$a(e, {
        ...t,
        encoding: "buffer"
    }), $4f61f8f98d0e8b39$var$dt.array = (e, t)=>$4f61f8f98d0e8b39$var$a(e, {
        ...t,
        array: !0
    }), $4f61f8f98d0e8b39$var$dt.MaxBufferError = $4f61f8f98d0e8b39$var$mt;
var $4f61f8f98d0e8b39$var$ft, $4f61f8f98d0e8b39$var$gt = (0, $dQzAa$stream.PassThrough);
$4f61f8f98d0e8b39$var$ft = function() {
    function e(t) {
        return Array.isArray(t) ? (t.forEach(e), this) : (r.push(t), t.once("end", n.bind(null, t)), t.once("error", o.emit.bind(o, "error")), t.pipe(o, {
            end: !1
        }), this);
    }
    function t() {
        return 0 == r.length;
    }
    function n(e) {
        !(r = r.filter((t)=>t !== e)).length && o.readable && o.end();
    }
    var r = [], o = new $4f61f8f98d0e8b39$var$gt({
        objectMode: !0
    });
    return o.setMaxListeners(0), o.add = e, o.isEmpty = t, o.on("unpipe", n), [].slice.call(arguments).forEach(e), o;
};
const $4f61f8f98d0e8b39$var$ht = async (e, t)=>{
    if (e) {
        e.destroy();
        try {
            return await t;
        } catch (e1) {
            return e1.bufferedData;
        }
    }
}, $4f61f8f98d0e8b39$var$yt = (e, { encoding: t , buffer: n , maxBuffer: r  })=>{
    if (e && n) return t ? $4f61f8f98d0e8b39$var$dt(e, {
        encoding: t,
        maxBuffer: r
    }) : $4f61f8f98d0e8b39$var$dt.buffer(e, {
        maxBuffer: r
    });
};
var $4f61f8f98d0e8b39$var$bt, $4f61f8f98d0e8b39$var$vt = ($4f61f8f98d0e8b39$var$et = {
    handleInput (e, t) {
        void 0 !== t && void 0 !== e.stdin && ($4f61f8f98d0e8b39$var$st(t) ? t.pipe(e.stdin) : e.stdin.end(t));
    },
    makeAllStream (e, { all: t  }) {
        if (!t || !e.stdout && !e.stderr) return;
        const n = $4f61f8f98d0e8b39$var$ft();
        return e.stdout && n.add(e.stdout), e.stderr && n.add(e.stderr), n;
    },
    async getSpawnedResult ({ stdout: e , stderr: t , all: n  }, { encoding: r , buffer: o , maxBuffer: i  }, s) {
        const a = $4f61f8f98d0e8b39$var$yt(e, {
            encoding: r,
            buffer: o,
            maxBuffer: i
        }), c = $4f61f8f98d0e8b39$var$yt(t, {
            encoding: r,
            buffer: o,
            maxBuffer: i
        }), d = $4f61f8f98d0e8b39$var$yt(n, {
            encoding: r,
            buffer: o,
            maxBuffer: 2 * i
        });
        try {
            return await Promise.all([
                s,
                a,
                c,
                d
            ]);
        } catch (r1) {
            return Promise.all([
                {
                    error: r1,
                    signal: r1.signal,
                    timedOut: r1.timedOut
                },
                $4f61f8f98d0e8b39$var$ht(e, a),
                $4f61f8f98d0e8b39$var$ht(t, c),
                $4f61f8f98d0e8b39$var$ht(n, d)
            ]);
        }
    },
    validateInputSync ({ input: e  }) {
        if ($4f61f8f98d0e8b39$var$st(e)) throw new TypeError("The `input` option cannot be a stream in sync mode");
    }
}).handleInput, $4f61f8f98d0e8b39$var$St = $4f61f8f98d0e8b39$var$et.getSpawnedResult, $4f61f8f98d0e8b39$var$xt = $4f61f8f98d0e8b39$var$et.makeAllStream, $4f61f8f98d0e8b39$var$wt = $4f61f8f98d0e8b39$var$et.validateInputSync;
const $4f61f8f98d0e8b39$var$Et = (async ()=>{})().constructor.prototype, $4f61f8f98d0e8b39$var$It = [
    "then",
    "catch",
    "finally"
].map((e)=>[
        e,
        Reflect.getOwnPropertyDescriptor($4f61f8f98d0e8b39$var$Et, e)
    ]);
var $4f61f8f98d0e8b39$var$Tt, $4f61f8f98d0e8b39$var$Ct = ($4f61f8f98d0e8b39$var$bt = {
    mergePromise (e, t) {
        for (const [n, r] of $4f61f8f98d0e8b39$var$It){
            const o = "function" == typeof t ? (...e)=>Reflect.apply(r.value, t(), e) : r.value.bind(t);
            Reflect.defineProperty(e, n, {
                ...r,
                value: o
            });
        }
        return e;
    },
    getSpawnedPromise (e) {
        return new Promise((t, n)=>{
            e.on("exit", (e, n)=>{
                t({
                    exitCode: e,
                    signal: n
                });
            }), e.on("error", (e)=>{
                n(e);
            }), e.stdin && e.stdin.on("error", (e)=>{
                n(e);
            });
        });
    }
}).mergePromise, $4f61f8f98d0e8b39$var$Gt = $4f61f8f98d0e8b39$var$bt.getSpawnedPromise;
const $4f61f8f98d0e8b39$var$Pt = (e, t = [])=>Array.isArray(t) ? [
        e,
        ...t
    ] : [
        e
    ], $4f61f8f98d0e8b39$var$Ot = /^[\w.-]+$/, $4f61f8f98d0e8b39$var$At = /"/g, $4f61f8f98d0e8b39$var$Rt = / +/g;
var $4f61f8f98d0e8b39$var$Nt = ($4f61f8f98d0e8b39$var$Tt = {
    joinCommand (e, t) {
        return $4f61f8f98d0e8b39$var$Pt(e, t).join(" ");
    },
    getEscapedCommand (e, t) {
        return $4f61f8f98d0e8b39$var$Pt(e, t).map((e)=>((e)=>"string" != typeof e || $4f61f8f98d0e8b39$var$Ot.test(e) ? e : `"${e.replace($4f61f8f98d0e8b39$var$At, '\\"')}"`)(e)).join(" ");
    },
    parseCommand (e) {
        const t = [];
        for (const n of e.trim().split($4f61f8f98d0e8b39$var$Rt)){
            const e1 = t[t.length - 1];
            e1 && e1.endsWith("\\") ? t[t.length - 1] = `${e1.slice(0, -1)} ${n}` : t.push(n);
        }
        return t;
    }
}).joinCommand, $4f61f8f98d0e8b39$var$_t = $4f61f8f98d0e8b39$var$Tt.parseCommand, $4f61f8f98d0e8b39$var$jt = $4f61f8f98d0e8b39$var$Tt.getEscapedCommand;
const $4f61f8f98d0e8b39$var$Lt = (e, t, n = {})=>{
    const r = $4f61f8f98d0e8b39$var$z._parse(e, t, n);
    return e = r.command, t = r.args, (n = {
        maxBuffer: 1e8,
        buffer: !0,
        stripFinalNewline: !0,
        extendEnv: !0,
        preferLocal: !1,
        localDir: (n = r.options).cwd || process.cwd(),
        execPath: process.execPath,
        encoding: "utf8",
        reject: !0,
        cleanup: !0,
        all: !1,
        windowsHide: !0,
        ...n
    }).env = (({ env: e , extendEnv: t , preferLocal: n , localDir: r , execPath: o  })=>{
        const i = t ? {
            ...process.env,
            ...e
        } : e;
        return n ? $4f61f8f98d0e8b39$var$me.env({
            env: i,
            cwd: r,
            execPath: o
        }) : i;
    })(n), n.stdio = $4f61f8f98d0e8b39$var$Ne(n), "win32" === process.platform && "cmd" === (0, $dQzAa$path.basename)(e, ".exe") && t.unshift("/q"), {
        file: e,
        args: t,
        options: n,
        parsed: r
    };
}, $4f61f8f98d0e8b39$var$$t = (e, t, n)=>"string" == typeof t || Buffer.isBuffer(t) ? e.stripFinalNewline ? $4f61f8f98d0e8b39$var$pe(t) : t : void 0 === n ? void 0 : "", $4f61f8f98d0e8b39$var$Bt = (e, t, n)=>{
    const r = $4f61f8f98d0e8b39$var$Lt(e, t, n), o = $4f61f8f98d0e8b39$var$Nt(e, t), i = $4f61f8f98d0e8b39$var$jt(e, t);
    let s;
    $4f61f8f98d0e8b39$var$ot(r.options);
    try {
        s = (0, $dQzAa$child_process.spawn)(r.file, r.args, r.options);
    } catch (e1) {
        const t1 = new (0, $dQzAa$child_process.ChildProcess), n1 = Promise.reject($4f61f8f98d0e8b39$var$Se({
            error: e1,
            stdout: "",
            stderr: "",
            all: "",
            command: o,
            escapedCommand: i,
            parsed: r,
            timedOut: !1,
            isCanceled: !1,
            killed: !1
        }));
        return $4f61f8f98d0e8b39$var$Ct(t1, n1);
    }
    const a = $4f61f8f98d0e8b39$var$Gt(s), c = $4f61f8f98d0e8b39$var$rt(s, r.options, a), d = $4f61f8f98d0e8b39$var$it(s, r.options, c), l = {
        isCanceled: !1
    };
    s.kill = $4f61f8f98d0e8b39$var$tt.bind(null, s.kill.bind(s)), s.cancel = $4f61f8f98d0e8b39$var$nt.bind(null, s, l);
    const u = $4f61f8f98d0e8b39$var$ge(async ()=>{
        const [{ error: e , exitCode: t , signal: n , timedOut: a  }, c, u, p] = await $4f61f8f98d0e8b39$var$St(s, r.options, d), m = $4f61f8f98d0e8b39$var$$t(r.options, c), f = $4f61f8f98d0e8b39$var$$t(r.options, u), g = $4f61f8f98d0e8b39$var$$t(r.options, p);
        if (e || 0 !== t || null !== n) {
            const c1 = $4f61f8f98d0e8b39$var$Se({
                error: e,
                exitCode: t,
                signal: n,
                stdout: m,
                stderr: f,
                all: g,
                command: o,
                escapedCommand: i,
                parsed: r,
                timedOut: a,
                isCanceled: l.isCanceled,
                killed: s.killed
            });
            if (!r.options.reject) return c1;
            throw c1;
        }
        return {
            command: o,
            escapedCommand: i,
            exitCode: 0,
            stdout: m,
            stderr: f,
            all: g,
            failed: !1,
            timedOut: !1,
            isCanceled: !1,
            killed: !1
        };
    });
    return $4f61f8f98d0e8b39$var$vt(s, r.options.input), s.all = $4f61f8f98d0e8b39$var$xt(s, r.options), $4f61f8f98d0e8b39$var$Ct(s, u);
};
($4f61f8f98d0e8b39$var$Z = $4f61f8f98d0e8b39$var$Bt).sync = (e, t, n)=>{
    const r = $4f61f8f98d0e8b39$var$Lt(e, t, n), o = $4f61f8f98d0e8b39$var$Nt(e, t), i = $4f61f8f98d0e8b39$var$jt(e, t);
    let s;
    $4f61f8f98d0e8b39$var$wt(r.options);
    try {
        s = (0, $dQzAa$child_process.spawnSync)(r.file, r.args, r.options);
    } catch (e1) {
        throw $4f61f8f98d0e8b39$var$Se({
            error: e1,
            stdout: "",
            stderr: "",
            all: "",
            command: o,
            escapedCommand: i,
            parsed: r,
            timedOut: !1,
            isCanceled: !1,
            killed: !1
        });
    }
    const a = $4f61f8f98d0e8b39$var$$t(r.options, s.stdout, s.error), c = $4f61f8f98d0e8b39$var$$t(r.options, s.stderr, s.error);
    if (s.error || 0 !== s.status || null !== s.signal) {
        const e2 = $4f61f8f98d0e8b39$var$Se({
            stdout: a,
            stderr: c,
            error: s.error,
            signal: s.signal,
            exitCode: s.status,
            command: o,
            escapedCommand: i,
            parsed: r,
            timedOut: s.error && "ETIMEDOUT" === s.error.code,
            isCanceled: !1,
            killed: null !== s.signal
        });
        if (!r.options.reject) return e2;
        throw e2;
    }
    return {
        command: o,
        escapedCommand: i,
        exitCode: 0,
        stdout: a,
        stderr: c,
        failed: !1,
        timedOut: !1,
        isCanceled: !1,
        killed: !1
    };
}, $4f61f8f98d0e8b39$var$Z.command = (e, t)=>{
    const [n, ...r] = $4f61f8f98d0e8b39$var$_t(e);
    return $4f61f8f98d0e8b39$var$Bt(n, r, t);
}, $4f61f8f98d0e8b39$var$Z.commandSync = (e, t)=>{
    const [n, ...r] = $4f61f8f98d0e8b39$var$_t(e);
    return $4f61f8f98d0e8b39$var$Bt.sync(n, r, t);
}, $4f61f8f98d0e8b39$var$Z.node = (e, t, n = {})=>{
    t && !Array.isArray(t) && "object" == typeof t && (n = t, t = []);
    const r = $4f61f8f98d0e8b39$var$Ne.node(n), o = process.execArgv.filter((e)=>!e.startsWith("--inspect")), { nodePath: i = process.execPath , nodeOptions: s = o  } = n;
    return $4f61f8f98d0e8b39$var$Bt(i, [
        ...s,
        e,
        ...Array.isArray(t) ? t : []
    ], {
        ...n,
        stdin: void 0,
        stdout: void 0,
        stderr: void 0,
        stdio: r,
        shell: !1
    });
};
var $4f61f8f98d0e8b39$var$kt = {};
$4f61f8f98d0e8b39$var$t($4f61f8f98d0e8b39$var$kt, "isAdminWindows", ()=>$4f61f8f98d0e8b39$export$36ad181701cee597), $4f61f8f98d0e8b39$var$t($4f61f8f98d0e8b39$var$kt, "isAdminPosix", ()=>$4f61f8f98d0e8b39$export$2ebf12717e6b5bb8), $4f61f8f98d0e8b39$var$t($4f61f8f98d0e8b39$var$kt, "isAdmin", ()=>$4f61f8f98d0e8b39$export$fc970ed23da99565);
const $4f61f8f98d0e8b39$export$36ad181701cee597 = async ()=>{
    if ("win32" !== (0, ($parcel$interopDefault($dQzAa$process))).platform) return !1;
    try {
        var _systemdrive;
        return await $4f61f8f98d0e8b39$var$e($4f61f8f98d0e8b39$var$Z)("fsutil", [
            "dirty",
            "query",
            (_systemdrive = (0, ($parcel$interopDefault($dQzAa$process))).env.systemdrive) !== null && _systemdrive !== void 0 ? _systemdrive : ""
        ]), !0;
    } catch (t) {
        return "ENOENT" === t.code && (async ()=>{
            try {
                return await $4f61f8f98d0e8b39$var$e($4f61f8f98d0e8b39$var$Z)("fltmc"), !0;
            } catch  {
                return !1;
            }
        })();
    }
}, $4f61f8f98d0e8b39$export$2ebf12717e6b5bb8 = $4f61f8f98d0e8b39$export$e3140dc7d0c35e48;


function $84714ca9247cdcf5$export$8312d9eeba321950(path) {
    if ((0, $4f61f8f98d0e8b39$export$316200228f28b8ce)() && typeof process.env.SUDO_USER === "string") {
        // use the user profile even if root
        if (process.platform === "darwin") return (0, $dQzAa$path.join)("/Users/", process.env.SUDO_USER, path);
        else return (0, $dQzAa$path.join)("/home/", process.env.SUDO_USER, path);
    } else return (0, (/*@__PURE__*/$parcel$interopDefault($39a2120dff7d559f$exports)))(`~/${path}`);
}




var $8pybT = parcelRequire("8pybT");


/** The cached powershell path */ let $860d73bc96146e85$var$powershell;
function $860d73bc96146e85$export$43324456a02f71b0(command, startupFlags = [
    "-NoProfile",
    "-NoLogo",
    "-NonInteractive"
], execOptions = {
    stdio: "inherit"
}) {
    return (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports)))($860d73bc96146e85$export$4dfdd3964d242d20(), [
        ...startupFlags,
        "-c",
        command
    ], execOptions);
}
function $860d73bc96146e85$export$395ec453f890f6a3(command, startupFlags = [
    "-NoProfile",
    "-NoLogo",
    "-NonInteractive"
], execOptions = {
    stdio: "inherit"
}) {
    return (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports))).sync($860d73bc96146e85$export$4dfdd3964d242d20(), [
        ...startupFlags,
        "-c",
        command
    ], execOptions);
}
function $860d73bc96146e85$export$4dfdd3964d242d20() {
    if ($860d73bc96146e85$var$powershell === undefined) {
        const maybePwsh = (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("pwsh", {
            nothrow: true
        });
        if (maybePwsh !== null) $860d73bc96146e85$var$powershell = maybePwsh;
        const maybePowerShell = (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("powershell", {
            nothrow: true
        });
        if (maybePowerShell !== null) $860d73bc96146e85$var$powershell = maybePowerShell;
    }
    if ($860d73bc96146e85$var$powershell === undefined) throw new Error("Could not find powershell");
    return $860d73bc96146e85$var$powershell;
}



var $d4be0e081c4185c7$exports = {};

// to detect on with os user had used path.resolve(...)
const $d4be0e081c4185c7$var$is_posix_os = $dQzAa$os.platform() !== "win32";
const $d4be0e081c4185c7$var$version = $dQzAa$os.release();
// For some windows version (Windows 10 v1803), it is not useful to escape spaces in path
// https://docs.microsoft.com/en-us/windows/release-information/
const $d4be0e081c4185c7$var$windows_version_regex = /(\d+\.\d+)\.(\d+)/;
const $d4be0e081c4185c7$var$should_not_escape = (major_release = "", os_build = "")=>/1\d+\.\d+/.test(major_release) && Number(os_build) >= 17134.1184;
$d4be0e081c4185c7$exports = function(given_path) {
    return $d4be0e081c4185c7$var$is_posix_os ? given_path.replace(/(\s+)/g, "\\$1") : $d4be0e081c4185c7$var$should_not_escape(...$d4be0e081c4185c7$var$windows_version_regex.exec($d4be0e081c4185c7$var$version).splice(1)) ? given_path : given_path.replace(/(\s+)/g, "%20");
};


async function $b6119f751060b0b2$export$f63d3080ce25e0fd(name, valGiven, shouldEscapeSpace = false) {
    const val = shouldEscapeSpace ? (0, (/*@__PURE__*/$parcel$interopDefault($d4be0e081c4185c7$exports)))(valGiven !== null && valGiven !== void 0 ? valGiven : "") : valGiven;
    try {
        if ((0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() === "github-actions") try {
            (0, $9Ei2d.exportVariable)(name, val);
        } catch (err) {
            (0, $8pybT.error)(err);
            await $b6119f751060b0b2$var$addEnvSystem(name, val);
        }
        else await $b6119f751060b0b2$var$addEnvSystem(name, val);
    } catch (err1) {
        (0, $8pybT.error)(err1);
        (0, $9Ei2d.setFailed)(`Failed to export environment variable ${name}=${val}. You should add it manually.`);
    }
}
async function $b6119f751060b0b2$export$4c25481b843feb0b(path) {
    process.env.PATH = `${path}${0, $dQzAa$path.delimiter}${process.env.PATH}`;
    try {
        if ((0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() === "github-actions") try {
            (0, $9Ei2d.addPath)(path);
        } catch (err) {
            (0, $8pybT.error)(err);
            await $b6119f751060b0b2$var$addPathSystem(path);
        }
        else await $b6119f751060b0b2$var$addPathSystem(path);
    } catch (err1) {
        (0, $8pybT.error)(err1);
        (0, $9Ei2d.setFailed)(`Failed to add ${path} to the percistent PATH. You should add it manually.`);
    }
}
const $b6119f751060b0b2$export$1bbbc3a810c5799d = (0, $84714ca9247cdcf5$export$8312d9eeba321950)(".cpprc");
async function $b6119f751060b0b2$var$addEnvSystem(name, valGiven) {
    const val = valGiven !== null && valGiven !== void 0 ? valGiven : "";
    switch(process.platform){
        case "win32":
            // We do not use `execa.sync(`setx PATH "${path};%PATH%"`)` because of its character limit
            await (0, $860d73bc96146e85$export$43324456a02f71b0)(`[Environment]::SetEnvironmentVariable('${name}', '${val}', "User")`);
            (0, $9Ei2d.info)(`${name}='${val}' was set in the environment.`);
            return;
        case "linux":
        case "darwin":
            $b6119f751060b0b2$export$bd1dffd792f43c41();
            (0, $dQzAa$fs.appendFileSync)($b6119f751060b0b2$export$1bbbc3a810c5799d, `\nexport ${name}="${val}"\n`);
            (0, $9Ei2d.info)(`${name}="${val}" was added to "${$b6119f751060b0b2$export$1bbbc3a810c5799d}`);
            return;
        default:
    }
    process.env[name] = val;
}
async function $b6119f751060b0b2$var$addPathSystem(path) {
    switch(process.platform){
        case "win32":
            // We do not use `execa.sync(`setx PATH "${path};%PATH%"`)` because of its character limit and also because %PATH% is different for user and system
            await (0, $860d73bc96146e85$export$43324456a02f71b0)(`$USER_PATH=([Environment]::GetEnvironmentVariable("patha", "User")); [Environment]::SetEnvironmentVariable("patha", "${path};$USER_PATH", "User")`);
            (0, $9Ei2d.info)(`"${path}" was added to the PATH.`);
            return;
        case "linux":
        case "darwin":
            $b6119f751060b0b2$export$bd1dffd792f43c41();
            (0, $dQzAa$fs.appendFileSync)($b6119f751060b0b2$export$1bbbc3a810c5799d, `\nexport PATH="${path}:$PATH"\n`);
            (0, $9Ei2d.info)(`"${path}" was added to "${$b6119f751060b0b2$export$1bbbc3a810c5799d}"`);
            return;
        default:
            return;
    }
}
let $b6119f751060b0b2$var$setupCppInProfile_called = false;
function $b6119f751060b0b2$export$bd1dffd792f43c41() {
    if ($b6119f751060b0b2$var$setupCppInProfile_called) return;
    // a variable that prevents source_cpprc from being called from .bashrc and .profile
    const source_cpprc_str = "export SOURCE_CPPRC=0";
    if ((0, $dQzAa$fs.existsSync)($b6119f751060b0b2$export$1bbbc3a810c5799d)) {
        const cpprc_content = (0, $dQzAa$fs.readFileSync)($b6119f751060b0b2$export$1bbbc3a810c5799d, "utf8");
        if (cpprc_content.includes(source_cpprc_str)) // already executed setupCppInProfile
        return;
    }
    (0, $dQzAa$fs.appendFileSync)($b6119f751060b0b2$export$1bbbc3a810c5799d, `\n${source_cpprc_str}\n`);
    (0, $9Ei2d.info)(`Added ${source_cpprc_str} to ${$b6119f751060b0b2$export$1bbbc3a810c5799d}`);
    const source_cpprc_string = `\n# source .cpprc if SOURCE_CPPRC is not set to 0\nif [[ "$SOURCE_CPPRC" != 0 && -f "${$b6119f751060b0b2$export$1bbbc3a810c5799d}" ]]; then source "${$b6119f751060b0b2$export$1bbbc3a810c5799d}"; fi\n`;
    try {
        // source cpprc in .profile
        const profile_path = (0, $84714ca9247cdcf5$export$8312d9eeba321950)(".profile");
        (0, $dQzAa$fs.appendFileSync)(profile_path, source_cpprc_string);
        (0, $9Ei2d.info)(`${source_cpprc_string} was added to ${profile_path}`);
        // source cpprc in .bashrc too
        const bashrc_path = (0, $84714ca9247cdcf5$export$8312d9eeba321950)(".bashrc");
        (0, $dQzAa$fs.appendFileSync)(bashrc_path, source_cpprc_string);
        (0, $9Ei2d.info)(`${source_cpprc_string} was added to ${bashrc_path}`);
    } catch (err) {
        (0, $8pybT.warning)(`Failed to add ${source_cpprc_string} to .profile or .bashrc. You should add it manually: ${err}`);
    }
    $b6119f751060b0b2$var$setupCppInProfile_called = true;
}




let $7b92e9e7fd13b8fa$var$didUpdate = false;
let $7b92e9e7fd13b8fa$var$didInit = false;
async function $7b92e9e7fd13b8fa$export$d73dc343f5abf26(name, version, repositories = [], update = false) {
    const apt = $7b92e9e7fd13b8fa$var$getApt();
    (0, $9Ei2d.info)(`Installing ${name} ${version !== null && version !== void 0 ? version : ""} via ${apt}`);
    process.env.DEBIAN_FRONTEND = "noninteractive";
    if (!$7b92e9e7fd13b8fa$var$didUpdate || update) {
        $7b92e9e7fd13b8fa$var$updateRepos(apt);
        $7b92e9e7fd13b8fa$var$didUpdate = true;
    }
    if (!$7b92e9e7fd13b8fa$var$didInit) {
        await $7b92e9e7fd13b8fa$var$initApt(apt);
        $7b92e9e7fd13b8fa$var$didInit = true;
    }
    if (Array.isArray(repositories) && repositories.length !== 0) {
        for (const repo of repositories)// eslint-disable-next-line no-await-in-loop
        (0, $5643e448a91ad22e$export$58f152936f209932)("add-apt-repository", [
            "--update",
            "-y",
            repo
        ]);
        $7b92e9e7fd13b8fa$var$updateRepos(apt);
    }
    if (version !== undefined && version !== "") try {
        (0, $5643e448a91ad22e$export$58f152936f209932)(apt, [
            "install",
            "--fix-broken",
            "-y",
            `${name}=${version}`
        ]);
    } catch  {
        (0, $5643e448a91ad22e$export$58f152936f209932)(apt, [
            "install",
            "--fix-broken",
            "-y",
            `${name}-${version}`
        ]);
    }
    else (0, $5643e448a91ad22e$export$58f152936f209932)(apt, [
        "install",
        "--fix-broken",
        "-y",
        name
    ]);
    return {
        binDir: "/usr/bin/"
    };
}
function $7b92e9e7fd13b8fa$var$getApt() {
    let apt;
    if ((0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("nala", {
        nothrow: true
    }) !== null) apt = "nala";
    else apt = "apt-get";
    return apt;
}
function $7b92e9e7fd13b8fa$var$updateRepos(apt) {
    (0, $5643e448a91ad22e$export$58f152936f209932)(apt, apt !== "nala" ? [
        "update",
        "-y"
    ] : [
        "update"
    ]);
}
/** Install apt utils and certificates (usually missing from docker containers) */ async function $7b92e9e7fd13b8fa$var$initApt(apt) {
    (0, $5643e448a91ad22e$export$58f152936f209932)(apt, [
        "install",
        "--fix-broken",
        "-y",
        "software-properties-common",
        "apt-utils",
        "ca-certificates",
        "gnupg", 
    ]);
    $7b92e9e7fd13b8fa$export$11aa10c05ada0934([
        "3B4FE6ACC0B21F32",
        "40976EAF437D05B5"
    ], "setup-cpp-ubuntu-archive.gpg");
    $7b92e9e7fd13b8fa$export$11aa10c05ada0934([
        "1E9377A2BA9EF27F"
    ], "launchpad-toolchain.gpg");
    if (apt === "nala") {
        // enable utf8 otherwise it fails because of the usage of ASCII encoding
        await (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("LANG", "C.UTF-8");
        await (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("LC_ALL", "C.UTF-8");
    }
}
function $7b92e9e7fd13b8fa$var$initGpg() {
    (0, $5643e448a91ad22e$export$58f152936f209932)("gpg", [
        "-k"
    ]);
}
function $7b92e9e7fd13b8fa$export$11aa10c05ada0934(keys, name, server = "keyserver.ubuntu.com") {
    const fileName = `/etc/apt/trusted.gpg.d/${name}`;
    if (!(0, $dQzAa$fs.existsSync)(fileName)) {
        $7b92e9e7fd13b8fa$var$initGpg();
        for (const key of keys){
            (0, $5643e448a91ad22e$export$58f152936f209932)("gpg", [
                "--no-default-keyring",
                "--keyring",
                `gnupg-ring:${fileName}`,
                "--keyserver",
                server,
                "--recv-keys",
                key, 
            ]);
            (0, $5643e448a91ad22e$export$58f152936f209932)("chmod", [
                "644",
                fileName
            ]);
        }
    }
    return fileName;
}
async function $7b92e9e7fd13b8fa$export$7fb1a688af1305f0(name, url) {
    const fileName = `/etc/apt/trusted.gpg.d/${name}`;
    if (!(0, $dQzAa$fs.existsSync)(fileName)) {
        $7b92e9e7fd13b8fa$var$initGpg();
        await $7b92e9e7fd13b8fa$export$d73dc343f5abf26("curl", undefined);
        (0, $5643e448a91ad22e$export$58f152936f209932)("bash", [
            "-c",
            `curl -s ${url} | gpg --no-default-keyring --keyring gnupg-ring:${fileName} --import`
        ]);
        (0, $5643e448a91ad22e$export$58f152936f209932)("chmod", [
            "644",
            fileName
        ]);
    }
    return fileName;
}
function $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02(name, path) {
    if ((0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() === "github-actions") return (0, $5643e448a91ad22e$export$58f152936f209932)("update-alternatives", [
        "--install",
        `/usr/bin/${name}`,
        name,
        path,
        "40"
    ]);
    else {
        (0, $b6119f751060b0b2$export$bd1dffd792f43c41)();
        return (0, $dQzAa$fs.appendFileSync)((0, $b6119f751060b0b2$export$1bbbc3a810c5799d), `\nif [ $UID -eq 0 ]; then update-alternatives --install /usr/bin/${name} ${name} ${path} 40; fi\n`);
    }
}




var $8pybT = parcelRequire("8pybT");
let $bd0a5aeac410d6bb$var$didUpdate = false;
let $bd0a5aeac410d6bb$var$didInit = false;
function $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c(name, version, aur) {
    (0, $8pybT.info)(`Installing ${name} ${version !== null && version !== void 0 ? version : ""} via pacman`);
    const pacman = "pacman";
    if (!$bd0a5aeac410d6bb$var$didUpdate) {
        (0, $5643e448a91ad22e$export$58f152936f209932)(pacman, [
            "-Syuu",
            "--noconfirm"
        ]);
        $bd0a5aeac410d6bb$var$didUpdate = true;
    }
    if (!$bd0a5aeac410d6bb$var$didInit) {
        // install base-devel
        (0, $5643e448a91ad22e$export$58f152936f209932)(pacman, [
            "-Sy",
            "--noconfirm",
            "base-devel"
        ]);
        $bd0a5aeac410d6bb$var$didInit = true;
    }
    if (version !== undefined && version !== "") try {
        (0, $5643e448a91ad22e$export$58f152936f209932)(aur !== null && aur !== void 0 ? aur : pacman, [
            "-S",
            "--noconfirm",
            `${name}=${version}`
        ]);
    } catch  {
        (0, $5643e448a91ad22e$export$58f152936f209932)(aur !== null && aur !== void 0 ? aur : pacman, [
            "-S",
            "--noconfirm",
            `${name}${version}`
        ]);
    }
    else (0, $5643e448a91ad22e$export$58f152936f209932)(aur !== null && aur !== void 0 ? aur : pacman, [
        "-S",
        "--noconfirm",
        name
    ]);
    return {
        binDir: "/usr/bin/"
    };
}



var $9Ei2d = parcelRequire("9Ei2d");



let $6ea0ef9d1727031f$var$hasBrew = false;
function $6ea0ef9d1727031f$export$ce5d13d8a85cb784(name, version, extraArgs = []) {
    (0, $9Ei2d.info)(`Installing ${name} ${version !== null && version !== void 0 ? version : ""} via brew`);
    if (!$6ea0ef9d1727031f$var$hasBrew || (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("brew", {
        nothrow: true
    }) === null) {
        (0, $28a97e251fbb61ba$export$c5eeb9c87a610a0e)("", "", process.arch);
        $6ea0ef9d1727031f$var$hasBrew = true;
    }
    // brew is not thread-safe
    (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports))).sync("brew", [
        "install",
        version !== undefined && version !== "" ? `${name}@${version}` : name,
        ...extraArgs
    ], {
        stdio: "inherit"
    });
    return {
        binDir: "/usr/local/bin/"
    };
}







var $7w88d = parcelRequire("7w88d");


let $f1566e05059df988$var$binDir;
async function $f1566e05059df988$export$b804d731cdad7ef9(// eslint-disable-next-line @typescript-eslint/no-unused-vars
_version, // eslint-disable-next-line @typescript-eslint/no-unused-vars
_setupDir, // eslint-disable-next-line @typescript-eslint/no-unused-vars
_arch) {
    if (process.platform !== "win32") return undefined;
    if (typeof $f1566e05059df988$var$binDir === "string") return {
        binDir: $f1566e05059df988$var$binDir
    };
    const maybeBinDir = (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("choco", {
        nothrow: true
    });
    if (maybeBinDir !== null) {
        $f1566e05059df988$var$binDir = (0, $7w88d.dirname)(maybeBinDir);
        return {
            binDir: $f1566e05059df988$var$binDir
        };
    }
    let powershell = "powershell.exe";
    const maybePowerShell = (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync(`${process.env.SystemRoot}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`, {
        nothrow: true
    });
    if (maybePowerShell !== null) powershell = maybePowerShell;
    // https://docs.chocolatey.org/en-us/choco/setup#install-with-cmd.exe
    (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports))).sync(powershell, [
        "-NoProfile",
        "-InputFormat",
        "None",
        "-ExecutionPolicy",
        "Bypass",
        "-Command",
        "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))", 
    ], {
        stdio: "inherit"
    });
    const chocoPath = `${process.env.ALLUSERSPROFILE}\\chocolatey\\bin`;
    await (0, $b6119f751060b0b2$export$4c25481b843feb0b)(chocoPath);
    const maybeChoco = (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("choco", {
        nothrow: true
    });
    var _ChocolateyInstall;
    if (maybeChoco !== null) $f1566e05059df988$var$binDir = (0, $7w88d.dirname)(maybeChoco);
    else $f1566e05059df988$var$binDir = `${(_ChocolateyInstall = process.env.ChocolateyInstall) !== null && _ChocolateyInstall !== void 0 ? _ChocolateyInstall : "C:/ProgramData/chocolatey"}/bin`;
    if ((0, $dQzAa$fs.existsSync)($f1566e05059df988$var$binDir)) return {
        binDir: $f1566e05059df988$var$binDir
    };
    return undefined;
}




var $9Ei2d = parcelRequire("9Ei2d");

var $8pybT = parcelRequire("8pybT");
let $d14c4153e64e41c0$var$hasChoco = false;
async function $d14c4153e64e41c0$export$9f6912bc890040b2(name, version, args = []) {
    (0, $9Ei2d.info)(`Installing ${name} ${version !== null && version !== void 0 ? version : ""} via chocolatey`);
    if (!$d14c4153e64e41c0$var$hasChoco || (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("choco", {
        nothrow: true
    }) === null) {
        await (0, $f1566e05059df988$export$b804d731cdad7ef9)("", "", process.arch);
        $d14c4153e64e41c0$var$hasChoco = true;
    }
    // https://github.com/jberezanski/ChocolateyPackages/issues/97#issuecomment-986825694
    const PATH = process.env.PATH;
    const env = {
        ...process.env
    };
    delete env.TMP;
    delete env.TEMP;
    delete env.Path;
    env.PATH = PATH;
    if (version !== undefined && version !== "") (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports))).sync("choco", [
        "install",
        "-y",
        name,
        `--version=${version}`,
        ...args
    ], {
        env: env,
        extendEnv: false,
        stdio: "inherit"
    });
    else try {
        (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports))).sync("choco", [
            "install",
            "-y",
            name,
            ...args
        ], {
            env: env,
            extendEnv: false,
            stdio: "inherit"
        });
    } catch (err) {
        // if the package requires a reboot, downgrade the error to a notice
        if (err.message.includes("exit code 3010")) (0, $8pybT.notice)(`${name} might require a reboot for the completion of the installation.`);
        else throw err;
    }
    var _ChocolateyInstall;
    const binDir = `${(_ChocolateyInstall = process.env.ChocolateyInstall) !== null && _ChocolateyInstall !== void 0 ? _ChocolateyInstall : "C:/ProgramData/chocolatey"}/bin`;
    await (0, $b6119f751060b0b2$export$4c25481b843feb0b)(binDir);
    return {
        binDir: binDir
    };
}



let $94a574e06b6f997e$var$isArchCache = undefined;
function $94a574e06b6f997e$export$d415ddb6702ec3a2() {
    if (process.platform !== "linux") return false;
    if ($94a574e06b6f997e$var$isArchCache === undefined) // detect arch by checking if pacman exists
    $94a574e06b6f997e$var$isArchCache = (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("pacman", {
        nothrow: true
    }) !== null;
    return $94a574e06b6f997e$var$isArchCache;
}



let $549a35588e9d71a1$var$hasDnfCache = undefined;
function $549a35588e9d71a1$export$8ce8b4b22331a8c7() {
    if (process.platform !== "linux") return false;
    if ($549a35588e9d71a1$var$hasDnfCache === undefined) $549a35588e9d71a1$var$hasDnfCache = (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("dnf", {
        nothrow: true
    }) !== null;
    return $549a35588e9d71a1$var$hasDnfCache;
}




var $8pybT = parcelRequire("8pybT");
function $80080083807a67cd$export$49d4f9ba8e0dd34f(name, version) {
    (0, $8pybT.info)(`Installing ${name} ${version !== null && version !== void 0 ? version : ""} via dnf`);
    const dnf = "dnf";
    // if (!didUpdate) {
    //   execRootSync(dnf, ["-y", "check-update"])
    //   didUpdate = true
    // }
    if (version !== undefined && version !== "") try {
        (0, $5643e448a91ad22e$export$58f152936f209932)(dnf, [
            "-y",
            "install",
            `${name}-${version}`
        ]);
    } catch (err) {
        (0, $8pybT.warning)(`${err.toString()}\nInstalling the default version available via dnf`);
        (0, $5643e448a91ad22e$export$58f152936f209932)(dnf, [
            "-y",
            "install",
            name
        ]);
    }
    else (0, $5643e448a91ad22e$export$58f152936f209932)(dnf, [
        "-y",
        "install",
        name
    ]);
    return {
        binDir: "/usr/bin/"
    };
}



let $5368bbfc688469a5$var$isUbuntuCache = undefined;
function $5368bbfc688469a5$export$da8baf1d6c6802b6() {
    if (process.platform !== "linux") return false;
    if ($5368bbfc688469a5$var$isUbuntuCache === undefined) {
        const apt = "apt-get";
        $5368bbfc688469a5$var$isUbuntuCache = (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync(apt, {
            nothrow: true
        }) !== null;
    }
    return $5368bbfc688469a5$var$isUbuntuCache;
}


function $8c78d43577dd4046$export$111263621bbb0768(version, _setupDir, _arch) {
    switch(process.platform){
        case "win32":
            return (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("ccache", version);
        case "darwin":
            return (0, $6ea0ef9d1727031f$export$ce5d13d8a85cb784)("ccache", version);
        case "linux":
            if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) return (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("ccache", version);
            else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) return (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("ccache", version);
            else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) return (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("ccache", version);
            throw new Error(`Unsupported linux distribution`);
        default:
            throw new Error(`Unsupported platform`);
    }
}











async function $d335de594b42817c$export$b0a9411329e2916(version, _setupDir, _arch) {
    switch(process.platform){
        case "win32":
            return (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("make", version);
        case "darwin":
            (0, $6ea0ef9d1727031f$export$ce5d13d8a85cb784)("make", version);
            await (0, $b6119f751060b0b2$export$4c25481b843feb0b)("/usr/local/opt/make/libexec/gnubin");
            return {
                binDir: "/usr/local/opt/make/libexec/gnubin"
            };
        case "linux":
            if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) return (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("make", version);
            else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) return (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("make", version);
            else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) return (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("make", version);
            throw new Error(`Unsupported linux distribution`);
        default:
            throw new Error(`Unsupported platform`);
    }
}



var $7w88d = parcelRequire("7w88d");


var $9oxKF = parcelRequire("9oxKF");









function $93a1c1326d2a1d42$export$5fc39629e14c8173(version, _setupDir, _arch) {
    switch(process.platform){
        case "win32":
            return (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("7zip", version);
        case "darwin":
            return (0, $6ea0ef9d1727031f$export$ce5d13d8a85cb784)("p7zip", version);
        case "linux":
            if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) return (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("p7zip", version);
            else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) {
                (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("p7zip", version);
                return (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("p7zip-plugins", version);
            } else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) return (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("p7zip-full", version);
            throw new Error(`Unsupported linux distribution`);
        default:
            throw new Error(`Unsupported platform`);
    }
}



var $8pybT = parcelRequire("8pybT");

function $562bc96627c27994$export$f9a3d10eb7c735af(path) {
    if ((process.platform === "linux" || process.platform === "darwin") && (0, $4f61f8f98d0e8b39$export$316200228f28b8ce)() && process.env.SUDO_USER !== undefined) (0, $4f61f8f98d0e8b39$export$58f152936f209932)("chown", [
        "-R",
        process.env.SUDO_USER,
        path
    ], {
        cwd: path,
        stdio: "inherit",
        shell: true
    });
}


var $d24e801d69813f05$exports = {};
"use strict";

var $d24e801d69813f05$var$$parcel$__dirname = $dQzAa$path.resolve(__dirname, "../node_modules/.pnpm/@actions+tool-cache@2.0.1/node_modules/@actions/tool-cache/lib");
var $d24e801d69813f05$var$__createBinding = $d24e801d69813f05$exports && $d24e801d69813f05$exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $d24e801d69813f05$var$__setModuleDefault = $d24e801d69813f05$exports && $d24e801d69813f05$exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $d24e801d69813f05$var$__importStar = $d24e801d69813f05$exports && $d24e801d69813f05$exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $d24e801d69813f05$var$__createBinding(result, mod, k);
    }
    $d24e801d69813f05$var$__setModuleDefault(result, mod);
    return result;
};
var $d24e801d69813f05$var$__awaiter = $d24e801d69813f05$exports && $d24e801d69813f05$exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $d24e801d69813f05$var$__importDefault = $d24e801d69813f05$exports && $d24e801d69813f05$exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty($d24e801d69813f05$exports, "__esModule", {
    value: true
});
$d24e801d69813f05$exports.evaluateVersions = $d24e801d69813f05$exports.isExplicitVersion = $d24e801d69813f05$exports.findFromManifest = $d24e801d69813f05$exports.getManifestFromRepo = $d24e801d69813f05$exports.findAllVersions = $d24e801d69813f05$exports.find = $d24e801d69813f05$exports.cacheFile = $d24e801d69813f05$exports.cacheDir = $d24e801d69813f05$exports.extractZip = $d24e801d69813f05$exports.extractXar = $d24e801d69813f05$exports.extractTar = $d24e801d69813f05$exports.extract7z = $d24e801d69813f05$exports.downloadTool = $d24e801d69813f05$exports.HTTPError = void 0;

const $d24e801d69813f05$var$core = $d24e801d69813f05$var$__importStar((parcelRequire("9Ei2d")));

const $d24e801d69813f05$var$io = $d24e801d69813f05$var$__importStar((parcelRequire("9oxKF")));

const $d24e801d69813f05$var$fs = $d24e801d69813f05$var$__importStar($dQzAa$fs);

const $d24e801d69813f05$var$mm = $d24e801d69813f05$var$__importStar((parcelRequire("gWoto")));

const $d24e801d69813f05$var$os = $d24e801d69813f05$var$__importStar($dQzAa$os);

const $d24e801d69813f05$var$path = $d24e801d69813f05$var$__importStar($dQzAa$path);

const $d24e801d69813f05$var$httpm = $d24e801d69813f05$var$__importStar((parcelRequire("c0Wlj")));

const $d24e801d69813f05$var$semver = $d24e801d69813f05$var$__importStar((parcelRequire("93KhT")));

const $d24e801d69813f05$var$stream = $d24e801d69813f05$var$__importStar($dQzAa$stream);

const $d24e801d69813f05$var$util = $d24e801d69813f05$var$__importStar($dQzAa$util);


const $d24e801d69813f05$var$v4_1 = $d24e801d69813f05$var$__importDefault((parcelRequire("96ILy")));

var $jEF4C = parcelRequire("jEF4C");
var $4c61c553154f1c20$exports = {};
"use strict";
var $4c61c553154f1c20$var$__createBinding = $4c61c553154f1c20$exports && $4c61c553154f1c20$exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $4c61c553154f1c20$var$__setModuleDefault = $4c61c553154f1c20$exports && $4c61c553154f1c20$exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $4c61c553154f1c20$var$__importStar = $4c61c553154f1c20$exports && $4c61c553154f1c20$exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $4c61c553154f1c20$var$__createBinding(result, mod, k);
    }
    $4c61c553154f1c20$var$__setModuleDefault(result, mod);
    return result;
};
var $4c61c553154f1c20$var$__awaiter = $4c61c553154f1c20$exports && $4c61c553154f1c20$exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty($4c61c553154f1c20$exports, "__esModule", {
    value: true
});
$4c61c553154f1c20$exports.RetryHelper = void 0;

const $4c61c553154f1c20$var$core = $4c61c553154f1c20$var$__importStar((parcelRequire("9Ei2d")));
/**
 * Internal class for retries
 */ class $4c61c553154f1c20$var$RetryHelper {
    constructor(maxAttempts, minSeconds, maxSeconds){
        if (maxAttempts < 1) throw new Error("max attempts should be greater than or equal to 1");
        this.maxAttempts = maxAttempts;
        this.minSeconds = Math.floor(minSeconds);
        this.maxSeconds = Math.floor(maxSeconds);
        if (this.minSeconds > this.maxSeconds) throw new Error("min seconds should be less than or equal to max seconds");
    }
    execute(action, isRetryable) {
        return $4c61c553154f1c20$var$__awaiter(this, void 0, void 0, function*() {
            let attempt = 1;
            while(attempt < this.maxAttempts){
                // Try
                try {
                    return yield action();
                } catch (err) {
                    if (isRetryable && !isRetryable(err)) throw err;
                    $4c61c553154f1c20$var$core.info(err.message);
                }
                // Sleep
                const seconds = this.getSleepAmount();
                $4c61c553154f1c20$var$core.info(`Waiting ${seconds} seconds before trying again`);
                yield this.sleep(seconds);
                attempt++;
            }
            // Last attempt
            return yield action();
        });
    }
    getSleepAmount() {
        return Math.floor(Math.random() * (this.maxSeconds - this.minSeconds + 1)) + this.minSeconds;
    }
    sleep(seconds) {
        return $4c61c553154f1c20$var$__awaiter(this, void 0, void 0, function*() {
            return new Promise((resolve)=>setTimeout(resolve, seconds * 1000));
        });
    }
}
$4c61c553154f1c20$exports.RetryHelper = $4c61c553154f1c20$var$RetryHelper;


class $d24e801d69813f05$var$HTTPError extends Error {
    constructor(httpStatusCode){
        super(`Unexpected HTTP response: ${httpStatusCode}`);
        this.httpStatusCode = httpStatusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
$d24e801d69813f05$exports.HTTPError = $d24e801d69813f05$var$HTTPError;
const $d24e801d69813f05$var$IS_WINDOWS = process.platform === "win32";
const $d24e801d69813f05$var$IS_MAC = process.platform === "darwin";
const $d24e801d69813f05$var$userAgent = "actions/tool-cache";
/**
 * Download a tool from an url and stream it into a file
 *
 * @param url       url of tool to download
 * @param dest      path to download tool
 * @param auth      authorization header
 * @param headers   other headers
 * @returns         path to downloaded tool
 */ function $d24e801d69813f05$var$downloadTool(url, dest, auth, headers) {
    return $d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
        dest = dest || $d24e801d69813f05$var$path.join($d24e801d69813f05$var$_getTempDirectory(), $d24e801d69813f05$var$v4_1.default());
        yield $d24e801d69813f05$var$io.mkdirP($d24e801d69813f05$var$path.dirname(dest));
        $d24e801d69813f05$var$core.debug(`Downloading ${url}`);
        $d24e801d69813f05$var$core.debug(`Destination ${dest}`);
        const maxAttempts = 3;
        const minSeconds = $d24e801d69813f05$var$_getGlobal("TEST_DOWNLOAD_TOOL_RETRY_MIN_SECONDS", 10);
        const maxSeconds = $d24e801d69813f05$var$_getGlobal("TEST_DOWNLOAD_TOOL_RETRY_MAX_SECONDS", 20);
        const retryHelper = new $4c61c553154f1c20$exports.RetryHelper(maxAttempts, minSeconds, maxSeconds);
        return yield retryHelper.execute(()=>$d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
                return yield $d24e801d69813f05$var$downloadToolAttempt(url, dest || "", auth, headers);
            }), (err)=>{
            if (err instanceof $d24e801d69813f05$var$HTTPError && err.httpStatusCode) {
                // Don't retry anything less than 500, except 408 Request Timeout and 429 Too Many Requests
                if (err.httpStatusCode < 500 && err.httpStatusCode !== 408 && err.httpStatusCode !== 429) return false;
            }
            // Otherwise retry
            return true;
        });
    });
}
$d24e801d69813f05$exports.downloadTool = $d24e801d69813f05$var$downloadTool;
function $d24e801d69813f05$var$downloadToolAttempt(url, dest, auth, headers) {
    return $d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
        if ($d24e801d69813f05$var$fs.existsSync(dest)) throw new Error(`Destination file path ${dest} already exists`);
        // Get the response headers
        const http = new $d24e801d69813f05$var$httpm.HttpClient($d24e801d69813f05$var$userAgent, [], {
            allowRetries: false
        });
        if (auth) {
            $d24e801d69813f05$var$core.debug("set auth");
            if (headers === undefined) headers = {};
            headers.authorization = auth;
        }
        const response = yield http.get(url, headers);
        if (response.message.statusCode !== 200) {
            const err = new $d24e801d69813f05$var$HTTPError(response.message.statusCode);
            $d24e801d69813f05$var$core.debug(`Failed to download from "${url}". Code(${response.message.statusCode}) Message(${response.message.statusMessage})`);
            throw err;
        }
        // Download the response body
        const pipeline = $d24e801d69813f05$var$util.promisify($d24e801d69813f05$var$stream.pipeline);
        const responseMessageFactory = $d24e801d69813f05$var$_getGlobal("TEST_DOWNLOAD_TOOL_RESPONSE_MESSAGE_FACTORY", ()=>response.message);
        const readStream = responseMessageFactory();
        let succeeded = false;
        try {
            yield pipeline(readStream, $d24e801d69813f05$var$fs.createWriteStream(dest));
            $d24e801d69813f05$var$core.debug("download complete");
            succeeded = true;
            return dest;
        } finally{
            // Error, delete dest before retry
            if (!succeeded) {
                $d24e801d69813f05$var$core.debug("download failed");
                try {
                    yield $d24e801d69813f05$var$io.rmRF(dest);
                } catch (err1) {
                    $d24e801d69813f05$var$core.debug(`Failed to delete '${dest}'. ${err1.message}`);
                }
            }
        }
    });
}
/**
 * Extract a .7z file
 *
 * @param file     path to the .7z file
 * @param dest     destination directory. Optional.
 * @param _7zPath  path to 7zr.exe. Optional, for long path support. Most .7z archives do not have this
 * problem. If your .7z archive contains very long paths, you can pass the path to 7zr.exe which will
 * gracefully handle long paths. By default 7zdec.exe is used because it is a very small program and is
 * bundled with the tool lib. However it does not support long paths. 7zr.exe is the reduced command line
 * interface, it is smaller than the full command line interface, and it does support long paths. At the
 * time of this writing, it is freely available from the LZMA SDK that is available on the 7zip website.
 * Be sure to check the current license agreement. If 7zr.exe is bundled with your action, then the path
 * to 7zr.exe can be pass to this function.
 * @returns        path to the destination directory
 */ function $d24e801d69813f05$var$extract7z(file, dest, _7zPath) {
    return $d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
        $dQzAa$assert.ok($d24e801d69813f05$var$IS_WINDOWS, "extract7z() not supported on current OS");
        $dQzAa$assert.ok(file, 'parameter "file" is required');
        dest = yield $d24e801d69813f05$var$_createExtractFolder(dest);
        const originalCwd = process.cwd();
        process.chdir(dest);
        if (_7zPath) try {
            const logLevel = $d24e801d69813f05$var$core.isDebug() ? "-bb1" : "-bb0";
            const args = [
                "x",
                logLevel,
                "-bd",
                "-sccUTF-8",
                file
            ];
            const options = {
                silent: true
            };
            yield $jEF4C.exec(`"${_7zPath}"`, args, options);
        } finally{
            process.chdir(originalCwd);
        }
        else {
            const escapedScript = $d24e801d69813f05$var$path.join($d24e801d69813f05$var$$parcel$__dirname, "..", "scripts", "Invoke-7zdec.ps1").replace(/'/g, "''").replace(/"|\n|\r/g, ""); // double-up single quotes, remove double quotes and newlines
            const escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, "");
            const escapedTarget = dest.replace(/'/g, "''").replace(/"|\n|\r/g, "");
            const command = `& '${escapedScript}' -Source '${escapedFile}' -Target '${escapedTarget}'`;
            const args1 = [
                "-NoLogo",
                "-Sta",
                "-NoProfile",
                "-NonInteractive",
                "-ExecutionPolicy",
                "Unrestricted",
                "-Command",
                command
            ];
            const options1 = {
                silent: true
            };
            try {
                const powershellPath = yield $d24e801d69813f05$var$io.which("powershell", true);
                yield $jEF4C.exec(`"${powershellPath}"`, args1, options1);
            } finally{
                process.chdir(originalCwd);
            }
        }
        return dest;
    });
}
$d24e801d69813f05$exports.extract7z = $d24e801d69813f05$var$extract7z;
/**
 * Extract a compressed tar archive
 *
 * @param file     path to the tar
 * @param dest     destination directory. Optional.
 * @param flags    flags for the tar command to use for extraction. Defaults to 'xz' (extracting gzipped tars). Optional.
 * @returns        path to the destination directory
 */ function $d24e801d69813f05$var$extractTar(file, dest, flags = "xz") {
    return $d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
        if (!file) throw new Error("parameter 'file' is required");
        // Create dest
        dest = yield $d24e801d69813f05$var$_createExtractFolder(dest);
        // Determine whether GNU tar
        $d24e801d69813f05$var$core.debug("Checking tar --version");
        let versionOutput = "";
        yield $jEF4C.exec("tar --version", [], {
            ignoreReturnCode: true,
            silent: true,
            listeners: {
                stdout: (data)=>versionOutput += data.toString(),
                stderr: (data)=>versionOutput += data.toString()
            }
        });
        $d24e801d69813f05$var$core.debug(versionOutput.trim());
        const isGnuTar = versionOutput.toUpperCase().includes("GNU TAR");
        // Initialize args
        let args;
        if (flags instanceof Array) args = flags;
        else args = [
            flags
        ];
        if ($d24e801d69813f05$var$core.isDebug() && !flags.includes("v")) args.push("-v");
        let destArg = dest;
        let fileArg = file;
        if ($d24e801d69813f05$var$IS_WINDOWS && isGnuTar) {
            args.push("--force-local");
            destArg = dest.replace(/\\/g, "/");
            // Technically only the dest needs to have `/` but for aesthetic consistency
            // convert slashes in the file arg too.
            fileArg = file.replace(/\\/g, "/");
        }
        if (isGnuTar) {
            // Suppress warnings when using GNU tar to extract archives created by BSD tar
            args.push("--warning=no-unknown-keyword");
            args.push("--overwrite");
        }
        args.push("-C", destArg, "-f", fileArg);
        yield $jEF4C.exec(`tar`, args);
        return dest;
    });
}
$d24e801d69813f05$exports.extractTar = $d24e801d69813f05$var$extractTar;
/**
 * Extract a xar compatible archive
 *
 * @param file     path to the archive
 * @param dest     destination directory. Optional.
 * @param flags    flags for the xar. Optional.
 * @returns        path to the destination directory
 */ function $d24e801d69813f05$var$extractXar(file, dest, flags = []) {
    return $d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
        $dQzAa$assert.ok($d24e801d69813f05$var$IS_MAC, "extractXar() not supported on current OS");
        $dQzAa$assert.ok(file, 'parameter "file" is required');
        dest = yield $d24e801d69813f05$var$_createExtractFolder(dest);
        let args;
        if (flags instanceof Array) args = flags;
        else args = [
            flags
        ];
        args.push("-x", "-C", dest, "-f", file);
        if ($d24e801d69813f05$var$core.isDebug()) args.push("-v");
        const xarPath = yield $d24e801d69813f05$var$io.which("xar", true);
        yield $jEF4C.exec(`"${xarPath}"`, $d24e801d69813f05$var$_unique(args));
        return dest;
    });
}
$d24e801d69813f05$exports.extractXar = $d24e801d69813f05$var$extractXar;
/**
 * Extract a zip
 *
 * @param file     path to the zip
 * @param dest     destination directory. Optional.
 * @returns        path to the destination directory
 */ function $d24e801d69813f05$var$extractZip(file, dest) {
    return $d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
        if (!file) throw new Error("parameter 'file' is required");
        dest = yield $d24e801d69813f05$var$_createExtractFolder(dest);
        if ($d24e801d69813f05$var$IS_WINDOWS) yield $d24e801d69813f05$var$extractZipWin(file, dest);
        else yield $d24e801d69813f05$var$extractZipNix(file, dest);
        return dest;
    });
}
$d24e801d69813f05$exports.extractZip = $d24e801d69813f05$var$extractZip;
function $d24e801d69813f05$var$extractZipWin(file, dest) {
    return $d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
        // build the powershell command
        const escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, ""); // double-up single quotes, remove double quotes and newlines
        const escapedDest = dest.replace(/'/g, "''").replace(/"|\n|\r/g, "");
        const pwshPath = yield $d24e801d69813f05$var$io.which("pwsh", false);
        //To match the file overwrite behavior on nix systems, we use the overwrite = true flag for ExtractToDirectory
        //and the -Force flag for Expand-Archive as a fallback
        if (pwshPath) {
            //attempt to use pwsh with ExtractToDirectory, if this fails attempt Expand-Archive
            const pwshCommand = [
                `$ErrorActionPreference = 'Stop' ;`,
                `try { Add-Type -AssemblyName System.IO.Compression.ZipFile } catch { } ;`,
                `try { [System.IO.Compression.ZipFile]::ExtractToDirectory('${escapedFile}', '${escapedDest}', $true) }`,
                `catch { if (($_.Exception.GetType().FullName -eq 'System.Management.Automation.MethodException') -or ($_.Exception.GetType().FullName -eq 'System.Management.Automation.RuntimeException') ){ Expand-Archive -LiteralPath '${escapedFile}' -DestinationPath '${escapedDest}' -Force } else { throw $_ } } ;`
            ].join(" ");
            const args = [
                "-NoLogo",
                "-NoProfile",
                "-NonInteractive",
                "-ExecutionPolicy",
                "Unrestricted",
                "-Command",
                pwshCommand
            ];
            $d24e801d69813f05$var$core.debug(`Using pwsh at path: ${pwshPath}`);
            yield $jEF4C.exec(`"${pwshPath}"`, args);
        } else {
            const powershellCommand = [
                `$ErrorActionPreference = 'Stop' ;`,
                `try { Add-Type -AssemblyName System.IO.Compression.FileSystem } catch { } ;`,
                `if ((Get-Command -Name Expand-Archive -Module Microsoft.PowerShell.Archive -ErrorAction Ignore)) { Expand-Archive -LiteralPath '${escapedFile}' -DestinationPath '${escapedDest}' -Force }`,
                `else {[System.IO.Compression.ZipFile]::ExtractToDirectory('${escapedFile}', '${escapedDest}', $true) }`
            ].join(" ");
            const args1 = [
                "-NoLogo",
                "-Sta",
                "-NoProfile",
                "-NonInteractive",
                "-ExecutionPolicy",
                "Unrestricted",
                "-Command",
                powershellCommand
            ];
            const powershellPath = yield $d24e801d69813f05$var$io.which("powershell", true);
            $d24e801d69813f05$var$core.debug(`Using powershell at path: ${powershellPath}`);
            yield $jEF4C.exec(`"${powershellPath}"`, args1);
        }
    });
}
function $d24e801d69813f05$var$extractZipNix(file, dest) {
    return $d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
        const unzipPath = yield $d24e801d69813f05$var$io.which("unzip", true);
        const args = [
            file
        ];
        if (!$d24e801d69813f05$var$core.isDebug()) args.unshift("-q");
        args.unshift("-o"); //overwrite with -o, otherwise a prompt is shown which freezes the run
        yield $jEF4C.exec(`"${unzipPath}"`, args, {
            cwd: dest
        });
    });
}
/**
 * Caches a directory and installs it into the tool cacheDir
 *
 * @param sourceDir    the directory to cache into tools
 * @param tool          tool name
 * @param version       version of the tool.  semver format
 * @param arch          architecture of the tool.  Optional.  Defaults to machine architecture
 */ function $d24e801d69813f05$var$cacheDir(sourceDir, tool, version, arch) {
    return $d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
        version = $d24e801d69813f05$var$semver.clean(version) || version;
        arch = arch || $d24e801d69813f05$var$os.arch();
        $d24e801d69813f05$var$core.debug(`Caching tool ${tool} ${version} ${arch}`);
        $d24e801d69813f05$var$core.debug(`source dir: ${sourceDir}`);
        if (!$d24e801d69813f05$var$fs.statSync(sourceDir).isDirectory()) throw new Error("sourceDir is not a directory");
        // Create the tool dir
        const destPath = yield $d24e801d69813f05$var$_createToolPath(tool, version, arch);
        // copy each child item. do not move. move can fail on Windows
        // due to anti-virus software having an open handle on a file.
        for (const itemName of $d24e801d69813f05$var$fs.readdirSync(sourceDir)){
            const s = $d24e801d69813f05$var$path.join(sourceDir, itemName);
            yield $d24e801d69813f05$var$io.cp(s, destPath, {
                recursive: true
            });
        }
        // write .complete
        $d24e801d69813f05$var$_completeToolPath(tool, version, arch);
        return destPath;
    });
}
$d24e801d69813f05$exports.cacheDir = $d24e801d69813f05$var$cacheDir;
/**
 * Caches a downloaded file (GUID) and installs it
 * into the tool cache with a given targetName
 *
 * @param sourceFile    the file to cache into tools.  Typically a result of downloadTool which is a guid.
 * @param targetFile    the name of the file name in the tools directory
 * @param tool          tool name
 * @param version       version of the tool.  semver format
 * @param arch          architecture of the tool.  Optional.  Defaults to machine architecture
 */ function $d24e801d69813f05$var$cacheFile(sourceFile, targetFile, tool, version, arch) {
    return $d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
        version = $d24e801d69813f05$var$semver.clean(version) || version;
        arch = arch || $d24e801d69813f05$var$os.arch();
        $d24e801d69813f05$var$core.debug(`Caching tool ${tool} ${version} ${arch}`);
        $d24e801d69813f05$var$core.debug(`source file: ${sourceFile}`);
        if (!$d24e801d69813f05$var$fs.statSync(sourceFile).isFile()) throw new Error("sourceFile is not a file");
        // create the tool dir
        const destFolder = yield $d24e801d69813f05$var$_createToolPath(tool, version, arch);
        // copy instead of move. move can fail on Windows due to
        // anti-virus software having an open handle on a file.
        const destPath = $d24e801d69813f05$var$path.join(destFolder, targetFile);
        $d24e801d69813f05$var$core.debug(`destination file ${destPath}`);
        yield $d24e801d69813f05$var$io.cp(sourceFile, destPath);
        // write .complete
        $d24e801d69813f05$var$_completeToolPath(tool, version, arch);
        return destFolder;
    });
}
$d24e801d69813f05$exports.cacheFile = $d24e801d69813f05$var$cacheFile;
/**
 * Finds the path to a tool version in the local installed tool cache
 *
 * @param toolName      name of the tool
 * @param versionSpec   version of the tool
 * @param arch          optional arch.  defaults to arch of computer
 */ function $d24e801d69813f05$var$find(toolName, versionSpec, arch) {
    if (!toolName) throw new Error("toolName parameter is required");
    if (!versionSpec) throw new Error("versionSpec parameter is required");
    arch = arch || $d24e801d69813f05$var$os.arch();
    // attempt to resolve an explicit version
    if (!$d24e801d69813f05$var$isExplicitVersion(versionSpec)) {
        const localVersions = $d24e801d69813f05$var$findAllVersions(toolName, arch);
        const match = $d24e801d69813f05$var$evaluateVersions(localVersions, versionSpec);
        versionSpec = match;
    }
    // check for the explicit version in the cache
    let toolPath = "";
    if (versionSpec) {
        versionSpec = $d24e801d69813f05$var$semver.clean(versionSpec) || "";
        const cachePath = $d24e801d69813f05$var$path.join($d24e801d69813f05$var$_getCacheDirectory(), toolName, versionSpec, arch);
        $d24e801d69813f05$var$core.debug(`checking cache: ${cachePath}`);
        if ($d24e801d69813f05$var$fs.existsSync(cachePath) && $d24e801d69813f05$var$fs.existsSync(`${cachePath}.complete`)) {
            $d24e801d69813f05$var$core.debug(`Found tool in cache ${toolName} ${versionSpec} ${arch}`);
            toolPath = cachePath;
        } else $d24e801d69813f05$var$core.debug("not found");
    }
    return toolPath;
}
$d24e801d69813f05$exports.find = $d24e801d69813f05$var$find;
/**
 * Finds the paths to all versions of a tool that are installed in the local tool cache
 *
 * @param toolName  name of the tool
 * @param arch      optional arch.  defaults to arch of computer
 */ function $d24e801d69813f05$var$findAllVersions(toolName, arch) {
    const versions = [];
    arch = arch || $d24e801d69813f05$var$os.arch();
    const toolPath = $d24e801d69813f05$var$path.join($d24e801d69813f05$var$_getCacheDirectory(), toolName);
    if ($d24e801d69813f05$var$fs.existsSync(toolPath)) {
        const children = $d24e801d69813f05$var$fs.readdirSync(toolPath);
        for (const child of children)if ($d24e801d69813f05$var$isExplicitVersion(child)) {
            const fullPath = $d24e801d69813f05$var$path.join(toolPath, child, arch || "");
            if ($d24e801d69813f05$var$fs.existsSync(fullPath) && $d24e801d69813f05$var$fs.existsSync(`${fullPath}.complete`)) versions.push(child);
        }
    }
    return versions;
}
$d24e801d69813f05$exports.findAllVersions = $d24e801d69813f05$var$findAllVersions;
function $d24e801d69813f05$var$getManifestFromRepo(owner, repo, auth, branch = "master") {
    return $d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
        let releases = [];
        const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}`;
        const http = new $d24e801d69813f05$var$httpm.HttpClient("tool-cache");
        const headers = {};
        if (auth) {
            $d24e801d69813f05$var$core.debug("set auth");
            headers.authorization = auth;
        }
        const response = yield http.getJson(treeUrl, headers);
        if (!response.result) return releases;
        let manifestUrl = "";
        for (const item of response.result.tree)if (item.path === "versions-manifest.json") {
            manifestUrl = item.url;
            break;
        }
        headers["accept"] = "application/vnd.github.VERSION.raw";
        let versionsRaw = yield (yield http.get(manifestUrl, headers)).readBody();
        if (versionsRaw) {
            // shouldn't be needed but protects against invalid json saved with BOM
            versionsRaw = versionsRaw.replace(/^\uFEFF/, "");
            try {
                releases = JSON.parse(versionsRaw);
            } catch (_a) {
                $d24e801d69813f05$var$core.debug("Invalid json");
            }
        }
        return releases;
    });
}
$d24e801d69813f05$exports.getManifestFromRepo = $d24e801d69813f05$var$getManifestFromRepo;
function $d24e801d69813f05$var$findFromManifest(versionSpec, stable, manifest, archFilter = $d24e801d69813f05$var$os.arch()) {
    return $d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
        // wrap the internal impl
        const match = yield $d24e801d69813f05$var$mm._findMatch(versionSpec, stable, manifest, archFilter);
        return match;
    });
}
$d24e801d69813f05$exports.findFromManifest = $d24e801d69813f05$var$findFromManifest;
function $d24e801d69813f05$var$_createExtractFolder(dest) {
    return $d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
        if (!dest) // create a temp dir
        dest = $d24e801d69813f05$var$path.join($d24e801d69813f05$var$_getTempDirectory(), $d24e801d69813f05$var$v4_1.default());
        yield $d24e801d69813f05$var$io.mkdirP(dest);
        return dest;
    });
}
function $d24e801d69813f05$var$_createToolPath(tool, version, arch) {
    return $d24e801d69813f05$var$__awaiter(this, void 0, void 0, function*() {
        const folderPath = $d24e801d69813f05$var$path.join($d24e801d69813f05$var$_getCacheDirectory(), tool, $d24e801d69813f05$var$semver.clean(version) || version, arch || "");
        $d24e801d69813f05$var$core.debug(`destination ${folderPath}`);
        const markerPath = `${folderPath}.complete`;
        yield $d24e801d69813f05$var$io.rmRF(folderPath);
        yield $d24e801d69813f05$var$io.rmRF(markerPath);
        yield $d24e801d69813f05$var$io.mkdirP(folderPath);
        return folderPath;
    });
}
function $d24e801d69813f05$var$_completeToolPath(tool, version, arch) {
    const folderPath = $d24e801d69813f05$var$path.join($d24e801d69813f05$var$_getCacheDirectory(), tool, $d24e801d69813f05$var$semver.clean(version) || version, arch || "");
    const markerPath = `${folderPath}.complete`;
    $d24e801d69813f05$var$fs.writeFileSync(markerPath, "");
    $d24e801d69813f05$var$core.debug("finished caching tool");
}
/**
 * Check if version string is explicit
 *
 * @param versionSpec      version string to check
 */ function $d24e801d69813f05$var$isExplicitVersion(versionSpec) {
    const c = $d24e801d69813f05$var$semver.clean(versionSpec) || "";
    $d24e801d69813f05$var$core.debug(`isExplicit: ${c}`);
    const valid = $d24e801d69813f05$var$semver.valid(c) != null;
    $d24e801d69813f05$var$core.debug(`explicit? ${valid}`);
    return valid;
}
$d24e801d69813f05$exports.isExplicitVersion = $d24e801d69813f05$var$isExplicitVersion;
/**
 * Get the highest satisfiying semantic version in `versions` which satisfies `versionSpec`
 *
 * @param versions        array of versions to evaluate
 * @param versionSpec     semantic version spec to satisfy
 */ function $d24e801d69813f05$var$evaluateVersions(versions, versionSpec) {
    let version = "";
    $d24e801d69813f05$var$core.debug(`evaluating ${versions.length} versions`);
    versions = versions.sort((a, b)=>{
        if ($d24e801d69813f05$var$semver.gt(a, b)) return 1;
        return -1;
    });
    for(let i = versions.length - 1; i >= 0; i--){
        const potential = versions[i];
        const satisfied = $d24e801d69813f05$var$semver.satisfies(potential, versionSpec);
        if (satisfied) {
            version = potential;
            break;
        }
    }
    if (version) $d24e801d69813f05$var$core.debug(`matched: ${version}`);
    else $d24e801d69813f05$var$core.debug("match not found");
    return version;
}
$d24e801d69813f05$exports.evaluateVersions = $d24e801d69813f05$var$evaluateVersions;
/**
 * Gets RUNNER_TOOL_CACHE
 */ function $d24e801d69813f05$var$_getCacheDirectory() {
    const cacheDirectory = process.env["RUNNER_TOOL_CACHE"] || "";
    $dQzAa$assert.ok(cacheDirectory, "Expected RUNNER_TOOL_CACHE to be defined");
    return cacheDirectory;
}
/**
 * Gets RUNNER_TEMP
 */ function $d24e801d69813f05$var$_getTempDirectory() {
    const tempDirectory = process.env["RUNNER_TEMP"] || "";
    $dQzAa$assert.ok(tempDirectory, "Expected RUNNER_TEMP to be defined");
    return tempDirectory;
}
/**
 * Gets a global variable
 */ function $d24e801d69813f05$var$_getGlobal(key, defaultValue) {
    /* eslint-disable @typescript-eslint/no-explicit-any */ const value = $parcel$global[key];
    /* eslint-enable @typescript-eslint/no-explicit-any */ return value !== undefined ? value : defaultValue;
}
/**
 * Returns an array of unique values.
 * @param values Values to make unique.
 */ function $d24e801d69813f05$var$_unique(values) {
    return Array.from(new Set(values));
}


let $137dddd6529ba159$var$sevenZip;
async function $137dddd6529ba159$export$eecfe186811d4a20(file, dest) {
    await (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports)))(await $137dddd6529ba159$var$getSevenZip(), [
        "x",
        file,
        `-o${dest}`,
        "-y"
    ], {
        stdio: "inherit"
    });
    (0, $562bc96627c27994$export$f9a3d10eb7c735af)(dest);
    return dest;
}
/// install 7z if needed
async function $137dddd6529ba159$var$getSevenZip() {
    if ($137dddd6529ba159$var$sevenZip === undefined) {
        if ((0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("7z", {
            nothrow: true
        }) === null) await (0, $93a1c1326d2a1d42$export$5fc39629e14c8173)("", "", process.arch);
        // eslint-disable-next-line require-atomic-updates
        $137dddd6529ba159$var$sevenZip = "7z";
    }
    return $137dddd6529ba159$var$sevenZip;
}
function $137dddd6529ba159$export$7949938b2681a4f0(file, dest) {
    return $137dddd6529ba159$export$eecfe186811d4a20(file, dest);
}
function $137dddd6529ba159$export$6411c5cbab21135b(file, dest) {
    return $137dddd6529ba159$export$eecfe186811d4a20(file, dest);
}
async function $137dddd6529ba159$export$2ab07ac150064014(file, dest, flags = [
    "--strip-components=0"
]) {
    try {
        await (0, $9oxKF.mkdirP)(dest);
    } catch  {
    // ignore
    }
    // TODO windows fails to create symlinks
    // https://github.com/heroku/heroku-slugs/issues/3
    try {
        await (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports)))("tar", [
            "xf",
            file,
            "-C",
            dest,
            ...flags
        ], {
            stdio: "inherit"
        });
    } catch (e) {
        if (process.platform === "win32" && e.message.includes("Can't create '\\\\?\\C:")) (0, $8pybT.warning)(`Failed to extract symlink ${file} to ${dest}. Ignoring this symlink.`);
    }
    (0, $562bc96627c27994$export$f9a3d10eb7c735af)(dest);
    return dest;
}




var $9Ei2d = parcelRequire("9Ei2d");


var $7w88d = parcelRequire("7w88d");



var $5Knzt = parcelRequire("5Knzt");






let $bdad3e96f106dc26$var$didInit = false;
async function $bdad3e96f106dc26$export$334f77c9844c21f6(name, version, getPackageInfo, setupDir, arch) {
    (0, $9Ei2d.info)(`Installing ${name} ${version} ${arch} via direct downloading`);
    var _RUNNER_TEMP;
    process.env.RUNNER_TEMP = (_RUNNER_TEMP = process.env.RUNNER_TEMP) !== null && _RUNNER_TEMP !== void 0 ? _RUNNER_TEMP : (0, $dQzAa$os.tmpdir)();
    var _RUNNER_TOOL_CACHE;
    process.env.RUNNER_TOOL_CACHE = (_RUNNER_TOOL_CACHE = process.env.RUNNER_TOOL_CACHE) !== null && _RUNNER_TOOL_CACHE !== void 0 ? _RUNNER_TOOL_CACHE : (0, $7w88d.join)((0, $dQzAa$os.tmpdir)(), "setup-cpp", "hostedtoolcache");
    const { url: url , binRelativeDir: binRelativeDir , binFileName: binFileName , extractedFolderName: extractedFolderName , extractFunction: extractFunction  } = await getPackageInfo(version, process.platform, arch);
    // Restore from cache (if found).
    if ((0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() === "github-actions") try {
        const dir = (0, $d24e801d69813f05$exports.find)(name, version);
        if (dir) {
            const installDir = (0, $7w88d.join)(dir, extractedFolderName);
            const binDir = (0, $7w88d.join)(installDir, binRelativeDir);
            if ((0, $dQzAa$fs.existsSync)(binDir) && (0, $dQzAa$fs.existsSync)((0, $7w88d.join)(binDir, binFileName))) {
                (0, $9Ei2d.info)(`${name} ${version} was found in the cache at ${binDir}.`);
                await (0, $b6119f751060b0b2$export$4c25481b843feb0b)(binDir);
                return {
                    installDir: installDir,
                    binDir: binDir
                };
            }
        }
    } catch  {
    // fails on a local machine?
    }
    const installDir1 = (0, $7w88d.join)(setupDir, extractedFolderName);
    const binDir1 = (0, $7w88d.join)(installDir1, binRelativeDir);
    const binFile = (0, $7w88d.join)(binDir1, binFileName);
    // download ane extract the package into the installation directory.
    if (!(0, $dQzAa$fs.existsSync)(binDir1) || !(0, $dQzAa$fs.existsSync)(binFile)) {
        (0, $9Ei2d.info)(`Download and extract ${name} ${version}`);
        if (!$bdad3e96f106dc26$var$didInit) {
            if (process.platform === "linux") {
                // extraction dependencies
                if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) {
                    (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("unzip");
                    (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("tar");
                    (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("xz");
                } else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) {
                    (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("unzip");
                    (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("tar");
                    (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("xz");
                } else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) {
                    await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("unzip");
                    await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("tar");
                    await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("xz-utils");
                }
            }
            // eslint-disable-next-line require-atomic-updates
            $bdad3e96f106dc26$var$didInit = true;
        }
        try {
            const downloaded = await (0, $d24e801d69813f05$exports.downloadTool)(url);
            await (extractFunction === null || extractFunction === void 0 ? void 0 : extractFunction(downloaded, setupDir));
        // if (typeof extractedBinDir === "string") {
        //   binDir = extractedBinDir
        //   installDir = extractedBinDir
        // }
        } catch (err) {
            throw new Error(`Failed to download ${name} ${version} ${arch} from ${url}: ${err}`);
        }
    }
    // Adding the bin dir to the path
    /** The directory which the tool is installed to */ (0, $9Ei2d.info)(`Add ${binDir1} to PATH`);
    await (0, $b6119f751060b0b2$export$4c25481b843feb0b)(binDir1);
    // check if inside Github Actions. If so, cache the installation
    if ((0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() === "github-actions" && typeof process.env.RUNNER_TOOL_CACHE === "string") await (0, $d24e801d69813f05$exports.cacheDir)(setupDir, name, version);
    return {
        installDir: installDir1,
        binDir: binDir1
    };
}


/** Get the platform name task uses in their download links */ function $63d25992e4249ecd$var$getTaskPlatform(platform) {
    switch(platform){
        case "win32":
            return "windows";
        default:
            return platform;
    }
}
/** Get the arch name task uses in their download links */ function $63d25992e4249ecd$var$getTaskArch(arch) {
    switch(arch){
        case "x64":
            return "amd64";
        case "ia32":
        case "x86":
        case "i386":
        case "x32":
            return "386";
        default:
            return arch;
    }
}
/** Get the platform data for task */ function $63d25992e4249ecd$var$getTaskPackageInfo(version, platform, arch) {
    const taskPlatform = $63d25992e4249ecd$var$getTaskPlatform(platform);
    const taskArch = $63d25992e4249ecd$var$getTaskArch(arch);
    const isZip = platform === "win32";
    const extension = isZip ? "zip" : "tar.gz";
    return {
        binRelativeDir: "",
        binFileName: (0, $7w88d.addExeExt)("task"),
        extractedFolderName: "",
        extractFunction: isZip ? (0, $137dddd6529ba159$export$6411c5cbab21135b) : (0, $137dddd6529ba159$export$2ab07ac150064014),
        url: `https://github.com/go-task/task/releases/download/v${version}/task_${taskPlatform}_${taskArch}.${extension}`
    };
}
function $63d25992e4249ecd$export$4456b3a3d3540077(version, setupDir, arch) {
    return (0, $bdad3e96f106dc26$export$334f77c9844c21f6)("task", version, $63d25992e4249ecd$var$getTaskPackageInfo, setupDir, arch);
}





var $lP7aG = parcelRequire("lP7aG");

var $efeiw = parcelRequire("efeiw");


var $7w88d = parcelRequire("7w88d");

/** Get the platform data for cmake */ function $e3253d3a23a82b9d$var$getCmakePackageInfo(version, platform, arch) {
    var ref;
    const semVersion = (ref = (0, (/*@__PURE__*/$parcel$interopDefault($efeiw)))(version)) !== null && ref !== void 0 ? ref : version;
    switch(platform){
        case "win32":
            {
                const isOld = (0, (/*@__PURE__*/$parcel$interopDefault($lP7aG)))(semVersion, "v3.19.6");
                let osArchStr;
                if ([
                    "ia32",
                    "x86",
                    "i386",
                    "x32"
                ].includes(arch)) osArchStr = isOld ? "win32-x86" : "windows-i386";
                else osArchStr = isOld ? "win64-x64" : "windows-x86_64";
                const folderName = `cmake-${version}-${osArchStr}`;
                return {
                    binRelativeDir: "bin/",
                    binFileName: (0, $7w88d.addExeExt)("cmake"),
                    extractedFolderName: folderName,
                    extractFunction: (0, $137dddd6529ba159$export$6411c5cbab21135b),
                    url: `https://github.com/Kitware/CMake/releases/download/v${version}/${folderName}.zip`
                };
            }
        case "darwin":
            {
                const isOld1 = (0, (/*@__PURE__*/$parcel$interopDefault($lP7aG)))(semVersion, "v3.19.1");
                const osArchStr1 = isOld1 ? "Darwin-x86_64" : "macos-universal";
                const folderName1 = `cmake-${version}-${osArchStr1}`;
                return {
                    binRelativeDir: "CMake.app/Contents/bin/",
                    binFileName: (0, $7w88d.addExeExt)("cmake"),
                    extractedFolderName: folderName1,
                    extractFunction: (0, $d24e801d69813f05$exports.extractTar),
                    url: `https://github.com/Kitware/CMake/releases/download/v${version}/${folderName1}.tar.gz`
                };
            }
        case "linux":
            {
                const isOld2 = (0, (/*@__PURE__*/$parcel$interopDefault($lP7aG)))(semVersion, "v3.19.8");
                let osArchStr2;
                if ([
                    "aarch64"
                ].includes(arch)) osArchStr2 = isOld2 ? "Linux-aarch64" : "linux-aarch64";
                else osArchStr2 = isOld2 ? "Linux-x86_64" : "linux-x86_64";
                const folderName2 = `cmake-${version}-${osArchStr2}`;
                return {
                    binRelativeDir: "bin/",
                    binFileName: (0, $7w88d.addExeExt)("cmake"),
                    extractedFolderName: folderName2,
                    extractFunction: (0, $d24e801d69813f05$exports.extractTar),
                    url: `https://github.com/Kitware/CMake/releases/download/v${version}/${folderName2}.tar.gz`
                };
            }
        default:
            throw new Error(`Unsupported platform '${platform}'`);
    }
}
function $e3253d3a23a82b9d$export$c28663a621f418ce(version, setupDir, arch) {
    return (0, $bdad3e96f106dc26$export$334f77c9844c21f6)("cmake", version, $e3253d3a23a82b9d$var$getCmakePackageInfo, setupDir, arch);
}



var $jEF4C = parcelRequire("jEF4C");



var $9Ei2d = parcelRequire("9Ei2d");







var $5Knzt = parcelRequire("5Knzt");

var $8pybT = parcelRequire("8pybT");



var $7w88d = parcelRequire("7w88d");




async function $3bac595962fc10ac$export$2b0b68e9df3d4a02(version, setupDir, arch) {
    if ((0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() !== "github-actions") // TODO parse version
    return $3bac595962fc10ac$export$33cd96f062979ce0(version, setupDir, arch);
    try {
        (0, $8pybT.info)("Installing python in GitHub Actions");
        const { setupActionsPython: setupActionsPython  } = await (parcelRequire("eMCrb"));
        return setupActionsPython(version, setupDir, arch);
    } catch (err) {
        (0, $8pybT.warning)(err.toString());
        return $3bac595962fc10ac$export$33cd96f062979ce0(version, setupDir, arch);
    }
}
async function $3bac595962fc10ac$export$33cd96f062979ce0(version, setupDir, // eslint-disable-next-line @typescript-eslint/no-unused-vars
_arch) {
    switch(process.platform){
        case "win32":
            {
                if (setupDir) await (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("python3", version, [
                    `--params=/InstallDir:${setupDir}`
                ]);
                else await (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("python3", version);
                var ref, ref1;
                // Adding the bin dir to the path
                const pythonBinPath = (ref1 = (ref = (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("python3.exe", {
                    nothrow: true
                })) !== null && ref !== void 0 ? ref : (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("python.exe", {
                    nothrow: true
                })) !== null && ref1 !== void 0 ? ref1 : (0, $7w88d.join)(setupDir, "python.exe");
                const pythonSetupDir = (0, $7w88d.dirname)(pythonBinPath);
                /** The directory which the tool is installed to */ await $3bac595962fc10ac$var$activateWinPython(pythonSetupDir);
                return {
                    installDir: pythonSetupDir,
                    binDir: pythonSetupDir
                };
            }
        case "darwin":
            return (0, $6ea0ef9d1727031f$export$ce5d13d8a85cb784)("python3", version);
        case "linux":
            {
                let installInfo;
                if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) {
                    installInfo = (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("python", version);
                    (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("python-pip");
                } else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) {
                    installInfo = (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("python3", version);
                    (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("python3-pip");
                } else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) {
                    installInfo = await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("python3", version);
                    await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("python3-pip");
                } else throw new Error(`Unsupported linux distributions`);
                return installInfo;
            }
        default:
            throw new Error(`Unsupported platform`);
    }
}
async function $3bac595962fc10ac$var$activateWinPython(binDir) {
    (0, $8pybT.info)(`Add ${binDir} to PATH`);
    await (0, $b6119f751060b0b2$export$4c25481b843feb0b)(binDir);
}




function $71d03251c22cd794$var$isStatusOK(result) {
    return result.statusCode !== void 0 && result.statusCode >= 200 && result.statusCode <= 399;
}
function $71d03251c22cd794$var$requestWorks(url, method) {
    return new Promise((resolve)=>{
        try {
            const req = (0, $dQzAa$https.request)(url, {
                method: method
            }, (result)=>{
                resolve($71d03251c22cd794$var$isStatusOK(result));
            });
            req.on("error", (_error)=>{
                resolve(false);
            });
            req.end();
        } catch  {
            resolve(false);
        }
    });
}
var $71d03251c22cd794$export$8092cb61b2731942 = (url)=>{
    if (typeof url !== "string") return false;
    const trimmedUrl = url.trim();
    if (trimmedUrl.includes(" ")) return false;
    try {
        new (0, $dQzAa$url.URL)(trimmedUrl);
        return true;
    } catch  {
        return false;
    }
};
// src/modules/isUrlOnline.ts
var $71d03251c22cd794$export$61e6a71eee2b02f9 = async (url)=>{
    const isUrl = $71d03251c22cd794$export$8092cb61b2731942(url);
    if (!isUrl) return false;
    let response = await $71d03251c22cd794$var$requestWorks(url, "HEAD");
    if (response) return true;
    response = await $71d03251c22cd794$var$requestWorks(url, "GET");
    return !!response;
};
// src/modules/prependHttp.ts
var $71d03251c22cd794$export$b9a79b9e9f921305 = ({ url: url , https: https = true  })=>{
    const trimmedUrl = url.trim();
    if (/^\.*\/|^(?!localhost)\w+:/u.test(trimmedUrl)) return url;
    return trimmedUrl.replace(/^(?!(?:\w+:)?\/\/)/u, https ? "https://" : "http://");
};



var $7i3IQ = parcelRequire("7i3IQ");

var $efeiw = parcelRequire("efeiw");

var $9tUGm = parcelRequire("9tUGm");

var $jEF4C = parcelRequire("jEF4C");

var $8pybT = parcelRequire("8pybT");
function $1bb2629e42d1884b$export$deb1064c8260c54c(versions, semversion) {
    return Array.from(versions).filter((v)=>/^\d+\.\d+\.\d+$/.test(v) && v.startsWith(semversion)).sort().reverse();
}
function $1bb2629e42d1884b$export$cbd9528a83fbffa1(specific) {
    const versions = new Set(specific);
    for (const version of specific){
        versions.add(/^\d+/.exec(version)[0]);
        versions.add(/^\d+\.\d+/.exec(version)[0]);
    }
    return versions;
}
async function $1bb2629e42d1884b$export$4e4d3581f69a6d71(versions, platform, version, getUrl) {
    // specific ubuntu version
    if (platform === "linux" && version.includes("ubuntu")) {
        const url = await getUrl(platform, version);
        // eslint-disable-next-line no-await-in-loop
        if (url !== null && await (0, $71d03251c22cd794$export$61e6a71eee2b02f9)(url)) return [
            version,
            url
        ];
    }
    if (!versions.has(version)) throw new Error(`Unsupported target! (platform='${platform}', version='${version}')`);
    for (const specificVersion of $1bb2629e42d1884b$export$deb1064c8260c54c(versions, version)){
        // eslint-disable-next-line no-await-in-loop
        const url1 = await getUrl(platform, specificVersion);
        // eslint-disable-next-line no-await-in-loop
        if (url1 !== null && await (0, $71d03251c22cd794$export$61e6a71eee2b02f9)(url1)) return [
            specificVersion,
            url1
        ];
    }
    throw new Error(`Unsupported target! (platform='${platform}', version='${version}')`);
}
const $1bb2629e42d1884b$export$d7ab5e2d33b06cd5 = /v?(\d\S*)/;
async function $1bb2629e42d1884b$export$5b54ecc7386538f(file, versionRegex = $1bb2629e42d1884b$export$d7ab5e2d33b06cd5) {
    try {
        var ref;
        const execout = await (0, $jEF4C.getExecOutput)(file, [
            "--version"
        ]);
        const version_output = execout.stdout || execout.stderr || "";
        const version = (ref = version_output.trim().match(versionRegex)) === null || ref === void 0 ? void 0 : ref[1];
        return version;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}
async function $1bb2629e42d1884b$export$d1f0d32b896ba08(givenFile, targetVersion, versionRegex = $1bb2629e42d1884b$export$d7ab5e2d33b06cd5) {
    const givenVersion = await $1bb2629e42d1884b$export$5b54ecc7386538f(givenFile, versionRegex);
    if (typeof givenVersion === "string" && typeof targetVersion === "string" && givenVersion !== "" && targetVersion !== "") return (0, (/*@__PURE__*/$parcel$interopDefault($7i3IQ)))(givenVersion, targetVersion) !== -1;
    else // assume given version is old
    return false;
}
function $1bb2629e42d1884b$export$afd7401db249098f(version) {
    if ((0, (/*@__PURE__*/$parcel$interopDefault($9tUGm)))(version) === null) // version coercion
    try {
        // find the semver version of an integer
        const coercedVersion = (0, (/*@__PURE__*/$parcel$interopDefault($efeiw)))(version);
        if (coercedVersion !== null) {
            (0, $8pybT.info)(`Coerced version '${version}' to '${coercedVersion}'`);
            return coercedVersion.version;
        }
    } catch (err) {
    // handled below
    }
    return version;
}
function $1bb2629e42d1884b$export$b19007c0050a2fcc(version) {
    return parseInt(version.replace(/^v/, ""), 10);
}
function $1bb2629e42d1884b$export$6863a97504984656(version) {
    if (!version.match(/^v/)) return `v${version}`;
    return version;
}



var $7w88d = parcelRequire("7w88d");

// passing "" to a tool installed by a package manager (apt, brew, choco) will result in the default version of that package manager.
// the directly downloaded tools require a given version ("" doesn't work).
const $80aa8bff5dc42325$var$DefaultVersions = {
    llvm: "13.0.0",
    clangtidy: "13.0.0",
    clangformat: "13.0.0",
    ninja: "1.11.0",
    cmake: "3.23.2",
    gcovr: "5.1",
    conan: "1.50.0",
    meson: "0.63.0",
    kcov: "40",
    task: "3.14.0",
    doxygen: (0, $94a574e06b6f997e$export$d415ddb6702ec3a2)() ? "1.9.3-1" : "1.9.4",
    gcc: "11"
};
/// If an ubuntu versions is not in this map:
// - the newer ubuntu versions use the first entry (e.g. v20),
// - the older ones use ""
const $80aa8bff5dc42325$var$DefaultUbuntuVersion = {
    llvm: {
        22: "13.0.0-ubuntu-20.04",
        20: "13.0.0-ubuntu-20.04",
        18: "13.0.1-ubuntu-18.04",
        16: "13.0.0-ubuntu-16.04",
        14: "13.0.0-ubuntu-16.04"
    },
    clangtidy: {
        22: "13.0.0-ubuntu-20.04",
        20: "13.0.0-ubuntu-20.04",
        18: "13.0.1-ubuntu-18.04",
        16: "13.0.0-ubuntu-16.04",
        14: "13.0.0-ubuntu-16.04"
    },
    clangformat: {
        22: "13.0.0-ubuntu-20.04",
        20: "13.0.0-ubuntu-20.04",
        18: "13.0.1-ubuntu-18.04",
        16: "13.0.0-ubuntu-16.04",
        14: "13.0.0-ubuntu-16.04"
    },
    gcovr: {
        20: "5.1",
        18: "5.0"
    },
    meson: {
        20: "0.63.0",
        18: "0.61.4"
    },
    nala: {
        22: "",
        21: "legacy",
        20: "legacy",
        18: "legacy",
        16: "legacy",
        14: "legacy"
    },
    kcov: {
        22: "40",
        20: "40-binary",
        18: "40",
        16: "40",
        14: "40"
    }
};
function $80aa8bff5dc42325$export$c506eb22e615ba4a(name, version, osVersion = null) {
    if ($80aa8bff5dc42325$var$useDefault(version, name)) {
        // choose the default linux version based on ubuntu version
        if (process.platform === "linux" && osVersion !== null && name in $80aa8bff5dc42325$var$DefaultUbuntuVersion) {
            const osVersionMaj = osVersion[0];
            const newest = parseInt(Object.keys($80aa8bff5dc42325$var$DefaultUbuntuVersion[name])[0], 10) // newest version with the default
            ;
            if (osVersionMaj >= newest) return $80aa8bff5dc42325$var$DefaultUbuntuVersion[name][osVersionMaj];
            else return "";
        }
        // anything else
        return $80aa8bff5dc42325$var$DefaultVersions[name];
    } else return version !== null && version !== void 0 ? version : "";
}
function $80aa8bff5dc42325$var$useDefault(version, name) {
    return version === "true" || version === undefined && name in $80aa8bff5dc42325$var$DefaultVersions;
}
function $80aa8bff5dc42325$export$dd13a1e418f5a5fe(opts, tools) {
    for(let i = 0; i < tools.length; i++){
        // tools excluding i_tool
        const otherTools = tools.slice(0, i).concat(tools.slice(i + 1));
        const tool = tools[i];
        if (!$80aa8bff5dc42325$var$useDefault(opts[tool], tool)) for(let i_other = 0; i_other < otherTools.length; i_other++){
            const otherTool = otherTools[i_other];
            const useDefaultOtherTool = $80aa8bff5dc42325$var$useDefault(opts[otherTool], otherTools[i_other]);
            if (useDefaultOtherTool) // use the same version if the other tool was requested with the default
            opts[otherTool] = opts[tool];
            else if (opts[tool] !== opts[otherTools[i_other]]) // error if different from the other given versions
            return false;
        }
    }
    return true;
}








let $a722200a3d1dbb53$var$python;
let $a722200a3d1dbb53$var$binDir;
let $a722200a3d1dbb53$var$tried = false;
async function $a722200a3d1dbb53$export$4020cb77ffa3ffac(name, version) {
    (0, $9Ei2d.info)(`Installing ${name} ${version !== null && version !== void 0 ? version : ""} via pip`);
    // setup python and pip if needed
    if ($a722200a3d1dbb53$var$python === undefined) {
        if ((0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("python3", {
            nothrow: true
        }) !== null) $a722200a3d1dbb53$var$python = "python3";
        else if ((0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("python", {
            nothrow: true
        }) !== null && await (0, $1bb2629e42d1884b$export$d1f0d32b896ba08)("python", "3.0.0")) $a722200a3d1dbb53$var$python = "python";
        else {
            (0, $9Ei2d.info)("python3 was not found. Installing python");
            await (0, $3bac595962fc10ac$export$2b0b68e9df3d4a02)((0, $80aa8bff5dc42325$export$c506eb22e615ba4a)("python", undefined), "", process.arch);
            // try again
            if ($a722200a3d1dbb53$var$tried) throw new Error("Failed to install python");
            $a722200a3d1dbb53$var$tried = true;
            return $a722200a3d1dbb53$export$4020cb77ffa3ffac(name, version);
        }
        if (process.platform === "win32") // downgrade pip on Windows
        // https://github.com/pypa/pip/issues/10875#issuecomment-1030293005
        (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports))).sync($a722200a3d1dbb53$var$python, [
            "-m",
            "pip",
            "install",
            "-U",
            "pip==21.3.1"
        ], {
            stdio: "inherit"
        });
        else if (process.platform === "linux") {
            // ensure that pip is installed on Linux (happens when python is found but pip not installed)
            if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("python-pip");
            else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("python3-pip");
            else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("python3-pip");
        }
        // install wheel (required for Conan, Meson, etc.)
        (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports))).sync($a722200a3d1dbb53$var$python, [
            "-m",
            "pip",
            "install",
            "-U",
            "wheel"
        ], {
            stdio: "inherit"
        });
    }
    (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports))).sync($a722200a3d1dbb53$var$python, [
        "-m",
        "pip",
        "install",
        version !== undefined && version !== "" ? `${name}==${version}` : name
    ], {
        stdio: "inherit"
    });
    if ($a722200a3d1dbb53$var$binDir === undefined) {
        if (process.platform === "linux") $a722200a3d1dbb53$var$binDir = "/home/runner/.local/bin/";
        else if (process.platform === "darwin") $a722200a3d1dbb53$var$binDir = "/usr/local/bin/";
        else // windows or others
        try {
            $a722200a3d1dbb53$var$binDir = (0, $7w88d.join)((await (0, $jEF4C.getExecOutput)(`${$a722200a3d1dbb53$var$python} -c "import sys;print(sys.base_exec_prefix);"`)).stdout.trim(), "Scripts");
        } catch  {
            $a722200a3d1dbb53$var$binDir = (0, $7w88d.join)((await (0, $jEF4C.getExecOutput)(`${$a722200a3d1dbb53$var$python} -c "import sys;print(sys.base_exec_prefix);"`)).stdout.trim(), "Scripts");
        }
        (0, $9Ei2d.info)(`${$a722200a3d1dbb53$var$binDir} to PATH`);
        await (0, $b6119f751060b0b2$export$4c25481b843feb0b)($a722200a3d1dbb53$var$binDir);
    }
    return {
        binDir: $a722200a3d1dbb53$var$binDir
    };
}


async function $cb5b629190692a08$export$249d0c7d779d362f(version, _setupDir, _arch) {
    await (0, $a722200a3d1dbb53$export$4020cb77ffa3ffac)("setuptools", "");
    return (0, $a722200a3d1dbb53$export$4020cb77ffa3ffac)("conan", version);
}











async function $82c9a79adb779844$export$13d77464c548b5d3(version, _setupDir, _arch) {
    switch(process.platform){
        case "win32":
            {
                await (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("cppcheck", version);
                const binDir = await $82c9a79adb779844$var$activateWinCppcheck();
                return {
                    binDir: binDir
                };
            }
        case "darwin":
            return (0, $6ea0ef9d1727031f$export$ce5d13d8a85cb784)("cppcheck", version);
        case "linux":
            if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) return (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("cppcheck", version);
            else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) return (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("ccache", version);
            else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) return (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("cppcheck", version);
            throw new Error(`Unsupported linux distribution`);
        default:
            throw new Error(`Unsupported platform`);
    }
}
async function $82c9a79adb779844$var$activateWinCppcheck() {
    const binDir = "C:/Program Files/Cppcheck";
    await (0, $b6119f751060b0b2$export$4c25481b843feb0b)(binDir);
    return binDir;
}









var $7w88d = parcelRequire("7w88d");


var $8pybT = parcelRequire("8pybT");









async function $04d20f8c616da297$export$b885bd977caaafb9(version, _setupDir, _arch) {
    switch(process.platform){
        case "win32":
            await (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("graphviz", version);
            return $04d20f8c616da297$var$activateGraphviz();
        case "darwin":
            return (0, $6ea0ef9d1727031f$export$ce5d13d8a85cb784)("graphviz", version);
        case "linux":
            if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) return (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("graphviz", version);
            else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) return (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("graphviz", version);
            else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) return (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("graphviz", version);
            throw new Error(`Unsupported linux distribution`);
        default:
            throw new Error(`Unsupported platform`);
    }
}
async function $04d20f8c616da297$var$activateGraphviz() {
    switch(process.platform){
        case "win32":
            {
                const binDir = "C:/Program Files/Graphviz/bin";
                await (0, $b6119f751060b0b2$export$4c25481b843feb0b)(binDir);
                return {
                    binDir: binDir
                };
            }
        default:
            throw new Error(`Unsupported platform`);
    }
}








/** Get the platform data for cmake */ // eslint-disable-next-line @typescript-eslint/no-unused-vars
function $b415d29fd6206b87$var$getDoxygenPackageInfo(version, platform, _arch) {
    switch(platform){
        case "linux":
            {
                const folderName = `doxygen-${version}`;
                return {
                    binRelativeDir: "bin/",
                    binFileName: (0, $7w88d.addExeExt)("doxygen"),
                    extractedFolderName: folderName,
                    extractFunction: (0, $d24e801d69813f05$exports.extractTar),
                    url: `https://www.doxygen.nl/files/${folderName}.linux.bin.tar.gz`
                };
            }
        case "win32":
            {
                const folderName1 = `doxygen-${version}`;
                return {
                    binRelativeDir: "",
                    binFileName: (0, $7w88d.addExeExt)("doxygen"),
                    extractedFolderName: folderName1,
                    extractFunction: (0, $137dddd6529ba159$export$6411c5cbab21135b),
                    url: `https://www.doxygen.nl/files/${folderName1}.windows.x64.bin.zip`
                };
            }
        default:
            throw new Error(`Unsupported platform '${platform}'`);
    }
}
async function $b415d29fd6206b87$export$b6e6613a954051ee(version, setupDir, arch) {
    switch(process.platform){
        case "win32":
            {
                await (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("doxygen.install", version);
                const binDir = await $b415d29fd6206b87$var$activateWinDoxygen();
                const installationInfo = {
                    binDir: binDir
                };
                await (0, $04d20f8c616da297$export$b885bd977caaafb9)((0, $80aa8bff5dc42325$export$c506eb22e615ba4a)("graphviz", undefined), "", arch);
                return installationInfo;
            }
        case "darwin":
            {
                const installationInfo1 = (0, $6ea0ef9d1727031f$export$ce5d13d8a85cb784)("doxygen", undefined);
                await (0, $04d20f8c616da297$export$b885bd977caaafb9)((0, $80aa8bff5dc42325$export$c506eb22e615ba4a)("graphviz", undefined), "", arch);
                return installationInfo1;
            }
        case "linux":
            {
                let installationInfo2;
                if (version === "" || version === undefined || (0, $94a574e06b6f997e$export$d415ddb6702ec3a2)() || (0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) {
                    if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) installationInfo2 = (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("doxygen", version);
                    else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) return (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("doxygen", version);
                    else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) installationInfo2 = await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("doxygen", version);
                    else throw new Error(`Unsupported linux distributions`);
                } else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) try {
                    // doxygen on stable Ubuntu repositories is very old. So, we use get the binary from the website itself
                    installationInfo2 = await (0, $bdad3e96f106dc26$export$334f77c9844c21f6)("doxygen", version, $b415d29fd6206b87$var$getDoxygenPackageInfo, setupDir, arch);
                    await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("libclang-cpp9");
                } catch (err) {
                    (0, $8pybT.notice)(`Failed to download doxygen binary. ${err}. Falling back to apt-get.`);
                    installationInfo2 = await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("doxygen", undefined);
                }
                else throw new Error(`Unsupported linux distributions`);
                await (0, $04d20f8c616da297$export$b885bd977caaafb9)((0, $80aa8bff5dc42325$export$c506eb22e615ba4a)("graphviz", undefined), "", arch);
                return installationInfo2;
            }
        default:
            throw new Error(`Unsupported platform`);
    }
}
async function $b415d29fd6206b87$var$activateWinDoxygen() {
    switch(process.platform){
        case "win32":
            for (const binDir of [
                "C:/ProgramData/chocolatey/bin",
                "C:/Program Files/doxygen/bin",
                "C:/Program Files (x86)/doxygen", 
            ])if ((0, $dQzAa$fs.existsSync)((0, $7w88d.join)(binDir, "doxygen.exe"))) {
                // eslint-disable-next-line no-await-in-loop
                await (0, $b6119f751060b0b2$export$4c25481b843feb0b)(binDir);
                return binDir;
            }
            throw new Error("Failed to find doxygen binary");
        default:
            throw new Error(`Unsupported platform`);
    }
}



function $c731b0790f9ffaf1$export$b98d69f362caf61f(version, _setupDir, _arch) {
    return (0, $a722200a3d1dbb53$export$4020cb77ffa3ffac)("gcovr", version);
}



var $7w88d = parcelRequire("7w88d");


var $lP7aG = parcelRequire("lP7aG");

var $eFoxk = parcelRequire("eFoxk");





var $jEF4C = parcelRequire("jEF4C");


var $8pybT = parcelRequire("8pybT");
async function $1cb8cda092375d91$export$28f5fd35e3005b7a() {
    if (process.platform === "darwin") try {
        const xcrun = await (0, $jEF4C.getExecOutput)("xcrun --sdk macosx --show-sdk-path");
        const sdkroot = xcrun.stdout || xcrun.stderr;
        if (sdkroot) await (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("SDKROOT", sdkroot.trim());
        else (0, $8pybT.error)(`SDKROOT not set`);
    } catch (e) {
        (0, $8pybT.error)(e);
    }
}




var $9Ei2d = parcelRequire("9Ei2d");


var $8pybT = parcelRequire("8pybT");


var $5Knzt = parcelRequire("5Knzt");







var $eFoxk = parcelRequire("eFoxk");

var $efeiw = parcelRequire("efeiw");


var $7w88d = parcelRequire("7w88d");

var $8pybT = parcelRequire("8pybT");

var $5Knzt = parcelRequire("5Knzt");







var $55ac5311cf6f954d$var$$parcel$__dirname = $dQzAa$path.resolve(__dirname, "../src/gcc");
// https://github.com/brechtsanders/winlibs_mingw/releases
const $55ac5311cf6f954d$var$GccToMingwInfo = {
    "12": {
        releaseName: "12.1.0-14.0.4-10.0.0-ucrt-r2",
        fileSuffix: "12.1.0-mingw-w64ucrt-10.0.0-r2"
    },
    "12.1.0-ucrt": {
        releaseName: "12.1.0-14.0.4-10.0.0-ucrt-r2",
        fileSuffix: "12.1.0-mingw-w64ucrt-10.0.0-r2"
    },
    "12.1.0-msvcrt": {
        releaseName: "12.1.0-14.0.6-10.0.0-msvcrt-r3",
        fileSuffix: "12.1.0-llvm-14.0.6-mingw-w64msvcrt-10.0.0-r3"
    },
    "11": {
        releaseName: "11.3.0-14.0.3-10.0.0-ucrt-r3",
        fileSuffix: "11.3.0-mingw-w64ucrt-10.0.0-r3"
    },
    "11.3.0-ucrt": {
        releaseName: "11.3.0-14.0.3-10.0.0-ucrt-r3",
        fileSuffix: "11.3.0-mingw-w64ucrt-10.0.0-r3"
    },
    "11.3.0-msvcrt": {
        releaseName: "11.3.0-14.0.3-10.0.0-msvcrt-r3",
        fileSuffix: "11.3.0-mingw-w64msvcrt-10.0.0-r3"
    },
    "11.2.0-ucrt": {
        releaseName: "11.2.0-9.0.0-ucrt-r5",
        fileSuffix: "11.2.0-mingw-w64ucrt-9.0.0-r5"
    },
    "11.2.0-msvcrt": {
        releaseName: "11.2.0-9.0.0-msvcrt-r5",
        fileSuffix: "11.2.0-mingw-w64msvcrt-9.0.0-r5"
    },
    "10": {
        releaseName: "10.3.0-12.0.0-9.0.0-r2",
        fileSuffix: "10.3.0-llvm-12.0.0-mingw-w64-9.0.0-r2"
    },
    "10.3.0": {
        releaseName: "10.3.0-12.0.0-9.0.0-r2",
        fileSuffix: "10.3.0-llvm-12.0.0-mingw-w64-9.0.0-r2"
    },
    "10.2.0": {
        releaseName: "10.2.0-7.0.0-r4",
        fileSuffix: "10.2.0-llvm-10.0.1-mingw-w64-7.0.0-r4"
    },
    "9": {
        releaseName: "9.4.0-9.0.0-r1",
        fileSuffix: "9.4.0-mingw-w64-9.0.0-r1"
    },
    "9.4.0": {
        releaseName: "9.4.0-9.0.0-r1",
        fileSuffix: "9.4.0-mingw-w64-9.0.0-r1"
    }
};
function $55ac5311cf6f954d$var$getGccPackageInfo(version, platform, arch) {
    switch(platform){
        case "win32":
            {
                const mingwInfo = $55ac5311cf6f954d$var$GccToMingwInfo[version];
                if (mingwInfo === undefined) throw new Error(`mingw version ${version} is not supported`);
                const mingwArch = arch === "ia32" ? "i686" : "x86_64";
                const exceptionModel = "seh" // SEH is native windows exception model https://github.com/brechtsanders/winlibs_mingw/issues/4#issuecomment-599296483
                ;
                return {
                    binRelativeDir: "bin/",
                    binFileName: (0, $7w88d.addExeExt)("g++"),
                    extractedFolderName: "mingw64",
                    extractFunction: (0, $137dddd6529ba159$export$eecfe186811d4a20),
                    url: `https://github.com/brechtsanders/winlibs_mingw/releases/download/${mingwInfo.releaseName}/winlibs-${mingwArch}-posix-${exceptionModel}-gcc-${mingwInfo.fileSuffix}.7z`
                };
            }
        default:
            throw new Error(`Unsupported platform '${platform}'`);
    }
}
async function $55ac5311cf6f954d$export$405fab3de79b77b(version, setupDir, arch) {
    let installationInfo;
    switch(process.platform){
        case "win32":
            if (arch === "arm" || arch === "arm64") await (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("gcc-arm-embedded", version);
            try {
                installationInfo = await (0, $bdad3e96f106dc26$export$334f77c9844c21f6)("g++", version, $55ac5311cf6f954d$var$getGccPackageInfo, setupDir, arch);
            } catch (err) {
                (0, $8pybT.info)(`Failed to download g++ binary. ${err}. Falling back to chocolatey.`);
                installationInfo = await $55ac5311cf6f954d$var$setupChocoMingw(version, arch);
            }
            break;
        case "darwin":
            installationInfo = (0, $6ea0ef9d1727031f$export$ce5d13d8a85cb784)("gcc", version);
            break;
        case "linux":
            if (arch === "x64") {
                if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) installationInfo = (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("gcc", version);
                else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) {
                    installationInfo = (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("gcc", version);
                    (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("gcc-c++", version);
                    (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("libstdc++-devel", undefined);
                } else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) {
                    await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("gcc", version, [
                        "ppa:ubuntu-toolchain-r/test"
                    ]);
                    installationInfo = await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("g++", version, []);
                }
            } else {
                (0, $8pybT.info)(`Install g++-multilib because gcc for ${arch} was requested`);
                if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("gcc-multilib", version);
                else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("gcc-multilib", version, [
                    "ppa:ubuntu-toolchain-r/test"
                ]);
            }
            break;
        // TODO support bare-metal (need to support passing it as the input)
        // TODO support abi
        // case "none": {
        //   if (arch === "arm" || arch === "arm64") {
        //     return setupAptPack("gcc-arm-none-eabi", version, [
        //       "ppa:ubuntu-toolchain-r/test",
        //     ])
        //   } else {
        //     throw new Error(`Unsupported platform for ${arch}`)
        //   }
        // }
        default:
            throw new Error(`Unsupported platform for ${arch}`);
    }
    if (installationInfo !== undefined) {
        await $55ac5311cf6f954d$var$activateGcc(version, installationInfo.binDir);
        return installationInfo;
    }
    return undefined;
}
async function $55ac5311cf6f954d$var$setupChocoMingw(version, arch) {
    await (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("mingw", version);
    let binDir;
    var _ChocolateyInstall, _ChocolateyInstall1;
    if (arch === "x64" && (0, $dQzAa$fs.existsSync)("C:/tools/mingw64/bin")) {
        binDir = "C:/tools/mingw64/bin";
        await (0, $b6119f751060b0b2$export$4c25481b843feb0b)(binDir);
    } else if (arch === "ia32" && (0, $dQzAa$fs.existsSync)("C:/tools/mingw32/bin")) {
        binDir = "C:/tools/mingw32/bin";
        await (0, $b6119f751060b0b2$export$4c25481b843feb0b)(binDir);
    } else if ((0, $dQzAa$fs.existsSync)(`${(_ChocolateyInstall = process.env.ChocolateyInstall) !== null && _ChocolateyInstall !== void 0 ? _ChocolateyInstall : "C:/ProgramData/chocolatey"}/bin/g++.exe`)) binDir = `${(_ChocolateyInstall1 = process.env.ChocolateyInstall) !== null && _ChocolateyInstall1 !== void 0 ? _ChocolateyInstall1 : "C:/ProgramData/chocolatey"}/bin`;
    if (binDir !== undefined) return {
        binDir: binDir
    };
    return undefined;
}
async function $55ac5311cf6f954d$var$activateGcc(version, binDir) {
    const promises = [];
    // Setup gcc as the compiler
    // TODO
    // const ld = process.env.LD_LIBRARY_PATH ?? ""
    // const dyld = process.env.DYLD_LIBRARY_PATH ?? ""
    // promises.push(
    //   addEnv("LD_LIBRARY_PATH", `${installDir}/lib${path.delimiter}${ld}`),
    //   addEnv("DYLD_LIBRARY_PATH", `${installDir}/lib${path.delimiter}${dyld}`),
    //   addEnv("CPATH", `${installDir}/lib/gcc/${majorVersion}/include`),
    //   addEnv("LDFLAGS", `-L${installDir}/lib`),
    //   addEnv("CPPFLAGS", `-I${installDir}/include`)
    // )
    if (process.platform === "win32") promises.push((0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CC", (0, $7w88d.addExeExt)(`${binDir}/gcc`)), (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CXX", (0, $7w88d.addExeExt)(`${binDir}/g++`)));
    else {
        var ref;
        const majorVersion = (0, (/*@__PURE__*/$parcel$interopDefault($eFoxk)))((ref = (0, (/*@__PURE__*/$parcel$interopDefault($efeiw)))(version)) !== null && ref !== void 0 ? ref : version);
        if (majorVersion >= 5) {
            promises.push((0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CC", `${binDir}/gcc-${majorVersion}`), (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CXX", `${binDir}/g++-${majorVersion}`));
            if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) {
                (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("cc", `${binDir}/gcc-${majorVersion}`);
                (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("cxx", `${binDir}/g++-${majorVersion}`);
                (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("gcc", `${binDir}/gcc-${majorVersion}`);
                (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("g++", `${binDir}/g++-${majorVersion}`);
            }
        } else {
            promises.push((0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CC", `${binDir}/gcc-${version}`), (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CXX", `${binDir}/g++-${version}`));
            if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) {
                (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("cc", `${binDir}/gcc-${version}`);
                (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("cxx", `${binDir}/g++-${version}`);
                (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("gcc", `${binDir}/gcc-${version}`);
                (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("g++", `${binDir}/g++-${version}`);
            }
        }
    }
    promises.push((0, $1cb8cda092375d91$export$28f5fd35e3005b7a)());
    if ((0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() === "github-actions") $55ac5311cf6f954d$var$addGccLoggingMatcher();
    await Promise.all(promises);
}
function $55ac5311cf6f954d$var$addGccLoggingMatcher() {
    const matcherPath = (0, $7w88d.join)($55ac5311cf6f954d$var$$parcel$__dirname, "gcc_matcher.json");
    if (!(0, $dQzAa$fs.existsSync)(matcherPath)) return (0, $8pybT.warning)("the gcc_matcher.json file does not exist in the same folder as setup_cpp.js");
    (0, $8pybT.info)(`::add-matcher::${matcherPath}`);
}






var $0cd7a11563d5dbb2$var$$parcel$__dirname = $dQzAa$path.resolve(__dirname, "../src/llvm");
const $0cd7a11563d5dbb2$export$aa5307f1aca77413 = (0, $1bb2629e42d1884b$export$cbd9528a83fbffa1)([
    "3.5.0",
    "3.5.1",
    "3.5.2",
    "3.6.0",
    "3.6.1",
    "3.6.2",
    "3.7.0",
    "3.7.1",
    "3.8.0",
    "3.8.1",
    "3.9.0",
    "3.9.1",
    "4.0.0",
    "4.0.1",
    "5.0.0",
    "5.0.1",
    "5.0.2",
    "6.0.0",
    "6.0.1",
    "7.0.0",
    "7.0.1",
    "7.1.0",
    "8.0.0",
    "8.0.1",
    "9.0.0",
    "9.0.1",
    "10.0.0",
    "10.0.1",
    "11.0.0",
    "11.0.1",
    "11.1.0",
    "12.0.0",
    "12.0.1",
    "13.0.0",
    "13.0.1",
    "14.0.0",
    "14.0.1",
    "14.0.2",
    "14.0.3",
    "14.0.4",
    "14.0.5",
    "14.0.6", 
]);
//================================================
// URL
//================================================
/** Gets a LLVM download URL for GitHub. */ function $0cd7a11563d5dbb2$var$getGitHubUrl(version, prefix, suffix) {
    const file = `${prefix}${version}${suffix}`;
    return `https://github.com/llvm/llvm-project/releases/download/llvmorg-${version}/${file}`;
}
/** Gets a LLVM download URL for https://releases.llvm.org. */ function $0cd7a11563d5dbb2$var$getReleaseUrl(version, prefix, suffix) {
    const file = `${prefix}${version}${suffix}`;
    return `https://releases.llvm.org/${version}/${file}`;
}
/** The LLVM versions that were never released for the Darwin platform. */ const $0cd7a11563d5dbb2$var$DARWIN_MISSING = new Set([
    "3.5.1",
    "3.6.1",
    "3.6.2",
    "3.7.1",
    "3.8.1",
    "3.9.1",
    "6.0.1",
    "7.0.1",
    "7.1.0",
    "8.0.1",
    "11.0.1",
    "11.1.0",
    "12.0.1", 
]);
/** Gets an LLVM download URL for the Darwin platform. */ function $0cd7a11563d5dbb2$var$getDarwinUrl(version) {
    if ($0cd7a11563d5dbb2$var$DARWIN_MISSING.has(version)) return null;
    const darwin = version === "9.0.0" ? "-darwin-apple" : "-apple-darwin";
    const prefix = "clang+llvm-";
    const suffix = `-x86_64${darwin}.tar.xz`;
    if ((0, (/*@__PURE__*/$parcel$interopDefault($lP7aG)))(version, "9.0.1")) return $0cd7a11563d5dbb2$var$getReleaseUrl(version, prefix, suffix);
    else return $0cd7a11563d5dbb2$var$getGitHubUrl(version, prefix, suffix);
}
/**
 * The LLVM versions that should use the last RC version instead of the release version for the Linux (Ubuntu) platform.
 * This is useful when there were binaries released for the Linux (Ubuntu) platform for the last RC version but not for
 * the actual release version.
 */ const $0cd7a11563d5dbb2$var$UBUNTU_RC = new Map();
/**
 * The (latest) Ubuntu versions for each LLVM version.
 *
 * https://github.com/llvm/llvm-project/releases/tag/llvmorg-14.0.1 or https://releases.llvm.org/14.0.1
 */ // TODO change based on ubuntu version
const $0cd7a11563d5dbb2$var$UBUNTU_SUFFIX_MAP = {
    "3.5.0": "-ubuntu-14.04",
    "3.5.1": "",
    "3.5.2": "-ubuntu-14.04",
    "3.6.0": "-ubuntu-14.04",
    "3.6.1": "-ubuntu-14.04",
    "3.6.2": "-ubuntu-14.04",
    "3.7.0": "-ubuntu-14.04",
    "3.7.1": "-ubuntu-14.04",
    "3.8.0": "-ubuntu-16.04",
    "3.8.1": "-ubuntu-16.04",
    "3.9.0": "-ubuntu-16.04",
    "3.9.1": "-ubuntu-16.04",
    "4.0.0": "-ubuntu-16.04",
    "5.0.0": "-ubuntu16.04",
    "5.0.1": "-ubuntu-16.04",
    "5.0.2": "-ubuntu-16.04",
    "6.0.0": "-ubuntu-16.04",
    "6.0.1": "-ubuntu-16.04",
    "7.0.0": "-ubuntu-16.04",
    "7.0.1": "-ubuntu-18.04",
    "7.1.0": "-ubuntu-14.04",
    "8.0.0": "-ubuntu-18.04",
    "9.0.0": "-ubuntu-18.04",
    "9.0.1": "-ubuntu-16.04",
    "10.0.0": "-ubuntu-18.04",
    "10.0.1": "-ubuntu-16.04",
    "11.0.0": "-ubuntu-20.04",
    "11.0.1": "-ubuntu-16.04",
    "11.1.0": "-ubuntu-16.04",
    "12.0.0": "-ubuntu-20.04",
    "12.0.1": "-ubuntu-16.04",
    "13.0.0": "-ubuntu-20.04",
    "13.0.0-ubuntu-16.04": "-ubuntu-16.04",
    "13.0.0-ubuntu-20.04": "-ubuntu-20.04",
    "13.0.1": "-ubuntu-18.04",
    "13.0.1-ubuntu-18.04": "-ubuntu-18.04",
    "14.0.0": "-ubuntu-18.04"
};
/** The latest supported LLVM version for the Linux (Ubuntu) platform. */ const $0cd7a11563d5dbb2$var$MAX_UBUNTU = "14.0.0";
function $0cd7a11563d5dbb2$export$ae24f9682a44836b(versionGiven) {
    let version = versionGiven;
    const rc = $0cd7a11563d5dbb2$var$UBUNTU_RC.get(version);
    if (rc !== undefined) version = rc;
    let ubuntu;
    // ubuntu-version is specified
    if (version.includes("ubuntu")) {
        const givenUbuntuVersion = version.replace(/-ubuntu-.*/, "");
        if (!$0cd7a11563d5dbb2$export$aa5307f1aca77413.has(givenUbuntuVersion)) throw new Error(`Unsupported Ubuntu version: ${givenUbuntuVersion}`);
        ubuntu = version.replace(givenUbuntuVersion, "");
        version = (0, $1bb2629e42d1884b$export$deb1064c8260c54c)($0cd7a11563d5dbb2$export$aa5307f1aca77413, givenUbuntuVersion)[0];
    } else if (version !== "" && version in $0cd7a11563d5dbb2$var$UBUNTU_SUFFIX_MAP) ubuntu = $0cd7a11563d5dbb2$var$UBUNTU_SUFFIX_MAP[version];
    else {
        // default to the maximum version
        ubuntu = $0cd7a11563d5dbb2$var$UBUNTU_SUFFIX_MAP[$0cd7a11563d5dbb2$var$MAX_UBUNTU];
        (0, $8pybT.warning)(`Falling back to LLVM version ${$0cd7a11563d5dbb2$var$MAX_UBUNTU} ${ubuntu} for the Ubuntu.`);
    }
    const prefix = "clang+llvm-";
    const suffix = version === "5.0.0" ? `-linux-x86_64${ubuntu}.tar.xz` : `-x86_64-linux-gnu${ubuntu}.tar.xz`;
    if ((0, (/*@__PURE__*/$parcel$interopDefault($lP7aG)))(version, "9.0.1")) return $0cd7a11563d5dbb2$var$getReleaseUrl(version, prefix, suffix);
    else return $0cd7a11563d5dbb2$var$getGitHubUrl(version, prefix, suffix);
}
/** The LLVM versions that were never released for the Windows platform. */ const $0cd7a11563d5dbb2$var$WIN32_MISSING = new Set([
    "10.0.1"
]);
/** Gets an LLVM download URL for the Windows platform. */ async function $0cd7a11563d5dbb2$var$getWin32Url(version) {
    if ($0cd7a11563d5dbb2$var$WIN32_MISSING.has(version)) return null;
    const prefix = "LLVM-";
    const suffix = (0, (/*@__PURE__*/$parcel$interopDefault($lP7aG)))(version, "3.7.0") ? "-win32.exe" : "-win64.exe";
    const olderThan9_1 = (0, (/*@__PURE__*/$parcel$interopDefault($lP7aG)))(version, "9.0.1");
    let url;
    let fallback = false;
    if (olderThan9_1) {
        url = $0cd7a11563d5dbb2$var$getReleaseUrl(version, prefix, suffix);
        if (!await (0, $71d03251c22cd794$export$61e6a71eee2b02f9)(url)) fallback = true // fallback to github
        ;
    }
    if (fallback || !olderThan9_1) url = $0cd7a11563d5dbb2$var$getGitHubUrl(version, prefix, suffix);
    return url;
}
function $0cd7a11563d5dbb2$export$94df0e59ebebf4a7(platform, version) {
    switch(platform){
        case "darwin":
            return $0cd7a11563d5dbb2$var$getDarwinUrl(version);
        case "linux":
            return $0cd7a11563d5dbb2$export$ae24f9682a44836b(version);
        case "win32":
            return $0cd7a11563d5dbb2$var$getWin32Url(version);
        default:
            return null;
    }
}
//================================================
// Exports
//================================================
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function $0cd7a11563d5dbb2$var$getLLVMPackageInfo(version, platform, _arch) {
    const [specificVersion, url] = await (0, $1bb2629e42d1884b$export$4e4d3581f69a6d71)($0cd7a11563d5dbb2$export$aa5307f1aca77413, platform, version, $0cd7a11563d5dbb2$export$94df0e59ebebf4a7);
    (0, $9Ei2d.setOutput)("version", specificVersion);
    return {
        url: url,
        extractedFolderName: "",
        binRelativeDir: "bin",
        binFileName: (0, $7w88d.addExeExt)("clang"),
        extractFunction: platform === "win32" ? (0, $137dddd6529ba159$export$7949938b2681a4f0) : (file, dest)=>{
            return (0, $137dddd6529ba159$export$2ab07ac150064014)(file, dest, [
                "--strip-components=1"
            ]);
        }
    };
}
async function $0cd7a11563d5dbb2$export$3016de7ae9d14988(version, setupDir, arch) {
    const installationInfo = await $0cd7a11563d5dbb2$var$_setupLLVM(version, setupDir, arch);
    var _installDir;
    await $0cd7a11563d5dbb2$export$6238b5ebfd6640e7((_installDir = installationInfo.installDir) !== null && _installDir !== void 0 ? _installDir : setupDir, version);
    return installationInfo;
}
let $0cd7a11563d5dbb2$var$didInit = false;
async function $0cd7a11563d5dbb2$var$_setupLLVM(version, setupDir, arch) {
    const installationInfo = await (0, $bdad3e96f106dc26$export$334f77c9844c21f6)("llvm", version, $0cd7a11563d5dbb2$var$getLLVMPackageInfo, setupDir, arch);
    if (!$0cd7a11563d5dbb2$var$didInit) {
        if (process.platform === "linux") {
            // install llvm build dependencies
            await (0, $55ac5311cf6f954d$export$405fab3de79b77b)((0, $80aa8bff5dc42325$export$c506eb22e615ba4a)("gcc", undefined), "", arch) // using llvm requires ld, an up to date libstdc++, etc. So, install gcc first
            ;
            if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) ;
            else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("libtinfo-dev");
        }
        // eslint-disable-next-line require-atomic-updates
        $0cd7a11563d5dbb2$var$didInit = true;
    }
    return installationInfo;
}
async function $0cd7a11563d5dbb2$export$6238b5ebfd6640e7(directory, versionGiven) {
    const version = (0, $1bb2629e42d1884b$export$afd7401db249098f)(versionGiven);
    const lib = (0, $7w88d.join)(directory, "lib");
    var _LD_LIBRARY_PATH;
    const ld = (_LD_LIBRARY_PATH = process.env.LD_LIBRARY_PATH) !== null && _LD_LIBRARY_PATH !== void 0 ? _LD_LIBRARY_PATH : "";
    var _DYLD_LIBRARY_PATH;
    const dyld = (_DYLD_LIBRARY_PATH = process.env.DYLD_LIBRARY_PATH) !== null && _DYLD_LIBRARY_PATH !== void 0 ? _DYLD_LIBRARY_PATH : "";
    const promises = [
        // the output of this action
        (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("LLVM_PATH", directory),
        // Setup LLVM as the compiler
        (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("LD_LIBRARY_PATH", `${lib}${(0, $dQzAa$path.delimiter)}${ld}`),
        (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("DYLD_LIBRARY_PATH", `${lib}${(0, $dQzAa$path.delimiter)}${dyld}`),
        // compiler flags
        (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("LDFLAGS", `-L"${directory}/lib"`),
        (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CPPFLAGS", `-I"${directory}/include"`),
        // compiler paths
        (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CC", (0, $7w88d.addExeExt)(`${directory}/bin/clang`)),
        (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CXX", (0, $7w88d.addExeExt)(`${directory}/bin/clang++`)),
        (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("LIBRARY_PATH", `${directory}/lib`),
        // os sdks
        (0, $1cb8cda092375d91$export$28f5fd35e3005b7a)(), 
    ];
    // windows builds fail with llvm's CPATH
    if (process.platform !== "win32") {
        const llvmMajor = (0, (/*@__PURE__*/$parcel$interopDefault($eFoxk)))(version);
        if ((0, $dQzAa$fs.existsSync)(`${directory}/lib/clang/${version}/include`)) promises.push((0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CPATH", `${directory}/lib/clang/${version}/include`));
        else if ((0, $dQzAa$fs.existsSync)(`${directory}/lib/clang/${llvmMajor}/include`)) promises.push((0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CPATH", `${directory}/lib/clang/${llvmMajor}/include`));
    }
    if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) {
        (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("cc", `${directory}/bin/clang`);
        (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("cxx", `${directory}/bin/clang++`);
        (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("clang", `${directory}/bin/clang`);
        (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("clang++", `${directory}/bin/clang++`);
        (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("lld", `${directory}/bin/lld`);
        (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("ld.lld", `${directory}/bin/ld.lld`);
        (0, $7b92e9e7fd13b8fa$export$6fe6436bd9f53d02)("llvm-ar", `${directory}/bin/llvm-ar`);
    }
    if ((0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() === "github-actions") $0cd7a11563d5dbb2$var$addLLVMLoggingMatcher();
    await Promise.all(promises);
}
function $0cd7a11563d5dbb2$export$814ccfc953503728(version, setupDir, arch) {
    if ((0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() === "github-actions") $0cd7a11563d5dbb2$var$addLLVMLoggingMatcher();
    return $0cd7a11563d5dbb2$var$_setupLLVM(version, setupDir, arch);
}
function $0cd7a11563d5dbb2$var$addLLVMLoggingMatcher() {
    const matcherPath = (0, $7w88d.join)($0cd7a11563d5dbb2$var$$parcel$__dirname, "llvm_matcher.json");
    if (!(0, $dQzAa$fs.existsSync)(matcherPath)) return (0, $8pybT.warning)("the llvm_matcher.json file does not exist in the same folder as setup_cpp.js");
    (0, $8pybT.info)(`::add-matcher::${matcherPath}`);
}



function $ad6979a9b1cde0ee$export$f73905553f087748(version, _setupDir, _arch) {
    return (0, $a722200a3d1dbb53$export$4020cb77ffa3ffac)("meson", version);
}




var $1e1cc73bc5a19671$export$3c7cae5a162b1458;
var $1e1cc73bc5a19671$export$704f0be24425353b;
var $1e1cc73bc5a19671$export$f49c12d2898d28cb;
var $1e1cc73bc5a19671$export$a6a3bfb882356813;
var $1e1cc73bc5a19671$export$443b8bb890f5027e;
var $bcbe497b8260881d$exports = {};
"use strict";
var $bcbe497b8260881d$var$__awaiter = $bcbe497b8260881d$exports && $bcbe497b8260881d$exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $bcbe497b8260881d$var$__importStar = $bcbe497b8260881d$exports && $bcbe497b8260881d$exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
};
Object.defineProperty($bcbe497b8260881d$exports, "__esModule", {
    value: true
});
var $095addb8fc121be1$exports = {};
"use strict";
var $095addb8fc121be1$var$__importStar = $095addb8fc121be1$exports && $095addb8fc121be1$exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
};
Object.defineProperty($095addb8fc121be1$exports, "__esModule", {
    value: true
});

const $095addb8fc121be1$var$os = $095addb8fc121be1$var$__importStar($dQzAa$os);
var $8fee4be21d008a27$exports = {};
"use strict";
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */ Object.defineProperty($8fee4be21d008a27$exports, "__esModule", {
    value: true
});
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */ function $8fee4be21d008a27$var$toCommandValue(input) {
    if (input === null || input === undefined) return "";
    else if (typeof input === "string" || input instanceof String) return input;
    return JSON.stringify(input);
}
$8fee4be21d008a27$exports.toCommandValue = $8fee4be21d008a27$var$toCommandValue;


/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */ function $095addb8fc121be1$var$issueCommand(command, properties, message) {
    const cmd = new $095addb8fc121be1$var$Command(command, properties, message);
    process.stdout.write(cmd.toString() + $095addb8fc121be1$var$os.EOL);
}
$095addb8fc121be1$exports.issueCommand = $095addb8fc121be1$var$issueCommand;
function $095addb8fc121be1$var$issue(name, message = "") {
    $095addb8fc121be1$var$issueCommand(name, {}, message);
}
$095addb8fc121be1$exports.issue = $095addb8fc121be1$var$issue;
const $095addb8fc121be1$var$CMD_STRING = "::";
class $095addb8fc121be1$var$Command {
    constructor(command, properties, message){
        if (!command) command = "missing.command";
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = $095addb8fc121be1$var$CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += " ";
            let first = true;
            for(const key in this.properties)if (this.properties.hasOwnProperty(key)) {
                const val = this.properties[key];
                if (val) {
                    if (first) first = false;
                    else cmdStr += ",";
                    cmdStr += `${key}=${$095addb8fc121be1$var$escapeProperty(val)}`;
                }
            }
        }
        cmdStr += `${$095addb8fc121be1$var$CMD_STRING}${$095addb8fc121be1$var$escapeData(this.message)}`;
        return cmdStr;
    }
}
function $095addb8fc121be1$var$escapeData(s) {
    return $8fee4be21d008a27$exports.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function $095addb8fc121be1$var$escapeProperty(s) {
    return $8fee4be21d008a27$exports.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
}


var $607b8073c34e0f58$exports = {};
"use strict";
// For internal use, subject to change.
var $607b8073c34e0f58$var$__importStar = $607b8073c34e0f58$exports && $607b8073c34e0f58$exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
};
Object.defineProperty($607b8073c34e0f58$exports, "__esModule", {
    value: true
});

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */ const $607b8073c34e0f58$var$fs = $607b8073c34e0f58$var$__importStar($dQzAa$fs);

const $607b8073c34e0f58$var$os = $607b8073c34e0f58$var$__importStar($dQzAa$os);

function $607b8073c34e0f58$var$issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) throw new Error(`Unable to find environment variable for file command ${command}`);
    if (!$607b8073c34e0f58$var$fs.existsSync(filePath)) throw new Error(`Missing file at path: ${filePath}`);
    $607b8073c34e0f58$var$fs.appendFileSync(filePath, `${$8fee4be21d008a27$exports.toCommandValue(message)}${$607b8073c34e0f58$var$os.EOL}`, {
        encoding: "utf8"
    });
}
$607b8073c34e0f58$exports.issueCommand = $607b8073c34e0f58$var$issueCommand;




const $bcbe497b8260881d$var$os = $bcbe497b8260881d$var$__importStar($dQzAa$os);

const $bcbe497b8260881d$var$path = $bcbe497b8260881d$var$__importStar($dQzAa$path);
/**
 * The code to exit an action
 */ var $bcbe497b8260881d$var$ExitCode;
(function(ExitCode) {
    /**
     * A code indicating that the action was successful
     */ ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */ ExitCode[ExitCode["Failure"] = 1] = "Failure";
})($bcbe497b8260881d$var$ExitCode = $bcbe497b8260881d$exports.ExitCode || ($bcbe497b8260881d$exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $bcbe497b8260881d$var$exportVariable(name, val) {
    const convertedVal = $8fee4be21d008a27$exports.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env["GITHUB_ENV"] || "";
    if (filePath) {
        const delimiter = "_GitHubActionsFileCommandDelimeter_";
        const commandValue = `${name}<<${delimiter}${$bcbe497b8260881d$var$os.EOL}${convertedVal}${$bcbe497b8260881d$var$os.EOL}${delimiter}`;
        $607b8073c34e0f58$exports.issueCommand("ENV", commandValue);
    } else $095addb8fc121be1$exports.issueCommand("set-env", {
        name: name
    }, convertedVal);
}
$bcbe497b8260881d$exports.exportVariable = $bcbe497b8260881d$var$exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */ function $bcbe497b8260881d$var$setSecret(secret) {
    $095addb8fc121be1$exports.issueCommand("add-mask", {}, secret);
}
$bcbe497b8260881d$exports.setSecret = $bcbe497b8260881d$var$setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */ function $bcbe497b8260881d$var$addPath(inputPath) {
    const filePath = process.env["GITHUB_PATH"] || "";
    if (filePath) $607b8073c34e0f58$exports.issueCommand("PATH", inputPath);
    else $095addb8fc121be1$exports.issueCommand("add-path", {}, inputPath);
    process.env["PATH"] = `${inputPath}${$bcbe497b8260881d$var$path.delimiter}${process.env["PATH"]}`;
}
$bcbe497b8260881d$exports.addPath = $bcbe497b8260881d$var$addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */ function $bcbe497b8260881d$var$getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
    if (options && options.required && !val) throw new Error(`Input required and not supplied: ${name}`);
    return val.trim();
}
$bcbe497b8260881d$exports.getInput = $bcbe497b8260881d$var$getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $bcbe497b8260881d$var$setOutput(name, value) {
    $095addb8fc121be1$exports.issueCommand("set-output", {
        name: name
    }, value);
}
$bcbe497b8260881d$exports.setOutput = $bcbe497b8260881d$var$setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */ function $bcbe497b8260881d$var$setCommandEcho(enabled) {
    $095addb8fc121be1$exports.issue("echo", enabled ? "on" : "off");
}
$bcbe497b8260881d$exports.setCommandEcho = $bcbe497b8260881d$var$setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */ function $bcbe497b8260881d$var$setFailed(message) {
    process.exitCode = $bcbe497b8260881d$var$ExitCode.Failure;
    $bcbe497b8260881d$var$error(message);
}
$bcbe497b8260881d$exports.setFailed = $bcbe497b8260881d$var$setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */ function $bcbe497b8260881d$var$isDebug() {
    return process.env["RUNNER_DEBUG"] === "1";
}
$bcbe497b8260881d$exports.isDebug = $bcbe497b8260881d$var$isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */ function $bcbe497b8260881d$var$debug(message) {
    $095addb8fc121be1$exports.issueCommand("debug", {}, message);
}
$bcbe497b8260881d$exports.debug = $bcbe497b8260881d$var$debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */ function $bcbe497b8260881d$var$error(message) {
    $095addb8fc121be1$exports.issue("error", message instanceof Error ? message.toString() : message);
}
$bcbe497b8260881d$exports.error = $bcbe497b8260881d$var$error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */ function $bcbe497b8260881d$var$warning(message) {
    $095addb8fc121be1$exports.issue("warning", message instanceof Error ? message.toString() : message);
}
$bcbe497b8260881d$exports.warning = $bcbe497b8260881d$var$warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */ function $bcbe497b8260881d$var$info(message) {
    process.stdout.write(message + $bcbe497b8260881d$var$os.EOL);
}
$bcbe497b8260881d$exports.info = $bcbe497b8260881d$var$info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */ function $bcbe497b8260881d$var$startGroup(name) {
    $095addb8fc121be1$exports.issue("group", name);
}
$bcbe497b8260881d$exports.startGroup = $bcbe497b8260881d$var$startGroup;
/**
 * End an output group.
 */ function $bcbe497b8260881d$var$endGroup() {
    $095addb8fc121be1$exports.issue("endgroup");
}
$bcbe497b8260881d$exports.endGroup = $bcbe497b8260881d$var$endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */ function $bcbe497b8260881d$var$group(name, fn) {
    return $bcbe497b8260881d$var$__awaiter(this, void 0, void 0, function*() {
        $bcbe497b8260881d$var$startGroup(name);
        let result;
        try {
            result = yield fn();
        } finally{
            $bcbe497b8260881d$var$endGroup();
        }
        return result;
    });
}
$bcbe497b8260881d$exports.group = $bcbe497b8260881d$var$group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $bcbe497b8260881d$var$saveState(name, value) {
    $095addb8fc121be1$exports.issueCommand("save-state", {
        name: name
    }, value);
}
$bcbe497b8260881d$exports.saveState = $bcbe497b8260881d$var$saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */ function $bcbe497b8260881d$var$getState(name) {
    return process.env[`STATE_${name}`] || "";
}
$bcbe497b8260881d$exports.getState = $bcbe497b8260881d$var$getState;






const $1e1cc73bc5a19671$var$PROGRAM_FILES_X86 = $dQzAa$process.env["ProgramFiles(x86)"];
const $1e1cc73bc5a19671$var$PROGRAM_FILES = [
    $dQzAa$process.env["ProgramFiles(x86)"],
    $dQzAa$process.env["ProgramFiles"]
];
const $1e1cc73bc5a19671$var$EDITIONS = [
    "Enterprise",
    "Professional",
    "Community"
];
const $1e1cc73bc5a19671$var$YEARS = [
    "2022",
    "2019",
    "2017"
];
const $1e1cc73bc5a19671$var$VsYearVersion = {
    "2022": "17.0",
    "2019": "16.0",
    "2017": "15.0",
    "2015": "14.0",
    "2013": "12.0"
};
function $1e1cc73bc5a19671$var$vsversion_to_versionnumber(vsversion) {
    if (Object.values($1e1cc73bc5a19671$var$VsYearVersion).includes(vsversion)) return vsversion;
    else {
        if (vsversion in $1e1cc73bc5a19671$var$VsYearVersion) return $1e1cc73bc5a19671$var$VsYearVersion[vsversion];
    }
    return vsversion;
}
$1e1cc73bc5a19671$export$3c7cae5a162b1458 = $1e1cc73bc5a19671$var$vsversion_to_versionnumber;
function $1e1cc73bc5a19671$var$vsversion_to_year(vsversion) {
    if (Object.keys($1e1cc73bc5a19671$var$VsYearVersion).includes(vsversion)) return vsversion;
    else for (const [year, ver] of Object.entries($1e1cc73bc5a19671$var$VsYearVersion)){
        if (ver === vsversion) return year;
    }
    return vsversion;
}
$1e1cc73bc5a19671$export$704f0be24425353b = $1e1cc73bc5a19671$var$vsversion_to_year;
const $1e1cc73bc5a19671$var$VSWHERE_PATH = `${$1e1cc73bc5a19671$var$PROGRAM_FILES_X86}\\Microsoft Visual Studio\\Installer`;
function $1e1cc73bc5a19671$var$findWithVswhere(pattern, version_pattern) {
    try {
        let installationPath = $dQzAa$child_process.execSync(`vswhere -products * ${version_pattern} -prerelease -property installationPath`).toString().trim();
        return installationPath + "\\" + pattern;
    } catch (e) {
        $bcbe497b8260881d$exports.warning(`vswhere failed: ${e}`);
    }
    return null;
}
$1e1cc73bc5a19671$export$f49c12d2898d28cb = $1e1cc73bc5a19671$var$findWithVswhere;
function $1e1cc73bc5a19671$var$findVcvarsall(vsversion) {
    const vsversion_number = $1e1cc73bc5a19671$var$vsversion_to_versionnumber(vsversion);
    let version_pattern;
    if (vsversion_number) {
        const upper_bound = vsversion_number.split(".")[0] + ".9";
        version_pattern = `-version "${vsversion_number},${upper_bound}"`;
    } else version_pattern = "-latest";
    // If vswhere is available, ask it about the location of the latest Visual Studio.
    let path = $1e1cc73bc5a19671$var$findWithVswhere("VC\\Auxiliary\\Build\\vcvarsall.bat", version_pattern);
    if (path && $dQzAa$fs.existsSync(path)) {
        $bcbe497b8260881d$exports.info(`Found with vswhere: ${path}`);
        return path;
    }
    $bcbe497b8260881d$exports.info("Not found with vswhere");
    // If that does not work, try the standard installation locations,
    // starting with the latest and moving to the oldest.
    const years = vsversion ? [
        $1e1cc73bc5a19671$var$vsversion_to_year(vsversion)
    ] : $1e1cc73bc5a19671$var$YEARS;
    for (const prog_files of $1e1cc73bc5a19671$var$PROGRAM_FILES){
        for (const ver of years)for (const ed of $1e1cc73bc5a19671$var$EDITIONS){
            path = `${prog_files}\\Microsoft Visual Studio\\${ver}\\${ed}\\VC\\Auxiliary\\Build\\vcvarsall.bat`;
            $bcbe497b8260881d$exports.info(`Trying standard location: ${path}`);
            if ($dQzAa$fs.existsSync(path)) {
                $bcbe497b8260881d$exports.info(`Found standard location: ${path}`);
                return path;
            }
        }
    }
    $bcbe497b8260881d$exports.info("Not found in standard locations");
    // Special case for Visual Studio 2015 (and maybe earlier), try it out too.
    path = `${$1e1cc73bc5a19671$var$PROGRAM_FILES_X86}\\Microsoft Visual C++ Build Tools\\vcbuildtools.bat`;
    if ($dQzAa$fs.existsSync(path)) {
        $bcbe497b8260881d$exports.info(`Found VS 2015: ${path}`);
        return path;
    }
    $bcbe497b8260881d$exports.info(`Not found in VS 2015 location: ${path}`);
    throw new Error("Microsoft Visual Studio not found");
}
$1e1cc73bc5a19671$export$a6a3bfb882356813 = $1e1cc73bc5a19671$var$findVcvarsall;
function $1e1cc73bc5a19671$var$isPathVariable(name) {
    const pathLikeVariables = [
        "PATH",
        "INCLUDE",
        "LIB",
        "LIBPATH"
    ];
    return pathLikeVariables.indexOf(name.toUpperCase()) != -1;
}
function $1e1cc73bc5a19671$var$filterPathValue(path) {
    let paths = path.split(";");
    // Remove duplicates by keeping the first occurance and preserving order.
    // This keeps path shadowing working as intended.
    function unique(value, index, self) {
        return self.indexOf(value) === index;
    }
    return paths.filter(unique).join(";");
}
/** See https://github.com/ilammy/msvc-dev-cmd#inputs */ function $1e1cc73bc5a19671$var$setupMSVCDevCmd(arch, sdk, toolset, uwp, spectre, vsversion) {
    if ($dQzAa$process.platform != "win32") {
        $bcbe497b8260881d$exports.info("This is not a Windows virtual environment, bye!");
        return;
    }
    // Add standard location of "vswhere" to PATH, in case it's not there.
    $dQzAa$process.env.PATH += $dQzAa$path.delimiter + $1e1cc73bc5a19671$var$VSWHERE_PATH;
    // There are all sorts of way the architectures are called. In addition to
    // values supported by Microsoft Visual C++, recognize some common aliases.
    let arch_aliases = {
        "win32": "x86",
        "win64": "x64",
        "x86_64": "x64",
        "x86-64": "x64"
    };
    // Ignore case when matching as that's what humans expect.
    if (arch.toLowerCase() in arch_aliases) arch = arch_aliases[arch.toLowerCase()];
    // Due to the way Microsoft Visual C++ is configured, we have to resort to the following hack:
    // Call the configuration batch file and then output *all* the environment variables.
    var args = [
        arch
    ];
    if (uwp == "true") args.push("uwp");
    if (sdk) args.push(sdk);
    if (toolset) args.push(`-vcvars_ver=${toolset}`);
    if (spectre == "true") args.push("-vcvars_spectre_libs=spectre");
    const vcvars = `"${$1e1cc73bc5a19671$var$findVcvarsall(vsversion)}" ${args.join(" ")}`;
    $bcbe497b8260881d$exports.debug(`vcvars command-line: ${vcvars}`);
    const cmd_output_string = $dQzAa$child_process.execSync(`set && cls && ${vcvars} && cls && set`, {
        shell: "cmd"
    }).toString();
    const cmd_output_parts = cmd_output_string.split("\f");
    const old_environment = cmd_output_parts[0].split("\r\n");
    const vcvars_output = cmd_output_parts[1].split("\r\n");
    const new_environment = cmd_output_parts[2].split("\r\n");
    // If vsvars.bat is given an incorrect command line, it will print out
    // an error and *still* exit successfully. Parse out errors from output
    // which don't look like environment variables, and fail if appropriate.
    const error_messages = vcvars_output.filter((line)=>{
        if (line.match(/^\[ERROR.*\]/)) {
            // Don't print this particular line which will be confusing in output.
            if (!line.match(/Error in script usage. The correct usage is:$/)) return true;
        }
        return false;
    });
    if (error_messages.length > 0) throw new Error("invalid parameters\r\n" + error_messages.join("\r\n"));
    // Convert old environment lines into a dictionary for easier lookup.
    let old_env_vars = {};
    for (let string of old_environment){
        const [name, value] = string.split("=");
        old_env_vars[name] = value;
    }
    // Now look at the new environment and export everything that changed.
    // These are the variables set by vsvars.bat. Also export everything
    // that was not there during the first sweep: those are new variables.
    $bcbe497b8260881d$exports.startGroup("Environment variables");
    for (let string1 of new_environment){
        // vsvars.bat likes to print some fluff at the beginning.
        // Skip lines that don't look like environment variables.
        if (!string1.includes("=")) continue;
        let [name1, new_value] = string1.split("=");
        let old_value = old_env_vars[name1];
        // For new variables "old_value === undefined".
        if (new_value !== old_value) {
            $bcbe497b8260881d$exports.info(`Setting ${name1}`);
            // Special case for a bunch of PATH-like variables: vcvarsall.bat
            // just prepends its stuff without checking if its already there.
            // This makes repeated invocations of this action fail after some
            // point, when the environment variable overflows. Avoid that.
            if ($1e1cc73bc5a19671$var$isPathVariable(name1)) new_value = $1e1cc73bc5a19671$var$filterPathValue(new_value);
            $bcbe497b8260881d$exports.exportVariable(name1, new_value);
        }
    }
    $bcbe497b8260881d$exports.endGroup();
    $bcbe497b8260881d$exports.info(`Configured Developer Command Prompt`);
}
$1e1cc73bc5a19671$export$443b8bb890f5027e = $1e1cc73bc5a19671$var$setupMSVCDevCmd;




var $8pybT = parcelRequire("8pybT");
function $ca66f1e5d8c1b449$var$getArch(arch) {
    switch(arch){
        case "x32":
        case "32":
        case "ia32":
            return "x86";
        case "64":
            return "x64";
        default:
            return arch;
    }
}
async function $ca66f1e5d8c1b449$export$5dcf571c91fc8369(vsversion, VCTargetsPath, arch, toolset, sdk, uwp, spectre) {
    if (VCTargetsPath !== undefined && (0, $dQzAa$fs.existsSync)(VCTargetsPath)) {
        (0, $8pybT.info)(`Adding ${VCTargetsPath} to PATH`);
        await (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("VCTargetsPath", VCTargetsPath);
    }
    (0, $1e1cc73bc5a19671$export$443b8bb890f5027e)($ca66f1e5d8c1b449$var$getArch(arch), sdk, toolset, uwp, spectre, vsversion);
}




var $5Knzt = parcelRequire("5Knzt");

var $7w88d = parcelRequire("7w88d");


var $8pybT = parcelRequire("8pybT");

var $9f11671a8b4773d7$var$$parcel$__dirname = $dQzAa$path.resolve(__dirname, "../src/msvc");
async function $9f11671a8b4773d7$export$a91ef0362c1a7298(versionGiven, _setupDir, arch, sdk, uwp, spectre) {
    if (process.platform !== "win32") return;
    const version = (0, $1e1cc73bc5a19671$export$3c7cae5a162b1458)(versionGiven);
    // check if the given version is already installed
    (0, $8pybT.info)(`Checking if MSVC ${version} is already installed`);
    let installed = false;
    try {
        const vcvarsall_path = (0, $1e1cc73bc5a19671$export$a6a3bfb882356813)(version);
        installed = true;
        (0, $8pybT.info)(`Found the pre-installed version of MSVC at ${vcvarsall_path}`);
    } catch  {
    // not installed, try installing
    }
    let toolset;
    let VCTargetsPath;
    // https://github.com/aminya/setup-cpp/issues/1
    if (!installed) try {
        if (version === "14.0") {
            toolset = "14.0";
            await (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("visualcpp-build-tools", "14.0.25420.1", [
                "--ignore-dependencies"
            ]);
            VCTargetsPath = "C:/Program Files (x86)/MSBuild/Microsoft.Cpp/v4.0/v140";
        } else if (version === "15.0") {
            toolset = "14.16";
            await (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("visualstudio2017buildtools", "15.9.41.0", []);
            VCTargetsPath = "C:/Program Files (x86)/Microsoft Visual Studio/2017/BuildTools/VC/Tools/MSVC/14.16" // TODO verify path
            ;
        } else if (version === "16.0") {
            toolset = "14.29";
            await (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("visualstudio2019buildtools", "16.11.7.0", []);
            VCTargetsPath = "C:/Program Files (x86)/Microsoft Visual Studio/2019/BuildTools/VC/Tools/MSVC/14.29.30133";
        } else if (version === "17.0") {
            toolset = undefined;
            await (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("visualstudio2022buildtools", "117.0.5.0", []);
            VCTargetsPath = undefined;
        } else (0, $8pybT.error)(`The given MSVC versions ${versionGiven} is not supported yet.`);
    } catch (e) {
        (0, $8pybT.error)(e);
    }
    // run vcvarsall.bat environment variables
    await (0, $ca66f1e5d8c1b449$export$5dcf571c91fc8369)(version, VCTargetsPath, arch, toolset, sdk, uwp, spectre);
    if ((0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() === "github-actions") $9f11671a8b4773d7$var$addMSVCLoggingMatcher();
}
function $9f11671a8b4773d7$var$addMSVCLoggingMatcher() {
    const matcherPath = (0, $7w88d.join)($9f11671a8b4773d7$var$$parcel$__dirname, "msvc_matcher.json");
    if (!(0, $dQzAa$fs.existsSync)(matcherPath)) return (0, $8pybT.warning)("the msvc_matcher.json file does not exist in the same folder as setup_cpp.js");
    (0, $8pybT.info)(`::add-matcher::${matcherPath}`);
}



var $7w88d = parcelRequire("7w88d");


/** Get the platform name Ninja uses in their download links */ function $067c9a6cc55c023f$var$getNinjaPlatform(platform) {
    switch(platform){
        case "win32":
            return "win";
        case "darwin":
            return "mac";
        case "linux":
            return "linux";
        default:
            throw new Error(`Unsupported platform '${platform}'`);
    }
}
/** Get the platform data for ninja */ // eslint-disable-next-line @typescript-eslint/no-unused-vars
function $067c9a6cc55c023f$var$getNinjaPackageInfo(version, platform, _arch) {
    const ninjaPlatform = $067c9a6cc55c023f$var$getNinjaPlatform(platform);
    return {
        binRelativeDir: "",
        binFileName: (0, $7w88d.addExeExt)("ninja"),
        extractedFolderName: "",
        extractFunction: (0, $137dddd6529ba159$export$6411c5cbab21135b),
        url: `https://github.com/ninja-build/ninja/releases/download/v${version}/ninja-${ninjaPlatform}.zip`
    };
}
function $067c9a6cc55c023f$export$e6190f4bfe2ef71(version, setupDir, arch) {
    return (0, $bdad3e96f106dc26$export$334f77c9844c21f6)("ninja", version, $067c9a6cc55c023f$var$getNinjaPackageInfo, setupDir, arch);
}




async function $a7b96986c3792294$export$6aa28a97600a8ae3(version, _setupDir, _arch) {
    if (process.platform !== "win32") return;
    await (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("opencppcoverage", version);
    const binDir = await $a7b96986c3792294$var$activateOpencppcoverage();
    return {
        binDir: binDir
    };
}
async function $a7b96986c3792294$var$activateOpencppcoverage() {
    const binDir = "C:/Program Files/OpenCppCoverage";
    await (0, $b6119f751060b0b2$export$4c25481b843feb0b)(binDir);
    return binDir;
}



function $2538a59c4b88ef5a$var$toArr(any) {
    return any == null ? [] : Array.isArray(any) ? any : [
        any
    ];
}
function $2538a59c4b88ef5a$var$toVal(out, key, val, opts) {
    var x, old = out[key], nxt = !!~opts.string.indexOf(key) ? val == null || val === true ? "" : String(val) : typeof val === "boolean" ? val : !!~opts.boolean.indexOf(key) ? val === "false" ? false : val === "true" || (out._.push((x = +val, x * 0 === 0) ? x : val), !!val) : (x = +val, x * 0 === 0) ? x : val;
    out[key] = old == null ? nxt : Array.isArray(old) ? old.concat(nxt) : [
        old,
        nxt
    ];
}
function $2538a59c4b88ef5a$export$2e2bcd8739ae039(args, opts) {
    args = args || [];
    opts = opts || {};
    var k, arr, arg, name, val, out = {
        _: []
    };
    var i = 0, j = 0, idx = 0, len = args.length;
    const alibi = opts.alias !== void 0;
    const strict = opts.unknown !== void 0;
    const defaults = opts.default !== void 0;
    opts.alias = opts.alias || {};
    opts.string = $2538a59c4b88ef5a$var$toArr(opts.string);
    opts.boolean = $2538a59c4b88ef5a$var$toArr(opts.boolean);
    if (alibi) for(k in opts.alias){
        arr = opts.alias[k] = $2538a59c4b88ef5a$var$toArr(opts.alias[k]);
        for(i = 0; i < arr.length; i++)(opts.alias[arr[i]] = arr.concat(k)).splice(i, 1);
    }
    for(i = opts.boolean.length; i-- > 0;){
        arr = opts.alias[opts.boolean[i]] || [];
        for(j = arr.length; j-- > 0;)opts.boolean.push(arr[j]);
    }
    for(i = opts.string.length; i-- > 0;){
        arr = opts.alias[opts.string[i]] || [];
        for(j = arr.length; j-- > 0;)opts.string.push(arr[j]);
    }
    if (defaults) for(k in opts.default){
        name = typeof opts.default[k];
        arr = opts.alias[k] = opts.alias[k] || [];
        if (opts[name] !== void 0) {
            opts[name].push(k);
            for(i = 0; i < arr.length; i++)opts[name].push(arr[i]);
        }
    }
    const keys = strict ? Object.keys(opts.alias) : [];
    for(i = 0; i < len; i++){
        arg = args[i];
        if (arg === "--") {
            out._ = out._.concat(args.slice(++i));
            break;
        }
        for(j = 0; j < arg.length; j++){
            if (arg.charCodeAt(j) !== 45) break; // "-"
        }
        if (j === 0) out._.push(arg);
        else if (arg.substring(j, j + 3) === "no-") {
            name = arg.substring(j + 3);
            if (strict && !~keys.indexOf(name)) return opts.unknown(arg);
            out[name] = false;
        } else {
            for(idx = j + 1; idx < arg.length; idx++){
                if (arg.charCodeAt(idx) === 61) break; // "="
            }
            name = arg.substring(j, idx);
            val = arg.substring(++idx) || i + 1 === len || ("" + args[i + 1]).charCodeAt(0) === 45 || args[++i];
            arr = j === 2 ? [
                name
            ] : name;
            for(idx = 0; idx < arr.length; idx++){
                name = arr[idx];
                if (strict && !~keys.indexOf(name)) return opts.unknown("-".repeat(j) + name);
                $2538a59c4b88ef5a$var$toVal(out, name, idx + 1 < arr.length || val, opts);
            }
        }
    }
    if (defaults) {
        for(k in opts.default)if (out[k] === void 0) out[k] = opts.default[k];
    }
    if (alibi) for(k in out){
        arr = opts.alias[k] || [];
        while(arr.length > 0)out[arr.shift()] = out[k];
    }
    return out;
}




var $5Knzt = parcelRequire("5Knzt");
var $90d7af7b77b99d3a$exports = {};

$90d7af7b77b99d3a$exports = (parcelRequire("3kwLU"));


var $baf9901d68eebae6$exports = {};
$baf9901d68eebae6$exports = {
    "id": "en",
    "data": {
        "long": {
            "years": {
                "one": "{0} year",
                "other": "{0} years"
            },
            "months": {
                "one": "{0} month",
                "other": "{0} months"
            },
            "weeks": {
                "one": "{0} week",
                "other": "{0} weeks"
            },
            "days": {
                "one": "{0} day",
                "other": "{0} days"
            },
            "hours": {
                "one": "{0} hour",
                "other": "{0} hours"
            },
            "minutes": {
                "one": "{0} minute",
                "other": "{0} minutes"
            },
            "seconds": {
                "one": "{0} second",
                "other": "{0} seconds"
            }
        },
        "narrow": {
            "years": {
                "one": "{0}y",
                "other": "{0}y"
            },
            "months": {
                "one": "{0}m",
                "other": "{0}m"
            },
            "weeks": {
                "one": "{0}w",
                "other": "{0}w"
            },
            "days": {
                "one": "{0}d",
                "other": "{0}d"
            },
            "hours": {
                "one": "{0}h",
                "other": "{0}h"
            },
            "minutes": {
                "one": "{0}m",
                "other": "{0}m"
            },
            "seconds": {
                "one": "{0}s",
                "other": "{0}s"
            }
        },
        "short": {
            "years": {
                "one": "{0} yr",
                "other": "{0} yrs"
            },
            "months": {
                "one": "{0} mth",
                "other": "{0} mths"
            },
            "weeks": {
                "one": "{0} wk",
                "other": "{0} wks"
            },
            "days": {
                "one": "{0} day",
                "other": "{0} days"
            },
            "hours": {
                "one": "{0} hr",
                "other": "{0} hr"
            },
            "minutes": {
                "one": "{0} min",
                "other": "{0} min"
            },
            "seconds": {
                "one": "{0} sec",
                "other": "{0} sec"
            }
        }
    }
};



var $2vEB3 = parcelRequire("2vEB3");
var $f7c80ccca3cbcc2a$exports = {};

(function() {
    var root = this;
    var numerous;
    numerous = (parcelRequire("4xBg6"));
    numerous.addLocale("en", function pluralize_en(n /*``*/ ) {
        var i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, "").length;
        if (typeof n === "string") n = parseInt(n, 10);
        if (i === 1 && v === 0) return "one";
        return "other";
    });
}).call($f7c80ccca3cbcc2a$exports);


var $c50125dfeff98de9$exports = {};
"use strict";
Object.defineProperty($c50125dfeff98de9$exports, "__esModule", {
    value: true
});
$c50125dfeff98de9$exports.getUbuntuVersion = void 0;

function $c50125dfeff98de9$var$isSystemError(e) {
    return "errno" in e;
}
function $c50125dfeff98de9$var$command(exe, args) {
    return new Promise((resolve, reject)=>{
        $dQzAa$child_process.execFile(exe, args, {
            encoding: "utf8",
            shell: false
        }, (error, stdout, stderr)=>{
            if (error) {
                if ($c50125dfeff98de9$var$isSystemError(error) && error.code === "ENOENT") {
                    resolve(null); // When lsb_release is not found
                    return;
                }
                reject(new Error(`Could not execute \`${exe} ${args.join(" ")}\`: ${error} (stderr=${stderr})`));
                return;
            }
            resolve(stdout);
        });
    });
}
async function $c50125dfeff98de9$var$getUbuntuVersion() {
    if (process.platform !== "linux") return [];
    const stdout = await $c50125dfeff98de9$var$command("lsb_release", [
        "-a"
    ]);
    if (stdout === null) return [];
    const reDistributor = /^Distributor ID:\s*(.+)$/;
    const reDescription = /^Description:\s*Ubuntu\s+(\d+)\.(\d+)(?:\.(\d+))?/;
    const reRelease = /^Release:\s*(\d+)\.(\d+)(?:\.(\d+))?$/;
    let description = null;
    let release = null;
    let distributorFound = false;
    for (const line of stdout.split("\n")){
        const m = line.match(reDistributor);
        if (m !== null) {
            const distributor = m[1];
            if (distributor !== "Ubuntu") return [];
            distributorFound = true;
        }
        const desc = line.match(reDescription);
        if (desc) description = desc;
        const rel = line.match(reRelease);
        if (rel) release = rel;
        if (distributorFound && description && release) break;
    }
    if (!distributorFound) return [];
    for (const m1 of [
        description,
        release
    ])if (m1) {
        const ss = [
            m1[1],
            m1[2]
        ];
        if (m1[3]) ss.push(m1[3]);
        return ss.map((s)=>parseInt(s, 10));
    }
    return [];
}
$c50125dfeff98de9$exports.getUbuntuVersion = $c50125dfeff98de9$var$getUbuntuVersion; //# sourceMappingURL=index.js.map





async function $56f67ca23ac6d628$export$49c9cf1111dfa0ee() {
    if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) {
        if ((0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("lsb_release", {
            nothrow: true
        }) === null) await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("lsb-release");
        const versionSplitted = await (0, $c50125dfeff98de9$exports.getUbuntuVersion)();
        if (versionSplitted.length === 0) throw new Error("Failed to get the ubuntu major version.");
        return versionSplitted;
    } else return null;
}



var $9tUGm = parcelRequire("9tUGm");



var $8pybT = parcelRequire("8pybT");



var $7w88d = parcelRequire("7w88d");



var $8pybT = parcelRequire("8pybT");







let $edae02cb4ecd089d$var$hasVCPKG = false;
async function $edae02cb4ecd089d$export$490bdba4ef3e3f82(_version, setupDir, _arch) {
    if (!$edae02cb4ecd089d$var$hasVCPKG || (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("vcpkg", {
        nothrow: true
    }) === null) {
        if (process.platform === "linux") {
            // vcpkg download and extraction dependencies
            if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) {
                (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("curl");
                (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("zip");
                (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("unzip");
                (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("tar");
                (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("git");
                (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("pkg-config");
            } else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) {
                (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("curl");
                (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("zip");
                (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("unzip");
                (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("tar");
                (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("git");
                (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("pkg-config");
            } else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) {
                await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("curl");
                await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("zip");
                await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("unzip");
                await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("tar");
                await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("git");
                await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("pkg-config");
            }
        }
        if (!(0, $dQzAa$fs.existsSync)((0, $7w88d.join)(setupDir, (0, $7w88d.addShExt)("bootstrap-vcpkg", ".bat")))) (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports))).sync("git", [
            "clone",
            "https://github.com/microsoft/vcpkg"
        ], {
            cwd: (0, $7w88d.dirname)(setupDir),
            stdio: "inherit"
        });
        else (0, $8pybT.notice)(`Vcpkg folder already exists at ${setupDir}. This might mean that ~/vcpkg is restored from the cache.`);
        (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports))).sync((0, $7w88d.addShExt)((0, $7w88d.addShRelativePrefix)("bootstrap-vcpkg"), ".bat"), {
            cwd: setupDir,
            shell: true,
            stdio: "inherit"
        });
        (0, $562bc96627c27994$export$f9a3d10eb7c735af)(setupDir);
        await (0, $b6119f751060b0b2$export$4c25481b843feb0b)(setupDir);
        // eslint-disable-next-line require-atomic-updates
        $edae02cb4ecd089d$var$hasVCPKG = true;
        return {
            binDir: setupDir
        };
    }
    return {
        binDir: (0, $7w88d.dirname)((0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("vcpkg"))
    };
}



var $7w88d = parcelRequire("7w88d");



var $7w88d = parcelRequire("7w88d");













var $8pybT = parcelRequire("8pybT");


function $8580e0785ae2e889$var$getDownloadKcovPackageInfo(version) {
    return {
        url: `https://github.com/SimonKagstrom/kcov/releases/download/${version}/kcov-amd64.tar.gz`,
        extractedFolderName: "",
        binRelativeDir: "usr/local/bin",
        binFileName: (0, $7w88d.addExeExt)("kcov"),
        extractFunction: (0, $137dddd6529ba159$export$2ab07ac150064014)
    };
}
function $8580e0785ae2e889$var$getBuildKcovPackageInfo(version) {
    return {
        url: `https://github.com/SimonKagstrom/kcov/archive/refs/tags/${version}.tar.gz`,
        extractedFolderName: "",
        binRelativeDir: "build/src",
        binFileName: (0, $7w88d.addExeExt)("kcov"),
        extractFunction: $8580e0785ae2e889$var$buildKcov
    };
}
async function $8580e0785ae2e889$var$buildKcov(file, dest) {
    const out = await (0, $137dddd6529ba159$export$2ab07ac150064014)(file, dest, [
        "--strip-components=1"
    ]);
    // build after extraction using CMake
    const cmake = await $8580e0785ae2e889$var$getCmake();
    if (process.platform === "linux") {
        if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) {
            (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("libdwarf");
            (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("libcurl-openssl");
        } else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) {
            (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("libdwarf-devel");
            (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("libcurl-devel");
        } else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) {
            await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("libdw-dev");
            await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("libcurl4-openssl-dev");
        }
    }
    const buildDir = (0, $7w88d.join)(out, "build");
    await (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports)))(cmake, [
        "-S",
        out,
        "-B",
        buildDir,
        "-DCMAKE_BUILD_TYPE=Release",
        "-G",
        "Ninja"
    ], {
        cwd: out,
        stdio: "inherit"
    });
    await (0, (/*@__PURE__*/$parcel$interopDefault($0b337dd108862151$exports)))(cmake, [
        "--build",
        buildDir,
        "--config",
        "Release"
    ], {
        cwd: out,
        stdio: "inherit"
    });
    //   execRootSync(cmake, ["--install", buildDir], out)
    //   return "user/local/bin" // the cmake install prefix
    return out;
}
async function $8580e0785ae2e889$var$getCmake() {
    let cmake = (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("cmake", {
        nothrow: true
    });
    if (cmake === null) {
        const { binDir: binDir  } = await (0, $e3253d3a23a82b9d$export$c28663a621f418ce)((0, $80aa8bff5dc42325$export$c506eb22e615ba4a)("cmake", undefined), (0, $7w88d.join)((0, $84714ca9247cdcf5$export$8312d9eeba321950)(""), "cmake"), "");
        cmake = (0, $7w88d.join)(binDir, "cmake");
    }
    const ninja = (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("ninja", {
        nothrow: true
    });
    if (ninja === null) await (0, $067c9a6cc55c023f$export$e6190f4bfe2ef71)((0, $80aa8bff5dc42325$export$c506eb22e615ba4a)("ninja", undefined), (0, $7w88d.join)((0, $84714ca9247cdcf5$export$8312d9eeba321950)(""), "ninja"), "");
    return cmake;
}
async function $8580e0785ae2e889$export$abb7c2ff987b1f6b(versionGiven, setupDir, arch) {
    if (process.platform !== "linux") {
        (0, $8pybT.info)("Kcov is not supported on non-linux");
        return;
    }
    // parse version
    const versionSplit = versionGiven.split("-");
    let version = (0, $1bb2629e42d1884b$export$6863a97504984656)(versionSplit[0]);
    const installMethod = versionSplit[1];
    const version_number = (0, $1bb2629e42d1884b$export$b19007c0050a2fcc)(version);
    // fix inconsistency in tagging
    if (version_number === 38) version = "v38";
    let installationInfo;
    if (installMethod === "binary" && version_number >= 39) {
        installationInfo = await (0, $bdad3e96f106dc26$export$334f77c9844c21f6)("kcov", version, $8580e0785ae2e889$var$getDownloadKcovPackageInfo, setupDir, arch);
        if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("binutils");
        else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("binutils");
        else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("libbinutils");
        return installationInfo;
    } else installationInfo = await (0, $bdad3e96f106dc26$export$334f77c9844c21f6)("kcov", version, $8580e0785ae2e889$var$getBuildKcovPackageInfo, setupDir, arch);
    return installationInfo;
}






var $7w88d = parcelRequire("7w88d");




let $d2935c0a470dfb67$var$binDir;
async function $d2935c0a470dfb67$export$d73cbe8caeff03c5(version, _setupDir, _arch) {
    if (!(0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) return undefined;
    if (typeof $d2935c0a470dfb67$var$binDir === "string") return {
        binDir: $d2935c0a470dfb67$var$binDir
    };
    const maybeBinDir = (0, (/*@__PURE__*/$parcel$interopDefault($94c938c1d2901f7d$exports))).sync("nala", {
        nothrow: true
    });
    if (maybeBinDir !== null) {
        $d2935c0a470dfb67$var$binDir = (0, $7w88d.dirname)(maybeBinDir);
        return {
            binDir: $d2935c0a470dfb67$var$binDir
        };
    }
    // https://github.com/volitank/nala#-installation
    const keyFileName = await (0, $7b92e9e7fd13b8fa$export$7fb1a688af1305f0)("volian-archive-scar-unstable.gpg", "https://deb.volian.org/volian/scar.key");
    (0, $5643e448a91ad22e$export$58f152936f209932)("/bin/bash", [
        "-c",
        `echo "deb [signed-by=${keyFileName}] http://deb.volian.org/volian/ scar main" | tee /etc/apt/sources.list.d/volian-archive-scar-unstable.list`, 
    ]);
    try {
        if (version !== "legacy") await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("nala", undefined, [], true);
        else await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("nala-legacy", undefined, [], true);
    } catch (err) {
        await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("nala-legacy", undefined, [], true);
    }
    $d2935c0a470dfb67$var$binDir = "/usr/bin" // eslint-disable-line require-atomic-updates
    ;
    return {
        binDir: $d2935c0a470dfb67$var$binDir
    };
}










async function $108eb6fcb6c14901$export$a66bc93580b0a849(version, _setupDir, _arch) {
    switch(process.platform){
        case "win32":
            // install bazelisk because it contains both
            return (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("bazelisk", version);
        case "darwin":
            // install bazelisk because it contains both
            return (0, $6ea0ef9d1727031f$export$ce5d13d8a85cb784)("bazelisk", version);
        case "linux":
            if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) throw new Error("installing bazel on Arch linux is not supported yet");
            else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) {
                // https://bazel.build/install/redhat
                (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("dnf-plugins-core", undefined);
                (0, $5643e448a91ad22e$export$58f152936f209932)("dnf", [
                    "copr",
                    "enable",
                    "vbatts/bazel"
                ]);
                return (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("bazel4", undefined);
            } else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) {
                // https://bazel.build/install/ubuntu
                const keyFileName = await (0, $7b92e9e7fd13b8fa$export$7fb1a688af1305f0)("bazel-archive-keyring.gpg", "https://bazel.build/bazel-release.pub.gpg");
                (0, $5643e448a91ad22e$export$58f152936f209932)("bash", [
                    "-c",
                    `echo "deb [arch=amd64 signed-by=${keyFileName}] https://storage.googleapis.com/bazel-apt stable jdk1.8" | tee /etc/apt/sources.list.d/bazel.list`, 
                ]);
                return (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("bazel", version, [], true);
            }
            throw new Error(`Unsupported linux distribution`);
        default:
            throw new Error(`Unsupported platform`);
    }
}













async function $ee1c533ea3b24b9e$export$1ff6ad96ee130aba(version, _setupDir, _arch) {
    switch(process.platform){
        case "win32":
            {
                await (0, $d14c4153e64e41c0$export$9f6912bc890040b2)("powershell-core", version);
                const binDir = "C:/Program Files/PowerShell/7";
                await (0, $b6119f751060b0b2$export$4c25481b843feb0b)(binDir);
                return {
                    binDir: binDir
                };
            }
        case "darwin":
            return (0, $6ea0ef9d1727031f$export$ce5d13d8a85cb784)("powershell", version, [
                "--cask"
            ]);
        case "linux":
            if ((0, $94a574e06b6f997e$export$d415ddb6702ec3a2)()) return (0, $bd0a5aeac410d6bb$export$cfa75578ee2d6e6c)("powershell-bin", version, "yay");
            else if ((0, $549a35588e9d71a1$export$8ce8b4b22331a8c7)()) {
                (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("curl");
                (0, $5643e448a91ad22e$export$58f152936f209932)("/bin/bash", [
                    "-c",
                    `curl https://packages.microsoft.com/config/rhel/8/prod.repo | sudo tee /etc/yum.repos.d/microsoft.repo`, 
                ]);
                return (0, $80080083807a67cd$export$49d4f9ba8e0dd34f)("powershell", version);
            } else if ((0, $5368bbfc688469a5$export$da8baf1d6c6802b6)()) {
                await (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("curl");
                const ubuntuVerSplitted = await (0, $56f67ca23ac6d628$export$49c9cf1111dfa0ee)();
                const ubuntuVersionString = `${ubuntuVerSplitted[0]}.0${ubuntuVerSplitted[1]}`;
                (0, $5643e448a91ad22e$export$58f152936f209932)("curl", [
                    "-LJO",
                    `https://packages.microsoft.com/config/ubuntu/${ubuntuVersionString}/packages-microsoft-prod.deb`, 
                ]);
                (0, $5643e448a91ad22e$export$58f152936f209932)("dpkg", [
                    "-i",
                    "packages-microsoft-prod.deb"
                ]);
                // TODO Debian
                // const keyFileName = await addAptKeyViaDownload(
                //   "microsoft.asc",
                //   "https://packages.microsoft.com/keys/microsoft.asc"
                // )
                // execRootSync("/bin/bash", [
                //   "-c",
                //   `echo "deb [arch=amd64 signed-by=${keyFileName}] https://packages.microsoft.com/repos/microsoft-debian-bullseye-prod bullseye main" > /etc/apt/sources.list.d/microsoft.list`,
                // ])
                return (0, $7b92e9e7fd13b8fa$export$d73dc343f5abf26)("powershell", version, [], true);
            }
            throw new Error(`Unsupported linux distribution`);
        default:
            throw new Error(`Unsupported platform`);
    }
}


/** The setup functions */ const $80749a513d62e14e$var$setups = {
    nala: (0, $d2935c0a470dfb67$export$d73cbe8caeff03c5),
    cmake: (0, $e3253d3a23a82b9d$export$c28663a621f418ce),
    ninja: (0, $067c9a6cc55c023f$export$e6190f4bfe2ef71),
    python: (0, $3bac595962fc10ac$export$2b0b68e9df3d4a02),
    vcpkg: (0, $edae02cb4ecd089d$export$490bdba4ef3e3f82),
    bazel: (0, $108eb6fcb6c14901$export$a66bc93580b0a849),
    conan: (0, $cb5b629190692a08$export$249d0c7d779d362f),
    meson: (0, $ad6979a9b1cde0ee$export$f73905553f087748),
    gcovr: (0, $c731b0790f9ffaf1$export$b98d69f362caf61f),
    opencppcoverage: (0, $a7b96986c3792294$export$6aa28a97600a8ae3),
    llvm: (0, $0cd7a11563d5dbb2$export$3016de7ae9d14988),
    gcc: (0, $55ac5311cf6f954d$export$405fab3de79b77b),
    choco: (0, $f1566e05059df988$export$b804d731cdad7ef9),
    brew: (0, $28a97e251fbb61ba$export$c5eeb9c87a610a0e),
    powershell: (0, $ee1c533ea3b24b9e$export$1ff6ad96ee130aba),
    ccache: (0, $8c78d43577dd4046$export$111263621bbb0768),
    doxygen: (0, $b415d29fd6206b87$export$b6e6613a954051ee),
    graphviz: (0, $04d20f8c616da297$export$b885bd977caaafb9),
    cppcheck: (0, $82c9a79adb779844$export$13d77464c548b5d3),
    clangtidy: (0, $0cd7a11563d5dbb2$export$814ccfc953503728),
    clangformat: (0, $0cd7a11563d5dbb2$export$814ccfc953503728),
    msvc: (0, $9f11671a8b4773d7$export$a91ef0362c1a7298),
    vcvarsall: (0, $ca66f1e5d8c1b449$export$5dcf571c91fc8369),
    kcov: (0, $8580e0785ae2e889$export$abb7c2ff987b1f6b),
    make: (0, $d335de594b42817c$export$b0a9411329e2916),
    task: (0, $63d25992e4249ecd$export$4456b3a3d3540077),
    sevenzip: (0, $93a1c1326d2a1d42$export$5fc39629e14c8173)
};
/** The tools that can be installed */ const $80749a513d62e14e$var$tools = [
    "nala",
    "choco",
    "brew",
    "python",
    "powershell",
    "vcpkg",
    "bazel",
    "cmake",
    "ninja",
    "conan",
    "meson",
    "gcovr",
    "opencppcoverage",
    "ccache",
    "doxygen",
    "graphviz",
    "cppcheck",
    "clangtidy",
    "clangformat",
    "llvm",
    "gcc",
    "msvc",
    "vcvarsall",
    "kcov",
    "make",
    "task",
    "sevenzip", 
];
// an array of possible inputs
const $80749a513d62e14e$var$inputs = [
    "compiler",
    "architecture",
    ...$80749a513d62e14e$var$tools
];
async function $80749a513d62e14e$export$f22da7240b7add18(args) {
    if ((0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() !== "github-actions") process.env.ACTIONS_ALLOW_UNSECURE_COMMANDS = "true";
    // parse options using mri or github actions
    const opts = $80749a513d62e14e$export$7300a92932ee17a3(args);
    // print help
    if (opts.help) $80749a513d62e14e$var$printHelp();
    var _architecture;
    // cpu architecture
    const arch = (_architecture = opts.architecture) !== null && _architecture !== void 0 ? _architecture : process.arch;
    var _SETUP_CPP_DIR;
    // the installation dir for the tools that are downloaded directly
    const setupCppDir = (_SETUP_CPP_DIR = process.env.SETUP_CPP_DIR) !== null && _SETUP_CPP_DIR !== void 0 ? _SETUP_CPP_DIR : (0, $84714ca9247cdcf5$export$8312d9eeba321950)("");
    // report messages
    const successMessages = [];
    const errorMessages = [];
    const timeFormatter = $90d7af7b77b99d3a$exports.create({
        autoloadLocales: true
    });
    $90d7af7b77b99d3a$exports.addLocale((0, (/*@__PURE__*/$parcel$interopDefault($baf9901d68eebae6$exports))));
    $2vEB3.addLocale((0, (/*@__PURE__*/$parcel$interopDefault($f7c80ccca3cbcc2a$exports))));
    let time1;
    let time2;
    // installing the specified tools
    let osVersion = null;
    try {
        // get the version if not already done
        osVersion = await (0, $56f67ca23ac6d628$export$49c9cf1111dfa0ee)();
    } catch (err) {
        (0, $8pybT.warning)(err.toString());
    }
    // sync the version for the llvm tools
    if (!(0, $80aa8bff5dc42325$export$dd13a1e418f5a5fe)(opts, [
        "llvm",
        "clangtidy",
        "clangformat"
    ])) {
        (0, $8pybT.error)("The same version must be used for llvm, clangformat and clangtidy");
        return 1;
    }
    let hasLLVM = false // used to unset CPPFLAGS of LLVM when other compilers are used as the main compiler
    ;
    // loop over the tools and run their setup function
    for (const tool of $80749a513d62e14e$var$tools){
        // get the version or "true" or undefined for this tool from the options
        const version = opts[tool];
        // skip if undefined
        if (version !== undefined) {
            // running the setup function for this tool
            time1 = Date.now();
            (0, $9Ei2d.startGroup)(`Installing ${tool} ${version}`);
            try {
                let installationInfo;
                if (tool === "vcvarsall") // eslint-disable-next-line no-await-in-loop
                await (0, $ca66f1e5d8c1b449$export$5dcf571c91fc8369)((0, $80aa8bff5dc42325$export$c506eb22e615ba4a)(tool, version, osVersion), undefined, arch, undefined, undefined, false, false);
                else {
                    // get the setup function
                    const setupFunction = $80749a513d62e14e$var$setups[tool];
                    hasLLVM = [
                        "llvm",
                        "clangformat",
                        "clangtidy"
                    ].includes(tool);
                    // the tool installation directory (for the functions that ue it)
                    const setupDir = (0, $7w88d.join)(setupCppDir, hasLLVM ? "llvm" : tool);
                    // eslint-disable-next-line no-await-in-loop
                    installationInfo = await setupFunction((0, $80aa8bff5dc42325$export$c506eb22e615ba4a)(tool, version, osVersion), setupDir, arch);
                }
                // preparing a report string
                successMessages.push($80749a513d62e14e$var$getSuccessMessage(tool, installationInfo));
            } catch (e) {
                // push error message to the logger
                (0, $8pybT.error)(e);
                errorMessages.push(`${tool} failed to install`);
            }
            (0, $9Ei2d.endGroup)();
            time2 = Date.now();
            (0, $8pybT.info)(`took ${timeFormatter.format(time1, time2) || "0 seconds"}`);
        }
    }
    // installing the specified compiler
    const maybeCompiler = opts.compiler;
    time1 = Date.now();
    try {
        if (maybeCompiler !== undefined) {
            const { compiler: compiler , version: version1  } = $80749a513d62e14e$export$588248dee5258836(maybeCompiler);
            // install the compiler. We allow some aliases for the compiler name
            (0, $9Ei2d.startGroup)(`Installing ${compiler} ${version1 !== null && version1 !== void 0 ? version1 : ""}`);
            switch(compiler){
                case "llvm":
                case "clang":
                case "clang++":
                    {
                        const installationInfo1 = await (0, $0cd7a11563d5dbb2$export$3016de7ae9d14988)((0, $80aa8bff5dc42325$export$c506eb22e615ba4a)("llvm", version1, osVersion), (0, $7w88d.join)(setupCppDir, "llvm"), arch);
                        successMessages.push($80749a513d62e14e$var$getSuccessMessage("llvm", installationInfo1));
                        break;
                    }
                case "gcc":
                case "mingw":
                case "cygwin":
                case "msys":
                    {
                        const installationInfo2 = await (0, $55ac5311cf6f954d$export$405fab3de79b77b)((0, $80aa8bff5dc42325$export$c506eb22e615ba4a)("gcc", version1, osVersion), (0, $7w88d.join)(setupCppDir, "gcc"), arch);
                        if (hasLLVM) // remove the CPPFLAGS of LLVM that include the LLVM headers
                        await (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CPPFLAGS", "");
                        successMessages.push($80749a513d62e14e$var$getSuccessMessage("gcc", installationInfo2));
                        break;
                    }
                case "cl":
                case "msvc":
                case "msbuild":
                case "vs":
                case "visualstudio":
                case "visualcpp":
                case "visualc++":
                    {
                        const installationInfo3 = await (0, $9f11671a8b4773d7$export$a91ef0362c1a7298)((0, $80aa8bff5dc42325$export$c506eb22e615ba4a)("msvc", version1, osVersion), (0, $7w88d.join)(setupCppDir, "msvc"), arch);
                        if (hasLLVM) // remove the CPPFLAGS of LLVM that include the LLVM headers
                        await (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CPPFLAGS", "");
                        successMessages.push($80749a513d62e14e$var$getSuccessMessage("msvc", installationInfo3));
                        break;
                    }
                case "appleclang":
                case "applellvm":
                    (0, $9Ei2d.notice)("Assuming apple-clang is already installed");
                    await Promise.all([
                        (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CC", "clang"),
                        (0, $b6119f751060b0b2$export$f63d3080ce25e0fd)("CXX", "clang++")
                    ]);
                    successMessages.push($80749a513d62e14e$var$getSuccessMessage("apple-clang", undefined));
                    break;
                default:
                    errorMessages.push(`Unsupported compiler ${compiler}`);
            }
            (0, $9Ei2d.endGroup)();
            time2 = Date.now();
            (0, $8pybT.info)(`took ${timeFormatter.format(time1, time2) || "0 seconds"}`);
        }
    } catch (e1) {
        (0, $8pybT.error)(e1);
        errorMessages.push(`Failed to install the ${maybeCompiler}`);
        (0, $9Ei2d.endGroup)();
        time2 = Date.now();
        (0, $8pybT.info)(`took ${timeFormatter.format(time1, time2) || "0 seconds"}`);
    }
    if (successMessages.length === 0 && errorMessages.length === 0) {
        (0, $8pybT.warning)("setup_cpp was called without any arguments. Nothing to do.");
        return 0;
    }
    // report the messages in the end
    successMessages.forEach((tool)=>(0, $8pybT.success)(tool));
    errorMessages.forEach((tool)=>(0, $8pybT.error)(tool));
    (0, $8pybT.info)("setup_cpp finished");
    if ((0, (/*@__PURE__*/$parcel$interopDefault($5Knzt)))() !== "github-actions") switch(process.platform){
        case "win32":
            (0, $8pybT.warning)("Run `RefreshEnv.cmd` or restart your shell to update the environment.");
            break;
        case "linux":
        case "darwin":
            (0, $8pybT.warning)("Run `source ~/.cpprc` or restart your shell to update the environment.");
            break;
        default:
    }
    return errorMessages.length === 0 ? 0 : 1 // exit with non-zero if any error message
    ;
}
// Run main
$80749a513d62e14e$export$f22da7240b7add18(process.argv).then((ret)=>{
    process.exitCode = ret;
}).catch((err)=>{
    (0, $8pybT.error)("main() panicked!");
    (0, $8pybT.error)(err);
    process.exitCode = 1;
});
function $80749a513d62e14e$export$7300a92932ee17a3(args) {
    return (0, $2538a59c4b88ef5a$export$2e2bcd8739ae039)(args, {
        string: $80749a513d62e14e$var$inputs,
        default: Object.fromEntries($80749a513d62e14e$var$inputs.map((inp)=>[
                inp,
                $80749a513d62e14e$var$maybeGetInput(inp)
            ])),
        alias: {
            h: "help"
        },
        boolean: "help"
    });
}
function $80749a513d62e14e$export$588248dee5258836(maybeCompiler) {
    const compilerAndMaybeVersion = maybeCompiler.split("-");
    const compiler = compilerAndMaybeVersion[0];
    if (1 in compilerAndMaybeVersion) {
        const maybeVersion = compilerAndMaybeVersion[1];
        if ((0, (/*@__PURE__*/$parcel$interopDefault($9tUGm)))(maybeVersion) !== null) return {
            compiler: compiler,
            version: maybeVersion
        };
        else {
            (0, $8pybT.info)(`Invalid semver version ${maybeVersion} used for the compiler.`);
            return {
                compiler: compiler,
                version: maybeVersion
            };
        }
    }
    return {
        compiler: compiler,
        version: undefined
    };
}
function $80749a513d62e14e$var$printHelp() {
    (0, $8pybT.info)(`
setup_cpp [options]
setup_cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true

Install all the tools required for building and testing C++/C projects.

--architecture\t the cpu architecture to install the tools for. By default it uses the current CPU architecture.
--compiler\t the <compiler> to install.
          \t You can specify the version instead of specifying just the name e.g: --compiler 'llvm-13.0.0'

--tool_name\t pass "true" or pass the <version> you would like to install for this tool. e.g. --conan true or --conan "1.42.1"

All the available tools:
--llvm
--gcc
--vcvarsall
--cmake
--ninja
--vcpkg
--bazel
--meson
--conan
--make
--task
--ccache
--cppcheck
--clangformat
--clangtidy
--doxygen
--gcovr
--opencppcoverage
--kcov

--python
--choco
--brew
--nala
--sevenzip
--graphviz
      `);
}
/** Get an object from github actions */ function $80749a513d62e14e$var$maybeGetInput(key) {
    const value = (0, $9Ei2d.getInput)(key.toLowerCase());
    if (value !== "false" && value !== "") return value;
    return undefined // skip installation
    ;
}
function $80749a513d62e14e$var$getSuccessMessage(tool, installationInfo) {
    let msg = `✅ ${tool} was installed successfully:`;
    if (installationInfo === undefined) return msg;
    if ("installDir" in installationInfo) msg += `\n- The installation directory is ${installationInfo.installDir}`;
    if (installationInfo.binDir !== "") msg += `\n- The binary directory is ${installationInfo.binDir}`;
    return msg;
}


//# sourceMappingURL=setup_cpp.js.map
