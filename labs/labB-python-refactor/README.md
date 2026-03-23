# Lab B: Python Refactoring with PyCharm and Junie

## Duration: 30-45 minutes

## Learning Objectives
- Refactor messy Python code to PEP 8 standards
- Add comprehensive type hints
- Write Google-style docstrings
- Create parametrized pytest test suites
- Achieve 100% test coverage
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

## Part 2: Analyze the Messy Code (5 minutes)

### Current State of math_tools.py:
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

### Task 1: Analyze with Ask Mode

In Ask mode, request:
```
Analyze math_tools.py and identify:
1. PEP 8 violations
2. Missing type hints
3. Poor naming conventions
4. Lack of documentation
5. Potential bugs
```

Expected issues identified:
- No type hints
- Poor variable/function names
- No docstrings
- Inconsistent spacing
- Class name not capitalized
- Division by zero handling

## Part 3: Refactor WITHOUT Guidelines (10 minutes)

### Task 2: Initial Refactoring

Switch to Code mode and request:
```
Refactor math_tools.py to:
1. Follow PEP 8 standards
2. Add type hints for all functions
3. Use descriptive names
4. Add error handling
5. Keep the same functionality
```

Review the changes and note the style choices made.

### Task 3: Add Basic Tests

Still in Code mode:
```
Create a pytest test file for math_tools.py with:
- Test all functions
- Test edge cases
- Test error conditions
```

Run tests: `pytest -v`

## Part 4: Create Guidelines and Re-refactor (10 minutes)

### Task 4: Generate Python Guidelines

Ask Junie to analyze the project and generate guidelines. In Ask mode:
```
Analyze this Python project and generate an AGENTS.md file with guidelines
covering: PEP 8 standards, type hints, docstring style, naming conventions,
error handling, and testing standards. Save it to .junie/AGENTS.md
```

> **Note:** The legacy path `.junie/guidelines.md` still works, but `AGENTS.md` is the current standard.

Review what Junie generates. It should cover areas like:
- Code standards (PEP 8, line length, Python version features)
- Type hints (typing module usage, complete annotations)
- Documentation (docstring style — Google, NumPy, or Sphinx)
- Naming conventions (snake_case, PascalCase, UPPER_SNAKE_CASE)
- Error handling (specific exceptions, no bare except)
- Testing standards (pytest, parametrize, coverage targets)

**Refine as needed.** For example, you might want to specify:
- Google-style docstrings (not NumPy or Sphinx)
- 88-character line length (Black formatter default)
- Parametrized tests with `@pytest.mark.parametrize`
- Minimum 95% coverage

### Task 5: Regenerate with Guidelines

Delete the previous refactoring and in Code mode:
```
Refactor math_tools.py following our project guidelines:
1. Apply PEP 8 and type hints
2. Add Google-style docstrings
3. Improve error handling
4. Make it production-ready
```

Compare with the previous version.

## Part 5: Comprehensive Testing (10 minutes)

### Task 6: Create Parametrized Tests

In Code mode:
```
Create comprehensive pytest tests for math_tools.py:
1. Use parametrize for multiple test cases
2. Test all edge cases
3. Test error conditions with pytest.raises
4. Group related tests in classes
5. Add fixtures for common test data
```

### Task 7: Add Coverage Configuration

Create `pytest.ini`:
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

### Task 8: Achieve 100% Coverage

Ask Junie:
```
Review the test coverage report and add any missing tests
to achieve 100% coverage. Show me which lines are not covered.
```

Run coverage: `pytest --cov=src --cov-report=term-missing`

## Part 6: Advanced Refactoring (10 minutes)

### Task 9: Extract Classes

In Code mode:
```
Refactor math_tools.py to use proper OOP:
1. Create a Calculator class for basic operations
2. Create a Statistics class for statistical functions
3. Use class methods and properties appropriately
4. Maintain backward compatibility
5. Update all tests
```

### Task 10: Add Validation Decorator

```
Create a validation decorator that:
1. Checks input types match type hints
2. Validates numeric inputs are not NaN
3. Logs all function calls
4. Can be applied to any function
Include tests for the decorator
```

## Part 7: Performance and Optimization (5 minutes)

### Task 11: Optimize Performance

Ask in Ask mode first:
```
Analyze the current implementation and suggest performance improvements
```

Then in Code mode:
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

**Issue**: Coverage not reaching 100%
**Solution**: Check for unreachable code or missing edge cases

## Challenge Extensions

1. Add async versions of all functions
2. Implement a CLI using Click or argparse
3. Add logging with proper configuration
4. Create a Flask API wrapper for the functions
5. Add performance benchmarks with pytest-benchmark

## Best Practices Demonstrated

✓ PEP 8 compliance is non-negotiable
✓ Type hints improve code clarity and IDE support
✓ Docstrings are essential documentation
✓ Parametrized tests reduce code duplication
✓ Coverage metrics drive test completeness

## Final Checklist

- [ ] All functions have type hints
- [ ] All functions have docstrings
- [ ] PEP 8 compliance (run `flake8`)
- [ ] 100% test coverage
- [ ] Tests are parametrized where applicable
- [ ] Error handling is comprehensive
- [ ] Code is organized into logical classes/modules