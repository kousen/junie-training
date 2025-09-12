"""Basic math tools for numeric addition and multiplication.

This module provides small, typed helpers for arithmetic on real numbers.
Only int and float are supported to keep behavior explicit and predictable.
"""

from typing import Union

Number = Union[int, float]


def _ensure_number(value: object, name: str) -> Number:
    """Validate that a value is an int or float.

    Parameters:
        value: The value to validate.
        name: Parameter name for error messages.

    Returns:
        The value, typed as Number, if valid.

    Raises:
        TypeError: If value is not an int or float.
    """
    if not isinstance(value, (int, float)):
        raise TypeError(f"{name} must be int or float")
    return value  # type: ignore[return-value]


def add(x: Number, y: Number) -> Number:
    """Return the arithmetic sum of two numbers.

    Parameters:
        x: The first addend.
        y: The second addend.

    Returns:
        The sum of x and y.

    Raises:
        TypeError: If either argument is not an int or float.
    """
    _ensure_number(x, "x")
    _ensure_number(y, "y")
    return x + y


def multiply(x: Number, y: Number) -> Number:
    """Return the arithmetic product of two numbers.

    Parameters:
        x: The multiplicand.
        y: The multiplier.

    Returns:
        The product of x and y.

    Raises:
        TypeError: If either argument is not an int or float.
    """
    _ensure_number(x, "x")
    _ensure_number(y, "y")
    return x * y


def mul(x: Number, y: Number) -> Number:
    """Backward-compatible wrapper for multiply()."""
    return multiply(x, y)



def compound_amount(principal: Number, annual_rate: Number, years: Number, *, times_per_year: int = 12) -> float:
    """Compute accumulated amount with compound interest.

    Uses the standard compound interest formula:
        A = P * (1 + r/n) ** (n * t)

    Parameters:
        principal: Initial amount (non-negative).
        annual_rate: Annual nominal interest rate as a decimal (e.g., 0.05 for 5%). Must be >= 0.
        years: Number of years to grow (non-negative).
        times_per_year: Number of compounding periods per year (positive integer). Defaults to 12.

    Returns:
        Final accumulated amount as float.

    Raises:
        TypeError: If any numeric argument is not int or float.
        ValueError: If principal < 0, annual_rate < 0, years < 0, or times_per_year < 1.
    """
    p = _ensure_number(principal, "principal")
    r = _ensure_number(annual_rate, "annual_rate")
    t = _ensure_number(years, "years")
    if p < 0:
        raise ValueError("principal must be non-negative")
    if r < 0:
        raise ValueError("annual_rate must be non-negative")
    if t < 0:
        raise ValueError("years must be non-negative")
    if not isinstance(times_per_year, int):
        raise TypeError("times_per_year must be an integer")
    if times_per_year < 1:
        raise ValueError("times_per_year must be >= 1")

    n = times_per_year
    return float(p * (1.0 + (r / n)) ** (n * t))


def loan_payment(principal: Number, annual_rate: Number, years: Number, *, payments_per_year: int = 12) -> float:
    """Compute the fixed periodic payment for an amortized loan.

    Uses the standard annuity payment formula with nominal rate compounded per payment:
        payment = P * i / (1 - (1 + i) ** -N)
    where:
        i = annual_rate / payments_per_year
        N = years * payments_per_year

    Special case when annual_rate == 0: payment = P / N.

    Parameters:
        principal: Loan principal (non-negative).
        annual_rate: Annual nominal interest rate as a decimal (e.g., 0.05 for 5%). Must be >= 0.
        years: Loan term in years (non-negative).
        payments_per_year: Number of payments per year (positive integer). Defaults to 12.

    Returns:
        The periodic payment amount as float.

    Raises:
        TypeError: If any numeric argument is not int or float, or payments_per_year is not int.
        ValueError: If principal < 0, annual_rate < 0, years <= 0, or payments_per_year < 1.
    """
    p = _ensure_number(principal, "principal")
    r = _ensure_number(annual_rate, "annual_rate")
    t = _ensure_number(years, "years")

    if p < 0:
        raise ValueError("principal must be non-negative")
    if r < 0:
        raise ValueError("annual_rate must be non-negative")
    if t <= 0:
        raise ValueError("years must be > 0")
    if not isinstance(payments_per_year, int):
        raise TypeError("payments_per_year must be an integer")
    if payments_per_year < 1:
        raise ValueError("payments_per_year must be >= 1")

    N = payments_per_year * t
    # protect against float tiny differences when r is zero
    if r == 0:
        return float(p / N)

    i = r / payments_per_year
    denom = 1.0 - (1.0 + i) ** (-N)
    # In extremely small i cases, denom could underflow; fall back to simple division
    if denom == 0:
        return float(p / N)
    return float(p * i / denom)


def total_interest(principal: Number, annual_rate: Number, years: Number, *, payments_per_year: int = 12) -> float:
    """Compute total interest paid over the life of an amortized loan.

    Parameters:
        principal: Loan principal (non-negative).
        annual_rate: Annual nominal interest rate as a decimal (>= 0).
        years: Loan term in years (> 0).
        payments_per_year: Payments per year (>= 1), typically 12.

    Returns:
        Total interest paid as float. For zero-rate loans, this is 0.0.
    """
    payment = loan_payment(principal, annual_rate, years, payments_per_year=payments_per_year)
    N = payments_per_year * float(years)
    total_paid = payment * N
    return float(total_paid - float(principal))
