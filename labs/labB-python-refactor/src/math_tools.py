"""Mathematical utility functions and calculator state management."""

from typing import Union

Number = Union[int, float, complex]


def add(a: Number, b: Number) -> Number:
    """Add two numbers or values supporting the addition operator.

    Args:
        a: The first operand.
        b: The second operand.

    Returns:
        The sum of `a` and `b`.

    Raises:
        TypeError: If `a` and `b` cannot be added together.
    """
    return a + b


def mul(a: Number, b: Number) -> Number:
    """Multiply two numbers or values supporting the multiplication operator.

    Args:
        a: The first operand.
        b: The second operand.

    Returns:
        The product of `a` and `b`.

    Raises:
        TypeError: If `a` and `b` cannot be multiplied.
    """
    return a * b


class Calc:
    """A simple calculator maintaining a running memory value.

    Attributes:
        mem: The current accumulated memory value.
    """

    def __init__(self) -> None:
        """Initialize the calculator memory to zero."""
        self.mem: Number = 0

    def add_to_mem(self, x: Number) -> None:
        """Add a value to the calculator's current memory.

        Args:
            x: The value to add to memory.

        Raises:
            TypeError: If `x` cannot be added to the current memory value.
        """
        self.mem = self.mem + x


# Legacy alias for backward compatibility.
calc = Calc
