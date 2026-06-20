# Lab B: Python Refactoring with PyCharm and Junie

## Duration: ~25 minutes for the core exercise; the Extended Practice is self-paced/take-home

## Learning Objectives
- Use Plan mode before a broad refactor
- Drive Junie with one complete, well-scoped prompt (the professional pattern)
- Refactor messy Python to PEP 8 with complete type hints and docstrings
- Create parametrized pytest test suites
- Understand the impact of project guidelines (`.junie/AGENTS.md`)
- Experience Junie's capabilities in PyCharm

## Prerequisites
- PyCharm with Junie installed (or Junie CLI)
- Python 3.8+ installed
- pytest installed (`pip install pytest pytest-cov`)

## Part 1: Project Setup (5 minutes)

1. Open the `labB-python-refactor` project in PyCharm
2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
3. Open Junie: **AI Chat panel → Agent dropdown → Junie** (or `Ctrl/Cmd+Alt+J`)
4. Verify pytest works: `pytest`

> **Alternative — Junie CLI:** Run `junie` in the project directory.

### The code you'll be refactoring — `src/math_tools.py`
```python
def calc(x,y,op):
    if op=="add": return x+y
    elif op=="sub": return x-y
    elif op=="mul": return x*y
    elif op=="div":
        if y==0: return None
        return x/y
    else: return None

def findMax(lst):
    if not lst: return None
    max_val = lst[0]
    for i in range(1,len(lst)):
        if lst[i]>max_val:
            max_val=lst[i]
    return max_val

class stats:
    def avg(self,numbers):
        if not numbers: return 0
        total=0
        for n in numbers:
            total+=n
        return total/len(numbers)

    def median(self,nums):
        if not nums: return None
        sorted_nums=sorted(nums)
        n=len(sorted_nums)
        if n%2==0:
            return (sorted_nums[n//2-1]+sorted_nums[n//2])/2
        return sorted_nums[n//2]
```

## Part 2: The Core Exercise — Plan-First Full Prompt (15-20 minutes)

This is the main lab. It mirrors how a professional drives a coding agent: **one complete,
well-scoped prompt, reviewed before and after** — not a long sequence of tiny instructions.

1. Make sure `.junie/AGENTS.md` exists. If it does not, generate it first — see
   **"Generate project guidelines"** under Extended Practice, then come back here.
2. Start in Plan mode and paste:

```
Inspect src/math_tools.py and the existing tests. Create a plan first, then wait for approval before editing.

After approval, refactor the module so it is production-quality Python:
- Keep the public behavior compatible unless you identify a bug and explain it
- Apply PEP 8 naming and formatting
- Add complete type hints
- Add Google-style docstrings
- Replace ambiguous return values with explicit exceptions where appropriate
- Add or update pytest tests, using parametrize for repeated cases
- Run python -m pytest and fix failures

Follow .junie/AGENTS.md. Summarize changed files, test results, and any behavior changes.
```

3. **Review the plan before approving.** This is the teaching moment — approve only after
   the plan explains behavior compatibility and test coverage. Ask the room what they'd change.
4. After approval, **review the diff and the test output** before accepting the result.

### Optional: the guidelines contrast (5 minutes)

To show *why* guidelines matter, run a shorter refactor prompt **before** creating
`.junie/AGENTS.md`, then create the guidelines and re-run. Compare the two outputs for
docstring style, exception handling, and test structure. The full step-by-step version of
this comparison lives in Extended Practice below.

---

## Extended Practice (Take-Home / If Time Allows)

The tasks below break the same workflow into smaller steps. They are ideal for **self-paced
practice after the workshop**, or for filling time if your group moves quickly. You will
**not** complete all of these in a four-hour session — the Core Exercise above is the lab.

### Analyze the messy code with Ask Mode
```
Analyze math_tools.py and identify:
1. PEP 8 violations
2. Missing type hints
3. Poor naming conventions
4. Lack of documentation
5. Potential bugs
```
Expected issues: no type hints, poor names, no docstrings, inconsistent spacing, class name
not capitalized, division-by-zero handling.

### Refactor WITHOUT guidelines
Switch to Code mode:
```
Refactor math_tools.py to:
1. Follow PEP 8 standards
2. Add type hints for all functions
3. Use descriptive names
4. Add error handling
5. Keep the same functionality
```
Then add basic tests:
```
Create a pytest test file for math_tools.py with:
- Test all functions
- Test edge cases
- Test error conditions
```
Run tests: `pytest -v`

### Generate project guidelines
In Ask mode:
```
Analyze this Python project and generate an AGENTS.md file with guidelines
covering: PEP 8 standards, type hints, docstring style, naming conventions,
error handling, and testing standards. Save it to .junie/AGENTS.md
```
> **Note:** The legacy path `.junie/guidelines.md` still works, but `AGENTS.md` is the current standard.

**Refine as needed** — for example, you might specify Google-style docstrings, 88-character
line length (Black default), parametrized tests with `@pytest.mark.parametrize`, or a
minimum coverage target.

### Regenerate with guidelines and compare
Delete the previous refactoring and in Code mode:
```
Refactor math_tools.py following our project guidelines:
1. Apply PEP 8 and type hints
2. Add Google-style docstrings
3. Improve error handling
4. Make it production-ready
```
Compare with the previous version — this is the with/without-guidelines contrast in detail.

### Comprehensive testing
```
Create comprehensive pytest tests for math_tools.py:
1. Use parametrize for multiple test cases
2. Test all edge cases
3. Test error conditions with pytest.raises
4. Group related tests in classes
5. Add fixtures for common test data
```
Add coverage configuration in `pytest.ini`:
```ini
[tool:pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts =
    --verbose
    --cov=src
    --cov-report=term-missing
    --cov-report=html
    --cov-fail-under=95
```
Then close gaps:
```
Review the test coverage report and add any missing tests
to achieve full coverage. Show me which lines are not covered.
```
Run coverage: `pytest --cov=src --cov-report=term-missing`

### Advanced refactoring
```
Refactor math_tools.py to use proper OOP:
1. Create a Calculator class for basic operations
2. Create a Statistics class for statistical functions
3. Use class methods and properties appropriately
4. Maintain backward compatibility
5. Update all tests
```
And a validation decorator:
```
Create a validation decorator that:
1. Checks input types match type hints
2. Validates numeric inputs are not NaN
3. Logs all function calls
4. Can be applied to any function
Include tests for the decorator
```

### Performance and optimization
Ask mode first: `Analyze the current implementation and suggest performance improvements`
Then Code mode:
```
Optimize the statistics calculations:
1. Use NumPy where appropriate
2. Add caching for expensive operations
3. Implement lazy evaluation
4. Maintain the same API
```

## Reflection Questions

1. How did PyCharm's Junie experience compare to what you'd expect in IntelliJ?
2. What Python-specific patterns did Junie apply?
3. How did guidelines affect the testing approach?
4. Which PEP 8 rules were most impactful?

## Common Issues and Solutions

**Issue**: Import errors in tests
**Solution**: Ensure proper PYTHONPATH or use `python -m pytest`

**Issue**: Type hints not recognized
**Solution**: Install `pip install typing-extensions` for older Python

**Issue**: Coverage not reaching the target
**Solution**: Check for unreachable code or missing edge cases

## Challenge Extensions

1. Add async versions of all functions
2. Implement a CLI using Click or argparse
3. Add logging with proper configuration
4. Create a Flask API wrapper for the functions
5. Add performance benchmarks with pytest-benchmark

## Best Practices Demonstrated

✓ One complete, plan-first prompt beats a long sequence of tiny instructions
✓ PEP 8 compliance and type hints improve clarity and IDE support
✓ Docstrings are essential documentation
✓ Parametrized tests reduce code duplication
✓ Coverage metrics drive test completeness

## Final Checklist

- [ ] All functions have type hints
- [ ] All functions have docstrings
- [ ] PEP 8 compliance (run `flake8`)
- [ ] Strong test coverage
- [ ] Tests are parametrized where applicable
- [ ] Error handling is comprehensive
- [ ] Code is organized into logical classes/modules
