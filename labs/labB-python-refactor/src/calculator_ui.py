"""A simple, modern-feel calculator UI using Tkinter.

This module provides a small desktop calculator application built on the
standard library (no third-party dependencies). It reuses the project's
math utilities for addition and multiplication and provides subtraction
and division in the UI layer.

Run:
    python -m src.calculator_ui
or:
    python src/calculator_ui.py

Design goals:
- PEP 8 compliant with type hints and docstrings.
- Clear, testable state transitions (CalculatorState dataclass).
- Minimal dependencies while offering a clean, modern-ish appearance.

Note:
- Division by zero is guarded with a user-visible error.
- Only real-number operations are supported.
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Callable, Optional
import tkinter as tk
from tkinter import messagebox
from tkinter import ttk

from .math_tools import add, multiply, loan_payment, total_interest


@dataclass
class CalculatorState:
    """State container for the calculator.

    Attributes:
        display: Text currently shown on the calculator display.
        accumulator: The stored numeric value for the pending operation.
        pending_op: A string representing the pending operation ('+', '-', '×', '÷'), if any.
        reset_display: If True, the next digit press should replace the display.
    """

    display: str = "0"
    accumulator: Optional[float] = None
    pending_op: Optional[str] = None
    reset_display: bool = False

    def _to_float(self) -> float:
        """Convert the current display to float, handling trailing dots.

        Returns:
            The float value represented by the display string.
        """
        text = self.display.rstrip(".") or "0"
        try:
            return float(text)
        except ValueError:
            # Fallback: show error and reset
            self.display = "0"
            return 0.0

    def input_digit(self, digit: str) -> None:
        """Handle digit button input.

        Parameters:
            digit: A single character '0'..'9'.
        """
        if self.reset_display or self.display == "0":
            self.display = digit
            self.reset_display = False
        else:
            self.display += digit

    def input_dot(self) -> None:
        """Handle decimal dot input."""
        if self.reset_display:
            self.display = "0."
            self.reset_display = False
        elif "." not in self.display:
            self.display += "."

    def clear(self) -> None:
        """Reset all state to initial."""
        self.display = "0"
        self.accumulator = None
        self.pending_op = None
        self.reset_display = False

    def clear_entry(self) -> None:
        """Clear only the current entry (display)."""
        self.display = "0"
        self.reset_display = True

    def backspace(self) -> None:
        """Delete the last character from the display."""
        if self.reset_display:
            self.display = "0"
            self.reset_display = False
            return
        if len(self.display) > 1:
            self.display = self.display[:-1]
        else:
            self.display = "0"

    def negate(self) -> None:
        """Toggle the sign of the current display value."""
        if self.display.startswith("-"):
            self.display = self.display[1:]
        else:
            if self.display != "0":
                self.display = "-" + self.display

    def _apply_pending(self, rhs: float) -> float:
        """Apply the pending operation with the given right-hand side.

        Parameters:
            rhs: The right-hand side operand.

        Returns:
            The result of applying the pending operation.
        """
        if self.accumulator is None or self.pending_op is None:
            return rhs

        lhs = self.accumulator
        op = self.pending_op

        if op == "+":
            return float(add(lhs, rhs))
        if op == "-":
            # Subtraction via addition of a negated value to reuse math_tools.add
            return float(add(lhs, -rhs))
        if op == "×":
            return float(multiply(lhs, rhs))
        if op == "÷":
            if rhs == 0:
                raise ZeroDivisionError("Cannot divide by zero")
            # Division via multiplication by reciprocal to reuse math_tools.multiply
            return float(multiply(lhs, 1.0 / rhs))

        # Fallback (should not happen)
        return rhs

    def set_op(self, op: str) -> None:
        """Set or chain the pending operation.

        Parameters:
            op: One of '+', '-', '×', '÷'.
        """
        current = self._to_float()
        if self.pending_op is not None and self.accumulator is not None and not self.reset_display:
            # Chain operations: compute intermediate result first
            try:
                result = self._apply_pending(current)
            except ZeroDivisionError:
                self.display = "Error"
                self.accumulator = None
                self.pending_op = None
                self.reset_display = True
                return
            self.accumulator = result
            self.display = str_trim(result)
        else:
            self.accumulator = current
        self.pending_op = op
        self.reset_display = True

    def equals(self) -> None:
        """Compute the result of the pending operation, if any."""
        current = self._to_float()
        try:
            result = self._apply_pending(current)
        except ZeroDivisionError:
            self.display = "Error"
            self.accumulator = None
            self.pending_op = None
            self.reset_display = True
            return

        self.display = str_trim(result)
        self.accumulator = None
        self.pending_op = None
        self.reset_display = True


def str_trim(value: float) -> str:
    """Format a float value, trimming trailing zeros and dot.

    Examples:
        2.0 -> "2"
        2.500 -> "2.5"
    """
    text = f"{value:.12g}"
    # Avoid scientific notation for typical calculator ranges; keep as-is if used.
    if "e" in text or "E" in text:
        return text
    if "." in text:
        text = text.rstrip("0").rstrip(".")
    return text


class LoanDialog:
    """A simple loan calculator dialog using existing math tools.

    Provides fields for principal, annual interest rate (percent), years,
    and payments per year, and computes the periodic payment, total interest,
    and total paid.
    """

    def __init__(self, parent: tk.Tk) -> None:
        self.parent = parent
        self.top = tk.Toplevel(parent)
        self.top.title("Loan Calculator")
        self.top.transient(parent)
        self.top.grab_set()

        # Vars
        self.var_principal = tk.StringVar(value="200000")
        self.var_rate_percent = tk.StringVar(value="5.0")
        self.var_years = tk.StringVar(value="30")
        self.var_ppy = tk.StringVar(value="12")

        self.var_payment = tk.StringVar(value="")
        self.var_total_interest = tk.StringVar(value="")
        self.var_total_paid = tk.StringVar(value="")

        frame = ttk.Frame(self.top, padding=12)
        frame.grid(row=0, column=0, sticky="nsew")
        self.top.columnconfigure(0, weight=1)
        self.top.rowconfigure(0, weight=1)

        # Inputs
        ttk.Label(frame, text="Principal").grid(row=0, column=0, sticky="w", padx=(0, 8), pady=4)
        e_principal = ttk.Entry(frame, textvariable=self.var_principal, width=18)
        e_principal.grid(row=0, column=1, sticky="ew", pady=4)

        ttk.Label(frame, text="Annual Rate (%)").grid(row=1, column=0, sticky="w", padx=(0, 8), pady=4)
        e_rate = ttk.Entry(frame, textvariable=self.var_rate_percent, width=18)
        e_rate.grid(row=1, column=1, sticky="ew", pady=4)

        ttk.Label(frame, text="Years").grid(row=2, column=0, sticky="w", padx=(0, 8), pady=4)
        e_years = ttk.Entry(frame, textvariable=self.var_years, width=18)
        e_years.grid(row=2, column=1, sticky="ew", pady=4)

        ttk.Label(frame, text="Payments/Year").grid(row=3, column=0, sticky="w", padx=(0, 8), pady=4)
        e_ppy = ttk.Entry(frame, textvariable=self.var_ppy, width=18)
        e_ppy.grid(row=3, column=1, sticky="ew", pady=4)

        # Outputs
        sep = ttk.Separator(frame, orient="horizontal")
        sep.grid(row=4, column=0, columnspan=2, sticky="ew", pady=(8, 8))

        ttk.Label(frame, text="Payment / period").grid(row=5, column=0, sticky="w", padx=(0, 8), pady=4)
        ttk.Label(frame, textvariable=self.var_payment).grid(row=5, column=1, sticky="e", pady=4)

        ttk.Label(frame, text="Total Interest").grid(row=6, column=0, sticky="w", padx=(0, 8), pady=4)
        ttk.Label(frame, textvariable=self.var_total_interest).grid(row=6, column=1, sticky="e", pady=4)

        ttk.Label(frame, text="Total Paid").grid(row=7, column=0, sticky="w", padx=(0, 8), pady=4)
        ttk.Label(frame, textvariable=self.var_total_paid).grid(row=7, column=1, sticky="e", pady=4)

        # Buttons
        btns = ttk.Frame(frame)
        btns.grid(row=8, column=0, columnspan=2, sticky="ew", pady=(8, 0))
        btns.columnconfigure(0, weight=1)
        btns.columnconfigure(1, weight=1)
        btns.columnconfigure(2, weight=1)

        compute_btn = ttk.Button(btns, text="Compute", command=self.compute)
        compute_btn.grid(row=0, column=0, padx=4)
        ttk.Button(btns, text="Clear", command=self.clear).grid(row=0, column=1, padx=4)
        ttk.Button(btns, text="Close", command=self.close).grid(row=0, column=2, padx=4)

        # Enter key triggers Compute
        self.top.bind("<Return>", lambda _e: self.compute())
        self.top.bind("<KP_Enter>", lambda _e: self.compute())

        # Focus first field
        e_principal.focus_set()

    def _parse_float(self, value: str, name: str) -> float:
        try:
            return float(value)
        except ValueError as exc:
            raise ValueError(f"{name} must be a number") from exc

    def _parse_int(self, value: str, name: str) -> int:
        try:
            return int(value)
        except ValueError as exc:
            raise ValueError(f"{name} must be an integer") from exc

    def compute(self) -> None:
        """Compute loan payment and totals from current inputs."""
        try:
            principal = self._parse_float(self.var_principal.get(), "Principal")
            rate_percent = self._parse_float(self.var_rate_percent.get(), "Annual Rate (%)")
            years = self._parse_float(self.var_years.get(), "Years")
            ppy = self._parse_int(self.var_ppy.get(), "Payments/Year")

            rate_decimal = rate_percent / 100.0
            payment = loan_payment(principal, rate_decimal, years, payments_per_year=ppy)
            ti = total_interest(principal, rate_decimal, years, payments_per_year=ppy)
            total_paid = payment * (ppy * years)

            self.var_payment.set(f"{payment:,.2f}")
            self.var_total_interest.set(f"{ti:,.2f}")
            self.var_total_paid.set(f"{total_paid:,.2f}")
        except Exception as exc:  # show friendly error
            messagebox.showerror("Loan Calculator", str(exc))

    def clear(self) -> None:
        self.var_payment.set("")
        self.var_total_interest.set("")
        self.var_total_paid.set("")

    def close(self) -> None:
        self.top.destroy()


class CalculatorApp:
    """Tkinter-based calculator application."""

    def __init__(self, root: tk.Tk) -> None:
        self.root = root
        self.root.title("Calculator")
        self.root.geometry("320x440")
        self.root.resizable(False, False)
        self.state = CalculatorState()

        # Use a light, accessible theme with ttk to avoid platform default issues
        self.bg = "#f5f7fb"  # light background
        self.fg = "#111111"  # dark text
        self.accent = "#3a86ff"
        self.btn_bg = "#ffffff"
        self.op_bg = "#e9eef6"
        self.equal_bg = self.accent

        # ttk styling (clam allows background/foreground customization)
        style = ttk.Style(self.root)
        try:
            style.theme_use("clam")
        except Exception:
            # Fallback silently if theme not available
            pass

        style.configure("Display.TEntry", foreground=self.fg, fieldbackground=self.bg, background=self.bg)
        style.configure("Calc.TButton", font=("SF Pro Text", 18), foreground=self.fg, background=self.btn_bg, padding=8)
        style.map(
            "Calc.TButton",
            background=[("active", "#e6e6e6")],
        )
        style.configure("Op.TButton", foreground="#0b3d91", background=self.op_bg)
        style.map("Op.TButton", background=[("active", "#dbe7ff")])
        style.configure("Equal.TButton", foreground="#ffffff", background=self.equal_bg)
        style.map("Equal.TButton", background=[("active", "#2f6ed6")])

        self.root.configure(bg=self.bg)
        self._build_ui()

    def _build_ui(self) -> None:
        display = ttk.Entry(
            self.root,
            font=("SF Pro Text", 28),
            justify="right",
            state="readonly",
            style="Display.TEntry",
        )
        display.insert(0, self.state.display)
        display.grid(row=0, column=0, columnspan=4, sticky="nsew", padx=16, pady=(16, 8))
        self.display_widget = display

        # Configure grid weights
        for i in range(1, 7):
            self.root.rowconfigure(i, weight=1)
        for j in range(4):
            self.root.columnconfigure(j, weight=1)

        def add_btn(text: str, row: int, col: int, cmd: Callable[[], None], *,
                    colspan: int = 1, style: str = "Calc.TButton") -> None:
            btn = ttk.Button(
                self.root,
                text=text,
                style=style,
                command=lambda: (cmd(), self._refresh_display()),
            )
            btn.grid(row=row, column=col, columnspan=colspan, sticky="nsew", padx=8, pady=8)

        # Row 1: Clear, CE, Backspace, Divide
        add_btn("C", 1, 0, self.state.clear, style="Op.TButton")
        add_btn("CE", 1, 1, self.state.clear_entry, style="Op.TButton")
        add_btn("⌫", 1, 2, self.state.backspace, style="Op.TButton")
        add_btn("÷", 1, 3, lambda: self.state.set_op("÷"), style="Op.TButton")

        # Row 2: 7 8 9 Multiply
        add_btn("7", 2, 0, lambda: self.state.input_digit("7"))
        add_btn("8", 2, 1, lambda: self.state.input_digit("8"))
        add_btn("9", 2, 2, lambda: self.state.input_digit("9"))
        add_btn("×", 2, 3, lambda: self.state.set_op("×"), style="Op.TButton")

        # Row 3: 4 5 6 Minus
        add_btn("4", 3, 0, lambda: self.state.input_digit("4"))
        add_btn("5", 3, 1, lambda: self.state.input_digit("5"))
        add_btn("6", 3, 2, lambda: self.state.input_digit("6"))
        add_btn("-", 3, 3, lambda: self.state.set_op("-"), style="Op.TButton")

        # Row 4: 1 2 3 Plus
        add_btn("1", 4, 0, lambda: self.state.input_digit("1"))
        add_btn("2", 4, 1, lambda: self.state.input_digit("2"))
        add_btn("3", 4, 2, lambda: self.state.input_digit("3"))
        add_btn("+", 4, 3, lambda: self.state.set_op("+"), style="Op.TButton")

        # Row 5: +/- 0 . Equals
        add_btn("±", 5, 0, self.state.negate)
        add_btn("0", 5, 1, lambda: self.state.input_digit("0"))
        add_btn(".", 5, 2, self.state.input_dot)
        add_btn("=", 5, 3, self.state.equals, style="Equal.TButton")

        # Row 6: Loan Calculator button
        add_btn("Loan…", 6, 0, self._open_loan_dialog, colspan=4, style="Op.TButton")

        # Keyboard bindings for convenience
        self.root.bind("<Key>", self._on_key)

    def _open_loan_dialog(self) -> None:
        LoanDialog(self.root)

    def _refresh_display(self) -> None:
        self.display_widget.config(state="normal")
        self.display_widget.delete(0, tk.END)
        self.display_widget.insert(0, self.state.display)
        self.display_widget.config(state="readonly")

    def _on_key(self, event: tk.Event) -> None:  # type: ignore[type-arg]
        """Keyboard shortcuts: digits, operators, Enter/Return, Backspace, Esc."""
        char = event.char
        keysym = event.keysym

        if char.isdigit():
            self.state.input_digit(char)
        elif char == ".":
            self.state.input_dot()
        elif char in "+-*/":
            op_map = {"+": "+", "-": "-", "*": "×", "/": "÷"}
            self.state.set_op(op_map[char])
        elif keysym in ("Return", "KP_Enter", "Equal"):
            self.state.equals()
        elif keysym == "BackSpace":
            self.state.backspace()
        elif keysym == "Escape":
            self.state.clear()
        else:
            return
        self._refresh_display()


def main() -> None:
    """Launch the calculator application."""
    try:
        root = tk.Tk()
    except tk.TclError as exc:
        message = (
            "Unable to initialize Tkinter. This application requires a display.\n"
            f"Details: {exc}"
        )
        # In headless environments, provide a clear error and exit gracefully.
        messagebox.showerror("Calculator", message)
        return

    app = CalculatorApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()
