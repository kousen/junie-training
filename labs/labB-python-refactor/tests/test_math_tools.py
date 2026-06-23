from typing import Sequence, Union

import pytest

from src.math_tools import Stats, calculate, find_max

Number = Union[int, float]

ARITHMETIC_CASES = [
    (2, 3, "add", 5),
    (7, 4, "sub", 3),
    (6, 5, "mul", 30),
    (8, 2, "div", 4),
]


@pytest.mark.parametrize(
    ("x", "y", "operation", "expected"),
    ARITHMETIC_CASES,
)
def test_calculate_returns_expected_result(
    x: int,
    y: int,
    operation: str,
    expected: int,
) -> None:
    assert calculate(x, y, operation) == pytest.approx(expected)


def test_calculate_raises_for_division_by_zero() -> None:
    with pytest.raises(ZeroDivisionError):
        calculate(8, 0, "div")


def test_calculate_raises_for_unsupported_operation() -> None:
    with pytest.raises(ValueError, match="Unsupported operation"):
        calculate(8, 2, "pow")


@pytest.mark.parametrize(
    ("values", "expected"),
    [
        ([1, 2, 3], 3),
        ([-10, -3, -7], -3),
        ([4, -1, 9, 0], 9),
        ([5], 5),
        ((3, 10, 2), 10),
    ],
)
def test_find_max_returns_largest_value(
    values: Sequence[int],
    expected: int,
) -> None:
    assert find_max(values) == expected


def test_find_max_raises_for_empty_values() -> None:
    with pytest.raises(ValueError, match="values must not be empty"):
        find_max([])


@pytest.mark.parametrize(
    ("numbers", "expected"),
    [
        ([1, 2, 3], 2),
        ([2, 4, 6, 8], 5),
        ([-3, 3], 0),
        ((2, 4, 6), 4),
    ],
)
def test_average_returns_expected_value(
    numbers: Sequence[int],
    expected: int,
) -> None:
    assert Stats().average(numbers) == pytest.approx(expected)


def test_average_raises_for_empty_values() -> None:
    with pytest.raises(ValueError, match="numbers must not be empty"):
        Stats().average([])


@pytest.mark.parametrize(
    ("numbers", "expected"),
    [
        ([1, 2, 3], 2),
        ([1, 2, 3, 4], 2.5),
        ([9, 1, 5], 5),
        ([-4, -1, -3, -2], -2.5),
        ((2, 4, 6, 8), 5),
    ],
)
def test_median_returns_expected_value(
    numbers: Sequence[int],
    expected: Number,
) -> None:
    assert Stats().median(numbers) == pytest.approx(expected)


def test_median_raises_for_empty_values() -> None:
    with pytest.raises(ValueError, match="nums must not be empty"):
        Stats().median([])

