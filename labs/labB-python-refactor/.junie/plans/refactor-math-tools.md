---
sessionId: session-261023-103220-1dmt
---

# Requirements

### Scope
Refactor the actual `src/math_tools.py` (`add`, `mul`, and `calc`), following `.junie/AGENTS.md`. The README’s division/statistics example is not the current implementation and is out of scope.

- Apply PEP 8 formatting, complete type annotations, and Google-style module, class, and callable documentation.
- Preserve existing imports, positional/keyword arguments, arithmetic results, mutable `mem`, zero initialization, and independent instance state.
- Expand behavior-named, parametrized pytest coverage.
- After approval, run the full suite and report changed files, test results, and behavior changes.

### Compatibility and errors
No ambiguous error return exists in the current module. Preserve `add_to_mem(...) -> None`: it is a successful state-changing operation. Preserve native arithmetic exceptions such as `TypeError`; do not introduce numeric coercion, restrictive runtime validation, or new exceptions without a demonstrated bug.

No project files have been edited and no tests have been run during planning.

# Technical Design

### Module changes
In `src/math_tools.py`:
- Retain function names and parameter names (`add(a, b)`, `mul(a, b)`, `add_to_mem(self, x)`) to preserve keyword calls.
- Introduce the PEP 8 class name `Calc`, with `calc = Calc` as a documented legacy alias. Both names construct the same class; the displayed class name changes to `Calc` for introspection and default representations.
- Keep an explicit, annotated no-argument `__init__`, initializing `self.mem` to integer zero. Retain an ordinary class rather than dataclass-generated construction, equality, or representation behavior to minimize compatibility changes.
- Use a Python-3.8-compatible `Number = Union[int, float, complex]` annotation for the intended numeric API: `add(a: Number, b: Number) -> Number`, `mul(a: Number, b: Number) -> Number`, `mem: Number`, and `add_to_mem(self, x: Number) -> None`. Annotations do not add runtime restrictions; existing operator behavior remains intact.
- Preserve the original `self.mem = self.mem + x` operation rather than changing it to in-place addition, which can behave differently for externally assigned mutable objects.
- Document arguments, returns, memory mutation, and relevant native exceptions using Google-style sections. Do not add dependencies, logging, or unrelated abstractions.

### Test configuration
Correct `pytest.ini` from `[tool:pytest]` to `[pytest]`, preserving `pythonpath = .` and `testpaths = tests`. This fixes configuration recognition, not mathematical behavior.

### Affected files
Only `src/math_tools.py`, `tests/test_math_tools.py`, and `pytest.ini` are planned to change. Leave `README.md`, `requirements.txt`, and `.junie/AGENTS.md` unchanged.

# Testing

### Automated coverage
Expand `tests/test_math_tools.py` using `@pytest.mark.parametrize` and names describing observable behavior:
- Addition and multiplication: positive/negative integers, zero, floats, mixed numeric operands, complex numbers, and large integers; use `pytest.approx` for floating-point expectations where appropriate.
- Compatibility: existing keyword calls and representative native operator behavior such as string concatenation and sequence repetition remain unchanged.
- Calculator: initial memory, repeated accumulation, negative/fractional updates, independent instances, direct `mem` assignment, and `None` return from successful updates.
- Both `Calc` and legacy `calc` work; the alias refers to the same class.
- Incompatible operands raise native `TypeError`; failed memory updates leave memory unchanged.

### Validation after approval
Read the configured PyCharm Python environment before each Python toolchain invocation, then run its executable with `-m pytest` from the project root. Fix any failures within the agreed scope and rerun. Use IDE build/inspection validation for edited files, checking type annotations, docstrings, and PEP 8 formatting. Report actual pass/fail counts and any remaining limitations; no coverage dependency or arbitrary coverage threshold will be added.

# Delivery Steps

### * Step 1: Refactor arithmetic functions and establish parametrized coverage
`add` and `mul` are documented and typed, with their behavior protected by expanded tests and recognized pytest configuration.
- Update `src/math_tools.py` with module documentation, the numeric type alias, PEP 8 formatting, and Google-style function docstrings.
- Preserve argument names and direct operator semantics without coercion or runtime restrictions.
- Replace the arithmetic smoke tests in `tests/test_math_tools.py` with behavior-named parametrized numeric, compatibility, and exception cases.
- Correct the section header in `pytest.ini` and validate the arithmetic cases with the configured interpreter.

###   Step 2: Modernize the calculator API while preserving legacy calls
`Calc` provides the documented, typed memory API, and existing `calc` callers continue to work.
- Rename the class in `src/math_tools.py`, retain the `calc` compatibility alias, and annotate/document initialization, `mem`, and `add_to_mem`.
- Preserve no-argument construction, identity-based equality, assignment-based accumulation, and the mutator’s `None` return.
- Expand `tests/test_math_tools.py` for both names, memory accumulation, instance isolation, direct memory assignment, and failed-update behavior.
- Perform IDE validation and run the configured Python executable with `-m pytest`; fix scoped failures and rerun.
- Summarize the three changed files, actual test results, the class-name introspection change, and the pytest configuration fix.