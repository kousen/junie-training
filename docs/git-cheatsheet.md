# Git Cheat Sheet (Course Ops)

Fast commands for common workshop tasks. Examples assume `origin` is GitHub.

## Cherry-Pick A Commit To Main

```bash
# 1) Ensure main is current
git checkout main
git pull --ff-only origin main

# 2) Cherry-pick specific commit
git cherry-pick <commit-sha>

# 3) Push to main
git push origin main
```

## Tag A Snapshot (Annotated)

```bash
# Tag the current commit
git tag -a course-YYYY-MM -m "Course run: YYYY-MM"

# Or tag a specific commit
git tag -a course-YYYY-MM <commit-sha> -m "Course run: YYYY-MM"

# Push the tag
git push origin course-YYYY-MM
```

## Keep A Feature Branch, But Mark It

```bash
# Create a tag at branch head (preserve state)
git rev-parse <branch>
# Use the sha from above
git tag -a course-YYYY-MM <sha> -m "Course run: YYYY-MM"
git push origin course-YYYY-MM
```

## Safe Branch Cleanup

```bash
# Delete a remote branch
git push origin --delete <branch>

# Delete local branch
git branch -D <branch>
```

## List, Inspect, And Undo

```bash
# Show recent commits (one-line)
git log --oneline --decorate --graph -n 20

# Show a commit diff
git show <commit-sha>

# Revert a commit by creating an inverse commit
git revert <commit-sha>
```

## Selectively Stage & Commit

```bash
# Stage specific files
git add path/to/fileA path/to/fileB

# Commit with a clear message
git commit -m "Describe WHAT and WHY"

# Push current branch
git push origin HEAD
```

## PRs From CLI (GitHub)

```bash
# Requires GitHub CLI: https://cli.github.com
# Create a PR from current branch to main
gh pr create --base main --head $(git rev-parse --abbrev-ref HEAD) --fill

# View PR status
gh pr status
```

Tips
- Use annotated tags (`-a`) with a helpful message for future you.
- Prefer `--ff-only` pulls on main during workshops to avoid accidental merges.
- When in doubt, create a tag before destructive actions.

