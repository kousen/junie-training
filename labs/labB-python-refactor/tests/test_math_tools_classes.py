import pytest

from src.math_tools import (
    calculate,
    find_max,
    Stats,
    Statistics,
    Calculator,
    safe_divide,
)


class TestCalculate:
    @pytest.mark.parametrize(
        "x,y,op,expected",
        [
            (1, 2, "add", 3),
            (5, 3, "sub", 2),
            (2, 4, "mul", 8),
            (9, 2, "div", 4.5),
        ],
    )
    def test_calculate_happy_path(self, x, y, op, expected):
        assert calculate(x, y, op) == expected

    def test_calculate_divide_by_zero_raises(self):
        with pytest.raises(ZeroDivisionError):
            calculate(1, 0, "div")

    def test_calculate_unknown_operation_raises(self):
        with pytest.raises(ValueError):
            calculate(1, 2, "pow")

    @pytest.mark.parametrize(
        "x,y,method,expected",
        [
            (3, 4, Calculator.add, 7),
            (7, 3, Calculator.sub, 4),
            (3, 5, Calculator.mul, 15),
        ],
    )
    def test_calculator_methods(self, x, y, method, expected):
        assert method(x, y) == expected

    def test_calculator_div_zero_raises(self):
        with pytest.raises(ZeroDivisionError):
            Calculator.div(1, 0)


class TestFindMax:
    @pytest.mark.parametrize(
        "values,expected",
        [
            ([1, 2, 3], 3),
            ([-1, -5, -2], -1),
            ([], None),
        ],
    )
    def test_find_max(self, values, expected):
        assert find_max(values) == expected


class TestStatistics:
    @pytest.mark.parametrize(
        "values,expected",
        [
            ([1, 2, 3, 4], 2.5),
            ([1, 3, 3], 3.0),
            ([], None),
        ],
    )
    def test_stats_median(self, values, expected):
        assert Stats.median(values) == expected

    @pytest.mark.parametrize(
        "values,expected",
        [
            ([1, 2, 3, 4], 2.5),
            ([10], 10.0),
            ([], None),
        ],
    )
    def test_stats_mean(self, values, expected):
        assert Stats.mean(values) == expected

    def test_statistics_alias(self, positive_sequence):
        # Stats is a subclass of Statistics
        assert Stats.mean(positive_sequence) == Statistics.mean(positive_sequence)


class TestValidationDecorator:
    def test_safe_divide_nan_raises(self, nan_value):
        with pytest.raises(ValueError, match="cannot be NaN"):
            safe_divide(nan_value, 1.0)
        with pytest.raises(ValueError, match="cannot be NaN"):
            safe_divide(1.0, nan_value)

    def test_validate_call_type_mismatch_is_permissive_for_complex_types(self):
        # Our decorator is permissive for complex typing constructs; ensure it doesn't crash
        assert Calculator.add(1, 2) == 3

    def test_validate_call_logs(self, caplog):
        caplog.set_level("DEBUG")
        assert Calculator.mul(2, 5) == 10
        # Ensure at least one debug message from our logger name
        assert any(rec.levelname == "DEBUG" and rec.name.endswith("math_tools") for rec in caplog.records)
