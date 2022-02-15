// test std libraries
#include <iostream>
#include <string>

// test c libraries
#include <cassert>
#include <cctype>
#include <cstddef>
#include <cstdint>
#include <cstring>

int main() {
    const auto x = 10.0;
    std::cout << "Testing " << x << '\n';

    const auto y = std::to_string(x);
    std::cout << "Testing " << y << '\n';
}
