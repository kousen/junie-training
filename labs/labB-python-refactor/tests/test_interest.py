import os
import sys

# Ensure project root is on sys.path so `src` is importable in all environments
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from src.math_tools import compound_amount, loan_payment, total_interest


@pytest.mark.parametrize(
    "principal,rate,years,n,expected",
    [
        (1000, 0.05, 1, 1, 1050.0),            # annual compounding
        (1000, 0.0, 5, 12, 1000.0),            # zero rate
        (1500, 0.043, 6, 4, None),             # quarterly, check monotonic > principal
    ],
)
def test_compound_amount(principal, rate, years, n, expected):
    amount = compound_amount(principal, rate, years, times_per_year=n)
    if expected is None:
        assert amount > principal
    else:
        assert amount == pytest.approx(expected, rel=1e-12, abs=1e-12)


@pytest.mark.parametrize(
    "principal,rate,years,ppy,expected",
    [
        (200000, 0.05, 30, 12, 1073.64),  # classic mortgage example
        (1200, 0.0, 1, 12, 100.0),        # zero-rate: 12 payments of 100
    ],
)
def test_loan_payment(principal, rate, years, ppy, expected):
    payment = loan_payment(principal, rate, years, payments_per_year=ppy)
    assert payment == pytest.approx(expected, rel=1e-4, abs=1e-4)


@pytest.mark.parametrize(
    "principal,rate,years,ppy",
    [
        (-1, 0.05, 1, 12),
        (1000, -0.01, 1, 12),
        (1000, 0.05, -1, 12),
        (1000, 0.05, 1, 0),
    ],
)
def test_invalid_inputs_raise(principal, rate, years, ppy):
    with pytest.raises((ValueError, TypeError)):
        # Try both APIs to ensure validation propagates
        compound_amount(principal, rate, years, times_per_year=ppy if ppy > 0 else 12)
        loan_payment(principal, rate, years, payments_per_year=ppy)


@pytest.mark.parametrize(
    "principal,rate,years,ppy,expected",
    [
        (1200, 0.0, 1, 12, 0.0),
        (100000, 0.05, 30, 12, None),  # only check positivity
    ],
)
def test_total_interest(principal, rate, years, ppy, expected):
    ti = total_interest(principal, rate, years, payments_per_year=ppy)
    if expected is None:
        assert ti > 0
    else:
        assert ti == pytest.approx(expected, rel=1e-12, abs=1e-12)
