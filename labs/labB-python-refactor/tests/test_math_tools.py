import pytest
from src.math_tools import add, mul, calc

def test_add_basic():
    # TODO: Junie will rewrite/add parameterized tests
    assert add(2, 3) == 5

def test_mul_basic():
    assert mul(4, 5) == 20

def test_calc_memory():
    c = calc()
    c.add_to_mem(10)
    assert c.mem == 10
