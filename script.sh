# from junie-training/
set -euo pipefail

# --- Lab A: Java Spring Boot skeleton ---
mkdir -p labs/labA-java-rest/src/main/java/com/example/web \
         labs/labA-java-rest/src/test/java/com/example \
         labs/labA-java-rest/.junie

cat > labs/labA-java-rest/src/main/java/com/example/LabAApplication.java <<'EOF'
package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LabAApplication {
    public static void main(String[] args) {
        SpringApplication.run(LabAApplication.class, args);
    }
}
EOF

# placeholder so students see where controllers go
: > labs/labA-java-rest/src/main/java/com/example/web/.gitkeep

cat > labs/labA-java-rest/src/test/java/com/example/HelloControllerTest.java <<'EOF'
package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class HelloControllerTest {
    @Test
    void contextLoads() {
        // Baseline sanity check; Junie will replace with real tests in the lab
    }
}
EOF

# keep your existing Gradle + guidelines files; create if missing
[ -f labs/labA-java-rest/build.gradle.kts ] || cat > labs/labA-java-rest/build.gradle.kts <<'EOF'
plugins {
  id("org.springframework.boot") version "3.3.3"
  id("io.spring.dependency-management") version "1.1.6"
  java
}
group = "com.example"
version = "0.0.1-SNAPSHOT"
java { toolchain { languageVersion.set(JavaLanguageVersion.of(21)) } }
repositories { mavenCentral() }
dependencies {
  implementation("org.springframework.boot:spring-boot-starter-web")
  testImplementation("org.springframework.boot:spring-boot-starter-test")
  testRuntimeOnly("org.junit.platform:junit-platform-launcher")
  testImplementation("org.assertj:assertj-core:3.26.3")
}
tasks.test { useJUnitPlatform() }
EOF

[ -f labs/labA-java-rest/settings.gradle.kts ] || printf '%s\n' 'rootProject.name = "labA-java-rest"' > labs/labA-java-rest/settings.gradle.kts

cat > labs/labA-java-rest/.junie/guidelines.md <<'EOF'
# Guidelines (Java/Spring/JUnit/AssertJ)
- Java 21.
- Controllers in `com.example.web`; services in `com.example.service`.
- Return DTO **records**; compact constructors for validation/normalization.
- HTTP routes under `/api/*`; include negative/4xx tests.
- Tests: JUnit 5 + AssertJ (`assertThat`).
- Keep functions small and intention-revealing.
- Document non-trivial changes in `MIGRATION.md`.
EOF

# --- Lab B: Python refactor ---
mkdir -p labs/labB-python-refactor/src labs/labB-python-refactor/tests labs/labB-python-refactor/.junie

cat > labs/labB-python-refactor/src/math_tools.py <<'EOF'
def add(a,b):return a + b
def mul(a,b):  return a*b
class calc:
    def __init__(self): self.mem=0
    def add_to_mem(self,x): self.mem=self.mem+x
EOF

cat > labs/labB-python-refactor/tests/test_math_tools.py <<'EOF'
import pytest
from src.math_tools import add, mul, calc

def test_add_basic():
    # TODO: Junie will rewrite/add parameterized tests
    assert add(2, 3) == 5

def test_mul_basic():
    assert mul(4, 5) == 20

def test_calc_memory():
    c = calc()
    c.add_to_mem(10)
    assert c.mem == 10
EOF

cat > labs/labB-python-refactor/requirements.txt <<'EOF'
pytest>=8.0.0
EOF

cat > labs/labB-python-refactor/.junie/guidelines.md <<'EOF'
# Guidelines (Python)
- Strict PEP8; add type hints & docstrings.
- pytest with `@pytest.mark.parametrize` for combinatorics.
- Prefer dataclasses for simple state; avoid hidden side effects.
- Name tests by behavior (e.g., `test_add_returns_sum`).
EOF

# --- Lab C: Web/TypeScript minimal React + Jest ---
mkdir -p labs/labC-web-ts-forms/src/components labs/labC-web-ts-forms/tests labs/labC-web-ts-forms/.junie

cat > labs/labC-web-ts-forms/package.json <<'EOF'
{
  "name": "labc-web-ts-forms",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "jest -c ./jest.config.ts",
    "test:watch": "jest -c ./jest.config.ts --watch"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.8",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/jest": "^29.5.12",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "jest": "^29.7.0",
    "jsdom": "^24.1.0",
    "ts-jest": "^29.2.4",
    "typescript": "^5.5.4"
  }
}
EOF

cat > labs/labC-web-ts-forms/jest.config.ts <<'EOF'
import type {Config} from 'jest';
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
export default config;
EOF

cat > labs/labC-web-ts-forms/jest.setup.ts <<'EOF'
import '@testing-library/jest-dom';
EOF

cat > labs/labC-web-ts-forms/tsconfig.json <<'EOF'
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "ESNext",
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true
  },
  "include": ["src", "tests", "jest.setup.ts"]
}
EOF

cat > labs/labC-web-ts-forms/src/components/RegisterForm.tsx <<'EOF'
import React, { useState } from 'react';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('All fields are required'); return;
    }
    if (password !== confirmPassword) {
      setError('Passwords must match'); return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <form onSubmit={onSubmit} aria-label="register-form">
      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      <button type="submit">Register</button>
      {error && <div role="alert">{error}</div>}
      {submitted && <div role="status">Registered!</div>}
    </form>
  );
}
EOF

cat > labs/labC-web-ts-forms/tests/RegisterForm.test.tsx <<'EOF'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { RegisterForm } from '../src/components/RegisterForm';

test('shows error when fields are empty', async () => {
  render(<RegisterForm />);
  await userEvent.click(screen.getByRole('button', { name: /register/i }));
  expect(screen.getByRole('alert')).toHaveTextContent(/required/i);
});
EOF

cat > labs/labC-web-ts-forms/.junie/guidelines.md <<'EOF'
# Guidelines (Web/TypeScript)
- Use accessible selectors first: `getByRole`, `getByLabelText`, etc.
- Separate pure validation helpers; unit test them directly.
- Jest + Testing Library; avoid snapshots unless justified.
- Keep components small; prefer composition over branches.
EOF

# --- Demo: Playwright MCP ---
mkdir -p demo-playwright/tests/smoke demo-playwright/tests/regression

cat > demo-playwright/package.json <<'EOF'
{
  "name": "demo-playwright",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "playwright test"
  },
  "devDependencies": {
    "@playwright/test": "^1.47.2",
    "playwright": "^1.47.2"
  }
}
EOF

cat > demo-playwright/playwright.config.ts <<'EOF'
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'https://example.com',
    trace: 'on-first-retry'
  },
  reporter: [['list']]
});
EOF

# --- Central resources folders (placeholders if missing) ---
mkdir -p resources/prompts resources/cheat-sheets
: > resources/prompts/.gitkeep
: > resources/cheat-sheets/.gitkeep

echo "✅ Labs and demo scaffolds created/updated."