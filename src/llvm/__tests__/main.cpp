// test std libraries
#include <iostream>
#include <string>

// test c libraries
#include <cassert>
#include <cctype>
#include <cstddef>
#include <cstdint>
#include <cstring>
#include <cmath>

int main() {
    const auto val1 = 10.0;
    std::cout << "Testing " << val1 << '\n';

    const auto val2 = std::to_string(val1);
    std::cout << "Testing " << val2 << '\n';

    return static_cast<int>(std::sin(val1) + std::log(static_cast<double>(val2.size())) - 1);
}
