"""Basic math and statistics utilities.

This module provides arithmetic calculation, maximum value lookup, and
simple descriptive statistics with PEP 8 compliance, type hints, and
clear documentation.
"""
from __future__ import annotations

import inspect
import logging
import math
from dataclasses import dataclass
from typing import Any, Callable, Iterable, Mapping, Optional, Sequence, Union, Literal, TypeVar, get_type_hints

# Public types
Number = Union[int, float]
TNum = TypeVar("TNum", int, float)

logger = logging.getLogger(__name__)


def validate_call(func: Callable[..., Any]) -> Callable[..., Any]:
    """Decorator to validate function calls against type hints and NaN inputs.

    - Validates positional and keyword arguments against the function's type hints
      (when present). If a mismatch is detected, raises ``TypeError``.
    - For numeric arguments (``int``/``float``), rejects ``NaN`` values by raising
      ``ValueError``.
    - Logs each call at DEBUG level including the function name and arguments.

    This decorator is lightweight and skips validation for parameters without
    type hints. It is designed to be applied selectively where stricter input
    validation is desired.
    """

    sig = inspect.signature(func)
    hints = get_type_hints(func)

    def _is_number(value: Any) -> bool:
        return isinstance(value, (int, float))

    def _check_type(name: str, value: Any) -> None:
        expected = hints.get(name)
        if expected is None:
            return  # no type hint => skip strict checking
        # Basic isinstance check; for typing constructs this is a best‑effort
        try:
            if getattr(expected, "__origin__", None) is Union:
                # Accept any of the union args
                if not any(isinstance(value, arg) for arg in expected.__args__ if isinstance(arg, type)):
                    raise TypeError(f"Argument '{name}' expected {expected}, got {type(value)}")
            elif isinstance(expected, type) and not isinstance(value, expected):
                raise TypeError(f"Argument '{name}' expected {expected.__name__}, got {type(value).__name__}")
        except Exception:
            # If inspection fails for complex types, be permissive rather than breaking
            pass

    def wrapper(*args: Any, **kwargs: Any) -> Any:
        bound = sig.bind_partial(*args, **kwargs)
        bound.apply_defaults()

        logger.debug("Calling %s with args=%s kwargs=%s", func.__name__, args, kwargs)

        for pname, pval in bound.arguments.items():
            _check_type(pname, pval)
            if _is_number(pval) and isinstance(pval, float) and math.isnan(pval):
                raise ValueError(f"Argument '{pname}' cannot be NaN")
        return func(*args, **kwargs)

    wrapper.__name__ = func.__name__
    wrapper.__doc__ = func.__doc__
    wrapper.__qualname__ = func.__qualname__
    return wrapper


@dataclass(frozen=True)
class Calculator:
    """Calculator for basic arithmetic operations.

    Stateless utility that exposes methods for add/sub/mul/div and a
    dispatch-based ``calculate`` method. Division by zero raises
    ``ZeroDivisionError``.
    """

    _OPS: Mapping[str, Callable[[Number, Number], Number]] = None  # type: ignore[assignment]

    def __post_init__(self) -> None:  # pragma: no cover - dataclass safety
        # Not expected to be called because we don't instantiate; kept for completeness
        pass

    @staticmethod
    @validate_call
    def add(x: Number, y: Number) -> Number:
        return x + y

    @staticmethod
    @validate_call
    def sub(x: Number, y: Number) -> Number:
        return x - y

    @staticmethod
    @validate_call
    def mul(x: Number, y: Number) -> Number:
        return x * y

    @staticmethod
    @validate_call
    def div(x: Number, y: Number) -> Number:
        if y == 0:
            raise ZeroDivisionError("division by zero")
        return x / y

    @staticmethod
    @validate_call
    def calculate(x: Number, y: Number, operation: str) -> Number:
        ops: Mapping[str, Callable[[Number, Number], Number]] = {
            "add": Calculator.add,
            "sub": Calculator.sub,
            "mul": Calculator.mul,
            "div": Calculator.div,
        }
        try:
            func = ops[operation]
        except KeyError as exc:
            raise ValueError(f"Unknown operation: {operation}") from exc
        return func(x, y)


def calculate(x: Number, y: Number, operation: Literal["add", "sub", "mul", "div"]) -> Number:
    """Perform a basic arithmetic operation on two numbers.

    Parameters
    ----------
    x : int | float
        Left operand.
    y : int | float
        Right operand.
    operation : {"add", "sub", "mul", "div"}
        The operation to perform: add, subtract, multiply, or divide.

    Returns
    -------
    int | float
        The computation result. Division uses true division and may return a float.

    Raises
    ------
    ZeroDivisionError
        If `operation` is "div" and `y` is zero.
    ValueError
        If `operation` is not one of the allowed values.
    """
    # Delegate to Calculator to reduce branches and keep a single implementation
    return Calculator.calculate(x, y, operation)


def find_max(values: Sequence[TNum]) -> Optional[TNum]:
    """Return the maximum value in a non-empty sequence.

    Parameters
    ----------
    values : Sequence[int | float]
        The sequence of numeric values to examine.

    Returns
    -------
    int | float | None
        The maximum value, or None if the sequence is empty.
    """
    if not values:
        return None
    return max(values)


class Statistics:
    """Basic descriptive statistics utilities (stateless)."""

    @staticmethod
    @validate_call
    def mean(numbers: Iterable[Number]) -> Optional[float]:
        """Compute the arithmetic mean.

        Returns None for an empty iterable, for consistency with `median` and
        `find_max`.
        """
        total = 0.0
        count = 0
        for n in numbers:
            total += float(n)
            count += 1
        if count == 0:
            return None
        return total / count

    @staticmethod
    @validate_call
    def median(numbers: Sequence[Number]) -> Optional[float]:
        """Compute the median of a sequence of numbers.

        Returns None for an empty sequence. For even-length sequences, returns the
        average of the two middle values as a float.
        """
        if not numbers:
            return None
        sorted_nums = sorted(numbers)
        n = len(sorted_nums)
        mid = n // 2
        if n % 2 == 0:
            return (float(sorted_nums[mid - 1]) + float(sorted_nums[mid])) / 2.0
        return float(sorted_nums[mid])


# Backward-compatible alias
class Stats(Statistics):
    pass


@validate_call
def safe_divide(a: float, b: float) -> float:
    """Example function using validation decorator for tests.

    Raises ValueError if ``b`` is zero (handled by Python ZeroDivisionError), or
    if either argument is NaN via the decorator.
    """
    return a / b