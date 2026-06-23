from typing import List

import pytest

from src.calculator_gui import format_result, parse_number, parse_number_sequence


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        ("3", 3),
        ("  -7  ", -7),
        ("2.5", 2.5),
    ],
)
def test_parse_number_returns_numeric_value(value: str, expected: float) -> None:
    assert parse_number(value) == expected


@pytest.mark.parametrize("value", ["", "abc"])
def test_parse_number_raises_for_invalid_input(value: str) -> None:
    with pytest.raises(ValueError):
        parse_number(value)


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        ("1,2,3", [1, 2, 3]),
        ("1.5, -2, 3", [1.5, -2, 3]),
    ],
)
def test_parse_number_sequence_returns_numbers(
    value: str,
    expected: List[float],
) -> None:
    assert parse_number_sequence(value) == expected


@pytest.mark.parametrize("value", ["", "1,,2", "1, nope"])
def test_parse_number_sequence_raises_for_invalid_input(value: str) -> None:
    with pytest.raises(ValueError):
        parse_number_sequence(value)


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        (4, "4"),
        (4.0, "4"),
        (2.5, "2.5"),
    ],
)
def test_format_result_returns_compact_display_text(
    value: float,
    expected: str,
) -> None:
    assert format_result(value) == expected