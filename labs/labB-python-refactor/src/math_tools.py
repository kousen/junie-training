"""Small arithmetic and statistics helpers."""

from typing import Sequence, Union

Number = Union[int, float]

__all__ = [
    "Stats",
    "calculate",
    "find_max",
]


def calculate(x: Number, y: Number, operation: str) -> Number:
    """Calculate the result of a basic arithmetic operation.

    Args:
        x: The left operand.
        y: The right operand.
        operation: The operation to perform. Supported values are ``add``,
            ``sub``, ``mul``, and ``div``.

    Returns:
        The arithmetic result.

    Raises:
        ZeroDivisionError: If ``operation`` is ``div`` and ``y`` is zero.
        ValueError: If ``operation`` is not supported.
    """
    if operation == "add":
        return x + y
    if operation == "sub":
        return x - y
    if operation == "mul":
        return x * y
    if operation == "div":
        if y == 0:
            raise ZeroDivisionError("division by zero")
        return x / y

    raise ValueError(f"Unsupported operation: {operation}")


def find_max(values: Sequence[Number]) -> Number:
    """Find the largest number in a non-empty sequence.

    Args:
        values: The sequence of numbers to inspect.

    Returns:
        The largest number in ``values``.

    Raises:
        ValueError: If ``values`` is empty.
    """
    if not values:
        raise ValueError("values must not be empty")

    return max(values)


class Stats:
    """Statistical utility methods for numeric sequences."""

    def average(self, numbers: Sequence[Number]) -> Number:
        """Calculate the arithmetic mean of a sequence of numbers.

        Args:
            numbers: The sequence of numbers to average.

        Returns:
            The arithmetic mean.

        Raises:
            ValueError: If ``numbers`` is empty.
        """
        if not numbers:
            raise ValueError("numbers must not be empty")

        return sum(numbers) / len(numbers)

    def median(self, nums: Sequence[Number]) -> Number:
        """Calculate the median of a non-empty sequence of numbers.

        Args:
            nums: The sequence of numbers to inspect.

        Returns:
            The middle value for odd-length input, or the mean of the two
            middle values for even-length input.

        Raises:
            ValueError: If ``nums`` is empty.
        """
        if not nums:
            raise ValueError("nums must not be empty")

        sorted_nums = sorted(nums)
        count = len(sorted_nums)
        middle = count // 2
        if count % 2 == 0:
            return (sorted_nums[middle - 1] + sorted_nums[middle]) / 2

        return sorted_nums[middle]