import pytest

from src.math_tools import calculate, find_max, Stats


@pytest.mark.parametrize(
    "x,y,op,expected",
    [
        (1, 2, "add", 3),
        (5, 3, "sub", 2),
        (2, 4, "mul", 8),
        (9, 2, "div", 4.5),
    ],
)
def test_calculate_happy_path(x, y, op, expected):
    assert calculate(x, y, op) == expected


def test_calculate_divide_by_zero_raises():
    with pytest.raises(ZeroDivisionError):
        calculate(1, 0, "div")


def test_calculate_unknown_operation_raises():
    with pytest.raises(ValueError):
        calculate(1, 2, "pow")


@pytest.mark.parametrize(
    "values,expected",
    [
        ([1, 2, 3], 3),
        ([-1, -5, -2], -1),
        ([], None),
    ],
)
def test_find_max(values, expected):
    assert find_max(values) == expected


@pytest.mark.parametrize(
    "values,expected",
    [
        ([1, 2, 3, 4], 2.5),
        ([1, 3, 3], 3.0),
        ([], None),
    ],
)
def test_stats_median(values, expected):
    assert Stats.median(values) == expected


@pytest.mark.parametrize(
    "values,expected",
    [
        ([1, 2, 3, 4], 2.5),
        ([10], 10.0),
        ([], None),
    ],
)
def test_stats_mean(values, expected):
    assert Stats.mean(values) == expected
