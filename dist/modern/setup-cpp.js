#!/usr/bin/env node
let e,t,r,n,i,o,s,a;var l,c,u,d,p,f=require("os"),h=require("path"),m=require("fs"),g=require("crypto"),v=require("http"),y=require("https");require("net");var w=require("tls"),x=require("events"),E=require("assert"),b=require("util"),S=require("fs"),$=require("child_process"),_=require("string_decoder"),O=require("timers"),C=require("buffer"),I=require("stream"),T=require("process"),R=require("buffer"),P=require("path"),A=require("child_process"),N=require("process"),L=require("url"),k=require("os"),D=require("util"),U=require("fs/promises"),j=require("url"),M=require("console");function F(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0});}function B(e){return e&&e.__esModule?e.default:e;}var G="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},H={},V={},q=G.parcelRequire810d;null==q&&((q=function(e){if(e in H)return H[e].exports;if(e in V){var t=V[e];delete V[e];var r={id:e,exports:{}};return H[e]=r,t.call(r.exports,r,r.exports),r.exports;}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n;}).register=function(e,t){V[e]=t;},G.parcelRequire810d=q),q.register("dTX7a",function(e,t){var r=q("gjIAX");let n=process.env;function i(e){return(// "env": "CIRRUS"
"string"==typeof e?!!n[e]:"env"in e?n[e.env]&&n[e.env].includes(e.includes):"any"in e?e.any.some(function(e){return!!n[e];}):Object.keys(e).every(function(t){return n[t]===e[t];}));}// Used for testing only
Object.defineProperty(e.exports,"_vendors",{value:r.map(function(e){return e.constant;})}),e.exports.name=null,e.exports.isPR=null,r.forEach(function(t){let r=Array.isArray(t.env)?t.env:[t.env],o=r.every(function(e){return i(e);});if(e.exports[t.constant]=o,o)switch(e.exports.name=t.name,typeof t.pr){case"string":// "pr": "CIRRUS_PR"
e.exports.isPR=!!n[t.pr];break;case"object":"env"in t.pr?e.exports.isPR=t.pr.env in n&&n[t.pr.env]!==t.pr.ne:"any"in t.pr?e.exports.isPR=t.pr.any.some(function(e){return!!n[e];}):e.exports.isPR=i(t.pr);break;default:// PR detection not supported for this vendor
e.exports.isPR=null;}}),e.exports.isCI=!!("false"!==n.CI&&(// Bypass all checks if CI env is explicitly set to 'false'
n.BUILD_ID||// Jenkins, Cloudbees
n.BUILD_NUMBER||// Jenkins, TeamCity
n.CI||// Travis CI, CircleCI, Cirrus CI, Gitlab CI, Appveyor, CodeShip, dsari
n.CI_APP_ID||// Appflow
n.CI_BUILD_ID||// Appflow
n.CI_BUILD_NUMBER||// Appflow
n.CI_NAME||// Codeship and others
n.CONTINUOUS_INTEGRATION||// Travis CI, Cirrus CI
n.RUN_ID||// TaskCluster, dsari
e.exports.name));}),q.register("gjIAX",function(e,t){e.exports=JSON.parse('[{"name":"Appcircle","constant":"APPCIRCLE","env":"AC_APPCIRCLE"},{"name":"AppVeyor","constant":"APPVEYOR","env":"APPVEYOR","pr":"APPVEYOR_PULL_REQUEST_NUMBER"},{"name":"AWS CodeBuild","constant":"CODEBUILD","env":"CODEBUILD_BUILD_ARN"},{"name":"Azure Pipelines","constant":"AZURE_PIPELINES","env":"SYSTEM_TEAMFOUNDATIONCOLLECTIONURI","pr":"SYSTEM_PULLREQUEST_PULLREQUESTID"},{"name":"Bamboo","constant":"BAMBOO","env":"bamboo_planKey"},{"name":"Bitbucket Pipelines","constant":"BITBUCKET","env":"BITBUCKET_COMMIT","pr":"BITBUCKET_PR_ID"},{"name":"Bitrise","constant":"BITRISE","env":"BITRISE_IO","pr":"BITRISE_PULL_REQUEST"},{"name":"Buddy","constant":"BUDDY","env":"BUDDY_WORKSPACE_ID","pr":"BUDDY_EXECUTION_PULL_REQUEST_ID"},{"name":"Buildkite","constant":"BUILDKITE","env":"BUILDKITE","pr":{"env":"BUILDKITE_PULL_REQUEST","ne":"false"}},{"name":"CircleCI","constant":"CIRCLE","env":"CIRCLECI","pr":"CIRCLE_PULL_REQUEST"},{"name":"Cirrus CI","constant":"CIRRUS","env":"CIRRUS_CI","pr":"CIRRUS_PR"},{"name":"Codefresh","constant":"CODEFRESH","env":"CF_BUILD_ID","pr":{"any":["CF_PULL_REQUEST_NUMBER","CF_PULL_REQUEST_ID"]}},{"name":"Codemagic","constant":"CODEMAGIC","env":"CM_BUILD_ID","pr":"CM_PULL_REQUEST"},{"name":"Codeship","constant":"CODESHIP","env":{"CI_NAME":"codeship"}},{"name":"Drone","constant":"DRONE","env":"DRONE","pr":{"DRONE_BUILD_EVENT":"pull_request"}},{"name":"dsari","constant":"DSARI","env":"DSARI"},{"name":"Expo Application Services","constant":"EAS","env":"EAS_BUILD"},{"name":"Gerrit","constant":"GERRIT","env":"GERRIT_PROJECT"},{"name":"GitHub Actions","constant":"GITHUB_ACTIONS","env":"GITHUB_ACTIONS","pr":{"GITHUB_EVENT_NAME":"pull_request"}},{"name":"GitLab CI","constant":"GITLAB","env":"GITLAB_CI","pr":"CI_MERGE_REQUEST_ID"},{"name":"GoCD","constant":"GOCD","env":"GO_PIPELINE_LABEL"},{"name":"Google Cloud Build","constant":"GOOGLE_CLOUD_BUILD","env":"BUILDER_OUTPUT"},{"name":"Harness CI","constant":"HARNESS","env":"HARNESS_BUILD_ID"},{"name":"Heroku","constant":"HEROKU","env":{"env":"NODE","includes":"/app/.heroku/node/bin/node"}},{"name":"Hudson","constant":"HUDSON","env":"HUDSON_URL"},{"name":"Jenkins","constant":"JENKINS","env":["JENKINS_URL","BUILD_ID"],"pr":{"any":["ghprbPullId","CHANGE_ID"]}},{"name":"LayerCI","constant":"LAYERCI","env":"LAYERCI","pr":"LAYERCI_PULL_REQUEST"},{"name":"Magnum CI","constant":"MAGNUM","env":"MAGNUM"},{"name":"Netlify CI","constant":"NETLIFY","env":"NETLIFY","pr":{"env":"PULL_REQUEST","ne":"false"}},{"name":"Nevercode","constant":"NEVERCODE","env":"NEVERCODE","pr":{"env":"NEVERCODE_PULL_REQUEST","ne":"false"}},{"name":"ReleaseHub","constant":"RELEASEHUB","env":"RELEASE_BUILD_ID"},{"name":"Render","constant":"RENDER","env":"RENDER","pr":{"IS_PULL_REQUEST":"true"}},{"name":"Sail CI","constant":"SAIL","env":"SAILCI","pr":"SAIL_PULL_REQUEST_NUMBER"},{"name":"Screwdriver","constant":"SCREWDRIVER","env":"SCREWDRIVER","pr":{"env":"SD_PULL_REQUEST","ne":"false"}},{"name":"Semaphore","constant":"SEMAPHORE","env":"SEMAPHORE","pr":"PULL_REQUEST_NUMBER"},{"name":"Shippable","constant":"SHIPPABLE","env":"SHIPPABLE","pr":{"IS_PULL_REQUEST":"true"}},{"name":"Solano CI","constant":"SOLANO","env":"TDDIUM","pr":"TDDIUM_PR_ID"},{"name":"Sourcehut","constant":"SOURCEHUT","env":{"CI_NAME":"sourcehut"}},{"name":"Strider CD","constant":"STRIDER","env":"STRIDER"},{"name":"TaskCluster","constant":"TASKCLUSTER","env":["TASK_ID","RUN_ID"]},{"name":"TeamCity","constant":"TEAMCITY","env":"TEAMCITY_VERSION"},{"name":"Travis CI","constant":"TRAVIS","env":"TRAVIS","pr":{"env":"TRAVIS_PULL_REQUEST","ne":"false"}},{"name":"Vercel","constant":"VERCEL","env":{"any":["NOW_BUILDER","VERCEL"]}},{"name":"Visual Studio App Center","constant":"APPCENTER","env":"APPCENTER_BUILD_ID"},{"name":"Woodpecker","constant":"WOODPECKER","env":{"CI":"woodpecker"},"pr":{"CI_BUILD_EVENT":"pull_request"}},{"name":"Xcode Cloud","constant":"XCODE_CLOUD","env":"CI_XCODE_PROJECT","pr":"CI_PULL_REQUEST_NUMBER"},{"name":"Xcode Server","constant":"XCODE_SERVER","env":"XCS"}]');}),q.register("ER74K",function(e,t){F(e.exports,"error",()=>i),F(e.exports,"success",()=>o),F(e.exports,"warning",()=>s),F(e.exports,"notice",()=>a),F(e.exports,"info",()=>l);var r=q("lcRzN"),n=q("dTX7a");function i(e){return n.GITHUB_ACTIONS?r.error(e):console.log(`\x1b[31m${e}\x1b[0m`);}function o(e){return console.log(`\x1b[32m${e}\x1b[0m`);}function s(e){return n.GITHUB_ACTIONS?r.warning(e):console.log(`\x1b[33m${e}\x1b[0m`);}function a(e){return n.GITHUB_ACTIONS?r.notice(e):console.log(`\x1b[94m${e}\x1b[0m`);}function l(e){return n.GITHUB_ACTIONS?r.info(e):console.log(e);}}),q.register("lcRzN",function(e,t){var r,n,i=e.exports&&e.exports.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r];}});}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r];}),o=e.exports&&e.exports.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t});}:function(e,t){e.default=t;}),s=e.exports&&e.exports.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&i(t,e,r);return o(t,e),t;},a=e.exports&&e.exports.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{l(n.next(e));}catch(e){o(e);}}function a(e){try{l(n.throw(e));}catch(e){o(e);}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t);})).then(s,a);}l((n=n.apply(e,t||[])).next());});};Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.getIDToken=e.exports.getState=e.exports.saveState=e.exports.group=e.exports.endGroup=e.exports.startGroup=e.exports.info=e.exports.notice=e.exports.warning=e.exports.error=e.exports.debug=e.exports.isDebug=e.exports.setFailed=e.exports.setCommandEcho=e.exports.setOutput=e.exports.getBooleanInput=e.exports.getMultilineInput=e.exports.getInput=e.exports.addPath=e.exports.setSecret=e.exports.exportVariable=e.exports.ExitCode=void 0;var l=q("17SLf"),c=q("7PXQQ"),u=q("6L1x9");let d=s(f),p=s(h);var m=q("5n2X4");/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */function g(e,t){let r=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!r)throw Error(`Input required and not supplied: ${e}`);return t&&!1===t.trimWhitespace?r:r.trim();}/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */function v(e,t={}){l.issueCommand("error",u.toCommandProperties(t),e instanceof Error?e.toString():e);}/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */function y(e){l.issue("group",e);}/**
 * End an output group.
 */function w(){l.issue("endgroup");}/**
     * A code indicating that the action was successful
     */(r=n=e.exports.ExitCode||(e.exports.ExitCode={}))[r.Success=0]="Success",/**
     * A code indicating that the action was a failure
     */r[r.Failure=1]="Failure",e.exports.exportVariable=//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function(e,t){let r=u.toCommandValue(t);process.env[e]=r;let n=process.env.GITHUB_ENV||"";if(n)return c.issueFileCommand("ENV",c.prepareKeyValueMessage(e,t));l.issueCommand("set-env",{name:e},r);},e.exports.setSecret=/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */function(e){l.issueCommand("add-mask",{},e);},e.exports.addPath=/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */function(e){let t=process.env.GITHUB_PATH||"";t?c.issueFileCommand("PATH",e):l.issueCommand("add-path",{},e),process.env.PATH=`${e}${p.delimiter}${process.env.PATH}`;},e.exports.getInput=g,e.exports.getMultilineInput=/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */function(e,t){let r=g(e,t).split("\n").filter(e=>""!==e);return t&&!1===t.trimWhitespace?r:r.map(e=>e.trim());},e.exports.getBooleanInput=/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */function(e,t){let r=g(e,t);if(["true","True","TRUE"].includes(r))return!0;if(["false","False","FALSE"].includes(r))return!1;throw TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${e}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);},e.exports.setOutput=/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function(e,t){let r=process.env.GITHUB_OUTPUT||"";if(r)return c.issueFileCommand("OUTPUT",c.prepareKeyValueMessage(e,t));process.stdout.write(d.EOL),l.issueCommand("set-output",{name:e},u.toCommandValue(t));},e.exports.setCommandEcho=/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */function(e){l.issue("echo",e?"on":"off");},e.exports.setFailed=//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */function(e){process.exitCode=n.Failure,v(e);},e.exports.isDebug=//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */function(){return"1"===process.env.RUNNER_DEBUG;},e.exports.debug=/**
 * Writes debug message to user log
 * @param message debug message
 */function(e){l.issueCommand("debug",{},e);},e.exports.error=v,e.exports.warning=/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */function(e,t={}){l.issueCommand("warning",u.toCommandProperties(t),e instanceof Error?e.toString():e);},e.exports.notice=/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */function(e,t={}){l.issueCommand("notice",u.toCommandProperties(t),e instanceof Error?e.toString():e);},e.exports.info=/**
 * Writes info to log with console.log.
 * @param message info message
 */function(e){process.stdout.write(e+d.EOL);},e.exports.startGroup=y,e.exports.endGroup=w,e.exports.group=/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */function(e,t){return a(this,void 0,void 0,function*(){let r;y(e);try{r=yield t();}finally{w();}return r;});},e.exports.saveState=//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function(e,t){let r=process.env.GITHUB_STATE||"";if(r)return c.issueFileCommand("STATE",c.prepareKeyValueMessage(e,t));l.issueCommand("save-state",{name:e},u.toCommandValue(t));},e.exports.getState=/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */function(e){return process.env[`STATE_${e}`]||"";},e.exports.getIDToken=function(e){return a(this,void 0,void 0,function*(){return yield m.OidcClient.getIDToken(e);});};var x=q("4rwlm");Object.defineProperty(e.exports,"summary",{enumerable:!0,get:function(){return x.summary;}});var x=q("4rwlm");Object.defineProperty(e.exports,"markdownSummary",{enumerable:!0,get:function(){return x.markdownSummary;}});var E=q("3jp5d");Object.defineProperty(e.exports,"toPosixPath",{enumerable:!0,get:function(){return E.toPosixPath;}}),Object.defineProperty(e.exports,"toWin32Path",{enumerable:!0,get:function(){return E.toWin32Path;}}),Object.defineProperty(e.exports,"toPlatformPath",{enumerable:!0,get:function(){return E.toPlatformPath;}});}),q.register("17SLf",function(e,t){var r=e.exports&&e.exports.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r];}});}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r];}),n=e.exports&&e.exports.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t});}:function(e,t){e.default=t;}),i=e.exports&&e.exports.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.hasOwnProperty.call(e,i)&&r(t,e,i);return n(t,e),t;};Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.issue=e.exports.issueCommand=void 0;let o=i(f);var s=q("6L1x9");/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */function a(e,t,r){let n=new l(e,t,r);process.stdout.write(n.toString()+o.EOL);}e.exports.issueCommand=a,e.exports.issue=function(e,t=""){a(e,{},t);};class l{constructor(e,t,r){e||(e="missing.command"),this.command=e,this.properties=t,this.message=r;}toString(){var e;let t="::"+this.command;if(this.properties&&Object.keys(this.properties).length>0){t+=" ";let e=!0;for(let r in this.properties)if(this.properties.hasOwnProperty(r)){let n=this.properties[r];n&&(e?e=!1:t+=",",t+=`${r}=${s.toCommandValue(n).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}`);}}return t+`::${(e=this.message,s.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A"))}`;}}}),q.register("6L1x9",function(e,t){// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.toCommandProperties=e.exports.toCommandValue=void 0,e.exports.toCommandValue=/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */function(e){return null==e?"":"string"==typeof e||e instanceof String?e:JSON.stringify(e);},e.exports.toCommandProperties=/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */function(e){return Object.keys(e).length?{title:e.title,file:e.file,line:e.startLine,endLine:e.endLine,col:e.startColumn,endColumn:e.endColumn}:{};};}),q.register("7PXQQ",function(e,t){// For internal use, subject to change.
var r=e.exports&&e.exports.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r];}});}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r];}),n=e.exports&&e.exports.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t});}:function(e,t){e.default=t;}),i=e.exports&&e.exports.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.hasOwnProperty.call(e,i)&&r(t,e,i);return n(t,e),t;};Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.prepareKeyValueMessage=e.exports.issueFileCommand=void 0;// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */let o=i(m),s=i(f);var a=q("4dndm"),l=q("6L1x9");e.exports.issueFileCommand=function(e,t){let r=process.env[`GITHUB_${e}`];if(!r)throw Error(`Unable to find environment variable for file command ${e}`);if(!o.existsSync(r))throw Error(`Missing file at path: ${r}`);o.appendFileSync(r,`${l.toCommandValue(t)}${s.EOL}`,{encoding:"utf8"});},e.exports.prepareKeyValueMessage=function(e,t){let r=`ghadelimiter_${a.default()}`,n=l.toCommandValue(t);// These should realistically never happen, but just in case someone finds a
// way to exploit uuid generation let's not allow keys or values that contain
// the delimiter.
if(e.includes(r))throw Error(`Unexpected input: name should not contain the delimiter "${r}"`);if(n.includes(r))throw Error(`Unexpected input: value should not contain the delimiter "${r}"`);return`${e}<<${r}${s.EOL}${n}${s.EOL}${r}`;};}),q.register("4dndm",function(e,t){F(e.exports,"default",()=>i);var r=q("5SVBN"),n=q("38Etc"),i=function(e,t,i){e=e||{};let o=e.random||(e.rng||(0,r.default))();// Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t){i=i||0;for(let e=0;e<16;++e)t[i+e]=o[e];return t;}return(0,n.default)(o);};}),q.register("5SVBN",function(e,t){F(e.exports,"default",()=>i);let r=new Uint8Array(256),n=r.length;// # of random values to pre-allocate
function i(){return n>r.length-16&&(B(g).randomFillSync(r),n=0),r.slice(n,n+=16);}}),q.register("38Etc",function(e,t){F(e.exports,"default",()=>i);var r=q("f9HAa");/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */let n=[];for(let e=0;e<256;++e)n.push((e+256).toString(16).substr(1));var i=function(e,t=0){// Note: Be careful editing this code!  It's been tuned for performance
// and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
let i=(n[e[t+0]]+n[e[t+1]]+n[e[t+2]]+n[e[t+3]]+"-"+n[e[t+4]]+n[e[t+5]]+"-"+n[e[t+6]]+n[e[t+7]]+"-"+n[e[t+8]]+n[e[t+9]]+"-"+n[e[t+10]]+n[e[t+11]]+n[e[t+12]]+n[e[t+13]]+n[e[t+14]]+n[e[t+15]]).toLowerCase();// Consistency check for valid UUID.  If this throws, it's likely due to one
// of the following:
// - One or more input array values don't map to a hex octet (leading to
// "undefined" in the uuid)
// - Invalid input values for the RFC `version` or `variant` fields
if(!(0,r.default)(i))throw TypeError("Stringified UUID is invalid");return i;};}),q.register("f9HAa",function(e,t){F(e.exports,"default",()=>n);var r=q("bpRYF"),n=function(e){return"string"==typeof e&&(0,r.default).test(e);};}),q.register("bpRYF",function(e,t){F(e.exports,"default",()=>r);var r=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;}),q.register("5n2X4",function(e,t){var r=e.exports&&e.exports.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{l(n.next(e));}catch(e){o(e);}}function a(e){try{l(n.throw(e));}catch(e){o(e);}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t);})).then(s,a);}l((n=n.apply(e,t||[])).next());});};Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.OidcClient=void 0;var n=q("iC7fc"),i=q("gaCjs"),o=q("lcRzN");class s{static createHttpClient(e=!0,t=10){return new n.HttpClient("actions/oidc-client",[new i.BearerCredentialHandler(s.getRequestToken())],{allowRetries:e,maxRetries:t});}static getRequestToken(){let e=process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;if(!e)throw Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");return e;}static getIDTokenUrl(){let e=process.env.ACTIONS_ID_TOKEN_REQUEST_URL;if(!e)throw Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");return e;}static getCall(e){var t;return r(this,void 0,void 0,function*(){let r=s.createHttpClient(),n=yield r.getJson(e).catch(e=>{throw Error(`Failed to get ID Token. 
 
        Error Code : ${e.statusCode}
 
        Error Message: ${e.result.message}`);}),i=null===(t=n.result)||void 0===t?void 0:t.value;if(!i)throw Error("Response json body do not have ID Token field");return i;});}static getIDToken(e){return r(this,void 0,void 0,function*(){try{// New ID Token is requested from action service
let t=s.getIDTokenUrl();if(e){let r=encodeURIComponent(e);t=`${t}&audience=${r}`;}o.debug(`ID token url is ${t}`);let r=yield s.getCall(t);return o.setSecret(r),r;}catch(e){throw Error(`Error message: ${e.message}`);}});}}e.exports.OidcClient=s;}),q.register("iC7fc",function(e,t){/* eslint-disable @typescript-eslint/no-explicit-any */var r,n,i,o,s,a=e.exports&&e.exports.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r];}});}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r];}),l=e.exports&&e.exports.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t});}:function(e,t){e.default=t;}),c=e.exports&&e.exports.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&a(t,e,r);return l(t,e),t;},u=e.exports&&e.exports.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{l(n.next(e));}catch(e){o(e);}}function a(e){try{l(n.throw(e));}catch(e){o(e);}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t);})).then(s,a);}l((n=n.apply(e,t||[])).next());});};Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.HttpClient=e.exports.isHttps=e.exports.HttpClientResponse=e.exports.HttpClientError=e.exports.getProxyUrl=e.exports.MediaTypes=e.exports.Headers=e.exports.HttpCodes=void 0;let d=c(v),p=c(y),f=c(q("9ws9E")),h=c(q("eYDoL"));(r=i=e.exports.HttpCodes||(e.exports.HttpCodes={}))[r.OK=200]="OK",r[r.MultipleChoices=300]="MultipleChoices",r[r.MovedPermanently=301]="MovedPermanently",r[r.ResourceMoved=302]="ResourceMoved",r[r.SeeOther=303]="SeeOther",r[r.NotModified=304]="NotModified",r[r.UseProxy=305]="UseProxy",r[r.SwitchProxy=306]="SwitchProxy",r[r.TemporaryRedirect=307]="TemporaryRedirect",r[r.PermanentRedirect=308]="PermanentRedirect",r[r.BadRequest=400]="BadRequest",r[r.Unauthorized=401]="Unauthorized",r[r.PaymentRequired=402]="PaymentRequired",r[r.Forbidden=403]="Forbidden",r[r.NotFound=404]="NotFound",r[r.MethodNotAllowed=405]="MethodNotAllowed",r[r.NotAcceptable=406]="NotAcceptable",r[r.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",r[r.RequestTimeout=408]="RequestTimeout",r[r.Conflict=409]="Conflict",r[r.Gone=410]="Gone",r[r.TooManyRequests=429]="TooManyRequests",r[r.InternalServerError=500]="InternalServerError",r[r.NotImplemented=501]="NotImplemented",r[r.BadGateway=502]="BadGateway",r[r.ServiceUnavailable=503]="ServiceUnavailable",r[r.GatewayTimeout=504]="GatewayTimeout",(n=o=e.exports.Headers||(e.exports.Headers={})).Accept="accept",n.ContentType="content-type",(s=e.exports.MediaTypes||(e.exports.MediaTypes={})).ApplicationJson="application/json",e.exports.getProxyUrl=/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */function(e){let t=f.getProxyUrl(new URL(e));return t?t.href:"";};let m=[i.MovedPermanently,i.ResourceMoved,i.SeeOther,i.TemporaryRedirect,i.PermanentRedirect],g=[i.BadGateway,i.ServiceUnavailable,i.GatewayTimeout],w=["OPTIONS","GET","DELETE","HEAD"];class x extends Error{constructor(e,t){super(e),this.name="HttpClientError",this.statusCode=t,Object.setPrototypeOf(this,x.prototype);}}e.exports.HttpClientError=x;class E{constructor(e){this.message=e;}readBody(){return u(this,void 0,void 0,function*(){return new Promise(e=>u(this,void 0,void 0,function*(){let t=Buffer.alloc(0);this.message.on("data",e=>{t=Buffer.concat([t,e]);}),this.message.on("end",()=>{e(t.toString());});}));});}readBodyBuffer(){return u(this,void 0,void 0,function*(){return new Promise(e=>u(this,void 0,void 0,function*(){let t=[];this.message.on("data",e=>{t.push(e);}),this.message.on("end",()=>{e(Buffer.concat(t));});}));});}}e.exports.HttpClientResponse=E,e.exports.isHttps=function(e){let t=new URL(e);return"https:"===t.protocol;},e.exports.HttpClient=class{constructor(e,t,r){this._ignoreSslError=!1,this._allowRedirects=!0,this._allowRedirectDowngrade=!1,this._maxRedirects=50,this._allowRetries=!1,this._maxRetries=1,this._keepAlive=!1,this._disposed=!1,this.userAgent=e,this.handlers=t||[],this.requestOptions=r,r&&(null!=r.ignoreSslError&&(this._ignoreSslError=r.ignoreSslError),this._socketTimeout=r.socketTimeout,null!=r.allowRedirects&&(this._allowRedirects=r.allowRedirects),null!=r.allowRedirectDowngrade&&(this._allowRedirectDowngrade=r.allowRedirectDowngrade),null!=r.maxRedirects&&(this._maxRedirects=Math.max(r.maxRedirects,0)),null!=r.keepAlive&&(this._keepAlive=r.keepAlive),null!=r.allowRetries&&(this._allowRetries=r.allowRetries),null!=r.maxRetries&&(this._maxRetries=r.maxRetries));}options(e,t){return u(this,void 0,void 0,function*(){return this.request("OPTIONS",e,null,t||{});});}get(e,t){return u(this,void 0,void 0,function*(){return this.request("GET",e,null,t||{});});}del(e,t){return u(this,void 0,void 0,function*(){return this.request("DELETE",e,null,t||{});});}post(e,t,r){return u(this,void 0,void 0,function*(){return this.request("POST",e,t,r||{});});}patch(e,t,r){return u(this,void 0,void 0,function*(){return this.request("PATCH",e,t,r||{});});}put(e,t,r){return u(this,void 0,void 0,function*(){return this.request("PUT",e,t,r||{});});}head(e,t){return u(this,void 0,void 0,function*(){return this.request("HEAD",e,null,t||{});});}sendStream(e,t,r,n){return u(this,void 0,void 0,function*(){return this.request(e,t,r,n);});}/**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */getJson(e,t={}){return u(this,void 0,void 0,function*(){t[o.Accept]=this._getExistingOrDefaultHeader(t,o.Accept,s.ApplicationJson);let r=yield this.get(e,t);return this._processResponse(r,this.requestOptions);});}postJson(e,t,r={}){return u(this,void 0,void 0,function*(){let n=JSON.stringify(t,null,2);r[o.Accept]=this._getExistingOrDefaultHeader(r,o.Accept,s.ApplicationJson),r[o.ContentType]=this._getExistingOrDefaultHeader(r,o.ContentType,s.ApplicationJson);let i=yield this.post(e,n,r);return this._processResponse(i,this.requestOptions);});}putJson(e,t,r={}){return u(this,void 0,void 0,function*(){let n=JSON.stringify(t,null,2);r[o.Accept]=this._getExistingOrDefaultHeader(r,o.Accept,s.ApplicationJson),r[o.ContentType]=this._getExistingOrDefaultHeader(r,o.ContentType,s.ApplicationJson);let i=yield this.put(e,n,r);return this._processResponse(i,this.requestOptions);});}patchJson(e,t,r={}){return u(this,void 0,void 0,function*(){let n=JSON.stringify(t,null,2);r[o.Accept]=this._getExistingOrDefaultHeader(r,o.Accept,s.ApplicationJson),r[o.ContentType]=this._getExistingOrDefaultHeader(r,o.ContentType,s.ApplicationJson);let i=yield this.patch(e,n,r);return this._processResponse(i,this.requestOptions);});}/**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */request(e,t,r,n){return u(this,void 0,void 0,function*(){let o;if(this._disposed)throw Error("Client has already been disposed.");let s=new URL(t),a=this._prepareRequest(e,s,n),l=this._allowRetries&&w.includes(e)?this._maxRetries+1:1,c=0;do{// Check if it's an authentication challenge
if((o=yield this.requestRaw(a,r))&&o.message&&o.message.statusCode===i.Unauthorized){let e;for(let t of this.handlers)if(t.canHandleAuthentication(o)){e=t;break;}if(e)return e.handleAuthentication(this,a,r);break;}let t=this._maxRedirects;for(;o.message.statusCode&&m.includes(o.message.statusCode)&&this._allowRedirects&&t>0;){let i=o.message.headers.location;if(!i)break;let l=new URL(i);if("https:"===s.protocol&&s.protocol!==l.protocol&&!this._allowRedirectDowngrade)throw Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");// strip authorization header if redirected to a different hostname
if(// we need to finish reading the response before reassigning response
// which will leak the open socket.
yield o.readBody(),l.hostname!==s.hostname)for(let e in n)"authorization"===e.toLowerCase()&&delete n[e];// let's make the request with the new redirectUrl
a=this._prepareRequest(e,l,n),o=yield this.requestRaw(a,r),t--;}if(!o.message.statusCode||!g.includes(o.message.statusCode))break;(c+=1)<l&&(yield o.readBody(),yield this._performExponentialBackoff(c));}while(c<l);return o;});}/**
     * Needs to be called if keepAlive is set to true in request options.
     */dispose(){this._agent&&this._agent.destroy(),this._disposed=!0;}/**
     * Raw request.
     * @param info
     * @param data
     */requestRaw(e,t){return u(this,void 0,void 0,function*(){return new Promise((r,n)=>{this.requestRawWithCallback(e,t,function(e,t){e?n(e):t?r(t):n(Error("Unknown error"));});});});}/**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */requestRawWithCallback(e,t,r){let n;"string"==typeof t&&(e.options.headers||(e.options.headers={}),e.options.headers["Content-Length"]=Buffer.byteLength(t,"utf8"));let i=!1;function o(e,t){i||(i=!0,r(e,t));}let s=e.httpModule.request(e.options,e=>{let t=new E(e);o(void 0,t);});s.on("socket",e=>{n=e;}),// If we ever get disconnected, we want the socket to timeout eventually
s.setTimeout(this._socketTimeout||18e4,()=>{n&&n.end(),o(Error(`Request timeout: ${e.options.path}`));}),s.on("error",function(e){// err has statusCode property
// res should have headers
o(e);}),t&&"string"==typeof t&&s.write(t,"utf8"),t&&"string"!=typeof t?(t.on("close",function(){s.end();}),t.pipe(s)):s.end();}/**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */getAgent(e){let t=new URL(e);return this._getAgent(t);}_prepareRequest(e,t,r){let n={};n.parsedUrl=t;let i="https:"===n.parsedUrl.protocol;// gives handlers an opportunity to participate
if(n.httpModule=i?p:d,n.options={},n.options.host=n.parsedUrl.hostname,n.options.port=n.parsedUrl.port?parseInt(n.parsedUrl.port):i?443:80,n.options.path=(n.parsedUrl.pathname||"")+(n.parsedUrl.search||""),n.options.method=e,n.options.headers=this._mergeHeaders(r),null!=this.userAgent&&(n.options.headers["user-agent"]=this.userAgent),n.options.agent=this._getAgent(n.parsedUrl),this.handlers)for(let e of this.handlers)e.prepareRequest(n.options);return n;}_mergeHeaders(e){return this.requestOptions&&this.requestOptions.headers?Object.assign({},b(this.requestOptions.headers),b(e||{})):b(e||{});}_getExistingOrDefaultHeader(e,t,r){let n;return this.requestOptions&&this.requestOptions.headers&&(n=b(this.requestOptions.headers)[t]),e[t]||n||r;}_getAgent(e){let t;let r=f.getProxyUrl(e),n=r&&r.hostname;// if agent is already assigned use that agent.
if(this._keepAlive&&n&&(t=this._proxyAgent),this._keepAlive&&!n&&(t=this._agent),t)return t;let i="https:"===e.protocol,o=100;// This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
if(this.requestOptions&&(o=this.requestOptions.maxSockets||d.globalAgent.maxSockets),r&&r.hostname){let e={maxSockets:o,keepAlive:this._keepAlive,proxy:Object.assign(Object.assign({},(r.username||r.password)&&{proxyAuth:`${r.username}:${r.password}`}),{host:r.hostname,port:r.port})},n="https:"===r.protocol;t=(i?n?h.httpsOverHttps:h.httpsOverHttp:n?h.httpOverHttps:h.httpOverHttp)(e),this._proxyAgent=t;}// if reusing agent across request and tunneling agent isn't assigned create a new agent
if(this._keepAlive&&!t){let e={keepAlive:this._keepAlive,maxSockets:o};t=i?new p.Agent(e):new d.Agent(e),this._agent=t;}return t||(t=i?p.globalAgent:d.globalAgent),i&&this._ignoreSslError&&(// http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
// we have to cast it to any and change it directly
t.options=Object.assign(t.options||{},{rejectUnauthorized:!1})),t;}_performExponentialBackoff(e){return u(this,void 0,void 0,function*(){e=Math.min(10,e);let t=5*Math.pow(2,e);return new Promise(e=>setTimeout(()=>e(),t));});}_processResponse(e,t){return u(this,void 0,void 0,function*(){return new Promise((r,n)=>u(this,void 0,void 0,function*(){let o,s;let a=e.message.statusCode||0,l={statusCode:a,result:null,headers:{}};a===i.NotFound&&r(l);try{(s=yield e.readBody())&&s.length>0&&(o=t&&t.deserializeDates?JSON.parse(s,// get the result from the body
function(e,t){if("string"==typeof t){let e=new Date(t);if(!isNaN(e.valueOf()))return e;}return t;}):JSON.parse(s),l.result=o),l.headers=e.message.headers;}catch(e){// Invalid resource (contents not json);  leaving result obj null
}// note that 3xx redirects are handled by the http layer.
if(a>299){let e;e=o&&o.message?o.message:s&&s.length>0?s:`Failed request: (${a})`;let t=new x(e,a);t.result=l.result,n(t);}else r(l);}));});}};let b=e=>Object.keys(e).reduce((t,r)=>(t[r.toLowerCase()]=e[r],t),{});}),q.register("9ws9E",function(e,t){function r(e){let t;if(!e.hostname)return!1;let r=e.hostname;if(function(e){let t=e.toLowerCase();return"localhost"===t||t.startsWith("127.")||t.startsWith("[::1]")||t.startsWith("[0:0:0:0:0:0:0:1]");}(r))return!0;let n=process.env.no_proxy||process.env.NO_PROXY||"";if(!n)return!1;e.port?t=Number(e.port):"http:"===e.protocol?t=80:"https:"===e.protocol&&(t=443);// Format the request hostname and hostname with port
let i=[e.hostname.toUpperCase()];// Compare request host against noproxy
for(let e of("number"==typeof t&&i.push(`${i[0]}:${t}`),n.split(",").map(e=>e.trim().toUpperCase()).filter(e=>e)))if("*"===e||i.some(t=>t===e||t.endsWith(`.${e}`)||e.startsWith(".")&&t.endsWith(`${e}`)))return!0;return!1;}Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.checkBypass=e.exports.getProxyUrl=void 0,e.exports.getProxyUrl=function(e){let t="https:"===e.protocol;if(r(e))return;let n=t?process.env.https_proxy||process.env.HTTPS_PROXY:process.env.http_proxy||process.env.HTTP_PROXY;if(n)try{return new URL(n);}catch(e){if(!n.startsWith("http://")&&!n.startsWith("https://"))return new URL(`http://${n}`);}},e.exports.checkBypass=r;}),q.register("eYDoL",function(e,t){e.exports=q("gBbBa");}),q.register("gBbBa",function(e,t){var r,n,i,o,s,a;function l(e){var t=this;t.options=e||{},t.proxyOptions=t.options.proxy||{},t.maxSockets=t.options.maxSockets||v.Agent.defaultMaxSockets,t.requests=[],t.sockets=[],t.on("free",function(e,r,n,i){for(var o=u(r,n,i),s=0,a=t.requests.length;s<a;++s){var l=t.requests[s];if(l.host===o.host&&l.port===o.port){// Detect the request to connect same origin server,
// reuse the connection.
t.requests.splice(s,1),l.request.onSocket(e);return;}}e.destroy(),t.removeSocket(e);});}function c(e,t){var r=this;l.prototype.createSocket.call(r,e,function(n){var i=e.request.getHeader("host"),o=d({},r.options,{socket:n,servername:i?i.replace(/:.*$/,""):e.host}),s=w.connect(0,o);r.sockets[r.sockets.indexOf(n)]=s,t(s);});}function u(e,t,r){return"string"==typeof e?{host:e,port:t,localAddress:r}:e;}function d(e){for(var t=1,r=arguments.length;t<r;++t){var n=arguments[t];if("object"==typeof n)for(var i=Object.keys(n),o=0,s=i.length;o<s;++o){var a=i[o];void 0!==n[a]&&(e[a]=n[a]);}}return e;}F(e.exports,"httpOverHttp",()=>r,e=>r=e),F(e.exports,"httpsOverHttp",()=>n,e=>n=e),F(e.exports,"httpOverHttps",()=>i,e=>i=e),F(e.exports,"httpsOverHttps",()=>o,e=>o=e),F(e.exports,"debug",()=>s,e=>s=e),r=function(e){var t=new l(e);return t.request=v.request,t;},n=function(e){var t=new l(e);return t.request=v.request,t.createSocket=c,t.defaultPort=443,t;},i=function(e){var t=new l(e);return t.request=y.request,t;},o=function(e){var t=new l(e);return t.request=y.request,t.createSocket=c,t.defaultPort=443,t;},b.inherits(l,x.EventEmitter),l.prototype.addRequest=function(e,t,r,n){var i=this,o=d({request:e},i.options,u(t,r,n));if(i.sockets.length>=this.maxSockets){// We are over limit so we'll add it to the queue.
i.requests.push(o);return;}// If we are under maxSockets create a new one.
i.createSocket(o,function(t){function r(){i.emit("free",t,o);}function n(e){i.removeSocket(t),t.removeListener("free",r),t.removeListener("close",n),t.removeListener("agentRemove",n);}t.on("free",r),t.on("close",n),t.on("agentRemove",n),e.onSocket(t);});},l.prototype.createSocket=function(e,t){var r=this,n={};r.sockets.push(n);var i=d({},r.proxyOptions,{method:"CONNECT",path:e.host+":"+e.port,agent:!1,headers:{host:e.host+":"+e.port}});e.localAddress&&(i.localAddress=e.localAddress),i.proxyAuth&&(i.headers=i.headers||{},i.headers["Proxy-Authorization"]="Basic "+new Buffer(i.proxyAuth).toString("base64")),a("making CONNECT request");var o=r.request(i);function s(i,s,l){if(o.removeAllListeners(),s.removeAllListeners(),200!==i.statusCode){a("tunneling socket could not be established, statusCode=%d",i.statusCode),s.destroy();var c=Error("tunneling socket could not be established, statusCode="+i.statusCode);c.code="ECONNRESET",e.request.emit("error",c),r.removeSocket(n);return;}if(l.length>0){a("got illegal response body from proxy"),s.destroy();var c=Error("got illegal response body from proxy");c.code="ECONNRESET",e.request.emit("error",c),r.removeSocket(n);return;}return a("tunneling connection has established"),r.sockets[r.sockets.indexOf(n)]=s,t(s);}o.useChunkedEncodingByDefault=!1,o.once("response",function(e){// Very hacky. This is necessary to avoid http-parser leaks.
e.upgrade=!0;}),o.once("upgrade",function(e,t,r){// Hacky.
process.nextTick(function(){s(e,t,r);});}),o.once("connect",s),o.once("error",function(t){o.removeAllListeners(),a("tunneling socket could not be established, cause=%s\n",t.message,t.stack);var i=Error("tunneling socket could not be established, cause="+t.message);i.code="ECONNRESET",e.request.emit("error",i),r.removeSocket(n);}),o.end();},l.prototype.removeSocket=function(e){var t=this.sockets.indexOf(e);if(-1!==t){this.sockets.splice(t,1);var r=this.requests.shift();r&&// needs to be created to take over in the pool for the one that closed.
this.createSocket(r,function(e){r.request.onSocket(e);});}},s=a=process.env.NODE_DEBUG&&/\btunnel\b/.test(process.env.NODE_DEBUG)?function(){var e=Array.prototype.slice.call(arguments);"string"==typeof e[0]?e[0]="TUNNEL: "+e[0]:e.unshift("TUNNEL:"),console.error.apply(console,e);}:function(){};}),q.register("gaCjs",function(e,t){var r=e.exports&&e.exports.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{l(n.next(e));}catch(e){o(e);}}function a(e){try{l(n.throw(e));}catch(e){o(e);}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t);})).then(s,a);}l((n=n.apply(e,t||[])).next());});};Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.PersonalAccessTokenCredentialHandler=e.exports.BearerCredentialHandler=e.exports.BasicCredentialHandler=void 0,e.exports.BasicCredentialHandler=class{constructor(e,t){this.username=e,this.password=t;}prepareRequest(e){if(!e.headers)throw Error("The request has no headers");e.headers.Authorization=`Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;}// This handler cannot handle 401
canHandleAuthentication(){return!1;}handleAuthentication(){return r(this,void 0,void 0,function*(){throw Error("not implemented");});}},e.exports.BearerCredentialHandler=class{constructor(e){this.token=e;}// currently implements pre-authorization
// TODO: support preAuth = false where it hooks on 401
prepareRequest(e){if(!e.headers)throw Error("The request has no headers");e.headers.Authorization=`Bearer ${this.token}`;}// This handler cannot handle 401
canHandleAuthentication(){return!1;}handleAuthentication(){return r(this,void 0,void 0,function*(){throw Error("not implemented");});}},e.exports.PersonalAccessTokenCredentialHandler=class{constructor(e){this.token=e;}// currently implements pre-authorization
// TODO: support preAuth = false where it hooks on 401
prepareRequest(e){if(!e.headers)throw Error("The request has no headers");e.headers.Authorization=`Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;}// This handler cannot handle 401
canHandleAuthentication(){return!1;}handleAuthentication(){return r(this,void 0,void 0,function*(){throw Error("not implemented");});}};}),q.register("4rwlm",function(e,t){var r=e.exports&&e.exports.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{l(n.next(e));}catch(e){o(e);}}function a(e){try{l(n.throw(e));}catch(e){o(e);}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t);})).then(s,a);}l((n=n.apply(e,t||[])).next());});};Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.summary=e.exports.markdownSummary=e.exports.SUMMARY_DOCS_URL=e.exports.SUMMARY_ENV_VAR=void 0;let{access:n,appendFile:i,writeFile:o}=m.promises;e.exports.SUMMARY_ENV_VAR="GITHUB_STEP_SUMMARY",e.exports.SUMMARY_DOCS_URL="https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";let s=new class{constructor(){this._buffer="";}/**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */filePath(){return r(this,void 0,void 0,function*(){if(this._filePath)return this._filePath;let t=process.env[e.exports.SUMMARY_ENV_VAR];if(!t)throw Error(`Unable to find environment variable for $${e.exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);try{yield n(t,m.constants.R_OK|m.constants.W_OK);}catch(e){throw Error(`Unable to access summary file: '${t}'. Check if the file has correct read/write permissions.`);}return this._filePath=t,this._filePath;});}/**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */wrap(e,t,r={}){let n=Object.entries(r).map(([e,t])=>` ${e}="${t}"`).join("");return t?`<${e}${n}>${t}</${e}>`:`<${e}${n}>`;}/**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */write(e){return r(this,void 0,void 0,function*(){let t=!!(null==e?void 0:e.overwrite),r=yield this.filePath();return yield(t?o:i)(r,this._buffer,{encoding:"utf8"}),this.emptyBuffer();});}/**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */clear(){return r(this,void 0,void 0,function*(){return this.emptyBuffer().write({overwrite:!0});});}/**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */stringify(){return this._buffer;}/**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */isEmptyBuffer(){return 0===this._buffer.length;}/**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */emptyBuffer(){return this._buffer="",this;}/**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */addRaw(e,t=!1){return this._buffer+=e,t?this.addEOL():this;}/**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */addEOL(){return this.addRaw(f.EOL);}/**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */addCodeBlock(e,t){let r=Object.assign({},t&&{lang:t}),n=this.wrap("pre",this.wrap("code",e),r);return this.addRaw(n).addEOL();}/**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */addList(e,t=!1){let r=e.map(e=>this.wrap("li",e)).join(""),n=this.wrap(t?"ol":"ul",r);return this.addRaw(n).addEOL();}/**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */addTable(e){let t=e.map(e=>{let t=e.map(e=>{if("string"==typeof e)return this.wrap("td",e);let{header:t,data:r,colspan:n,rowspan:i}=e,o=Object.assign(Object.assign({},n&&{colspan:n}),i&&{rowspan:i});return this.wrap(t?"th":"td",r,o);}).join("");return this.wrap("tr",t);}).join(""),r=this.wrap("table",t);return this.addRaw(r).addEOL();}/**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */addDetails(e,t){let r=this.wrap("details",this.wrap("summary",e)+t);return this.addRaw(r).addEOL();}/**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */addImage(e,t,r){let{width:n,height:i}=r||{},o=Object.assign(Object.assign({},n&&{width:n}),i&&{height:i}),s=this.wrap("img",null,Object.assign({src:e,alt:t},o));return this.addRaw(s).addEOL();}/**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */addHeading(e,t){let r=`h${t}`,n=["h1","h2","h3","h4","h5","h6"].includes(r)?r:"h1",i=this.wrap(n,e);return this.addRaw(i).addEOL();}/**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */addSeparator(){let e=this.wrap("hr",null);return this.addRaw(e).addEOL();}/**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */addBreak(){let e=this.wrap("br",null);return this.addRaw(e).addEOL();}/**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */addQuote(e,t){let r=Object.assign({},t&&{cite:t}),n=this.wrap("blockquote",e,r);return this.addRaw(n).addEOL();}/**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */addLink(e,t){let r=this.wrap("a",e,{href:t});return this.addRaw(r).addEOL();}}();/**
 * @deprecated use `core.summary`
 */e.exports.markdownSummary=s,e.exports.summary=s;}),q.register("3jp5d",function(e,t){var r=e.exports&&e.exports.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r];}});}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r];}),n=e.exports&&e.exports.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t});}:function(e,t){e.default=t;}),i=e.exports&&e.exports.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.hasOwnProperty.call(e,i)&&r(t,e,i);return n(t,e),t;};Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.toPlatformPath=e.exports.toWin32Path=e.exports.toPosixPath=void 0;let o=i(h);e.exports.toPosixPath=/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */function(e){return e.replace(/[\\]/g,"/");},e.exports.toWin32Path=/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */function(e){return e.replace(/[/]/g,"\\");},e.exports.toPlatformPath=/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */function(e){return e.replace(/[/\\]/g,o.sep);};}),q.register("fXZh0",function(e,t){var r=h.resolve(__dirname,"../../node_modules/.pnpm/numerous@1.0.3/node_modules/numerous/lib");(function(){//=========//
// GLOBALS //
//=========//
var t={},n={create://==================//
// PUBLIC FUNCTIONS //
//==================//
/**
   * Creates new instance of numerous.
   *
   * @param {string} locale
   * @returns {object}
   */function(e){return o(e),{pluralize:function(t,r){return i(e,t,r);}};},addLocale:/**
   * Adds pluralization function for specified locale.
   * Usually externally called by locale itself.
   *
   * @param {string} locale
   * @param {function} callable
   */function(e,r){t[e]=r;},pluralize:i};/**
   * Returns variant from the specified list of variants
   * according to the specified value and locale.
   *
   * @param {string} locale
   * @param {int} value
   * @param {object} variants
   */function i(e,r,n){if(o(e),"object"!=typeof n)throw Error("List of variants should be specified as an object");var i=t[e](r);return void 0!==n[i]?n[i]:null;}/**
   * Checks if locale is loaded. If not, tries to load it.
   *
   * @param {string} locale
   */function o(e){void 0!==t[e]||/**
   * Tries to load the specified locale.
   *
   * @param {string} locale
   */function(e){try{require(r+"/../locales/"+e+".js");}catch(t){throw Error("Failed to load the following locale: "+e);}}(e);}void 0!==e.exports?e.exports=n:this.numerous=n;}).call(e.exports);}),q.register("25uEY",function(e,t){//==============//
// DEPENDENCIES //
//==============//
var r=q("ggaxg"),n=q("crMMK");//================//
// MODULE GLOBALS //
//================//
/**
 * Pre-calculating millisecond values for each time unit.
 */let i=[["years",290304e5],["months",24192e5],["weeks",6048e5],["days",864e5],["hours",36e5],["minutes",6e4],["seconds",1e3]],o={locale:"en",span:2,delimiter:", ",unitType:"long",unitTypeLookupOrder:["long","short","narrow"],autoloadLocales:!0},s={};//===========//
// FUNCTIONS //
//===========//
/**
 * Adds pluralization data for the specified locale.
 * Should be called in browser.
 *
 * @param {Object|Object[]} localeData
 */function a(e){for(let t of(Array.isArray(e)||(e=[e]),e)){let{id:e,data:r}=t;s[e]=r;}}//=========//
// EXPORTS //
//=========//
e.exports={create:/**
 * Creates new instance.
 *
 * @param {object?} config
 *
 * @returns {object}
 */function(e){return(// Initializing config by extending the default one
e=Object.assign({},o,e||{}),{/**
     * Public proxy for internal format function.
     *
     * @param {Date} firstDate
     * @param {Date} secondDate
     * @param {object?} options
     *
     * @returns {string}
     */format:function(t,o,l){return(/**
 * Returns difference between two dates as a text string.
 *
 * @param {Date} firstDate
 * @param {Date} secondDate
 * @param {object} config
 *
 * @returns {string}
 */function(e,t,o){// Handling input arguments
// -----
if(/**
 * Checks if locale is loaded. If not, tries to load it in Node.js,
 * or throws and error in Browser.
 *
 * @param {string} locale
 * @param {Object?} options
 */function(e,t){let{autoload:r}=t;if(!s[e]){if(n&&r)/**
 * Tries to load the specified locale.
 *
 * @param {string} localeId
 */(function(e){try{a(require(`../locales/${e}.js`));}catch(t){throw Error(`Failed to load locale: ${e} from ../locales/${e}.js. If using a bundled time-delta, set 'autoloadLocales: false' in the config: ${t}`);}})(e);else throw Error(`Missing locale: ${e}, you must load it manually before using it`);}}(o.locale,{autoload:o.autoloadLocales}),!e)throw Error("Missing first date argument");if(!t)throw Error("Missing second date argument");// Calculating
// -----
let l=/**
 * Returns difference as separate time units.
 *
 * @param {Date} firstDate
 * @param {Date} secondDate
 *
 * @returns {Array}
 */function(e,t){let r=t-e,n=[];return i.some(function(e){let t=e[0],i=e[1],o=Math.floor(r/i);if(r-=o*i,n.push([t,o]),r<=0)return!0;}),n;}(e,t),c=[];for(let e of l){let[t,n]=e;if(n>0&&c.push(/**
 * Returns localized and pluralized time unit.
 *
 * @param {string} unit
 * @param {int} value
 * @param {object} config
 *
 * @returns {string}
 */function(e,t,n){let i=/**
 * Returns locale data for preferred unit type.
 *
 * @param {object} config
 *
 * @returns {Array}
 */function(e){var t;let r=s[e.locale],n=e.unitTypeLookupOrder.slice();// Adding interested type to the top.
n.unshift(e.unitType),t=n;let i=null;if(// Making sure only unique items are present.
(n=Array.from(new Set(t))).some(function(e){if(void 0!==r[e])// Breaking the loop.
return i=r[e],!0;}),null===i)throw Error("Can not find any unit type data for locale: "+e.locale);return i;}(n),o=r.pluralize(n.locale,t,i[e]);return o.replace("{0}",t);}(t,n,o)),c.length>=o.span)break;}// Returning the string value
return c.join(o.delimiter);}(t,o,// Allowing to override config with each individual call
l=Object.assign({},e,l||{})));}});},addLocale:a,defaultConfig:o};}),q.register("ggaxg",function(e,t){e.exports=q("fXZh0");}),q.register("crMMK",function(e,t){e.exports=!!("undefined"!=typeof process&&process.versions&&process.versions.node);}),q.register("a3PNV",function(e,t){function r(e,t,r){return!!(e.isSymbolicLink()||e.isFile())&&function(e,t){var r=void 0!==t.pathExt?t.pathExt:process.env.PATHEXT;if(!r||-1!==(r=r.split(";")).indexOf(""))return!0;for(var n=0;n<r.length;n++){var i=r[n].toLowerCase();if(i&&e.substr(-i.length).toLowerCase()===i)return!0;}return!1;}(t,r);}function n(e,t,n){m.stat(e,function(i,o){n(i,!i&&r(o,e,t));});}e.exports=n,n.sync=function(e,t){return r(m.statSync(e),e,t);};}),q.register("7gw6J",function(e,t){function r(e,t,r){m.stat(e,function(e,i){r(e,!e&&n(i,t));});}function n(e,t){var r,n,i,o,s,a,l;return e.isFile()&&(r=e.mode,n=e.uid,i=e.gid,o=void 0!==t.uid?t.uid:process.getuid&&process.getuid(),s=void 0!==t.gid?t.gid:process.getgid&&process.getgid(),a=parseInt("100",8),l=parseInt("010",8),r&parseInt("001",8)||r&l&&i===s||r&a&&n===o||r&(a|l)&&0===o);}e.exports=r,r.sync=function(e,t){return n(m.statSync(e),t);};}),q.register("1YMV0",function(e,t){// This is not the set of all possible signals.
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
e.exports=["SIGABRT","SIGALRM","SIGHUP","SIGINT","SIGTERM"],"win32"!==process.platform&&e.exports.push("SIGVTALRM","SIGXCPU","SIGXFSZ","SIGUSR2","SIGTRAP","SIGSYS","SIGQUIT","SIGIOT"),"linux"===process.platform&&e.exports.push("SIGIO","SIGPOLL","SIGPWR","SIGSTKFLT","SIGUNUSED");}),q.register("lJEXJ",function(e,t){// just pre-load all the stuff that index.js lazily exports
var r=q("fB52W"),n=q("juUXZ"),i=q("kxoMX"),o=q("eT4Gq"),s=q("6moLM"),a=q("eJTZB"),l=q("e3PGr"),c=q("dqKDW"),u=q("gPIs5"),d=q("bX9Em"),p=q("iAJEE"),f=q("fHTYs"),h=q("8PQ4n"),m=q("3Z6CK"),g=q("6WviK"),v=q("8cCiP"),y=q("2JTVo"),w=q("bizdR"),x=q("2lHfL"),E=q("9XGBY"),b=q("2zuiw"),S=q("bDcXu"),$=q("lvpAe"),_=q("1um22"),O=q("1ndHP"),C=q("7Dt1t"),I=q("9hSY8"),T=q("ge7Lx"),R=q("gBfHp"),P=q("gxgIF"),A=q("eRxC5"),N=q("aWpPt"),L=q("gGB3p"),k=q("hnV3l"),D=q("3sVLb"),U=q("iqmnd"),j=q("bl7vX"),M=q("1K9I5"),F=q("2qx0f"),B=q("k8BEA"),G=q("4B26j");e.exports={parse:s,valid:a,clean:l,inc:c,diff:u,major:d,minor:p,patch:f,prerelease:h,compare:m,rcompare:g,compareLoose:v,compareBuild:y,sort:w,rsort:x,gt:E,lt:b,eq:S,neq:$,gte:_,lte:O,cmp:C,coerce:I,Comparator:T,Range:R,satisfies:P,toComparators:A,maxSatisfying:N,minSatisfying:L,minVersion:k,validRange:D,outside:U,gtr:j,ltr:M,intersects:F,simplifyRange:B,subset:G,SemVer:i,re:r.re,src:r.src,tokens:r.t,SEMVER_SPEC_VERSION:n.SEMVER_SPEC_VERSION,RELEASE_TYPES:n.RELEASE_TYPES,compareIdentifiers:o.compareIdentifiers,rcompareIdentifiers:o.rcompareIdentifiers};}),q.register("fB52W",function(e,t){var r=q("juUXZ"),n=r.MAX_SAFE_COMPONENT_LENGTH,i=r.MAX_SAFE_BUILD_LENGTH,o=r.MAX_LENGTH,s=q("3Zcn3");t=e.exports={};// The actual regexps go on exports.re
let a=t.re=[],l=t.safeRe=[],c=t.src=[],u=t.t={},d=0,p="[a-zA-Z0-9-]",f=[["\\s",1],["\\d",o],[p,i]],h=e=>{for(let[t,r]of f)e=e.split(`${t}*`).join(`${t}{0,${r}}`).split(`${t}+`).join(`${t}{1,${r}}`);return e;},m=(e,t,r)=>{let n=h(t),i=d++;s(e,i,t),u[e]=i,c[i]=t,a[i]=new RegExp(t,r?"g":void 0),l[i]=new RegExp(n,r?"g":void 0);};// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.
// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.
m("NUMERICIDENTIFIER","0|[1-9]\\d*"),m("NUMERICIDENTIFIERLOOSE","\\d+"),// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.
m("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${p}*`),// ## Main Version
// Three dot-separated numeric identifiers.
m("MAINVERSION",`(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`),m("MAINVERSIONLOOSE",`(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`),// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.
m("PRERELEASEIDENTIFIER",`(?:${c[u.NUMERICIDENTIFIER]}|${c[u.NONNUMERICIDENTIFIER]})`),m("PRERELEASEIDENTIFIERLOOSE",`(?:${c[u.NUMERICIDENTIFIERLOOSE]}|${c[u.NONNUMERICIDENTIFIER]})`),// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.
m("PRERELEASE",`(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`),m("PRERELEASELOOSE",`(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`),// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.
m("BUILDIDENTIFIER",`${p}+`),// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.
m("BUILD",`(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`),// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.
// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.
m("FULLPLAIN",`v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`),m("FULL",`^${c[u.FULLPLAIN]}$`),// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
m("LOOSEPLAIN",`[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`),m("LOOSE",`^${c[u.LOOSEPLAIN]}$`),m("GTLT","((?:<|>)?=?)"),// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
m("XRANGEIDENTIFIERLOOSE",`${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),m("XRANGEIDENTIFIER",`${c[u.NUMERICIDENTIFIER]}|x|X|\\*`),m("XRANGEPLAIN",`[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`),m("XRANGEPLAINLOOSE",`[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`),m("XRANGE",`^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`),m("XRANGELOOSE",`^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`),// Coercion.
// Extract anything that could conceivably be a part of a valid semver
m("COERCE",`(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?(?:$|[^\\d])`),m("COERCERTL",c[u.COERCE],!0),// Tilde ranges.
// Meaning is "reasonably at or greater than"
m("LONETILDE","(?:~>?)"),m("TILDETRIM",`(\\s*)${c[u.LONETILDE]}\\s+`,!0),t.tildeTrimReplace="$1~",m("TILDE",`^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`),m("TILDELOOSE",`^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`),// Caret ranges.
// Meaning is "at least and backwards compatible with"
m("LONECARET","(?:\\^)"),m("CARETTRIM",`(\\s*)${c[u.LONECARET]}\\s+`,!0),t.caretTrimReplace="$1^",m("CARET",`^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`),m("CARETLOOSE",`^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`),// A simple gt/lt/eq thing, or just "" to indicate "any version"
m("COMPARATORLOOSE",`^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`),m("COMPARATOR",`^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`),// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
m("COMPARATORTRIM",`(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`,!0),t.comparatorTrimReplace="$1$2$3",// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
m("HYPHENRANGE",`^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`),m("HYPHENRANGELOOSE",`^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`),// Star ranges basically just allow anything at all.
m("STAR","(<|>)?=?\\s*\\*"),// >=0.0.0 is like a star
m("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$"),m("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$");}),q.register("juUXZ",function(e,t){let r=Number.MAX_SAFE_INTEGER||/* istanbul ignore next */9007199254740991;e.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:16,MAX_SAFE_BUILD_LENGTH:250,MAX_SAFE_INTEGER:r,RELEASE_TYPES:["major","premajor","minor","preminor","patch","prepatch","prerelease"],SEMVER_SPEC_VERSION:"2.0.0",FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2};}),q.register("3Zcn3",function(e,t){let r="object"==typeof process&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?(...e)=>console.error("SEMVER",...e):()=>{};e.exports=r;}),q.register("kxoMX",function(e,t){var r=q("3Zcn3"),n=q("juUXZ"),i=n.MAX_LENGTH,o=n.MAX_SAFE_INTEGER,s=q("fB52W"),a=s.safeRe,l=s.t,c=q("ifDVe"),u=q("eT4Gq").compareIdentifiers;class d{constructor(e,t){if(t=c(t),e instanceof d){if(!!t.loose===e.loose&&!!t.includePrerelease===e.includePrerelease)return e;e=e.version;}else if("string"!=typeof e)throw TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>i)throw TypeError(`version is longer than ${i} characters`);r("SemVer",e,t),this.options=t,this.loose=!!t.loose,// this isn't actually relevant for versions, but keep it so that we
// don't run into trouble passing this.options around.
this.includePrerelease=!!t.includePrerelease;let n=e.trim().match(t.loose?a[l.LOOSE]:a[l.FULL]);if(!n)throw TypeError(`Invalid Version: ${e}`);if(this.raw=e,// these are actually numbers
this.major=+n[1],this.minor=+n[2],this.patch=+n[3],this.major>o||this.major<0)throw TypeError("Invalid major version");if(this.minor>o||this.minor<0)throw TypeError("Invalid minor version");if(this.patch>o||this.patch<0)throw TypeError("Invalid patch version");n[4]?this.prerelease=n[4].split(".").map(e=>{if(/^[0-9]+$/.test(e)){let t=+e;if(t>=0&&t<o)return t;}return e;}):this.prerelease=[],this.build=n[5]?n[5].split("."):[],this.format();}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version;}toString(){return this.version;}compare(e){if(r("SemVer.compare",this.version,this.options,e),!(e instanceof d)){if("string"==typeof e&&e===this.version)return 0;e=new d(e,this.options);}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e);}compareMain(e){return e instanceof d||(e=new d(e,this.options)),u(this.major,e.major)||u(this.minor,e.minor)||u(this.patch,e.patch);}comparePre(e){// NOT having a prerelease is > having one
if(e instanceof d||(e=new d(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let t=0;do{let n=this.prerelease[t],i=e.prerelease[t];if(r("prerelease compare",t,n,i),void 0===n&&void 0===i)return 0;if(void 0===i)return 1;if(void 0===n)return-1;if(n===i)continue;else return u(n,i);}while(++t);}compareBuild(e){e instanceof d||(e=new d(e,this.options));let t=0;do{let n=this.build[t],i=e.build[t];if(r("prerelease compare",t,n,i),void 0===n&&void 0===i)return 0;if(void 0===i)return 1;if(void 0===n)return-1;if(n===i)continue;else return u(n,i);}while(++t);}// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
inc(e,t,r){switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",t,r);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",t,r);break;case"prepatch":// If this is already a prerelease, it will bump to the next version
// drop any prereleases that might already exist, since they are not
// relevant at this point.
this.prerelease.length=0,this.inc("patch",t,r),this.inc("pre",t,r);break;// If the input is a non-prerelease version, this acts the same as
// prepatch.
case"prerelease":0===this.prerelease.length&&this.inc("patch",t,r),this.inc("pre",t,r);break;case"major":(0!==this.minor||0!==this.patch||0===this.prerelease.length)&&this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":(0!==this.patch||0===this.prerelease.length)&&this.minor++,this.patch=0,this.prerelease=[];break;case"patch":0===this.prerelease.length&&this.patch++,this.prerelease=[];break;// This probably shouldn't be used publicly.
// 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
case"pre":{let e=Number(r)?1:0;if(!t&&!1===r)throw Error("invalid increment argument: identifier is empty");if(0===this.prerelease.length)this.prerelease=[e];else{let n=this.prerelease.length;for(;--n>=0;)"number"==typeof this.prerelease[n]&&(this.prerelease[n]++,n=-2);if(-1===n){// didn't increment anything
if(t===this.prerelease.join(".")&&!1===r)throw Error("invalid increment argument: identifier already exists");this.prerelease.push(e);}}if(t){// 1.2.0-beta.1 bumps to 1.2.0-beta.2,
// 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
let n=[t,e];!1===r&&(n=[t]),0===u(this.prerelease[0],t)?isNaN(this.prerelease[1])&&(this.prerelease=n):this.prerelease=n;}break;}default:throw Error(`invalid increment argument: ${e}`);}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this;}}e.exports=d;}),q.register("ifDVe",function(e,t){// parse out just the options we care about
let r=Object.freeze({loose:!0}),n=Object.freeze({});e.exports=e=>e?"object"!=typeof e?r:e:n;}),q.register("eT4Gq",function(e,t){let r=/^[0-9]+$/,n=(e,t)=>{let n=r.test(e),i=r.test(t);return n&&i&&(e=+e,t=+t),e===t?0:n&&!i?-1:i&&!n?1:e<t?-1:1;};e.exports={compareIdentifiers:n,rcompareIdentifiers:(e,t)=>n(t,e)};}),q.register("6moLM",function(e,t){var r=q("kxoMX");e.exports=(e,t,n=!1)=>{if(e instanceof r)return e;try{return new r(e,t);}catch(e){if(!n)return null;throw e;}};}),q.register("eJTZB",function(e,t){var r=q("6moLM");e.exports=(e,t)=>{let n=r(e,t);return n?n.version:null;};}),q.register("e3PGr",function(e,t){var r=q("6moLM");e.exports=(e,t)=>{let n=r(e.trim().replace(/^[=v]+/,""),t);return n?n.version:null;};}),q.register("dqKDW",function(e,t){var r=q("kxoMX");e.exports=(e,t,n,i,o)=>{"string"==typeof n&&(o=i,i=n,n=void 0);try{return new r(e instanceof r?e.version:e,n).inc(t,i,o).version;}catch(e){return null;}};}),q.register("gPIs5",function(e,t){var r=q("6moLM");e.exports=(e,t)=>{let n=r(e,null,!0),i=r(t,null,!0),o=n.compare(i);if(0===o)return null;let s=o>0,a=s?n:i,l=s?i:n,c=!!a.prerelease.length,u=!!l.prerelease.length;if(u&&!c)return(// Going from prerelease -> no prerelease requires some special casing
// If the low version has only a major, then it will always be a major
// Some examples:
// 1.0.0-1 -> 1.0.0
// 1.0.0-1 -> 1.1.1
// 1.0.0-1 -> 2.0.0
l.patch||l.minor?a.patch?"patch":a.minor?"minor":"major":"major");// add the `pre` prefix if we are going to a prerelease version
let d=c?"pre":"";return n.major!==i.major?d+"major":n.minor!==i.minor?d+"minor":n.patch!==i.patch?d+"patch":"prerelease";};}),q.register("bX9Em",function(e,t){var r=q("kxoMX");e.exports=(e,t)=>new r(e,t).major;}),q.register("iAJEE",function(e,t){var r=q("kxoMX");e.exports=(e,t)=>new r(e,t).minor;}),q.register("fHTYs",function(e,t){var r=q("kxoMX");e.exports=(e,t)=>new r(e,t).patch;}),q.register("8PQ4n",function(e,t){var r=q("6moLM");e.exports=(e,t)=>{let n=r(e,t);return n&&n.prerelease.length?n.prerelease:null;};}),q.register("3Z6CK",function(e,t){var r=q("kxoMX");e.exports=(e,t,n)=>new r(e,n).compare(new r(t,n));}),q.register("6WviK",function(e,t){var r=q("3Z6CK");e.exports=(e,t,n)=>r(t,e,n);}),q.register("8cCiP",function(e,t){var r=q("3Z6CK");e.exports=(e,t)=>r(e,t,!0);}),q.register("2JTVo",function(e,t){var r=q("kxoMX");e.exports=(e,t,n)=>{let i=new r(e,n),o=new r(t,n);return i.compare(o)||i.compareBuild(o);};}),q.register("bizdR",function(e,t){var r=q("2JTVo");e.exports=(e,t)=>e.sort((e,n)=>r(e,n,t));}),q.register("2lHfL",function(e,t){var r=q("2JTVo");e.exports=(e,t)=>e.sort((e,n)=>r(n,e,t));}),q.register("9XGBY",function(e,t){var r=q("3Z6CK");e.exports=(e,t,n)=>r(e,t,n)>0;}),q.register("2zuiw",function(e,t){var r=q("3Z6CK");e.exports=(e,t,n)=>0>r(e,t,n);}),q.register("bDcXu",function(e,t){var r=q("3Z6CK");e.exports=(e,t,n)=>0===r(e,t,n);}),q.register("lvpAe",function(e,t){var r=q("3Z6CK");e.exports=(e,t,n)=>0!==r(e,t,n);}),q.register("1um22",function(e,t){var r=q("3Z6CK");e.exports=(e,t,n)=>r(e,t,n)>=0;}),q.register("1ndHP",function(e,t){var r=q("3Z6CK");e.exports=(e,t,n)=>0>=r(e,t,n);}),q.register("7Dt1t",function(e,t){var r=q("bDcXu"),n=q("lvpAe"),i=q("9XGBY"),o=q("1um22"),s=q("2zuiw"),a=q("1ndHP");e.exports=(e,t,l,c)=>{switch(t){case"===":return"object"==typeof e&&(e=e.version),"object"==typeof l&&(l=l.version),e===l;case"!==":return"object"==typeof e&&(e=e.version),"object"==typeof l&&(l=l.version),e!==l;case"":case"=":case"==":return r(e,l,c);case"!=":return n(e,l,c);case">":return i(e,l,c);case">=":return o(e,l,c);case"<":return s(e,l,c);case"<=":return a(e,l,c);default:throw TypeError(`Invalid operator: ${t}`);}};}),q.register("9hSY8",function(e,t){var r=q("kxoMX"),n=q("6moLM"),i=q("fB52W"),o=i.safeRe,s=i.t;e.exports=(e,t)=>{if(e instanceof r)return e;if("number"==typeof e&&(e=String(e)),"string"!=typeof e)return null;let i=null;if((t=t||{}).rtl){// Find the right-most coercible string that does not share
// a terminus with a more left-ward coercible string.
// Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
//
// Walk through the string checking with a /g regexp
// Manually set the index so as to pick up overlapping matches.
// Stop when we get a match that ends at the string end, since no
// coercible string can be more right-ward without the same terminus.
let t;for(;(t=o[s.COERCERTL].exec(e))&&(!i||i.index+i[0].length!==e.length);)i&&t.index+t[0].length===i.index+i[0].length||(i=t),o[s.COERCERTL].lastIndex=t.index+t[1].length+t[2].length;// leave it in a clean state
o[s.COERCERTL].lastIndex=-1;}else i=e.match(o[s.COERCE]);return null===i?null:n(`${i[2]}.${i[3]||"0"}.${i[4]||"0"}`,t);};}),q.register("ge7Lx",function(e,t){let r=Symbol("SemVer ANY");// hoisted class for cyclic dependency
class n{static get ANY(){return r;}constructor(e,t){if(t=i(t),e instanceof n){if(!!t.loose===e.loose)return e;e=e.value;}c("comparator",e=e.trim().split(/\s+/).join(" "),t),this.options=t,this.loose=!!t.loose,this.parse(e),this.semver===r?this.value="":this.value=this.operator+this.semver.version,c("comp",this);}parse(e){let t=this.options.loose?s[a.COMPARATORLOOSE]:s[a.COMPARATOR],n=e.match(t);if(!n)throw TypeError(`Invalid comparator: ${e}`);this.operator=void 0!==n[1]?n[1]:"","="===this.operator&&(this.operator=""),n[2]?this.semver=new u(n[2],this.options.loose):this.semver=r;}toString(){return this.value;}test(e){if(c("Comparator.test",e,this.options.loose),this.semver===r||e===r)return!0;if("string"==typeof e)try{e=new u(e,this.options);}catch(e){return!1;}return l(e,this.operator,this.semver,this.options);}intersects(e,t){if(!(e instanceof n))throw TypeError("a Comparator is required");return""===this.operator?""===this.value||new d(e.value,t).test(this.value):""===e.operator?""===e.value||new d(this.value,t).test(e.semver):// Special cases where nothing can possibly be lower
!((t=i(t)).includePrerelease&&("<0.0.0-0"===this.value||"<0.0.0-0"===e.value)||!t.includePrerelease&&(this.value.startsWith("<0.0.0")||e.value.startsWith("<0.0.0")))&&!!(this.operator.startsWith(">")&&e.operator.startsWith(">")||this.operator.startsWith("<")&&e.operator.startsWith("<")||this.semver.version===e.semver.version&&this.operator.includes("=")&&e.operator.includes("=")||l(this.semver,"<",e.semver,t)&&this.operator.startsWith(">")&&e.operator.startsWith("<")||l(this.semver,">",e.semver,t)&&this.operator.startsWith("<")&&e.operator.startsWith(">"));}}e.exports=n;var i=q("ifDVe"),o=q("fB52W"),s=o.safeRe,a=o.t,l=q("7Dt1t"),c=q("3Zcn3"),u=q("kxoMX"),d=q("gBfHp");}),q.register("gBfHp",function(e,t){// hoisted class for cyclic dependency
class r{constructor(e,t){if(t=o(t),e instanceof r){if(!!t.loose===e.loose&&!!t.includePrerelease===e.includePrerelease)return e;return new r(e.raw,t);}if(e instanceof s)return(// just put it in the set and return
this.raw=e.value,this.set=[[e]],this.format(),this);if(this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease,// First reduce all whitespace as much as possible so we do not have to rely
// on potentially slow regexes like \s*. This is then stored and used for
// future error messages as well.
this.raw=e.trim().split(/\s+/).join(" "),// First, split on ||
this.set=this.raw.split("||")// map the range to a 2d array of comparators
.map(e=>this.parseRange(e.trim()))// throw out any comparator lists that are empty
// this generally means that it was not a valid range, which is allowed
// in loose mode, but will still throw if the WHOLE range is invalid.
.filter(e=>e.length),!this.set.length)throw TypeError(`Invalid SemVer Range: ${this.raw}`);// if we have any that are not the null set, throw out null sets.
if(this.set.length>1){// keep the first one, in case they're all null sets
let e=this.set[0];if(this.set=this.set.filter(e=>!y(e[0])),0===this.set.length)this.set=[e];else if(this.set.length>1)// if we have any that are *, then the range is just *
{for(let e of this.set)if(1===e.length&&w(e[0])){this.set=[e];break;}}}this.format();}format(){return this.range=this.set.map(e=>e.join(" ").trim()).join("||").trim(),this.range;}toString(){return this.range;}parseRange(e){// memoize range parsing for performance.
// this is a very hot path, and fully deterministic.
let t=(this.options.includePrerelease&&g)|(this.options.loose&&v),r=t+":"+e,n=i.get(r);if(n)return n;let o=this.options.loose,l=o?u[d.HYPHENRANGELOOSE]:u[d.HYPHENRANGE];a("hyphen replace",e=e.replace(l,P(this.options.includePrerelease))),a("comparator trim",// `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
e=e.replace(u[d.COMPARATORTRIM],p)),a("tilde trim",// `~ 1.2.3` => `~1.2.3`
e=e.replace(u[d.TILDETRIM],f)),a("caret trim",// `^ 1.2.3` => `^1.2.3`
e=e.replace(u[d.CARETTRIM],h));// At this point, the range is completely trimmed and
// ready to be split into comparators.
let c=e.split(" ").map(e=>E(e,this.options)).join(" ").split(/\s+/)// >=0.0.0 is equivalent to *
.map(e=>R(e,this.options));o&&(c=c.filter(e=>(a("loose invalid filter",e,this.options),!!e.match(u[d.COMPARATORLOOSE])))),a("range list",c);// if any comparators are the null set, then replace with JUST null set
// if more than one comparator, remove any * comparators
// also, don't include the same comparator more than once
let m=new Map(),w=c.map(e=>new s(e,this.options));for(let e of w){if(y(e))return[e];m.set(e.value,e);}m.size>1&&m.has("")&&m.delete("");let x=[...m.values()];return i.set(r,x),x;}intersects(e,t){if(!(e instanceof r))throw TypeError("a Range is required");return this.set.some(r=>x(r,t)&&e.set.some(e=>x(e,t)&&r.every(r=>e.every(e=>r.intersects(e,t)))));}// if ANY of the sets match ALL of its comparators, then pass
test(e){if(!e)return!1;if("string"==typeof e)try{e=new l(e,this.options);}catch(e){return!1;}for(let t=0;t<this.set.length;t++)if(A(this.set[t],e,this.options))return!0;return!1;}}e.exports=r;var n=q("l6u7r");let i=new n({max:1e3});var o=q("ifDVe"),s=q("ge7Lx"),a=q("3Zcn3"),l=q("kxoMX"),c=q("fB52W"),u=c.safeRe,d=c.t,p=c.comparatorTrimReplace,f=c.tildeTrimReplace,h=c.caretTrimReplace,m=q("juUXZ"),g=m.FLAG_INCLUDE_PRERELEASE,v=m.FLAG_LOOSE;let y=e=>"<0.0.0-0"===e.value,w=e=>""===e.value,x=(e,t)=>{let r=!0,n=e.slice(),i=n.pop();for(;r&&n.length;)r=n.every(e=>i.intersects(e,t)),i=n.pop();return r;},E=(e,t)=>(a("comp",e,t),a("caret",e=_(e,t)),a("tildes",e=S(e,t)),a("xrange",e=C(e,t)),a("stars",e=T(e,t)),e),b=e=>!e||"x"===e.toLowerCase()||"*"===e,S=(e,t)=>e.trim().split(/\s+/).map(e=>$(e,t)).join(" "),$=(e,t)=>{let r=t.loose?u[d.TILDELOOSE]:u[d.TILDE];return e.replace(r,(t,r,n,i,o)=>{let s;return a("tilde",e,t,r,n,i,o),b(r)?s="":b(n)?s=`>=${r}.0.0 <${+r+1}.0.0-0`:b(i)?s=`>=${r}.${n}.0 <${r}.${+n+1}.0-0`:o?(a("replaceTilde pr",o),s=`>=${r}.${n}.${i}-${o} <${r}.${+n+1}.0-0`):s=`>=${r}.${n}.${i} <${r}.${+n+1}.0-0`,a("tilde return",s),s;});},_=(e,t)=>e.trim().split(/\s+/).map(e=>O(e,t)).join(" "),O=(e,t)=>{a("caret",e,t);let r=t.loose?u[d.CARETLOOSE]:u[d.CARET],n=t.includePrerelease?"-0":"";return e.replace(r,(t,r,i,o,s)=>{let l;return a("caret",e,t,r,i,o,s),b(r)?l="":b(i)?l=`>=${r}.0.0${n} <${+r+1}.0.0-0`:b(o)?l="0"===r?`>=${r}.${i}.0${n} <${r}.${+i+1}.0-0`:`>=${r}.${i}.0${n} <${+r+1}.0.0-0`:s?(a("replaceCaret pr",s),l="0"===r?"0"===i?`>=${r}.${i}.${o}-${s} <${r}.${i}.${+o+1}-0`:`>=${r}.${i}.${o}-${s} <${r}.${+i+1}.0-0`:`>=${r}.${i}.${o}-${s} <${+r+1}.0.0-0`):(a("no pr"),l="0"===r?"0"===i?`>=${r}.${i}.${o}${n} <${r}.${i}.${+o+1}-0`:`>=${r}.${i}.${o}${n} <${r}.${+i+1}.0-0`:`>=${r}.${i}.${o} <${+r+1}.0.0-0`),a("caret return",l),l;});},C=(e,t)=>(a("replaceXRanges",e,t),e.split(/\s+/).map(e=>I(e,t)).join(" ")),I=(e,t)=>{e=e.trim();let r=t.loose?u[d.XRANGELOOSE]:u[d.XRANGE];return e.replace(r,(r,n,i,o,s,l)=>{a("xRange",e,r,n,i,o,s,l);let c=b(i),u=c||b(o),d=u||b(s);return"="===n&&d&&(n=""),// if we're including prereleases in the match, then we need
// to fix this to -0, the lowest possible prerelease value
l=t.includePrerelease?"-0":"",c?r=">"===n||"<"===n?"<0.0.0-0":"*":n&&d?(u&&(o=0),s=0,">"===n?(// >1 => >=2.0.0
// >1.2 => >=1.3.0
n=">=",u?(i=+i+1,o=0):o=+o+1,s=0):"<="===n&&(// <=0.7.x is actually <0.8.0, since any 0.7.x should
// pass.  Similarly, <=7.x is actually <8.0.0, etc.
n="<",u?i=+i+1:o=+o+1),"<"===n&&(l="-0"),r=`${n+i}.${o}.${s}${l}`):u?r=`>=${i}.0.0${l} <${+i+1}.0.0-0`:d&&(r=`>=${i}.${o}.0${l} <${i}.${+o+1}.0-0`),a("xRange return",r),r;});},T=(e,t)=>(a("replaceStars",e,t),e.trim().replace(u[d.STAR],"")),R=(e,t)=>(a("replaceGTE0",e,t),e.trim().replace(u[t.includePrerelease?d.GTE0PRE:d.GTE0],"")),P=e=>(t,r,n,i,o,s,a,l,c,u,d,p,f)=>`${r=b(n)?"":b(i)?`>=${n}.0.0${e?"-0":""}`:b(o)?`>=${n}.${i}.0${e?"-0":""}`:s?`>=${r}`:`>=${r}${e?"-0":""}`} ${l=b(c)?"":b(u)?`<${+c+1}.0.0-0`:b(d)?`<${c}.${+u+1}.0-0`:p?`<=${c}.${u}.${d}-${p}`:e?`<${c}.${u}.${+d+1}-0`:`<=${l}`}`.trim(),A=(e,t,r)=>{for(let r=0;r<e.length;r++)if(!e[r].test(t))return!1;if(t.prerelease.length&&!r.includePrerelease){// Find the set of versions that are allowed to have prereleases
// For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
// That should allow `1.2.3-pr.2` to pass.
// However, `1.2.4-alpha.notready` should NOT be allowed,
// even though it's within the range set by the comparators.
for(let r=0;r<e.length;r++)if(a(e[r].semver),e[r].semver!==s.ANY&&e[r].semver.prerelease.length>0){let n=e[r].semver;if(n.major===t.major&&n.minor===t.minor&&n.patch===t.patch)return!0;}// Version has a -pre, but it's not one of the ones we like.
return!1;}return!0;};}),q.register("l6u7r",function(e,t){var r=q("hDmTp");let n=Symbol("max"),i=Symbol("length"),o=Symbol("lengthCalculator"),s=Symbol("allowStale"),a=Symbol("maxAge"),l=Symbol("dispose"),c=Symbol("noDisposeOnSet"),u=Symbol("lruList"),d=Symbol("cache"),p=Symbol("updateAgeOnGet"),f=()=>1,h=(e,t,r)=>{let n=e[d].get(t);if(n){let t=n.value;if(m(e,t)){if(v(e,n),!e[s])return;}else r&&(e[p]&&(n.value.now=Date.now()),e[u].unshiftNode(n));return t.value;}},m=(e,t)=>{if(!t||!t.maxAge&&!e[a])return!1;let r=Date.now()-t.now;return t.maxAge?r>t.maxAge:e[a]&&r>e[a];},g=e=>{if(e[i]>e[n])for(let t=e[u].tail;e[i]>e[n]&&null!==t;){// We know that we're about to delete this one, and also
// what the next least recently used key will be, so just
// go ahead and set it now.
let r=t.prev;v(e,t),t=r;}},v=(e,t)=>{if(t){let r=t.value;e[l]&&e[l](r.key,r.value),e[i]-=r.length,e[d].delete(r.key),e[u].removeNode(t);}};class y{constructor(e,t,r,n,i){this.key=e,this.value=t,this.length=r,this.now=n,this.maxAge=i||0;}}let w=(e,t,r,n)=>{let i=r.value;m(e,i)&&(v(e,r),e[s]||(i=void 0)),i&&t.call(n,i.value,i.key,e);};e.exports=// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class{constructor(e){if("number"==typeof e&&(e={max:e}),e||(e={}),e.max&&("number"!=typeof e.max||e.max<0))throw TypeError("max must be a non-negative number");this[n]=e.max||1/0;let t=e.length||f;if(this[o]="function"!=typeof t?f:t,this[s]=e.stale||!1,e.maxAge&&"number"!=typeof e.maxAge)throw TypeError("maxAge must be a number");this[a]=e.maxAge||0,this[l]=e.dispose,this[c]=e.noDisposeOnSet||!1,this[p]=e.updateAgeOnGet||!1,this.reset();}// resize the cache when the max changes.
set max(e){if("number"!=typeof e||e<0)throw TypeError("max must be a non-negative number");this[n]=e||1/0,g(this);}get max(){return this[n];}set allowStale(e){this[s]=!!e;}get allowStale(){return this[s];}set maxAge(e){if("number"!=typeof e)throw TypeError("maxAge must be a non-negative number");this[a]=e,g(this);}get maxAge(){return this[a];}// resize the cache when the lengthCalculator changes.
set lengthCalculator(e){"function"!=typeof e&&(e=f),e!==this[o]&&(this[o]=e,this[i]=0,this[u].forEach(e=>{e.length=this[o](e.value,e.key),this[i]+=e.length;})),g(this);}get lengthCalculator(){return this[o];}get length(){return this[i];}get itemCount(){return this[u].length;}rforEach(e,t){t=t||this;for(let r=this[u].tail;null!==r;){let n=r.prev;w(this,e,r,t),r=n;}}forEach(e,t){t=t||this;for(let r=this[u].head;null!==r;){let n=r.next;w(this,e,r,t),r=n;}}keys(){return this[u].toArray().map(e=>e.key);}values(){return this[u].toArray().map(e=>e.value);}reset(){this[l]&&this[u]&&this[u].length&&this[u].forEach(e=>this[l](e.key,e.value)),this[d]=new Map()// hash of items by key
,this[u]=new r()// list of items in order of use recency
,this[i]=0;// length of items in the list
}dump(){return this[u].map(e=>!m(this,e)&&{k:e.key,v:e.value,e:e.now+(e.maxAge||0)}).toArray().filter(e=>e);}dumpLru(){return this[u];}set(e,t,r){if((r=r||this[a])&&"number"!=typeof r)throw TypeError("maxAge must be a number");let s=r?Date.now():0,p=this[o](t,e);if(this[d].has(e)){if(p>this[n])return v(this,this[d].get(e)),!1;let o=this[d].get(e),a=o.value;return this[l]&&!this[c]&&this[l](e,a.value),a.now=s,a.maxAge=r,a.value=t,this[i]+=p-a.length,a.length=p,this.get(e),g(this),!0;}let f=new y(e,t,p,s,r);return(// oversized objects fall out of cache automatically.
f.length>this[n]?(this[l]&&this[l](e,t),!1):(this[i]+=f.length,this[u].unshift(f),this[d].set(e,this[u].head),g(this),!0));}has(e){if(!this[d].has(e))return!1;let t=this[d].get(e).value;return!m(this,t);}get(e){return h(this,e,!0);}peek(e){return h(this,e,!1);}pop(){let e=this[u].tail;return e?(v(this,e),e.value):null;}del(e){v(this,this[d].get(e));}load(e){// reset the cache
this.reset();let t=Date.now();// A previous serialized cache has the most recent items first
for(let r=e.length-1;r>=0;r--){let n=e[r],i=n.e||0;if(0===i)this.set(n.k,n.v);else{let e=i-t;e>0&&this.set(n.k,n.v,e);}}}prune(){this[d].forEach((e,t)=>h(this,t,!1));}};}),q.register("hDmTp",function(e,t){function r(e){var t=this;if(t instanceof r||(t=new r()),t.tail=null,t.head=null,t.length=0,e&&"function"==typeof e.forEach)e.forEach(function(e){t.push(e);});else if(arguments.length>0)for(var n=0,i=arguments.length;n<i;n++)t.push(arguments[n]);return t;}function n(e,t,r,i){if(!(this instanceof n))return new n(e,t,r,i);this.list=i,this.value=e,t?(t.next=this,this.prev=t):this.prev=null,r?(r.prev=this,this.next=r):this.next=null;}e.exports=r,r.Node=n,r.create=r,r.prototype.removeNode=function(e){if(e.list!==this)throw Error("removing node which does not belong to this list");var t=e.next,r=e.prev;return t&&(t.prev=r),r&&(r.next=t),e===this.head&&(this.head=t),e===this.tail&&(this.tail=r),e.list.length--,e.next=null,e.prev=null,e.list=null,t;},r.prototype.unshiftNode=function(e){if(e!==this.head){e.list&&e.list.removeNode(e);var t=this.head;e.list=this,e.next=t,t&&(t.prev=e),this.head=e,this.tail||(this.tail=e),this.length++;}},r.prototype.pushNode=function(e){if(e!==this.tail){e.list&&e.list.removeNode(e);var t=this.tail;e.list=this,e.prev=t,t&&(t.next=e),this.tail=e,this.head||(this.head=e),this.length++;}},r.prototype.push=function(){for(var e,t=0,r=arguments.length;t<r;t++)e=arguments[t],this.tail=new n(e,this.tail,null,this),this.head||(this.head=this.tail),this.length++;return this.length;},r.prototype.unshift=function(){for(var e,t=0,r=arguments.length;t<r;t++)e=arguments[t],this.head=new n(e,null,this.head,this),this.tail||(this.tail=this.head),this.length++;return this.length;},r.prototype.pop=function(){if(this.tail){var e=this.tail.value;return this.tail=this.tail.prev,this.tail?this.tail.next=null:this.head=null,this.length--,e;}},r.prototype.shift=function(){if(this.head){var e=this.head.value;return this.head=this.head.next,this.head?this.head.prev=null:this.tail=null,this.length--,e;}},r.prototype.forEach=function(e,t){t=t||this;for(var r=this.head,n=0;null!==r;n++)e.call(t,r.value,n,this),r=r.next;},r.prototype.forEachReverse=function(e,t){t=t||this;for(var r=this.tail,n=this.length-1;null!==r;n--)e.call(t,r.value,n,this),r=r.prev;},r.prototype.get=function(e){for(var t=0,r=this.head;null!==r&&t<e;t++)r=r.next;if(t===e&&null!==r)return r.value;},r.prototype.getReverse=function(e){for(var t=0,r=this.tail;null!==r&&t<e;t++)r=r.prev;if(t===e&&null!==r)return r.value;},r.prototype.map=function(e,t){t=t||this;for(var n=new r(),i=this.head;null!==i;)n.push(e.call(t,i.value,this)),i=i.next;return n;},r.prototype.mapReverse=function(e,t){t=t||this;for(var n=new r(),i=this.tail;null!==i;)n.push(e.call(t,i.value,this)),i=i.prev;return n;},r.prototype.reduce=function(e,t){var r,n=this.head;if(arguments.length>1)r=t;else if(this.head)n=this.head.next,r=this.head.value;else throw TypeError("Reduce of empty list with no initial value");for(var i=0;null!==n;i++)r=e(r,n.value,i),n=n.next;return r;},r.prototype.reduceReverse=function(e,t){var r,n=this.tail;if(arguments.length>1)r=t;else if(this.tail)n=this.tail.prev,r=this.tail.value;else throw TypeError("Reduce of empty list with no initial value");for(var i=this.length-1;null!==n;i--)r=e(r,n.value,i),n=n.prev;return r;},r.prototype.toArray=function(){for(var e=Array(this.length),t=0,r=this.head;null!==r;t++)e[t]=r.value,r=r.next;return e;},r.prototype.toArrayReverse=function(){for(var e=Array(this.length),t=0,r=this.tail;null!==r;t++)e[t]=r.value,r=r.prev;return e;},r.prototype.slice=function(e,t){(t=t||this.length)<0&&(t+=this.length),(e=e||0)<0&&(e+=this.length);var n=new r();if(t<e||t<0)return n;e<0&&(e=0),t>this.length&&(t=this.length);for(var i=0,o=this.head;null!==o&&i<e;i++)o=o.next;for(;null!==o&&i<t;i++,o=o.next)n.push(o.value);return n;},r.prototype.sliceReverse=function(e,t){(t=t||this.length)<0&&(t+=this.length),(e=e||0)<0&&(e+=this.length);var n=new r();if(t<e||t<0)return n;e<0&&(e=0),t>this.length&&(t=this.length);for(var i=this.length,o=this.tail;null!==o&&i>t;i--)o=o.prev;for(;null!==o&&i>e;i--,o=o.prev)n.push(o.value);return n;},r.prototype.splice=function(e,t,...r){e>this.length&&(e=this.length-1),e<0&&(e=this.length+e);for(var i=0,o=this.head;null!==o&&i<e;i++)o=o.next;for(var s=[],i=0;o&&i<t;i++)s.push(o.value),o=this.removeNode(o);null===o&&(o=this.tail),o!==this.head&&o!==this.tail&&(o=o.prev);for(var i=0;i<r.length;i++)o=function(e,t,r){var i=t===e.head?new n(r,null,t,e):new n(r,t,t.next,e);return null===i.next&&(e.tail=i),null===i.prev&&(e.head=i),e.length++,i;}(this,o,r[i]);return s;},r.prototype.reverse=function(){for(var e=this.head,t=this.tail,r=e;null!==r;r=r.prev){var n=r.prev;r.prev=r.next,r.next=n;}return this.head=t,this.tail=e,this;};try{// add if support for Symbol.iterator is present
q("hSPNO")(r);}catch(e){}}),q.register("hSPNO",function(e,t){e.exports=function(e){e.prototype[Symbol.iterator]=function*(){for(let e=this.head;e;e=e.next)yield e.value;};};}),q.register("gxgIF",function(e,t){var r=q("gBfHp");e.exports=(e,t,n)=>{try{t=new r(t,n);}catch(e){return!1;}return t.test(e);};}),q.register("eRxC5",function(e,t){var r=q("gBfHp");e.exports=(e,t)=>new r(e,t).set.map(e=>e.map(e=>e.value).join(" ").trim().split(" "));}),q.register("aWpPt",function(e,t){var r=q("kxoMX"),n=q("gBfHp");e.exports=(e,t,i)=>{let o=null,s=null,a=null;try{a=new n(t,i);}catch(e){return null;}return e.forEach(e=>{a.test(e)&&(!o||-1===s.compare(e))&&(// compare(max, v, true)
o=e,s=new r(o,i));}),o;};}),q.register("gGB3p",function(e,t){var r=q("kxoMX"),n=q("gBfHp");e.exports=(e,t,i)=>{let o=null,s=null,a=null;try{a=new n(t,i);}catch(e){return null;}return e.forEach(e=>{a.test(e)&&(!o||1===s.compare(e))&&(// compare(min, v, true)
o=e,s=new r(o,i));}),o;};}),q.register("hnV3l",function(e,t){var r=q("kxoMX"),n=q("gBfHp"),i=q("9XGBY");e.exports=(e,t)=>{e=new n(e,t);let o=new r("0.0.0");if(e.test(o)||(o=new r("0.0.0-0"),e.test(o)))return o;o=null;for(let t=0;t<e.set.length;++t){let n=e.set[t],s=null;n.forEach(e=>{// Clone to avoid manipulating the comparator's semver object.
let t=new r(e.semver.version);switch(e.operator){case">":0===t.prerelease.length?t.patch++:t.prerelease.push(0),t.raw=t.format();/* fallthrough */case"":case">=":(!s||i(t,s))&&(s=t);break;case"<":case"<=":break;/* istanbul ignore next */default:throw Error(`Unexpected operation: ${e.operator}`);}}),s&&(!o||i(o,s))&&(o=s);}return o&&e.test(o)?o:null;};}),q.register("3sVLb",function(e,t){var r=q("gBfHp");e.exports=(e,t)=>{try{// Return '*' instead of '' so that truthiness works.
// This will throw if it's invalid anyway
return new r(e,t).range||"*";}catch(e){return null;}};}),q.register("iqmnd",function(e,t){var r=q("kxoMX"),n=q("ge7Lx");let{ANY:i}=n;var o=q("gBfHp"),s=q("gxgIF"),a=q("9XGBY"),l=q("2zuiw"),c=q("1ndHP"),u=q("1um22");e.exports=(e,t,d,p)=>{let f,h,m,g,v;switch(e=new r(e,p),t=new o(t,p),d){case">":f=a,h=c,m=l,g=">",v=">=";break;case"<":f=l,h=u,m=a,g="<",v="<=";break;default:throw TypeError('Must provide a hilo val of "<" or ">"');}// If it satisfies the range it is not outside
if(s(e,t,p))return!1;// From now on, variable terms are as if we're in "gtr" mode.
// but note that everything is flipped for the "ltr" function.
for(let r=0;r<t.set.length;++r){let o=t.set[r],s=null,a=null;// If the edge version comparator has a operator then our version
// isn't outside it
if(o.forEach(e=>{e.semver===i&&(e=new n(">=0.0.0")),s=s||e,a=a||e,f(e.semver,s.semver,p)?s=e:m(e.semver,a.semver,p)&&(a=e);}),s.operator===g||s.operator===v||(!a.operator||a.operator===g)&&h(e,a.semver)||a.operator===v&&m(e,a.semver))return!1;}return!0;};}),q.register("bl7vX",function(e,t){// Determine if version is greater than all the versions possible in the range.
var r=q("iqmnd");e.exports=(e,t,n)=>r(e,t,">",n);}),q.register("1K9I5",function(e,t){var r=q("iqmnd");e.exports=(e,t,n)=>r(e,t,"<",n);}),q.register("2qx0f",function(e,t){var r=q("gBfHp");e.exports=(e,t,n)=>(e=new r(e,n),t=new r(t,n),e.intersects(t,n));}),q.register("k8BEA",function(e,t){// given a set of versions and a range, create a "simplified" range
// that includes the same versions that the original range does
// If the original range is shorter than the simplified one, return that.
var r=q("gxgIF"),n=q("3Z6CK");e.exports=(e,t,i)=>{let o=[],s=null,a=null,l=e.sort((e,t)=>n(e,t,i));for(let e of l){let n=r(e,t,i);n?(a=e,s||(s=e)):(a&&o.push([s,a]),a=null,s=null);}s&&o.push([s,null]);let c=[];for(let[e,t]of o)e===t?c.push(e):t||e!==l[0]?t?e===l[0]?c.push(`<=${t}`):c.push(`${e} - ${t}`):c.push(`>=${e}`):c.push("*");let u=c.join(" || "),d="string"==typeof t.raw?t.raw:String(t);return u.length<d.length?u:t;};}),q.register("4B26j",function(e,t){var r=q("gBfHp"),n=q("ge7Lx");let{ANY:i}=n;var o=q("gxgIF"),s=q("3Z6CK");let a=[new n(">=0.0.0-0")],l=[new n(">=0.0.0")],c=(e,t,r)=>{let n,c,p,f,h,m,g;if(e===t)return!0;if(1===e.length&&e[0].semver===i){if(1===t.length&&t[0].semver===i)return!0;e=r.includePrerelease?a:l;}if(1===t.length&&t[0].semver===i){if(r.includePrerelease)return!0;t=l;}let v=new Set();for(let t of e)">"===t.operator||">="===t.operator?n=u(n,t,r):"<"===t.operator||"<="===t.operator?c=d(c,t,r):v.add(t.semver);if(v.size>1||n&&c&&((p=s(n.semver,c.semver,r))>0||0===p&&(">="!==n.operator||"<="!==c.operator)))return null;// will iterate one or zero times
for(let e of v){if(n&&!o(e,String(n),r)||c&&!o(e,String(c),r))return null;for(let n of t)if(!o(e,String(n),r))return!1;return!0;}// if the subset has a prerelease, we need a comparator in the superset
// with the same tuple and a prerelease, or it's not a subset
let y=!!c&&!r.includePrerelease&&!!c.semver.prerelease.length&&c.semver,w=!!n&&!r.includePrerelease&&!!n.semver.prerelease.length&&n.semver;for(let e of(y&&1===y.prerelease.length&&"<"===c.operator&&0===y.prerelease[0]&&(y=!1),t)){if(g=g||">"===e.operator||">="===e.operator,m=m||"<"===e.operator||"<="===e.operator,n){if(w&&e.semver.prerelease&&e.semver.prerelease.length&&e.semver.major===w.major&&e.semver.minor===w.minor&&e.semver.patch===w.patch&&(w=!1),">"===e.operator||">="===e.operator){if((f=u(n,e,r))===e&&f!==n)return!1;}else if(">="===n.operator&&!o(n.semver,String(e),r))return!1;}if(c){if(y&&e.semver.prerelease&&e.semver.prerelease.length&&e.semver.major===y.major&&e.semver.minor===y.minor&&e.semver.patch===y.patch&&(y=!1),"<"===e.operator||"<="===e.operator){if((h=d(c,e,r))===e&&h!==c)return!1;}else if("<="===c.operator&&!o(c.semver,String(e),r))return!1;}if(!e.operator&&(c||n)&&0!==p)return!1;}return(!n||!m||!!c||0===p)&&(!c||!g||!!n||0===p)&&!w&&!y;},u=(e,t,r)=>{if(!e)return t;let n=s(e.semver,t.semver,r);return n>0?e:n<0?t:">"===t.operator&&">="===e.operator?t:e;},d=(e,t,r)=>{if(!e)return t;let n=s(e.semver,t.semver,r);return n<0?e:n>0?t:"<"===t.operator&&"<="===e.operator?t:e;};e.exports=(e,t,n={})=>{if(e===t)return!0;e=new r(e,n),t=new r(t,n);let i=!1;e:for(let r of e.set){for(let e of t.set){let t=c(r,e,n);if(i=i||null!==t,t)continue e;}// the null set is a subset of everything, but null simple ranges in
// a complex range should be ignored.  so if we saw a non-null range,
// then we know this isn't a subset, but if EVERY simple range was null,
// then it is a subset.
if(i)return!1;}return!0;};}),q.register("awj79",function(e,t){var r=/[|\\{}()[\]^$+*?.]/g;e.exports=function(e){if("string"!=typeof e)throw TypeError("Expected a string");return e.replace(r,"\\$&");};}),q.register("dOmbL",function(e,t){F(e.exports,"pathExists",()=>r);async function r(e){try{return await(0,S.promises).access(e),!0;}catch{return!1;}}}),q.register("ceI0e",function(e,t){F(e.exports,"addExeExt",()=>l),F(e.exports,"addShExt",()=>d),F(e.exports,"addShRelativePrefix",()=>p),F(e.exports,"dirname",()=>h.dirname),F(e.exports,"join",()=>h.join);var r=q("9ag04"),n=q("923E2");function i(e,t){return Object.keys(t).forEach(r=>{"default"===r||"__esModule"===r||e.hasOwnProperty(r)||Object.defineProperty(e,r,{enumerable:!0,get:()=>t[r]});}),e;}function o(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0});}function s(e,t=!0){return t?(0,h.basename)(e):(0,h.basename)(e,(0,h.extname)(e));}function a(e){return(0,h.normalize)(e).replace(RegExp((0,r.default)(h.sep)+"$"),"");}function l(e,t=".exe",r=""){return"win32"===process.platform?`${e}${t}`:`${e}${r}`;}function c(e,t){let r=(0,h.extname)(e),n=`${t}${(0,h.basename)(e,r)}${r}`;return(0,h.join)((0,h.dirname)(e),n);}function u(e,t){let r=(0,h.extname)(e),n=`${(0,h.basename)(e,r)}${t}${r}`;return(0,h.join)((0,h.dirname)(e),n);}function d(e,t=".cmd",r=".sh"){return"win32"===process.platform?`${e}${t}`:`${e}${r}`;}function p(e){return"win32"===process.platform?e:"./"+e;}function f(e){let t=(0,h.extname)(e).length;return e.slice(0,-t);}function m(e,t){return/*@__PURE__*/B(n)(e,t);}function g(e,t){let r=(0,h.relative)(t,e);return!(!r||".."===r||r.startsWith(".."+h.sep)||r===(0,h.resolve)(e));}var v={},y={};o(y,"name",()=>s);var w={};o(w,"normalizeTrim",()=>a);var x={};o(x,"addExeExt",()=>l);var E={};o(E,"addNamePrefix",()=>c);var b={};o(b,"addNameSuffix",()=>u);var S={};o(S,"addShExt",()=>d);var $={};o($,"addShRelativePrefix",()=>p);var _={};o(_,"removeExt",()=>f);var O={};o(O,"replaceExt",()=>m);var C={};o(C,"isPathInside",()=>g),i(v,y),i(v,w),i(v,x),i(v,E),i(v,b),i(v,S),i(v,$),i(v,_),i(v,O),i(v,C);}),q.register("9ag04",function(e,t){F(e.exports,"default",()=>r);function r(e){if("string"!=typeof e)throw TypeError("Expected a string");// Escape characters with special meaning either inside or outside character sets.
// Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
return e.replace(/[|\\{}()[\]^$+*?.]/g,"\\$&").replace(/-/g,"\\x2d");}}),q.register("923E2",function(e,t){e.exports=function(e,t){if("string"!=typeof e||0===e.length)return e;var r,n=h.basename(e,h.extname(e))+t,i=h.join(h.dirname(e),n);return(// Because `path.join` removes the head './' from the given path.
// This removal can cause a problem when passing the result to `require` or
// `import`.
(r=e.slice(0,2))==="."+h.sep||"./"===r?"."+h.sep+i:i);};}),q.register("fcBgE",function(e,t){var r=e.exports&&e.exports.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r];}});}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r];}),n=e.exports&&e.exports.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t});}:function(e,t){e.default=t;}),i=e.exports&&e.exports.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.hasOwnProperty.call(e,i)&&r(t,e,i);return n(t,e),t;},o=e.exports&&e.exports.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{l(n.next(e));}catch(e){o(e);}}function a(e){try{l(n.throw(e));}catch(e){o(e);}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t);})).then(s,a);}l((n=n.apply(e,t||[])).next());});};Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.findInPath=e.exports.which=e.exports.mkdirP=e.exports.rmRF=e.exports.mv=e.exports.cp=void 0;let s=i(h),a=i(q("ejt9m"));/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */function l(e){return o(this,void 0,void 0,function*(){if(a.IS_WINDOWS&&/[*"<>|]/.test(e))throw Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');try{// note if path does not exist, error is silent
yield a.rm(e,{force:!0,maxRetries:3,recursive:!0,retryDelay:300});}catch(e){throw Error(`File was unable to be removed ${e}`);}});}/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */function c(e){return o(this,void 0,void 0,function*(){E.ok(e,"a path argument must be provided"),yield a.mkdir(e,{recursive:!0});});}/**
 * Returns a list of all occurrences of the given tool on the system path.
 *
 * @returns   Promise<string[]>  the paths of the tool
 */function u(e){return o(this,void 0,void 0,function*(){if(!e)throw Error("parameter 'tool' is required");// build the list of extensions to try
let t=[];if(a.IS_WINDOWS&&process.env.PATHEXT)for(let e of process.env.PATHEXT.split(s.delimiter))e&&t.push(e);// if it's rooted, return it if exists. otherwise return empty.
if(a.isRooted(e)){let r=yield a.tryGetExecutablePath(e,t);return r?[r]:[];}// if any path separators, return empty
if(e.includes(s.sep))return[];// build the list of directories
//
// Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
// it feels like we should not do this. Checking the current directory seems like more of a use
// case of a shell, and the which() function exposed by the toolkit should strive for consistency
// across platforms.
let r=[];if(process.env.PATH)for(let e of process.env.PATH.split(s.delimiter))e&&r.push(e);// find all matches
let n=[];for(let i of r){let r=yield a.tryGetExecutablePath(s.join(i,e),t);r&&n.push(r);}return n;});}// Buffered file copy
function d(e,t,r){return o(this,void 0,void 0,function*(){if((yield a.lstat(e)).isSymbolicLink()){// unlink/re-link it
try{yield a.lstat(t),yield a.unlink(t);}catch(e){"EPERM"===e.code&&(yield a.chmod(t,"0666"),yield a.unlink(t));// other errors = it doesn't exist, no work to do
}// Copy over symlink
let r=yield a.readlink(e);yield a.symlink(r,t,a.IS_WINDOWS?"junction":null);}else(!(yield a.exists(t))||r)&&(yield a.copyFile(e,t));});}e.exports.cp=/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */function(e,t,r={}){return o(this,void 0,void 0,function*(){let{force:n,recursive:i,copySourceDirectory:l}=function(e){let t=null==e.force||e.force,r=!!e.recursive,n=null==e.copySourceDirectory||!!e.copySourceDirectory;return{force:t,recursive:r,copySourceDirectory:n};}(r),u=(yield a.exists(t))?yield a.stat(t):null;// Dest is an existing file, but not forcing
if(u&&u.isFile()&&!n)return;// If dest is an existing directory, should copy inside.
let p=u&&u.isDirectory()&&l?s.join(t,s.basename(e)):t;if(!(yield a.exists(e)))throw Error(`no such file or directory: ${e}`);let f=yield a.stat(e);if(f.isDirectory()){if(i)yield function e(t,r,n,i){return o(this,void 0,void 0,function*(){// Ensure there is not a run away recursive copy
if(n>=255)return;n++,yield c(r);let o=yield a.readdir(t);for(let s of o){let o=`${t}/${s}`,l=`${r}/${s}`,c=yield a.lstat(o);c.isDirectory()?yield e(o,l,n,i):yield d(o,l,i);}// Change the mode for the newly created directory
yield a.chmod(r,(yield a.stat(t)).mode);});}(e,p,0,n);else throw Error(`Failed to copy. ${e} is a directory, but tried to copy without recursive flag.`);}else{if(""===s.relative(e,p))throw Error(`'${p}' and '${e}' are the same file`);yield d(e,p,n);}});},e.exports.mv=/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */function(e,t,r={}){return o(this,void 0,void 0,function*(){if(yield a.exists(t)){let n=!0;if((yield a.isDirectory(t))&&(// If dest is directory copy src into dest
t=s.join(t,s.basename(e)),n=yield a.exists(t)),n){if(null==r.force||r.force)yield l(t);else throw Error("Destination already exists");}}yield c(s.dirname(t)),yield a.rename(e,t);});},e.exports.rmRF=l,e.exports.mkdirP=c,e.exports.which=/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */function e(t,r){return o(this,void 0,void 0,function*(){if(!t)throw Error("parameter 'tool' is required");// recursive when check=true
if(r){let r=yield e(t,!1);if(!r){if(a.IS_WINDOWS)throw Error(`Unable to locate executable file: ${t}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);throw Error(`Unable to locate executable file: ${t}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);}return r;}let n=yield u(t);return n&&n.length>0?n[0]:"";});},e.exports.findInPath=u;}),q.register("ejt9m",function(e,t){var r,n=e.exports&&e.exports.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r];}});}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r];}),i=e.exports&&e.exports.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t});}:function(e,t){e.default=t;}),o=e.exports&&e.exports.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r);return i(t,e),t;},s=e.exports&&e.exports.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{l(n.next(e));}catch(e){o(e);}}function a(e){try{l(n.throw(e));}catch(e){o(e);}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t);})).then(s,a);}l((n=n.apply(e,t||[])).next());});};Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.getCmdPath=e.exports.tryGetExecutablePath=e.exports.isRooted=e.exports.isDirectory=e.exports.exists=e.exports.READONLY=e.exports.UV_FS_O_EXLOCK=e.exports.IS_WINDOWS=e.exports.unlink=e.exports.symlink=e.exports.stat=e.exports.rmdir=e.exports.rm=e.exports.rename=e.exports.readlink=e.exports.readdir=e.exports.open=e.exports.mkdir=e.exports.lstat=e.exports.copyFile=e.exports.chmod=void 0;let a=o(m),l=o(h);// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function c(e){return(1&e.mode)>0||(8&e.mode)>0&&e.gid===process.getgid()||(64&e.mode)>0&&e.uid===process.getuid();}r=a.promises,e.exports.chmod=r.chmod,e.exports.copyFile=r.copyFile,e.exports.lstat=r.lstat,e.exports.mkdir=r.mkdir,e.exports.open=r.open,e.exports.readdir=r.readdir,e.exports.readlink=r.readlink,e.exports.rename=r.rename,e.exports.rm=r.rm,e.exports.rmdir=r.rmdir,e.exports.stat=r.stat,e.exports.symlink=r.symlink,e.exports.unlink=r.unlink,// export const {open} = 'fs'
e.exports.IS_WINDOWS="win32"===process.platform,// See https://github.com/nodejs/node/blob/d0153aee367422d0858105abec186da4dff0a0c5/deps/uv/include/uv/win.h#L691
e.exports.UV_FS_O_EXLOCK=268435456,e.exports.READONLY=a.constants.O_RDONLY,e.exports.exists=function(t){return s(this,void 0,void 0,function*(){try{yield e.exports.stat(t);}catch(e){if("ENOENT"===e.code)return!1;throw e;}return!0;});},e.exports.isDirectory=function(t,r=!1){return s(this,void 0,void 0,function*(){let n=r?yield e.exports.stat(t):yield e.exports.lstat(t);return n.isDirectory();});},e.exports.isRooted=/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */function(t){var r;if(r=(r=t)||"",!(t=e.exports.IS_WINDOWS?// convert slashes on Windows
(r=r.replace(/\//g,"\\")).replace(/\\\\+/g,"\\"):r.replace(/\/\/+/g,"/")))throw Error('isRooted() parameter "p" cannot be empty');return e.exports.IS_WINDOWS?t.startsWith("\\")||/^[A-Z]:/i.test(t)// e.g. \ or \hello or \\hello
:t.startsWith("/");// e.g. C: or C:\hello
},e.exports.tryGetExecutablePath=/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */function(t,r){return s(this,void 0,void 0,function*(){let n;try{// test file exists
n=yield e.exports.stat(t);}catch(e){"ENOENT"!==e.code&&console.log(`Unexpected error attempting to determine if executable file exists '${t}': ${e}`);}if(n&&n.isFile()){if(e.exports.IS_WINDOWS){// on Windows, test for valid extension
let e=l.extname(t).toUpperCase();if(r.some(t=>t.toUpperCase()===e))return t;}else if(c(n))return t;}// try each extension
let i=t;for(let o of r){t=i+o,n=void 0;try{n=yield e.exports.stat(t);}catch(e){"ENOENT"!==e.code&&console.log(`Unexpected error attempting to determine if executable file exists '${t}': ${e}`);}if(n&&n.isFile()){if(e.exports.IS_WINDOWS){// preserve the case of the actual file (since an extension was appended)
try{let r=l.dirname(t),n=l.basename(t).toUpperCase();for(let i of yield e.exports.readdir(r))if(n===i.toUpperCase()){t=l.join(r,i);break;}}catch(e){// eslint-disable-next-line no-console
console.log(`Unexpected error attempting to determine the actual case of the file '${t}': ${e}`);}return t;}if(c(n))return t;}}return"";});},e.exports.getCmdPath=// Get the path of cmd.exe in windows
function(){var e;return null!==(e=process.env.COMSPEC)&&void 0!==e?e:"cmd.exe";};}),q.register("ktIRP",function(e,t){var r=e.exports&&e.exports.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r];}});}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r];}),n=e.exports&&e.exports.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t});}:function(e,t){e.default=t;}),i=e.exports&&e.exports.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.hasOwnProperty.call(e,i)&&r(t,e,i);return n(t,e),t;},o=e.exports&&e.exports.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{l(n.next(e));}catch(e){o(e);}}function a(e){try{l(n.throw(e));}catch(e){o(e);}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t);})).then(s,a);}l((n=n.apply(e,t||[])).next());});};Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports._readLinuxVersionFile=e.exports._getOsVersion=e.exports._findMatch=void 0;let s=i(q("lJEXJ"));var a=q("lcRzN");e.exports._findMatch=function(t,r,n,i){return o(this,void 0,void 0,function*(){let o,l,c;let u=f.platform();for(let o of n){let n=o.version;if(a.debug(`check ${n} satisfies ${t}`),s.satisfies(n,t)&&(!r||o.stable===r)&&(c=o.files.find(t=>{a.debug(`${t.arch}===${i} && ${t.platform}===${u}`);let r=t.arch===i&&t.platform===u;if(r&&t.platform_version){let n=e.exports._getOsVersion();r=n===t.platform_version||s.satisfies(n,t.platform_version);}return r;}))){a.debug(`matched ${o.version}`),l=o;break;}}return l&&c&&(// clone since we're mutating the file list to be only the file that matches
(o=Object.assign({},l)).files=[c]),o;});},e.exports._getOsVersion=function(){// TODO: add windows and other linux, arm variants
// right now filtering on version is only an ubuntu and macos scenario for tools we build for hosted (python)
let t=f.platform(),r="";if("darwin"===t)r=$.execSync("sw_vers -productVersion").toString();else if("linux"===t){// lsb_release process not in some containers, readfile
// Run cat /etc/lsb-release
// DISTRIB_ID=Ubuntu
// DISTRIB_RELEASE=18.04
// DISTRIB_CODENAME=bionic
// DISTRIB_DESCRIPTION="Ubuntu 18.04.4 LTS"
let t=e.exports._readLinuxVersionFile();if(t){let e=t.split("\n");for(let t of e){let e=t.split("=");if(2===e.length&&("VERSION_ID"===e[0].trim()||"DISTRIB_RELEASE"===e[0].trim())){r=e[1].trim().replace(/^"/,"").replace(/"$/,"");break;}}}}return r;},e.exports._readLinuxVersionFile=function(){let e="/etc/lsb-release",t="/etc/os-release",r="";return m.existsSync(e)?r=m.readFileSync(e).toString():m.existsSync(t)&&(r=m.readFileSync(t).toString()),r;};}),q.register("dGCqI",function(e,t){var r=q("fVQSr"),n=q("3MZit");e.exports=function(e,t,i){var o=t&&i||0;"string"==typeof e&&(t="binary"===e?Array(16):null,e=null);var s=(e=e||{}).random||(e.rng||r)();// Copy bytes to buffer, if provided
if(// Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
s[6]=15&s[6]|64,s[8]=63&s[8]|128,t)for(var a=0;a<16;++a)t[o+a]=s[a];return t||n(s);};}),q.register("fVQSr",function(e,t){// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.
e.exports=function(){return g.randomBytes(16);};}),q.register("3MZit",function(e,t){for(var r=[],n=0;n<256;++n)r[n]=(n+256).toString(16).substr(1);e.exports=function(e,t){var n=t||0;// join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
return[r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]]].join("");};}),q.register("jlr6Q",function(e,t){var r=e.exports&&e.exports.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r];}});}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r];}),n=e.exports&&e.exports.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t});}:function(e,t){e.default=t;}),i=e.exports&&e.exports.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.hasOwnProperty.call(e,i)&&r(t,e,i);return n(t,e),t;},o=e.exports&&e.exports.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{l(n.next(e));}catch(e){o(e);}}function a(e){try{l(n.throw(e));}catch(e){o(e);}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t);})).then(s,a);}l((n=n.apply(e,t||[])).next());});};Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.getExecOutput=e.exports.exec=void 0;let s=i(q("jbxr5"));/**
 * Exec a command.
 * Output will be streamed to the live console.
 * Returns promise with return code
 *
 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
 * @param     args               optional arguments for tool. Escaping is handled by the lib.
 * @param     options            optional exec options.  See ExecOptions
 * @returns   Promise<number>    exit code
 */function a(e,t,r){return o(this,void 0,void 0,function*(){let n=s.argStringToArray(e);if(0===n.length)throw Error("Parameter 'commandLine' cannot be null or empty.");// Path to tool to execute should be first arg
let i=n[0];t=n.slice(1).concat(t||[]);let o=new s.ToolRunner(i,t,r);return o.exec();});}e.exports.exec=a,e.exports.getExecOutput=/**
 * Exec a command and get the output.
 * Output will be streamed to the live console.
 * Returns promise with the exit code and collected stdout and stderr
 *
 * @param     commandLine           command to execute (can include additional args). Must be correctly escaped.
 * @param     args                  optional arguments for tool. Escaping is handled by the lib.
 * @param     options               optional exec options.  See ExecOptions
 * @returns   Promise<ExecOutput>   exit code, stdout, and stderr
 */function(e,t,r){var n,i;return o(this,void 0,void 0,function*(){let o="",s="",l=new _.StringDecoder("utf8"),c=new _.StringDecoder("utf8"),u=null===(n=null==r?void 0:r.listeners)||void 0===n?void 0:n.stdout,d=null===(i=null==r?void 0:r.listeners)||void 0===i?void 0:i.stderr,p=Object.assign(Object.assign({},null==r?void 0:r.listeners),{stdout:e=>{o+=l.write(e),u&&u(e);},stderr:e=>{s+=c.write(e),d&&d(e);}}),f=yield a(e,t,Object.assign(Object.assign({},r),{listeners:p}));return(//flush any remaining characters
o+=l.end(),s+=c.end(),{exitCode:f,stdout:o,stderr:s});});};}),q.register("jbxr5",function(e,t){var r=e.exports&&e.exports.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r];}});}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r];}),n=e.exports&&e.exports.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t});}:function(e,t){e.default=t;}),i=e.exports&&e.exports.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)"default"!==i&&Object.hasOwnProperty.call(e,i)&&r(t,e,i);return n(t,e),t;},o=e.exports&&e.exports.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{l(n.next(e));}catch(e){o(e);}}function a(e){try{l(n.throw(e));}catch(e){o(e);}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t);})).then(s,a);}l((n=n.apply(e,t||[])).next());});};Object.defineProperty(e.exports,"__esModule",{value:!0}),e.exports.argStringToArray=e.exports.ToolRunner=void 0;let s=i(f),a=i(x),l=i($),c=i(h),u=i(q("fcBgE")),d=i(q("ejt9m")),p="win32"===process.platform;/*
 * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
 */class m extends a.EventEmitter{constructor(e,t,r){if(super(),!e)throw Error("Parameter 'toolPath' cannot be null or empty.");this.toolPath=e,this.args=t||[],this.options=r||{};}_debug(e){this.options.listeners&&this.options.listeners.debug&&this.options.listeners.debug(e);}_getCommandString(e,t){let r=this._getSpawnFileName(),n=this._getSpawnArgs(e),i=t?"":"[command]";if(p){// Windows + cmd file
if(this._isCmdFile())for(let e of(i+=r,n))i+=` ${e}`;else if(e.windowsVerbatimArguments)for(let e of(i+=`"${r}"`,n))i+=` ${e}`;else for(let e of(i+=this._windowsQuoteCmdArg(r),n))i+=` ${this._windowsQuoteCmdArg(e)}`;}else for(let e of(// OSX/Linux - this can likely be improved with some form of quoting.
// creating processes on Unix is fundamentally different than Windows.
// on Unix, execvp() takes an arg array.
i+=r,n))i+=` ${e}`;return i;}_processLineBuffer(e,t,r){try{let n=t+e.toString(),i=n.indexOf(s.EOL);for(;i>-1;){let e=n.substring(0,i);r(e),i=// the rest of the string ...
(n=n.substring(i+s.EOL.length)).indexOf(s.EOL);}return n;}catch(e){return(// streaming lines to console is best effort.  Don't fail a build.
this._debug(`error processing line. Failed with error ${e}`),"");}}_getSpawnFileName(){return p&&this._isCmdFile()?process.env.COMSPEC||"cmd.exe":this.toolPath;}_getSpawnArgs(e){if(p&&this._isCmdFile()){let t=`/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;for(let r of this.args)t+=" "+(e.windowsVerbatimArguments?r:this._windowsQuoteCmdArg(r));return[t+='"'];}return this.args;}_endsWith(e,t){return e.endsWith(t);}_isCmdFile(){let e=this.toolPath.toUpperCase();return this._endsWith(e,".CMD")||this._endsWith(e,".BAT");}_windowsQuoteCmdArg(e){// for .exe, apply the normal quoting rules that libuv applies
if(!this._isCmdFile())return this._uvQuoteCmdArg(e);// otherwise apply quoting rules specific to the cmd.exe command line parser.
// the libuv rules are generic and are not designed specifically for cmd.exe
// command line parser.
//
// for a detailed description of the cmd.exe command line parser, refer to
// http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
// need quotes for empty arg
if(!e)return'""';// determine whether the arg needs to be quoted
let t=[" ","	","&","(",")","[","]","{","}","^","=",";","!","'","+",",","`","~","|","<",">",'"'],r=!1;for(let n of e)if(t.some(e=>e===n)){r=!0;break;}// short-circuit if quotes not needed
if(!r)return e;// the following quoting rules are very similar to the rules that by libuv applies.
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
let n='"',i=!0;for(let t=e.length;t>0;t--)// walk the string in reverse
n+=e[t-1],i&&"\\"===e[t-1]?n+="\\":'"'===e[t-1]?(i=!0,n+='"'):i=!1;return(n+='"').split("").reverse().join("");}_uvQuoteCmdArg(e){// Tool runner wraps child_process.spawn() and needs to apply the same quoting as
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
if(!e)return'""';if(!e.includes(" ")&&!e.includes("	")&&!e.includes('"'))return e;if(!e.includes('"')&&!e.includes("\\"))// quote marks around the whole thing.
return`"${e}"`;// Expected input/output:
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
let t='"',r=!0;for(let n=e.length;n>0;n--)// walk the string in reverse
t+=e[n-1],r&&"\\"===e[n-1]?t+="\\":'"'===e[n-1]?(r=!0,t+="\\"):r=!1;return(t+='"').split("").reverse().join("");}_cloneExecOptions(e){e=e||{};let t={cwd:e.cwd||process.cwd(),env:e.env||process.env,silent:e.silent||!1,windowsVerbatimArguments:e.windowsVerbatimArguments||!1,failOnStdErr:e.failOnStdErr||!1,ignoreReturnCode:e.ignoreReturnCode||!1,delay:e.delay||1e4};return t.outStream=e.outStream||process.stdout,t.errStream=e.errStream||process.stderr,t;}_getSpawnOptions(e,t){e=e||{};let r={};return r.cwd=e.cwd,r.env=e.env,r.windowsVerbatimArguments=e.windowsVerbatimArguments||this._isCmdFile(),e.windowsVerbatimArguments&&(r.argv0=`"${t}"`),r;}/**
     * Exec a tool.
     * Output will be streamed to the live console.
     * Returns promise with return code
     *
     * @param     tool     path to tool to exec
     * @param     options  optional exec options.  See ExecOptions
     * @returns   number
     */exec(){return o(this,void 0,void 0,function*(){return!d.isRooted(this.toolPath)&&(this.toolPath.includes("/")||p&&this.toolPath.includes("\\"))&&(this.toolPath=c.resolve(process.cwd(),this.options.cwd||process.cwd(),this.toolPath)),// if the tool is only a file name, then resolve it from the PATH
// otherwise verify it exists (add extension on Windows if necessary)
this.toolPath=yield u.which(this.toolPath,!0),new Promise((e,t)=>o(this,void 0,void 0,function*(){for(let e of(this._debug(`exec tool: ${this.toolPath}`),this._debug("arguments:"),this.args))this._debug(`   ${e}`);let r=this._cloneExecOptions(this.options);!r.silent&&r.outStream&&r.outStream.write(this._getCommandString(r)+s.EOL);let n=new g(r,this.toolPath);if(n.on("debug",e=>{this._debug(e);}),this.options.cwd&&!(yield d.exists(this.options.cwd)))return t(Error(`The cwd: ${this.options.cwd} does not exist!`));let i=this._getSpawnFileName(),o=l.spawn(i,this._getSpawnArgs(r),this._getSpawnOptions(this.options,i)),a="";o.stdout&&o.stdout.on("data",e=>{this.options.listeners&&this.options.listeners.stdout&&this.options.listeners.stdout(e),!r.silent&&r.outStream&&r.outStream.write(e),a=this._processLineBuffer(e,a,e=>{this.options.listeners&&this.options.listeners.stdline&&this.options.listeners.stdline(e);});});let c="";if(o.stderr&&o.stderr.on("data",e=>{if(n.processStderr=!0,this.options.listeners&&this.options.listeners.stderr&&this.options.listeners.stderr(e),!r.silent&&r.errStream&&r.outStream){let t=r.failOnStdErr?r.errStream:r.outStream;t.write(e);}c=this._processLineBuffer(e,c,e=>{this.options.listeners&&this.options.listeners.errline&&this.options.listeners.errline(e);});}),o.on("error",e=>{n.processError=e.message,n.processExited=!0,n.processClosed=!0,n.CheckComplete();}),o.on("exit",e=>{n.processExitCode=e,n.processExited=!0,this._debug(`Exit code ${e} received from tool '${this.toolPath}'`),n.CheckComplete();}),o.on("close",e=>{n.processExitCode=e,n.processExited=!0,n.processClosed=!0,this._debug(`STDIO streams have closed for tool '${this.toolPath}'`),n.CheckComplete();}),n.on("done",(r,n)=>{a.length>0&&this.emit("stdline",a),c.length>0&&this.emit("errline",c),o.removeAllListeners(),r?t(r):e(n);}),this.options.input){if(!o.stdin)throw Error("child process missing stdin");o.stdin.end(this.options.input);}}));});}}e.exports.ToolRunner=m,e.exports.argStringToArray=/**
 * Convert an arg string to an array of args. Handles escaping
 *
 * @param    argString   string of arguments
 * @returns  string[]    array of arguments
 */function(e){let t=[],r=!1,n=!1,i="";function o(e){n&&'"'!==e&&(i+="\\"),i+=e,n=!1;}for(let s=0;s<e.length;s++){let a=e.charAt(s);if('"'===a){n?o(a):r=!r;continue;}if("\\"===a&&n){o(a);continue;}if("\\"===a&&r){n=!0;continue;}if(" "===a&&!r){i.length>0&&(t.push(i),i="");continue;}o(a);}return i.length>0&&t.push(i.trim()),t;};class g extends a.EventEmitter{constructor(e,t){if(super(),this.processClosed=!1,this.processError="",this.processExitCode=0,this.processExited=!1,this.processStderr=!1,this.delay=1e4,this.done=!1,this.timeout=null,!t)throw Error("toolPath must not be empty");this.options=e,this.toolPath=t,e.delay&&(this.delay=e.delay);}CheckComplete(){!this.done&&(this.processClosed?this._setResult():this.processExited&&(this.timeout=O.setTimeout(g.HandleTimeout,this.delay,this)));}_debug(e){this.emit("debug",e);}_setResult(){// determine whether there is an error
let e;this.processExited&&(this.processError?e=Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`):0===this.processExitCode||this.options.ignoreReturnCode?this.processStderr&&this.options.failOnStdErr&&(e=Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`)):e=Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`)),this.timeout&&(clearTimeout(this.timeout),this.timeout=null),this.done=!0,this.emit("done",e,this.processExitCode);}static HandleTimeout(e){if(!e.done){if(!e.processClosed&&e.processExited){let t=`The STDIO streams did not close within ${e.delay/1e3} seconds of the exit event from process '${e.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;e._debug(t);}e._setResult();}}}}),q.register("5fF9z",function(e,t){e.exports=Promise.resolve(require("./actions_python.945fba47.js")).then(()=>q("4kQHk"));});var X=q("dTX7a"),K=q("ER74K"),z=q("ggaxg"),W={};(function(){q("fXZh0").addLocale("en",function(e/*``*/){var t=Math.floor(Math.abs(e)),r=e.toString().replace(/^[^.]*\.?/,"").length;return("string"==typeof e&&(e=parseInt(e,10)),1===t&&0===r)?"one":"other";});}).call(W);var Y={};Y=q("25uEY");var J={};J={id:"en",data:{long:{years:{one:"{0} year",other:"{0} years"},months:{one:"{0} month",other:"{0} months"},weeks:{one:"{0} week",other:"{0} weeks"},days:{one:"{0} day",other:"{0} days"},hours:{one:"{0} hour",other:"{0} hours"},minutes:{one:"{0} minute",other:"{0} minutes"},seconds:{one:"{0} second",other:"{0} seconds"}},narrow:{years:{one:"{0}y",other:"{0}y"},months:{one:"{0}m",other:"{0}m"},weeks:{one:"{0}w",other:"{0}w"},days:{one:"{0}d",other:"{0}d"},hours:{one:"{0}h",other:"{0}h"},minutes:{one:"{0}m",other:"{0}m"},seconds:{one:"{0}s",other:"{0}s"}},short:{years:{one:"{0} yr",other:"{0} yrs"},months:{one:"{0} mth",other:"{0} mths"},weeks:{one:"{0} wk",other:"{0} wks"},days:{one:"{0} day",other:"{0} days"},hours:{one:"{0} hr",other:"{0} hr"},minutes:{one:"{0} min",other:"{0} min"},seconds:{one:"{0} sec",other:"{0} sec"}}}};var Q={};const Z=f.homedir();Q=e=>{if("string"!=typeof e)throw TypeError(`Expected a string, got ${typeof e}`);return Z?e.replace(/^~(?=$|\/|\\)/,Z):e;};var ee={};const et="win32"===process.platform||"cygwin"===process.env.OSTYPE||"msys"===process.env.OSTYPE,er=et?";":":";var en={};function ei(e,t,r){if("function"==typeof t&&(r=t,t={}),!r){if("function"!=typeof Promise)throw TypeError("callback not provided");return new Promise(function(r,n){ei(e,t||{},function(e,t){e?n(e):r(t);});});}e6(e,t||{},function(e,n){e&&("EACCES"===e.code||t&&t.ignoreErrors)&&(e=null,n=!1),r(e,n);});}e6="win32"===process.platform||G.TESTING_WINDOWS?q("a3PNV"):q("7gw6J"),en=ei,ei.sync=function(e,t){// my kingdom for a filtered catch
try{return e6.sync(e,t||{});}catch(e){if(t&&t.ignoreErrors||"EACCES"===e.code)return!1;throw e;}};const eo=e=>Object.assign(Error(`not found: ${e}`),{code:"ENOENT"}),es=(e,t)=>{let r=t.colon||er,n=e.match(/\//)||et&&e.match(/\\/)?[""]:[// windows always checks the cwd first
...(et?[process.cwd()]:[]),...(t.path||process.env.PATH||/* istanbul ignore next: very unusual */"").split(r)],i=et?t.pathExt||process.env.PATHEXT||".EXE;.CMD;.BAT;.COM":"",o=et?i.split(r):[""];return et&&-1!==e.indexOf(".")&&""!==o[0]&&o.unshift(""),{pathEnv:n,pathExt:o,pathExtExe:i};},ea=(e,t,r)=>{"function"==typeof t&&(r=t,t={}),t||(t={});let{pathEnv:n,pathExt:i,pathExtExe:o}=es(e,t),s=[],a=r=>new Promise((i,o)=>{if(r===n.length)return t.all&&s.length?i(s):o(eo(e));let a=n[r],c=/^".*"$/.test(a)?a.slice(1,-1):a,u=h.join(c,e),d=!c&&/^\.[\\\/]/.test(e)?e.slice(0,2)+u:u;i(l(d,r,0));}),l=(e,r,n)=>new Promise((c,u)=>{if(n===i.length)return c(a(r+1));let d=i[n];en(e+d,{pathExt:o},(i,o)=>{if(!i&&o){if(!t.all)return c(e+d);s.push(e+d);}return c(l(e,r,n+1));});});return r?a(0).then(e=>r(null,e),r):a(0);};ee=ea,ea.sync=(e,t)=>{t=t||{};let{pathEnv:r,pathExt:n,pathExtExe:i}=es(e,t),o=[];for(let s=0;s<r.length;s++){let a=r[s],l=/^".*"$/.test(a)?a.slice(1,-1):a,c=h.join(l,e),u=!l&&/^\.[\\\/]/.test(e)?e.slice(0,2)+c:c;for(let e=0;e<n.length;e++){let r=u+n[e];try{let e=en.sync(r,{pathExt:i});if(e){if(!t.all)return r;o.push(r);}}catch(e){}}}if(t.all&&o.length)return o;if(t.nothrow)return null;throw eo(e);};var el={},ec={},eu={},ed={},ep={};const ef=(e={})=>{let t=e.env||process.env,r=e.platform||process.platform;return"win32"!==r?"PATH":Object.keys(t).reverse().find(e=>"PATH"===e.toUpperCase())||"Path";};function eh(e,t){let r;let n=e.options.env||process.env,i=process.cwd(),o=null!=e.options.cwd,s=o&&void 0!==process.chdir&&!process.chdir.disabled;// If a custom `cwd` was specified, we need to change the process cwd
// because `which` will do stat calls but does not support a custom cwd
if(s)try{process.chdir(e.options.cwd);}catch(e){/* Empty */}try{r=ee.sync(e.command,{path:n[ep({env:n})],pathExt:t?h.delimiter:void 0});}catch(e){/* Empty */}finally{s&&process.chdir(i);}return r&&(r=h.resolve(o?e.options.cwd:"",r)),r;}// TODO: Remove this for the next major release
(ep=ef).default=ef,ed=function(e){return eh(e)||eh(e,!0);};// See http://www.robvanderwoude.com/escapechars.php
const em=/([()\][%!^"`<>&|;, *?])/g;var eg={},ev={},ey={};ey=/^#!(.*)/,ev=(e="")=>{let t=e.match(ey);if(!t)return null;let[r,n]=t[0].replace(/#! ?/,"").split(" "),i=r.split("/").pop();return"env"===i?n:n?`${i} ${n}`:i;},eg=function(e){let t;let r=Buffer.alloc(150);try{t=m.openSync(e,"r"),m.readSync(t,r,0,150,0),m.closeSync(t);}catch(e){}// Attempt to extract shebang (null is returned if not a shebang)
return ev(r.toString());};const ew="win32"===process.platform,ex=/\.(?:com|exe)$/i,eE=/node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;eu=function(e,t,r){t&&!Array.isArray(t)&&(r=t,t=null),t=t?t.slice(0):[],r=Object.assign({},r);// Build our parsed object
let n={command:e,args:t,options:r,file:void 0,original:{command:e,args:t}};// Delegate further parsing to shell or non-shell
return r.shell?n:function(e){if(!ew)return e;// Detect & add support for shebangs
let t=function(e){e.file=ed(e);let t=e.file&&eg(e.file);return t?(e.args.unshift(e.file),e.command=t,ed(e)):e.file;}(e),r=!ex.test(t);// If a shell is required, use cmd.exe and take care of escaping everything correctly
// Note that `forceShell` is an hidden option used only in tests
if(e.options.forceShell||r){// Need to double escape meta chars if the command is a cmd-shim located in `node_modules/.bin/`
// The cmd-shim simply calls execute the package bin file with NodeJS, proxying any argument
// Because the escape of metachars with ^ gets interpreted when the cmd.exe is first called,
// we need to double escape them
let r=eE.test(t);// Normalize posix paths into OS compatible paths (e.g.: foo/bar -> foo\bar)
// This is necessary otherwise it will always fail with ENOENT in those cases
e.command=h.normalize(e.command),// Escape command & arguments
e.command=(0,e.command).replace(em,"^$1"),e.args=e.args.map(e=>{var t;return t=e,// Escape meta chars
t=// All other backslashes occur literally
// Quote the whole thing:
(t=`"${// Sequence of backslashes followed by the end of the string
// (which will become a double quote later):
// double up all the backslashes
t=// Algorithm below is based on https://qntm.org/cmd
// Sequence of backslashes followed by a double quote:
// double up all the backslashes and escape the double quote
(t=// Convert to string
(t=`${t}`).replace(/(\\*)"/g,'$1$1\\"')).replace(/(\\*)$/,"$1$1")}"`).replace(em,"^$1"),r&&(t=t.replace(em,"^$1")),t;});let n=[e.command].concat(e.args).join(" ");e.args=["/d","/s","/c",`"${n}"`],e.command=process.env.comspec||"cmd.exe",e.options.windowsVerbatimArguments=!0;}return e;}(n);};var eb={};const eS="win32"===process.platform;function e$(e,t){return Object.assign(Error(`${t} ${e.command} ENOENT`),{code:"ENOENT",errno:"ENOENT",syscall:`${t} ${e.command}`,path:e.command,spawnargs:e.args});}function e_(e,t){return eS&&1===e&&!t.file?e$(t.original,"spawn"):null;}function eO(e,t,r){// Parse the arguments
let n=eu(e,t,r),i=$.spawn(n.command,n.args,n.options);return(// Hook into child process "exit" event to emit an error if the command
// does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
eb.hookChildProcess(i,n),i);}eb={hookChildProcess:function(e,t){if(!eS)return;let r=e.emit;e.emit=function(n,i){// If emitting "exit" event and exit code is 1, we need to check if
// the command exists and emit an "error" instead
// See https://github.com/IndigoUnited/node-cross-spawn/issues/16
if("exit"===n){let n=e_(i,t,"spawn");if(n)return r.call(e,"error",n);}return r.apply(e,arguments);// eslint-disable-line prefer-rest-params
};},verifyENOENT:e_,verifyENOENTSync:function(e,t){return eS&&1===e&&!t.file?e$(t.original,"spawnSync"):null;},notFoundError:e$},(ec=eO).spawn=eO,ec.sync=function(e,t,r){// Parse the arguments
let n=eu(e,t,r),i=$.spawnSync(n.command,n.args,n.options);return(// Analyze if the command does not exist, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
i.error=i.error||eb.verifyENOENTSync(i.status,n),i);},ec._parse=eu,ec._enoent=eb;var eC={};eC=e=>{let t="string"==typeof e?"\n":"\n".charCodeAt(),r="string"==typeof e?"\r":"\r".charCodeAt();return e[e.length-1]===t&&(e=e.slice(0,e.length-1)),e[e.length-1]===r&&(e=e.slice(0,e.length-1)),e;};var eI={};const eT=e=>{let t;e={cwd:process.cwd(),path:process.env[ep()],execPath:process.execPath,...e};let r=h.resolve(e.cwd),n=[];for(;t!==r;)n.push(h.join(r,"node_modules/.bin")),t=r,r=h.resolve(r,"..");// Ensure the running `node` binary is used
let i=h.resolve(e.cwd,e.execPath,"..");return n.push(i),n.concat(e.path).join(h.delimiter);};// TODO: Remove this for the next major release
(eI=eT).default=eT,eI.env=e=>{e={env:process.env,...e};let t={...e.env},r=ep({env:t});return e.path=t[r],t[r]=eI(e),t;};var eR={},eP={};const eA=(e,t)=>{for(let r of Reflect.ownKeys(t))Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r));return e;};// TODO: Remove this for the next major release
(eP=eA).default=eA;const eN=new WeakMap(),eL=(e,t={})=>{let r;if("function"!=typeof e)throw TypeError("Expected a function");let n=0,i=e.displayName||e.name||"<anonymous>",o=function(...s){if(eN.set(o,++n),1===n)r=e.apply(this,s),e=null;else if(!0===t.throw)throw Error(`Function \`${i}\` can only be called once`);return r;};return eP(o,e),eN.set(o,n),o;};// TODO: Remove this for the next major release
(eR=eL).default=eL,eR.callCount=e=>{if(!eN.has(e))throw Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);return eN.get(e);};var ek={},eD={};Object.defineProperty(eD,"__esModule",{value:!0}),eD.signalsByNumber=eD.signalsByName=void 0;var eU={};Object.defineProperty(eU,"__esModule",{value:!0}),eU.getSignals=void 0;var ej={};Object.defineProperty(ej,"__esModule",{value:!0}),ej.SIGNALS=void 0,ej.SIGNALS=[{name:"SIGHUP",number:1,action:"terminate",description:"Terminal closed",standard:"posix"},{name:"SIGINT",number:2,action:"terminate",description:"User interruption with CTRL-C",standard:"ansi"},{name:"SIGQUIT",number:3,action:"core",description:"User interruption with CTRL-\\",standard:"posix"},{name:"SIGILL",number:4,action:"core",description:"Invalid machine instruction",standard:"ansi"},{name:"SIGTRAP",number:5,action:"core",description:"Debugger breakpoint",standard:"posix"},{name:"SIGABRT",number:6,action:"core",description:"Aborted",standard:"ansi"},{name:"SIGIOT",number:6,action:"core",description:"Aborted",standard:"bsd"},{name:"SIGBUS",number:7,action:"core",description:"Bus error due to misaligned, non-existing address or paging error",standard:"bsd"},{name:"SIGEMT",number:7,action:"terminate",description:"Command should be emulated but is not implemented",standard:"other"},{name:"SIGFPE",number:8,action:"core",description:"Floating point arithmetic error",standard:"ansi"},{name:"SIGKILL",number:9,action:"terminate",description:"Forced termination",standard:"posix",forced:!0},{name:"SIGUSR1",number:10,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGSEGV",number:11,action:"core",description:"Segmentation fault",standard:"ansi"},{name:"SIGUSR2",number:12,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGPIPE",number:13,action:"terminate",description:"Broken pipe or socket",standard:"posix"},{name:"SIGALRM",number:14,action:"terminate",description:"Timeout or timer",standard:"posix"},{name:"SIGTERM",number:15,action:"terminate",description:"Termination",standard:"ansi"},{name:"SIGSTKFLT",number:16,action:"terminate",description:"Stack is empty or overflowed",standard:"other"},{name:"SIGCHLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"posix"},{name:"SIGCLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"other"},{name:"SIGCONT",number:18,action:"unpause",description:"Unpaused",standard:"posix",forced:!0},{name:"SIGSTOP",number:19,action:"pause",description:"Paused",standard:"posix",forced:!0},{name:"SIGTSTP",number:20,action:"pause",description:'Paused using CTRL-Z or "suspend"',standard:"posix"},{name:"SIGTTIN",number:21,action:"pause",description:"Background process cannot read terminal input",standard:"posix"},{name:"SIGBREAK",number:21,action:"terminate",description:"User interruption with CTRL-BREAK",standard:"other"},{name:"SIGTTOU",number:22,action:"pause",description:"Background process cannot write to terminal output",standard:"posix"},{name:"SIGURG",number:23,action:"ignore",description:"Socket received out-of-band data",standard:"bsd"},{name:"SIGXCPU",number:24,action:"core",description:"Process timed out",standard:"bsd"},{name:"SIGXFSZ",number:25,action:"core",description:"File too big",standard:"bsd"},{name:"SIGVTALRM",number:26,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGPROF",number:27,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGWINCH",number:28,action:"ignore",description:"Terminal window size changed",standard:"bsd"},{name:"SIGIO",number:29,action:"terminate",description:"I/O is available",standard:"other"},{name:"SIGPOLL",number:29,action:"terminate",description:"Watched event",standard:"other"},{name:"SIGINFO",number:29,action:"ignore",description:"Request for process information",standard:"other"},{name:"SIGPWR",number:30,action:"terminate",description:"Device running out of power",standard:"systemv"},{name:"SIGSYS",number:31,action:"core",description:"Invalid system call",standard:"other"},{name:"SIGUNUSED",number:31,action:"terminate",description:"Invalid system call",standard:"other"}];var eM={};Object.defineProperty(eM,"__esModule",{value:!0}),eM.SIGRTMAX=eM.getRealtimeSignals=void 0,eM.getRealtimeSignals=function(){return Array.from({length:eG-eB+1},eF);};const eF=function(e,t){return{name:`SIGRT${t+1}`,number:eB+t,action:"terminate",description:"Application-specific signal (realtime)",standard:"posix"};},eB=34,eG=64;eM.SIGRTMAX=eG,eU.getSignals=function(){let e=(0,eM.getRealtimeSignals)(),t=[...ej.SIGNALS,...e].map(eH);return t;};const eH=function({name:e,number:t,description:r,action:n,forced:i=!1,standard:o}){let{signals:{[e]:s}}=f.constants,a=void 0!==s;return{name:e,number:a?s:t,description:r,supported:a,action:n,forced:i,standard:o};},eV=function(e,{name:t,number:r,description:n,supported:i,action:o,forced:s,standard:a}){return{...e,[t]:{name:t,number:r,description:n,supported:i,action:o,forced:s,standard:a}};},eq=function(){let e=(0,eU.getSignals)();return e.reduce(eV,{});}();eD.signalsByName=eq;const eX=function(e,t){let r=eK(e,t);if(void 0===r)return{};let{name:n,description:i,supported:o,action:s,forced:a,standard:l}=r;return{[e]:{name:n,number:e,description:i,supported:o,action:s,forced:a,standard:l}};},eK=function(e,t){let r=t.find(({name:t})=>f.constants.signals[t]===e);return void 0!==r?r:t.find(t=>t.number===e);},ez=function(){let e=(0,eU.getSignals)(),t=eM.SIGRTMAX+1,r=Array.from({length:t},(t,r)=>eX(r,e));return Object.assign({},...r);}();eD.signalsByNumber=ez;var eW=eD.signalsByName;const eY=({timedOut:e,timeout:t,errorCode:r,signal:n,signalDescription:i,exitCode:o,isCanceled:s})=>e?`timed out after ${t} milliseconds`:s?"was canceled":void 0!==r?`failed with ${r}`:void 0!==n?`was killed with ${n} (${i})`:void 0!==o?`failed with exit code ${o}`:"failed";ek=({stdout:e,stderr:t,all:r,error:n,signal:i,exitCode:o,command:s,escapedCommand:a,timedOut:l,isCanceled:c,killed:u,parsed:{options:{timeout:d}}})=>{// `signal` and `exitCode` emitted on `spawned.on('exit')` event can be `null`.
// We normalize them to `undefined`
o=null===o?void 0:o,i=null===i?void 0:i;let p=void 0===i?void 0:eW[i].description,f=n&&n.code,h=eY({timedOut:l,timeout:d,errorCode:f,signal:i,signalDescription:p,exitCode:o,isCanceled:c}),m=`Command ${h}: ${s}`,g="[object Error]"===Object.prototype.toString.call(n),v=g?`${m}
${n.message}`:m,y=[v,t,e].filter(Boolean).join("\n");return g?(n.originalMessage=n.message,n.message=y):n=Error(y),n.shortMessage=v,n.command=s,n.escapedCommand=a,n.exitCode=o,n.signal=i,n.signalDescription=p,n.stdout=e,n.stderr=t,void 0!==r&&(n.all=r),"bufferedData"in n&&delete n.bufferedData,n.failed=!0,n.timedOut=!!l,n.isCanceled=c,n.killed=u&&!l,n;};var eJ={};const eQ=["stdin","stdout","stderr"],eZ=e=>eQ.some(t=>void 0!==e[t]),e0=e=>{if(!e)return;let{stdio:t}=e;if(void 0===t)return eQ.map(t=>e[t]);if(eZ(e))throw Error(`It's not possible to provide \`stdio\` in combination with one of ${eQ.map(e=>`\`${e}\``).join(", ")}`);if("string"==typeof t)return t;if(!Array.isArray(t))throw TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);let r=Math.max(t.length,eQ.length);return Array.from({length:r},(e,r)=>t[r]);};// `ipc` is pushed unless it is already present
(eJ=e0).node=e=>{let t=e0(e);return"ipc"===t?"ipc":void 0===t||"string"==typeof t?[t,t,t,"ipc"]:t.includes("ipc")?t:[...t,"ipc"];};var e1={},e2={},e4=G.process;const e3=function(e){return e&&"object"==typeof e&&"function"==typeof e.removeListener&&"function"==typeof e.emit&&"function"==typeof e.reallyExit&&"function"==typeof e.listeners&&"function"==typeof e.kill&&"number"==typeof e.pid&&"function"==typeof e.on;};// some kind of non-node environment, just no-op
/* istanbul ignore if */if(e3(e4)){var e6,e5,e8=q("1YMV0"),e7=/^win/i.test(e4.platform),e9=x;"function"!=typeof e9&&(e9=e9.EventEmitter),e4.__signal_exit_emitter__?e5=e4.__signal_exit_emitter__:((e5=e4.__signal_exit_emitter__=new e9()).count=0,e5.emitted={}),e5.infinite||(e5.setMaxListeners(1/0),e5.infinite=!0);var te=function(){tn&&e3(G.process)&&(tn=!1,e8.forEach(function(e){try{e4.removeListener(e,tr[e]);}catch(e){}}),e4.emit=ta,e4.reallyExit=to,e5.count-=1);};(e2=function(e,t){/* istanbul ignore if */if(!e3(G.process))return function(){};E.equal(typeof e,"function","a callback must be provided for exit handler"),!1===tn&&ti();var r="exit";return t&&t.alwaysLast&&(r="afterexit"),e5.on(r,e),function(){e5.removeListener(r,e),0===e5.listeners("exit").length&&0===e5.listeners("afterexit").length&&te();};}).unload=te;var tt=function(e,t,r){e5.emitted[e]||(e5.emitted[e]=!0,e5.emit(e,t,r));},tr={};e8.forEach(function(e){tr[e]=function(){e3(G.process)&&e4.listeners(e).length===e5.count&&(te(),tt("exit",null,e),/* istanbul ignore next */tt("afterexit",null,e),e7&&"SIGHUP"===e&&(// so use a supported signal instead
e="SIGINT"),/* istanbul ignore next */e4.kill(e4.pid,e));};}),e2.signals=function(){return e8;};var tn=!1,ti=function(){!tn&&e3(G.process)&&(tn=!0,// This is the number of onSignalExit's that are in play.
// It's important so that we can count the correct number of
// listeners on signals, and don't wait for the other one to
// handle it instead of us.
e5.count+=1,e8=e8.filter(function(e){try{return e4.on(e,tr[e]),!0;}catch(e){return!1;}}),e4.emit=tl,e4.reallyExit=ts);};e2.load=ti;var to=e4.reallyExit,ts=function(e){e3(G.process)&&(e4.exitCode=e||/* istanbul ignore next */0,tt("exit",e4.exitCode,null),/* istanbul ignore next */tt("afterexit",e4.exitCode,null),/* istanbul ignore next */to.call(e4,e4.exitCode));},ta=e4.emit,tl=function(e,t){if(!("exit"===e&&e3(G.process)))return ta.apply(this,arguments);void 0!==t&&(e4.exitCode=t);var r=ta.apply(this,arguments);/* istanbul ignore next */return(/* istanbul ignore next */tt("exit",e4.exitCode,null),/* istanbul ignore next */tt("afterexit",e4.exitCode,null),r);};}else e2=function(){return function(){};};const tc=(e,t,r,n)=>{if(!tu(t,r,n))return;let i=tp(r),o=setTimeout(()=>{e("SIGKILL");},i);o.unref&&o.unref();},tu=(e,{forceKillAfterTimeout:t},r)=>td(e)&&!1!==t&&r,td=e=>e===f.constants.signals.SIGTERM||"string"==typeof e&&"SIGTERM"===e.toUpperCase(),tp=({forceKillAfterTimeout:e=!0})=>{if(!0===e)return 5e3;if(!Number.isFinite(e)||e<0)throw TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);return e;},tf=(e,t,r)=>{e.kill(t),r(Object.assign(Error("Timed out"),{timedOut:!0,signal:t}));},th=async(e,{cleanup:t,detached:r},n)=>{if(!t||r)return n;let i=e2(()=>{e.kill();});return n.finally(()=>{i();});};var tm=(e1={spawnedKill:(e,t="SIGTERM",r={})=>{let n=e(t);return tc(e,t,r,n),n;},spawnedCancel:(e,t)=>{let r=e.kill();r&&(t.isCanceled=!0);},setupTimeout:(e,{timeout:t,killSignal:r="SIGTERM"},n)=>{let i;if(0===t||void 0===t)return n;let o=new Promise((n,o)=>{i=setTimeout(()=>{tf(e,r,o);},t);}),s=n.finally(()=>{clearTimeout(i);});return Promise.race([o,s]);},validateTimeout:({timeout:e})=>{if(void 0!==e&&(!Number.isFinite(e)||e<0))throw TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);},setExitHandler:th}).spawnedKill,tg=e1.spawnedCancel,tv=e1.setupTimeout,ty=e1.validateTimeout,tw=e1.setExitHandler,tx={},tE={};const tb=e=>null!==e&&"object"==typeof e&&"function"==typeof e.pipe;tb.writable=e=>tb(e)&&!1!==e.writable&&"function"==typeof e._write&&"object"==typeof e._writableState,tb.readable=e=>tb(e)&&!1!==e.readable&&"function"==typeof e._read&&"object"==typeof e._readableState,tb.duplex=e=>tb.writable(e)&&tb.readable(e),tb.transform=e=>tb.duplex(e)&&"function"==typeof e._transform,tE=tb;var tS={},t$=C.constants,t_=b.promisify,tO={},tC=I.PassThrough;tO=e=>{e={...e};let{array:t}=e,{encoding:r}=e,n="buffer"===r,i=!1;t?i=!(r||n):r=r||"utf8",n&&(r=null);let o=new tC({objectMode:i});r&&o.setEncoding(r);let s=0,a=[];return o.on("data",e=>{a.push(e),i?s=a.length:s+=e.length;}),o.getBufferedValue=()=>t?a:n?Buffer.concat(a,s):a.join(""),o.getBufferedLength=()=>s,o;};const tI=t_(I.pipeline);class tT extends Error{constructor(){super("maxBuffer exceeded"),this.name="MaxBufferError";}}async function tR(e,t){if(!e)throw Error("Expected a stream");t={maxBuffer:1/0,...t};let{maxBuffer:r}=t,n=tO(t);return await new Promise((t,i)=>{let o=e=>{e&&n.getBufferedLength()<=t$.MAX_LENGTH&&(e.bufferedData=n.getBufferedValue()),i(e);};(async()=>{try{await tI(e,n),t();}catch(e){o(e);}})(),n.on("data",()=>{n.getBufferedLength()>r&&o(new tT());});}),n.getBufferedValue();}(tS=tR).buffer=(e,t)=>tR(e,{...t,encoding:"buffer"}),tS.array=(e,t)=>tR(e,{...t,array:!0}),tS.MaxBufferError=tT;var tP={},tA=I.PassThrough;tP=function(){var e=[],t=new tA({objectMode:!0});return t.setMaxListeners(0),t.add=r,t.isEmpty=function(){return 0==e.length;},t.on("unpipe",n),Array.prototype.slice.call(arguments).forEach(r),t;function r(i){return Array.isArray(i)?i.forEach(r):(e.push(i),i.once("end",n.bind(null,i)),i.once("error",t.emit.bind(t,"error")),i.pipe(t,{end:!1})),this;}function n(r){!(e=e.filter(function(e){return e!==r;})).length&&t.readable&&t.end();}};// On failure, `result.stdout|stderr|all` should contain the currently buffered stream
const tN=async(e,t)=>{if(e){e.destroy();try{return await t;}catch(e){return e.bufferedData;}}},tL=(e,{encoding:t,buffer:r,maxBuffer:n})=>{if(e&&r)return t?tS(e,{encoding:t,maxBuffer:n}):tS.buffer(e,{maxBuffer:n});},tk=async({stdout:e,stderr:t,all:r},{encoding:n,buffer:i,maxBuffer:o},s)=>{let a=tL(e,{encoding:n,buffer:i,maxBuffer:o}),l=tL(t,{encoding:n,buffer:i,maxBuffer:o}),c=tL(r,{encoding:n,buffer:i,maxBuffer:2*o});try{return await Promise.all([s,a,l,c]);}catch(n){return Promise.all([{error:n,signal:n.signal,timedOut:n.timedOut},tN(e,a),tN(t,l),tN(r,c)]);}};var tD=(tx={handleInput:(e,t)=>{void 0!==t&&void 0!==e.stdin&&(tE(t)?t.pipe(e.stdin):e.stdin.end(t));},makeAllStream:(e,{all:t})=>{if(!t||!e.stdout&&!e.stderr)return;let r=tP();return e.stdout&&r.add(e.stdout),e.stderr&&r.add(e.stderr),r;},getSpawnedResult:tk,validateInputSync:({input:e})=>{if(tE(e))throw TypeError("The `input` option cannot be a stream in sync mode");}}).handleInput,tU=tx.getSpawnedResult,tj=tx.makeAllStream,tM=tx.validateInputSync,tF={};const tB=(async()=>{})().constructor.prototype,tG=["then","catch","finally"].map(e=>[e,Reflect.getOwnPropertyDescriptor(tB,e)]);var tH=(tF={mergePromise:(e,t)=>{for(let[r,n]of tG){// Starting the main `promise` is deferred to avoid consuming streams
let i="function"==typeof t?(...e)=>Reflect.apply(n.value,t(),e):n.value.bind(t);Reflect.defineProperty(e,r,{...n,value:i});}return e;},getSpawnedPromise:e=>new Promise((t,r)=>{e.on("exit",(e,r)=>{t({exitCode:e,signal:r});}),e.on("error",e=>{r(e);}),e.stdin&&e.stdin.on("error",e=>{r(e);});})}).mergePromise,tV=tF.getSpawnedPromise,tq={};const tX=(e,t=[])=>Array.isArray(t)?[e,...t]:[e],tK=/^[\w.-]+$/,tz=/"/g,tW=e=>"string"!=typeof e||tK.test(e)?e:`"${e.replace(tz,'\\"')}"`,tY=/ +/g;var tJ=(tq={joinCommand:(e,t)=>tX(e,t).join(" "),getEscapedCommand:(e,t)=>tX(e,t).map(e=>tW(e)).join(" "),parseCommand:e=>{let t=[];for(let r of e.trim().split(tY)){// Allow spaces to be escaped by a backslash if not meant as a delimiter
let e=t[t.length-1];e&&e.endsWith("\\")?t[t.length-1]=`${e.slice(0,-1)} ${r}`:t.push(r);}return t;}}).joinCommand,tQ=tq.parseCommand,tZ=tq.getEscapedCommand;const t0=({env:e,extendEnv:t,preferLocal:r,localDir:n,execPath:i})=>{let o=t?{...process.env,...e}:e;return r?eI.env({env:o,cwd:n,execPath:i}):o;},t1=(e,t,r={})=>{let n=ec._parse(e,t,r);return e=n.command,t=n.args,(r={maxBuffer:1e8,buffer:!0,stripFinalNewline:!0,extendEnv:!0,preferLocal:!1,localDir:(r=n.options).cwd||process.cwd(),execPath:process.execPath,encoding:"utf8",reject:!0,cleanup:!0,all:!1,windowsHide:!0,...r}).env=t0(r),r.stdio=eJ(r),"win32"===process.platform&&"cmd"===h.basename(e,".exe")&&t.unshift("/q"),{file:e,args:t,options:r,parsed:n};},t2=(e,t,r)=>"string"==typeof t||Buffer.isBuffer(t)?e.stripFinalNewline?eC(t):t:void 0===r?void 0:"",t4=(e,t,r)=>{let n;let i=t1(e,t,r),o=tJ(e,t),s=tZ(e,t);ty(i.options);try{n=$.spawn(i.file,i.args,i.options);}catch(r){// Ensure the returned error is always both a promise and a child process
let e=new $.ChildProcess(),t=Promise.reject(ek({error:r,stdout:"",stderr:"",all:"",command:o,escapedCommand:s,parsed:i,timedOut:!1,isCanceled:!1,killed:!1}));return tH(e,t);}let a=tV(n),l=tv(n,i.options,a),c=tw(n,i.options,l),u={isCanceled:!1};n.kill=tm.bind(null,n.kill.bind(n)),n.cancel=tg.bind(null,n,u);let d=async()=>{let[{error:e,exitCode:t,signal:r,timedOut:a},l,d,p]=await tU(n,i.options,c),f=t2(i.options,l),h=t2(i.options,d),m=t2(i.options,p);if(e||0!==t||null!==r){let l=ek({error:e,exitCode:t,signal:r,stdout:f,stderr:h,all:m,command:o,escapedCommand:s,parsed:i,timedOut:a,isCanceled:u.isCanceled,killed:n.killed});if(!i.options.reject)return l;throw l;}return{command:o,escapedCommand:s,exitCode:0,stdout:f,stderr:h,all:m,failed:!1,timedOut:!1,isCanceled:!1,killed:!1};},p=eR(d);return tD(n,i.options.input),n.all=tj(n,i.options),tH(n,p);};function t3(){return(process.getuid?.()===0||!!process.env.CI)&&null!==/*@__PURE__*/B(ee).sync("sudo",{nothrow:!0});}function t6(e,t=[],r={stdio:"inherit",shell:!0}){return t3()?/*@__PURE__*/B(el).commandSync(`sudo ${[e,...t].map(e=>`'${e}'`).join(" ")}`,r):/*@__PURE__*/B(el).sync(e,t,r);}function t5(e,t=[],r={stdio:"inherit",shell:!0}){return t3()?/*@__PURE__*/B(el).command(`sudo ${[e,...t].map(e=>`'${e}'`).join(" ")}`,r):/*@__PURE__*/B(el)(e,t,r);}function t8(e){return t3()&&"string"==typeof process.env.SUDO_USER?// use the user profile even if root
"darwin"===process.platform?(0,h.join)("/Users/",process.env.SUDO_USER,e):(0,h.join)("/home/",process.env.SUDO_USER,e):/*@__PURE__*/B(Q)(`~/${e}`);}(el=t4).sync=(e,t,r)=>{let n;let i=t1(e,t,r),o=tJ(e,t),s=tZ(e,t);tM(i.options);try{n=$.spawnSync(i.file,i.args,i.options);}catch(e){throw ek({error:e,stdout:"",stderr:"",all:"",command:o,escapedCommand:s,parsed:i,timedOut:!1,isCanceled:!1,killed:!1});}let a=t2(i.options,n.stdout,n.error),l=t2(i.options,n.stderr,n.error);if(n.error||0!==n.status||null!==n.signal){let e=ek({stdout:a,stderr:l,error:n.error,signal:n.signal,exitCode:n.status,command:o,escapedCommand:s,parsed:i,timedOut:n.error&&"ETIMEDOUT"===n.error.code,isCanceled:!1,killed:null!==n.signal});if(!i.options.reject)return e;throw e;}return{command:o,escapedCommand:s,exitCode:0,stdout:a,stderr:l,failed:!1,timedOut:!1,isCanceled:!1,killed:!1};},el.command=(e,t)=>{let[r,...n]=tQ(e);return t4(r,n,t);},el.commandSync=(e,t)=>{let[r,...n]=tQ(e);return t4.sync(r,n,t);},el.node=(e,t,r={})=>{t&&!Array.isArray(t)&&"object"==typeof t&&(r=t,t=[]);let n=eJ.node(r),i=process.execArgv.filter(e=>!e.startsWith("--inspect")),{nodePath:o=process.execPath,nodeOptions:s=i}=r;return t4(o,[...s,e,...(Array.isArray(t)?t:[])],{...r,stdin:void 0,stdout:void 0,stderr:void 0,stdio:n,shell:!1});};var K=q("ER74K"),t7={},t9=q("lJEXJ");/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise */function re(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{l(n.next(e));}catch(e){o(e);}}function a(e){try{l(n.throw(e));}catch(e){o(e);}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t);})).then(s,a);}l((n=n.apply(e,t||[])).next());});}function rt(e,t){var r,n,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1];},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this;}),o;function a(a){return function(l){return function(a){if(r)throw TypeError("Generator is already executing.");for(;o&&(o=0,a[0]&&(s=0)),s;)try{if(r=1,n&&(i=2&a[0]?n.return:a[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,a[1])).done)return i;switch(n=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return s.label++,{value:a[1],done:!1};case 5:s.label++,n=a[1],a=[0];continue;case 7:a=s.ops.pop(),s.trys.pop();continue;default:if(!(i=(i=s.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){s=0;continue;}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){s.label=a[1];break;}if(6===a[0]&&s.label<i[1]){s.label=i[1],i=a;break;}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(a);break;}i[2]&&s.ops.pop(),s.trys.pop();continue;}a=t.call(e,s);}catch(e){a=[6,e],n=0;}finally{r=i=0;}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0};}([a,l]);};}}var rr=T.env.npm_package_json,rn=T.env.npm_config_user_agent,ri=!!(rn&&rn.startsWith("npm")),ro=!!(rr&&rr.endsWith("package.json")),rs=!!(rn&&rn.startsWith("yarn")),ra=ri||ro||rs,rl=f.homedir(),rc=process.env.XDG_CONFIG_HOME||h.join(rl,".config","simple-update-notifier"),ru=function(e){return h.join(rc,"".concat(e.replace("@","").replace("/","__"),".json"));},rd=function(){m.existsSync(rc)||m.mkdirSync(rc,{recursive:!0});},rp=function(e){var t=ru(e);try{if(!m.existsSync(t))return;return JSON.parse(m.readFileSync(t,"utf8")).lastUpdateCheck;}catch(e){return;}},rf=function(e){var t=ru(e);m.writeFileSync(t,JSON.stringify({lastUpdateCheck:new Date().getTime()}));},rh=function(e){var t=e.pkg,r=e.updateCheckInterval,n=void 0===r?864e5:r,i=e.distTag,o=void 0===i?"latest":i,s=e.alwaysRun,a=e.debug;return re(void 0,void 0,void 0,function(){var e,r;return rt(this,function(i){switch(i.label){case 0:var l;if(rd(),e=rp(t.name),!(s||!e||e<new Date().getTime()-n))return[3/*break*/,2];return[4/*yield*/,(l=t.name,re(void 0,void 0,void 0,function(){var e;return rt(this,function(t){return e="https://registry.npmjs.org/-/package/".concat(l,"/dist-tags"),[2/*return*/,new Promise(function(t,r){y.get(e,function(e){var n="";e.on("data",function(e){return n+=e;}),e.on("end",function(){try{var e=JSON.parse(n)[o];e||r(Error("Error getting version")),t(e);}catch(e){r(Error("Could not parse version response"));}});}).on("error",function(e){return r(e);});})];});}))];case 1:if(r=i.sent(),rf(t.name),t9.gt(r,t.version))return[2/*return*/,r];return a&&console.error("Latest version (".concat(r,") not newer than current version (").concat(t.version,")")),[3/*break*/,3];case 2:a&&console.error("Too recent to check for a new update. simpleUpdateNotifier() interval set to ".concat(n,"ms but only ").concat(new Date().getTime()-e,"ms since last check.")),i.label=3;case 3:return[2/*return*/,!1];}});});},rm=function(e){for(var t=e.split("\n"),r=Math.max.apply(Math,t.map(function(e){return e.length;})),n=["┌".concat("─".repeat(r+2),"┐")],i=0;i<t.length;i++){var o=t[i];n.push("│ ".concat(o.padEnd(r)," │"));}return n.push("└".concat("─".repeat(r+2),"┘")),n.join("\n");};t7=function(e){return re(void 0,void 0,void 0,function(){var t,r;return rt(this,function(n){switch(n.label){case 0:if(!e.alwaysRun&&(!process.stdout.isTTY||ra&&!e.shouldNotifyInNpmScript))return e.debug&&console.error("Opting out of running simpleUpdateNotifier()"),[2/*return*/];n.label=1;case 1:return n.trys.push([1,3,,4]),[4/*yield*/,rh(e)];case 2:return(t=n.sent())&&console.error(rm("New version of ".concat(e.pkg.name," available!\nCurrent Version: ").concat(e.pkg.version,"\nLatest Version: ").concat(t))),[3/*break*/,4];case 3:return r=n.sent(),e.debug&&r instanceof Error&&console.error("Unexpected error in simpleUpdateNotifier():",r),[3/*break*/,4];case 4:return[2/*return*/];}});});};var rg={};async function rv(){try{await/*@__PURE__*/B(t7)({pkg:/*@__PURE__*/B(rg)});}catch(e){(0,K.warning)(`Failed to check for updates: ${e instanceof Error?e.message+e.stack:e}`);}}rg=JSON.parse('{"name":"setup-cpp","version":"0.35.2"}');var ry=q("lcRzN"),K=q("ER74K");function rw(e){return null==e?[]:Array.isArray(e)?e:[e];}var X=q("dTX7a"),ry=q("lcRzN"),X=q("dTX7a"),K=q("ER74K");function rx(e={}){let{env:t=process.env,platform:r=process.platform}=e;return"win32"!==r?"PATH":Object.keys(t).reverse().find(e=>"PATH"===e.toUpperCase())||"Path";}const rE=(e,t,r,n)=>{// `Function#length` should reflect the parameters of `to` not `from` since we keep its body.
// `Function#prototype` is non-writable and non-configurable so can never be modified.
if("length"===r||"prototype"===r||"arguments"===r||"caller"===r)return;let i=Object.getOwnPropertyDescriptor(e,r),o=Object.getOwnPropertyDescriptor(t,r);(rb(i,o)||!n)&&Object.defineProperty(e,r,o);},rb=function(e,t){return void 0===e||e.configurable||e.writable===t.writable&&e.enumerable===t.enumerable&&e.configurable===t.configurable&&(e.writable||e.value===t.value);},rS=(e,t)=>{let r=Object.getPrototypeOf(t);r!==Object.getPrototypeOf(e)&&Object.setPrototypeOf(e,r);},r$=(e,t)=>`/* Wrapped ${e}*/
${t}`,r_=Object.getOwnPropertyDescriptor(Function.prototype,"toString"),rO=Object.getOwnPropertyDescriptor(Function.prototype.toString,"name"),rC=(e,t,r)=>{let n=""===r?"":`with ${r.trim()}() `,i=r$.bind(null,n,t.toString());// Ensure `to.toString.toString` is non-enumerable and has the same `same`
Object.defineProperty(i,"name",rO),Object.defineProperty(e,"toString",{...r_,value:i});},rI=new WeakMap(),rT=(e,t={})=>{let r;if("function"!=typeof e)throw TypeError("Expected a function");let n=0,i=e.displayName||e.name||"<anonymous>",o=function(...s){if(rI.set(o,++n),1===n)r=e.apply(this,s),e=null;else if(!0===t.throw)throw Error(`Function \`${i}\` can only be called once`);return r;};return!function(e,t,{ignoreNonConfigurable:r=!1}={}){let{name:n}=e;for(let n of Reflect.ownKeys(t))rE(e,t,n,r);rS(e,t),rC(e,t,n);}(o,e),rI.set(o,n),o;};rT.callCount=e=>{if(!rI.has(e))throw Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);return rI.get(e);};const rR=()=>Array.from({length:rN-rA+1},rP),rP=(e,t)=>({name:`SIGRT${t+1}`,number:rA+t,action:"terminate",description:"Application-specific signal (realtime)",standard:"posix"}),rA=34,rN=64,rL=[{name:"SIGHUP",number:1,action:"terminate",description:"Terminal closed",standard:"posix"},{name:"SIGINT",number:2,action:"terminate",description:"User interruption with CTRL-C",standard:"ansi"},{name:"SIGQUIT",number:3,action:"core",description:"User interruption with CTRL-\\",standard:"posix"},{name:"SIGILL",number:4,action:"core",description:"Invalid machine instruction",standard:"ansi"},{name:"SIGTRAP",number:5,action:"core",description:"Debugger breakpoint",standard:"posix"},{name:"SIGABRT",number:6,action:"core",description:"Aborted",standard:"ansi"},{name:"SIGIOT",number:6,action:"core",description:"Aborted",standard:"bsd"},{name:"SIGBUS",number:7,action:"core",description:"Bus error due to misaligned, non-existing address or paging error",standard:"bsd"},{name:"SIGEMT",number:7,action:"terminate",description:"Command should be emulated but is not implemented",standard:"other"},{name:"SIGFPE",number:8,action:"core",description:"Floating point arithmetic error",standard:"ansi"},{name:"SIGKILL",number:9,action:"terminate",description:"Forced termination",standard:"posix",forced:!0},{name:"SIGUSR1",number:10,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGSEGV",number:11,action:"core",description:"Segmentation fault",standard:"ansi"},{name:"SIGUSR2",number:12,action:"terminate",description:"Application-specific signal",standard:"posix"},{name:"SIGPIPE",number:13,action:"terminate",description:"Broken pipe or socket",standard:"posix"},{name:"SIGALRM",number:14,action:"terminate",description:"Timeout or timer",standard:"posix"},{name:"SIGTERM",number:15,action:"terminate",description:"Termination",standard:"ansi"},{name:"SIGSTKFLT",number:16,action:"terminate",description:"Stack is empty or overflowed",standard:"other"},{name:"SIGCHLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"posix"},{name:"SIGCLD",number:17,action:"ignore",description:"Child process terminated, paused or unpaused",standard:"other"},{name:"SIGCONT",number:18,action:"unpause",description:"Unpaused",standard:"posix",forced:!0},{name:"SIGSTOP",number:19,action:"pause",description:"Paused",standard:"posix",forced:!0},{name:"SIGTSTP",number:20,action:"pause",description:'Paused using CTRL-Z or "suspend"',standard:"posix"},{name:"SIGTTIN",number:21,action:"pause",description:"Background process cannot read terminal input",standard:"posix"},{name:"SIGBREAK",number:21,action:"terminate",description:"User interruption with CTRL-BREAK",standard:"other"},{name:"SIGTTOU",number:22,action:"pause",description:"Background process cannot write to terminal output",standard:"posix"},{name:"SIGURG",number:23,action:"ignore",description:"Socket received out-of-band data",standard:"bsd"},{name:"SIGXCPU",number:24,action:"core",description:"Process timed out",standard:"bsd"},{name:"SIGXFSZ",number:25,action:"core",description:"File too big",standard:"bsd"},{name:"SIGVTALRM",number:26,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGPROF",number:27,action:"terminate",description:"Timeout or timer",standard:"bsd"},{name:"SIGWINCH",number:28,action:"ignore",description:"Terminal window size changed",standard:"bsd"},{name:"SIGIO",number:29,action:"terminate",description:"I/O is available",standard:"other"},{name:"SIGPOLL",number:29,action:"terminate",description:"Watched event",standard:"other"},{name:"SIGINFO",number:29,action:"ignore",description:"Request for process information",standard:"other"},{name:"SIGPWR",number:30,action:"terminate",description:"Device running out of power",standard:"systemv"},{name:"SIGSYS",number:31,action:"core",description:"Invalid system call",standard:"other"},{name:"SIGUNUSED",number:31,action:"terminate",description:"Invalid system call",standard:"other"}],rk=()=>{let e=rR(),t=[...rL,...e].map(rD);return t;},rD=({name:e,number:t,description:r,action:n,forced:i=!1,standard:o})=>{let{signals:{[e]:s}}=k.constants,a=void 0!==s;return{name:e,number:a?s:t,description:r,supported:a,action:n,forced:i,standard:o};},rU=({name:e,number:t,description:r,supported:n,action:i,forced:o,standard:s})=>[e,{name:e,number:t,description:r,supported:n,action:i,forced:o,standard:s}],rj=(()=>{let e=rk();return Object.fromEntries(e.map(rU));})(),rM=(e,t)=>{let r=rF(e,t);if(void 0===r)return{};let{name:n,description:i,supported:o,action:s,forced:a,standard:l}=r;return{[e]:{name:n,number:e,description:i,supported:o,action:s,forced:a,standard:l}};},rF=(e,t)=>{let r=t.find(({name:t})=>k.constants.signals[t]===e);return void 0!==r?r:t.find(t=>t.number===e);};(()=>{let e=rk(),t=Array.from({length:rN+1},(t,r)=>rM(r,e));return Object.assign({},...t);})();const rB=({timedOut:e,timeout:t,errorCode:r,signal:n,signalDescription:i,exitCode:o,isCanceled:s})=>e?`timed out after ${t} milliseconds`:s?"was canceled":void 0!==r?`failed with ${r}`:void 0!==n?`was killed with ${n} (${i})`:void 0!==o?`failed with exit code ${o}`:"failed",rG=({stdout:e,stderr:t,all:r,error:n,signal:i,exitCode:o,command:s,escapedCommand:a,timedOut:l,isCanceled:c,killed:u,parsed:{options:{timeout:d,cwd:p=B(N).cwd()}}})=>{// `signal` and `exitCode` emitted on `spawned.on('exit')` event can be `null`.
// We normalize them to `undefined`
o=null===o?void 0:o,i=null===i?void 0:i;let f=void 0===i?void 0:rj[i].description,h=n&&n.code,m=rB({timedOut:l,timeout:d,errorCode:h,signal:i,signalDescription:f,exitCode:o,isCanceled:c}),g=`Command ${m}: ${s}`,v="[object Error]"===Object.prototype.toString.call(n),y=v?`${g}
${n.message}`:g,w=[y,t,e].filter(Boolean).join("\n");return v?(n.originalMessage=n.message,n.message=w):n=Error(w),n.shortMessage=y,n.command=s,n.escapedCommand=a,n.exitCode=o,n.signal=i,n.signalDescription=f,n.stdout=e,n.stderr=t,n.cwd=p,void 0!==r&&(n.all=r),"bufferedData"in n&&delete n.bufferedData,n.failed=!0,n.timedOut=!!l,n.isCanceled=c,n.killed=u&&!l,n;},rH=["stdin","stdout","stderr"],rV=e=>rH.some(t=>void 0!==e[t]),rq=e=>{if(!e)return;let{stdio:t}=e;if(void 0===t)return rH.map(t=>e[t]);if(rV(e))throw Error(`It's not possible to provide \`stdio\` in combination with one of ${rH.map(e=>`\`${e}\``).join(", ")}`);if("string"==typeof t)return t;if(!Array.isArray(t))throw TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);let r=Math.max(t.length,rH.length);return Array.from({length:r},(e,r)=>t[r]);},rX=(e,t="SIGTERM",r={})=>{let n=e(t);return rK(e,t,r,n),n;},rK=(e,t,r,n)=>{if(!rz(t,r,n))return;let i=rY(r),o=setTimeout(()=>{e("SIGKILL");},i);o.unref&&o.unref();},rz=(e,{forceKillAfterTimeout:t},r)=>rW(e)&&!1!==t&&r,rW=e=>e===B(k).constants.signals.SIGTERM||"string"==typeof e&&"SIGTERM"===e.toUpperCase(),rY=({forceKillAfterTimeout:e=!0})=>{if(!0===e)return 5e3;if(!Number.isFinite(e)||e<0)throw TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);return e;},rJ=(e,t)=>{let r=e.kill();r&&(t.isCanceled=!0);},rQ=(e,t,r)=>{e.kill(t),r(Object.assign(Error("Timed out"),{timedOut:!0,signal:t}));},rZ=(e,{timeout:t,killSignal:r="SIGTERM"},n)=>{let i;if(0===t||void 0===t)return n;let o=new Promise((n,o)=>{i=setTimeout(()=>{rQ(e,r,o);},t);}),s=n.finally(()=>{clearTimeout(i);});return Promise.race([o,s]);},r0=({timeout:e})=>{if(void 0!==e&&(!Number.isFinite(e)||e<0))throw TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);},r1=async(e,{cleanup:t,detached:r},n)=>{if(!t||r)return n;let i=/*@__PURE__*/B(e2)(()=>{e.kill();});return n.finally(()=>{i();});};function r2(e){return null!==e&&"object"==typeof e&&"function"==typeof e.pipe;}function r4(e){return r2(e)&&!1!==e.writable&&"function"==typeof e._write&&"object"==typeof e._writableState;}const r3=e=>e instanceof A.ChildProcess&&"function"==typeof e.then,r6=(e,t,r)=>{if("string"==typeof r)return e[t].pipe((0,S.createWriteStream)(r)),e;if(r4(r))return e[t].pipe(r),e;if(!r3(r))throw TypeError("The second argument must be a string, a stream or an Execa child process.");if(!r4(r.stdin))throw TypeError("The target child process's stdin must be available.");return e[t].pipe(r.stdin),r;},r5=e=>{null!==e.stdout&&(e.pipeStdout=r6.bind(void 0,e,"stdout")),null!==e.stderr&&(e.pipeStderr=r6.bind(void 0,e,"stderr")),void 0!==e.all&&(e.pipeAll=r6.bind(void 0,e,"all"));},r8=e=>{if(void 0!==e)throw TypeError("The `input` and `inputFile` options cannot be both set.");},r7=({input:e,inputFile:t})=>"string"!=typeof t?e:(r8(e),(0,S.readFileSync)(t)),r9=e=>{let t=r7(e);if(r2(t))throw TypeError("The `input` option cannot be a stream in sync mode");return t;},ne=({input:e,inputFile:t})=>"string"!=typeof t?e:(r8(e),(0,S.createReadStream)(t)),nt=(e,t)=>{let r=ne(t);void 0!==r&&(r2(r)?r.pipe(e.stdin):e.stdin.end(r));},nr=(e,{all:t})=>{if(!t||!e.stdout&&!e.stderr)return;let r=/*@__PURE__*/B(tP)();return e.stdout&&r.add(e.stdout),e.stderr&&r.add(e.stderr),r;},nn=async(e,t)=>{// When `buffer` is `false`, `streamPromise` is `undefined` and there is no buffered data to retrieve
if(e&&void 0!==t){e.destroy();try{return await t;}catch(e){return e.bufferedData;}}},ni=(e,{encoding:t,buffer:r,maxBuffer:n})=>{if(e&&r)return t?/*@__PURE__*/B(tS)(e,{encoding:t,maxBuffer:n}):/*@__PURE__*/B(tS).buffer(e,{maxBuffer:n});},no=async({stdout:e,stderr:t,all:r},{encoding:n,buffer:i,maxBuffer:o},s)=>{let a=ni(e,{encoding:n,buffer:i,maxBuffer:o}),l=ni(t,{encoding:n,buffer:i,maxBuffer:o}),c=ni(r,{encoding:n,buffer:i,maxBuffer:2*o});try{return await Promise.all([s,a,l,c]);}catch(n){return Promise.all([{error:n,signal:n.signal,timedOut:n.timedOut},nn(e,a),nn(t,l),nn(r,c)]);}},ns=(async()=>{})().constructor.prototype,na=["then","catch","finally"].map(e=>[e,Reflect.getOwnPropertyDescriptor(ns,e)]),nl=(e,t)=>{for(let[r,n]of na){// Starting the main `promise` is deferred to avoid consuming streams
let i="function"==typeof t?(...e)=>Reflect.apply(n.value,t(),e):n.value.bind(t);Reflect.defineProperty(e,r,{...n,value:i});}},nc=e=>new Promise((t,r)=>{e.on("exit",(e,r)=>{t({exitCode:e,signal:r});}),e.on("error",e=>{r(e);}),e.stdin&&e.stdin.on("error",e=>{r(e);});}),nu=(e,t=[])=>Array.isArray(t)?[e,...t]:[e],nd=/^[\w.-]+$/,np=/"/g,nf=e=>"string"!=typeof e||nd.test(e)?e:`"${e.replace(np,'\\"')}"`,nh=(e,t)=>nu(e,t).join(" "),nm=(e,t)=>nu(e,t).map(e=>nf(e)).join(" "),ng=/ +/g,nv=e=>{let t=typeof e;if("string"===t)return e;if("number"===t)return String(e);if("object"===t&&null!==e&&!(e instanceof A.ChildProcess)&&"stdout"in e){let t=typeof e.stdout;if("string"===t)return e.stdout;if((0,R.Buffer).isBuffer(e.stdout))return e.stdout.toString();throw TypeError(`Unexpected "${t}" stdout in template expression`);}throw TypeError(`Unexpected "${t}" in template expression`);},ny=(e,t,r)=>r||0===e.length||0===t.length?[...e,...t]:[...e.slice(0,-1),`${e[e.length-1]}${t[0]}`,...t.slice(1)],nw=({templates:e,expressions:t,tokens:r,index:n,template:i})=>{let o=i??e.raw[n],s=o.split(ng).filter(Boolean),a=ny(r,s,o.startsWith(" "));if(n===t.length)return a;let l=t[n],c=Array.isArray(l)?l.map(e=>nv(e)):[nv(l)];return ny(a,c,o.endsWith(" "));},nx=(e,t)=>{let r=[];for(let[n,i]of e.entries())r=nw({templates:e,expressions:t,tokens:r,index:n,template:i});return r;},nE=(0,D.debuglog)("execa").enabled,nb=(e,t)=>String(e).padStart(t,"0"),nS=()=>{let e=new Date();return`${nb(e.getHours(),2)}:${nb(e.getMinutes(),2)}:${nb(e.getSeconds(),2)}.${nb(e.getMilliseconds(),3)}`;},n$=(e,{verbose:t})=>{t&&B(N).stderr.write(`[${nS()}] ${e}
`);},n_=({env:e,extendEnv:t,preferLocal:r,localDir:n,execPath:i})=>{let o=t?{...B(N).env,...e}:e;return r?function({env:e=B(N).env,...t}={}){e={...e};let r=rx({env:e});return t.path=e[r],e[r]=function(e={}){let t;let{cwd:r=B(N).cwd(),path:n=B(N).env[rx()],execPath:i=B(N).execPath}=e,o=r instanceof URL?B(L).fileURLToPath(r):r,s=B(P).resolve(o),a=[];for(;t!==s;)a.push(B(P).join(s,"node_modules/.bin")),t=s,s=B(P).resolve(s,"..");return(// Ensure the running `node` binary is used.
a.push(B(P).resolve(o,i,"..")),[...a,n].join(B(P).delimiter));}(t),e;}({env:o,cwd:n,execPath:i}):o;},nO=(e,t,r={})=>{let n=/*@__PURE__*/B(ec)._parse(e,t,r);return e=n.command,t=n.args,(r={maxBuffer:1e8,buffer:!0,stripFinalNewline:!0,extendEnv:!0,preferLocal:!1,localDir:(r=n.options).cwd||B(N).cwd(),execPath:B(N).execPath,encoding:"utf8",reject:!0,cleanup:!0,all:!1,windowsHide:!0,verbose:nE,...r}).env=n_(r),r.stdio=rq(r),"win32"===B(N).platform&&"cmd"===B(P).basename(e,".exe")&&t.unshift("/q"),{file:e,args:t,options:r,parsed:n};},nC=(e,t,r)=>"string"==typeof t||(0,R.Buffer).isBuffer(t)?e.stripFinalNewline?function(e){let t="string"==typeof e?"\n":"\n".charCodeAt(),r="string"==typeof e?"\r":"\r".charCodeAt();return e[e.length-1]===t&&(e=e.slice(0,-1)),e[e.length-1]===r&&(e=e.slice(0,-1)),e;}(t):t:void 0===r?void 0:"";function nI(e,t,r){let n;let i=nO(e,t,r),o=nh(e,t),s=nm(e,t);n$(s,i.options),r0(i.options);try{n=B(A).spawn(i.file,i.args,i.options);}catch(r){// Ensure the returned error is always both a promise and a child process
let e=new(B(A).ChildProcess)(),t=Promise.reject(rG({error:r,stdout:"",stderr:"",all:"",command:o,escapedCommand:s,parsed:i,timedOut:!1,isCanceled:!1,killed:!1}));return nl(e,t),e;}let a=nc(n),l=rZ(n,i.options,a),c=r1(n,i.options,l),u={isCanceled:!1};n.kill=rX.bind(null,n.kill.bind(n)),n.cancel=rJ.bind(null,n,u);let d=async()=>{let[{error:e,exitCode:t,signal:r,timedOut:a},l,d,p]=await no(n,i.options,c),f=nC(i.options,l),h=nC(i.options,d),m=nC(i.options,p);if(e||0!==t||null!==r){let l=rG({error:e,exitCode:t,signal:r,stdout:f,stderr:h,all:m,command:o,escapedCommand:s,parsed:i,timedOut:a,isCanceled:u.isCanceled||!!i.options.signal&&i.options.signal.aborted,killed:n.killed});if(!i.options.reject)return l;throw l;}return{command:o,escapedCommand:s,exitCode:0,stdout:f,stderr:h,all:m,failed:!1,timedOut:!1,isCanceled:!1,killed:!1};},p=rT(d);return nt(n,i.options),n.all=nr(n,i.options),r5(n),nl(n,p),n;}function nT(e,t,r){let n;let i=nO(e,t,r),o=nh(e,t),s=nm(e,t);n$(s,i.options);let a=r9(i.options);try{n=B(A).spawnSync(i.file,i.args,{...i.options,input:a});}catch(e){throw rG({error:e,stdout:"",stderr:"",all:"",command:o,escapedCommand:s,parsed:i,timedOut:!1,isCanceled:!1,killed:!1});}let l=nC(i.options,n.stdout,n.error),c=nC(i.options,n.stderr,n.error);if(n.error||0!==n.status||null!==n.signal){let e=rG({stdout:l,stderr:c,error:n.error,signal:n.signal,exitCode:n.status,command:o,escapedCommand:s,parsed:i,timedOut:n.error&&"ETIMEDOUT"===n.error.code,isCanceled:!1,killed:null!==n.signal});if(!i.options.reject)return e;throw e;}return{command:o,escapedCommand:s,exitCode:0,stdout:l,stderr:c,failed:!1,timedOut:!1,isCanceled:!1,killed:!1};}const nR=({input:e,inputFile:t,stdio:r})=>void 0===e&&void 0===t&&void 0===r?{stdin:"inherit"}:{},nP=(e={})=>({preferLocal:!0,...nR(e),...e});function nA(t,r=["-NoProfile","-NoLogo","-NonInteractive"],n={stdio:"inherit"}){return nI(function(){if(void 0===e){let t=/*@__PURE__*/B(ee).sync("pwsh",{nothrow:!0});null!==t&&(e=t);let r=/*@__PURE__*/B(ee).sync("powershell",{nothrow:!0});null!==r&&(e=r);}if(void 0===e)throw Error("Could not find powershell");return e;}(),[...r,"-c",t],n);}!function e(t){function r(n,...i){if(!Array.isArray(n))return e({...t,...n});let[o,...s]=nx(n,i);return nI(o,s,nP(t));}return r.sync=(e,...r)=>{if(!Array.isArray(e))throw TypeError("Please use $(options).sync`command` instead of $.sync(options)`command`.");let[n,...i]=nx(e,r);return nT(n,i,nP(t));},r;}();var nN={};// to detect on with os user had used path.resolve(...)
const nL="win32"!==f.platform(),nk=f.release(),nD=/(\d+\.\d+)\.(\d+)/,nU=(e="",t="")=>/1\d+\.\d+/.test(e)&&Number(t)>=17134.1184;function nj(e){if(("linux"===process.platform||"darwin"===process.platform)&&t3()&&void 0!==process.env.SUDO_USER){let t=(0,m.statSync)(e).isDirectory();t6("chown",[...(t?["-R"]:[]),process.env.SUDO_USER,e],{cwd:e,stdio:"inherit",shell:!0});}}nN=function(e){return nL?e.replace(/(\s+)/g,"\\$1"):nU(...nD.exec(nk).splice(1))?e:e.replace(/(\s+)/g,"%20");};var nM={};// Generated by CoffeeScript 1.10.0
(function(){var e,t;e=q("awj79"),t=function(e){return e.split("").reverse().join("");},nM=function(r,n,i){var o;return(null==n&&(n="'"),null==i&&(i="\\"),"string"!=typeof r)?r:(o=RegExp("(["+e(n)+"])(?!"+e(i)+")","g"),t(t(r).replace(o,"$1"+i)));};}).call(nM);var nF=q("dOmbL");const nB={shouldEscapeSpace:!1,shouldAddOnlyIfNotDefined:!1};async function nG(e,t,r=nB){let n=function(e,t=!1){let r=t?/*@__PURE__*/B(nN)(e):e;return/*@__PURE__*/B(nM)(r,'"',"\\");}(t??"",r.shouldEscapeSpace);try{if(X.GITHUB_ACTIONS)try{if(r.shouldAddOnlyIfNotDefined&&void 0!==process.env[e]){(0,ry.info)(`Environment variable ${e} is already defined. Skipping.`);return;}(0,ry.exportVariable)(e,n);}catch(t){(0,K.error)(t),await nX(e,n,r);}else await nX(e,n,r);}catch(t){(0,K.error)(t),(0,ry.setFailed)(`Failed to export environment variable ${e}=${n}. You should add it manually.`);}}const nH=[/\/usr\/bin\/?/,/\/usr\/local\/bin\/?/];async function nV(e){if(!/** Skip adding /usr/bin to PATH if it is already there */function(e){if(nH.some(t=>t.test(e))){let t=process.env.PATH?.split(h.delimiter)??[];return t.includes(e);}return!1;}(e)){process.env.PATH=`${e}${h.delimiter}${process.env.PATH}`;try{if(X.GITHUB_ACTIONS)try{(0,ry.addPath)(e);}catch(t){(0,K.error)(t),await nK(e);}else await nK(e);}catch(t){(0,K.error)(t),(0,ry.setFailed)(`Failed to add ${e} to the percistent PATH. You should add it manually.`);}}}const nq=t8(".cpprc");async function nX(e,t,r){let n=t??"";switch(process.platform){case"win32":if(r.shouldAddOnlyIfNotDefined&&void 0!==process.env[e]){(0,ry.info)(`Environment variable ${e} is already defined. Skipping.`);return;}// We do not use `execaSync(`setx PATH "${path};%PATH%"`)` because of its character limit
await nA(`[Environment]::SetEnvironmentVariable('${e}', '${n}', "User")`),(0,ry.info)(`${e}='${n}' was set in the environment.`);return;case"linux":case"darwin":await nW(),r.shouldAddOnlyIfNotDefined?((0,m.appendFileSync)(nq,`
if [ -z "\${${e}}" ]; then export ${e}="${n}"; fi
`),(0,ry.info)(`if not defined ${e} then ${e}="${n}" was added to "${nq}`)):((0,m.appendFileSync)(nq,`
export ${e}="${n}"
`),(0,ry.info)(`${e}="${n}" was added to "${nq}`));return;}process.env[e]=n;}async function nK(e){switch(process.platform){case"win32":// We do not use `execaSync(`setx PATH "${path};%PATH%"`)` because of its character limit and also because %PATH% is different for user and system
await nA(`$USER_PATH=([Environment]::GetEnvironmentVariable("PATH", "User")); [Environment]::SetEnvironmentVariable("PATH", "${e};$USER_PATH", "User")`),(0,ry.info)(`"${e}" was added to the PATH.`);return;case"linux":case"darwin":await nW(),(0,m.appendFileSync)(nq,`
export PATH="${e}:$PATH"
`),(0,ry.info)(`"${e}" was added to "${nq}"`);return;default:return;}}/* eslint-disable require-atomic-updates */let nz=!1;async function nW(){if(nz)return;// a variable that prevents source_cpprc from being called from .bashrc and .profile
let e="# Automatically Generated by setup-cpp\nexport SOURCE_CPPRC=0";if(await(0,nF.pathExists)(nq)){let t=(0,m.readFileSync)(nq,"utf8");if(t.includes(e))return;}(0,m.appendFileSync)(nq,`
${e}
`),(0,ry.info)(`Added ${e} to ${nq}`);// source cpprc in bashrc/profile
let t=`
# source .cpprc if SOURCE_CPPRC is not set to 0
if [[ "$SOURCE_CPPRC" != 0 && -f "${nq}" ]]; then source "${nq}"; fi
`;try{// source cpprc in .profile
let e=t8(".profile");(0,m.appendFileSync)(e,t),(0,ry.info)(`${t} was added to ${e}`);// source cpprc in .bashrc too
let r=t8(".bashrc");(0,m.appendFileSync)(r,t),(0,ry.info)(`${t} was added to ${r}`);}catch(e){(0,K.warning)(`Failed to add ${t} to .profile or .bashrc. You should add it manually: ${e}`);}nz=!0;}async function nY(){if(await(0,nF.pathExists)(nq)){let e=(0,m.readFileSync)(nq,"utf-8").split("\n"),t=[...new Set(e.reverse())].reverse()// remove duplicates, keeping the latest entry
;(0,m.writeFileSync)(nq,t.join("\n"));try{nj(nq);}catch{// ignore
}}}var nF=q("dOmbL"),nJ=q("9ag04"),K=q("ER74K"),nQ={},nZ={};F(nZ,"isexe",()=>n0),F(nZ,"sync",()=>n1);/**
 * This is the Posix implementation of isexe, which uses the file
 * mode and uid/gid values.
 *
 * @module
 */const n0=async(e,t={})=>{let{ignoreErrors:r=!1}=t;try{return n2(await(0,U.stat)(e),t);}catch(e){if(r||"EACCES"===e.code)return!1;throw e;}},n1=(e,t={})=>{let{ignoreErrors:r=!1}=t;try{return n2((0,m.statSync)(e),t);}catch(e){if(r||"EACCES"===e.code)return!1;throw e;}},n2=(e,t)=>e.isFile()&&n4(e,t),n4=(e,t)=>{let r=t.uid??process.getuid?.(),n=t.groups??process.getgroups?.()??[],i=t.gid??process.getgid?.()??n[0];if(void 0===r||void 0===i)throw Error("cannot get uid or gid");let o=new Set([i,...n]),s=e.mode,a=e.uid,l=e.gid,c=parseInt("100",8),u=parseInt("010",8),d=parseInt("001",8);return!!(s&d||s&u&&o.has(l)||s&c&&a===r||s&(c|u)&&0===r);};var n3={};F(n3,"isexe",()=>n6),F(n3,"sync",()=>n5);/**
 * This is the Windows implementation of isexe, which uses the file
 * extension and PATHEXT setting.
 *
 * @module
 */const n6=async(e,t={})=>{let{ignoreErrors:r=!1}=t;try{return n7(await(0,U.stat)(e),e,t);}catch(e){if(r||"EACCES"===e.code)return!1;throw e;}},n5=(e,t={})=>{let{ignoreErrors:r=!1}=t;try{return n7((0,m.statSync)(e),e,t);}catch(e){if(r||"EACCES"===e.code)return!1;throw e;}},n8=(e,t)=>{let{pathExt:r=process.env.PATHEXT||""}=t,n=r.split(";");if(-1!==n.indexOf(""))return!0;for(let t=0;t<n.length;t++){let r=n[t].toLowerCase(),i=e.substring(e.length-r.length).toLowerCase();if(r&&i===r)return!0;}return!1;},n7=(e,t,r)=>e.isFile()&&n8(t,r),n9=process.env._ISEXE_TEST_PLATFORM_||process.platform,ie="win32"===n9?n3:nZ,it=ie.isexe,ir=ie.sync;var ii=h.join,io=h.delimiter,is=h.sep,ia=h.posix;const il="win32"===process.platform,ic=new RegExp(`[${ia.sep}${is===ia.sep?"":is}]`.replace(/(\\)/g,"\\$1")),iu=RegExp(`^\\.${ic.source}`),id=e=>Object.assign(Error(`not found: ${e}`),{code:"ENOENT"}),ip=(e,{path:t=process.env.PATH,pathExt:r=process.env.PATHEXT,delimiter:n=io})=>{// If it has a slash, then we don't bother searching the pathenv.
// just check the file itself, and that's it.
let i=e.match(ic)?[""]:[// windows always checks the cwd first
...(il?[process.cwd()]:[]),...(t||/* istanbul ignore next: very unusual */"").split(n)];if(il){let t=r||[".EXE",".CMD",".BAT",".COM"].join(n),o=t.split(n).flatMap(e=>[e,e.toLowerCase()]);return e.includes(".")&&""!==o[0]&&o.unshift(""),{pathEnv:i,pathExt:o,pathExtExe:t};}return{pathEnv:i,pathExt:[""]};},ih=(e,t)=>{let r=/^".*"$/.test(e)?e.slice(1,-1):e,n=!r&&iu.test(t)?t.slice(0,2):"";return n+ii(r,t);},im=async(e,t={})=>{let{pathEnv:r,pathExt:n,pathExtExe:i}=ip(e,t),o=[];for(let s of r){let r=ih(s,e);for(let e of n){let n=r+e,s=await it(n,{pathExt:i,ignoreErrors:!0});if(s){if(!t.all)return n;o.push(n);}}}if(t.all&&o.length)return o;if(t.nothrow)return null;throw id(e);};nQ=im,im.sync=(e,t={})=>{let{pathEnv:r,pathExt:n,pathExtExe:i}=ip(e,t),o=[];for(let s of r){let r=ih(s,e);for(let e of n){let n=r+e,s=ir(n,{pathExt:i,ignoreErrors:!0});if(s){if(!t.all)return n;o.push(n);}}}if(t.all&&o.length)return o;if(t.nothrow)return null;throw id(e);};const{appendFile:ig}=m.promises;/* eslint-disable require-atomic-updates */let iv=!1,iy=!1;const iw=["E: Could not get lock","dpkg: error processing archive","dpkg: error: dpkg status database is locked by another process"];async function ix(e,t=!1){let r=iS()?"nala":"apt-get";for(let{name:t,version:n}of e)(0,K.info)(`Installing ${t} ${n??""} via ${r}`);process.env.DEBIAN_FRONTEND="noninteractive",(!iv||t)&&(i$(r),iv=!0),iy||(await i_(r),iy=!0);let n=[...new Set(e.flatMap(e=>e.repositories??[]))];if(0!==n.length){for(let e of n)t6("add-apt-repository",["-y",e]);i$(r);}let i=await Promise.all(e.map(e=>ib(e.name,e.version)));try{t6(r,["install","--fix-broken","-y",...i]);}catch(e){if("stderr"in e){let t=e.stderr;iw.some(e=>t.includes(e))&&((0,K.warning)(`Failed to install packages ${i}. Retrying...`),t6(r,["install","--fix-broken","-y",...i]));}else throw e;}return{binDir:"/usr/bin/"};}async function iE(e,t){if(void 0!==t&&""!==t){let{stdout:r}=await nI("apt-cache",["search","--names-only",`^${(0,nJ.default)(e)}-${(0,nJ.default)(t)}$`]);if(""!==r.trim())return u.NameDashVersion;try{// check if apt-get show can find the version
// eslint-disable-next-line @typescript-eslint/no-shadow
let{stdout:r}=await nI("apt-cache",["show",`${e}=${t}`]);if(""===r.trim())return u.NameEqualsVersion;}catch{// ignore
}}try{let{stdout:t}=await nI("apt-cache",["show",e]);if(""!==t.trim())return u.Name;}catch{// ignore
}return u.None;}async function ib(e,t){let r=await iE(e,t);switch(r){case u.NameDashVersion:return`${e}-${t}`;case u.NameEqualsVersion:return`${e}=${t}`;case u.Name:return e;case u.None:default:throw Error(`Could not find package ${e} ${t??""}`);}}function iS(){return null!==/*@__PURE__*/B(nQ).sync("nala",{nothrow:!0});}function i$(e){t6(e,"nala"!==e?["update","-y"]:["update"]);}/** Install apt utils and certificates (usually missing from docker containers) */async function i_(e){t6(e,["install","--fix-broken","-y","software-properties-common","apt-utils","ca-certificates","gnupg"]);let t=[iC(["3B4FE6ACC0B21F32","40976EAF437D05B5"],"setup-cpp-ubuntu-archive.gpg"),iC(["1E9377A2BA9EF27F"],"launchpad-toolchain.gpg")];"nala"===e&&t.push(nG("LANG","C.UTF-8",{shouldAddOnlyIfNotDefined:!0}),nG("LC_ALL","C.UTF-8",{shouldAddOnlyIfNotDefined:!0})),await Promise.all(t);}function iO(){t6("gpg",["-k"]);}async function iC(e,t,r="keyserver.ubuntu.com"){try{let n=`/etc/apt/trusted.gpg.d/${t}`;return(await(0,nF.pathExists)(n))||(iO(),await Promise.all(e.map(async e=>{await t5("gpg",["--no-default-keyring","--keyring",`gnupg-ring:${n}`,"--keyserver",r,"--recv-keys",e]),await t5("chmod",["644",n]);}))),n;}catch(e){(0,K.warning)(`Failed to add apt key via server ${r}: ${e}`);return;}}async function iI(e,t){let r=`/etc/apt/trusted.gpg.d/${e}`;return(await(0,nF.pathExists)(r))||(iO(),await ix([{name:"curl"},{name:"ca-certificates"}],void 0),await nI("curl",["-s",t,"-o",`/tmp/${e}`]),t6("gpg",["--no-default-keyring","--keyring",`gnupg-ring:${r}`,"--import",`/tmp/${e}`]),t6("chmod",["644",r])),r;}async function iT(e,t){return X.GITHUB_ACTIONS?t5("update-alternatives",["--install",`/usr/bin/${e}`,e,t,"40"]):(await nW(),ig(nq,`
if [ $UID -eq 0 ]; then update-alternatives --install /usr/bin/${e} ${e} ${t} 40; fi
`));}async function iR(e){try{// check if a package matching the regexp is installed
let{stdout:t}=await nI("dpkg",["-l",e]),r=t.split("\n");// check if the output contains any lines that start with "ii"
return r.some(e=>e.startsWith("ii"));}catch{return!1;}}(l=u||(u={}))[l.NameDashVersion=0]="NameDashVersion",l[l.NameEqualsVersion=1]="NameEqualsVersion",l[l.Name=2]="Name",l[l.None=3]="None";/* eslint-disable require-atomic-updates */var ry=q("lcRzN"),iP=(q("ceI0e"),q("ceI0e")),iA=q("fcBgE");async function iN(e,r,n){if(!["darwin","linux"].includes(process.platform))return;if("string"==typeof t)return{binDir:t};let i=/*@__PURE__*/B(nQ).sync("brew",{nothrow:!0});if(null!==i)return{binDir:t=(0,iP.dirname)(i)};// brew is not thread-safe
let o=B(h).join((0,f.tmpdir)(),"setup-cpp","brew");await(0,iA.mkdirP)(o),nT("curl",["-LJO","https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh"],{cwd:o});let s=(0,h.join)(o,"install.sh");if("linux"===process.platform){let e=(0,m.readFileSync)(s,"utf-8");e.replace("#!/bin/bash","");}return nT("/bin/bash",[s],{stdio:"inherit",env:{NONINTERACTIVE:"1"}}),t=iL(),await nV(t),{binDir:t};}function iL(){return"linux"===process.platform?"/home/linuxbrew/.linuxbrew/bin/":"/usr/local/bin/";}let ik=!1;async function iD(e,t,r=[]){(0,ry.info)(`Installing ${e} ${t??""} via brew`),ik&&null!==/*@__PURE__*/B(nQ).sync("brew",{nothrow:!0})||(await iN("","",process.arch),ik=!0);let n=iL();return nT((0,iP.join)(n,"brew"),["install",void 0!==t&&""!==t?`${e}@${t}`:e,...r],{stdio:"inherit"}),{binDir:n};}/* eslint-disable require-atomic-updates */ /* eslint-disable require-atomic-updates */var nF=q("dOmbL"),iP=q("ceI0e");async function iU(e,t,n){if("win32"!==process.platform)return;if("string"==typeof r)return{binDir:r};let i=/*@__PURE__*/B(nQ).sync("choco",{nothrow:!0});if(null!==i)return{binDir:r=(0,iP.dirname)(i)};let o="powershell.exe",s=/*@__PURE__*/B(nQ).sync(`${process.env.SystemRoot}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`,{nothrow:!0});null!==s&&(o=s),nT(o,["-NoProfile","-InputFormat","None","-ExecutionPolicy","Bypass","-Command","[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"],{stdio:"inherit"});let a=`${process.env.ALLUSERSPROFILE}\\chocolatey\\bin`;await nV(a);let l=/*@__PURE__*/B(nQ).sync("choco",{nothrow:!0});if(r=null!==l?(0,iP.dirname)(l):`${process.env.ChocolateyInstall??"C:/ProgramData/chocolatey"}/bin`,await(0,nF.pathExists)(r))return{binDir:r};}var K=q("ER74K");let ij=!1;async function iM(e,t,r=[]){(0,K.info)(`Installing ${e} ${t??""} via chocolatey`),ij&&null!==/*@__PURE__*/B(nQ).sync("choco",{nothrow:!0})||(await iU("","",process.arch),ij=!0);// https://github.com/jberezanski/ChocolateyPackages/issues/97#issuecomment-986825694
let n=process.env.PATH,i={...process.env};if(delete i.TMP,delete i.TEMP,delete i.Path,i.PATH=n,void 0!==t&&""!==t)nT("choco",["install","-y",e,`--version=${t}`,...r],{env:i,extendEnv:!1,stdio:"inherit"});else try{nT("choco",["install","-y",e,...r],{env:i,extendEnv:!1,stdio:"inherit"});}catch(t){// if the package requires a reboot, downgrade the error to a notice
if(t.message.includes("exit code 3010"))(0,K.info)(`${e} might require a reboot for the completion of the installation.`);else throw t;}let o=`${process.env.ChocolateyInstall??"C:/ProgramData/chocolatey"}/bin`;return await nV(o),{binDir:o};}function iF(){return"linux"===process.platform&&(void 0===o&&(o=null!==/*@__PURE__*/B(nQ).sync("pacman",{nothrow:!0})),o);}function iB(){return"linux"===process.platform&&(void 0===s&&(s=null!==/*@__PURE__*/B(nQ).sync("dnf",{nothrow:!0})),s);}async function iG(e){for(let{name:t,version:r}of e)(0,K.info)(`Installing ${t} ${r??""} via dnf`);let t=await Promise.all(e.map(e=>iH(e.name,e.version)));return t6("dnf",["-y","install",...t]),{binDir:"/usr/bin/"};}async function iH(e,t){if(void 0!==t&&""!==t){// check if name-version is available
let{stdout:r}=await nI("dnf",["search","-q",`${e}-${t}`]);if(""!==r.trim())return`${e}-${t}`;{// try with ${name}${version}
// eslint-disable-next-line @typescript-eslint/no-shadow
let{stdout:r}=await nI("dnf",["search","-q",`${e}${t}`]);if(""!==r.trim())return`${e}${t}`;(0,K.warning)(`Failed to install ${e} ${t} via dnf, trying without version`);}}return e;}function iV(){return"linux"===process.platform&&(void 0===a&&(a=null!==/*@__PURE__*/B(nQ).sync("apt-get",{nothrow:!0})),a);}async function iq(e,t,r){switch(process.platform){case"win32":// install bazelisk because it contains both
return iM("bazelisk",e);case"darwin":// install bazelisk because it contains both
return iD("bazelisk",e);case"linux":if(iF())throw Error("installing bazel on Arch linux is not supported yet");if(iB())return(// https://bazel.build/install/redhat
await iG([{name:"dnf-plugins-core"}]),t6("dnf",["copr","enable","vbatts/bazel"]),iG([{name:"bazel4"}]));if(iV()){// https://bazel.build/install/ubuntu
let t=await iI("bazel-archive-keyring.gpg","https://bazel.build/bazel-release.pub.gpg");return t6("bash",["-c",`echo "deb [arch=amd64 signed-by=${t}] https://storage.googleapis.com/bazel-apt stable jdk1.8" | tee /etc/apt/sources.list.d/bazel.list`]),ix([{name:"bazel",version:e}],!0);}throw Error("Unsupported linux distribution");default:throw Error("Unsupported platform");}}var K=(q("ER74K"),q("ER74K"));/* eslint-disable require-atomic-updates */let iX=!1,iK=!1;async function iz(e,t,r){(0,K.info)(`Installing ${e} ${t??""} via pacman`);let n="pacman";if("yay"===r&&null===/*@__PURE__*/B(nQ).sync("yay",{nothrow:!0}))throw Error(`yay is needed for ${e}, but it is not installed, please install it manually first`);iX||"yay"===r||(t6(n,["-Sy","--noconfirm"]),iX=!0),iK||"yay"===r||(t6(n,["-S","--noconfirm","base-devel"]),iK=!0);let i=e=>"yay"===r?nT(r,["-S","--noconfirm",e]):t6(r??n,["-S","--noconfirm",e]);if(void 0!==t&&""!==t){// check if version is available
let r=await iY(n,e);if(r.includes(t))try{i(`${e}=${t}`);}catch{i(`${e}${t}`);}else// try without version
(0,K.info)(`Failed to install ${e} ${t} via pacman, trying without version`),i(e);}else i(e);return{binDir:"/usr/bin/"};}const iW=/Version\s*:\s*(.*)/g;/** Query pacman for available versions */async function iY(e,t){let r=[];try{let{stdout:n}=await nI(e,["-Si",t]);for(let e of n.matchAll(iW))r.push(e[1]);}catch(e){(0,K.warning)(`Failed to get available versions for ${t}: ${e}`);}return r;}var iJ={},iQ=h.resolve(__dirname,"../../node_modules/.pnpm/@actions+tool-cache@2.0.1/node_modules/@actions/tool-cache/lib"),iZ=iJ&&iJ.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r];}});}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r];}),i0=iJ&&iJ.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t});}:function(e,t){e.default=t;}),i1=iJ&&iJ.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&iZ(t,e,r);return i0(t,e),t;},i2=iJ&&iJ.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{l(n.next(e));}catch(e){o(e);}}function a(e){try{l(n.throw(e));}catch(e){o(e);}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t);})).then(s,a);}l((n=n.apply(e,t||[])).next());});},i4=iJ&&iJ.__importDefault||function(e){return e&&e.__esModule?e:{default:e};};Object.defineProperty(iJ,"__esModule",{value:!0}),iJ.evaluateVersions=iJ.isExplicitVersion=iJ.findFromManifest=iJ.getManifestFromRepo=iJ.findAllVersions=iJ.find=iJ.cacheFile=iJ.cacheDir=iJ.extractZip=iJ.extractXar=iJ.extractTar=iJ.extract7z=iJ.downloadTool=iJ.HTTPError=void 0;const i3=i1(q("lcRzN")),i6=i1(q("fcBgE")),i5=i1(m),i8=i1(q("ktIRP")),i7=i1(f),i9=i1(h),oe=i1(q("iC7fc")),ot=i1(q("lJEXJ")),or=i1(I),on=i1(b),oi=i4(q("dGCqI"));var oo=q("jlr6Q"),os={},oa=os&&os.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r];}});}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r];}),ol=os&&os.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t});}:function(e,t){e.default=t;}),oc=os&&os.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&oa(t,e,r);return ol(t,e),t;},ou=os&&os.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{l(n.next(e));}catch(e){o(e);}}function a(e){try{l(n.throw(e));}catch(e){o(e);}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t);})).then(s,a);}l((n=n.apply(e,t||[])).next());});};Object.defineProperty(os,"__esModule",{value:!0}),os.RetryHelper=void 0;const od=oc(q("lcRzN"));os.RetryHelper=/**
 * Internal class for retries
 */class{constructor(e,t,r){if(e<1)throw Error("max attempts should be greater than or equal to 1");if(this.maxAttempts=e,this.minSeconds=Math.floor(t),this.maxSeconds=Math.floor(r),this.minSeconds>this.maxSeconds)throw Error("min seconds should be less than or equal to max seconds");}execute(e,t){return ou(this,void 0,void 0,function*(){let r=1;for(;r<this.maxAttempts;){// Try
try{break;}catch(e){if(t&&!t(e))throw e;od.info(e.message);}// Sleep
let e=this.getSleepAmount();od.info(`Waiting ${e} seconds before trying again`),yield this.sleep(e),r++;}// Last attempt
return yield e();});}getSleepAmount(){return Math.floor(Math.random()*(this.maxSeconds-this.minSeconds+1))+this.minSeconds;}sleep(e){return ou(this,void 0,void 0,function*(){return new Promise(t=>setTimeout(t,1e3*e));});}};class op extends Error{constructor(e){super(`Unexpected HTTP response: ${e}`),this.httpStatusCode=e,Object.setPrototypeOf(this,new.target.prototype);}}iJ.HTTPError=op;const of="win32"===process.platform,oh="darwin"===process.platform;/**
 * Finds the paths to all versions of a tool that are installed in the local tool cache
 *
 * @param toolName  name of the tool
 * @param arch      optional arch.  defaults to arch of computer
 */function om(e,t){let r=[];t=t||i7.arch();let n=i9.join(oE(),e);if(i5.existsSync(n)){let e=i5.readdirSync(n);for(let i of e)if(ow(i)){let e=i9.join(n,i,t||"");i5.existsSync(e)&&i5.existsSync(`${e}.complete`)&&r.push(i);}}return r;}function og(e){return i2(this,void 0,void 0,function*(){return e||(e=i9.join(ob(),oi.default())),yield i6.mkdirP(e),e;});}function ov(e,t,r){return i2(this,void 0,void 0,function*(){let n=i9.join(oE(),e,ot.clean(t)||t,r||"");i3.debug(`destination ${n}`);let i=`${n}.complete`;return yield i6.rmRF(n),yield i6.rmRF(i),yield i6.mkdirP(n),n;});}function oy(e,t,r){let n=i9.join(oE(),e,ot.clean(t)||t,r||""),i=`${n}.complete`;i5.writeFileSync(i,""),i3.debug("finished caching tool");}/**
 * Check if version string is explicit
 *
 * @param versionSpec      version string to check
 */function ow(e){let t=ot.clean(e)||"";i3.debug(`isExplicit: ${t}`);let r=null!=ot.valid(t);return i3.debug(`explicit? ${r}`),r;}/**
 * Get the highest satisfiying semantic version in `versions` which satisfies `versionSpec`
 *
 * @param versions        array of versions to evaluate
 * @param versionSpec     semantic version spec to satisfy
 */function ox(e,t){let r="";i3.debug(`evaluating ${e.length} versions`),e=e.sort((e,t)=>ot.gt(e,t)?1:-1);for(let n=e.length-1;n>=0;n--){let i=e[n],o=ot.satisfies(i,t);if(o){r=i;break;}}return r?i3.debug(`matched: ${r}`):i3.debug("match not found"),r;}/**
 * Gets RUNNER_TOOL_CACHE
 */function oE(){let e=process.env.RUNNER_TOOL_CACHE||"";return E.ok(e,"Expected RUNNER_TOOL_CACHE to be defined"),e;}/**
 * Gets RUNNER_TEMP
 */function ob(){let e=process.env.RUNNER_TEMP||"";return E.ok(e,"Expected RUNNER_TEMP to be defined"),e;}/**
 * Gets a global variable
 */function oS(e,t){/* eslint-disable @typescript-eslint/no-explicit-any */let r=G[e];/* eslint-enable @typescript-eslint/no-explicit-any */return void 0!==r?r:t;}iJ.downloadTool=/**
 * Download a tool from an url and stream it into a file
 *
 * @param url       url of tool to download
 * @param dest      path to download tool
 * @param auth      authorization header
 * @param headers   other headers
 * @returns         path to downloaded tool
 */function(e,t,r,n){return i2(this,void 0,void 0,function*(){t=t||i9.join(ob(),oi.default()),yield i6.mkdirP(i9.dirname(t)),i3.debug(`Downloading ${e}`),i3.debug(`Destination ${t}`);let i=oS("TEST_DOWNLOAD_TOOL_RETRY_MIN_SECONDS",10),o=oS("TEST_DOWNLOAD_TOOL_RETRY_MAX_SECONDS",20),s=new os.RetryHelper(3,i,o);return yield s.execute(()=>i2(this,void 0,void 0,function*(){return yield function(e,t,r,n){return i2(this,void 0,void 0,function*(){if(i5.existsSync(t))throw Error(`Destination file path ${t} already exists`);// Get the response headers
let i=new oe.HttpClient("actions/tool-cache",[],{allowRetries:!1});r&&(i3.debug("set auth"),void 0===n&&(n={}),n.authorization=r);let o=yield i.get(e,n);if(200!==o.message.statusCode){let t=new op(o.message.statusCode);throw i3.debug(`Failed to download from "${e}". Code(${o.message.statusCode}) Message(${o.message.statusMessage})`),t;}// Download the response body
let s=on.promisify(or.pipeline),a=oS("TEST_DOWNLOAD_TOOL_RESPONSE_MESSAGE_FACTORY",()=>o.message),l=a(),c=!1;try{return yield s(l,i5.createWriteStream(t)),i3.debug("download complete"),c=!0,t;}finally{// Error, delete dest before retry
if(!c){i3.debug("download failed");try{yield i6.rmRF(t);}catch(e){i3.debug(`Failed to delete '${t}'. ${e.message}`);}}}});}(e,t||"",r,n);}),e=>!(e instanceof op)||!e.httpStatusCode||!(e.httpStatusCode<500)||408===e.httpStatusCode||429===e.httpStatusCode);});},iJ.extract7z=/**
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
 */function(e,t,r){return i2(this,void 0,void 0,function*(){E.ok(of,"extract7z() not supported on current OS"),E.ok(e,'parameter "file" is required'),t=yield og(t);let n=process.cwd();if(process.chdir(t),r)try{let t=i3.isDebug()?"-bb1":"-bb0",n=["x",t,"-bd","-sccUTF-8",e];yield oo.exec(`"${r}"`,n,{silent:!0});}finally{process.chdir(n);}else{let r=i9.join(iQ,"..","scripts","Invoke-7zdec.ps1").replace(/'/g,"''").replace(/"|\n|\r/g,""),i=e.replace(/'/g,"''").replace(/"|\n|\r/g,""),o=t.replace(/'/g,"''").replace(/"|\n|\r/g,""),s=`& '${r}' -Source '${i}' -Target '${o}'`;// double-up single quotes, remove double quotes and newlines
try{let e=yield i6.which("powershell",!0);yield oo.exec(`"${e}"`,["-NoLogo","-Sta","-NoProfile","-NonInteractive","-ExecutionPolicy","Unrestricted","-Command",s],{silent:!0});}finally{process.chdir(n);}}return t;});},iJ.extractTar=/**
 * Extract a compressed tar archive
 *
 * @param file     path to the tar
 * @param dest     destination directory. Optional.
 * @param flags    flags for the tar command to use for extraction. Defaults to 'xz' (extracting gzipped tars). Optional.
 * @returns        path to the destination directory
 */function(e,t,r="xz"){return i2(this,void 0,void 0,function*(){let n;if(!e)throw Error("parameter 'file' is required");// Create dest
t=yield og(t),// Determine whether GNU tar
i3.debug("Checking tar --version");let i="";yield oo.exec("tar --version",[],{ignoreReturnCode:!0,silent:!0,listeners:{stdout:e=>i+=e.toString(),stderr:e=>i+=e.toString()}}),i3.debug(i.trim());let o=i.toUpperCase().includes("GNU TAR");n=r instanceof Array?r:[r],i3.isDebug()&&!r.includes("v")&&n.push("-v");let s=t,a=e;return of&&o&&(n.push("--force-local"),s=t.replace(/\\/g,"/"),// Technically only the dest needs to have `/` but for aesthetic consistency
// convert slashes in the file arg too.
a=e.replace(/\\/g,"/")),o&&(// Suppress warnings when using GNU tar to extract archives created by BSD tar
n.push("--warning=no-unknown-keyword"),n.push("--overwrite")),n.push("-C",s,"-f",a),yield oo.exec("tar",n),t;});},iJ.extractXar=/**
 * Extract a xar compatible archive
 *
 * @param file     path to the archive
 * @param dest     destination directory. Optional.
 * @param flags    flags for the xar. Optional.
 * @returns        path to the destination directory
 */function(e,t,r=[]){return i2(this,void 0,void 0,function*(){let n;E.ok(oh,"extractXar() not supported on current OS"),E.ok(e,'parameter "file" is required'),t=yield og(t),(n=r instanceof Array?r:[r]).push("-x","-C",t,"-f",e),i3.isDebug()&&n.push("-v");let i=yield i6.which("xar",!0);return yield oo.exec(`"${i}"`,Array.from(new Set(n))),t;});},iJ.extractZip=/**
 * Extract a zip
 *
 * @param file     path to the zip
 * @param dest     destination directory. Optional.
 * @returns        path to the destination directory
 */function(e,t){return i2(this,void 0,void 0,function*(){if(!e)throw Error("parameter 'file' is required");return t=yield og(t),of?yield function(e,t){return i2(this,void 0,void 0,function*(){// build the powershell command
let r=e.replace(/'/g,"''").replace(/"|\n|\r/g,""),n=t.replace(/'/g,"''").replace(/"|\n|\r/g,""),i=yield i6.which("pwsh",!1);// double-up single quotes, remove double quotes and newlines
//To match the file overwrite behavior on nix systems, we use the overwrite = true flag for ExtractToDirectory
//and the -Force flag for Expand-Archive as a fallback
if(i){//attempt to use pwsh with ExtractToDirectory, if this fails attempt Expand-Archive
let e=`$ErrorActionPreference = 'Stop' ; try { Add-Type -AssemblyName System.IO.Compression.ZipFile } catch { } ; try { [System.IO.Compression.ZipFile]::ExtractToDirectory('${r}', '${n}', $true) } catch { if (($_.Exception.GetType().FullName -eq 'System.Management.Automation.MethodException') -or ($_.Exception.GetType().FullName -eq 'System.Management.Automation.RuntimeException') ){ Expand-Archive -LiteralPath '${r}' -DestinationPath '${n}' -Force } else { throw $_ } } ;`,t=["-NoLogo","-NoProfile","-NonInteractive","-ExecutionPolicy","Unrestricted","-Command",e];i3.debug(`Using pwsh at path: ${i}`),yield oo.exec(`"${i}"`,t);}else{let e=`$ErrorActionPreference = 'Stop' ; try { Add-Type -AssemblyName System.IO.Compression.FileSystem } catch { } ; if ((Get-Command -Name Expand-Archive -Module Microsoft.PowerShell.Archive -ErrorAction Ignore)) { Expand-Archive -LiteralPath '${r}' -DestinationPath '${n}' -Force } else {[System.IO.Compression.ZipFile]::ExtractToDirectory('${r}', '${n}', $true) }`,t=["-NoLogo","-Sta","-NoProfile","-NonInteractive","-ExecutionPolicy","Unrestricted","-Command",e],i=yield i6.which("powershell",!0);i3.debug(`Using powershell at path: ${i}`),yield oo.exec(`"${i}"`,t);}});}(e,t):yield function(e,t){return i2(this,void 0,void 0,function*(){let r=yield i6.which("unzip",!0),n=[e];i3.isDebug()||n.unshift("-q"),n.unshift("-o"),yield oo.exec(`"${r}"`,n,{cwd:t});});}(e,t),t;});},iJ.cacheDir=/**
 * Caches a directory and installs it into the tool cacheDir
 *
 * @param sourceDir    the directory to cache into tools
 * @param tool          tool name
 * @param version       version of the tool.  semver format
 * @param arch          architecture of the tool.  Optional.  Defaults to machine architecture
 */function(e,t,r,n){return i2(this,void 0,void 0,function*(){if(r=ot.clean(r)||r,n=n||i7.arch(),i3.debug(`Caching tool ${t} ${r} ${n}`),i3.debug(`source dir: ${e}`),!i5.statSync(e).isDirectory())throw Error("sourceDir is not a directory");// Create the tool dir
let i=yield ov(t,r,n);// copy each child item. do not move. move can fail on Windows
// due to anti-virus software having an open handle on a file.
for(let t of i5.readdirSync(e)){let r=i9.join(e,t);yield i6.cp(r,i,{recursive:!0});}return(// write .complete
oy(t,r,n),i);});},iJ.cacheFile=/**
 * Caches a downloaded file (GUID) and installs it
 * into the tool cache with a given targetName
 *
 * @param sourceFile    the file to cache into tools.  Typically a result of downloadTool which is a guid.
 * @param targetFile    the name of the file name in the tools directory
 * @param tool          tool name
 * @param version       version of the tool.  semver format
 * @param arch          architecture of the tool.  Optional.  Defaults to machine architecture
 */function(e,t,r,n,i){return i2(this,void 0,void 0,function*(){if(n=ot.clean(n)||n,i=i||i7.arch(),i3.debug(`Caching tool ${r} ${n} ${i}`),i3.debug(`source file: ${e}`),!i5.statSync(e).isFile())throw Error("sourceFile is not a file");// create the tool dir
let o=yield ov(r,n,i),s=i9.join(o,t);return i3.debug(`destination file ${s}`),yield i6.cp(e,s),// write .complete
oy(r,n,i),o;});},iJ.find=/**
 * Finds the path to a tool version in the local installed tool cache
 *
 * @param toolName      name of the tool
 * @param versionSpec   version of the tool
 * @param arch          optional arch.  defaults to arch of computer
 */function(e,t,r){if(!e)throw Error("toolName parameter is required");if(!t)throw Error("versionSpec parameter is required");// attempt to resolve an explicit version
if(r=r||i7.arch(),!ow(t)){let n=om(e,r),i=ox(n,t);t=i;}// check for the explicit version in the cache
let n="";if(t){t=ot.clean(t)||"";let i=i9.join(oE(),e,t,r);i3.debug(`checking cache: ${i}`),i5.existsSync(i)&&i5.existsSync(`${i}.complete`)?(i3.debug(`Found tool in cache ${e} ${t} ${r}`),n=i):i3.debug("not found");}return n;},iJ.findAllVersions=om,iJ.getManifestFromRepo=function(e,t,r,n="master"){return i2(this,void 0,void 0,function*(){let i=[],o=`https://api.github.com/repos/${e}/${t}/git/trees/${n}`,s=new oe.HttpClient("tool-cache"),a={};r&&(i3.debug("set auth"),a.authorization=r);let l=yield s.getJson(o,a);if(!l.result)return i;let c="";for(let e of l.result.tree)if("versions-manifest.json"===e.path){c=e.url;break;}a.accept="application/vnd.github.VERSION.raw";let u=yield(yield s.get(c,a)).readBody();if(u){// shouldn't be needed but protects against invalid json saved with BOM
u=u.replace(/^\uFEFF/,"");try{i=JSON.parse(u);}catch(e){i3.debug("Invalid json");}}return i;});},iJ.findFromManifest=function(e,t,r,n=i7.arch()){return i2(this,void 0,void 0,function*(){// wrap the internal impl
let i=yield i8._findMatch(e,t,r,n);return i;});},iJ.isExplicitVersion=ow,iJ.evaluateVersions=ox;var o$=q("1ndHP"),o_=q("9hSY8"),iP=q("ceI0e"),K=q("ER74K"),X=q("dTX7a"),nF=q("dOmbL"),oO={};Object.defineProperty(oO,"__esModule",{value:!0}),oO.retryAsPromised=oO.TimeoutError=void 0;class oC extends Error{constructor(e,t){super(e),this.name="TimeoutError",this.previous=t;}}function oI(e,t){if(!e||!t)throw Error("retry-as-promised must be passed a callback and a options set");t="number"==typeof t?{max:t}:t;let r={$current:"$current"in t?t.$current:1,max:t.max,timeout:t.timeout||void 0,match:t.match?Array.isArray(t.match)?t.match:[t.match]:[],backoffBase:void 0===t.backoffBase?100:t.backoffBase,backoffExponent:t.backoffExponent||1.1,report:t.report,name:t.name||e.name||"unknown"};return r.match&&!Array.isArray(r.match)&&(r.match=[r.match]),r.report&&r.report("Trying "+r.name+" #"+r.$current+" at "+new Date().toLocaleTimeString(),r),new Promise(function(t,n){let i,o,s;r.timeout&&(i=setTimeout(function(){o&&clearTimeout(o),n(new oC(r.name+" timed out",s));},r.timeout)),Promise.resolve(e({current:r.$current})).then(t).then(function(){i&&clearTimeout(i),o&&clearTimeout(o);}).catch(function(a){i&&clearTimeout(i),o&&clearTimeout(o),s=a,r.report&&r.report(a&&a.toString()||a,r,a);// Should not retry if max has been reached
var l=r.$current<r.max;if(!l||!(l=0===r.match.length||r.match.some(function(e){return function(e,t){if("function"==typeof e)try{if(t instanceof e)return!0;}catch(r){return!!e(t);}return e===t.toString()||e===t.message||e instanceof RegExp&&(e.test(t.message)||e.test(t.toString()));}(e,a);})))return n(a);var c=r.backoffBase*Math.pow(r.backoffExponent,r.$current-1);// Do some accounting
r.$current++,r.report&&r.report(`Retrying ${r.name} (${r.$current})`,r),c?(r.report&&r.report(`Delaying retry of ${r.name} by ${c}`,r),o=setTimeout(function(){oI(e,r).then(t).catch(n);},c)):oI(e,r).then(t).catch(n);});});}oO.TimeoutError=oC,oO.retryAsPromised=oI,oO.default=oI;let oT=!1;async function oR(e,t,r,n,i){(0,K.info)(`Installing ${e} ${t} ${i} via direct downloading`),process.env.RUNNER_TEMP=process.env.RUNNER_TEMP??(0,f.tmpdir)(),process.env.RUNNER_TOOL_CACHE=process.env.RUNNER_TOOL_CACHE??(0,iP.join)((0,f.tmpdir)(),"setup-cpp","hostedtoolcache");let{url:o,binRelativeDir:s,binFileName:a,extractedFolderName:l,extractFunction:c}=await r(t,process.platform,i);// Restore from cache (if found).
if(X.GITHUB_ACTIONS)try{let r=(0,iJ.find)(e,t);if(r){let n=(0,iP.join)(r,l),i=(0,iP.join)(n,s);if(await(0,nF.pathExists)((0,iP.join)(i,a)))return(0,K.info)(`${e} ${t} was found in the cache at ${i}.`),await nV(i),{installDir:n,binDir:i};}}catch{// fails on a local machine?
}let u=(0,iP.join)(n,l),d=(0,iP.join)(u,s),p=(0,iP.join)(d,a);// download ane extract the package into the installation directory.
if((await Promise.all([(0,nF.pathExists)(d),(0,nF.pathExists)(p)])).includes(!1))try{(0,K.info)(`Download ${e} ${t}`);// try to download the package 4 times with 2 seconds delay
let r=await/*@__PURE__*/B(oO)(()=>(0,iJ.downloadTool)(o),{name:o,max:4,backoffBase:2e3,report:e=>(0,K.info)(e)});oT||((0,K.info)("Installing extraction dependencies"),"linux"===process.platform&&(iF()?await Promise.all([iz("unzip"),iz("tar"),iz("xz")]):iB()?await iG([{name:"unzip"},{name:"tar"},{name:"xz"}]):iV()&&(await ix([{name:"unzip"},{name:"tar"},{name:"xz-utils"}]))),// eslint-disable-next-line require-atomic-updates
oT=!0),(0,K.info)(`Extracting ${r} to ${n}`),await c?.(r,n);// if (typeof extractedBinDir === "string") {
//   binDir = extractedBinDir
//   installDir = extractedBinDir
// }
}catch(r){throw Error(`Failed to download ${e} ${t} ${i} from ${o}: ${r}`);}return(// Adding the bin dir to the path
/** The directory which the tool is installed to */(0,K.info)(`Add ${d} to PATH`),await nV(d),X.GITHUB_ACTIONS&&"string"==typeof process.env.RUNNER_TOOL_CACHE&&(await(0,iJ.cacheDir)(n,e,t)),{installDir:u,binDir:d});}var iP=q("ceI0e"),iA=q("fcBgE");function oP(e,t,r){switch(process.platform){case"win32":return iM("7zip",e);case"darwin":return iD("p7zip",e);case"linux":if(iF())return iz("p7zip",e);if(iB())return iG([{name:"p7zip",version:e},{name:"p7zip-plugins",version:e}]);if(iV())return ix([{name:"p7zip-full",version:e}]);throw Error("Unsupported linux distribution");default:throw Error("Unsupported platform");}}var K=q("ER74K");async function oA(e,t){return await nI(await oN(),["x",e,`-o${t}`,"-y"],{stdio:"inherit"}),nj(t),t;}/// install 7z if needed
async function oN(){return void 0===n&&(null===/*@__PURE__*/B(nQ).sync("7z",{nothrow:!0})&&(await oP("","",process.arch)),// eslint-disable-next-line require-atomic-updates
n="7z"),n;}function oL(e,t){return oA(e,t);}function ok(e,t){return oA(e,t);}async function oD(e,t,r=["--strip-components=0"]){try{await(0,iA.mkdirP)(t);}catch{// ignore
}// TODO windows fails to create symlinks
// https://github.com/heroku/heroku-slugs/issues/3
try{await nI("tar",["xf",e,"-C",t,...r],{stdio:"inherit"});}catch(r){"win32"===process.platform&&r.message.includes("Can't create '\\\\?\\C:")&&(0,K.warning)(`Failed to extract symlink ${e} to ${t}. Ignoring this symlink.`);}return nj(t),t;}/** Get the platform data for cmake */function oU(e,t,r){let n=/*@__PURE__*/B(o_)(e)??e;switch(t){case"win32":{let t;let i=/*@__PURE__*/B(o$)(n,"v3.19.6");t=["ia32","x86","i386","x32"].includes(r)?i?"win32-x86":"windows-i386":i?"win64-x64":"windows-x86_64";let o=`cmake-${e}-${t}`;return{binRelativeDir:"bin/",binFileName:(0,iP.addExeExt)("cmake"),extractedFolderName:o,extractFunction:ok,url:`https://github.com/Kitware/CMake/releases/download/v${e}/${o}.zip`};}case"darwin":{let t=/*@__PURE__*/B(o$)(n,"v3.19.1"),r=`cmake-${e}-${t?"Darwin-x86_64":"macos-universal"}`;return{binRelativeDir:"CMake.app/Contents/bin/",binFileName:(0,iP.addExeExt)("cmake"),extractedFolderName:r,extractFunction:iJ.extractTar,url:`https://github.com/Kitware/CMake/releases/download/v${e}/${r}.tar.gz`};}case"linux":{let t;let i=/*@__PURE__*/B(o$)(n,"v3.19.8");t=["aarch64"].includes(r)?i?"Linux-aarch64":"linux-aarch64":i?"Linux-x86_64":"linux-x86_64";let o=`cmake-${e}-${t}`;return{binRelativeDir:"bin/",binFileName:(0,iP.addExeExt)("cmake"),extractedFolderName:o,extractFunction:iJ.extractTar,url:`https://github.com/Kitware/CMake/releases/download/v${e}/${o}.tar.gz`};}default:throw Error(`Unsupported platform '${t}'`);}}function oj(e,t,r){return oR("cmake",e,oU,t,r);}var ry=q("lcRzN"),nF=q("dOmbL"),iP=q("ceI0e"),oo=q("jlr6Q"),X=q("dTX7a"),K=q("ER74K"),oM={isEqual:!0,isMatchingKey:!0,isPromise:!0,maxSize:!0,onCacheAdd:!0,onCacheChange:!0,onCacheHit:!0,transformKey:!0},oF=Array.prototype.slice;/**
 * @function cloneArray
 *
 * @description
 * clone the array-like object and return the new array
 *
 * @param arrayLike the array-like object to clone
 * @returns the clone as an array
 */function oB(e){var t=e.length;return t?1===t?[e[0]]:2===t?[e[0],e[1]]:3===t?[e[0],e[1],e[2]]:oF.call(e,0):[];}/**
 * @function isSameValueZero
 *
 * @description
 * are the objects equal based on SameValueZero equality
 *
 * @param object1 the first object to compare
 * @param object2 the second object to compare
 * @returns are the two objects equal
 */function oG(e,t){// eslint-disable-next-line no-self-compare
return e===t||e!=e&&t!=t;}/**
 * @function mergeOptions
 *
 * @description
 * merge the options into the target
 *
 * @param existingOptions the options provided
 * @param newOptions the options to include
 * @returns the merged options
 */function oH(e,t){var r={};/* eslint-disable no-restricted-syntax */for(var n in e)r[n]=e[n];for(var n in t)r[n]=t[n];/* eslint-enable */return r;}// utils
var oV=/** @class */function(){function e(e){this.keys=[],this.values=[],this.options=e;var t="function"==typeof e.isMatchingKey;t?this.getKeyIndex=this._getKeyIndexFromMatchingKey:e.maxSize>1?this.getKeyIndex=this._getKeyIndexForMany:this.getKeyIndex=this._getKeyIndexForSingle,this.canTransformKey="function"==typeof e.transformKey,this.shouldCloneArguments=this.canTransformKey||t,this.shouldUpdateOnAdd="function"==typeof e.onCacheAdd,this.shouldUpdateOnChange="function"==typeof e.onCacheChange,this.shouldUpdateOnHit="function"==typeof e.onCacheHit;}return Object.defineProperty(e.prototype,"size",{/**
         * The number of cached [key,value] results.
         */get:function(){return this.keys.length;},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"snapshot",{/**
         * A copy of the cache at a moment in time. This is useful
         * to compare changes over time, since the cache mutates
         * internally for performance reasons.
         */get:function(){return{keys:oB(this.keys),size:this.size,values:oB(this.values)};},enumerable:!1,configurable:!0}),/**
     * Gets the matching key index when a custom key matcher is used.
     */e.prototype._getKeyIndexFromMatchingKey=function(e){var t=this.options,r=t.isMatchingKey,n=t.maxSize,i=this.keys,o=i.length;if(!o)return-1;if(r(i[0],e))return 0;if(n>1){for(var s=1;s<o;s++)if(r(i[s],e))return s;}return-1;},/**
     * Gets the matching key index when multiple keys are used.
     */e.prototype._getKeyIndexForMany=function(e){var t,r,n=this.options.isEqual,i=this.keys,o=i.length;if(!o)return-1;if(1===o)return this._getKeyIndexForSingle(e);var s=e.length;if(s>1){for(var a=0;a<o;a++)if((t=i[a]).length===s){for(r=0;r<s&&n(t[r],e[r]);r++);if(r===s)return a;}}else for(var a=0;a<o;a++)if((t=i[a]).length===s&&n(t[0],e[0]))return a;return-1;},/**
     * Gets the matching key index when a single key is used.
     */e.prototype._getKeyIndexForSingle=function(e){var t=this.keys;if(!t.length)return-1;var r=t[0],n=r.length;if(e.length!==n)return-1;var i=this.options.isEqual;if(n>1){for(var o=0;o<n;o++)if(!i(r[o],e[o]))return-1;return 0;}return i(r[0],e[0])?0:-1;},/**
     * Order the array based on a Least-Recently-Used basis.
     */e.prototype.orderByLru=function(e,t,r){for(var n=this.keys,i=this.values,o=n.length,s=r;s--;)n[s+1]=n[s],i[s+1]=i[s];n[0]=e,i[0]=t;var a=this.options.maxSize;o===a&&r===o?(n.pop(),i.pop()):r>=a&&(n.length=i.length=a);},/**
     * Update the promise method to auto-remove from cache if rejected, and
     * if resolved then fire cache hit / changed.
     */e.prototype.updateAsyncCache=function(e){var t=this,r=this.options,n=r.onCacheChange,i=r.onCacheHit,o=this.keys[0],s=this.values[0];this.values[0]=s.then(function(r){return t.shouldUpdateOnHit&&i(t,t.options,e),t.shouldUpdateOnChange&&n(t,t.options,e),r;},function(e){var r=t.getKeyIndex(o);throw-1!==r&&(t.keys.splice(r,1),t.values.splice(r,1)),e;});},e;}();function oq(e,t){if(void 0===t&&(t={}),"function"==typeof e&&e.isMemoized)return oq(e.fn,oH(e.options,t));if("function"!=typeof e)throw TypeError("You must pass a function to `memoize`.");var r=t.isEqual,n=t.isMatchingKey,i=t.isPromise,o=void 0!==i&&i,s=t.maxSize,a=t.onCacheAdd,l=t.onCacheChange,c=t.onCacheHit,u=t.transformKey,d=oH({isEqual:void 0===r?oG:r,isMatchingKey:n,isPromise:o,maxSize:void 0===s?1:s,onCacheAdd:a,onCacheChange:l,onCacheHit:c,transformKey:u},/**
 * @function getCustomOptions
 *
 * @description
 * get the custom options on the object passed
 *
 * @param options the memoization options passed
 * @returns the custom options passed
 */function(e){var t={};/* eslint-disable no-restricted-syntax */for(var r in e)oM[r]||(t[r]=e[r]);/* eslint-enable */return t;}(t)),p=new oV(d),f=p.keys,h=p.values,m=p.canTransformKey,g=p.shouldCloneArguments,v=p.shouldUpdateOnAdd,y=p.shouldUpdateOnChange,w=p.shouldUpdateOnHit,x=function(){var t=g?oB(arguments):arguments;m&&(t=u(t));var r=f.length?p.getKeyIndex(t):-1;if(-1!==r)w&&c(p,d,x),r&&(p.orderByLru(f[r],h[r],r),y&&l(p,d,x));else{var n=e.apply(this,arguments),i=g?t:oB(arguments);p.orderByLru(i,n,f.length),o&&p.updateAsyncCache(x),v&&a(p,d,x),y&&l(p,d,x);}return h[0];};return x.cache=p,x.fn=e,x.isMemoized=!0,x.options=d,x;}var iP=q("ceI0e");function oX(e,t){return new Promise(r=>{try{let n=(0,y.request)(e,{method:t},e=>{r(void 0!==e.statusCode&&e.statusCode>=200&&e.statusCode<=399);});n.on("error",e=>{r(!1);}),n.end();}catch{r(!1);}});}var oK=e=>{if("string"!=typeof e)return!1;let t=e.trim();if(t.includes(" "))return!1;try{return new j.URL(t),!0;}catch{return!1;}},oz=async e=>{let t=oK(e);if(!t)return!1;let r=await oX(e,"HEAD");return!!r||!!(r=await oX(e,"GET"));},oW=q("3Z6CK"),o_=q("9hSY8"),oY=q("eJTZB"),oo=q("jlr6Q"),K=q("ER74K");function oJ(e,t){return Array.from(e).filter(e=>/^\d+\.\d+\.\d+$/.test(e)&&e.startsWith(t)).sort((e,t)=>{try{return/*@__PURE__*/B(oW)(e,t);}catch(r){return e.localeCompare(t);}}).reverse();}async function oQ(e,t,r,n){// specific ubuntu version
if("linux"===t&&r.includes("ubuntu")){let e=await n(t,r);// eslint-disable-next-line no-await-in-loop
if(null!==e&&(await oz(e)))return[r,e];}// if the given set doesn't include the version, throw an error
if(!e.has(r))throw Error(`Unsupported target! (platform='${t}', version='${r}'). Try one of the following: ${JSON.stringify(e)}`);let i=[];// TODO use Promise.any
for(let o of oJ(e,r)){// eslint-disable-next-line no-await-in-loop
let e=await n(t,o);if(null!==e){// eslint-disable-next-line no-await-in-loop
if(await oz(e))return[o,e];i.push(e);}}throw Error(`Unsupported target! (platform='${t}', version='${r}'). Try one of the following: ${JSON.stringify(e)}`);}const oZ=/v?(\d\S*)/;async function o0(e,t=oZ){try{let r=await(0,oo.getExecOutput)(e,["--version"]),n=r.stdout||r.stderr||"",i=n.trim().match(t)?.[1];return/*@__PURE__*/B(o_)(i)??void 0;}catch(e){console.error(e);return;}}async function o1(e,t,r=oZ){let n=await o0(e,r);return void 0!==n&&""!==t&&-1!==/*@__PURE__*/B(oW)(n,t);}// passing "" to a tool installed by a package manager (apt, brew, choco) will result in the default version of that package manager.
// the directly downloaded tools require a given version ("" doesn't work).
function o2(){switch(process.platform){case"win32":default:return"16.0.6";case"linux":// used for non-ubuntu (Fedora, Arch)
return"16.0.4-ubuntu-22.04";case"darwin":return"15.0.3";}}const o4={llvm:o2(),clangtidy:o2(),clangformat:o2(),ninja:"1.11.1",cmake:"3.27.4",gcovr:"6.0",conan:"1.60.2",meson:"1.2.1",kcov:"42",task:"3.29.1",doxygen:iF()?"1.9.8-1":"1.9.8",gcc:iF()?"13.2.1-3":"13"},o3={pip:"22.2.0",python:"3.7.9"},o6={gcc:{22:"13",20:"11",18:"11",16:"11",14:"11"},mingw:{22:"8.0.0-1",20:"7.0.0-2"},llvm:{22:"16.0.4-ubuntu-22.04",20:"16.0.4-ubuntu-22.04",18:"15.0.6-ubuntu-18.04",16:"15.0.6-ubuntu-18.04",14:"13.0.0-ubuntu-16.04"},clangtidy:{22:"16.0.4-ubuntu-22.04",20:"16.0.4-ubuntu-22.04",18:"15.0.6-ubuntu-18.04",16:"15.0.6-ubuntu-18.04",14:"13.0.0-ubuntu-16.04"},clangformat:{22:"16.0.4-ubuntu-22.04",20:"16.0.4-ubuntu-22.04",18:"15.0.6-ubuntu-18.04",16:"15.0.6-ubuntu-18.04",14:"13.0.0-ubuntu-16.04"},gcovr:{22:"6.0",20:"6.0",18:"5.0"},meson:{20:"1.0.0",18:"0.61.4"},nala:{22:"",21:"legacy",20:"legacy",18:"legacy",16:"legacy",14:"legacy"},kcov:{22:"42-binary",20:"40-binary",18:"40",16:"40",14:"40"}};var nF=q("dOmbL");async function o5(e,t,r){let n=await o9(e,t,r);B(E)(void 0!==n.bin);let i=n.bin,o=await sn(i);if(void 0===o)throw Error("pip was not installed correctly");return await o8(i),await o7(i),n;}async function o8(e){try{(await sw(e))||(await sy(e,"pipx",void 0,{upgrade:!0,usePipx:!1})),await nI(e,["-m","pipx","ensurepath"],{stdio:"inherit"}),await sy(e,"venv",void 0,{upgrade:!1,usePipx:!1});}catch(e){(0,K.warning)(`Failed to install pipx: ${e.toString()}. Ignoring...`);}}/** Setup wheel and setuptools */async function o7(e){try{await sy(e,"setuptools",void 0,{upgrade:!0,isLibrary:!0,usePipx:!1}),await sy(e,"wheel",void 0,{upgrade:!0,isLibrary:!0,usePipx:!1});}catch(e){(0,K.warning)(`Failed to install setuptools or wheel: ${e.toString()}. Ignoring...`);}}async function o9(e,t,r){let n;let i=await st(t);if(void 0!==i){let e=(0,iP.dirname)(i);n={bin:i,installDir:e,binDir:e};}else{// if python is not found, try to install it
if(X.GITHUB_ACTIONS)try{(0,K.info)("Installing python in GitHub Actions");let{setupActionsPython:o}=await q("5fF9z");await o(e,t,r),i=await st(t);let s=(0,iP.dirname)(i);n={bin:i,installDir:s,binDir:s};}catch(e){(0,K.warning)(e.toString());}void 0===n&&(n=await se(t,e));}return(void 0===i||void 0===n.bin)&&(i=await st(t),n.bin=i),n;}async function se(e,t){let r;switch(process.platform){case"win32":{e?await iM("python3",t,[`--params=/InstallDir:${e}`]):await iM("python3",t);// Adding the bin dir to the path
let n=await st(e),i=(0,iP.dirname)(n);/** The directory which the tool is installed to */await nV(i),r={installDir:i,binDir:i,bin:n};break;}case"darwin":{r=await iD("python3",t);// add the python and pip binaries to the path
let e=await nI("brew",["--prefix","python"],{stdio:"pipe"}),n=(0,iP.join)(e.stdout,"libexec","bin");await nV(n);break;}case"linux":if(iF())r=await iz("python",t);else if(iB())r=await iG([{name:"python3",version:t}]);else if(iV())r=await ix([{name:"python3",version:t},{name:"python-is-python3"}]);else throw Error("Unsupported linux distributions");break;default:throw Error("Unsupported platform");}return r;}async function st(e){for(let t of["python3","python"]){// eslint-disable-next-line no-await-in-loop
let r=await sr(t,e);if(void 0!==r)return r;}}async function sr(e,t){try{if(void 0!==t){let r=(0,iP.join)(t,(0,iP.addExeExt)(e));if((await(0,nF.pathExists)(r))&&(await o1(r,o3.python)))return r;}let r=(await/*@__PURE__*/B(nQ)(e,{nothrow:!0,all:!0}))??[];for(let e of r)// eslint-disable-next-line no-await-in-loop
if(await o1(e,o3.python))return e;}catch{// fall through
}}async function sn(e){let t=await si();return void 0===t?(// install pip if not installed
(0,K.info)("pip was not found. Installing pip"),await ss(e),si()// recurse to check if pip is on PATH and up-to-date
):t;}async function si(){for(let e of["pip3","pip"]){// eslint-disable-next-line no-await-in-loop
let t=await so(e);if(void 0!==t)return t;}}async function so(e){try{let t=(await/*@__PURE__*/B(nQ)(e,{nothrow:!0,all:!0}))??[];for(let e of t)// eslint-disable-next-line no-await-in-loop
if(null!==e&&(await o1(e,o3.pip)))return e;}catch{// fall through
}}async function ss(e){let t=await sa(e);t||(// ensure that pip is installed on Linux (happens when python is found but pip not installed)
await s$("pip"),// upgrade pip
await sa(e));}async function sa(e){try{return await nI(e,["-m","ensurepip","-U","--upgrade"],{stdio:"inherit"}),!0;}catch(t){(0,K.info)(t?.toString?.());try{return(// ensure pip is disabled on Ubuntu
await nI(e,["-m","pip","install","--upgrade","pip"],{stdio:"inherit"}),!0);}catch(e){(0,K.info)(e?.toString?.());// pip module not found
}}// all methods failed
return!1;}async function sl(e){let t=[];"linux"===process.platform?t.push("/home/runner/.local/bin/"):"darwin"===process.platform&&t.push("/usr/local/bin/");// detection using python.sys
let r=(await(0,oo.getExecOutput)(`${e} -c "import sys;print(sys.base_exec_prefix);"`)).stdout.trim();// remove duplicates
return(// any of these are possible depending on the operating system!
t.push((0,iP.join)(r,"Scripts"),(0,iP.join)(r,"Scripts","bin"),(0,iP.join)(r,"bin")),[...new Set(t)]);}const sc=oq(sl);function su(e,t,r=null){return sd(t)&&"linux"===process.platform&&null!==r&&e in o6?/// choose the default linux version based on ubuntu version
function(e,t){let r=e[0],n=Object.keys(t).map(e=>parseInt(e,10)).sort((e,t)=>t-e)// sort in descending order
.find(e=>r>=e);return void 0===n?"":t[n];}(r,o6[e]):sd(t)&&e in o4?o4[e]:"true"===t?"":t??"";}function sd(e){return"true"===e||void 0===e;}var K=q("ER74K"),sp={};async function sf(){var e,t;if("linux"!==process.platform)return[];let r=await(e="lsb_release",t=["-a"],new Promise((r,n)=>{$.execFile(e,t,{encoding:"utf8",shell:!1},(i,o,s)=>{if(i){if("errno"in i&&"ENOENT"===i.code){r(null);// When lsb_release is not found
return;}n(Error(`Could not execute \`${e} ${t.join(" ")}\`: ${i} (stderr=${s})`));return;}r(o);});}));if(null===r)return[];let n=/^Distributor ID:\s*(.+)$/,i=/^Description:\s*Ubuntu\s+(\d+)\.(\d+)(?:\.(\d+))?/,o=/^Release:\s*(\d+)\.(\d+)(?:\.(\d+))?$/,s=null,a=null,l=!1;for(let e of r.split("\n")){let t=e.match(n);if(null!==t){let e=t[1];if("Ubuntu"!==e)return[];l=!0;}let r=e.match(i);r&&(s=r);let c=e.match(o);if(c&&(a=c),l&&s&&a)break;}if(!l)return[];for(let e of[s,a])if(e){let t=[e[1],e[2]];return e[3]&&t.push(e[3]),t.map(e=>parseInt(e,10));}return[];}async function sh(){try{if(!iV())return null;{try{null===/*@__PURE__*/B(nQ).sync("lsb_release",{nothrow:!0})&&(await ix([{name:"lsb-release"}]));}catch{return sg();}let e=await(0,sp.getUbuntuVersion)();if(0===e.length)return sg();return e;}}catch(e){return(0,K.warning)(e.toString()),null;}}Object.defineProperty(sp,"__esModule",{value:!0}),sp.getUbuntuVersion=void 0,sp.getUbuntuVersion=sf;const sm=oq(sh);/** Detect Ubuntu version using os.version() for Ubuntu based distros */function sg(){// #46~22.04.1-Ubuntu SMP ...
let e=B(f).version(),t=e.split("."),r=parseInt(t[0].replace("#",""),10),n=parseInt(t[1].replace("~",""),10),i=parseInt(t[2].split("-")[0],10);return[r,n,i];}async function sv(e,t,r={}){return sy(await sE(),e,t,r);}async function sy(e,t,r,n={}){let{usePipx:i=!0,user:o=!0,upgrade:s=!1,isLibrary:a=!1}=n,l=i&&!a&&(await sw(e)),c=l?"pipx":"pip";(0,ry.info)(`Installing ${t} ${r??""} via ${c}`);let u=await sb(e,t);if(u)try{let n=void 0!==r&&""!==r?`${t}==${r}`:t,i=!l&&o?["--user"]:[];nT(e,["-m",c,...(s?l?["upgrade"]:["install","--upgrade"]:["install"]),...i,n],{stdio:"inherit"});}catch(e){if((0,ry.info)(`Failed to install ${t} via ${c}: ${e}.`),(await s$(t))===null)throw Error(`Failed to install ${t} via ${c}: ${e}.`);}else if((await s$(t))===null)throw Error(`Failed to install ${t} as it was not found via ${c} or the system package manager`);let d=await sc(e),p=await sS(d,t);return await nV(p),{binDir:p};}async function sw(e){return 0===(await nI(e,["-m","pipx","--help"],{stdio:"ignore",reject:!1})).exitCode;}async function sx(){let e=(await o5(su("python",void 0,await sm()),"",process.arch)).bin;if(void 0===e)throw Error("Python binary was not found");return e;}const sE=oq(sx);async function sb(e,t){let r=await nI(e,["-m","pip","show",t],{stdio:"ignore",reject:!1});return 0===r.exitCode;}async function sS(e,t){let r=await Promise.all(e.map(e=>(0,nF.pathExists)((0,iP.join)(e,(0,iP.addExeExt)(t))))),n=r.findIndex(e=>e);if(-1!==n){let t=e[n];return t;}let i=/*@__PURE__*/B(nQ).sync((0,iP.addExeExt)(t),{nothrow:!0});return null!==i?(0,iP.dirname)(i):e[e.length-1];}function s$(e){if("linux"===process.platform){if((0,ry.info)(`Installing ${e} via the system package manager`),iF())return iz(`python-${e}`);if(iB())return iG([{name:`python3-${e}`}]);if(iV())return ix([{name:`python3-${e}`}]);}return null;}async function s_(e,t,r){switch(process.platform){case"win32":{await iM("cppcheck",e);let t=await sO();return{binDir:t};}case"darwin":return iD("cppcheck",e);case"linux":if(iF())return iz("cppcheck",e);if(iB())return iG([{name:"ccache",version:e}]);if(iV())return ix([{name:"cppcheck",version:e}]);throw Error("Unsupported linux distribution");default:throw Error("Unsupported platform");}}async function sO(){let e="C:/Program Files/Cppcheck";return await nV(e),e;}var iP=q("ceI0e"),K=q("ER74K");async function sC(e,t,r){switch(process.platform){case"win32":return await iM("graphviz",e),sI();case"darwin":return iD("graphviz",e);case"linux":if(iF())return iz("graphviz",e);if(iB())return iG([{name:"graphviz",version:e}]);if(iV())return ix([{name:"graphviz",version:e}]);throw Error("Unsupported linux distribution");default:throw Error("Unsupported platform");}}async function sI(){if("win32"===process.platform){let e="C:/Program Files/Graphviz/bin";return await nV(e),{binDir:e};}throw Error("Unsupported platform");}var nF=q("dOmbL");/** Get the platform data for cmake */ // eslint-disable-next-line @typescript-eslint/no-unused-vars
function sT(e,t,r){switch(t){case"linux":{let t=`doxygen-${e}`;return{binRelativeDir:"bin/",binFileName:(0,iP.addExeExt)("doxygen"),extractedFolderName:t,extractFunction:iJ.extractTar,url:`https://www.doxygen.nl/files/${t}.linux.bin.tar.gz`};}case"win32":{let t=`doxygen-${e}`;return{binRelativeDir:"",binFileName:(0,iP.addExeExt)("doxygen"),extractedFolderName:t,extractFunction:ok,url:`https://www.doxygen.nl/files/${t}.windows.x64.bin.zip`};}default:throw Error(`Unsupported platform '${t}'`);}}async function sR(e,t,r){switch(process.platform){case"win32":{// try to download the package 4 times with 2 seconds delay
await/*@__PURE__*/B(oO)(()=>iM("doxygen.install",e),{name:"doxygen.install",max:4,backoffBase:2e3,report:e=>(0,K.info)(e)});let t=await sP();return await sC(su("graphviz",void 0),"",r),{binDir:t};}case"darwin":{let e=await iD("doxygen",void 0);return await sC(su("graphviz",void 0),"",r),e;}case"linux":{let n;if(""===e||iF()||iB()){if(iF())n=await iz("doxygen",e);else if(iB())return iG([{name:"doxygen",version:e}]);else if(iV())n=await ix([{name:"doxygen",version:e}]);else throw Error("Unsupported linux distributions");}else if(iV())try{// doxygen on stable Ubuntu repositories is very old. So, we use get the binary from the website itself
n=await oR("doxygen",e,sT,t,r),await ix([{name:"libclang-cpp9"}]);}catch(e){(0,K.notice)(`Failed to download doxygen binary. ${e}. Falling back to apt-get.`),n=await ix([{name:"doxygen"}]);}else throw Error("Unsupported linux distributions");return await sC(su("graphviz",void 0,await sm()),"",r),n;}default:throw Error("Unsupported platform");}}async function sP(){if("win32"===process.platform){for(let e of["C:/ProgramData/chocolatey/bin","C:/Program Files/doxygen/bin","C:/Program Files (x86)/doxygen"])if(await(0,nF.pathExists)((0,iP.join)(e,"doxygen.exe")))return(// eslint-disable-next-line no-await-in-loop
await nV(e),e);throw Error("Failed to find doxygen binary");}throw Error("Unsupported platform");}var sA=q("bX9Em"),o_=q("9hSY8"),oo=q("jlr6Q"),K=q("ER74K");async function sN(){if("darwin"===process.platform)try{let e=await(0,oo.getExecOutput)("xcrun --sdk macosx --show-sdk-path"),t=e.stdout||e.stderr;t?await nG("SDKROOT",t.trim()):(0,K.error)("SDKROOT not set");}catch(e){(0,K.error)(e);}}var iP=q("ceI0e"),K=q("ER74K"),X=q("dTX7a"),nF=q("dOmbL"),sL=h.resolve(__dirname,"../../src/gcc");// https://github.com/brechtsanders/winlibs_mingw/releases
const sk={13:{releaseName:"13.2.0-16.0.6-11.0.0-ucrt-r1",fileSuffix:"13.2.0-mingw-w64ucrt-11.0.0-r1"},"13.2-ucrt":{releaseName:"13.2.0-16.0.6-11.0.0-ucrt-r1",fileSuffix:"13.2.0-mingw-w64ucrt-11.0.0-r1"},"13.2-ucrt-mcf":{releaseName:"13.2.0mcf-16.0.6-11.0.1-ucrt-r2",fileSuffix:"13.2.0-mingw-w64ucrt-11.0.1-r2"},"13.2-msvcrt":{releaseName:"13.2.0-16.0.6-11.0.1-msvcrt-r1",fileSuffix:"13.2.0-mingw-w64msvcrt-11.0.1-r1"},"13.1-ucrt":{releaseName:"13.1.0posix-16.0.3-11.0.0-ucrt-r1",fileSuffix:"13.1.0-mingw-w64ucrt-11.0.0-r1"},"13.1-msvcrt":{releaseName:"13.1.0posix-16.0.3-11.0.0-msvcrt-r1",fileSuffix:"13.1.0-mingw-w64msvcrt-11.0.0-r1"},12:{releaseName:"12.3.0-16.0.4-11.0.0-ucrt-r1",fileSuffix:"12.3.0-mingw-w64ucrt-11.0.0-r1"},"12.3.0-ucrt":{releaseName:"12.3.0-16.0.4-11.0.0-ucrt-r1",fileSuffix:"12.3.0-mingw-w64ucrt-11.0.0-r1"},"12.3.0-msvcrt":{releaseName:"12.3.0-16.0.4-11.0.0-msvcrt-r1",fileSuffix:"12.3.0-mingw-w64msvcrt-11.0.0-r1"},"12.2.0-ucrt":{releaseName:"12.2.0-14.0.6-10.0.0-ucrt-r2",fileSuffix:"12.2.0-mingw-w64ucrt-10.0.0-r2"},"12.2.0-msvcrt":{releaseName:"12.2.0-14.0.6-10.0.0-msvcrt-r2",fileSuffix:"12.2.0-mingw-w64msvcrt-10.0.0-r2"},"12.1.0-ucrt":{releaseName:"12.1.0-14.0.4-10.0.0-ucrt-r2",fileSuffix:"12.1.0-mingw-w64ucrt-10.0.0-r2"},"12.1.0-msvcrt":{releaseName:"12.1.0-14.0.6-10.0.0-msvcrt-r3",fileSuffix:"12.1.0-llvm-14.0.6-mingw-w64msvcrt-10.0.0-r3"},11:{releaseName:"11.3.0-14.0.3-10.0.0-ucrt-r3",fileSuffix:"11.3.0-mingw-w64ucrt-10.0.0-r3"},"11.3.0-ucrt":{releaseName:"11.3.0-14.0.3-10.0.0-ucrt-r3",fileSuffix:"11.3.0-mingw-w64ucrt-10.0.0-r3"},"11.3.0-msvcrt":{releaseName:"11.3.0-14.0.3-10.0.0-msvcrt-r3",fileSuffix:"11.3.0-mingw-w64msvcrt-10.0.0-r3"},"11.2.0-ucrt":{releaseName:"11.2.0-9.0.0-ucrt-r5",fileSuffix:"11.2.0-mingw-w64ucrt-9.0.0-r5"},"11.2.0-msvcrt":{releaseName:"11.2.0-9.0.0-msvcrt-r5",fileSuffix:"11.2.0-mingw-w64msvcrt-9.0.0-r5"},10:{releaseName:"10.5.0-11.0.1-msvcrt-r1",fileSuffix:"10.5.0-mingw-w64msvcrt-11.0.1-r1"},"10.5.0-msvcrt":{releaseName:"10.5.0-11.0.1-msvcrt-r1",fileSuffix:"10.5.0-mingw-w64msvcrt-11.0.1-r1"},"10.3.0":{releaseName:"10.3.0-12.0.0-9.0.0-r2",fileSuffix:"10.3.0-llvm-12.0.0-mingw-w64-9.0.0-r2"},"10.2.0":{releaseName:"10.2.0-7.0.0-r4",fileSuffix:"10.2.0-llvm-10.0.1-mingw-w64-7.0.0-r4"},9:{releaseName:"9.4.0-9.0.0-r1",fileSuffix:"9.4.0-mingw-w64-9.0.0-r1"},"9.4.0":{releaseName:"9.4.0-9.0.0-r1",fileSuffix:"9.4.0-mingw-w64-9.0.0-r1"}};function sD(e,t,r){if("win32"===t){let t=sk[e];if(void 0===t)throw Error(`mingw version ${e} is not supported`);return{binRelativeDir:"bin/",binFileName:(0,iP.addExeExt)("g++"),extractedFolderName:"mingw64",extractFunction:oA,url:`https://github.com/brechtsanders/winlibs_mingw/releases/download/${t.releaseName}/winlibs-${"ia32"===r?"i686":"x86_64"}-posix-seh-gcc-${t.fileSuffix}.7z`};}throw Error(`Unsupported platform '${t}'`);}async function sU(e,t,r){let n;switch(process.platform){case"win32":("arm"===r||"arm64"===r)&&(await iM("gcc-arm-embedded",e));try{n=await oR("g++",e,sD,t,r);}catch(t){(0,K.info)(`Failed to download g++ binary. ${t}. Falling back to chocolatey.`),n=await sM(e,r);}break;case"darwin":n=await iD("gcc",e);break;case"linux":"x64"===r?iF()?n=await iz("gcc",e):iB()?n=await iG([{name:"gcc",version:e},{name:"gcc-c++",version:e},{name:"libstdc++-devel"}]):iV()&&(n=await ix([{name:"gcc",version:e,repositories:["ppa:ubuntu-toolchain-r/test"]},{name:"g++",version:e,repositories:["ppa:ubuntu-toolchain-r/test"]}])):((0,K.info)(`Install g++-multilib because gcc for ${r} was requested`),iF()?await iz("gcc-multilib",e):iV()&&(await ix([{name:"gcc-multilib",version:e,repositories:["ppa:ubuntu-toolchain-r/test"]}])));break;// TODO support bare-metal (need to support passing it as the input)
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
default:throw Error(`Unsupported platform for ${r}`);}if(void 0!==n)return await sF(e,n.binDir),n;}async function sj(e,t,r){let n;switch(process.platform){case"win32":case"darwin":return sU(e,t,r);case"linux":iF()?n=await iz("mingw-w64-gcc",e):iB()?n=await iG([{name:"mingw64-gcc",version:e}]):iV()&&(n=await ix([{name:"mingw-w64",version:e,repositories:["ppa:ubuntu-toolchain-r/test"]}]));break;default:throw Error(`Unsupported platform for ${r}`);}if(void 0!==n)//Setting up g++-mingw-w64-i686-win32 (10.3.0-14ubuntu1+24.3) ...
// update-alternatives: using /usr/bin/i686-w64-mingw32-g++-win32 to provide /usr/bin/i686-w64-mingw32-g++ (i686-w64-mingw32-g++) in auto mode
//Setting up g++-mingw-w64-x86-64-win32 (10.3.0-14ubuntu1+24.3) ...
// update-alternatives: using /usr/bin/x86_64-w64-mingw32-g++-win32 to provide /usr/bin/x86_64-w64-mingw32-g++ (x86_64-w64-mingw32-g++) in auto mode
//await activateGcc(version, installationInfo.binDir)
return n;}async function sM(e,t){let r;if(await iM("mingw",e),"x64"===t&&(await(0,nF.pathExists)("C:/tools/mingw64/bin"))?(r="C:/tools/mingw64/bin",await nV(r)):"ia32"===t&&(await(0,nF.pathExists)("C:/tools/mingw32/bin"))?(r="C:/tools/mingw32/bin",await nV(r)):(await(0,nF.pathExists)(`${process.env.ChocolateyInstall??"C:/ProgramData/chocolatey"}/bin/g++.exe`))&&(r=`${process.env.ChocolateyInstall??"C:/ProgramData/chocolatey"}/bin`),void 0!==r)return{binDir:r};}async function sF(e,t){let r=[];// Setup gcc as the compiler
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
if("win32"===process.platform)r.push(nG("CC",(0,iP.addExeExt)(`${t}/gcc`)),nG("CXX",(0,iP.addExeExt)(`${t}/g++`)));else{let n=/*@__PURE__*/B(sA)(/*@__PURE__*/B(o_)(e)??e);n>=5?(r.push(nG("CC",`${t}/gcc-${n}`),nG("CXX",`${t}/g++-${n}`)),iV()&&r.push(iT("cc",`${t}/gcc-${n}`),iT("cxx",`${t}/g++-${n}`),iT("gcc",`${t}/gcc-${n}`),iT("g++",`${t}/g++-${n}`))):(r.push(nG("CC",`${t}/gcc-${e}`),nG("CXX",`${t}/g++-${e}`)),iV()&&r.push(iT("cc",`${t}/gcc-${e}`),iT("cxx",`${t}/g++-${e}`),iT("gcc",`${t}/gcc-${e}`),iT("g++",`${t}/g++-${e}`)));}r.push(sN()),X.GITHUB_ACTIONS&&(await sB()),await Promise.all(r);}async function sB(){let e=(0,iP.join)(sL,"gcc_matcher.json");if(!(await(0,nF.pathExists)(e)))return(0,K.warning)("the gcc_matcher.json file does not exist in the same folder as setup-cpp.js");(0,K.info)(`::add-matcher::${e}`);}var oY=q("eJTZB"),sA=q("bX9Em"),iP=q("ceI0e"),K=q("ER74K"),iP=q("ceI0e");/** Get the platform data for ninja */ // eslint-disable-next-line @typescript-eslint/no-unused-vars
function sG(e,t,r){let n=/** Get the platform name Ninja uses in their download links */function(e){switch(e){case"win32":return"win";case"darwin":return"mac";case"linux":return"linux";default:throw Error(`Unsupported platform '${e}'`);}}(t);return{binRelativeDir:"",binFileName:(0,iP.addExeExt)("ninja"),extractedFolderName:"",extractFunction:ok,url:`https://github.com/ninja-build/ninja/releases/download/v${e}/ninja-${n}.zip`};}function sH(e,t,r){return oR("ninja",e,sG,t,r);}var sV=h.resolve(__dirname,"../../src/kcov");function sq(e){return{url:`https://github.com/SimonKagstrom/kcov/releases/download/${e}/kcov-amd64.tar.gz`,extractedFolderName:"",binRelativeDir:"usr/local/bin",binFileName:(0,iP.addExeExt)("kcov"),extractFunction:oD};}function sX(e){return{url:`https://github.com/SimonKagstrom/kcov/archive/refs/tags/${e}.tar.gz`,extractedFolderName:"",binRelativeDir:"build/src",binFileName:(0,iP.addExeExt)("kcov"),extractFunction:sK};}async function sK(e,t){let r=await oD(e,t,["--strip-components=1"]),n=await sz();"linux"===process.platform&&(iF()?await Promise.all([iz("libdwarf"),iz("libcurl-openssl")]):iB()?await iG([{name:"libdwarf-devel"},{name:"libcurl-devel"}]):iV()&&(await ix([{name:"libdw-dev"},{name:"libcurl4-openssl-dev"}])));// apply gcc13.patch
try{if(null!==/*@__PURE__*/B(nQ).sync("patch",{nothrow:!0})){let e=(0,iP.join)(sV,"gcc13.patch");await nI("patch",["-N","-p1","-i",e],{cwd:r,stdio:"inherit"});}else(0,K.info)("`patch` not found, skipping gcc13.patch, kcov may not build on gcc 13");}catch{// ignore
}let i=(0,iP.join)(r,"build");//   execRootSync(cmake, ["--install", buildDir], out)
//   return "user/local/bin" // the cmake install prefix
return await nI(n,["-S",r,"-B",i,"-DCMAKE_BUILD_TYPE=Release","-G","Ninja"],{cwd:r,stdio:"inherit"}),await nI(n,["--build",i,"--config","Release"],{cwd:r,stdio:"inherit"}),r;}async function sz(){let e=/*@__PURE__*/B(nQ).sync("cmake",{nothrow:!0});if(null===e){let{binDir:t}=await oj(su("cmake",void 0,await sm()),(0,iP.join)(t8(""),"cmake"),"");e=(0,iP.join)(t,"cmake");}let t=/*@__PURE__*/B(nQ).sync("ninja",{nothrow:!0});return null===t&&(await sH(su("ninja",void 0,await sm()),(0,iP.join)(t8(""),"ninja"),"")),e;}async function sW(e,t,r){var n;let i;if("linux"!==process.platform){(0,K.info)("Kcov is not supported on non-linux");return;}// parse version
let o=e.split("-"),s=(n=o[0]).match(/^v/)?n:`v${n}`,a=o[1],l=parseInt(s.replace(/^v/,""),10);return 38===l&&(s="v38"),"binary"===a&&l>=39?(i=await oR("kcov",s,sq,t,r),iF()?await iz("binutils"):iB()?await iG([{name:"binutils"}]):iV()&&(await ix([{name:"libbinutils"}]))):i=await oR("kcov",s,sX,t,r),i;}var X=q("dTX7a"),K=q("ER74K"),nF=q("dOmbL"),iP=q("ceI0e"),ry=q("lcRzN"),K=q("ER74K"),iP=q("ceI0e"),sY={},sJ=sY&&sY.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(i,o){function s(e){try{l(n.next(e));}catch(e){o(e);}}function a(e){try{l(n.throw(e));}catch(e){o(e);}}function l(e){var t;e.done?i(e.value):((t=e.value)instanceof r?t:new r(function(e){e(t);})).then(s,a);}l((n=n.apply(e,t||[])).next());});},sQ=sY&&sY.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t;};Object.defineProperty(sY,"__esModule",{value:!0});var sZ={},s0=sZ&&sZ.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t;};Object.defineProperty(sZ,"__esModule",{value:!0});const s1=s0(f);var s2={};/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */function s4(e,t,r){let n=new s3(e,t,r);process.stdout.write(n.toString()+s1.EOL);}// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */Object.defineProperty(s2,"__esModule",{value:!0}),s2.toCommandValue=/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */function(e){return null==e?"":"string"==typeof e||e instanceof String?e:JSON.stringify(e);},sZ.issueCommand=s4,sZ.issue=function(e,t=""){s4(e,{},t);};class s3{constructor(e,t,r){e||(e="missing.command"),this.command=e,this.properties=t,this.message=r;}toString(){var e;let t="::"+this.command;if(this.properties&&Object.keys(this.properties).length>0){t+=" ";let e=!0;for(let r in this.properties)if(this.properties.hasOwnProperty(r)){let n=this.properties[r];n&&(e?e=!1:t+=",",t+=`${r}=${s2.toCommandValue(n).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}`);}}return t+`::${(e=this.message,s2.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A"))}`;}}var s6={},s5=s6&&s6.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t;};Object.defineProperty(s6,"__esModule",{value:!0});// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */const s8=s5(m),s7=s5(f);s6.issueCommand=function(e,t){let r=process.env[`GITHUB_${e}`];if(!r)throw Error(`Unable to find environment variable for file command ${e}`);if(!s8.existsSync(r))throw Error(`Missing file at path: ${r}`);s8.appendFileSync(r,`${s2.toCommandValue(t)}${s7.EOL}`,{encoding:"utf8"});};const s9=sQ(f),ae=sQ(h);/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */function at(e){sZ.issue("error",e instanceof Error?e.toString():e);}/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */function ar(e){sZ.issue("group",e);}/**
 * End an output group.
 */function an(){sZ.issue("endgroup");}/**
     * A code indicating that the action was successful
     */(c=p=sY.ExitCode||(sY.ExitCode={}))[c.Success=0]="Success",/**
     * A code indicating that the action was a failure
     */c[c.Failure=1]="Failure",sY.exportVariable=//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function(e,t){let r=s2.toCommandValue(t);process.env[e]=r;let n=process.env.GITHUB_ENV||"";if(n){let t="_GitHubActionsFileCommandDelimeter_",n=`${e}<<${t}${s9.EOL}${r}${s9.EOL}${t}`;s6.issueCommand("ENV",n);}else sZ.issueCommand("set-env",{name:e},r);},sY.setSecret=/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */function(e){sZ.issueCommand("add-mask",{},e);},sY.addPath=/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */function(e){let t=process.env.GITHUB_PATH||"";t?s6.issueCommand("PATH",e):sZ.issueCommand("add-path",{},e),process.env.PATH=`${e}${ae.delimiter}${process.env.PATH}`;},sY.getInput=/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */function(e,t){let r=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!r)throw Error(`Input required and not supplied: ${e}`);return r.trim();},sY.setOutput=/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function(e,t){sZ.issueCommand("set-output",{name:e},t);},sY.setCommandEcho=/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */function(e){sZ.issue("echo",e?"on":"off");},sY.setFailed=//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */function(e){process.exitCode=p.Failure,at(e);},sY.isDebug=//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */function(){return"1"===process.env.RUNNER_DEBUG;},sY.debug=/**
 * Writes debug message to user log
 * @param message debug message
 */function(e){sZ.issueCommand("debug",{},e);},sY.error=at,sY.warning=/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */function(e){sZ.issue("warning",e instanceof Error?e.toString():e);},sY.info=/**
 * Writes info to log with console.log.
 * @param message info message
 */function(e){process.stdout.write(e+s9.EOL);},sY.startGroup=ar,sY.endGroup=an,sY.group=/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */function(e,t){return sJ(this,void 0,void 0,function*(){let r;ar(e);try{r=yield t();}finally{an();}return r;});},sY.saveState=//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function(e,t){sZ.issueCommand("save-state",{name:e},t);},sY.getState=/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */function(e){return process.env[`STATE_${e}`]||"";};const ai=T.env["ProgramFiles(x86)"],ao=[T.env["ProgramFiles(x86)"],T.env.ProgramFiles],as=["Enterprise","Professional","Community"],aa=["2022","2019","2017"],al={2022:"17.0",2019:"16.0",2017:"15.0",2015:"14.0",2013:"12.0"};function ac(e){if(Object.values(al).includes(e));else if(e in al)return al[e];return e;}const au=`${ai}\\Microsoft Visual Studio\\Installer`;function ad(e){let t;let r=ac(e);if(r){let e=r.split(".")[0]+".9";t=`-version "${r},${e}"`;}else t="-latest";// If vswhere is available, ask it about the location of the latest Visual Studio.
let n=function(e,t){try{return $.execSync(`vswhere -products * ${t} -prerelease -property installationPath`).toString().trim()+"\\"+e;}catch(e){sY.warning(`vswhere failed: ${e}`);}return null;}("VC\\Auxiliary\\Build\\vcvarsall.bat",t);if(n&&m.existsSync(n))return sY.info(`Found with vswhere: ${n}`),n;sY.info("Not found with vswhere");// If that does not work, try the standard installation locations,
// starting with the latest and moving to the oldest.
let i=e?[function(e){if(Object.keys(al).includes(e));else for(let[t,r]of Object.entries(al))if(r===e)return t;return e;}(e)]:aa;for(let e of ao)for(let t of i)for(let r of as)if(n=`${e}\\Microsoft Visual Studio\\${t}\\${r}\\VC\\Auxiliary\\Build\\vcvarsall.bat`,sY.info(`Trying standard location: ${n}`),m.existsSync(n))return sY.info(`Found standard location: ${n}`),n;if(sY.info("Not found in standard locations"),// Special case for Visual Studio 2015 (and maybe earlier), try it out too.
n=`${ai}\\Microsoft Visual C++ Build Tools\\vcbuildtools.bat`,m.existsSync(n))return sY.info(`Found VS 2015: ${n}`),n;throw sY.info(`Not found in VS 2015 location: ${n}`),Error("Microsoft Visual Studio not found");}d=/** See https://github.com/ilammy/msvc-dev-cmd#inputs */function(e,t,r,n,i,o){if("win32"!=T.platform){sY.info("This is not a Windows virtual environment, bye!");return;}// Add standard location of "vswhere" to PATH, in case it's not there.
T.env.PATH+=h.delimiter+au;// There are all sorts of way the architectures are called. In addition to
// values supported by Microsoft Visual C++, recognize some common aliases.
let s={win32:"x86",win64:"x64",x86_64:"x64","x86-64":"x64"};e.toLowerCase()in s&&(e=s[e.toLowerCase()]);// Due to the way Microsoft Visual C++ is configured, we have to resort to the following hack:
// Call the configuration batch file and then output *all* the environment variables.
var a=[e];"true"==n&&a.push("uwp"),t&&a.push(t),r&&a.push(`-vcvars_ver=${r}`),"true"==i&&a.push("-vcvars_spectre_libs=spectre");let l=`"${ad(o)}" ${a.join(" ")}`;sY.debug(`vcvars command-line: ${l}`);let c=$.execSync(`set && cls && ${l} && cls && set`,{shell:"cmd"}).toString(),u=c.split("\f"),d=u[0].split("\r\n"),p=u[1].split("\r\n"),f=u[2].split("\r\n"),m=p.filter(e=>!!e.match(/^\[ERROR.*\]/)&&!e.match(/Error in script usage. The correct usage is:$/));if(m.length>0)throw Error("invalid parameters\r\n"+m.join("\r\n"));// Convert old environment lines into a dictionary for easier lookup.
let g={};for(let e of d){let[t,r]=e.split("=");g[t]=r;}for(let e of(// Now look at the new environment and export everything that changed.
// These are the variables set by vsvars.bat. Also export everything
// that was not there during the first sweep: those are new variables.
sY.startGroup("Environment variables"),f)){// vsvars.bat likes to print some fluff at the beginning.
// Skip lines that don't look like environment variables.
if(!e.includes("="))continue;let[t,r]=e.split("=");r!==g[t]&&(sY.info(`Setting ${t}`),-1!=["PATH","INCLUDE","LIB","LIBPATH"].indexOf(t.toUpperCase())&&(r=r.split(";").filter(// Remove duplicates by keeping the first occurance and preserving order.
// This keeps path shadowing working as intended.
function(e,t,r){return r.indexOf(e)===t;}).join(";")),sY.exportVariable(t,r));}sY.endGroup(),sY.info("Configured Developer Command Prompt");};var K=q("ER74K"),nF=q("dOmbL");async function ap(e,t,r,n,i,o,s){void 0!==t&&(await(0,nF.pathExists)(t))&&((0,K.info)(`Adding ${t} to PATH`),await nG("VCTargetsPath",t)),d(function(e){switch(e){case"x32":case"32":case"ia32":return"x86";case"64":return"x64";default:return e;}}(r),i,n,o,s,e);}class af extends Error{constructor(e){super(e),this.name="TimeoutError";}}class ah extends Error{constructor(e){super(),this.name="AbortError",this.message=e;}}/**
TODO: Remove AbortError and just throw DOMException when targeting Node 18.
*/const am=e=>void 0===globalThis.DOMException?new ah(e):new DOMException(e),ag=e=>{let t=void 0===e.reason?am("This operation was aborted."):e.reason;return t instanceof Error?t:am(t);};async function av(e,t,r,n,i,o,s,a=12e5// 20 minutes
){(0,ry.startGroup)(`Installing ${e} ${t}`);let l=!1;try{l=await function(e,t){let r;let{milliseconds:n,fallback:i,message:o,customTimers:s={setTimeout:setTimeout,clearTimeout:clearTimeout}}=t,a=new Promise((a,l)=>{if("number"!=typeof n||1!==Math.sign(n))throw TypeError(`Expected \`milliseconds\` to be a positive number, got \`${n}\``);if(t.signal){let{signal:e}=t;e.aborted&&l(ag(e)),e.addEventListener("abort",()=>{l(ag(e));});}if(n===Number.POSITIVE_INFINITY){e.then(a,l);return;}// We create the error outside of `setTimeout` to preserve the stack trace.
let c=new af();r=s.setTimeout.call(void 0,()=>{if(i){try{a(i());}catch(e){l(e);}return;}"function"==typeof e.cancel&&e.cancel(),!1===o?a():o instanceof Error?l(o):(c.message=o??`Promise timed out after ${n} milliseconds`,l(c));},n),(async()=>{try{a(await e);}catch(e){l(e);}})();}),l=a.finally(()=>{l.clear();});return l.clear=()=>{s.clearTimeout.call(void 0,r),r=void 0;},l;}(ay(e,t,r,n,l,i,o),{milliseconds:a,message:`Timeout while installing ${e} ${t}. You can increase the timeout from options`});}catch(t){// push error message to the logger
(0,K.error)(t),s.push(`${e} failed to install`);}return(0,ry.endGroup)(),l;}async function ay(e,t,r,n,i,o,s){let a;if("vcvarsall"===e)await ap(su(e,t,r),void 0,n,void 0,void 0,!1,!1);else{// get the setup function
let s=a6[e];// eslint-disable-next-line no-param-reassign
i=["llvm","clangformat","clangtidy"].includes(e);// the tool installation directory (for the functions that ue it)
let l=(0,iP.join)(o,i?"llvm":e);// eslint-disable-next-line no-await-in-loop
a=await s(su(e,t,r),l,n);}return(// preparing a report string
s.push(a7(e,a)),i);}const{readFile:aw,writeFile:ax,chmod:aE}=m.promises;async function ab(e){// TODO for older versions, this also includes the minor version
let t=`/usr/lib/llvm-${e}`;await ix([{name:"curl"}]),await nI("curl",["-LJO","https://apt.llvm.org/llvm.sh"],{cwd:"/tmp"});let r=await aS("/tmp/llvm.sh","/tmp/llvm-setup-cpp.sh");return await ix(r),await aE("/tmp/llvm-setup-cpp.sh","755"),await t5("bash",["/tmp/llvm-setup-cpp.sh",`${e}`,"all"],{stdio:"inherit",shell:!0,timeout:12e5}),await nV(`${t}/bin`),{installDir:`${t}`,binDir:`${t}/bin`,bin:`${t}/bin/clang++`};}async function aS(e,t){var r,n;let i=await aw(e,"utf-8");// the packages needed by the script
return i=(r=i,i=process.env.NODE_DEBUG?r:r.replace(/set -eux/g,"set -eu")).replace(/add-apt-repository "\${REPO_NAME}"/g,'add-apt-repository -y "${REPO_NAME}"'),n=i=await a$(i),i=// use nala if it is available
iS()?n.replace(/apt-get/g,"nala"):n,await ax(t,i),[{name:"lsb-release"},{name:"wget"},{name:"software-properties-common"},{name:"gnupg"}];}async function a$(e){// fix conflicts between libclang-rt and libclang
let t=e.replace(/apt-get install -y/g,'apt-get install -o Dpkg::Options::="--force-overwrite" -y --fix-broken');return await Promise.all(["libc++-$LLVM_VERSION-dev","libc++abi-$LLVM_VERSION-dev","libunwind-$LLVM_VERSION-dev"].map(async e=>{let r=e.replace("$LLVM_VERSION","*");(await iR(r))&&((0,M.info)(`Removing conflicting package ${r}`),t=t.replace(e,""));})),t;}var o$=q("1ndHP"),K=q("ER74K"),iP=q("ceI0e");const a_=function(e){let t=new Set(e);for(let r of e)t.add(/^\d+/.exec(r)[0]),t.add(/^\d+\.\d+/.exec(r)[0]);return t;}(["3.5.0","3.5.1","3.5.2","3.6.0","3.6.1","3.6.2","3.7.0","3.7.1","3.8.0","3.8.1","3.9.0","3.9.1","4.0.0","4.0.1","5.0.0","5.0.1","5.0.2","6.0.0","6.0.1","7.0.0","7.0.1","7.1.0","8.0.0","8.0.1","9.0.0","9.0.1","10.0.0","10.0.1","11.0.0","11.0.1","11.1.0","12.0.0","12.0.1","13.0.0","13.0.1","14.0.0","14.0.1","14.0.2","14.0.3","14.0.4","14.0.5","14.0.6","15.0.0","15.0.1","15.0.2","15.0.3","15.0.4","15.0.5","15.0.6","15.0.7","16.0.0","16.0.1","16.0.2","16.0.3","16.0.4","16.0.5","16.0.6"]),aO=new Set(["10.0.1","15.0.5","15.0.6"]),aC=new Set(["3.5.1","3.6.1","3.6.2","3.7.1","3.8.1","3.9.1","6.0.1","7.0.1","7.1.0","8.0.1","11.0.1","11.1.0","12.0.1",// missing x86_64
// TODO add arm64 support
"15.0.4","15.0.5","15.0.6","16.0.0","16.0.1","16.0.2","16.0.3","16.0.4","16.0.5","16.0.6"]),aI=new Map(),aT={"3.5.0":"-ubuntu-14.04","3.5.1":"","3.5.2":"-ubuntu-14.04","3.6.0":"-ubuntu-14.04","3.6.1":"-ubuntu-14.04","3.6.2":"-ubuntu-14.04","3.7.0":"-ubuntu-14.04","3.7.1":"-ubuntu-14.04","3.8.0":"-ubuntu-16.04","3.8.1":"-ubuntu-16.04","3.9.0":"-ubuntu-16.04","3.9.1":"-ubuntu-16.04","4.0.0":"-ubuntu-16.04","5.0.0":"-ubuntu16.04","5.0.1":"-ubuntu-16.04","5.0.2":"-ubuntu-16.04","6.0.0":"-ubuntu-16.04","6.0.1":"-ubuntu-16.04","7.0.0":"-ubuntu-16.04","7.0.1":"-ubuntu-18.04","7.1.0":"-ubuntu-14.04","8.0.0":"-ubuntu-18.04","9.0.0":"-ubuntu-18.04","9.0.1":"-ubuntu-16.04","10.0.0":"-ubuntu-18.04","10.0.1":"-ubuntu-16.04","11.0.0":"-ubuntu-20.04","11.0.1":"-ubuntu-16.04","11.1.0":"-ubuntu-16.04","12.0.0":"-ubuntu-20.04","12.0.1":"-ubuntu-16.04","13.0.0":"-ubuntu-20.04","13.0.0-ubuntu-16.04":"-ubuntu-16.04","13.0.0-ubuntu-20.04":"-ubuntu-20.04","13.0.1":"-ubuntu-18.04","13.0.1-ubuntu-18.04":"-ubuntu-18.04","14.0.0":"-ubuntu-18.04",// "14.0.1": "-ubuntu-18.04",  // only available for powerpc64le
"15.0.2":"-rhel86","15.0.5":"-ubuntu-18.04","15.0.6":"-ubuntu-18.04","16.0.0":"-ubuntu-18.04","16.0.2":"-ubuntu-22.04","16.0.3":"-ubuntu-22.04","16.0.4":"-ubuntu-22.04"},aR="16.0.4";//================================================
// URL
//================================================
/** Gets a LLVM download URL for GitHub. */function aP(e,t,r){let n=`${t}${e}${r}`;return`https://github.com/llvm/llvm-project/releases/download/llvmorg-${e}/${n}`;}/** Gets a LLVM download URL for https://releases.llvm.org. */function aA(e,t,r){let n=`${t}${e}${r}`;return`https://releases.llvm.org/${e}/${n}`;}/** Gets an LLVM download URL for the Windows platform. */async function aN(e){let t;if(aO.has(e))return null;let r="LLVM-",n=/*@__PURE__*/B(o$)(e,"3.7.0")?"-win32.exe":"-win64.exe",i=/*@__PURE__*/B(o$)(e,"9.0.1"),o=!1;return i&&(t=aA(e,r,n),(await oz(t))||(o=!0// fallback to github
)),(o||!i)&&(t=aP(e,r,n)),t;}function aL(e,t){switch(e){case"darwin":return(/** Gets an LLVM download URL for the Darwin platform. */function(e){if(aC.has(e))return null;let t="9.0.0"===e?"-darwin-apple":"-apple-darwin",r="clang+llvm-",n=`-x86_64${t}.tar.xz`;return/*@__PURE__*/B(o$)(e,"9.0.1")?aA(e,r,n):aP(e,r,n);}(t));case"linux":return function(e){let t,r,n=e,i=aI.get(n);// ubuntu-version is specified
if(void 0!==i&&(n=i),n.includes("ubuntu")){let e=n.replace(/-ubuntu-.*/,"");if(!a_.has(e))throw Error(`Unsupported Ubuntu version: ${e}`);t=n.replace(e,""),n=oJ(a_,e)[0];}else""!==n&&n in aT?t=aT[n]:(// default to the maximum version
t=aT[aR],(0,K.warning)(`Falling back to LLVM version ${aR} ${t} for the Ubuntu.`));let o="clang+llvm-";return(r="5.0.0"===n?`-linux-x86_64${t}.tar.xz`:t.includes("-rhel86")?`-x86_64-unknown-linux-gnu${t}.tar.xz`:`-x86_64-linux-gnu${t}.tar.xz`,/*@__PURE__*/B(o$)(n,"9.0.1"))?aA(n,o,r):aP(n,o,r);}(t);case"win32":return aN(t);default:return null;}}async function ak(e,t,r){let[n,i]=await oQ(a_,t,e,aL);return(0,K.info)(`specific llvm version: ${n}`),{url:i,extractedFolderName:"",binRelativeDir:"bin",binFileName:(0,iP.addExeExt)("clang"),extractFunction:"win32"===t?oL:(e,t)=>oD(e,t,["--strip-components=1"])};}var aD=h.resolve(__dirname,"../../src/llvm");async function aU(e,t,r){let n=await aM(e,t,r);return await aX(n.installDir??t),n;}async function aj(e,t,r){// install LLVM and its dependencies in parallel
let[n,i,o]=await Promise.all([aB(e,t,r),aq(r),aK()]);return n;}const aM=oq(aj,{isPromise:!0});function aF(e,t,r){return aB(e,t,r);}async function aB(e,t,r){let n=function(e){if(null===/*@__PURE__*/B(oY)(e))try{// find the semver version of an integer
let t=/*@__PURE__*/B(o_)(e);if(null!==t)return(0,K.info)(`Coerced version '${e}' to '${t}'`),t.version;}catch(e){// handled below
}return e;}(e),i=parseInt(n.split(".")[0],10);try{if(iV())return await ab(i);}catch(e){(0,K.info)(`Failed to install llvm via system package manager ${e}`);}let o=await oR("llvm",e,ak,t,r);return await aH(i),o;}async function aG(e){iV()&&(e<=10?await ix([{name:"libtinfo5"}]):await ix([{name:"libtinfo-dev"}]));}const aH=oq(aG,{isPromise:!0});async function aV(e){"linux"===process.platform&&(await sU(su("gcc",void 0,await sm()),"",e));}const aq=oq(aV,{isPromise:!0});async function aX(e){let t=process.env.LD_LIBRARY_PATH??"",r=process.env.DYLD_LIBRARY_PATH??"",n=[nG("LLVM_PATH",e),nG("LD_LIBRARY_PATH",`${e}/lib${h.delimiter}${t}`),nG("DYLD_LIBRARY_PATH",`${e}/lib${h.delimiter}${r}`),nG("LDFLAGS",`-L"${e}/lib"`),nG("CPPFLAGS",`-I"${e}/include"`),nG("CC",(0,iP.addExeExt)(`${e}/bin/clang`)),nG("CXX",(0,iP.addExeExt)(`${e}/bin/clang++`)),nG("LIBRARY_PATH",`${e}/lib`),sN()];iV()&&n.push(iT("cc",`${e}/bin/clang`),iT("cxx",`${e}/bin/clang++`),iT("clang",`${e}/bin/clang`),iT("clang++",`${e}/bin/clang++`),iT("lld",`${e}/bin/lld`),iT("ld.lld",`${e}/bin/ld.lld`),iT("llvm-ar",`${e}/bin/llvm-ar`)),await Promise.all(n);}async function aK(){if(X.GITHUB_ACTIONS){let e=(0,iP.join)(aD,"llvm_matcher.json");if(!(await(0,nF.pathExists)(e)))return(0,K.warning)("the llvm_matcher.json file does not exist in the same folder as setup-cpp.js");(0,K.info)(`::add-matcher::${e}`);}}async function az(e,t,r){switch(process.platform){case"win32":return iM("make",e);case"darwin":return await iD("make",e),await nV("/usr/local/opt/make/libexec/gnubin"),{binDir:"/usr/local/opt/make/libexec/gnubin"};case"linux":if(iF())return iz("make",e);if(iB())return iG([{name:"make",version:e}]);if(iV())return ix([{name:"make",version:e}]);throw Error("Unsupported linux distribution");default:throw Error("Unsupported platform");}}var X=q("dTX7a"),iP=q("ceI0e"),K=q("ER74K"),nF=q("dOmbL"),aW=h.resolve(__dirname,"../../src/msvc");async function aY(e,t,r,n,i,o){let s,a;if("win32"!==process.platform)return;let l=ac(e);// check if the given version is already installed
(0,K.info)(`Checking if MSVC ${l} is already installed`);let c=!1;try{let e=ad(l);c=!0,(0,K.info)(`Found the pre-installed version of MSVC at ${e}`);}catch{// not installed, try installing
}// https://github.com/aminya/setup-cpp/issues/1
if(!c)try{"14.0"===l?(s="14.0",await iM("visualcpp-build-tools","14.0.25420.1",["--ignore-dependencies"]),a="C:/Program Files (x86)/MSBuild/Microsoft.Cpp/v4.0/v140"):"15.0"===l?(s="14.16",await iM("visualstudio2017buildtools","15.9.41.0",[]),a="C:/Program Files (x86)/Microsoft Visual Studio/2017/BuildTools/VC/Tools/MSVC/14.16"// TODO verify path
):"16.0"===l?(s="14.29",await iM("visualstudio2019buildtools","16.11.7.0",[]),a="C:/Program Files (x86)/Microsoft Visual Studio/2019/BuildTools/VC/Tools/MSVC/14.29.30133"):"17.0"===l?(s=void 0,await iM("visualstudio2022buildtools","117.0.5.0",[]),a=void 0):(0,K.error)(`The given MSVC versions ${e} is not supported yet.`);}catch(e){(0,K.error)(e);}// run vcvarsall.bat environment variables
await ap(l,a,r,s,n,i,o),X.GITHUB_ACTIONS&&(await aJ());}async function aJ(){let e=(0,iP.join)(aW,"msvc_matcher.json");if(!(await(0,nF.pathExists)(e)))return(0,K.warning)("the msvc_matcher.json file does not exist in the same folder as setup-cpp.js");(0,K.info)(`::add-matcher::${e}`);}async function aQ(e,t,r){if(!iV())return;if("string"==typeof i)return{binDir:i};let n=/*@__PURE__*/B(nQ).sync("nala",{nothrow:!0});if(null!==n)return{binDir:i=(0,iP.dirname)(n)};// https://github.com/volitank/nala#-installation
let o=await iI("volian-archive-scar-unstable.gpg","https://deb.volian.org/volian/scar.key");t6("/bin/bash",["-c",`echo "deb [signed-by=${o}] http://deb.volian.org/volian/ scar main" | tee /etc/apt/sources.list.d/volian-archive-scar-unstable.list`]);try{"legacy"!==e?await ix([{name:"nala"}],!0):await ix([{name:"nala-legacy"}],!0);}catch(e){await ix([{name:"nala-legacy"}],!0);}return{binDir:i="/usr/bin"// eslint-disable-line require-atomic-updates
};}async function aZ(e,t,r){if("win32"!==process.platform)return;await iM("opencppcoverage",e);let n=await a0();return{binDir:n};}async function a0(){let e="C:/Program Files/OpenCppCoverage";return await nV(e),e;}async function a1(e,t,r){switch(process.platform){case"win32":{await iM("powershell-core",e);let t="C:/Program Files/PowerShell/7";return await nV(t),{binDir:t};}case"darwin":return iD("powershell",e,["--cask"]);case"linux":if(iF())return iz("powershell-bin",e,"yay");if(iB())return iG([{name:"curl"}]),t6("/bin/bash",["-c","curl https://packages.microsoft.com/config/rhel/8/prod.repo | sudo tee /etc/yum.repos.d/microsoft.repo"]),iG([{name:"powershell",version:e}]);if(iV()){await ix([{name:"curl"}]);let t=await sm(),r=`${t[0]}.0${t[1]}`;// TODO Debian
// const keyFileName = await addAptKeyViaDownload(
//   "microsoft.asc",
//   "https://packages.microsoft.com/keys/microsoft.asc"
// )
// execRootSync("/bin/bash", [
//   "-c",
//   `echo "deb [arch=amd64 signed-by=${keyFileName}] https://packages.microsoft.com/repos/microsoft-debian-bullseye-prod bullseye main" > /etc/apt/sources.list.d/microsoft.list`,
// ])
return t6("curl",["-LJO",`https://packages.microsoft.com/config/ubuntu/${r}/packages-microsoft-prod.deb`]),t6("dpkg",["-i","packages-microsoft-prod.deb"]),ix([{name:"powershell",version:e}],!0);}throw Error("Unsupported linux distribution");default:throw Error("Unsupported platform");}}var iP=(q("ceI0e"),q("ceI0e"));/** Get the platform data for task */function a2(e,t,r){let n=/** Get the arch name task uses in their download links */function(e){switch(e){case"x64":return"amd64";case"ia32":case"x86":case"i386":case"x32":return"386";default:return e;}}(r),i="win32"===t;return{binRelativeDir:"",binFileName:(0,iP.addExeExt)("task"),extractedFolderName:"",extractFunction:i?ok:oD,url:`https://github.com/go-task/task/releases/download/v${e}/task_${"win32"===t?"windows":t}_${n}.${i?"zip":"tar.gz"}`};}var K=q("ER74K"),nF=q("dOmbL"),iP=q("ceI0e");let a4=!1;async function a3(e,t,r){return a4&&null!==/*@__PURE__*/B(nQ).sync("vcpkg",{nothrow:!0})?{binDir:(0,iP.dirname)(/*@__PURE__*/B(nQ).sync("vcpkg"))}:("linux"===process.platform&&(iF()?await Promise.all([iz("curl"),iz("zip"),iz("unzip"),iz("tar"),iz("git"),iz("pkg-config")]):iB()?await iG([{name:"curl"},{name:"zip"},{name:"unzip"},{name:"tar"},{name:"git"},{name:"pkg-config"}]):iV()&&(await ix([{name:"curl"},{name:"zip"},{name:"unzip"},{name:"tar"},{name:"git"},{name:"pkg-config"}]))),(await(0,nF.pathExists)((0,iP.join)(t,(0,iP.addShExt)("bootstrap-vcpkg",".bat"))))?(0,K.notice)(`Vcpkg folder already exists at ${t}. This might mean that ~/vcpkg is restored from the cache.`):nT("git",["clone","https://github.com/microsoft/vcpkg"],{cwd:(0,iP.dirname)(t),stdio:"inherit"}),nT((0,iP.addShExt)((0,iP.addShRelativePrefix)("bootstrap-vcpkg"),".bat"),{cwd:t,shell:!0,stdio:"inherit"}),nj(t),await nV(t),// eslint-disable-next-line require-atomic-updates
a4=!0,{binDir:t});}const a6={nala:aQ,cmake:oj,ninja:sH,python:o5,vcpkg:a3,bazel:iq,conan:function(e,t,r){return sv("conan",e);},meson:function(e,t,r){return sv("meson",e);},gcovr:function(e,t,r){return sv("gcovr",e);},opencppcoverage:aZ,llvm:aU,gcc:sU,choco:iU,brew:iN,powershell:a1,ccache:function(e,t,r){switch(process.platform){case"win32":return iM("ccache",e);case"darwin":return iD("ccache",e);case"linux":if(iF())return iz("ccache",e);if(iB())return iG([{name:"ccache",version:e}]);if(iV())return ix([{name:"ccache",version:e}]);throw Error("Unsupported linux distribution");default:throw Error("Unsupported platform");}},sccache:function(e,t,r){switch(process.platform){case"win32":return iM("sccache",e);case"linux":case"darwin":return iD("sccache",e);default:throw Error("Unsupported platform");}},doxygen:sR,graphviz:sC,cppcheck:s_,clangtidy:aF,clangformat:aF,msvc:aY,vcvarsall:ap,kcov:sW,make:az,task:function(e,t,r){return oR("task",e,a2,t,r);},sevenzip:oP},a5=Object.keys(a6),a8=["compiler","architecture","timeout",...a5];function a7(e,t){let r=`✅ ${e} was installed successfully:`;return void 0===t||("installDir"in t&&(r+=`
- The installation directory is ${t.installDir}`),""!==t.binDir&&(r+=`
- The binary directory is ${t.binDir}`)),r;}var ry=q("lcRzN"),K=q("ER74K"),oY=q("eJTZB");async function a9(e,t,r,n,i,o,s){try{let{compiler:a,version:l}=function(e){let t=e.split("-"),r=t[0];if(1 in t){let e=t[1];return null!==/*@__PURE__*/B(oY)(e)||(0,K.info)(`Invalid semver version ${e} used for the compiler.`),{compiler:r,version:e};}return{compiler:r,version:void 0};}(e);switch(// install the compiler. We allow some aliases for the compiler name
(0,ry.startGroup)(`Installing ${a} ${l??""}`),a){case"llvm":case"clang":case"clang++":{let e=await aU(su("llvm",l,t),(0,h.join)(r,"llvm"),n);await nG("GCOV","llvm-cov gcov"),i.push(a7("llvm",e));break;}case"gcc":case"mingw":case"cygwin":case"msys":{let e="mingw"===a?su("mingw",l,t):su("gcc",l,t),s="mingw"===a?await sj(e,(0,h.join)(r,"gcc"),n):await sU(e,(0,h.join)(r,"gcc"),n);o&&(await nG("CPPFLAGS","")),await function(e){let t=/*@__PURE__*/B(oY)(e),r=null!==t?/*@__PURE__*/B(sA)(t):e,n=""!==r?`gcov-${r}`:"gcov";return nG("GCOV",n);}(e),i.push(a7("gcc",s));break;}case"cl":case"msvc":case"msbuild":case"vs":case"visualstudio":case"visualcpp":case"visualc++":{let e=await aY(su("msvc",l,t),(0,h.join)(r,"msvc"),n);o&&(await nG("CPPFLAGS","")),i.push(a7("msvc",e));break;}case"appleclang":case"applellvm":(0,ry.notice)("Assuming apple-clang is already installed"),await Promise.all([nG("CC","clang"),nG("CXX","clang++")]),i.push(a7("apple-clang",void 0));break;default:s.push(`Unsupported compiler ${a}`);}}catch(t){(0,K.error)(t),s.push(`Failed to install the ${e}`);}(0,ry.endGroup)();}// Run main
/** The main entry function */(async function(e){let t,r,n=Promise.resolve();X.GITHUB_ACTIONS||(n=rv(),process.env.ACTIONS_ALLOW_UNSECURE_COMMANDS="true");// parse options using mri or github actions
let i=function(e,t){t=t||{};var r,n,i,o,s,a={_:[]},l=0,c=0,u=0,d=(e=e||[]).length;let p=void 0!==t.alias,f=void 0!==t.unknown,h=void 0!==t.default;if(t.alias=t.alias||{},t.string=rw(t.string),t.boolean=rw(t.boolean),p)for(r in t.alias)for(l=0,n=t.alias[r]=rw(t.alias[r]);l<n.length;l++)(t.alias[n[l]]=n.concat(r)).splice(l,1);for(l=t.boolean.length;l-->0;)for(c=(n=t.alias[t.boolean[l]]||[]).length;c-->0;)t.boolean.push(n[c]);for(l=t.string.length;l-->0;)for(c=(n=t.alias[t.string[l]]||[]).length;c-->0;)t.string.push(n[c]);if(h){for(r in t.default)if(o=typeof t.default[r],n=t.alias[r]=t.alias[r]||[],void 0!==t[o])for(t[o].push(r),l=0;l<n.length;l++)t[o].push(n[l]);}let m=f?Object.keys(t.alias):[];for(l=0;l<d;l++){if("--"===(i=e[l])){a._=a._.concat(e.slice(++l));break;}for(c=0;c<i.length&&45===i.charCodeAt(c)// "-"
;c++);if(0===c)a._.push(i);else if("no-"===i.substring(c,c+3)){if(o=i.substring(c+3),f&&!~m.indexOf(o))return t.unknown(i);a[o]=!1;}else{for(u=c+1;u<i.length&&61!==i.charCodeAt(u)// "="
;u++);for(o=i.substring(c,u),s=i.substring(++u)||l+1===d||45===(""+e[l+1]).charCodeAt(0)||e[++l],n=2===c?[o]:o,u=0;u<n.length;u++){if(o=n[u],f&&!~m.indexOf(o))return t.unknown("-".repeat(c)+o);!function(e,t,r,n){var i,o=e[t],s=~n.string.indexOf(t)?null==r||!0===r?"":String(r):"boolean"==typeof r?r:~n.boolean.indexOf(t)?"false"!==r&&("true"===r||(e._.push(0*(i=+r)==0?i:r),!!r)):0*(i=+r)==0?i:r;e[t]=null==o?s:Array.isArray(o)?o.concat(s):[o,s];}(a,o,u+1<n.length||s,t);}}}if(h)for(r in t.default)void 0===a[r]&&(a[r]=t.default[r]);if(p)for(r in a)for(n=t.alias[r]||[];n.length>0;)a[n.shift()]=a[r];return a;}(e,{string:[...a8,"timeout"],default:Object.fromEntries(a8.map(e=>[e,function(e){let t=(0,ry.getInput)(e.toLowerCase());if("false"!==t&&""!==t)return t;}(e)])),alias:{h:"help"},boolean:"help"});i.help&&((0,K.info)(`
setup-cpp [options]
setup-cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true

Install all the tools required for building and testing C++/C projects.

--architecture	 the cpu architecture to install the tools for. By default it uses the current CPU architecture.
--timeout	 the timeout for the installation of each tool in minutes. By default it is 10 minutes.
--compiler	 the <compiler> to install.
          	 You can specify the version instead of specifying just the name e.g: --compiler 'llvm-13.0.0'
--$tool_name	 pass "true" or pass the <version> you would like to install for this tool. e.g. --conan true or --conan "1.42.1"

All the available tools:
`),console.table({"compiler and analyzer":{tools:"--llvm, --gcc, --msvc, --vcvarsall, --cppcheck, --clangtidy, --clangformat"},"build system":{tools:"--cmake, --ninja, --meson, --make, --task, --bazel"},"package manager":{tools:"--vcpkg, --conan, --choco, --brew, --nala"},cache:{tools:"--cppcache, --sccache"},documentation:{tools:"--doxygen, --graphviz"},coverage:{tools:"--gcovr, --opencppcoverage, --kcov"},other:{tools:"--python, --powershell, --sevenzip"}},["tools"]));// cpu architecture
let o=i.architecture??process.arch,s=process.env.SETUP_CPP_DIR??t8(""),a=[],l=[],c=Y.create({autoloadLocales:!0});Y.addLocale(/*@__PURE__*/B(J)),z.addLocale(/*@__PURE__*/B(W));// installing the specified tools
let u=await sm();// sync the version for the llvm tools
if(!function(e,t){let r=t.filter(t=>void 0!==e[t]),n=r.filter(t=>!sd(e[t])),i=n.length>=1?e[n[0]]:"true";return!n.some(t=>e[t]!==i)&&(r.forEach(t=>{e[t]=i;}),!0);}(i,["llvm","clangtidy","clangformat"]))return(0,K.error)("The same version must be used for llvm, clangformat and clangtidy"),1;iF()&&"string"==typeof i.cppcheck&&"string"==typeof i.gcovr&&((0,K.info)("installing python-pygments to avoid conflicts with cppcheck and gcovr on Arch linux"),await iz("python-pygments"));/** Used to unset CPPFLAGS of LLVM when other compilers are used as the main compiler */let d=!1,p=!1;for(let e of a5){// fail fast inside CI when any tool fails
if(X.isCI&&0!==l.length){p=!0;break;}// get the version or "true" or undefined for this tool from the options
let n=i[e];void 0!==n&&(// running the setup function for this tool
t=Date.now(),// eslint-disable-next-line no-await-in-loop
d=await av(e,n,u,o,s,a,l,6e4*parseFloat(i.timeout??"20")),r=Date.now(),(0,K.info)(`took ${c.format(t,r)||"0 seconds"}`));}if(!p){// installing the specified compiler
let e=i.compiler;if(void 0!==e){let t=Date.now();await a9(e,u,s,o,a,d,l);let r=Date.now();(0,K.info)(`took ${c.format(t,r)||"0 seconds"}`);}}if(await nY(),0===a.length&&0===l.length)return(0,K.warning)("setup-cpp was called without any arguments. Nothing to do."),0;if(// report the messages in the end
a.forEach(e=>(0,K.success)(e)),l.forEach(e=>(0,K.error)(e)),(0,K.info)("setup-cpp finished"),!X.GITHUB_ACTIONS)switch(process.platform){case"win32":(0,K.warning)("Run `RefreshEnv.cmd` or restart your shell to update the environment.");break;case"linux":case"darwin":(0,K.warning)("Run `source ~/.cpprc` or restart your shell to update the environment.");}return await n,0===l.length?0:1;// exit with non-zero if any error message
})(process.argv).then(e=>{process.exitCode=e;}).catch(e=>{(0,K.error)("main() panicked!"),(0,K.error)(e),process.exitCode=1;});
//# sourceMappingURL=setup-cpp.js.map