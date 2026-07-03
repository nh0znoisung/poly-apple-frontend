#!/usr/bin/env python3
"""Summarise Trivy JSON reports into GitHub-flavoured Markdown.

Usage: python3 scripts/trivy-report.py <dir-with-trivy-*.json>

Reads every trivy-*.json in the given directory and prints a Markdown summary
(counts + tables) to stdout. Designed to be appended to $GITHUB_STEP_SUMMARY.
Never fails the build itself — the CI "Gate on findings" step owns pass/fail.
"""
import glob
import json
import os
import sys


def load_results(path):
    try:
        with open(path, encoding="utf-8") as fh:
            data = json.load(fh)
    except (OSError, ValueError):
        return []
    return data.get("Results") or []


def collect(results):
    vulns, secrets, misconfigs = [], [], []
    for res in results:
        target = res.get("Target", "?")
        for v in res.get("Vulnerabilities") or []:
            vulns.append((
                target,
                v.get("PkgName", "?"),
                v.get("VulnerabilityID", "?"),
                v.get("Severity", "?"),
                v.get("InstalledVersion", "?"),
                v.get("FixedVersion", "-"),
            ))
        for s in res.get("Secrets") or []:
            secrets.append((target, s.get("RuleID", "?"), s.get("Severity", "?"),
                            str(s.get("StartLine", "?"))))
        for m in res.get("Misconfigurations") or []:
            misconfigs.append((target, m.get("ID", "?"), m.get("Severity", "?"),
                               m.get("Title", "")))
    return vulns, secrets, misconfigs


def main():
    report_dir = sys.argv[1] if len(sys.argv) > 1 else "build/security"
    files = sorted(glob.glob(os.path.join(report_dir, "trivy-*.json")))

    out = ["## 🛡️ Security scan (Trivy)"]
    if not files:
        out.append("_No Trivy report files found in `%s`._" % report_dir)
        print("\n".join(out))
        return

    all_vulns, all_secrets, all_misconfigs = [], [], []
    for path in files:
        v, s, m = collect(load_results(path))
        all_vulns += v
        all_secrets += s
        all_misconfigs += m

    total = len(all_vulns) + len(all_secrets) + len(all_misconfigs)
    out.append("**Findings:** %d vulnerabilities, %d secrets, %d misconfigurations."
               % (len(all_vulns), len(all_secrets), len(all_misconfigs)))

    if total == 0:
        out.append("\n✅ No HIGH/CRITICAL findings.")
        print("\n".join(out))
        return

    if all_vulns:
        out.append("\n### Dependency vulnerabilities")
        out.append("| Target | Package | CVE | Severity | Installed | Fixed |")
        out.append("|---|---|---|---|---|---|")
        for t, pkg, cve, sev, inst, fixed in all_vulns:
            out.append("| %s | %s | %s | %s | %s | %s |" % (t, pkg, cve, sev, inst, fixed))

    if all_secrets:
        out.append("\n### Secrets")
        out.append("| Target | Rule | Severity | Line |")
        out.append("|---|---|---|---|")
        for t, rule, sev, line in all_secrets:
            out.append("| %s | %s | %s | %s |" % (t, rule, sev, line))

    if all_misconfigs:
        out.append("\n### Misconfigurations")
        out.append("| Target | ID | Severity | Title |")
        out.append("|---|---|---|---|")
        for t, mid, sev, title in all_misconfigs:
            out.append("| %s | %s | %s | %s |" % (t, mid, sev, title))

    print("\n".join(out))


if __name__ == "__main__":
    main()
