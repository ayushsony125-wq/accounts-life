$src1 = "D:/My Accounts/accounts-life"
$src2 = "D:/My Accounts/accounts.life 2"

$excludeDirs = @(".git", "node_modules", ".next", "dist", ".vercel", ".turbo", ".gemini", "scratch")

function Get-FilesRecursive($rootPath) {
    $files = Get-ChildItem -Path $rootPath -Recurse -File -Force
    $relativeFiles = @{}
    foreach ($f in $files) {
        # Check if file is in excluded directory
        $relativePath = $f.FullName.Substring($rootPath.Length + 1).Replace('\', '/')
        $exclude = $false
        foreach ($d in $excludeDirs) {
            if ($relativePath -eq $d -or $relativePath.StartsWith($d + "/")) {
                $exclude = $true
                break
            }
        }
        if (-not $exclude) {
            $relativeFiles[$relativePath] = $f.FullName
        }
    }
    return $relativeFiles
}

Write-Host "Scanning $src1 ..."
$files1 = Get-FilesRecursive $src1
Write-Host "Found $($files1.Count) source files in accounts-life."

Write-Host "Scanning $src2 ..."
$files2 = Get-FilesRecursive $src2
Write-Host "Found $($files2.Count) source files in accounts.life 2."

$onlyIn1 = @()
$onlyIn2 = @()
$different = @()
$identical = 0

foreach ($relPath in $files1.Keys) {
    if ($files2.ContainsKey($relPath)) {
        # Compare hashes
        $hash1 = Get-FileHash -Path $files1[$relPath] -Algorithm MD5
        $hash2 = Get-FileHash -Path $files2[$relPath] -Algorithm MD5
        if ($hash1.Hash -ne $hash2.Hash) {
            $different += $relPath
        } else {
            $identical++
        }
    } else {
        $onlyIn1 += $relPath
    }
}

foreach ($relPath in $files2.Keys) {
    if (-not $files1.ContainsKey($relPath)) {
        $onlyIn2 += $relPath
    }
}

Write-Host "`n--- COMPARISON RESULTS ---"
Write-Host "Identical files: $identical"
Write-Host "Different files: $($different.Count)"
Write-Host "Only in accounts-life: $($onlyIn1.Count)"
Write-Host "Only in accounts.life 2: $($onlyIn2.Count)"

if ($different.Count -gt 0) {
    Write-Host "`nDifferent files:"
    foreach ($f in $different) {
        Write-Host "  - $f"
    }
}

if ($onlyIn2.Count -gt 0) {
    Write-Host "`nFiles present ONLY in accounts.life 2:"
    foreach ($f in $onlyIn2) {
        Write-Host "  - $f"
    }
}

if ($onlyIn1.Count -gt 0) {
    Write-Host "`nFiles present ONLY in accounts-life (new changes):"
    # Just list top 15 to keep it clean
    $count = [Math]::Min($onlyIn1.Count, 15)
    for ($i = 0; $i -lt $count; $i++) {
        Write-Host "  - $($onlyIn1[$i])"
    }
    if ($onlyIn1.Count -gt 15) {
        Write-Host "  ... and $($onlyIn1.Count - 15) more"
    }
}
