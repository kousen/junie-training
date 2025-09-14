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
- PyCharm with Junie installed
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
3. Open Junie panel: View → Tool Windows → Junie
4. Verify pytest works: `pytest`

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

### Task 4: Create Python Guidelines

Create `.junie/guidelines.md`:

```markdown
# Python Project Guidelines

## Code Standards
- Follow PEP 8 strictly
- Maximum line length: 88 characters (Black formatter)
- Use Python 3.8+ features

## Type Hints
- All functions must have complete type hints
- Use typing module for complex types
- Example:
```python
from typing import List, Optional, Union

def calculate(
    values: List[float],
    operation: str
) -> Optional[float]:
    ...
```

## Documentation
- Google-style docstrings for all public functions
- Include Args, Returns, Raises sections
- Example:
```python
def process_data(data: List[int]) -> float:
    """Process numerical data and return average.
    
    Args:
        data: List of integers to process.
        
    Returns:
        The average of the input values.
        
    Raises:
        ValueError: If data is empty.
    """
```

## Naming Conventions
- Functions: snake_case, verb_noun pattern
- Classes: PascalCase
- Constants: UPPER_SNAKE_CASE
- Private methods: prefix with underscore

## Error Handling
- Use specific exceptions
- Never use bare except
- Document all exceptions in docstrings
- Validate inputs early

## Testing Standards
- Use pytest exclusively
- Parametrize tests for multiple cases
- Test file naming: test_*.py
- Test function naming: test_<function>_<scenario>
- Minimum 95% coverage

## Test Patterns
```python
import pytest
from typing import Any

@pytest.mark.parametrize(
    "input_value,expected",
    [
        (5, 25),
        (0, 0),
        (-3, 9),
    ]
)
def test_square_various_inputs(
    input_value: int,
    expected: int
) -> None:
    """Test square function with various inputs."""
    assert square(input_value) == expected

def test_divide_by_zero_raises() -> None:
    """Test that division by zero raises ValueError."""
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(10, 0)
```

## Code Organization
- One class per file for major classes
- Group related functions in modules
- Use __init__.py for package exports
```

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
- PyCharm with Junie installed
- Python 3.8+ installed
- pytest installed (`pip install pytest pytest-cov`)

> Tip: To start the calculator GUI once the environment is set up, see the section "Starting the Calculator GUI" at the end of this document.

## Part 1: Project Setup (5 minutes)

1. Open the `labB-python-refactor` project in PyCharm
2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```
3. Open Junie panel: View → Tool Windows → Junie
4. Verify pytest works: `pytest`

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

### Task 4: Create Python Guidelines

Create `.junie/guidelines.md`:

```markdown
# Python Project Guidelines

## Code Standards
- Follow PEP 8 strictly
- Maximum line length: 88 characters (Black formatter)
- Use Python 3.8+ features

## Type Hints
- All functions must have complete type hints
- Use typing module for complex types
- Example:
```python
from typing import List, Optional, Union

def calculate(
    values: List[float],
    operation: str
) -> Optional[float]:
    ...
```

## Documentation
- Google-style docstrings for all public functions
- Include Args, Returns, Raises sections
- Example:
```python
def process_data(data: List[int]) -> float:
    """Process numerical data and return average.
    
    Args:
        data: List of integers to process.
        
    Returns:
        The average of the input values.
        
    Raises:
        ValueError: If data is empty.
    """
```

## Naming Conventions
- Functions: snake_case, verb_noun pattern
- Classes: PascalCase
- Constants: UPPER_SNAKE_CASE
- Private methods: prefix with underscore

## Error Handling
- Use specific exceptions
- Never use bare except
- Document all exceptions in docstrings
- Validate inputs early

## Testing Standards
- Use pytest exclusively
- Parametrize tests for multiple cases
- Test file naming: test_*.py
- Test function naming: test_<function>_<scenario>
- Minimum 95% coverage

## Test Patterns
```python
import pytest
from typing import Any

@pytest.mark.parametrize(
    "input_value,expected",
    [
        (5, 25),
        (0, 0),
        (-3, 9),
    ]
)
def test_square_various_inputs(
    input_value: int,
    expected: int
) -> None:
    """Test square function with various inputs."""
    assert square(input_value) == expected


def test_divide_by_zero_raises() -> None:
    """Test that division by zero raises ValueError."""
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(10, 0)
```

## Code Organization
- One class per file for major classes
- Group related functions in modules
- Use __init__.py for package exports

## Part 5: Re-refactor WITH Guidelines (10 minutes)

### Task 5: Apply Guidelines

Ask Junie to refactor `math_tools.py` again using the new guidelines. Ensure:
- Consistent type hints
- Docstrings follow the examples
- Proper naming conventions
- Edge cases handled cleanly

### Task 6: Expand Tests

Ask Junie to expand tests:
- Parametrize more cases
- Add negative tests
- Achieve higher coverage

Run tests again: `pytest -v --maxfail=1`

---

## Starting the Calculator GUI

Once dependencies are installed and the virtual environment is activated, you can launch the calculator UI in any of the following ways from the project root:

- Preferred (new):
  ```bash
  python -m src
  ```
- Explicit module:
  ```bash
  python -m src.calculator_ui
  ```
- Direct script path:
  ```bash
  python src/calculator_ui.py
  ```

Notes:
- On macOS/Linux you may need to allow the app to access the display. If you are in a headless environment (like CI or an SSH session without X forwarding), Tkinter cannot create a window and the app will show an error dialog.
- Close the window or press Esc to clear; keyboard digits and operators work as shortcuts.
- The Loan… button opens a dialog for mortgage/loan payment and totals.

## Running from PyCharm (Run/Debug)

You can run the calculator GUI and tests entirely inside PyCharm. Here are quick, reliable setups:

- Use the gutter Run icon
  - Open src/__main__.py and click the green Run icon next to `if __name__ == "__main__":`.
  - Or open src/calculator_ui.py and use the Run icon there.
  - PyCharm will create a temporary run configuration automatically.

- Create a persistent Python Run configuration (GUI)
  - Run → Edit Configurations… → + → Python
  - Name: Calculator (GUI)
  - Interpreter: select your project venv
  - Choose one launch method:
    - Module name: `src` (runs src/__main__.py)
      - Working directory: project root (folder that contains `src/`)
    - OR Script path: `…/src/calculator_ui.py`
      - Working directory: project root
  - Apply → Run

- Run tests with pytest in PyCharm
  - Run → Edit Configurations… → + → pytest
  - Target: Path → `tests`
  - Working directory: project root
  - Optional additional args: `--maxfail=1 -q`

- Troubleshooting in PyCharm
  - If imports fail, set the Working directory to the project root and mark `src` as a Sources Root (Right‑click `src` → Mark Directory as → Sources Root).
  - If the wrong interpreter is used, pick your venv in the run configuration (and in the status bar: Python Interpreter).
  - If the GUI fails to launch with a display error, ensure you’re not in a headless session; Tk needs a display on macOS/Linux.
