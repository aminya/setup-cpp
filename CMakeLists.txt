cmake_minimum_required(VERSION 3.21...3.28)

project(
    setup_cpp_tests
    VERSION 1.2.0
    DESCRIPTION "Tests for setup-cpp"
    HOMEPAGE_URL "https://github.com/aminya/setup-cpp"
    LANGUAGES CXX C)

add_subdirectory("./dev/cpp_vcpkg_project")

add_executable(test_gcc ./src/gcc/__tests__/main.cpp)
target_compile_features(test_gcc PRIVATE cxx_std_17)

add_executable(test_llvm ./src/llvm/__tests__/main.cpp)
target_compile_features(test_llvm PRIVATE cxx_std_17)
