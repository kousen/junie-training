"""Convenience entry point to launch the calculator GUI.

Usage:
    python -m src

This simply forwards to src.calculator_ui.main().
"""
from .calculator_ui import main


if __name__ == "__main__":
    main()
