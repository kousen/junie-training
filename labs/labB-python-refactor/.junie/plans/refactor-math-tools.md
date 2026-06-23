---
sessionId: session-260623-102951-13bc
---

# Requirements

### Overview & Goals
Refactor `src/math_tools.py` into production-quality Python while preserving public behavior where reasonable, documenting any intentional behavior changes, and restoring a pytest suite because the prior test file has been deleted.

### Scope
#### In Scope
- Refactor the existing math utilities in `src/math_tools.py`:
  - `calc(x, y, op)` for arithmetic operations.
  - `findMax(lst)` for maximum lookup.
  - `stats.avg(numbers)` and `stats.median(nums)` for statistics.
- Apply project guidelines from `.junie/AGENTS.md`:
  - Strict PEP 8 naming and formatting.
  - Complete type hints and Google-style docstrings.
  - Explicit exceptions instead of ambiguous `None` return values where appropriate.
  - Pytest tests using `@pytest.mark.parametrize` for repeated cases.
  - Behavior-focused test names.
- Add a new pytest file under `tests/` for the refactored module.
- Run `python -m pytest` and fix failures.

#### Out of Scope
- Adding third-party dependencies beyond existing `pytest>=8.0.0` in `requirements.txt`.
- Adding CLI, async APIs, NumPy optimization, coverage configuration, or new modules not needed for this refactor.

### Expected Behavior Compatibility
- Preserve arithmetic results for valid `calc` operations: `add`, `sub`, `mul`, `div`.
- Preserve maximum, average, and median results for non-empty numeric sequences.
- Keep backward-compatible entry points where practical, especially because README examples reference the current names.
- Treat ambiguous `None`/sentinel behavior as bugs where it hides errors:
  - Division by zero should raise an explicit exception instead of returning `None`.
  - Unsupported operations should raise an explicit exception instead of returning `None`.
  - Maximum/median on empty input should raise an explicit exception instead of returning `None`.
- Review `stats.avg([]) == 0`: this is mathematically ambiguous but is current public behavior. The implementation should either preserve it for compatibility or document a behavior change if converted to an exception.

# Technical Design

### Current Implementation
The project is a small Python package with:
- `src/math_tools.py`: the only production module.
- `tests/__init__.py`: no current test module; the previous test file has been deleted.
- `pytest.ini`: sets `pythonpath = .` and `testpaths = tests`.
- `.junie/AGENTS.md`: requires strict PEP 8, type hints, docstrings, parametrized pytest tests, dataclasses for simple state where applicable, and behavior-based test names.

`src/math_tools.py` currently has these issues:
- `calc(x,y,op)` uses untyped parameters, one-line branches, and ambiguous `None` returns for division by zero and unknown operations.
- `findMax(lst)` violates PEP 8 naming and returns `None` for empty input.
- `class stats` violates PEP 8 class naming and contains untyped `avg` and `median` methods.
- `stats.avg([])` returns `0`, while `stats.median([])` returns `None`.

### Key Decisions
- **Preserve API compatibility with aliases/wrappers where naming changes are needed.**
  - Add PEP 8 names such as `calculate`, `find_max`, and `Stats`.
  - Keep existing public names `calc`, `findMax`, and `stats` as compatibility wrappers/aliases unless implementation constraints make this undesirable.
- **Use explicit built-in exceptions for invalid input.**
  - `ZeroDivisionError` for division by zero.
  - `ValueError` for unsupported operations and empty sequences where no result exists.
- **Use simple, dependency-free implementation.**
  - No dataclass is needed because there is no state to store; this also avoids hidden side effects.
- **Use Python standard typing compatible with the project’s lightweight setup.**
  - Type numeric inputs with practical aliases such as `int | float` if the project targets Python 3.10+, or `typing.Union` if Python 3.8 compatibility from README should be prioritized.

### Proposed Changes
In `src/math_tools.py`:
- Introduce clear names and type hints:
  - `Number = int | float` or equivalent.
  - `def calculate(x: Number, y: Number, operation: str) -> Number: ...`
  - `def find_max(values: Sequence[Number]) -> Number: ...`
  - `class Stats:` with `average` and `median` methods.
- Add Google-style docstrings for each public function/class/method, including Args, Returns, and Raises.
- Replace manual loops with clear built-ins where appropriate:
  - `max(values)` for maximum after validating non-empty input.
  - `sum(numbers) / len(numbers)` for averages.
  - `sorted(values)` for median.
- Keep compatibility wrappers:
  - `calc(...)` delegates to `calculate(...)`.
  - `findMax(...)` delegates to `find_max(...)` and may include a docstring noting the preferred PEP 8 name.
  - `stats = Stats` or a small subclass/alias to avoid breaking imports that instantiate `stats()`.

### File Structure
- Modify: `src/math_tools.py`
- Add: `tests/test_math_tools.py`

### Risks
- Converting ambiguous `None` returns to exceptions is an intentional behavior change; tests and final summary must call this out clearly.
- Renaming `findMax` and `stats` without compatibility aliases would break existing callers, so the implementation should keep legacy entry points while encouraging PEP 8 names.
- If Python 3.8 compatibility is required, PEP 604 union syntax (`int | float`) should be avoided in favor of `typing.Union`.

# Testing

### Validation Approach
Create a new `tests/test_math_tools.py` and validate all public behavior through pytest. Use parametrization for repeated arithmetic, maximum, average, and median cases.

### Key Scenarios
- `calculate`/`calc` returns correct results for add, sub, mul, and div.
- `find_max`/`findMax` returns the largest value for positive, negative, mixed, and single-item sequences.
- `Stats.average` and legacy `stats().avg` return expected averages.
- `Stats.median` and legacy `stats().median` return expected medians for odd and even sequence lengths.
- Legacy entry points still delegate to the refactored PEP 8 APIs.

### Edge Cases
- Division by zero raises `ZeroDivisionError`.
- Unsupported operation raises `ValueError`.
- Empty maximum input raises `ValueError`.
- Empty median input raises `ValueError`.
- Empty average behavior is validated according to the chosen compatibility decision, with any behavior change documented.

### Test Changes
- Add `tests/test_math_tools.py`.
- Use `@pytest.mark.parametrize` for combinatoric/repeated cases.
- Name tests by behavior, for example:
  - `test_calculate_returns_expected_result`
  - `test_calculate_raises_for_division_by_zero`
  - `test_find_max_returns_largest_value`
  - `test_median_returns_middle_value`
- Run `python -m pytest` after implementation.

# Delivery Steps

### ✓ Step 1: Refactor arithmetic API and error handling
`src/math_tools.py` exposes a typed, documented arithmetic function with explicit failures.

- Add a PEP 8 `calculate` function with complete type hints and a Google-style docstring.
- Implement valid operations `add`, `sub`, `mul`, and `div` with the same successful results as the current `calc` function.
- Replace `None` for division by zero with `ZeroDivisionError`.
- Replace `None` for unsupported operations with `ValueError`.
- Keep `calc` as a compatibility wrapper that delegates to `calculate`.

### ✓ Step 2: Refactor maximum and statistics utilities
Maximum and statistics utilities have PEP 8 names, type hints, docstrings, and compatibility entry points.

- Add `find_max` with typed sequence input, Google-style docstring, and explicit `ValueError` for empty input.
- Keep `findMax` as a compatibility wrapper around `find_max`.
- Add a PEP 8 `Stats` class with typed, documented `average` and `median` methods.
- Preserve compatible legacy usage through `avg`, `median`, and `stats` where practical.
- Replace ambiguous empty median behavior with `ValueError`; handle empty average according to the compatibility decision and document it.

### ✓ Step 3: Restore pytest coverage for public behavior
A new pytest suite validates both refactored APIs and legacy compatibility wrappers.

- Create `tests/test_math_tools.py` with behavior-focused test names.
- Add parametrized tests for arithmetic operations, maximum values, averages, and medians.
- Add exception tests using `pytest.raises` for invalid operations, division by zero, and empty inputs.
- Include tests proving legacy names such as `calc`, `findMax`, and `stats` continue to work where retained.

### ✓ Step 4: Run validation and document outcomes
The refactor is validated with pytest and the final summary clearly reports behavior changes.

- Run `python -m pytest` from the project root.
- Fix any failures while keeping implementation aligned with `.junie/AGENTS.md`.
- Summarize changed files, test results, and intentional behavior changes such as replacing ambiguous `None` returns with exceptions.

### ✓ Step 5: Apply approved production cleanup
The refactored module incorporates the approved API clarity and compatibility improvements.

- Broaden numeric collection annotations to `Sequence[Number]` where supported by the implementation.
- Resolve the README Python version mismatch by avoiding PEP 604 syntax in runtime code.
- Add a module docstring and explicit `__all__` for the public API.
- Preserve legacy `stats` introspection with a compatibility subclass.

### ✓ Step 6: Improve test coverage and cleanup
The test suite covers the approved compatibility and cleanup scenarios without unnecessary duplication.

- Reuse shared arithmetic cases for new and legacy arithmetic tests.
- Use `pytest.approx` for float-producing results.
- Add tuple-input tests for sequence annotations.
- Add compatibility exception tests for legacy wrappers.
- Rename the legacy `findMax` test to a PEP 8 compliant test name.

### ✓ Step 7: Run validation and summarize cleanup
The follow-up cleanup is validated and documented.

- Run the project pytest suite from the project root.
- Fix any failures while preserving the approved compatibility behavior.
- Summarize changed files, test results, and cleanup decisions.

### ✓ Step 8: Remove legacy APIs and simplify behavior
The module exposes only the clean production API requested by the user.

- Remove legacy names `calc`, `findMax`, `Stats.avg`, and `stats`.
- Update the module docstring and `__all__` to describe only the clean API.
- Change empty average input to raise `ValueError` for consistency.
- Update tests to cover only `calculate`, `find_max`, `Stats.average`, and `Stats.median`.

### ✓ Step 9: Validate final cleanup
The simplified API is verified and documented.

- Run the project pytest suite from the project root.
- Fix any failures while preserving the simplified production behavior.
- Summarize changed files, test results, and intentional behavior changes.

### ✓ Step 10: Design GUI calculator integration
The project has a small interactive calculator UI plan that builds on the clean math API.

- Choose a standard-library GUI approach to avoid new dependencies.
- Decide which existing functions the GUI should expose.
- Identify files to add or update for an interactive calculator.

### ✓ Step 11: Implement interactive calculator GUI
The user can interact with arithmetic and statistics operations through a GUI.

- Add a GUI module that imports and uses `calculate`, `find_max`, and `Stats`.
- Provide input fields, operation controls, results, and readable validation errors.
- Keep implementation typed, documented, and PEP 8 compliant.

### ✓ Step 12: Validate GUI support and tests
The GUI integration is covered where practical and the existing suite remains green.

- Add tests for GUI parsing or supporting logic where it can be tested without launching a window.
- Run the project pytest suite from the project root.
- Summarize changed files, test results, and how to run the GUI.

### ✓ Step 13: Improve calculator GUI interface
The calculator UI is more polished and easier to use while still using the clean math API.

- Review the current GUI implementation and tests.
- Improve layout, controls, labels, and feedback without adding third-party dependencies.
- Keep parsing and formatting helpers testable without launching a window.
- Run the project pytest suite from the project root.

### ✓ Step 14: Add colorful calculator-style keypad
The calculator GUI looks and behaves more like a calculator.

- Increase font sizes for readability.
- Add a more colorful visual theme.
- Add an interactive number pad for arithmetic entry.
- Keep statistics input and helper logic testable without launching a window.
- Run the project pytest suite from the project root.

### ✓ Step 15: Improve GUI color contrast
The calculator keeps the keypad layout while using a more readable visual theme.

- Replace low-contrast colors with accessible light panels and dark text.
- Keep important interactive controls visually distinct without sacrificing readability.
- Run the project pytest suite from the project root.