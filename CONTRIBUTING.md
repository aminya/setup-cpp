# Contributing

You will need [`bun`](https://bun.com/) to build and test `setup-cpp`:

```shell
bun install
```

To avoid permenant changes to your system, you can use the test docker images under `./dev/docker/__tests__`.

Before running the tests locally, backup your environment variables because faulty code might corrupt the environment.

<https://stackoverflow.com/a/5147185/7910299>

Install [container-structure-test](https://github.com/GoogleContainerTools/container-structure-test) for docker testing.
