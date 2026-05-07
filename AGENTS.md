# Repository Branch Policy for AI Agents

This repository uses branch names to signal project maturity. Follow this policy
before moving, committing, or pushing files.

## Branches

- `master`: only for work the user explicitly says is complete, production-ready,
  or functionally finished.
- `wip-initial-infrastructure`: the existing work-in-progress branch. Use this
  branch for unfinished infrastructure, experiments, scaffolding, partial
  features, and anything the user describes as not complete yet.

## User Intent Mapping

- If the user says the work is complete, finished, ready, done, or says in
  Chinese that it is "已完成", put it on `master`.
- If the user says the work is unfinished, in progress, rough, temporary, WIP, or
  says in Chinese that it is "未完成", put it on `wip-initial-infrastructure`.
- If the user asks to move unfinished files out of `master`, move them to
  `wip-initial-infrastructure` and leave `master` without unfinished project
  files.

## Important Rules

- Do not create a new WIP branch unless the user explicitly asks for a new branch.
- Reuse `wip-initial-infrastructure` for unfinished work.
- Before moving files between branches, check `git status --short --branch` and
  preserve any user changes.
- When pushing both branches, push the WIP branch first. Only push `master` after
  the unfinished work is safely present on the WIP branch.
- Do not force-push or rewrite history unless the user explicitly asks for it.
