"""Tests for the math_tools module."""

from typing import List, Union

import pytest

from src.math_tools import Calc, Number, add, calc, mul


@pytest.mark.parametrize(
    "a,b,expected",
    [
        (2, 3, 5),
        (-5, 3, -2),
        (-4, -6, -10),
        (0, 0, 0),
        (10, 0, 10),
        (0, -7, -7),
        (1.5, 2.5, 4.0),
        (1.1, 2.2, pytest.approx(3.3)),
        (10, 2.5, 12.5),
        (complex(1, 2), complex(3, 4), complex(4, 6)),
        (10**18, 10**18, 2 * 10**18),
    ],
)
def test_add_returns_sum_of_numbers(
    a: Number, b: Number, expected: Number
) -> None:
    """Verify add computes correct sum across numeric types."""
    assert add(a, b) == expected


def test_add_supports_keyword_arguments() -> None:
    """Verify add works correctly with explicit keyword arguments."""
    assert add(a=10, b=20) == 30
    assert add(b=5, a=15) == 20


@pytest.mark.parametrize(
    "a,b,expected",
    [
        ("hello ", "world", "hello world"),
        ([1, 2], [3, 4], [1, 2, 3, 4]),
        ((1, 2), (3,), (1, 2, 3)),
    ],
)
def test_add_preserves_sequence_concatenation(
    a: object, b: object, expected: object
) -> None:
    """Verify add preserves Python sequence concatenation semantics."""
    assert add(a, b) == expected  # type: ignore[operator]


@pytest.mark.parametrize(
    "a,b",
    [
        (1, "two"),
        ("one", 2),
        (None, 5),
        (object(), 1),
    ],
)
def test_add_raises_type_error_for_incompatible_operands(
    a: object, b: object
) -> None:
    """Verify add raises TypeError when operands cannot be added."""
    with pytest.raises(TypeError):
        add(a, b)  # type: ignore[operator]


@pytest.mark.parametrize(
    "a,b,expected",
    [
        (4, 5, 20),
        (-3, 4, -12),
        (-2, -6, 12),
        (0, 100, 0),
        (100, 0, 0),
        (2.5, 4.0, 10.0),
        (0.1, 0.2, pytest.approx(0.02)),
        (3, 1.5, 4.5),
        (complex(2, 3), complex(1, -1), complex(5, 1)),
        (10**10, 10**10, 10**20),
    ],
)
def test_mul_returns_product_of_numbers(
    a: Number, b: Number, expected: Number
) -> None:
    """Verify mul computes correct product across numeric types."""
    assert mul(a, b) == expected


def test_mul_supports_keyword_arguments() -> None:
    """Verify mul works correctly with explicit keyword arguments."""
    assert mul(a=3, b=7) == 21
    assert mul(b=4, a=6) == 24


@pytest.mark.parametrize(
    "a,b,expected",
    [
        ("abc", 3, "abcabcabc"),
        (3, "abc", "abcabcabc"),
        ([1, 2], 2, [1, 2, 1, 2]),
    ],
)
def test_mul_preserves_sequence_repetition(
    a: object, b: object, expected: object
) -> None:
    """Verify mul preserves Python sequence repetition semantics."""
    assert mul(a, b) == expected  # type: ignore[operator]


@pytest.mark.parametrize(
    "a,b",
    [
        ("a", "b"),
        (2.5, "text"),
        (None, 5),
    ],
)
def test_mul_raises_type_error_for_incompatible_operands(
    a: object, b: object
) -> None:
    """Verify mul raises TypeError when operands cannot be multiplied."""
    with pytest.raises(TypeError):
        mul(a, b)  # type: ignore[operator]


def test_calc_legacy_alias_references_calc_class() -> None:
    """Verify calc is an alias referring to Calc."""
    assert calc is Calc


@pytest.mark.parametrize("calculator_cls", [Calc, calc])
def test_calc_initializes_memory_to_zero(
    calculator_cls: type,
) -> None:
    """Verify a new calculator instance starts with memory equal to 0."""
    instance = calculator_cls()
    assert instance.mem == 0


@pytest.mark.parametrize(
    "updates,expected",
    [
        ([10], 10),
        ([5, 15, 20], 40),
        ([10, -3, -2], 5),
        ([1.5, 2.25], 3.75),
        ([complex(1, 2), complex(3, 4)], complex(4, 6)),
    ],
)
def test_add_to_mem_accumulates_values(
    updates: List[Number], expected: Number
) -> None:
    """Verify add_to_mem accumulates sequential updates correctly."""
    c = Calc()
    for val in updates:
        c.add_to_mem(val)
    assert c.mem == expected


def test_add_to_mem_returns_none() -> None:
    """Verify add_to_mem returns None indicating in-place state mutation."""
    c = Calc()
    result = c.add_to_mem(15)
    assert result is None
    assert c.mem == 15


def test_calc_instances_maintain_independent_state() -> None:
    """Verify multiple Calc instances do not share memory state."""
    c1 = Calc()
    c2 = Calc()
    c1.add_to_mem(10)
    assert c1.mem == 10
    assert c2.mem == 0


def test_calc_supports_direct_memory_assignment() -> None:
    """Verify mem attribute can be directly read and updated."""
    c = Calc()
    c.mem = 42
    assert c.mem == 42
    c.add_to_mem(8)
    assert c.mem == 50


def test_add_to_mem_leaves_memory_unchanged_on_type_error() -> None:
    """Verify failed add_to_mem call raises TypeError and preserves existing mem."""
    c = Calc()
    c.add_to_mem(10)
    with pytest.raises(TypeError):
        c.add_to_mem("invalid")  # type: ignore[arg-type]
    assert c.mem == 10
