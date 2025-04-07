import{mri,updateNotifier}from"./cli-deps.mjs";import{GITHUB_ACTIONS,error,info,inputs,maybeGetInput,packageJson,setupCpp,success,warning}from"./lib.mjs";async function main(args){const checkUpdatePromise=GITHUB_ACTIONS?Promise.resolve():checkUpdates();const opts=parseArgs(args);if(opts.help){printHelp();return 0}if(opts.version){info(`${packageJson.version}`);return 0}const{successMessages,errorMessages}=await setupCpp(opts);for(const tool of successMessages)success(tool);for(const tool of errorMessages)error(tool);if(successMessages.length!==0||errorMessages.length!==0){info("setup-cpp finished");if(!GITHUB_ACTIONS)switch(process.platform){case"win32":warning("Run `RefreshEnv.cmd` or restart your shell to update the environment.");break;case"linux":case"darwin":warning("Run `source ~/.cpprc` or restart your shell to update the environment.");break;default:}}await checkUpdatePromise;return errorMessages.length===0?0:1}async function checkUpdates(){try{await updateNotifier({pkg:packageJson})}catch(err){warning(`Failed to check for updates: ${err instanceof Error?err.message+err.stack:err}`)}}export function parseArgs(args){const defaults=Object.fromEntries(inputs.map(inp=>[inp,maybeGetInput(inp)]));return mri(args,{string:[...inputs,"timeout","node-package-manager"],default:defaults,alias:{h:"help",v:"version"},boolean:["help","version","setup-cpp"]})}function printHelp(){info(`
setup-cpp [options]
setup-cpp --compiler llvm --cmake true --ninja true --ccache true --vcpkg true

Install all the tools required for building and testing C++/C projects.

--architecture	 the cpu architecture to install the tools for. By default it uses the current CPU architecture.
--timeout	 the timeout for the installation of each tool in minutes. By default it is 10 minutes.
--compiler	 the <compiler> to install.
          	 You can specify the version instead of specifying just the name e.g: --compiler 'llvm-13.0.0'
--tool_name	 pass "true" or pass the <version> you would like to install for this tool. e.g. --conan true or --conan "1.42.1"
--nodePackageManager	 the node package manager to use (npm/yarn/pnpm) when installing setup-cpp globally
--help	 show this help message
--version	 show the version of setup-cpp

All the available tools:
`);console.table({"compiler and analyzer":{tools:"--llvm, --gcc, --msvc, --apple-clang, --vcvarsall"},"build system":{tools:"--cmake, --ninja, --meson, --make, --task, --bazel"},"package manager":{tools:"--vcpkg, --conan, --choco, --brew, --nala, --git, --setup-cpp"},"analyzer/linter":{tools:"--clang-tidy, --clang-format, --cppcheck, --cpplint, --flawfinder, --lizard, --infer, , --cmakelang, --cmake-lint, --cmake-format"},cache:{tools:"--ccache, --sccache"},documentation:{tools:"--doxygen, --graphviz"},coverage:{tools:"--gcovr, --opencppcoverage, --kcov"},other:{tools:"--python, --powershell, --sevenzip"}},["tools"])}if(process.env.SETUP_CPP_SKIP_MAIN!=="true")main(process.argv).then(ret=>{process.exitCode=ret}).catch(err=>{error("main() panicked!");error(err);process.exitCode=1});

//# sourceMappingURL=setup-cpp.mjs.map