import os
import sys

# Ensure project root is on sys.path so `src` is importable in all environments
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from src.math_tools import add, multiply, mul


@pytest.mark.parametrize(
    "x,y,expected",
    [
        (0, 0, 0),
        (2, 3, 5),
        (-1, 1, 0),
        (2.5, 0.5, 3.0),
    ],
)
def test_add_returns_sum(x, y, expected):
    assert add(x, y) == expected


@pytest.mark.parametrize(
    "x,y,expected",
    [
        (0, 0, 0),
        (4, 5, 20),
        (-2, 3, -6),
        (2.5, 0.4, 1.0),
    ],
)
def test_multiply_returns_product(x, y, expected):
    assert multiply(x, y) == expected


@pytest.mark.parametrize("x,y", [("a", "b"), ("ab", 3), (None, 1), ([], 2)])
def test_add_rejects_non_numeric(x, y):
    with pytest.raises(TypeError):
        add(x, y)  # type: ignore[arg-type]


@pytest.mark.parametrize("x,y", [("a", "b"), ("ab", 3), (None, 1), ([], 2)])
def test_multiply_rejects_non_numeric(x, y):
    with pytest.raises(TypeError):
        multiply(x, y)  # type: ignore[arg-type]


def test_mul_wrapper_calls_multiply():
    # Backward compatibility behavior
    assert mul(4, 5) == multiply(4, 5)
