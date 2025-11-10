import math
import pytest


@pytest.fixture
def positive_sequence() -> list[int]:
    return [1, 2, 3, 4]


@pytest.fixture
def mixed_sequence() -> list[int]:
    return [-5, 0, 7, -1, 3]


@pytest.fixture
def empty_sequence() -> list[int]:
    return []


@pytest.fixture(params=[float("nan"), math.nan])
def nan_value(request):
    return request.param
