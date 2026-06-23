"""Interactive Tkinter calculator for the math tools module."""

import tkinter as tk
from tkinter import ttk
from typing import Optional, Sequence

from src.math_tools import Number, Stats, calculate, find_max

__all__ = [
    "CalculatorApp",
    "format_result",
    "main",
    "parse_number",
    "parse_number_sequence",
]


def parse_number(value: str) -> Number:
    """Parse a text value into an integer or floating-point number.

    Args:
        value: The text to parse.

    Returns:
        An ``int`` when possible, otherwise a ``float``.

    Raises:
        ValueError: If ``value`` is empty or is not numeric.
    """
    stripped_value = value.strip()
    if not stripped_value:
        raise ValueError("Enter a number")

    try:
        return int(stripped_value)
    except ValueError:
        try:
            return float(stripped_value)
        except ValueError as exc:
            raise ValueError(f"Invalid number: {value}") from exc


def parse_number_sequence(value: str) -> Sequence[Number]:
    """Parse comma-separated text into a sequence of numbers.

    Args:
        value: Comma-separated numeric text.

    Returns:
        A list of parsed numbers.

    Raises:
        ValueError: If no values are provided or any value is not numeric.
    """
    parts = [part.strip() for part in value.split(",")]
    if not value.strip() or any(not part for part in parts):
        raise ValueError("Enter comma-separated numbers")

    return [parse_number(part) for part in parts]


def format_result(value: Number) -> str:
    """Format a numeric result for display.

    Args:
        value: The numeric value to format.

    Returns:
        A compact string representation of ``value``.
    """
    if isinstance(value, float) and value.is_integer():
        return str(int(value))

    return str(value)


class CalculatorApp:
    """Tkinter user interface for arithmetic and statistics operations."""

    def __init__(self, root: tk.Tk) -> None:
        """Initialize the calculator window.

        Args:
            root: The Tkinter root window.
        """
        self._root = root
        self._stats = Stats()
        self._left_operand = tk.StringVar()
        self._right_operand = tk.StringVar()
        self._active_operand = self._left_operand
        self._operation = tk.StringVar(value="add")
        self._numbers = tk.StringVar()
        self._result = tk.StringVar(value="—")
        self._status = tk.StringVar(value="Ready")
        self._build_ui()

    def _build_ui(self) -> None:
        """Build and arrange the calculator widgets."""
        self._root.title("Math Tools Calculator")
        self._root.resizable(False, False)
        self._root.configure(background="#f8fafc")
        self._root.bind("<Return>", self._calculate_arithmetic)

        self._configure_styles()

        frame = ttk.Frame(self._root, padding=20, style="App.TFrame")
        frame.grid(row=0, column=0, sticky="nsew")
        frame.columnconfigure(0, weight=1)

        self._build_header(frame)
        self._build_arithmetic_section(frame)
        self._build_statistics_section(frame)
        self._build_result_section(frame)

    def _configure_styles(self) -> None:
        """Configure calculator-specific Tkinter styles."""
        style = ttk.Style(self._root)
        style.configure("App.TFrame", background="#f8fafc")
        style.configure("Panel.TLabelframe", background="#e2e8f0")
        style.configure(
            "Panel.TLabelframe.Label",
            background="#f8fafc",
            foreground="#0f172a",
            font=("Helvetica", 14, "bold"),
        )
        style.configure("Panel.TFrame", background="#e2e8f0")
        style.configure(
            "Header.TLabel",
            background="#f8fafc",
            foreground="#0f172a",
            font=("Helvetica", 26, "bold"),
        )
        style.configure(
            "Subheader.TLabel",
            background="#f8fafc",
            foreground="#475569",
            font=("Helvetica", 13),
        )
        style.configure(
            "Field.TLabel",
            background="#e2e8f0",
            foreground="#0f172a",
            font=("Helvetica", 13, "bold"),
        )
        style.configure(
            "Hint.TLabel",
            background="#e2e8f0",
            foreground="#475569",
            font=("Helvetica", 12),
        )
        style.configure(
            "Result.TLabel",
            background="#020617",
            foreground="#f8fafc",
            font=("Helvetica", 34, "bold"),
            padding=14,
        )
        style.configure(
            "Status.TLabel",
            background="#e2e8f0",
            foreground="#334155",
            font=("Helvetica", 12),
        )
        style.configure(
            "Action.TButton",
            font=("Helvetica", 14, "bold"),
            padding=8,
        )

    def _build_header(self, frame: ttk.Frame) -> None:
        """Build the calculator title and short usage hint."""
        ttk.Label(
            frame,
            text="Math Tools Calculator",
            style="Header.TLabel",
        ).grid(row=0, column=0, sticky="w")
        ttk.Label(
            frame,
            text="Arithmetic and statistics powered by src.math_tools",
            style="Subheader.TLabel",
        ).grid(row=1, column=0, sticky="w", pady=(2, 14))

    def _build_arithmetic_section(self, frame: ttk.Frame) -> None:
        """Build the arithmetic input controls."""
        section = ttk.LabelFrame(
            frame,
            text="Arithmetic",
            padding=14,
            style="Panel.TLabelframe",
        )
        section.grid(row=2, column=0, sticky="ew", pady=(0, 12))
        section.columnconfigure(0, weight=1)
        section.columnconfigure(1, weight=1)

        ttk.Label(section, text="Left number", style="Field.TLabel").grid(
            row=0,
            column=0,
            sticky="w",
        )
        ttk.Label(section, text="Right number", style="Field.TLabel").grid(
            row=0,
            column=1,
            sticky="w",
        )
        left_entry = ttk.Entry(
            section,
            textvariable=self._left_operand,
            width=18,
            font=("Helvetica", 18),
        )
        left_entry.grid(
            row=1,
            column=0,
            sticky="ew",
            padx=(0, 8),
            pady=(2, 10),
        )
        left_entry.bind(
            "<FocusIn>",
            lambda event: self._set_active_operand(self._left_operand),
        )
        right_entry = ttk.Entry(
            section,
            textvariable=self._right_operand,
            width=18,
            font=("Helvetica", 18),
        )
        right_entry.grid(
            row=1,
            column=1,
            sticky="ew",
            pady=(2, 10),
        )
        right_entry.bind(
            "<FocusIn>",
            lambda event: self._set_active_operand(self._right_operand),
        )

        operations = (
            ("Add", "add"),
            ("Subtract", "sub"),
            ("Multiply", "mul"),
            ("Divide", "div"),
        )
        operation_frame = ttk.Frame(section, style="Panel.TFrame")
        operation_frame.grid(row=2, column=0, columnspan=2, sticky="ew")
        for index, (label, value) in enumerate(operations):
            ttk.Radiobutton(
                operation_frame,
                text=label,
                value=value,
                variable=self._operation,
            ).grid(row=0, column=index, sticky="w", padx=(0, 10))

        self._build_number_pad(section)

        ttk.Button(
            section,
            text="Calculate arithmetic",
            command=self._calculate_arithmetic,
            style="Action.TButton",
        ).grid(row=4, column=0, columnspan=2, sticky="ew", pady=(12, 0))

    def _build_number_pad(self, section: ttk.LabelFrame) -> None:
        """Build the clickable calculator-style number pad."""
        keypad = tk.Frame(section, background="#cbd5e1")
        keypad.grid(row=3, column=0, columnspan=2, sticky="ew", pady=(12, 0))
        for column in range(4):
            keypad.columnconfigure(column, weight=1)

        buttons = (
            ("7", "8", "9", "⌫"),
            ("4", "5", "6", "C"),
            ("1", "2", "3", "±"),
            ("0", ".", "−", "Next"),
        )
        for row_index, row in enumerate(buttons):
            for column_index, label in enumerate(row):
                command = lambda value=label: self._handle_keypad_press(value)
                button = tk.Button(
                    keypad,
                    text=label,
                    command=command,
                    background=self._keypad_color(label),
                    foreground="#0f172a",
                    activebackground="#fde68a",
                    activeforeground="#0f172a",
                    borderwidth=1,
                    font=("Helvetica", 18, "bold"),
                    height=2,
                    relief=tk.FLAT,
                )
                button.grid(
                    row=row_index,
                    column=column_index,
                    sticky="nsew",
                    padx=3,
                    pady=3,
                )

    def _build_statistics_section(self, frame: ttk.Frame) -> None:
        """Build the statistics input controls."""
        section = ttk.LabelFrame(
            frame,
            text="Statistics",
            padding=14,
            style="Panel.TLabelframe",
        )
        section.grid(row=3, column=0, sticky="ew", pady=(0, 12))
        section.columnconfigure(0, weight=1)
        section.columnconfigure(1, weight=1)
        section.columnconfigure(2, weight=1)

        ttk.Label(section, text="Numbers", style="Field.TLabel").grid(
            row=0,
            column=0,
            columnspan=3,
            sticky="w",
        )
        ttk.Entry(
            section,
            textvariable=self._numbers,
            width=42,
            font=("Helvetica", 16),
        ).grid(
            row=1,
            column=0,
            columnspan=3,
            sticky="ew",
            pady=(2, 4),
        )
        ttk.Label(
            section,
            text="Example: 10, 4, 7, 12",
            style="Hint.TLabel",
        ).grid(row=2, column=0, columnspan=3, sticky="w", pady=(0, 10))
        ttk.Button(
            section,
            text="Average",
            command=self._calculate_average,
            style="Action.TButton",
        ).grid(
            row=3,
            column=0,
            sticky="ew",
            padx=(0, 5),
        )
        ttk.Button(
            section,
            text="Median",
            command=self._calculate_median,
            style="Action.TButton",
        ).grid(
            row=3,
            column=1,
            sticky="ew",
            padx=5,
        )
        ttk.Button(
            section,
            text="Maximum",
            command=self._calculate_max,
            style="Action.TButton",
        ).grid(
            row=3,
            column=2,
            sticky="ew",
            padx=(5, 0),
        )

    def _build_result_section(self, frame: ttk.Frame) -> None:
        """Build the result display and utility controls."""
        section = ttk.LabelFrame(
            frame,
            text="Result",
            padding=14,
            style="Panel.TLabelframe",
        )
        section.grid(row=4, column=0, sticky="ew")
        section.columnconfigure(0, weight=1)

        ttk.Label(section, textvariable=self._result, style="Result.TLabel").grid(
            row=0,
            column=0,
            sticky="ew",
            pady=(0, 8),
        )
        ttk.Label(section, textvariable=self._status, style="Status.TLabel").grid(
            row=1,
            column=0,
            sticky="w",
        )
        ttk.Button(section, text="Clear", command=self._clear).grid(
            row=2,
            column=0,
            sticky="ew",
            pady=(12, 0),
        )

    def _set_active_operand(self, operand: tk.StringVar) -> None:
        """Select which arithmetic operand receives keypad input."""
        self._active_operand = operand

    def _handle_keypad_press(self, value: str) -> None:
        """Apply a keypad button press to the active arithmetic operand."""
        if value == "Next":
            self._toggle_active_operand()
            return
        if value == "C":
            self._active_operand.set("")
            return
        if value == "⌫":
            self._active_operand.set(self._active_operand.get()[:-1])
            return
        if value == "±":
            current = self._active_operand.get()
            self._active_operand.set(
                current[1:] if current.startswith("-") else f"-{current}"
            )
            return
        if value == "−":
            self._append_to_active_operand("-")
            return

        self._append_to_active_operand(value)

    def _append_to_active_operand(self, value: str) -> None:
        """Append text to the active arithmetic operand."""
        self._active_operand.set(f"{self._active_operand.get()}{value}")

    def _toggle_active_operand(self) -> None:
        """Switch keypad input between the left and right operands."""
        if self._active_operand is self._left_operand:
            self._active_operand = self._right_operand
            self._status.set("Keypad is entering the right number")
        else:
            self._active_operand = self._left_operand
            self._status.set("Keypad is entering the left number")

    @staticmethod
    def _keypad_color(label: str) -> str:
        """Return the background color for a keypad button."""
        if label in {"C", "⌫"}:
            return "#dc2626"
        if label in {"±", "−", "Next"}:
            return "#f97316"

        return "#2563eb"

    def _set_result(self, value: Number) -> None:
        """Display a successful calculation result."""
        self._result.set(format_result(value))
        self._status.set("Calculation complete")

    def _set_error(self, error: Exception) -> None:
        """Display a validation or calculation error."""
        self._result.set("—")
        self._status.set(f"Error: {error}")

    def _clear(self) -> None:
        """Clear all inputs and reset the result display."""
        self._left_operand.set("")
        self._right_operand.set("")
        self._numbers.set("")
        self._operation.set("add")
        self._result.set("—")
        self._status.set("Ready")

    def _calculate_arithmetic(self, event: Optional[tk.Event] = None) -> None:
        """Calculate and display the selected arithmetic operation."""
        try:
            x = parse_number(self._left_operand.get())
            y = parse_number(self._right_operand.get())
            self._set_result(calculate(x, y, self._operation.get()))
        except (ValueError, ZeroDivisionError) as exc:
            self._set_error(exc)

    def _calculate_average(self) -> None:
        """Calculate and display the average of entered numbers."""
        try:
            self._set_result(self._stats.average(parse_number_sequence(
                self._numbers.get(),
            )))
        except ValueError as exc:
            self._set_error(exc)

    def _calculate_median(self) -> None:
        """Calculate and display the median of entered numbers."""
        try:
            self._set_result(self._stats.median(parse_number_sequence(
                self._numbers.get(),
            )))
        except ValueError as exc:
            self._set_error(exc)

    def _calculate_max(self) -> None:
        """Calculate and display the maximum of entered numbers."""
        try:
            self._set_result(find_max(parse_number_sequence(
                self._numbers.get(),
            )))
        except ValueError as exc:
            self._set_error(exc)


def main() -> None:
    """Launch the calculator GUI."""
    root = tk.Tk()
    CalculatorApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()